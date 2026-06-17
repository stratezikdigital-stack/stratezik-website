// In-memory sliding-window rate limiter for the public AEO checker endpoints.
// Per-instance only — good enough for a single-region Vercel/Node deployment;
// the 24h per-domain scan cache in Supabase does the heavy lifting anyway.

const windows = new Map<string, number[]>()

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (windows.get(key) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= max) {
    windows.set(key, hits)
    return false
  }
  hits.push(now)
  windows.set(key, hits)
  // Opportunistic cleanup so the map doesn't grow unbounded
  if (windows.size > 5000) {
    for (const [k, v] of windows) {
      if (v.every((t) => now - t >= windowMs)) windows.delete(k)
    }
  }
  return true
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
