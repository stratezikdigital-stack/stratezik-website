/**
 * Notify Bing/Yandex et al. of new or updated URLs via IndexNow (post-build).
 * Key file must stay at https://www.stratezik.com/{key}.txt
 */
import { SITE_ORIGIN } from '../src/seo/siteConfig'

export const INDEXNOW_KEY = 'stratezik-indexnow-7f3a9c2e1b4d8f6a'
const INDEXNOW_HOST = 'www.stratezik.com'
const KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`

/** Always ping these after deploy — hub, research, machine-readable indexes. */
export const INDEXNOW_PRIORITY_PATHS = [
  '/',
  '/blog/toronto-ai-citation-tracker',
  '/blog/toronto-ai-citation-tracker-july-2026',
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
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    })

    if (res.ok || res.status === 202) {
      console.log(`[seo] IndexNow submitted ${unique.length} URL(s) → HTTP ${res.status}`)
      return
    }

    const text = await res.text().catch(() => '')
    console.warn(`[seo] IndexNow → HTTP ${res.status} (non-fatal)${text ? `: ${text.slice(0, 200)}` : ''}`)
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
