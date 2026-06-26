import crypto from 'node:crypto'

const MIN_AGE_MS = 1_000
const MAX_AGE_MS = 60 * 60 * 1000

function secret(): string {
  return (
    process.env.SPAM_FORM_SECRET ||
    process.env.GUIDE_TOKEN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'dev-spam-form-secret'
  )
}

export function mintFormToken(): string {
  const ts = String(Date.now())
  const sig = crypto.createHmac('sha256', secret()).update(ts).digest('base64url')
  return `${ts}.${sig}`
}

export function verifyFormToken(token: string): boolean {
  const dot = token.indexOf('.')
  if (dot <= 0) return false
  const tsStr = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const ts = Number(tsStr)
  if (!Number.isFinite(ts)) return false

  const age = Date.now() - ts
  if (age < MIN_AGE_MS || age > MAX_AGE_MS) return false

  const expected = crypto.createHmac('sha256', secret()).update(tsStr).digest('base64url')
  if (sig.length !== expected.length) return false
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
}
