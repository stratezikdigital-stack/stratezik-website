import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { rateLimit as memoryRateLimit } from '../aeo/rate-limit.js'

const limiterCache = new Map<string, Ratelimit>()

function upstashAvailable(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

function getDistributedLimiter(max: number, windowMs: number): Ratelimit {
  const cacheKey = `${max}:${windowMs}`
  let limiter = limiterCache.get(cacheKey)
  if (!limiter) {
    const windowSec = Math.max(1, Math.round(windowMs / 1000))
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(max, `${windowSec} s`),
      prefix: 'sz:spam',
      analytics: true,
    })
    limiterCache.set(cacheKey, limiter)
  }
  return limiter
}

/** Distributed when Upstash is configured; otherwise per-instance in-memory. */
export async function checkRateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  if (upstashAvailable()) {
    const { success } = await getDistributedLimiter(max, windowMs).limit(key)
    return success
  }
  return memoryRateLimit(key, max, windowMs)
}
