export type ScanQuota = {
  used: number
  limit: number
  remaining: number
  resetAt: number
}

export function parseScanQuota(data: Record<string, unknown>): ScanQuota | null {
  const raw = (data.scanQuota ?? data.rateLimit) as Partial<ScanQuota> | undefined
  if (
    !raw ||
    typeof raw.used !== 'number' ||
    typeof raw.limit !== 'number' ||
    typeof raw.remaining !== 'number' ||
    typeof raw.resetAt !== 'number'
  ) {
    return null
  }
  return raw as ScanQuota
}

export function formatScanQuotaLabel(quota: ScanQuota): string {
  if (quota.remaining === 0) {
    const mins = Math.max(1, Math.ceil((quota.resetAt - Date.now()) / 60_000))
    return `Free scans: ${quota.used} of ${quota.limit} used this hour — try again in ~${mins} min`
  }
  return `Free scans: ${quota.used} of ${quota.limit} used this hour`
}
