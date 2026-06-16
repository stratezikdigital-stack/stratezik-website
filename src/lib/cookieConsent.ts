export type CookieConsentLevel = 'essential' | 'all'

export type CookieConsentRecord = {
  level: CookieConsentLevel
  updatedAt: string
}

const STORAGE_KEY = 'stratezik_cookie_consent'

export function getCookieConsent(): CookieConsentRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CookieConsentRecord
    if (parsed?.level === 'essential' || parsed?.level === 'all') return parsed
    return null
  } catch {
    return null
  }
}

export function setCookieConsent(level: CookieConsentLevel): CookieConsentRecord {
  const record: CookieConsentRecord = { level, updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  window.dispatchEvent(new CustomEvent('stratezik:cookie-consent', { detail: record }))
  return record
}

export function hasAnalyticsConsent(): boolean {
  return getCookieConsent()?.level === 'all'
}
