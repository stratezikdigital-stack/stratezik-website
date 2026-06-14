import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createAdminClient } from './lib/aeo/supabase-admin.js'
import { getStripe, stripeConfigured } from './lib/aeo/stripe.js'
import { runDeepScan, type DeepScanResult } from './lib/aeo/deep-scan.js'
import type { AeoScanResult } from './lib/aeo/scan.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!stripeConfigured()) {
    return res.status(503).json({ error: 'Payments are not configured.' })
  }

  const body = (req.body ?? {}) as { sessionId?: unknown; scanId?: unknown }
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  if (!sessionId || !scanId) {
    return res.status(400).json({ error: 'Missing session or scan id.' })
  }

  let paid = false
  let email = ''
  let competitorDomains: string[] = []
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    paid = session.payment_status === 'paid'
    email = session.customer_email ?? session.customer_details?.email ?? ''
    competitorDomains = (session.metadata?.competitors ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (session.metadata?.scanId && session.metadata.scanId !== scanId) {
      return res.status(400).json({ error: 'Session does not match this scan.' })
    }
  } catch (err) {
    console.error('[aeo-unlock] stripe retrieve error:', err)
    return res.status(502).json({ error: 'Could not verify payment.' })
  }
  if (!paid) {
    return res.status(402).json({ error: 'Payment not completed.' })
  }

  const supabase = createAdminClient()

  const { data: scanRow } = await supabase
    .from('aeo_scans')
    .select('id, domain, result')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) {
    return res.status(404).json({ error: 'Scan not found.' })
  }
  const base = scanRow.result as AeoScanResult
  const topline = { domain: base.domain, total: base.total, groupA: base.groupA, groupB: base.groupB }

  const { data: existing } = await supabase
    .from('aeo_deep_scans')
    .select('result')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()
  if (existing) {
    return res.status(200).json({ deep: existing.result as DeepScanResult, base: topline })
  }

  const deep = await runDeepScan(base, { competitorDomains })

  await supabase.from('aeo_deep_scans').insert({
    scan_id: scanRow.id,
    stripe_session_id: sessionId,
    email: email || null,
    domain: scanRow.domain,
    result: deep,
  })

  return res.status(200).json({ deep, base: topline })
}
