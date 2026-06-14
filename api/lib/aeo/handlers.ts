import type { VercelRequest, VercelResponse } from '@vercel/node'
import { runAeoScan, normaliseDomain, BENCHMARK, type AeoScanResult } from './scan.js'
import { rateLimit, clientIp } from './rate-limit.js'
import { createAdminClient } from './supabase-admin.js'
import { sendReportEmail } from './email.js'
import { appendAeoLeadToSheet } from './sheets.js'
import {
  getStripe,
  stripeConfigured,
  priceFor,
  AEO_REPORT_CURRENCY,
  type AeoProduct,
} from './stripe.js'
import { runDeepScan, type DeepScanResult } from './deep-scan.js'
import { runSitemapAudit, type SitemapAudit } from './sitemap.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const CACHE_HOURS = 24
const MAX_SITEMAP_PAGES = 25

const PRODUCTS: Record<AeoProduct, { name: (d: string) => string; description: string }> = {
  report: {
    name: (d) => `AI Visibility Report — ${d}`,
    description:
      'Whether AI engines name you for buyer queries, how you rank against competitors, and a page-by-page citability + GEO diagnostic with fixes.',
  },
  sitemap: {
    name: (d) => `Full-Site AI Audit — ${d}`,
    description:
      'Every page in your sitemap crawled for RAG-readiness: chunking, trust markers, synthesis, and JS-visibility — with the worst pages and exact fixes.',
  },
}

function topline(scan: AeoScanResult, scanId: string) {
  return {
    scanId,
    domain: scan.domain,
    total: scan.total,
    scoredCount: scan.scoredCount,
    groupA: scan.groupA,
    groupB: scan.groupB,
    benchmark: BENCHMARK,
    checkedAt: scan.checkedAt,
  }
}

export async function handleCheck(req: VercelRequest, res: VercelResponse) {
  const ip = clientIp(req)
  if (!rateLimit(`scan:${ip}`, 5, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many scans from this address. Try again in an hour.' })
  }

  const url = (req.body as { url?: unknown } | undefined)?.url
  const domain = typeof url === 'string' ? normaliseDomain(url) : null
  if (!domain) {
    return res.status(400).json({
      error: 'That doesn’t look like a valid website address. Try something like "example.com".',
    })
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch {
    return res.status(503).json({ error: 'Scanner is not configured yet. Please try again later.' })
  }

  const since = new Date(Date.now() - CACHE_HOURS * 60 * 60 * 1000).toISOString()
  const { data: cached } = await supabase
    .from('aeo_scans')
    .select('id, result, created_at')
    .eq('domain', domain)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (cached) {
    return res.status(200).json(topline(cached.result as AeoScanResult, cached.id))
  }

  const scan = await runAeoScan(domain)
  const { data: inserted, error: insertError } = await supabase
    .from('aeo_scans')
    .insert({
      domain,
      total: scan.total === 'unverifiable' ? null : scan.total,
      unverifiable: scan.total === 'unverifiable',
      result: scan,
    })
    .select('id')
    .single()

  if (insertError || !inserted) {
    console.error('[aeo/check] failed to store scan:', insertError)
    return res.status(500).json({ error: 'Something went wrong storing your scan. Try again.' })
  }

  return res.status(200).json(topline(scan, inserted.id))
}

export async function handleLead(req: VercelRequest, res: VercelResponse) {
  const ip = clientIp(req)
  if (!rateLimit(`lead:${ip}`, 10, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' })
  }

  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    name?: unknown
    consent?: unknown
    source?: unknown
  }

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined
  const consent = body.consent === true
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : null

  if (!scanId || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (!consent) {
    return res.status(400).json({
      error:
        'Please confirm you agree to receive your report and related commercial messages from Stratezik (CASL).',
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
    source,
  })
  if (leadError) {
    console.error('[aeo/lead] failed to store lead:', leadError)
    return res.status(500).json({ error: 'Something went wrong. Try again.' })
  }

  void appendAeoLeadToSheet({
    email,
    name,
    domain: scanRow.domain,
    score: scanRow.total,
    source,
    consent,
    groupAPct: scan.groupA.pct,
    groupBPct: scan.groupB.pct,
  })

  const emailResult = await sendReportEmail(email, scan, name)
  return res.status(200).json({ criteria: scan.criteria, emailSent: emailResult.sent })
}

export async function handleCheckout(req: VercelRequest, res: VercelResponse) {
  if (!stripeConfigured()) {
    return res.status(503).json({ error: 'Payments are not configured yet.' })
  }

  const ip = clientIp(req)
  if (!rateLimit(`checkout:${ip}`, 10, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' })
  }

  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    product?: unknown
    domain?: unknown
    competitors?: unknown
  }

  const product: AeoProduct = body.product === 'sitemap' ? 'sitemap' : 'report'
  const competitors = Array.isArray(body.competitors)
    ? body.competitors
        .filter((c): c is string => typeof c === 'string')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
        .join(',')
        .slice(0, 450)
    : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  const supabase = createAdminClient()
  const originHeader = req.headers.origin
  const origin =
    (typeof originHeader === 'string' ? originHeader : null) ??
    process.env.VITE_APP_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    'https://www.stratezik.com'

  let domain = ''
  let scanId = ''
  if (product === 'report') {
    scanId = typeof body.scanId === 'string' ? body.scanId : ''
    const { data: scanRow } = await supabase
      .from('aeo_scans')
      .select('id, domain')
      .eq('id', scanId)
      .maybeSingle()
    if (!scanRow) {
      return res.status(404).json({ error: 'Scan not found — run the check again.' })
    }
    domain = scanRow.domain
  } else {
    domain = typeof body.domain === 'string' ? body.domain.trim().toLowerCase() : ''
    if (!domain) {
      return res.status(400).json({ error: 'A domain is required for a full-site audit.' })
    }
  }

  const successQuery =
    product === 'sitemap'
      ? `session_id={CHECKOUT_SESSION_ID}&product=sitemap&domain=${encodeURIComponent(domain)}`
      : `session_id={CHECKOUT_SESSION_ID}&product=report&scanId=${scanId}`

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: AEO_REPORT_CURRENCY,
            unit_amount: priceFor(product),
            product_data: {
              name: PRODUCTS[product].name(domain),
              description: PRODUCTS[product].description,
            },
          },
        },
      ],
      metadata: { product, scanId, domain, email, competitors },
      success_url: `${origin}/aeo-checker?${successQuery}`,
      cancel_url: `${origin}/aeo-checker?canceled=1`,
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('[aeo/checkout] stripe error:', err)
    return res.status(500).json({ error: 'Could not start checkout. Try again.' })
  }
}

export async function handleUnlock(req: VercelRequest, res: VercelResponse) {
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
    console.error('[aeo/unlock] stripe retrieve error:', err)
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
  const baseTopline = { domain: base.domain, total: base.total, groupA: base.groupA, groupB: base.groupB }

  const { data: existing } = await supabase
    .from('aeo_deep_scans')
    .select('result')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()
  if (existing) {
    return res.status(200).json({ deep: existing.result as DeepScanResult, base: baseTopline })
  }

  const deep = await runDeepScan(base, { competitorDomains })
  await supabase.from('aeo_deep_scans').insert({
    scan_id: scanRow.id,
    stripe_session_id: sessionId,
    email: email || null,
    domain: scanRow.domain,
    result: deep,
  })

  return res.status(200).json({ deep, base: baseTopline })
}

export async function handleSitemap(req: VercelRequest, res: VercelResponse) {
  const ip = clientIp(req)
  if (!rateLimit(`sitemap:${ip}`, 3, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many full-site audits from this address. Try again in an hour.' })
  }

  const body = (req.body ?? {}) as { url?: unknown }
  const domain = typeof body.url === 'string' ? normaliseDomain(body.url) : null
  if (!domain) {
    return res.status(400).json({ error: 'That doesn’t look like a valid website address.' })
  }

  const audit = await runSitemapAudit(domain, { maxPages: MAX_SITEMAP_PAGES })
  if (!audit.sitemapFound) {
    return res.status(404).json({
      error:
        'We couldn’t find a sitemap.xml for this domain. Add one (most frameworks generate it automatically) so AI crawlers can discover all your pages — that’s itself an AEO fix.',
    })
  }
  return res.status(200).json({ audit })
}

export async function handleSitemapUnlock(req: VercelRequest, res: VercelResponse) {
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
    console.error('[aeo/sitemap-unlock] stripe retrieve error:', err)
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

  const audit = await runSitemapAudit(domain, { maxPages: MAX_SITEMAP_PAGES })
  await supabase.from('aeo_sitemap_audits').insert({
    stripe_session_id: sessionId,
    domain,
    result: audit,
  })

  return res.status(200).json({ audit })
}
