import type { RateLimitStatus } from '../spam/rate-limit.js'

export const AEO_SCAN_MAX_PER_IP = 10
export const AEO_SCAN_WINDOW_MS = 60 * 60 * 1000
export const AEO_SCAN_BUCKET = 'aeo-scan'

export type ScanQuotaPayload = {
  used: number
  limit: number
  remaining: number
  resetAt: number
}

export function toScanQuota(status: RateLimitStatus): ScanQuotaPayload {
  return {
    used: status.used,
    limit: status.limit,
    remaining: status.remaining,
    resetAt: status.resetAt,
  }
}

export function scanQuotaKey(ip: string): string {
  return `${AEO_SCAN_BUCKET}:ip:${ip}`
}
