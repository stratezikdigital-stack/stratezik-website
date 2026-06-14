// The three paid features layered on top of the free readiness score:
//   1. AI-answer visibility  — do AI engines actually name you for buyer queries?
//   2. Competitor comparison — your 20-pt score vs 3 competitors
//   3. Citation sources      — which of your pages surface as AI-citable sources
//
// This is the "outcome" layer (are you winning in AI?) on top of the free
// "readiness" layer (can AI read you?). Kept separate from the 20-point score so
// the published research numbers stay consistent. Server-side only.

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { runAeoScan, get, stripHtml, extractJsonLd, normaliseDomain, type AeoScanResult } from './scan.js'
import { serperSearch, serperConfigured } from './serper.js'
import { extractMainRegion, runGeoScanners, geoScoreOf, type GeoScanner, type ChunkInfo } from './geo.js'

// Review/aggregator/social hosts that show up in "competitors" searches but aren't competitors.
const NON_COMPETITOR_HOSTS =
  /(^|\.)(g2|capterra|getapp|trustpilot|wikipedia|linkedin|youtube|reddit|medium|crunchbase|producthunt|gartner|forbes|techcrunch|facebook|twitter|x|instagram|github|quora|glassdoor|indeed|softwareadvice|trustradius|itsfoss|zapier|cloudwards|pcmag|cnet|techradar|tomsguide|hubspot)\.(com|org|net|io|co)$/i

// Listicle/blog hosts rarely are the product itself — the slug gives them away.
const BLOG_HOST = /(blog|news|guide|review|magazine|digital|wiki|hub|tips|academy)/i

export interface VisibilityQueryResult {
  query: string
  appeared: boolean // named in the AI assistant's answer
  answerSnippet: string // first ~240 chars of the AI's answer, for display
  inSearch: boolean // surfaced in real Google results (Serper, paid)
  searchRank: number | null // organic position if found
}

export interface VisibilityResult {
  appearedCount: number // out of `total`, named in AI answers
  searchAppearedCount: number // out of `total`, present in real Google results
  searchChecked: boolean // whether the Serper layer ran
  total: number
  queries: VisibilityQueryResult[]
}

export interface CompetitorResult {
  domain: string
  total: number | 'unverifiable'
  groupAPct: number | null
  groupBPct: number | null
}

// "Are your pages built to BE citable?" — a cause signal, not an output one.
// AI engines lift self-contained, well-structured, factual passages. We fetch
// your key content pages and score what makes a page quotable.
export interface CitabilityPage {
  url: string
  title: string
  score: number // 0–100
  signals: {
    headings: number // count of H2/H3 — structure AI can navigate
    qaBlocks: number // question-style headings — directly liftable answers
    lists: number // <ul>/<ol>/<table> — AI loves extracting these
    freshness: boolean // dated / "updated" / dateModified
    answerFirst: boolean // a substantial declarative opening (not a slogan)
    factDensity: number // concrete numbers/stats per 1k chars — citable facts
  }
  passageVerdict: number | 'unverifiable' // LLM: is there a clear quotable passage? 0/1/2
  fixes: string[]
  // GEO diagnostics — the "why an AI won't cite this, and how to fix it" layer
  geoScore: number // 0–100 from the four scanners
  scanners: GeoScanner[]
  chunkMap: ChunkInfo[]
}

export interface CitabilityResult {
  overallScore: number // 0–100, averaged across analyzed pages
  pagesAnalyzed: number
  pages: CitabilityPage[]
}

export interface DeepScanResult {
  visibility: VisibilityResult
  competitors: CompetitorResult[]
  citability: CitabilityResult
}

// ─── Tavily helper (returns result URLs for citation/competitor mining) ──────

async function tavilySearch(
  query: string,
  maxResults = 5
): Promise<{ url: string; content: string; title: string }[]> {
  const key = process.env.TAVILY_API_KEY
  if (!key) return []
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: key, query, max_results: maxResults, search_depth: 'basic' }),
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) return []
    const data = (await res.json()) as {
      results?: { url: string; content: string; title: string }[]
    }
    return data.results ?? []
  } catch {
    return []
  }
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return ''
  }
}

// True if `host` is the domain or a subdomain of it (help.notion.so → notion.so).
function sameDomain(host: string, domain: string): boolean {
  const d = domain.toLowerCase()
  return host === d || host.endsWith('.' + d)
}

// Does the answer name the company? Match the full name or a distinctive token.
function mentions(text: string, companyName: string, domain: string): boolean {
  const t = text.toLowerCase()
  if (t.includes(companyName.toLowerCase())) return true
  const bareName = domain.split('.')[0].toLowerCase()
  // Distinctive brand token: the registrable label, if it's not a generic word
  if (bareName.length >= 4 && t.includes(bareName)) return true
  return false
}

// ─── Feature 1: buyer-query generation + AI-answer visibility ────────────────

async function generateBuyerQueries(
  companyName: string,
  snippet: string,
  count: number
): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5'),
      system:
        'You generate realistic search queries a potential buyer would type into an AI assistant. Output only the queries, one per line, no numbering, no commentary.',
      prompt: `A potential customer is looking for what this company offers — but they don't know this company exists yet. Based on the homepage text below, write ${count} natural questions or queries they'd ask an AI assistant (ChatGPT, Claude, Perplexity) that this company would ideally show up in. Make them category/problem queries, NOT brand queries — never mention the company name.

Company: ${companyName}
Homepage: ${snippet}

${count} queries, one per line:`,
      temperature: 0.3,
      maxTokens: 300,
    })
    return text
      .split('\n')
      .map((l) => l.replace(/^[\d.\-*)\s]+/, '').trim())
      .filter((l) => l.length > 8 && !l.toLowerCase().includes(companyName.toLowerCase()))
      .slice(0, count)
  } catch {
    return []
  }
}

async function answerAsAiEngine(query: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-sonnet-4-6'),
      system:
        'You are an AI assistant answering a user who is researching options. Recommend specific real companies, products, or providers by name where appropriate — exactly as ChatGPT or Perplexity would. Be concrete and name names. Keep it under 150 words.',
      prompt: query,
      temperature: 0,
      maxTokens: 400,
    })
    return text
  } catch {
    return ''
  }
}

async function checkVisibility(
  companyName: string,
  domain: string,
  snippet: string,
  queryCount: number
): Promise<VisibilityResult> {
  const queries = await generateBuyerQueries(companyName, snippet, queryCount)
  if (queries.length === 0) {
    return { appearedCount: 0, searchAppearedCount: 0, searchChecked: false, total: 0, queries: [] }
  }
  const searchChecked = serperConfigured()
  const results = await Promise.all(
    queries.map(async (query): Promise<VisibilityQueryResult> => {
      // Two complementary signals: what an AI assistant says (Claude, from
      // knowledge) and where you actually rank in Google (Serper, real index).
      const [answer, organic] = await Promise.all([
        answerAsAiEngine(query),
        searchChecked ? serperSearch(query, 10) : Promise.resolve([]),
      ])
      const hit = organic.find((o) => sameDomain(hostOf(o.link), domain))
      return {
        query,
        appeared: mentions(answer, companyName, domain),
        answerSnippet: answer.slice(0, 240),
        inSearch: Boolean(hit),
        searchRank: hit ? hit.position : null,
      }
    })
  )
  return {
    appearedCount: results.filter((r) => r.appeared).length,
    searchAppearedCount: results.filter((r) => r.inSearch).length,
    searchChecked,
    total: results.length,
    queries: results,
  }
}

// ─── Feature 2: competitor discovery + lean scoring ──────────────────────────

// Claude knows the direct competitors of most established companies — cleaner
// than mining noisy "alternatives to X" listicle SERPs. Returns bare domains.
async function claudeCompetitors(
  companyName: string,
  domain: string,
  snippet: string,
  count: number
): Promise<string[]> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5'),
      system:
        'You name direct competitors of a company. Output only their primary website domains (e.g. "asana.com"), one per line — no www, no https, no commentary. If you are not confident a company is a real direct competitor, omit it.',
      prompt: `Company: ${companyName}
What they do: ${snippet.slice(0, 300)}

List up to ${count} of their closest direct competitors as bare domains, one per line:`,
      temperature: 0,
      maxTokens: 120,
    })
    return text
      .split('\n')
      .map((l) => l.replace(/^[\d.\-*)\s]+/, '').replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '').trim().toLowerCase())
      .filter((d) => /^[a-z0-9][a-z0-9-]*(\.[a-z0-9-]+)+$/.test(d) && d !== domain.toLowerCase())
      .slice(0, count)
  } catch {
    return []
  }
}

async function findCompetitors(
  companyName: string,
  domain: string,
  snippet: string,
  count: number
): Promise<string[]> {
  // Claude-first (high precision for known companies); top up with search.
  const picked: string[] = await claudeCompetitors(companyName, domain, snippet, count)
  const seen = new Set(picked.map((d) => d.toLowerCase()))
  seen.add(domain.toLowerCase())
  if (picked.length >= count) return picked.slice(0, count)

  // Paid feature → prefer Serper (real Google) for cleaner competitor results;
  // fall back to Tavily where Serper isn't configured.
  const links: string[] = serperConfigured()
    ? [
        ...(await serperSearch(`alternatives to ${companyName}`, 10)),
        ...(await serperSearch(`${companyName} competitors`, 10)),
      ].map((o) => o.link)
    : [
        ...(await tavilySearch(`alternatives to ${companyName}`, 8)),
        ...(await tavilySearch(`${companyName} competitors`, 8)),
      ].map((r) => r.url)

  // Rank candidate hosts by how often they recur — real competitors get named
  // repeatedly; one-off listicles appear once.
  const freq = new Map<string, number>()
  for (const link of links) {
    const host = hostOf(link)
    if (!host || seen.has(host) || NON_COMPETITOR_HOSTS.test(host) || BLOG_HOST.test(host)) continue
    freq.set(host, (freq.get(host) ?? 0) + 1)
  }
  const fill = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([host]) => host)
  for (const host of fill) {
    if (picked.length >= count) break
    picked.push(host)
  }
  return picked.slice(0, count)
}

async function compareCompetitors(
  companyName: string,
  domain: string,
  snippet: string,
  count: number,
  explicit?: string[]
): Promise<CompetitorResult[]> {
  // Customer-specified competitors take priority over auto-discovery.
  const cleanedExplicit = (explicit ?? [])
    .map((d) => normaliseDomain(d))
    .filter((d): d is string => Boolean(d) && d !== domain.toLowerCase())
  const seen = new Set<string>()
  const dedupedExplicit = cleanedExplicit.filter((d) => (seen.has(d) ? false : (seen.add(d), true)))

  const competitorDomains =
    dedupedExplicit.length > 0
      ? dedupedExplicit.slice(0, count)
      : await findCompetitors(companyName, domain, snippet, count)
  // Lean scans: skip the paid Tavily + Claude criteria; score over the 6 free ones.
  const scans = await Promise.all(
    competitorDomains.map((d) =>
      runAeoScan(d, { skipEntityAlignment: true, skipAnswerFirst: true }).catch(() => null)
    )
  )
  return scans
    .filter((s): s is AeoScanResult => s !== null)
    .map((s) => ({
      domain: s.domain,
      total: s.total,
      groupAPct: s.groupA.pct,
      groupBPct: s.groupB.pct,
    }))
}

// ─── Feature 3: citability (cause, not output — fetch-based, no search) ──────

// Find a few content pages worth analyzing — AI cites informational pages
// (blog posts, guides, docs, FAQs), rarely the marketing homepage.
function findContentPages(homepageHtml: string, domain: string, count: number): string[] {
  const contentPath =
    /\/(blog|articles?|resources?|guides?|docs?|learn|insights?|knowledge|help|faq|support|posts?|stories)\b/i
  const hrefs = [...homepageHtml.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1])
  const seen = new Set<string>()
  const out: string[] = []
  for (const href of hrefs) {
    let url: URL
    try {
      url = new URL(href, `https://${domain}`)
    } catch {
      continue
    }
    if (url.hostname.replace(/^www\./i, '').toLowerCase() !== domain.toLowerCase()) continue
    if (!contentPath.test(url.pathname)) continue
    const clean = url.origin + url.pathname
    if (seen.has(clean)) continue
    // Skip bare section indexes (e.g. just "/blog") — we want actual articles
    if (url.pathname.replace(/\/$/, '').split('/').filter(Boolean).length < 2) continue
    seen.add(clean)
    out.push(clean)
    if (out.length >= count) break
  }
  return out
}

// Returns the citability signals plus the cleaned main-content text (reused for
// the LLM passage judgement, so it judges real content, not boilerplate).
function analyzePage(fullHtml: string): { signals: CitabilityPage['signals']; mainText: string } {
  const main = extractMainRegion(fullHtml)

  const headings = (main.match(/<h[23][\s>]/gi) ?? []).length
  const headingText = [...main.matchAll(/<h[234][^>]*>([\s\S]*?)<\/h[234]>/gi)].map((m) =>
    stripHtml(m[1])
  )
  const qaBlocks = headingText.filter((h) =>
    /\?\s*$|^(how|what|why|when|where|who|can|does|do|is|are|should)\b/i.test(h)
  ).length
  const lists = (main.match(/<(ul|ol|table)[\s>]/gi) ?? []).length

  const freshness =
    /datemodified|datepublished/i.test(JSON.stringify(extractJsonLd(fullHtml))) ||
    /\b(updated|last revised|published)\b[^<]{0,40}\b20\d{2}\b/i.test(fullHtml)

  const text = stripHtml(main)
  const opening = text.slice(0, 400)
  const answerFirst = opening.length > 200 && (opening.match(/[.!?]/g) ?? []).length >= 2

  const facts = (text.match(/\b\d[\d,.]*\s?(%|percent|x|years?|months?|days?|\$|usd|cad)?\b/gi) ?? [])
    .length
  const factDensity = text.length > 0 ? Number(((facts / text.length) * 1000).toFixed(1)) : 0

  return { signals: { headings, qaBlocks, lists, freshness, answerFirst, factDensity }, mainText: text }
}

// ─── Information Gain (Wave 2) — net-new facts vs paraphrase of the web ───────
// Derive the page's topic, pull the real top-10 baseline (Serper), and judge
// whether the page adds anything the model couldn't already synthesize. Paid
// only — skipped when Serper isn't configured.

function deriveTopicQuery(title: string): string {
  // Drop the brand segment, keep the longest topical chunk of the title.
  const segments = title
    .split(/[|\\/\-–—:·]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && !/^(home|welcome|pricing|about|contact)$/i.test(s))
  const topic = segments.sort((a, b) => b.length - a.length)[0] ?? title
  return topic
    .replace(/^(the\s+)?(complete|ultimate|definitive|beginner'?s?|step[- ]by[- ]step)\s+guide\s+(to|for)\s+/i, '')
    .replace(/^how\s+to\s+/i, '')
    .trim()
    .slice(0, 80)
}

async function informationGainScanner(
  title: string,
  mainText: string,
  domain: string
): Promise<GeoScanner | null> {
  if (!serperConfigured()) return null
  const query = deriveTopicQuery(title)
  if (query.length < 3 || mainText.length < 200) return null

  const organic = await serperSearch(query, 6)
  const baseline = organic
    .filter((o) => !sameDomain(hostOf(o.link), domain))
    .slice(0, 5)
    .map((o) => `- ${o.title}: ${o.snippet}`)
    .join('\n')
  const base = { key: 'info_gain' as const, label: 'Information gain' }
  if (!baseline) {
    return { ...base, status: 'warn', why: `Couldn’t pull a web baseline for “${query}” to compare against.`, fix: '' }
  }

  let level = 1
  let reason = ''
  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5'),
      system:
        'You assess "information gain": whether a web page adds facts, data, frameworks, or a contrarian view that are NOT already present in the baseline search results — i.e. content the model could not synthesize from what the web already says. Reply with exactly one line: "LEVEL <0|1|2>: <≤15-word reason>". 0 = paraphrase of existing web content; 1 = some unique angle or detail; 2 = substantial net-new proprietary facts/data/framework.',
      prompt: `Topic: ${query}

Baseline — what the web already says (top results):
${baseline}

Target page content:
${mainText.slice(0, 1600)}`,
      temperature: 0,
      maxTokens: 40,
    })
    const m = text.match(/level\s*([012])\s*:?\s*(.*)/i)
    if (m) {
      level = Number(m[1])
      reason = m[2].trim()
    }
  } catch {
    return { ...base, status: 'warn', why: 'Information-gain check could not complete.', fix: '' }
  }

  if (level >= 2) {
    return { ...base, status: 'pass', why: `Net-new information present: ${reason || 'the page adds facts beyond the existing web baseline'}. The model has a reason to cite you rather than answer from its own weights.`, fix: '' }
  }
  if (level === 1) {
    return {
      ...base,
      status: 'warn',
      why: `Partial information gain: ${reason || 'some unique angle, but much overlaps existing content'}. The model can answer most of this without you.`,
      fix: 'Add at least two net-new facts a competitor page doesn’t have — proprietary data, a named framework, or an original case study.',
    }
  }
  return {
    ...base,
    status: 'fail',
    why: `Level 0 (paraphrase): ${reason || 'this restates content already on the web'}. The model can synthesize this answer from its own training — it has no reason to pull from or cite your site.`,
    fix: 'Inject proprietary data, a unique taxonomy, or a contrarian perspective. To be cited, the page must contain facts not found in the competing top-10 URLs.',
  }
}

async function judgePassage(text: string): Promise<number | 'unverifiable'> {
  const snippet = text.slice(0, 1200)
  if (snippet.length < 120) return 'unverifiable'
  try {
    const { text: out } = await generateText({
      model: anthropic('claude-haiku-4-5'),
      system:
        'You judge whether page content contains a clear, self-contained, factual passage an AI assistant would quote when answering a user. Output only a single number: 2, 1, or 0.',
      prompt: `Rubric:
2 = contains at least one self-contained, factual, quotable passage (a direct answer or specific claim an AI could lift verbatim)
1 = some usable content but buried in marketing language or not self-contained
0 = vague, promotional, nothing an AI would quote

Content:
${snippet}

Number only:`,
      temperature: 0,
      maxTokens: 5,
    })
    const m = out.match(/[012]/)
    return m ? Number(m[0]) : 'unverifiable'
  } catch {
    return 'unverifiable'
  }
}

function scorePage(
  signals: CitabilityPage['signals'],
  passage: number | 'unverifiable'
): { score: number; fixes: string[] } {
  let score = 0
  const fixes: string[] = []

  if (signals.headings >= 3) score += 18
  else fixes.push('Break the page into clear H2/H3 sections — AI navigates and lifts content by heading.')

  if (signals.qaBlocks >= 1) score += 18
  else fixes.push('Add question-style headings ("How does X work?") with direct answers underneath — the most liftable format for AI answers.')

  if (signals.answerFirst) score += 18
  else fixes.push('Open each page with a substantial, declarative answer — not a slogan. AI quotes the first clear statement it finds.')

  if (signals.lists >= 1) score += 14
  else fixes.push('Use bulleted/numbered lists or tables for key points — AI engines extract these preferentially.')

  if (signals.freshness) score += 14
  else fixes.push('Add visible publish/updated dates (and dateModified schema) — AI favours content it can date.')

  if (signals.factDensity >= 2) score += 8
  else fixes.push('Add concrete specifics — numbers, stats, named facts. AI cites pages with quotable facts over adjective-heavy copy.')

  if (typeof passage === 'number') score += passage * 5 // 0–10

  return { score: Math.min(100, score), fixes: fixes.slice(0, 4) }
}

async function analyzeCitability(domain: string, pageLimit: number): Promise<CitabilityResult> {
  const base = `https://${domain}`
  const home = await get(base)
  const contentUrls = home.ok ? findContentPages(home.text, domain, pageLimit) : []

  // Always include the homepage; add content pages up to the limit.
  const targets = [base, ...contentUrls].slice(0, pageLimit + 1)
  const pages = await Promise.all(
    targets.map(async (url): Promise<CitabilityPage | null> => {
      const res = url === base && home.ok ? home : await get(url)
      if (!res.ok || res.text.length < 200) return null
      const { signals, mainText } = analyzePage(res.text)
      const titleMatch = res.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
      const title = stripHtml(titleMatch?.[1] ?? url).slice(0, 80)
      const [passage, geo, infoGain] = await Promise.all([
        judgePassage(mainText),
        runGeoScanners(res.text, domain),
        informationGainScanner(title, mainText, domain),
      ])
      const scanners = infoGain ? [...geo.scanners, infoGain] : geo.scanners
      const geoScore = geoScoreOf(scanners)
      const { score, fixes } = scorePage(signals, passage)
      // Blend the structural citability score with the GEO scanner score.
      const blended = Math.round((score + geoScore) / 2)
      return {
        url,
        title,
        score: blended,
        signals,
        passageVerdict: passage,
        fixes,
        geoScore,
        scanners,
        chunkMap: geo.chunkMap,
      }
    })
  )

  const analyzed = pages.filter((p): p is CitabilityPage => p !== null)
  const overallScore =
    analyzed.length > 0
      ? Math.round(analyzed.reduce((a, p) => a + p.score, 0) / analyzed.length)
      : 0
  return { overallScore, pagesAnalyzed: analyzed.length, pages: analyzed }
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

export interface DeepScanOptions {
  competitorCount?: number // default 3
  visibilityQueries?: number // default 5
  citabilityPages?: number // default 4 content pages (+ homepage)
  competitorDomains?: string[] // customer-specified competitors (override auto-discovery)
}

export async function runDeepScan(
  base: AeoScanResult,
  options: DeepScanOptions = {}
): Promise<DeepScanResult> {
  const competitorCount = Math.max(options.competitorCount ?? 3, options.competitorDomains?.length ?? 0)
  const visibilityQueries = options.visibilityQueries ?? 5
  const citabilityPages = options.citabilityPages ?? 4 // homepage + 4 key content pages

  const [visibility, competitors, citability] = await Promise.all([
    checkVisibility(base.companyName, base.domain, base.snippet, visibilityQueries),
    compareCompetitors(base.companyName, base.domain, base.snippet, competitorCount, options.competitorDomains),
    analyzeCitability(base.domain, citabilityPages),
  ])

  return { visibility, competitors, citability }
}
