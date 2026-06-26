import Stripe from 'stripe'

// Lazily constructed so a missing key fails the request, not module load
// (keeps the rest of the app building without Stripe configured).
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY not configured')
    _stripe = new Stripe(key)
  }
  return _stripe
}

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

/** User-facing copy when checkout runs without STRIPE_SECRET_KEY. */
export function stripeNotConfiguredError(): string {
  if (process.env.VERCEL === '1') return 'Payments are not configured yet.'
  return 'Stripe is not set up for local dev. Add STRIPE_SECRET_KEY (sk_test_…) to .env.local and restart npm run dev.'
}

// Prices in cents (CAD). Override via env.
export const AEO_REPORT_PRICE_CENTS = Number(process.env.AEO_REPORT_PRICE_CENTS ?? '1000') // single page
export const AEO_SITEMAP_PRICE_CENTS = Number(process.env.AEO_SITEMAP_PRICE_CENTS ?? '4900') // full-site audit
export const AEO_REPORT_CURRENCY = (process.env.AEO_REPORT_CURRENCY ?? 'cad').toLowerCase()

export type AeoProduct = 'report' | 'sitemap'

export const GBP_ROADMAP_PRICE_CENTS = Number(process.env.GBP_ROADMAP_PRICE_CENTS ?? '2900')

export function priceFor(product: AeoProduct): number {
  return product === 'sitemap' ? AEO_SITEMAP_PRICE_CENTS : AEO_REPORT_PRICE_CENTS
}
