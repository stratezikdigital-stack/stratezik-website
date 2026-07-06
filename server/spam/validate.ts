import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clientIp } from '../aeo/rate-limit.js'
import { isDisposableEmail } from './disposable-email.js'
import { isDeliverableEmailDomain } from './email-deliverable.js'
import { verifyFormToken } from './form-token.js'
import { consumeRateLimit, type RateLimitStatus } from './rate-limit.js'
import { turnstileConfigured, verifyTurnstile } from './turnstile.js'

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export type SpamGuardOptions = {
  /** Rate-limit bucket key prefix, e.g. `contact`. */
  bucket: string
  maxPerIp: number
  windowMs: number
  /** Hidden field name bots fill (e.g. `website`, `company`, `fax`). */
  honeypotField?: string
  /** Require Cloudflare Turnstile when secret is configured. */
  requireTurnstile?: boolean
  /** Require HMAC timing token from GET /api/form-token. */
  requireFormToken?: boolean
  /** When true, IP rate limit runs after honeypot, form token, and Turnstile. */
  rateLimitAfterValidation?: boolean
  /** Validate email field and block disposable domains. */
  email?: string
  /** JSON body returned when honeypot trips (default `{ ok: true }`). */
  silentHoneypotResponse?: Record<string, unknown>
}

export type SpamBody = Record<string, unknown>

export type SpamGuardResult =
  | { allowed: true; rateLimit?: RateLimitStatus }
  | { allowed: false }

function readString(body: SpamBody, key: string): string {
  const v = body[key]
  return typeof v === 'string' ? v.trim() : ''
}

function rateLimitPayload(status: RateLimitStatus, bucket?: string): Record<string, unknown> {
  const quota = {
    used: status.used,
    limit: status.limit,
    remaining: status.remaining,
    resetAt: status.resetAt,
  }
  const payload: Record<string, unknown> = { rateLimit: quota }
  if (bucket === 'aeo-scan') payload.scanQuota = quota
  return payload
}

async function enforceIpRateLimit(
  res: VercelResponse,
  ip: string,
  opts: SpamGuardOptions,
): Promise<SpamGuardResult> {
  const status = await consumeRateLimit(`${opts.bucket}:ip:${ip}`, opts.maxPerIp, opts.windowMs)
  if (!status.allowed) {
    res.status(429).json({
      error: 'Too many requests. Please wait and try again.',
      ...rateLimitPayload(status, opts.bucket),
    })
    return { allowed: false }
  }
  return { allowed: true, rateLimit: status }
}

/**
 * Returns `{ allowed: true }` when the request passed all guards.
 * On failure, sends an appropriate response and returns `{ allowed: false }`.
 */
export async function enforceSpamGuards(
  req: VercelRequest,
  res: VercelResponse,
  body: SpamBody,
  opts: SpamGuardOptions,
): Promise<SpamGuardResult> {
  const ip = clientIp(req)
  let priorRateLimit: RateLimitStatus | undefined

  if (!opts.rateLimitAfterValidation) {
    const ipLimit = await enforceIpRateLimit(res, ip, opts)
    if (!ipLimit.allowed) return ipLimit
    priorRateLimit = ipLimit.rateLimit
  }

  if (opts.honeypotField) {
    const trap = readString(body, opts.honeypotField)
    if (trap) {
      res.status(200).json(opts.silentHoneypotResponse ?? { ok: true })
      return { allowed: false }
    }
  }

  if (opts.requireFormToken !== false) {
    const token = readString(body, 'formToken')
    if (!verifyFormToken(token)) {
      res.status(400).json({ error: 'Form expired. Refresh the page and try again.' })
      return { allowed: false }
    }
  }

  if (opts.requireTurnstile !== false && turnstileConfigured()) {
    const turnstileToken = readString(body, 'turnstileToken')
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      res.status(403).json({ error: 'Bot check failed. Refresh and try again.' })
      return { allowed: false }
    }
  }

  if (opts.rateLimitAfterValidation) {
    const ipLimit = await enforceIpRateLimit(res, ip, opts)
    if (!ipLimit.allowed) return ipLimit
    if (opts.email) {
      const emailResult = await enforceEmailLimits(res, opts, ipLimit.rateLimit)
      return emailResult
    }
    return ipLimit
  }

  if (opts.email) {
    return enforceEmailLimits(res, opts, priorRateLimit)
  }

  return { allowed: true, rateLimit: priorRateLimit }
}

async function enforceEmailLimits(
  res: VercelResponse,
  opts: SpamGuardOptions,
  priorRateLimit?: RateLimitStatus,
): Promise<SpamGuardResult> {
  const email = opts.email!.trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Please enter a valid email address.' })
    return { allowed: false }
  }
  if (isDisposableEmail(email)) {
    res.status(400).json({ error: 'Please use a work or personal email we can reply to.' })
    return { allowed: false }
  }
  if (!(await isDeliverableEmailDomain(email))) {
    res.status(400).json({
      error: 'That email domain can’t receive mail — please double-check your address.',
    })
    return { allowed: false }
  }
  const status = await consumeRateLimit(`${opts.bucket}:email:${email}`, 5, 24 * 60 * 60 * 1000)
  if (!status.allowed) {
    res.status(429).json({ error: 'This email has been used too many times today. Try again tomorrow.' })
    return { allowed: false }
  }
  return { allowed: true, rateLimit: priorRateLimit }
}
