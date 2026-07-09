import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clientIp } from '../aeo/rate-limit.js'
import { mintFormToken } from '../spam/form-token.js'
import { enforceSpamGuards } from '../spam/validate.js'

const CONTACT_WEBHOOK_FALLBACK =
  'https://script.google.com/macros/s/AKfycbyRQyW4slnqjxI4yY75-Tj2RX-uTlJg5dUIZBbaRnsJ1yBB8tPdOZmI3sV0T3WX4wL_/exec'

function contactWebhookUrl(): string {
  return (
    process.env.GOOGLE_LEADS_WEBHOOK_URL ||
    process.env.GOOGLE_CONTACT_WEBHOOK_URL ||
    CONTACT_WEBHOOK_FALLBACK
  ).trim()
}

function growthCreditWebhookUrl(): string {
  return (process.env.GOOGLE_LEADS_WEBHOOK_URL || process.env.GOOGLE_GROWTH_CREDIT_WEBHOOK_URL || '').trim()
}

async function postToAppsScript(
  webhookUrl: string,
  payload: Record<string, string>,
): Promise<boolean> {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  })
  return res.ok
}

export async function handleFormToken(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({ token: mintFormToken() })
}

export async function handleContact(req: VercelRequest, res: VercelResponse) {
  const body = (req.body ?? {}) as Record<string, unknown>
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  const guard = await enforceSpamGuards(req, res, body, {
    bucket: 'contact',
    maxPerIp: 8,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'fax',
    email,
  })
  if (!guard.allowed) return

  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
  const company = typeof body.company === 'string' ? body.company.trim().slice(0, 120) : ''
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 4000) : ''

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Name, email, and company are required.' })
  }

  const webhook = contactWebhookUrl()
  const ok = await postToAppsScript(webhook, {
    type: 'contact',
    name,
    email,
    company,
    message,
    source: 'stratezik.com',
    ip: clientIp(req),
  })

  if (!ok) {
    console.error('[contact] Apps Script webhook failed')
    return res.status(502).json({ error: 'Could not send your message. Email dave@stratezik.com instead.' })
  }

  return res.status(200).json({ ok: true })
}

export async function handleGrowthCredit(req: VercelRequest, res: VercelResponse) {
  const webhook = growthCreditWebhookUrl()
  if (!webhook) {
    return res.status(503).json({
      error: 'Lead capture is not configured yet. Email dave@stratezik.com or call 437-525-4772.',
    })
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  const guard = await enforceSpamGuards(req, res, body, {
    bucket: 'growth-credit',
    maxPerIp: 6,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email,
  })
  if (!guard.allowed) return

  const firstName = typeof body.firstName === 'string' ? body.firstName.trim().slice(0, 80) : ''
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim().slice(0, 80) : ''
  const business = typeof body.business === 'string' ? body.business.trim().slice(0, 120) : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : ''
  const businessType = typeof body.businessType === 'string' ? body.businessType.trim().slice(0, 80) : ''

  if (!firstName || !email) {
    return res.status(400).json({ error: 'First name and email are required.' })
  }

  const ok = await postToAppsScript(webhook, {
    type: 'growth-credit',
    first_name: firstName,
    last_name: lastName,
    business,
    email,
    phone,
    business_type: businessType,
    source: 'growth-credit',
    ip: clientIp(req),
  })

  if (!ok) {
    console.error('[growth-credit] Apps Script webhook failed')
    return res.status(502).json({ error: 'Could not submit your request. Email dave@stratezik.com instead.' })
  }

  return res.status(200).json({ ok: true })
}

export async function handleSurvey(req: VercelRequest, res: VercelResponse) {
  const webhook = contactWebhookUrl()
  if (!webhook) {
    return res.status(503).json({
      error: 'Survey capture is not configured yet. Email dave@stratezik.com instead.',
    })
  }

  const body = (req.body ?? {}) as Record<string, unknown>
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''

  const guard = await enforceSpamGuards(req, res, body, {
    bucket: 'survey',
    maxPerIp: 10,
    windowMs: 60 * 60 * 1000,
    honeypotField: 'website',
    email: email || undefined,
  })
  if (!guard.allowed) return

  const str = (key: string, max = 500) =>
    typeof body[key] === 'string' ? body[key].trim().slice(0, max) : ''

  const location = str('location', 80)
  const employees = str('employees', 40)
  const marketingManager = str('marketingManager', 120)
  const biggestChallenge = str('biggestChallenge', 160)
  const aiFamiliarity = str('aiFamiliarity', 160)
  const skills = str('skills', 800)
  const supportIntent = str('supportIntent', 80)
  const monthlyBudget = str('monthlyBudget', 40)
  const oneChange = str('oneChange', 500)

  if (
    !location ||
    !employees ||
    !marketingManager ||
    !biggestChallenge ||
    !aiFamiliarity ||
    !skills ||
    !supportIntent ||
    !monthlyBudget ||
    !oneChange
  ) {
    return res.status(400).json({ error: 'Please complete all required questions.' })
  }

  const ok = await postToAppsScript(webhook, {
    type: 'survey',
    location,
    location_other: str('locationOther', 120),
    employees,
    marketing_manager: marketingManager,
    biggest_challenge: biggestChallenge,
    biggest_challenge_other: str('biggestChallengeOther', 200),
    ai_familiarity: aiFamiliarity,
    skills,
    support_intent: supportIntent,
    monthly_budget: monthlyBudget,
    one_change: oneChange,
    findings_summary: str('findingsSummary', 120),
    follow_up_consent: str('followUpConsent', 20),
    preferred_contact: str('preferredContact', 40),
    phone: str('phone', 40),
    email,
    source: str('source', 80) || 'gta-smb-readiness-survey',
    ref: str('ref', 80),
    ip: clientIp(req),
  })

  if (!ok) {
    console.error('[survey] Apps Script webhook failed')
    return res.status(502).json({ error: 'Could not save your response. Email dave@stratezik.com instead.' })
  }

  return res.status(200).json({ ok: true })
}
