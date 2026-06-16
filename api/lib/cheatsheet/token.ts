import { createHmac, timingSafeEqual } from 'node:crypto'

const TTL_MS = 30 * 24 * 60 * 60 * 1000

function secret(): string {
  return (
    process.env.GUIDE_TOKEN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    'stratezik-chatgpt-ads-cheat-sheet-dev-secret'
  )
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function mintToken(): string {
  const exp = String(Date.now() + TTL_MS)
  return `${exp}.${sign(exp)}`
}

export function verifyToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig) return false
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false
  const expected = sign(exp)
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    return a.length === b.length && timingSafeEqual(a, b)
  } catch {
    return false
  }
}
