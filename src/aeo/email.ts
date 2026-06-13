import type { AeoScanResult } from './scan'
import { BENCHMARK } from './scan'

const REPORT_URL = 'https://www.stratezik.com/toronto-startup-website-audit-2026'
const BOOK_URL = 'https://www.stratezik.com/#contact'

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function scoreBadge(score: number | 'unverifiable', max: number): string {
  if (score === 'unverifiable') return `<span style="color:#94a3b8;">not checkable</span>`
  const colour = score >= max ? '#16a34a' : score > 0 ? '#d97706' : '#dc2626'
  return `<strong style="color:${colour};">${score} / ${max}</strong>`
}

export function buildReportEmailHtml(result: AeoScanResult, name?: string): string {
  const greeting = name ? `Hi ${esc(name)},` : 'Hi there,'
  const totalLine =
    result.total === 'unverifiable'
      ? `We couldn't fully scan <strong>${esc(result.domain)}</strong> — fewer than five of the eight criteria were checkable. That usually means a CDN or firewall is blocking automated visitors, which is itself an AEO problem: if our scanner can't read your site, AI crawlers likely can't either.`
      : `<strong>${esc(result.domain)}</strong> scored <strong style="font-size:22px;">${result.total} / 20</strong> on the 20-Point AEO Readiness Test — the median funded Toronto startup scores ${BENCHMARK.median}/20.`

  const splitLine =
    result.groupA.pct !== null && result.groupB.pct !== null
      ? `<p style="margin:16px 0;">You capture <strong>${result.groupA.pct}%</strong> of the "default" points (crawler access, server-rendered content, entity presence) and <strong>${result.groupB.pct}%</strong> of the "deliberate" points (schema, answer-first copy, llms.txt, pricing transparency). In our audit of ${BENCHMARK.n} funded startups, the averages were ${BENCHMARK.groupAPct}% and ${BENCHMARK.groupBPct}% — the doors are open, but the house is empty. The deliberate column is where you outrank everyone.</p>`
      : ''

  const rows = result.criteria
    .map(
      (c) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;">
          <strong>${esc(c.label)}</strong>
          <span style="color:#64748b;font-size:12px;"> · ${c.group === 'A' ? 'default' : 'deliberate'}</span>
          <br /><span style="color:#64748b;font-size:13px;">${esc(c.evidence)}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;white-space:nowrap;text-align:right;">${scoreBadge(c.score, c.max)}</td>
      </tr>`
    )
    .join('')

  const fixes = result.criteria.filter((c) => c.fix)
  const fixList =
    fixes.length > 0
      ? `<h3 style="margin:28px 0 8px;font-size:16px;">Your fix list, in priority order</h3>
         <ol style="padding-left:20px;margin:0;">
           ${fixes
             .map(
               (c) =>
                 `<li style="margin:10px 0;font-size:14px;line-height:1.5;"><strong>${esc(c.label)}</strong> — ${esc(c.fix!)}</li>`
             )
             .join('')}
         </ol>`
      : `<p>Full marks across the board — your site is in rare company.</p>`

  return `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="background:#ffffff;border-radius:12px;padding:32px;">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#dc2626;margin:0 0 16px;">Stratezik · AEO Readiness Report</p>
      <p style="margin:0 0 16px;font-size:15px;">${greeting}</p>
      <p style="margin:0 0 8px;font-size:15px;line-height:1.6;">${totalLine}</p>
      ${splitLine}
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;border-bottom:2px solid #cbd5e1;">Criterion</th>
            <th style="text-align:right;padding:8px 12px;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;border-bottom:2px solid #cbd5e1;">Score</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      ${fixList}
      <div style="margin:32px 0 8px;text-align:center;">
        <a href="${BOOK_URL}" style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:15px;font-weight:600;">Book a call — we'll fix the deliberate column</a>
      </div>
      <p style="font-size:13px;color:#64748b;text-align:center;margin:16px 0 0;">
        This is the same machine-verified test from our
        <a href="${REPORT_URL}" style="color:#dc2626;">Toronto Startup Website Audit 2026</a>
        (${BENCHMARK.n} funded startups, median ${BENCHMARK.median}/20).
      </p>
    </div>
    <p style="font-size:12px;color:#94a3b8;text-align:center;margin:20px 0 0;">
      Stratezik Digital · Toronto, ON · You received this because you requested an AEO report at stratezik.com and consented to follow-up.
      Reply "unsubscribe" any time to stop hearing from us.
    </p>
  </div>
</body>
</html>`
}

export async function sendReportEmail(
  to: string,
  result: AeoScanResult,
  name?: string
): Promise<{ sent: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[aeo/email] RESEND_API_KEY not set — skipping email send')
    return { sent: false, error: 'email service not configured' }
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.AEO_EMAIL_FROM ?? 'Stratezik <reports@stratezik.com>',
        to: [to],
        subject:
          result.total === 'unverifiable'
            ? `We couldn't fully scan ${result.domain} — here's why that matters`
            : `${result.domain}: ${result.total}/20 on the AEO Readiness Test`,
        html: buildReportEmailHtml(result, name),
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      const body = await res.text()
      console.error('[aeo/email] send failed:', res.status, body)
      return { sent: false, error: `send failed (${res.status})` }
    }
    return { sent: true }
  } catch (err) {
    console.error('[aeo/email] send error:', err)
    return { sent: false, error: 'send error' }
  }
}
