// In-memory sliding-window rate limiter for the public AEO checker endpoints.
// Per-instance only — good enough for a single-region Vercel/Node deployment;
// the 24h per-domain scan cache in Supabase does the heavy lifting anyway.

const windows = new Map<string, number[]>()

export type MemoryRateLimitStatus = {
  allowed: boolean
  used: number
  limit: number
  remaining: number
  resetAt: number
}

function activeHits(key: string, max: number, windowMs: number, now: number): number[] {
  const hits = (windows.get(key) ?? []).filter((t) => now - t < windowMs)
  windows.set(key, hits)
  return hits
}

function resetAtForHits(hits: number[], windowMs: number, now: number): number {
  if (hits.length === 0) return now + windowMs
  return Math.min(...hits) + windowMs
}

function toStatus(hits: number[], max: number, windowMs: number, now: number): MemoryRateLimitStatus {
  const used = hits.length
  const remaining = Math.max(0, max - used)
  return {
    allowed: used < max,
    used,
    limit: max,
    remaining,
    resetAt: resetAtForHits(hits, windowMs, now),
  }
}

export function peekMemoryRateLimit(key: string, max: number, windowMs: number): MemoryRateLimitStatus {
  const now = Date.now()
  const hits = activeHits(key, max, windowMs, now)
  return toStatus(hits, max, windowMs, now)
}

export function consumeMemoryRateLimit(key: string, max: number, windowMs: number): MemoryRateLimitStatus {
  const now = Date.now()
  const hits = activeHits(key, max, windowMs, now)
  if (hits.length >= max) {
    return toStatus(hits, max, windowMs, now)
  }
  hits.push(now)
  windows.set(key, hits)
  if (windows.size > 5000) {
    for (const [k, v] of windows) {
      if (v.every((t) => now - t >= windowMs)) windows.delete(k)
    }
  }
  return toStatus(hits, max, windowMs, now)
}

/** @deprecated Prefer consumeMemoryRateLimit. */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  return consumeMemoryRateLimit(key, max, windowMs).allowed
}

type HeaderSource =
  | Request
  | { headers?: Record<string, string | string[] | undefined> }

export function clientIp(req: HeaderSource): string {
  if ('headers' in req && typeof (req.headers as Headers).get === 'function') {
    const fwd = (req.headers as Headers).get('x-forwarded-for')
    return fwd ? fwd.split(',')[0].trim() : 'unknown'
  }
  const hdrs = (req as { headers?: Record<string, string | string[] | undefined> }).headers ?? {}
  const fwd = hdrs['x-forwarded-for']
  const val = Array.isArray(fwd) ? fwd[0] : fwd
  return typeof val === 'string' && val.length > 0 ? val.split(',')[0].trim() : 'unknown'
}
