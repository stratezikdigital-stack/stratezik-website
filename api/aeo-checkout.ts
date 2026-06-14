import type { VercelRequest, VercelResponse } from '@vercel/node'
import { rateLimit, clientIp } from './lib/aeo/rate-limit.js'
import { createAdminClient } from './lib/aeo/supabase-admin.js'
import {
  getStripe,
  stripeConfigured,
  priceFor,
  AEO_REPORT_CURRENCY,
  type AeoProduct,
} from './lib/aeo/stripe.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
    console.error('[aeo-checkout] stripe error:', err)
    return res.status(500).json({ error: 'Could not start checkout. Try again.' })
  }
}
