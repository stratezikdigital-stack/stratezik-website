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

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd ? fwd.split(',')[0].trim() : 'unknown'
}
