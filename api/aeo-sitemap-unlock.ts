import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createAdminClient } from './lib/aeo/supabase-admin.js'
import { getStripe, stripeConfigured } from './lib/aeo/stripe.js'
import { normaliseDomain } from './lib/aeo/scan.js'
import { runSitemapAudit, type SitemapAudit } from './lib/aeo/sitemap.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!stripeConfigured()) {
    return res.status(503).json({ error: 'Payments are not configured.' })
  }

  const body = (req.body ?? {}) as { sessionId?: unknown; domain?: unknown }
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const domain = typeof body.domain === 'string' ? normaliseDomain(body.domain) : null
  if (!sessionId || !domain) {
    return res.status(400).json({ error: 'Missing session or domain.' })
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'Payment not completed.' })
    }
    if (session.metadata?.product !== 'sitemap') {
      return res.status(400).json({ error: 'Session is not a full-site audit.' })
    }
    if (session.metadata?.domain && normaliseDomain(session.metadata.domain) !== domain) {
      return res.status(400).json({ error: 'Session does not match this domain.' })
    }
  } catch (err) {
    console.error('[aeo-sitemap-unlock] stripe retrieve error:', err)
    return res.status(502).json({ error: 'Could not verify payment.' })
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from('aeo_sitemap_audits')
    .select('result')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()
  if (existing) {
    return res.status(200).json({ audit: existing.result as SitemapAudit })
  }

  const audit = await runSitemapAudit(domain, { maxPages: 25 })

  await supabase.from('aeo_sitemap_audits').insert({
    stripe_session_id: sessionId,
    domain,
    result: audit,
  })

  return res.status(200).json({ audit })
}
