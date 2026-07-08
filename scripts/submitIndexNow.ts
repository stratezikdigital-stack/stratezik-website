/**
 * Notify Bing/Yandex et al. of new or updated URLs via IndexNow (post-build).
 * Key file must stay at https://www.stratezik.com/{key}.txt
 */
import { SITE_ORIGIN } from '../src/seo/siteConfig'

export const INDEXNOW_KEY = 'stratezik-indexnow-7f3a9c2e1b4d8f6a'
const INDEXNOW_HOST = 'www.stratezik.com'
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  'https://searchadvisor.naver.com/indexnow',
  'https://search.seznam.cz/indexnow',
] as const

/** Always ping these after deploy — hub, research, machine-readable indexes. */
export const INDEXNOW_PRIORITY_PATHS = [
  '/',
  '/blog/toronto-startup-website-audit-2026',
  '/toronto-startup-website-audit-2026',
  '/blog/toronto-ai-citation-tracker',
  '/blog/toronto-ai-citation-tracker-july-2026',
  '/blog/toronto-chatgpt-ads-index',
  '/blog/get-recommended-by-chatgpt-toronto',
  '/llms-full.txt',
  '/llm-context.json',
  '/llms.txt',
  '/sitemap.xml',
] as const

function toAbsoluteUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

export async function submitIndexNow(urlPaths: string[]): Promise<void> {
  const unique = [...new Set(urlPaths.map(toAbsoluteUrl))]
  if (unique.length === 0) return

  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: unique,
  }

  try {
    for (const endpoint of INDEXNOW_ENDPOINTS) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
      })

      const host = new URL(endpoint).hostname
      if (res.ok || res.status === 202) {
        console.log(`[seo] IndexNow ${host} → HTTP ${res.status} (${unique.length} URL(s))`)
        continue
      }

      const text = await res.text().catch(() => '')
      if (host.includes('bing') || host.includes('indexnow.org')) {
        console.warn(
          `[seo] IndexNow ${host} → HTTP ${res.status} (non-fatal)${text ? `: ${text.slice(0, 160)}` : ''} — verify www.stratezik.com in Bing Webmaster Tools to enable Bing/ChatGPT discovery`,
        )
      } else {
        console.warn(`[seo] IndexNow ${host} → HTTP ${res.status} (non-fatal)${text ? `: ${text.slice(0, 120)}` : ''}`)
      }
    }
  } catch (err) {
    console.warn('[seo] IndexNow submission failed (non-fatal):', err)
  }
}

/** Paths whose lastmod is within the last N days (plus priority list). */
export function indexNowPathsFromConfigs(
  configs: { path: string; dateModified?: string; datePublished?: string; sitemapPriority?: number }[],
  withinDays = 14,
): string[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - withinDays)
  const cutoffIso = cutoff.toISOString().slice(0, 10)

  const recent = configs
    .filter((c) => {
      const last = c.dateModified ?? c.datePublished
      return last && last >= cutoffIso
    })
    .map((c) => c.path)

  const highPriority = configs
    .filter((c) => (c.sitemapPriority ?? 0) >= 0.92)
    .map((c) => c.path)

  return [...INDEXNOW_PRIORITY_PATHS, ...recent, ...highPriority]
}
