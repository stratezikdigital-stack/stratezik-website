function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

interface DeliveryArgs {
  to: string
  firstName?: string
  guideUrl: string
}

export function buildDeliveryEmailHtml({ firstName, guideUrl }: DeliveryArgs): string {
  const greeting = firstName ? `Hi ${esc(firstName)},` : 'Hi there,'
  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f4ede1;font-family:Inter,Helvetica,Arial,sans-serif;color:#0d0c0a;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="background:#faf6ec;border:1px solid rgba(13,12,10,0.12);padding:32px;">
      <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#7a1f1f;margin:0 0 20px;font-weight:600;">Stratezik · ChatGPT Ads Cheat Sheet</p>
      <p style="margin:0 0 16px;font-size:15px;">${greeting}</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Here it is — <strong>The ChatGPT Ads Cheat Sheet: The Early-Window Optimization Playbook</strong>. Every lever that's working on the platform right now: context hints, bid-floor testing, the CTR plays, conversational landing pages, and the tracking stack. Sourced from people actually spending, our own campaigns included.</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">The window is open but it won't stay open — OpenAI is already testing multi-advertiser placements. Read it this week, not next quarter.</p>
      <div style="margin:0 0 24px;">
        <a href="${guideUrl}" style="display:inline-block;background:#0d0c0a;color:#f4ede1;text-decoration:none;padding:14px 30px;font-size:15px;font-weight:600;letter-spacing:0.02em;">Read the cheat sheet →</a>
      </div>
      <p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#2a2722;">The web version has a "Download PDF" button at the top if you'd rather keep a copy.</p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;border-top:1px solid rgba(13,12,10,0.12);padding-top:20px;"><strong>PS</strong> — reply to this email and tell me what you're advertising. I'll tell you which lever to pull first.</p>
      <p style="margin:16px 0 0;font-size:15px;">— Dave, Stratezik</p>
    </div>
    <p style="font-size:11px;color:#7d7669;text-align:center;margin:20px 0 0;line-height:1.6;">
      Stratezik Digital · Toronto, ON · You're getting this because you requested the ChatGPT Ads Cheat Sheet at stratezik.com and ticked the consent box.<br />
      Reply "unsubscribe" any time to stop hearing from us.
    </p>
  </div>
</body>
</html>`
}

export async function sendDeliveryEmail(
  args: DeliveryArgs,
): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[cheatsheet/email] RESEND_API_KEY not set — skipping send; on-screen link only')
    return { sent: false, error: 'email service not configured' }
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.GUIDE_EMAIL_FROM ?? 'Stratezik <dave@stratezik.com>',
        to: [args.to],
        subject: 'Your ChatGPT Ads Cheat Sheet',
        html: buildDeliveryEmailHtml(args),
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('[cheatsheet/email] send failed:', res.status, body)
      return { sent: false, error: `send failed (${res.status})` }
    }
    return { sent: true }
  } catch (err) {
    console.error('[cheatsheet/email] send error:', err)
    return { sent: false, error: 'send error' }
  }
}
