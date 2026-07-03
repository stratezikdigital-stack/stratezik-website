import type { VercelRequest, VercelResponse } from '@vercel/node'
import { clientIp } from '../aeo/rate-limit.js'
import { isDisposableEmail } from './disposable-email.js'
import { isDeliverableEmailDomain } from './email-deliverable.js'
import { verifyFormToken } from './form-token.js'
import { checkRateLimit } from './rate-limit.js'
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
  /** Validate email field and block disposable domains. */
  email?: string
  /** JSON body returned when honeypot trips (default `{ ok: true }`). */
  silentHoneypotResponse?: Record<string, unknown>
}

export type SpamBody = Record<string, unknown>

function readString(body: SpamBody, key: string): string {
  const v = body[key]
  return typeof v === 'string' ? v.trim() : ''
}

/**
 * Returns `true` when the request passed all guards.
 * On failure, sends an appropriate response and returns `false`.
 */
export async function enforceSpamGuards(
  req: VercelRequest,
  res: VercelResponse,
  body: SpamBody,
  opts: SpamGuardOptions,
): Promise<boolean> {
  const ip = clientIp(req)

  if (!(await checkRateLimit(`${opts.bucket}:ip:${ip}`, opts.maxPerIp, opts.windowMs))) {
    res.status(429).json({ error: 'Too many requests. Please wait and try again.' })
    return false
  }

  if (opts.honeypotField) {
    const trap = readString(body, opts.honeypotField)
    if (trap) {
      res.status(200).json(opts.silentHoneypotResponse ?? { ok: true })
      return false
    }
  }

  if (opts.requireFormToken !== false) {
    const token = readString(body, 'formToken')
    if (!verifyFormToken(token)) {
      res.status(400).json({ error: 'Form expired. Refresh the page and try again.' })
      return false
    }
  }

  if (opts.requireTurnstile !== false && turnstileConfigured()) {
    const turnstileToken = readString(body, 'turnstileToken')
    if (!(await verifyTurnstile(turnstileToken, ip))) {
      res.status(403).json({ error: 'Bot check failed. Refresh and try again.' })
      return false
    }
  }

  if (opts.email) {
    const email = opts.email.trim().toLowerCase()
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' })
      return false
    }
    if (isDisposableEmail(email)) {
      res.status(400).json({ error: 'Please use a work or personal email we can reply to.' })
      return false
    }
    if (!(await isDeliverableEmailDomain(email))) {
      res.status(400).json({
        error: 'That email domain can’t receive mail — please double-check your address.',
      })
      return false
    }
    if (!(await checkRateLimit(`${opts.bucket}:email:${email}`, 5, 24 * 60 * 60 * 1000))) {
      res.status(429).json({ error: 'This email has been used too many times today. Try again tomorrow.' })
      return false
    }
  }

  return true
}
