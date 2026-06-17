// Sitemap-wide audit (Wave 3) — ingest a site's sitemap.xml and run every URL
// through the deterministic GEO diagnostic stack (chunking, trust markers,
// synthesis, hydration). No LLM/Serper per page, so a 25-page crawl stays cheap
// and fast. This is the premium "AI Search Compiler" tier. Server-side only.

import { get } from './scan.js'
import { deterministicScanners, geoScoreOf, type GeoScanner, type ScannerStatus } from './geo.js'

export interface SitemapPageAudit {
  url: string
  geoScore: number
  statuses: Record<GeoScanner['key'], ScannerStatus | undefined>
  topIssue: string | null // the worst scanner's fix, for the dashboard
}

export interface SitemapAudit {
  domain: string
  sitemapFound: boolean
  urlsDiscovered: number
  pagesAudited: number
  overallScore: number
  jsBlankCount: number // pages invisible to JS-free AI crawlers
  issueCounts: Record<GeoScanner['key'], number> // # of pages failing each scanner
  worstPages: SitemapPageAudit[] // up to 10, lowest score first
  pages: SitemapPageAudit[]
}

const SCANNER_KEYS: GeoScanner['key'][] = [
  'chunking',
  'trust_markers',
  'synthesis',
  'hydration',
]

// ─── Sitemap discovery ───────────────────────────────────────────────────────

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1].trim())
}

export async function discoverSitemapUrls(domain: string, maxUrls = 25): Promise<string[]> {
  const base = `https://${domain}`
  const candidates: string[] = []

  // robots.txt may point at one or more sitemaps
  const robots = await get(base + '/robots.txt', 12000)
  if (robots.ok) {
    for (const m of robots.text.matchAll(/^\s*sitemap:\s*(\S+)/gim)) candidates.push(m[1].trim())
  }
  if (candidates.length === 0) candidates.push(base + '/sitemap.xml')

  const pageUrls = new Set<string>()
  const childSitemaps: string[] = []

  for (const sm of candidates.slice(0, 3)) {
    const res = await get(sm, 15000)
    if (!res.ok) continue
    if (/<sitemapindex/i.test(res.text)) {
      childSitemaps.push(...extractLocs(res.text).slice(0, 4))
    } else {
      for (const u of extractLocs(res.text)) pageUrls.add(u)
    }
    if (pageUrls.size >= maxUrls) break
  }

  // Resolve a few child sitemaps from an index
  for (const child of childSitemaps) {
    if (pageUrls.size >= maxUrls) break
    const res = await get(child, 15000)
    if (!res.ok) continue
    for (const u of extractLocs(res.text)) {
      pageUrls.add(u)
      if (pageUrls.size >= maxUrls) break
    }
  }

  // Keep on-domain, prefer content-ish URLs, cap.
  return [...pageUrls]
    .filter((u) => {
      try {
        return new URL(u).hostname.replace(/^www\./, '').toLowerCase().endsWith(domain.toLowerCase())
      } catch {
        return false
      }
    })
    .slice(0, maxUrls)
}

// ─── Per-page audit (deterministic only) ─────────────────────────────────────

async function auditPage(url: string, domain: string): Promise<SitemapPageAudit | null> {
  const res = await get(url, 15000)
  if (!res.ok || res.text.length < 150) return null
  const { scanners } = deterministicScanners(res.text, domain)
  const statuses = Object.fromEntries(scanners.map((s) => [s.key, s.status])) as SitemapPageAudit['statuses']
  const worst = scanners
    .filter((s) => s.status !== 'pass')
    .sort((a, b) => (a.status === 'fail' ? -1 : 1) - (b.status === 'fail' ? -1 : 1))[0]
  return {
    url,
    geoScore: geoScoreOf(scanners),
    statuses,
    topIssue: worst ? `${worst.label}: ${worst.fix}` : null,
  }
}

// Small concurrency limiter so we don't fire 25 fetches at once.
async function mapLimit<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = []
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return out
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

export async function runSitemapAudit(
  domain: string,
  options: { maxPages?: number } = {}
): Promise<SitemapAudit> {
  const maxPages = options.maxPages ?? 25
  const urls = await discoverSitemapUrls(domain, maxPages)

  const results = (await mapLimit(urls, 5, (u) => auditPage(u, domain))).filter(
    (p): p is SitemapPageAudit => p !== null
  )

  const issueCounts = Object.fromEntries(SCANNER_KEYS.map((k) => [k, 0])) as SitemapAudit['issueCounts']
  for (const p of results) {
    for (const k of SCANNER_KEYS) {
      if (p.statuses[k] === 'fail') issueCounts[k]++
    }
  }
  const jsBlankCount = results.filter((p) => p.statuses.hydration === 'fail').length
  const overallScore =
    results.length > 0
      ? Math.round(results.reduce((a, p) => a + p.geoScore, 0) / results.length)
      : 0
  const worstPages = [...results].sort((a, b) => a.geoScore - b.geoScore).slice(0, 10)

  return {
    domain,
    sitemapFound: urls.length > 0,
    urlsDiscovered: urls.length,
    pagesAudited: results.length,
    overallScore,
    jsBlankCount,
    issueCounts,
    worstPages,
    pages: results,
  }
}
