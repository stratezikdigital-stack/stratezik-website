/**
 * Deliver the paid GBP growth plan by email (Resend), PDF attached.
 *
 * Uses the Resend REST API directly so there is no extra SDK dependency. Sends
 * are fire-and-forget from the unlock handler: a delivery failure must never
 * block the buyer from seeing their plan on-screen.
 */

type SendRoadmapArgs = {
  to: string
  businessName: string
  city: string
  scanId: string
  pdf: Uint8Array
}

function toBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64')
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

export async function sendRoadmapEmail(args: SendRoadmapArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.warn('[gbp/email] RESEND_API_KEY not set — skipping roadmap email')
    return false
  }

  const from = process.env.GBP_ROADMAP_FROM_EMAIL?.trim() || 'Stratezik <reports@stratezik.com>'
  const filename = `GBP-Growth-Plan-${args.businessName.replace(/[^a-z0-9]+/gi, '-')}.pdf`
  const viewUrl = `https://www.stratezik.com/gbp-audit?plan=${encodeURIComponent(args.scanId)}`

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#211f1c;line-height:1.55;max-width:560px">
      <p style="font:600 12px/1 monospace;letter-spacing:.18em;color:#8c2e2e;text-transform:uppercase">Stratezik</p>
      <h1 style="font-family:Georgia,serif;font-size:22px;margin:8px 0 4px">Your 90-day GBP growth plan</h1>
      <p style="color:#5f5a52;margin:0 0 18px">${args.businessName} · ${args.city}</p>
      <p>Your full Google Business Profile growth plan is attached as a PDF. It is built entirely from your own audit: your real competitor gap, the categories and description to paste in, four ready-to-publish posts, eight seeded Q&amp;A pairs, and your review-request scripts.</p>
      <p>Work the Weeks 1-2 list first. Those are the fixes that move you fastest.</p>
      <p style="margin-top:18px"><a href="${viewUrl}" style="color:#8c2e2e;font-weight:600">View your plan online</a> (copy-paste posts, Q&amp;A, and PDF download).</p>
      <p style="margin-top:22px">Want it done for you instead? Just reply to this email, or book a free consult at <a href="https://www.stratezik.com" style="color:#8c2e2e">stratezik.com</a>.</p>
      <p style="color:#8a857c;font-size:13px;margin-top:24px">— The Stratezik team</p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [args.to],
        subject: `Your 90-day GBP growth plan — ${args.businessName}`,
        html,
        attachments: [{ filename, content: toBase64(args.pdf) }],
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      console.warn('[gbp/email] Resend returned', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.warn('[gbp/email] send failed:', err)
    return false
  }
}
