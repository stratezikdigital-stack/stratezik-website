import type { VercelRequest, VercelResponse } from '@vercel/node'
import type Stripe from 'stripe'
import { getStripe } from '../server/aeo/stripe.js'
import { recordPaidOrder } from '../server/payments/orders.js'

// Stripe signature verification needs the raw request body, so body parsing is
// disabled and we read the stream ourselves before touching req.body.
export const config = { api: { bodyParser: false } }

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req as unknown as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  const sig = req.headers['stripe-signature']
  if (!secret || typeof sig !== 'string') {
    return res.status(400).json({ error: 'Webhook not configured' })
  }

  let event: Stripe.Event
  try {
    const raw = await readRawBody(req)
    event = getStripe().webhooks.constructEvent(raw, sig, secret)
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.payment_status === 'paid') {
        const m = (session.metadata ?? {}) as Record<string, string>
        await recordPaidOrder({
          sessionId: session.id,
          product: m.ledgerProduct || m.product || 'unknown',
          email: session.customer_email ?? session.customer_details?.email ?? m.email ?? null,
          scanId: m.scanId || null,
          domain: m.domain || null,
          amountCents: session.amount_total ?? null,
          currency: session.currency ?? null,
          termsConsent: m.termsConsent === 'yes',
          termsConsentTs: m.termsConsentTs || null,
        })
      }
    }
  } catch (err) {
    // Never make Stripe retry over a bookkeeping error we already logged.
    console.error('[stripe-webhook] handler error:', err)
  }

  return res.status(200).json({ received: true })
}
