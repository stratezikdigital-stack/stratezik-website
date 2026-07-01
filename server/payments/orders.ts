// Paid-order ledger helpers. Backed by the `paid_orders` table (see
// supabase/paid_orders.sql). Every write is defensive: a bookkeeping failure
// must never break the customer's paid flow, so callers wrap these in try/catch
// or rely on the internal guards here.
import { createAdminClient } from '../aeo/supabase-admin.js'
import { alertPaidOrderIssue } from './alerts.js'

export type PaidProduct = 'aeo-report' | 'aeo-sitemap' | 'gbp-roadmap' | string

export type PaidOrderInput = {
  sessionId: string
  product: PaidProduct
  email?: string | null
  scanId?: string | null
  domain?: string | null
  amountCents?: number | null
  currency?: string | null
  termsConsent?: boolean | null
  termsConsentTs?: string | null
}

export type PaidOrderRow = {
  stripe_session_id: string
  product: string
  email: string | null
  scan_id: string | null
  domain: string | null
  amount_cents: number | null
  currency: string | null
  status: string
  delivered: boolean
  attempts: number
  last_error: string | null
  created_at: string
}

/**
 * Ensure a paid order exists. Idempotent: safe to call from both the Stripe
 * webhook and the unlock flow. Never overwrites delivery status/flags.
 */
export async function recordPaidOrder(input: PaidOrderInput): Promise<void> {
  try {
    const supabase = createAdminClient()
    await supabase.from('paid_orders').upsert(
      {
        stripe_session_id: input.sessionId,
        product: input.product,
        email: input.email ?? null,
        scan_id: input.scanId ?? null,
        domain: input.domain ?? null,
        amount_cents: input.amountCents ?? null,
        currency: input.currency ?? null,
        terms_consent: input.termsConsent ?? null,
        terms_consent_ts: input.termsConsentTs ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'stripe_session_id' },
    )
  } catch (err) {
    console.error('[payments/orders] recordPaidOrder failed:', err)
  }
}

/** Mark an order as successfully delivered (report generated + emailed). */
export async function markOrderDelivered(sessionId: string): Promise<void> {
  try {
    const supabase = createAdminClient()
    await supabase
      .from('paid_orders')
      .update({
        delivered: true,
        status: 'delivered',
        delivered_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', sessionId)
  } catch (err) {
    console.error('[payments/orders] markOrderDelivered failed:', err)
  }
}

/** Flag an order whose report generation failed after payment, then alert us. */
export async function markOrderFailed(sessionId: string, error: string): Promise<void> {
  try {
    const supabase = createAdminClient()
    const { data } = await supabase
      .from('paid_orders')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .maybeSingle()
    const attempts = ((data?.attempts as number | undefined) ?? 0) + 1
    await supabase
      .from('paid_orders')
      .update({
        status: 'processing_failed',
        last_error: error.slice(0, 1000),
        attempts,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_session_id', sessionId)

    if (data) {
      await alertPaidOrderIssue(data as PaidOrderRow, `Report generation failed: ${error}`.slice(0, 500))
      await markOrderAlerted(sessionId)
    }
  } catch (err) {
    console.error('[payments/orders] markOrderFailed failed:', err)
  }
}

async function markOrderAlerted(sessionId: string): Promise<void> {
  try {
    const supabase = createAdminClient()
    await supabase
      .from('paid_orders')
      .update({ alerted: true, updated_at: new Date().toISOString() })
      .eq('stripe_session_id', sessionId)
  } catch (err) {
    console.error('[payments/orders] markOrderAlerted failed:', err)
  }
}

/**
 * Reconciliation sweep (called by the cron): find paid orders that were never
 * delivered and have not been alerted, and notify the team. Catches the case
 * where a customer paid but never returned to the success page.
 */
export async function reconcilePaidOrders(olderThanMs = 15 * 60 * 1000): Promise<number> {
  const supabase = createAdminClient()
  const cutoff = new Date(Date.now() - olderThanMs).toISOString()
  const { data, error } = await supabase
    .from('paid_orders')
    .select('*')
    .eq('delivered', false)
    .eq('alerted', false)
    .lt('created_at', cutoff)
    .limit(50)
  if (error) {
    console.error('[payments/orders] reconcile query failed:', error)
    return 0
  }
  const rows = (data ?? []) as PaidOrderRow[]
  for (const row of rows) {
    await alertPaidOrderIssue(
      row,
      'Payment received but the report was never delivered (customer may not have returned to the results page).',
    )
    await markOrderAlerted(row.stripe_session_id)
  }
  return rows.length
}
