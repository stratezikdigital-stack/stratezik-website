/**
 * Best-effort sitemap notification after build.
 * Google retired unsolicited sitemap pings (2023); use GSC sitemap resubmit + URL Inspection instead.
 * Bing may still accept pings; failures are logged but non-fatal.
 */
export async function pingSearchEngines(sitemapUrl: string): Promise<void> {
  const encoded = encodeURIComponent(sitemapUrl)
  const endpoints = [`https://www.bing.com/ping?sitemap=${encoded}`]

  console.log(
    `[seo] sitemap updated at ${sitemapUrl} — resubmit in GSC (Indexing → Sitemaps) and request indexing for priority URLs`,
  )

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow' })
      const host = new URL(url).hostname
      if (res.ok) {
        console.log(`[seo] sitemap ping ${host} → HTTP ${res.status}`)
      } else {
        console.warn(`[seo] sitemap ping ${host} → HTTP ${res.status} (non-fatal)`)
      }
    } catch (err) {
      console.warn(`[seo] sitemap ping failed ${url}:`, err)
    }
  }
}
