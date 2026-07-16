import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  runAeoScan,
  normaliseDomain,
  BENCHMARK,
  checkChatGptSearchReadiness,
  type AeoScanResult,
} from './scan.js'
import { enforceSpamGuards, EMAIL_RE } from '../spam/validate.js'
import { peekRateLimit } from '../spam/rate-limit.js'
import { clientIp } from './rate-limit.js'
import {
  AEO_SCAN_MAX_PER_IP,
  AEO_SCAN_WINDOW_MS,
  scanQuotaKey,
  toScanQuota,
  type ScanQuotaPayload,
} from './scan-quota.js'
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
import { recordPaidOrder, markOrderDelivered, markOrderFailed } from '../payments/orders.js'

const PAID_FAILED_MESSAGE =
  'Payment received — but we hit a snag generating your report. Our team has been notified and will email it to you shortly. If you don’t hear back, contact dave@stratezik.com with your payment confirmation.'

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
    crawlerProbe: scan.crawlerProbe,
    chatgptSearch: scan.chatgptSearch,
  }
}

export async function handleScanQuota(req: VercelRequest, res: VercelResponse) {
  const ip = clientIp(req)
  const status = await peekRateLimit(scanQuotaKey(ip), AEO_SCAN_MAX_PER_IP, AEO_SCAN_WINDOW_MS)
  return res.status(200).json({ scanQuota: toScanQuota(status) })
}

export async function handleCheck(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>
  const guard = await enforceSpamGuards(req, res, body, {
    bucket: 'aeo-scan',
    maxPerIp: AEO_SCAN_MAX_PER_IP,
    windowMs: AEO_SCAN_WINDOW_MS,
    honeypotField: 'website',
    rateLimitAfterValidation: true,
  })
  if (!guard.allowed) return
  const scanQuota: ScanQuotaPayload | undefined = guard.rateLimit
    ? toScanQuota(guard.rateLimit)
    : undefined

  const url = body.url
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
    const cachedResult = cached.result as AeoScanResult
    // Older cache rows predate ChatGPT Search readiness — backfill so the card always shows.
    if (!cachedResult.chatgptSearch) {
      try {
        const chatgptSearch = await checkChatGptSearchReadiness(domain)
        const patched = { ...cachedResult, chatgptSearch }
        void supabase
          .from('aeo_scans')
          .update({ result: patched })
          .eq('id', cached.id)
          .then(({ error }) => {
            if (error) console.error('[aeo/check] failed to backfill chatgptSearch:', error)
          })
        return res.status(200).json({ ...topline(patched, cached.id), scanQuota })
      } catch (err) {
        console.error('[aeo/check] chatgptSearch backfill failed:', err)
      }
    }
    return res.status(200).json({ ...topline(cachedResult, cached.id), scanQuota })
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

  return res.status(200).json({ ...topline(scan, inserted.id), scanQuota })
}

export async function handleLead(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    name?: unknown
    businessName?: unknown
    consent?: unknown
    source?: unknown
    website?: unknown
    formToken?: unknown
    turnstileToken?: unknown
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const guard = await enforceSpamGuards(req, res, body as Record<string, unknown>, {
    bucket: 'aeo-lead',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email,
  })
  if (!guard.allowed) return

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : ''
  const businessName = typeof body.businessName === 'string' ? body.businessName.trim().slice(0, 120) : ''
  const consent = body.consent === true
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : null

  if (!scanId) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (!name) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!businessName) {
    return res.status(400).json({ error: 'Please enter your business name.' })
  }
  if (!consent) {
    return res.status(400).json({
      error:
        'Please confirm you agree to receive your report and related commercial messages from Stratezik (CASL).',
    })
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
  const leadRow = {
    email,
    name: name || null,
    business_name: businessName || null,
    domain: scanRow.domain,
    scan_id: scanRow.id,
    score: scanRow.total,
    sub_scores: Object.fromEntries(scan.criteria.map((c) => [c.key, c.score])),
    consent,
    source,
  }
  let { error: leadError } = await supabase.from('aeo_leads').insert(leadRow)
  if (leadError && /business_name/i.test(leadError.message)) {
    // business_name column not migrated yet — store the rest so the lead is never lost.
    const { business_name: _omit, ...rest } = leadRow
    ;({ error: leadError } = await supabase.from('aeo_leads').insert(rest))
  }
  if (leadError) {
    console.error('[aeo/lead] failed to store lead:', leadError)
    return res.status(500).json({ error: 'Something went wrong. Try again.' })
  }

  // Await the sheet sync (in parallel with the email): on Vercel the function is
  // frozen once the response is sent, so a fire-and-forget webhook fetch is dropped.
  const [, emailResult] = await Promise.all([
    appendAeoLeadToSheet({
      email,
      name: name || undefined,
      businessName: businessName || undefined,
      domain: scanRow.domain,
      score: scanRow.total,
      source,
      consent,
      groupAPct: scan.groupA.pct,
      groupBPct: scan.groupB.pct,
    }),
    sendReportEmail(email, scan, name),
  ])
  return res.status(200).json({ criteria: scan.criteria, emailSent: emailResult.sent })
}

export async function handleCheckout(req: VercelRequest, res: VercelResponse) {
  if (!stripeConfigured()) {
    return res.status(503).json({ error: 'Payments are not configured yet.' })
  }

  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    product?: unknown
    domain?: unknown
    competitors?: unknown
    website?: unknown
    termsConsent?: unknown
    formToken?: unknown
    turnstileToken?: unknown
  }

  if (body.termsConsent !== true) {
    return res
      .status(400)
      .json({ error: 'Please agree to the Terms & Refund Policy before paying.' })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const guard = await enforceSpamGuards(req, res, body as Record<string, unknown>, {
    bucket: 'aeo-checkout',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email,
  })
  if (!guard.allowed) return

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
      metadata: {
        product,
        ledgerProduct: product === 'sitemap' ? 'aeo-sitemap' : 'aeo-report',
        scanId,
        domain,
        email,
        competitors,
        termsConsent: 'yes',
        termsConsentTs: new Date().toISOString(),
      },
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
    await markOrderDelivered(sessionId)
    return res.status(200).json({ deep: existing.result as DeepScanResult, base: baseTopline })
  }

  // Ensure the paid order is on record before we attempt generation, so a
  // failure below can be flagged and alerted (even if the webhook is delayed).
  await recordPaidOrder({
    sessionId,
    product: 'aeo-report',
    email: email || null,
    scanId: scanRow.id,
    domain: scanRow.domain,
  })

  try {
    const deep = await runDeepScan(base, { competitorDomains })
    await supabase.from('aeo_deep_scans').insert({
      scan_id: scanRow.id,
      stripe_session_id: sessionId,
      email: email || null,
      domain: scanRow.domain,
      result: deep,
    })
    await markOrderDelivered(sessionId)
    return res.status(200).json({ deep, base: baseTopline })
  } catch (err) {
    console.error('[aeo/unlock] deep scan generation failed:', err)
    await markOrderFailed(sessionId, err instanceof Error ? err.message : String(err))
    return res.status(500).json({ error: PAID_FAILED_MESSAGE })
  }
}

export async function handleSitemap(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>
  const guard = await enforceSpamGuards(req, res, body, {
    bucket: 'aeo-sitemap',
    maxPerIp: 3,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
  })
  if (!guard.allowed) return

  const url = body.url
  const domain = typeof url === 'string' ? normaliseDomain(url) : null
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
    await markOrderDelivered(sessionId)
    return res.status(200).json({ audit: existing.result as SitemapAudit })
  }

  await recordPaidOrder({ sessionId, product: 'aeo-sitemap', domain })

  try {
    const audit = await runSitemapAudit(domain, { maxPages: MAX_SITEMAP_PAGES })
    await supabase.from('aeo_sitemap_audits').insert({
      stripe_session_id: sessionId,
      domain,
      result: audit,
    })
    await markOrderDelivered(sessionId)
    return res.status(200).json({ audit })
  } catch (err) {
    console.error('[aeo/sitemap-unlock] audit generation failed:', err)
    await markOrderFailed(sessionId, err instanceof Error ? err.message : String(err))
    return res.status(500).json({ error: PAID_FAILED_MESSAGE })
  }
}
