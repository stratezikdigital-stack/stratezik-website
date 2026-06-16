import type { VercelRequest, VercelResponse } from '@vercel/node'
import { rateLimit, clientIp } from '../../api/lib/aeo/rate-limit.js'
import { createAdminClient } from '../../api/lib/aeo/supabase-admin.js'
import { sendDeliveryEmail } from './email.js'
import { loadGuide, splitAtIndustries } from './guide.js'
import { mintToken, verifyToken } from './token.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const VERTICALS = [
  'beauty',
  'ecommerce',
  'b2b-saas',
  'travel',
  'education',
  'fitness',
  'legal',
  'local-services',
  'finance',
  'agency',
  'other',
]
const SOURCE = 'chatgpt-ads-cheat-sheet'

function appOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.VITE_APP_URL ||
    'https://www.stratezik.com'
  )
}

export async function handleGuideLead(req: VercelRequest, res: VercelResponse) {
  const pseudoReq = new Request('http://localhost', {
    headers: Object.fromEntries(
      Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v ?? '')]),
    ),
  })
  const ip = clientIp(pseudoReq)

  if (!rateLimit(`guide-lead:${ip}`, 10, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Try again in a bit.' })
  }

  const body = (req.body ?? {}) as {
    email?: unknown
    firstName?: unknown
    vertical?: unknown
    consent?: unknown
    company?: unknown
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim().slice(0, 80) : ''
  const vertical =
    typeof body.vertical === 'string' && VERTICALS.includes(body.vertical) ? body.vertical : null
  const consent = body.consent === true
  const honeypot = typeof body.company === 'string' ? body.company.trim() : ''

  if (honeypot) {
    return res.status(200).json({ ok: true, guideUrl: '/chatgpt-ads-cheat-sheet', emailSent: false })
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email.' })
  }
  if (!consent) {
    return res.status(400).json({
      error:
        'Please tick the consent box so we can send the cheat sheet (Canadian anti-spam law requires it).',
    })
  }
  if (!rateLimit(`guide-email:${email}`, 5, 24 * 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'This email has requested the guide a few times today already.' })
  }

  const token = mintToken()
  const guideUrl = `/chatgpt-ads-cheat-sheet/guide?k=${encodeURIComponent(token)}`

  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('guide_leads').insert({
      email,
      first_name: firstName || null,
      vertical,
      consent,
      consent_ts: new Date().toISOString(),
      ip,
      source: SOURCE,
    })
    if (error) console.error('[guide-lead] store failed (continuing):', error.message)
  } catch (err) {
    console.error('[guide-lead] supabase error (continuing):', err)
  }

  const emailResult = await sendDeliveryEmail({
    to: email,
    firstName: firstName || undefined,
    guideUrl: `${appOrigin()}${guideUrl}&utm_source=email&utm_medium=delivery&utm_campaign=chatgpt-ads-cheat-sheet`,
  })

  return res.status(200).json({ ok: true, guideUrl, emailSent: emailResult.sent })
}

export async function handleGuideAccess(req: VercelRequest, res: VercelResponse) {
  const k = typeof req.query.k === 'string' ? req.query.k : ''
  if (!verifyToken(k)) {
    return res.status(403).json({ error: 'invalid_or_expired' })
  }

  const guide = await loadGuide()
  const split = splitAtIndustries(guide.body)
  const parts = split.sectionIntro ? split : { ...split, before: guide.body }

  return res.status(200).json({
    ok: true,
    author: guide.meta.author,
    parts,
  })
}
