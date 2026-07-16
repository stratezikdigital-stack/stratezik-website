// 20-Point AEO Readiness Test — single-domain scanner for the public checker.
// Ported from stratezik-conductor/src/aeo20.ts so tool scores stay consistent
// with the published Toronto Startup Website Audit 2026 research.

import { serperConfigured, serperSearch } from './serper.js'

const UA = 'Mozilla/5.0 (compatible; StratezikAudit/1.0; +https://stratezik.com/aeo-checker)'
const AI_BOTS = ['GPTBot', 'CCBot', 'Google-Extended', 'PerplexityBot', 'ClaudeBot']

export type SubScore = number | 'unverifiable'

export interface CriterionResult {
  key: string
  label: string
  group: 'A' | 'B'
  score: SubScore
  max: number
  evidence: string
  fix: string | null
}

export interface GroupSplit {
  earned: number
  possible: number
  pct: number | null
}

export interface CrawlerProbeEntry {
  bot: string
  status: number
  allowed: boolean
}

export interface CrawlerProbe {
  total: number
  allowedCount: number
  blockedCount: number
  entries: CrawlerProbeEntry[]
}

/** ChatGPT Search / Copilot: OAI-SearchBot access + web indexation gates. */
export interface ChatGptSearchReadiness {
  botAllowed: boolean | null
  botStatus: number
  indexed: boolean | null
  indexSource: 'google' | 'bing' | null
  indexPagesSeen: number
  ready: boolean
  summary: string
}

export interface AeoScanResult {
  domain: string
  url: string
  checkedAt: string
  criteria: CriterionResult[]
  scoredCount: number
  total: number | 'unverifiable'
  groupA: GroupSplit
  groupB: GroupSplit
  companyName: string
  /** First ~500 chars of stripped homepage copy (for deep-scan buyer queries). */
  snippet: string
  crawlerProbe?: CrawlerProbe
  /** Runs on every real scan (skipped for lightweight competitor scans). */
  chatgptSearch?: ChatGptSearchReadiness
}

export const BENCHMARK = {
  median: 10.75,
  max: 17,
  groupAPct: 95,
  groupBPct: 29,
  faqPct: 5,
  orgMissingPct: 52,
  llmsTxtPct: 33,
  pricingSchemaCount: 1,
  n: 50,
}

export async function get(
  url: string,
  timeoutMs = 20000
): Promise<{ ok: boolean; status: number; text: string }> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'text/html,text/plain,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    })
    const text = await res.text()
    return { ok: res.ok, status: res.status, text }
  } catch {
    return { ok: false, status: 0, text: '' }
  }
}

export function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function extractJsonLd(html: string): unknown[] {
  const out: unknown[] = []
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim())
      const items = Array.isArray(parsed) ? parsed : parsed['@graph'] ? parsed['@graph'] : [parsed]
      out.push(...items)
    } catch {
      // malformed block — skip
    }
  }
  return out
}

export function hasType(items: unknown[], types: string[]): boolean {
  return items.some((i) => {
    const t = (i as Record<string, unknown>)?.['@type']
    const list = Array.isArray(t) ? t : [t]
    return list.some((x) => types.includes(String(x)))
  })
}

export function normaliseDomain(input: string): string | null {
  const cleaned = input
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/.*$/, '')
    .replace(/[?#].*$/, '')
    .toLowerCase()
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(cleaned)) {
    return null
  }
  return cleaned
}

async function tavilyHits(query: string): Promise<{ count: number; content: string }> {
  const key = process.env.TAVILY_API_KEY
  if (!key) return { count: 0, content: '' }
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key, query, max_results: 3, search_depth: 'basic' }),
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) return { count: 0, content: '' }
    const data = (await res.json()) as { results?: { url: string; content: string }[] }
    const results = data.results ?? []
    return {
      count: results.length,
      content: results.map((r) => `${r.url} ${r.content}`).join(' '),
    }
  } catch {
    return { count: 0, content: '' }
  }
}

async function judgeAnswerFirst(snippet: string): Promise<SubScore> {
  if (snippet.length < 80) return 'unverifiable'
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return 'unverifiable'
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 10,
        temperature: 0,
        system:
          'You are a strict, consistent scoring engine. Output only a single number. No commentary.',
        messages: [
          {
            role: 'user',
            content: `Score this company homepage opening text for "answer-first formatting" on this rubric:
2.5 = the first visible text plainly states what the company does and for whom (a direct answer)
1.25 = partially clear (what OR who, not both; or buried after a slogan)
0 = vague slogan, hype language, or no clear statement

Return ONLY the number: 2.5, 1.25, or 0.

${snippet}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) return 'unverifiable'
    const data = (await res.json()) as { content?: { type: string; text: string }[] }
    const text = data.content?.find((c) => c.type === 'text')?.text ?? ''
    const m = text.match(/2\.5|1\.25|0/)
    return m ? Number(m[0]) : 'unverifiable'
  } catch {
    return 'unverifiable'
  }
}

const FIXES: Record<string, string> = {
  robots_ai:
    'Update robots.txt to allow GPTBot, CCBot, Google-Extended, PerplexityBot, and ClaudeBot. If your CDN or firewall blocks bots by default, add explicit allow rules for AI crawlers.',
  ssr_no_js:
    'Your page content is invisible without JavaScript — AI crawlers do not execute JS. Move to server-side rendering or static generation (Next.js, Astro, or pre-rendering) so your copy ships in the raw HTML.',
  entity_alignment:
    'Create or claim your LinkedIn company page and Crunchbase organization profile, and make sure both list your website domain. AI engines triangulate who you are from these sources.',
  org_schema:
    'Add Organization JSON-LD to your homepage: name, url, logo, sameAs links to your social profiles. This is the machine-readable "business card" AI engines look for first.',
  faq_schema:
    'Add an FAQ section to your homepage or a key page and mark it up with FAQPage JSON-LD. Only ~5% of funded startups have this — it is one of the highest-impact quick wins.',
  answer_first:
    'Rewrite your hero copy so the first visible sentence states plainly what you do and for whom — before any slogan. AI engines quote the first clear answer they find.',
  llms_txt:
    'Publish an llms.txt file at your domain root: a markdown file with an H1 title and links to your key pages. It is an emerging standard read by AI coding and research agents (Google does not use it — set expectations accordingly).',
  pricing_schema:
    'Add Product/Service or Offer JSON-LD with price fields. If you are contact-sales B2B, at minimum publish a /pricing page that names your pricing model (per seat, per month) — partial credit beats silence.',
}

const LABELS: Record<string, { label: string; group: 'A' | 'B' }> = {
  robots_ai: { label: 'AI crawler access (robots.txt)', group: 'A' },
  ssr_no_js: { label: 'JavaScript-free rendering (SSR/SSG)', group: 'A' },
  entity_alignment: { label: 'Off-page entity alignment (LinkedIn / Crunchbase)', group: 'A' },
  org_schema: { label: 'Organization schema', group: 'B' },
  faq_schema: { label: 'FAQPage schema', group: 'B' },
  answer_first: { label: 'Answer-first formatting', group: 'B' },
  llms_txt: { label: 'llms.txt', group: 'B' },
  pricing_schema: { label: 'Pricing transparency + Product/Service schema', group: 'B' },
}

export type AeoScanOptions = {
  skipEntityAlignment?: boolean
  skipAnswerFirst?: boolean
}

const AI_CRAWLER_UAS = [
  {
    bot: 'GPTBot (ChatGPT)',
    ua: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot',
  },
  {
    bot: 'OAI-SearchBot (ChatGPT Search)',
    ua: 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  },
  {
    bot: 'ClaudeBot (Claude)',
    ua: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
  },
  {
    bot: 'PerplexityBot',
    ua: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
  },
  {
    bot: 'CCBot (Common Crawl)',
    ua: 'CCBot/2.0 (https://commoncrawl.org/faq/)',
  },
]

/** Fetch homepage as each major AI crawler — runs only when the main scan is unverifiable. */
export async function probeAiCrawlers(domain: string): Promise<CrawlerProbe> {
  const base = `https://${domain}`
  const entries = await Promise.all(
    AI_CRAWLER_UAS.map(async ({ bot, ua }) => {
      try {
        const res = await fetch(base, {
          headers: { 'User-Agent': ua, Accept: 'text/html,*/*' },
          redirect: 'follow',
          signal: AbortSignal.timeout(12000),
        })
        return { bot, status: res.status, allowed: res.ok }
      } catch {
        return { bot, status: 0, allowed: false }
      }
    }),
  )
  const allowedCount = entries.filter((e) => e.allowed).length
  return {
    total: entries.length,
    allowedCount,
    blockedCount: entries.length - allowedCount,
    entries,
  }
}

const OAI_SEARCHBOT_UA =
  'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)'

/**
 * Web indexation via Serper (Google site:). Server-side Bing scraping is unreliable
 * and Bing's API is retiring — Google hits are a strong prerequisite; copy points
 * users to Bing Webmaster Tools for the Bing-specific confirmation ChatGPT Search uses.
 */
async function webIndexCheck(
  domain: string,
): Promise<{ indexed: boolean | null; pages: number; source: 'google' | null }> {
  const bare = domain.replace(/^www\./, '')
  if (!serperConfigured()) return { indexed: null, pages: 0, source: null }
  try {
    const results = await serperSearch(`site:${bare}`, 10)
    const hits = results.filter((r) => {
      try {
        const h = new URL(r.link).hostname.replace(/^www\./, '').toLowerCase()
        return h === bare || h.endsWith('.' + bare)
      } catch {
        return false
      }
    })
    return { indexed: hits.length > 0, pages: hits.length, source: 'google' }
  } catch {
    return { indexed: null, pages: 0, source: null }
  }
}

/** Two gates for ChatGPT Search / Copilot: OAI-SearchBot reach + indexed presence. */
export async function checkChatGptSearchReadiness(domain: string): Promise<ChatGptSearchReadiness> {
  const base = `https://${domain}`
  const [botRes, idx] = await Promise.all([
    fetch(base, {
      headers: { 'User-Agent': OAI_SEARCHBOT_UA, Accept: 'text/html,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
    })
      .then((r) => ({ allowed: r.ok, status: r.status }))
      .catch(() => ({ allowed: false, status: 0 })),
    webIndexCheck(domain),
  ])

  const ready = botRes.allowed === true && idx.indexed === true
  const bingNote =
    ' ChatGPT Search retrieves from Bing — confirm/submit your site free at Bing Webmaster Tools.'
  let summary: string
  if (botRes.allowed && idx.indexed) {
    summary = `OAI-SearchBot can read your site and you're indexed on the web — the two prerequisites for ChatGPT Search.${bingNote}`
  } else if (!botRes.allowed && idx.indexed === false) {
    summary = `You block OAI-SearchBot AND aren't showing up indexed — you effectively cannot appear in ChatGPT Search today.${bingNote}`
  } else if (!botRes.allowed) {
    summary = `OAI-SearchBot (ChatGPT's crawler) can't reach your site${botRes.status ? ` (HTTP ${botRes.status})` : ''} — unblock it in your firewall/CDN so ChatGPT Search can read you.`
  } else if (idx.indexed === false) {
    summary = `OAI-SearchBot can reach you, but we found no indexed pages for your domain — get indexed first.${bingNote}`
  } else {
    summary = `OAI-SearchBot can reach you. We couldn't confirm indexation automatically — verify at Bing Webmaster Tools, which is what ChatGPT Search uses.`
  }

  return {
    botAllowed: botRes.status === 0 ? false : botRes.allowed,
    botStatus: botRes.status,
    indexed: idx.indexed,
    indexSource: idx.source,
    indexPagesSeen: idx.pages,
    ready,
    summary,
  }
}

export async function runAeoScan(
  domain: string,
  options: AeoScanOptions = {},
): Promise<AeoScanResult> {
  const base = `https://${domain}`

  const sub: Record<string, SubScore> = {
    robots_ai: 'unverifiable',
    ssr_no_js: 'unverifiable',
    entity_alignment: 'unverifiable',
    org_schema: 'unverifiable',
    faq_schema: 'unverifiable',
    answer_first: 'unverifiable',
    llms_txt: 'unverifiable',
    pricing_schema: 'unverifiable',
  }
  const ev: Record<string, string> = {}
  let snippet = ''
  let companyName = domain.split('.')[0]

  const home = await get(base)
  if (home.ok && home.text.length > 0) {
    const text = stripHtml(home.text)
    snippet = text.slice(0, 500)

    const ogName =
      home.text.match(/property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i) ??
      home.text.match(/content=["']([^"']+)["'][^>]*property=["']og:site_name["']/i)
    const titleMatch = home.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
    const segments = (ogName?.[1] ?? titleMatch?.[1] ?? '')
      .split(/[|\\/\-–—:·]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 1 && s.length < 60 && !/^(home|welcome|homepage|index)$/i.test(s))
    if (segments[0]) companyName = segments[0]

    const titleWords = (titleMatch?.[1] ?? '')
      .split(/\W+/)
      .filter((w) => w.length > 3)
      .slice(0, 5)
    const titleHit =
      titleWords.filter((w) => text.toLowerCase().includes(w.toLowerCase())).length >=
      Math.min(2, titleWords.length)
    sub.ssr_no_js = text.length > 400 && titleHit ? 2.5 : text.length > 150 ? 1.25 : 0
    ev.ssr_no_js = `${text.length} chars of text in raw HTML`

    const ld = extractJsonLd(home.text)
    sub.org_schema = hasType(ld, ['Organization', 'LocalBusiness', 'Corporation']) ? 2.5 : 0
    ev.org_schema = `${ld.length} JSON-LD block(s) found${sub.org_schema === 2.5 ? ', Organization present' : ', no Organization type'}`
    sub.faq_schema = hasType(ld, ['FAQPage']) ? 2.5 : 0
    ev.faq_schema = sub.faq_schema === 2.5 ? 'FAQPage schema present' : 'no FAQPage schema'

    let productSchema =
      hasType(ld, ['Product', 'Service', 'Offer', 'SoftwareApplication']) &&
      JSON.stringify(ld).match(/"(price|priceCurrency|offers|priceRange)"/i) !== null
    ev.pricing_schema = 'no machine-readable pricing on homepage'

    if (!productSchema) {
      const pricing = await get(base + '/pricing', 15000)
      if (pricing.ok) {
        const ldP = extractJsonLd(pricing.text)
        productSchema =
          hasType(ldP, ['Product', 'Service', 'Offer', 'SoftwareApplication']) &&
          JSON.stringify(ldP).match(/"(price|priceCurrency|offers|priceRange)"/i) !== null
        if (!productSchema && /pricing|per month|\/mo|per user|per seat/i.test(stripHtml(pricing.text))) {
          sub.pricing_schema = 1.25
          ev.pricing_schema = '/pricing page exists but no Product/Offer schema'
        }
      }
    }
    if (productSchema) {
      sub.pricing_schema = 2.5
      ev.pricing_schema = 'Product/Service schema with price fields'
    } else if (sub.pricing_schema === 'unverifiable') {
      sub.pricing_schema = 0
    }
  } else {
    ev.ssr_no_js = `homepage fetch failed (status ${home.status})`
  }

  const robots = await get(base + '/robots.txt', 15000)
  if (robots.status === 404 || (robots.ok && robots.text.trim() === '')) {
    sub.robots_ai = 2.5
    ev.robots_ai = 'no robots.txt — all crawlers allowed by default'
  } else if (robots.ok) {
    const txt = robots.text
    let blocked = 0
    const blockedBots: string[] = []
    for (const bot of AI_BOTS) {
      const re = new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/\\s*$`, 'im')
      const reWild = /User-agent:\s*\*\s*[\s\S]*?Disallow:\s*\/\s*$/im
      if (re.test(txt) || (reWild.test(txt) && !new RegExp(`User-agent:\\s*${bot}`, 'i').test(txt))) {
        blocked++
        blockedBots.push(bot)
      }
    }
    sub.robots_ai = Number(((2.5 * (AI_BOTS.length - blocked)) / AI_BOTS.length).toFixed(2))
    ev.robots_ai =
      blocked === 0
        ? 'all 5 AI crawlers allowed'
        : `${AI_BOTS.length - blocked}/5 AI crawlers allowed (blocked: ${blockedBots.join(', ')})`
  } else {
    ev.robots_ai = `robots.txt fetch failed (status ${robots.status})`
  }

  const llms = await get(base + '/llms.txt', 15000)
  if (llms.ok && llms.text.length > 20 && !/<html/i.test(llms.text)) {
    const hasH1 = /^#\s+/m.test(llms.text)
    const hasLinks = /\]\(https?:\/\//.test(llms.text)
    sub.llms_txt = hasH1 && hasLinks ? 2.5 : 1.25
    ev.llms_txt =
      hasH1 && hasLinks ? 'llms.txt present and well-formed' : 'llms.txt present but missing H1 or markdown links'
  } else {
    sub.llms_txt = 0
    ev.llms_txt = 'no llms.txt found'
  }

  if (!options.skipEntityAlignment) {
    const li = await tavilyHits(`"${companyName}" site:linkedin.com/company`)
    const cb = await tavilyHits(`"${companyName}" site:crunchbase.com/organization`)
    if (li.count > 0 || cb.count > 0) {
      let score = 0
      if (li.count > 0) score += 1.0
      if (cb.count > 0) score += 1.0
      if ((li.content + cb.content).toLowerCase().includes(domain.toLowerCase())) score += 0.5
      sub.entity_alignment = score
      ev.entity_alignment = `LinkedIn: ${li.count > 0 ? 'found' : 'not found'}, Crunchbase: ${cb.count > 0 ? 'found' : 'not found'}`
    } else if (process.env.TAVILY_API_KEY) {
      sub.entity_alignment = 0
      ev.entity_alignment = `no LinkedIn company page or Crunchbase profile surfaced for "${companyName}"`
    } else {
      ev.entity_alignment = 'search-index check unavailable'
    }
  }

  if (!options.skipAnswerFirst) {
    sub.answer_first = await judgeAnswerFirst(snippet)
    ev.answer_first =
      sub.answer_first === 'unverifiable'
        ? 'not enough visible homepage text to judge'
        : `first ~500 chars of homepage copy scored ${sub.answer_first}/2.5`
  }

  const criteria: CriterionResult[] = Object.keys(LABELS).map((key) => {
    const score = sub[key]
    return {
      key,
      label: LABELS[key].label,
      group: LABELS[key].group,
      score,
      max: 2.5,
      evidence: ev[key] ?? '',
      fix: typeof score === 'number' && score < 2.5 ? FIXES[key] : null,
    }
  })

  const scored = criteria.filter((c) => typeof c.score === 'number')
  const scoredCount = scored.length
  const total =
    scoredCount >= 5
      ? Number(
          (scored.reduce((a, c) => a + (c.score as number), 0) * (20 / (scoredCount * 2.5))).toFixed(2)
        )
      : ('unverifiable' as const)

  const splitFor = (group: 'A' | 'B'): GroupSplit => {
    const inGroup = scored.filter((c) => c.group === group)
    const earned = Number(inGroup.reduce((a, c) => a + (c.score as number), 0).toFixed(2))
    const possible = inGroup.length * 2.5
    return {
      earned,
      possible,
      pct: possible > 0 ? Math.round((earned / possible) * 100) : null,
    }
  }

  // ChatGPT Search readiness runs on every real scan. AI-crawler probe only when blocked.
  const isCompetitorScan = Boolean(options.skipEntityAlignment || options.skipAnswerFirst)
  const [crawlerProbe, chatgptSearch] = await Promise.all([
    total === 'unverifiable' && !isCompetitorScan ? probeAiCrawlers(domain) : Promise.resolve(undefined),
    isCompetitorScan ? Promise.resolve(undefined) : checkChatGptSearchReadiness(domain),
  ])

  return {
    domain,
    url: base,
    checkedAt: new Date().toISOString(),
    criteria,
    scoredCount,
    total,
    groupA: splitFor('A'),
    groupB: splitFor('B'),
    companyName,
    snippet,
    crawlerProbe,
    chatgptSearch,
  }
}
