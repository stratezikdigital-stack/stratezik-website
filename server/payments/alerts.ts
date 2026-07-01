// Internal alerts for paid orders that were charged but not delivered.
// Two channels (both best-effort, never throw): a Resend email to the team and
// a row appended to the "Paid Order Issues" Google Sheet tab via Apps Script
// (google-apps-script-paid-order-issues.js).
import type { PaidOrderRow } from './orders.js'

function adminEmail(): string {
  return process.env.PAID_ISSUES_EMAIL?.trim() || 'stratezikdigital@gmail.com'
}

function centsToLabel(cents: number | null, currency: string | null): string {
  if (cents == null) return 'unknown'
  return `${(cents / 100).toFixed(2)} ${(currency ?? 'cad').toUpperCase()}`
}

async function sendAlertEmail(order: PaidOrderRow, reason: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.warn('[payments/alerts] RESEND_API_KEY not set — skipping alert email')
    return
  }
  const from = process.env.PAID_ISSUES_FROM_EMAIL?.trim() || 'Stratezik <reports@stratezik.com>'
  const dashUrl = 'https://dashboard.stripe.com/payments'
  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#211f1c;line-height:1.55;max-width:560px">
      <p style="font:600 12px/1 monospace;letter-spacing:.18em;color:#8c2e2e;text-transform:uppercase">Stratezik · Paid order needs attention</p>
      <h1 style="font-family:Georgia,serif;font-size:20px;margin:8px 0 12px">A customer paid but the report did not deliver</h1>
      <p style="margin:0 0 12px">${reason}</p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Product</td><td>${order.product}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Email</td><td>${order.email ?? '(none)'}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Amount</td><td>${centsToLabel(order.amount_cents, order.currency)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Scan / domain</td><td>${order.scan_id ?? order.domain ?? '(none)'}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Stripe session</td><td>${order.stripe_session_id}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Status</td><td>${order.status} · attempts: ${order.attempts}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#8a857c">Last error</td><td>${order.last_error ?? '(none)'}</td></tr>
      </table>
      <p style="margin:14px 0 0">Next step: retry the unlock, deliver the report manually, or (if still undeliverable) issue a free re-run credit or full refund in <a href="${dashUrl}" style="color:#8c2e2e">Stripe</a> per our refund policy.</p>
    </div>`
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [adminEmail()],
        subject: `⚠️ Paid but undelivered — ${order.product} — ${order.email ?? 'unknown'}`,
        html,
      }),
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) console.warn('[payments/alerts] Resend returned', res.status, await res.text())
  } catch (err) {
    console.warn('[payments/alerts] alert email failed:', err)
  }
}

async function appendIssueToSheet(order: PaidOrderRow, reason: string): Promise<void> {
  const webhook =
    process.env.GOOGLE_LEADS_WEBHOOK_URL?.trim() ||
    process.env.GOOGLE_PAID_ISSUES_WEBHOOK_URL?.trim()
  if (!webhook) {
    console.warn('[payments/alerts] GOOGLE_LEADS_WEBHOOK_URL not set — skipping sheet sync')
    return
  }
  const params = new URLSearchParams({
    type: 'paid-issue',
    product: order.product,
    email: order.email ?? '',
    amount: centsToLabel(order.amount_cents, order.currency),
    scan_or_domain: order.scan_id ?? order.domain ?? '',
    session_id: order.stripe_session_id,
    status: order.status,
    attempts: String(order.attempts),
    last_error: order.last_error ?? '',
    reason,
  })
  try {
    const res = await fetch(`${webhook}?${params.toString()}`, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
    if (!res.ok) console.warn('[payments/alerts] sheet webhook returned', res.status)
  } catch (err) {
    console.warn('[payments/alerts] failed to append issue to sheet:', err)
  }
}

/** Notify the team about a paid-but-undelivered order. Best-effort, never throws. */
export async function alertPaidOrderIssue(order: PaidOrderRow, reason: string): Promise<void> {
  await Promise.all([sendAlertEmail(order, reason), appendIssueToSheet(order, reason)])
}
