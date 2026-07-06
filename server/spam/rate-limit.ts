import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { consumeMemoryRateLimit, peekMemoryRateLimit } from '../aeo/rate-limit.js'

const limiterCache = new Map<string, Ratelimit>()

export type RateLimitStatus = {
  allowed: boolean
  used: number
  limit: number
  remaining: number
  resetAt: number
}

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

function fromUpstash(limit: number, remaining: number, reset: number, allowed: boolean): RateLimitStatus {
  return {
    allowed,
    used: Math.max(0, limit - remaining),
    limit,
    remaining,
    resetAt: reset,
  }
}

/** Distributed when Upstash is configured; otherwise per-instance in-memory. */
export async function consumeRateLimit(
  key: string,
  max: number,
  windowMs: number,
): Promise<RateLimitStatus> {
  if (upstashAvailable()) {
    const { success, limit, remaining, reset } = await getDistributedLimiter(max, windowMs).limit(key)
    return fromUpstash(limit, remaining, reset, success)
  }
  return consumeMemoryRateLimit(key, max, windowMs)
}

/** Read current usage without consuming a request. */
export async function peekRateLimit(key: string, max: number, windowMs: number): Promise<RateLimitStatus> {
  if (upstashAvailable()) {
    const { remaining, reset, limit } = await getDistributedLimiter(max, windowMs).getRemaining(key)
    return fromUpstash(limit, remaining, reset, remaining > 0)
  }
  return peekMemoryRateLimit(key, max, windowMs)
}

/** @deprecated Prefer consumeRateLimit for status-aware callers. */
export async function checkRateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  const { allowed } = await consumeRateLimit(key, max, windowMs)
  return allowed
}
