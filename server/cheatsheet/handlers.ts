import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createAdminClient } from '../../api/lib/aeo/supabase-admin.js'
import { enforceSpamGuards } from '../../api/lib/spam/validate.js'
import { sendDeliveryEmail } from './email.js'
import { loadGuide, splitAtIndustries } from './guide.js'
import { appendChatGptLeadToSheet } from './sheets.js'
import { mintToken, verifyToken } from './token.js'

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
  const body = (req.body ?? {}) as {
    email?: unknown
    firstName?: unknown
    vertical?: unknown
    consent?: unknown
    company?: unknown
    formToken?: unknown
    turnstileToken?: unknown
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const allowed = await enforceSpamGuards(req, res, body as Record<string, unknown>, {
    bucket: 'guide-lead',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'company',
    email,
    silentHoneypotResponse: { ok: true, guideUrl: '/chatgpt-ads-cheat-sheet', emailSent: false },
  })
  if (!allowed) return

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim().slice(0, 80) : ''
  const vertical =
    typeof body.vertical === 'string' && VERTICALS.includes(body.vertical) ? body.vertical : null
  const consent = body.consent === true

  if (!consent) {
    return res.status(400).json({
      error:
        'Please tick the consent box so we can send the cheat sheet (Canadian anti-spam law requires it).',
    })
  }
  if (!vertical) {
    return res.status(400).json({ error: 'Please select your industry.' })
  }

  const ip =
    typeof req.headers['x-forwarded-for'] === 'string'
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : 'unknown'

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

  void appendChatGptLeadToSheet({
    email,
    firstName: firstName || undefined,
    vertical,
    source: SOURCE,
    consent,
    emailSent: emailResult.sent,
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
