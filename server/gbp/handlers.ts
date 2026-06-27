import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createAdminClient } from '../aeo/supabase-admin.js'
import { enforceSpamGuards, EMAIL_RE } from '../spam/validate.js'
import { getStripe, stripeConfigured, stripeNotConfiguredError, GBP_ROADMAP_PRICE_CENTS, AEO_REPORT_CURRENCY } from '../aeo/stripe.js'
import { runGbpScan, topline, type GbpScanResult } from './scan.js'
import { lookupBusinessCandidates } from './lookup.js'
import { appendGbpLeadToSheet } from './sheets.js'
import { generateAiRoadmap, type AiRoadmap } from './roadmap-ai.js'
import { buildRoadmapPdf } from './pdf.js'
import { sendRoadmapEmail } from './email.js'

const CACHE_HOURS = 24

type SupabaseAdmin = ReturnType<typeof createAdminClient>

/**
 * Get the buyer's bespoke AI roadmap, generating and caching it on first call.
 * Returns null (never throws) so the paid flow falls back to the templated
 * roadmap rather than blocking the buyer.
 */
async function ensureAiRoadmap(
  supabase: SupabaseAdmin,
  scanId: string,
  scan: GbpScanResult,
): Promise<AiRoadmap | null> {
  const { data: paidRow } = await supabase
    .from('gbp_paid_roadmaps')
    .select('id, ai_roadmap')
    .eq('scan_id', scanId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (paidRow?.ai_roadmap) return paidRow.ai_roadmap as AiRoadmap

  const roadmap = await generateAiRoadmap(scan)
  if (roadmap && paidRow?.id) {
    await supabase.from('gbp_paid_roadmaps').update({ ai_roadmap: roadmap }).eq('id', paidRow.id)
  }
  return roadmap
}

/** Build the PDF and email it once, in the background. Never throws. */
async function emailRoadmapOnce(
  supabase: SupabaseAdmin,
  scanId: string,
  email: string,
  scan: GbpScanResult,
  roadmap: AiRoadmap,
): Promise<void> {
  try {
    const { data: paidRow } = await supabase
      .from('gbp_paid_roadmaps')
      .select('id, email_sent_at')
      .eq('scan_id', scanId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (!paidRow || paidRow.email_sent_at) return

    const pdf = await buildRoadmapPdf(scan, roadmap)
    const sent = await sendRoadmapEmail({
      to: email,
      businessName: scan.businessName,
      city: scan.city,
      scanId,
      pdf,
    })
    if (sent) {
      await supabase.from('gbp_paid_roadmaps').update({ email_sent_at: new Date().toISOString() }).eq('id', paidRow.id)
    }
  } catch (err) {
    console.warn('[gbp/roadmap] email step failed:', err)
  }
}

export { lookupBusinessCandidates, type GbpBusinessCandidate } from './lookup.js'

export async function handleGbpLookup(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>
  const allowed = await enforceSpamGuards(req, res, body, {
    bucket: 'gbp-lookup',
    maxPerIp: 20,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    // Turnstile tokens are single-use — verified on gbp-check after the user picks a listing.
    requireTurnstile: false,
  })
  if (!allowed) return

  const businessName = typeof body.businessName === 'string' ? body.businessName.trim().slice(0, 120) : ''
  const city = typeof body.city === 'string' ? body.city.trim().slice(0, 80) : ''
  const industry = typeof body.industry === 'string' ? body.industry.trim().slice(0, 80) : 'Local business'

  if (!city) {
    return res.status(400).json({ error: 'City is required — e.g. "Scarborough, ON".' })
  }
  if (!businessName) {
    return res.status(400).json({ error: 'Enter your business name so we can find it on Google Maps.' })
  }

  const result = await lookupBusinessCandidates(businessName, city, industry)
  if (!result.placesConfigured) {
    return res.status(503).json({
      error:
        'Google Places lookup is not configured on this server. Set GOOGLE_PLACES_API_KEY in the environment (see .env.gbp.example).',
      candidates: [],
      placesConfigured: false,
      reason: result.reason,
    })
  }
  return res.status(200).json(result)
}

export async function handleGbpCheck(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>
  const allowed = await enforceSpamGuards(req, res, body, {
    bucket: 'gbp-scan',
    maxPerIp: 8,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
  })
  if (!allowed) return

  const businessName = typeof body.businessName === 'string' ? body.businessName.trim().slice(0, 120) : ''
  const city = typeof body.city === 'string' ? body.city.trim().slice(0, 80) : ''
  const industry = typeof body.industry === 'string' ? body.industry.trim().slice(0, 80) : 'Local business'
  const placeId = typeof body.placeId === 'string' ? body.placeId.trim().slice(0, 200) : ''
  const selectedName = typeof body.selectedName === 'string' ? body.selectedName.trim().slice(0, 160) : ''

  if (!city) {
    return res.status(400).json({ error: 'City is required — e.g. "Scarborough, ON".' })
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch {
    return res.status(503).json({ error: 'Scanner is not configured yet. Please try again later.' })
  }

  const since = new Date(Date.now() - CACHE_HOURS * 60 * 60 * 1000).toISOString()

  const baseCacheQuery = supabase
    .from('gbp_scans')
    .select('id, result, created_at, business_name, city, industry')
    .eq('city', city)
    .eq('industry', industry)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1)

  const { data: cached } = await (placeId
    ? baseCacheQuery.eq('place_id', placeId)
    : baseCacheQuery.eq('business_name', businessName || '—')
  ).maybeSingle()

  if (cached) {
    return res.status(200).json(topline(cached.result as GbpScanResult, cached.id))
  }

  const scan = await runGbpScan({
    businessName: selectedName || businessName,
    city,
    industry,
    placeId: placeId || undefined,
  })
  const { data: inserted, error } = await supabase
    .from('gbp_scans')
    .insert({
      business_name: scan.businessName,
      city: scan.city,
      industry: scan.industry,
      score: scan.score,
      place_id: scan.placeId,
      data_source: scan.dataSource,
      result: scan,
    })
    .select('id')
    .single()

  if (error || !inserted) {
    console.error('[gbp/check] store failed:', error)
    const tableMissing =
      error?.code === 'PGRST205' || error?.message?.includes('gbp_scans')
    // Return scan results even when storage fails so the tool stays usable
    return res.status(200).json({
      ...topline(scan, ''),
      persisted: false,
      storageError: true,
      ...(tableMissing
        ? {
            storageHint:
              'Run supabase/gbp_audit.sql in your Supabase SQL editor (same project as aeo_scans), then scan again for email unlock.',
          }
        : {}),
    })
  }

  return res.status(200).json({ ...topline(scan, inserted.id), persisted: true })
}

export async function handleGbpLead(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    name?: unknown
    consent?: unknown
    source?: unknown
    website?: unknown
    formToken?: unknown
    turnstileToken?: unknown
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const allowed = await enforceSpamGuards(req, res, body as Record<string, unknown>, {
    bucket: 'gbp-lead',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email,
  })
  if (!allowed) return

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined
  const consent = body.consent === true
  const source = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : 'gbp-audit'

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }
  if (!scanId) {
    return res.status(400).json({ error: 'Scan not found — run the check again.' })
  }
  if (!consent) {
    return res.status(400).json({
      error:
        'Please confirm you agree to receive your report and related commercial messages from Stratezik (CASL).',
    })
  }

  const supabase = createAdminClient()
  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('id, business_name, city, industry, score, result')
    .eq('id', scanId)
    .maybeSingle()

  if (!scanRow) {
    return res.status(404).json({ error: 'Scan not found — run the check again.' })
  }

  const scan = scanRow.result as GbpScanResult
  const { error: leadError } = await supabase.from('gbp_leads').insert({
    email,
    name: name || null,
    scan_id: scanRow.id,
    business_name: scanRow.business_name,
    city: scanRow.city,
    score: scanRow.score,
    consent,
    source,
  })
  if (leadError) {
    console.error('[gbp/lead] store failed:', leadError)
    return res.status(500).json({ error: 'Something went wrong. Try again.' })
  }

  void appendGbpLeadToSheet({
    email,
    name,
    businessName: scanRow.business_name,
    city: scanRow.city,
    score: scanRow.score,
    source,
    consent,
    industry: scanRow.industry,
  })

  return res.status(200).json({
    pillars: scan.pillars,
    competitorGaps: scan.competitorGaps,
    revenueLine: scan.revenueLine,
    roadmap: scan.roadmap,
    topCompetitor: scan.topCompetitor,
  })
}

export async function handleGbpCheckout(req: VercelRequest, res: VercelResponse) {
  if (!stripeConfigured()) {
    return res.status(503).json({ error: stripeNotConfiguredError() })
  }

  const body = (req.body ?? {}) as {
    scanId?: unknown
    email?: unknown
    website?: unknown
    formToken?: unknown
    turnstileToken?: unknown
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const allowed = await enforceSpamGuards(req, res, body as Record<string, unknown>, {
    bucket: 'gbp-checkout',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email,
    // User already passed Turnstile at scan; Stripe checkout is the real gate.
    requireTurnstile: false,
  })
  if (!allowed) return

  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  if (!EMAIL_RE.test(email) || !scanId) {
    return res.status(400).json({ error: 'A valid email and scan are required.' })
  }

  const supabase = createAdminClient()
  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('id, business_name, city')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) {
    return res.status(404).json({ error: 'Scan not found — run the check again.' })
  }

  const originHeader = req.headers.origin
  const origin =
    (typeof originHeader === 'string' ? originHeader : null) ??
    process.env.VITE_APP_URL ??
    'https://www.stratezik.com'

  const label = `${scanRow.business_name} · ${scanRow.city}`

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: AEO_REPORT_CURRENCY,
            unit_amount: GBP_ROADMAP_PRICE_CENTS,
            product_data: {
              name: `GBP Growth Roadmap — ${label}`,
              description:
                'Top-1% operator GBP plan: category reverse-engineering from Map Pack leaders, review-SEO, keyword-rich services, reply templates, competitive integrity audit, geo-targeting, attributes/photos, authority signals, 90-day weekly plan, posts, Q&A, and 12-section PDF by email.',
            },
          },
        },
      ],
      metadata: { product: 'gbp-roadmap', scanId, email, businessName: scanRow.business_name },
      success_url: `${origin}/gbp-audit?session_id={CHECKOUT_SESSION_ID}&scanId=${scanId}`,
      cancel_url: `${origin}/gbp-audit?canceled=1`,
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('[gbp/checkout] stripe error:', err)
    return res.status(500).json({ error: 'Could not start checkout. Try again.' })
  }
}

export async function handleGbpUnlock(req: VercelRequest, res: VercelResponse) {
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
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    paid = session.payment_status === 'paid'
    email = session.customer_email ?? session.customer_details?.email ?? ''
    if (session.metadata?.scanId && session.metadata.scanId !== scanId) {
      return res.status(400).json({ error: 'Session does not match this scan.' })
    }
    if (session.metadata?.product !== 'gbp-roadmap') {
      return res.status(400).json({ error: 'Invalid product session.' })
    }
  } catch (err) {
    console.error('[gbp/unlock] stripe error:', err)
    return res.status(502).json({ error: 'Could not verify payment.' })
  }
  if (!paid) {
    return res.status(402).json({ error: 'Payment not completed.' })
  }

  const supabase = createAdminClient()
  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('id, business_name, result')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) {
    return res.status(404).json({ error: 'Scan not found.' })
  }

  const { data: existing } = await supabase
    .from('gbp_paid_roadmaps')
    .select('id')
    .eq('stripe_session_id', sessionId)
    .maybeSingle()

  if (!existing) {
    await supabase.from('gbp_paid_roadmaps').insert({
      scan_id: scanRow.id,
      stripe_session_id: sessionId,
      email: email || null,
      business_name: scanRow.business_name,
    })
  }

  // Return immediately — AI generation takes ~40 s and would hold the user on the
  // unlock screen. The client polls /api/gbp-restore which handles generation + email.
  const scan = scanRow.result as GbpScanResult
  return res.status(200).json({
    unlocked: true,
    ...topline(scan, scanRow.id),
    pillars: scan.pillars,
    aiRoadmap: null,
  })
}

/** Reload a paid roadmap when the user returns without Stripe query params. */
export async function handleGbpRestore(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as { scanId?: unknown }
  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  if (!scanId) return res.status(400).json({ error: 'Missing scan id.' })

  const supabase = createAdminClient()
  const { data: paidMeta } = await supabase
    .from('gbp_paid_roadmaps')
    .select('id, email, email_sent_at')
    .eq('scan_id', scanId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (!paidMeta) {
    return res.status(404).json({ error: 'No paid roadmap found for this scan.' })
  }

  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('id, result')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) return res.status(404).json({ error: 'Scan not found.' })

  const scan = scanRow.result as GbpScanResult
  const aiRoadmap = await ensureAiRoadmap(supabase, scanRow.id, scan)

  // Email the PDF on the first restore call that returns a roadmap.
  if (aiRoadmap && paidMeta.email && !paidMeta.email_sent_at) {
    await emailRoadmapOnce(supabase, scanRow.id, paidMeta.email, scan, aiRoadmap)
  }

  return res.status(200).json({
    unlocked: true,
    ...topline(scan, scanRow.id),
    pillars: scan.pillars,
    aiRoadmap,
  })
}

/** Stream the paid roadmap PDF for browser download. Requires a paid scan. */
export async function handleGbpRoadmapPdf(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as { scanId?: unknown }
  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  if (!scanId) return res.status(400).json({ error: 'Missing scan id.' })

  const supabase = createAdminClient()
  const { data: paid } = await supabase
    .from('gbp_paid_roadmaps')
    .select('id')
    .eq('scan_id', scanId)
    .limit(1)
    .maybeSingle()
  if (!paid) return res.status(403).json({ error: 'No paid roadmap found for this scan.' })

  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('id, result')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) return res.status(404).json({ error: 'Scan not found.' })

  const scan = scanRow.result as GbpScanResult
  const roadmap = await ensureAiRoadmap(supabase, scanRow.id, scan)
  if (!roadmap) return res.status(503).json({ error: 'Roadmap is not ready yet. Try again in a moment.' })

  const pdf = await buildRoadmapPdf(scan, roadmap)
  const filename = `GBP-Growth-Plan-${scan.businessName.replace(/[^a-z0-9]+/gi, '-')}.pdf`
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
  return res.status(200).send(Buffer.from(pdf))
}

export async function handleGbpFull(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as { scanId?: unknown }
  const scanId = typeof body.scanId === 'string' ? body.scanId : ''
  if (!scanId) return res.status(400).json({ error: 'Missing scan id.' })

  const supabase = createAdminClient()
  const { data: scanRow } = await supabase
    .from('gbp_scans')
    .select('result')
    .eq('id', scanId)
    .maybeSingle()
  if (!scanRow) return res.status(404).json({ error: 'Scan not found.' })

  const scan = scanRow.result as GbpScanResult
  return res.status(200).json({
    pillars: scan.pillars,
    competitorGaps: scan.competitorGaps,
    revenueLine: scan.revenueLine,
    roadmap: scan.roadmap,
    topCompetitor: scan.topCompetitor,
  })
}
