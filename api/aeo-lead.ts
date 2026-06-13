import type { VercelRequest, VercelResponse } from '@vercel/node'
import { rateLimit, clientIp } from './lib/aeo/rate-limit.js'
import { createAdminClient } from './lib/aeo/supabase-admin.js'
import { sendReportEmail } from './lib/aeo/email.js'
import type { AeoScanResult } from './lib/aeo/scan.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = clientIp(req)
  if (!rateLimit(`lead:${ip}`, 10, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' })
  }

  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    name?: unknown
    consent?: unknown
  }

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined
  const consent = body.consent === true

  if (!scanId || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (!consent) {
    return res.status(400).json({
      error:
        'Please tick the consent box so we can email you the report (Canadian anti-spam law requires it).',
    })
  }
  if (!rateLimit(`lead-email:${email}`, 5, 24 * 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many reports requested for this email today.' })
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch {
    return res.status(503).json({ error: 'Lead capture is not configured yet. Please try again later.' })
  }

  const { data: scanRow } = await supabase
    .from('aeo_scans')
    .select('id, domain, total, result')
    .eq('id', scanId)
    .maybeSingle()

  if (!scanRow) {
    return res.status(404).json({ error: 'Scan not found — run the check again.' })
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
    return res.status(500).json({ error: 'Something went wrong. Try again.' })
  }

  const emailResult = await sendReportEmail(email, scan, name)

  return res.status(200).json({
    criteria: scan.criteria,
    emailSent: emailResult.sent,
  })
}
