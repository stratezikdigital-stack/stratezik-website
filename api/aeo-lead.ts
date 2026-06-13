import { rateLimit, clientIp } from './lib/aeo/rate-limit'
import { createAdminClient } from './lib/aeo/supabase-admin'
import { sendReportEmail } from './lib/aeo/email'
import type { AeoScanResult } from './lib/aeo/scan'

export const config = {
  runtime: 'nodejs',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const ip = clientIp(req)
  if (!rateLimit(`lead:${ip}`, 10, 60 * 60 * 1000)) {
    return json({ error: 'Too many requests. Try again later.' }, 429)
  }

  let body: { scanId?: unknown; email?: unknown; name?: unknown; consent?: unknown }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined
  const consent = body.consent === true

  if (!scanId || !EMAIL_RE.test(email)) {
    return json({ error: 'A valid email is required.' }, 400)
  }
  if (!consent) {
    return json(
      {
        error:
          'Please tick the consent box so we can email you the report (Canadian anti-spam law requires it).',
      },
      400
    )
  }
  if (!rateLimit(`lead-email:${email}`, 5, 24 * 60 * 60 * 1000)) {
    return json({ error: 'Too many reports requested for this email today.' }, 429)
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch {
    return json({ error: 'Lead capture is not configured yet. Please try again later.' }, 503)
  }

  const { data: scanRow } = await supabase
    .from('aeo_scans')
    .select('id, domain, total, result')
    .eq('id', scanId)
    .maybeSingle()

  if (!scanRow) {
    return json({ error: 'Scan not found — run the check again.' }, 404)
  }

  const scan = scanRow.result as AeoScanResult

  const { error: leadError } = await supabase.from('aeo_leads').insert({
    email,
    name: name || null,
    domain: scanRow.domain,
    scan_id: scanRow.id,
    score: scanRow.total,
    sub_scores: Object.fromEntries(scan.criteria.map((c) => [c.key, c.score])),
    consent,
  })
  if (leadError) {
    console.error('[aeo-lead] failed to store lead:', leadError)
    return json({ error: 'Something went wrong. Try again.' }, 500)
  }

  const emailResult = await sendReportEmail(email, scan, name)

  return json({
    criteria: scan.criteria,
    emailSent: emailResult.sent,
  })
}
