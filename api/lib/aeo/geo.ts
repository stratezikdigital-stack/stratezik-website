// GEO Diagnostic engine — the "why an AI won't cite this, and how to fix it"
// scanners. Reads how a page's source is engineered for an AI retrieval (RAG)
// pipeline, not whether it ranks. Mostly deterministic DOM/text analysis plus
// one small LLM call for entity-predicate clarity. Server-side only.

import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { stripHtml } from './scan.js'

export type ScannerStatus = 'pass' | 'warn' | 'fail'

export interface GeoScanner {
  key: 'chunking' | 'trust_markers' | 'synthesis' | 'entity_predicate' | 'info_gain' | 'hydration'
  label: string
  status: ScannerStatus
  why: string // the diagnostic — why an AI struggles with this page
  fix: string // the concrete code/copy change
}

export interface ChunkInfo {
  heading: string
  words: number
  ok: boolean // within a clean RAG chunk boundary (~300 words)
}

export interface GeoResult {
  scanners: GeoScanner[]
  chunkMap: ChunkInfo[]
  geoScore: number // 0–100, from scanner statuses
}

// Abstract marketing fluff an entity-extractor can't map to a concrete predicate.
const FLUFF =
  /\b(leverage|leverages|leveraging|synerg\w*|empower\w*|paradigm\w*|seamless\w*|cutting-edge|best-in-class|world-class|revolutionary|game-chang\w*|next-gen\w*|holistic\w*|turnkey|frictionless|bleeding-edge|unlock\w*|supercharge\w*|reimagine\w*|disrupt\w*)\b/gi

// High-authority outbound targets that read as real citations.
const AUTHORITY =
  /(\.gov|\.edu|\.org|statista|wikipedia|statcan|marsdd|gartner|forrester|mckinsey|nature|arxiv|who\.int|oecd)\b/i

// ─── Content region ──────────────────────────────────────────────────────────

// Isolate main content so nav/header/footer don't pollute the diagnostics.
export function extractMainRegion(html: string): string {
  const main = html.match(/<main[\s>][\s\S]*?<\/main>/i)?.[0]
  if (main && main.length > 500) return main
  const article = html.match(/<article[\s>][\s\S]*?<\/article>/i)?.[0]
  if (article && article.length > 500) return article
  return html
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[\s\S]*?<\/aside>/gi, ' ')
}

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length
}

// ─── 1. RAG chunking efficiency ──────────────────────────────────────────────

const MAX_CHUNK_WORDS = 300

function chunkSections(mainHtml: string): ChunkInfo[] {
  const re = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi
  const matches = [...mainHtml.matchAll(re)]
  if (matches.length === 0) {
    const words = wordCount(stripHtml(mainHtml))
    return words > 0 ? [{ heading: '(no sub-headings)', words, ok: words <= MAX_CHUNK_WORDS }] : []
  }
  const out: ChunkInfo[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index! + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index! : mainHtml.length
    const words = wordCount(stripHtml(mainHtml.slice(start, end)))
    out.push({ heading: stripHtml(matches[i][1]).slice(0, 60) || '(section)', words, ok: words <= MAX_CHUNK_WORDS })
  }
  return out
}

function chunkScanner(chunkMap: ChunkInfo[]): GeoScanner {
  const base = { key: 'chunking' as const, label: 'RAG chunking efficiency' }
  if (chunkMap.length === 0) {
    return { ...base, status: 'fail', why: 'No readable body content was found to chunk.', fix: 'Make sure the page ships real text in its HTML.' }
  }
  if (chunkMap.length === 1 && chunkMap[0].heading === '(no sub-headings)') {
    const big = chunkMap[0].words > MAX_CHUNK_WORDS
    return {
      ...base,
      status: big ? 'fail' : 'warn',
      why: `The page is one undivided ${chunkMap[0].words}-word block with no H2/H3 structure. RAG chunkers split it mid-thought, scattering your value proposition across disjointed vectors.`,
      fix: 'Break the content into H2/H3 sections of ≤300 words each, so each idea embeds as one coherent chunk.',
    }
  }
  const oversized = chunkMap.filter((c) => !c.ok).sort((a, b) => b.words - a.words)
  if (oversized.length === 0) {
    return { ...base, status: 'pass', why: 'Your sections are sized for clean RAG chunking — each idea embeds as a coherent vector.', fix: '' }
  }
  const biggest = oversized[0]
  return {
    ...base,
    status: oversized.length > chunkMap.length / 2 ? 'fail' : 'warn',
    why: `${oversized.length} section(s) exceed ~300 words (largest: “${biggest.heading}” at ${biggest.words}). RAG chunkers split these mid-section, muddying the embedding so retrieval misses your point.`,
    fix: `Add an H3 sub-heading inside the long sections — e.g. split “${biggest.heading}” near word 250 — so each chunk holds one complete idea.`,
  }
}

// ─── 2. GEO trust markers (Princeton-style citation levers) ──────────────────

function trustScanner(mainHtml: string, mainText: string, domain: string): GeoScanner {
  const base = { key: 'trust_markers' as const, label: 'Citation trust markers' }

  const stats = (mainText.match(/\b\d[\d,.]*\s?(%|percent|x|\$|usd|cad|million|billion|k\b)/gi) ?? []).length
  const hasStats = stats >= 2
  const hasQuote = /<blockquote/i.test(mainHtml) || /\b(according to|as reported by|[A-Z][a-z]+ (said|noted|stated|observed))\b/.test(mainText)

  const outbound = [...mainHtml.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((u) => {
      try {
        return !new URL(u).hostname.replace(/^www\./, '').toLowerCase().endsWith(domain.toLowerCase())
      } catch {
        return false
      }
    })
  const hasAuthorityCite = outbound.some((u) => AUTHORITY.test(u))
  const present = [hasStats, hasQuote, hasAuthorityCite].filter(Boolean).length

  const missing: string[] = []
  if (!hasStats) missing.push('hard statistics')
  if (!hasQuote) missing.push('an expert quote or attribution')
  if (!hasAuthorityCite) missing.push('an outbound citation to an authoritative source')

  if (present === 3) {
    return { ...base, status: 'pass', why: 'The page carries the credibility markers AI engines prioritize — data, attribution, and outbound sourcing.', fix: '' }
  }
  return {
    ...base,
    status: present === 0 ? 'fail' : 'warn',
    why: `Your claims read as unsourced narrative — the page is missing ${missing.join(', ')}. In controlled GEO studies, pages with inline statistics, quotes, and citations were cited markedly more often, because AI engines favour claims they can validate.`,
    fix: `Add ${missing.join(' + ')} to your key sections — e.g. an inline data point with a “according to …” attribution and an outbound link to an authoritative source.`,
  }
}

// ─── 3. Synthesis-ready layout density ───────────────────────────────────────

function synthesisScanner(mainHtml: string, mainText: string): GeoScanner {
  const base = { key: 'synthesis' as const, label: 'Synthesis-ready layout' }
  const lists = (mainHtml.match(/<(ul|ol)[\s>]/gi) ?? []).length
  const tables = (mainHtml.match(/<table[\s>]/gi) ?? []).length
  const paragraphs = (mainHtml.match(/<p[\s>]/gi) ?? []).length || Math.ceil(wordCount(mainText) / 80)
  const hasHook = /\b(key takeaway|in summary|in short|the bottom line|the short answer|tl;?dr|at a glance)\b/i.test(mainText)
  const structured = lists + tables

  if (structured >= 2 && hasHook) {
    return { ...base, status: 'pass', why: 'The layout has done the structural work for the engine — lists/tables plus explicit summary hooks AI is trained to lift.', fix: '' }
  }
  const gaps: string[] = []
  if (structured < 2) gaps.push(`only ${structured} list/table block(s) across ${paragraphs} paragraphs — multi-variable info (pricing, features) is buried in prose`)
  if (!hasHook) gaps.push('no summary hook ("Key takeaway:", "In short:") for engines to grab')
  return {
    ...base,
    status: structured === 0 ? 'fail' : 'warn',
    why: `An extraction bot has to do extra work here: ${gaps.join('; ')}. Answer engines prefer sources that pre-structure the answer.`,
    fix: 'Convert comparison/pricing/feature prose into native HTML tables or lists, and open key sections with an explicit “The key takeaway is …” hook.',
  }
}

// ─── 5. Hydration / raw-HTML visibility (no headless browser needed) ─────────
// Detects client-rendered (SPA) pages that ship near-empty raw HTML. Fast AI
// crawlers (GPTBot, PerplexityBot) don't execute JS, so these read as blank.

function hydrationScanner(fullHtml: string): GeoScanner {
  const base = { key: 'hydration' as const, label: 'Raw-HTML visibility (no-JS)' }
  const words = wordCount(stripHtml(fullHtml))
  const frameworkRoot =
    /<(div|main)[^>]+id=["'](root|__next|app|__nuxt|q-app|gatsby-focus-wrapper)["']/i.test(fullHtml) ||
    /data-reactroot|__NEXT_DATA__|window\.__NUXT__|ng-version=|data-server-rendered/i.test(fullHtml)
  const scripts = (fullHtml.match(/<script[\s>]/gi) ?? []).length

  if (words < 150 && (frameworkRoot || scripts > 8)) {
    return {
      ...base,
      status: 'fail',
      why: `The page ships almost no text in its raw HTML (${words} words) — content is injected by client-side JavaScript. Fast AI crawlers like GPTBot and PerplexityBot don't execute JS, so they see a near-blank page.`,
      fix: 'Server-render or pre-render this page (SSR/SSG) so your copy is present in the initial HTML payload, not assembled in the browser.',
    }
  }
  if (words < 400 && frameworkRoot) {
    return {
      ...base,
      status: 'warn',
      why: `Thin raw HTML (${words} words) behind a client-side framework — some content may not reach JS-free crawlers.`,
      fix: 'Confirm your key copy renders server-side; move critical content out of client-only components.',
    }
  }
  return { ...base, status: 'pass', why: 'Your content ships in the raw HTML — AI crawlers can read it without running JavaScript.', fix: '' }
}

// ─── 4. Entity-predicate clarity (1 small LLM call + fluff detection) ─────────

async function entityPredicateScanner(mainText: string): Promise<GeoScanner> {
  const base = { key: 'entity_predicate' as const, label: 'Entity-predicate clarity' }
  const fluff = [...new Set((mainText.match(FLUFF) ?? []).map((s) => s.toLowerCase()))]
  const opening = mainText.slice(0, 600)

  let triplet = ''
  if (opening.length >= 80) {
    try {
      const { text } = await generateText({
        model: anthropic('claude-haiku-4-5'),
        system:
          'You extract a knowledge triplet (Subject | predicate | object) that an AI would map from company copy — e.g. "Acme | automates | client prospecting for dentists". If the copy is too abstract or vague to map a concrete predicate and object, output exactly "UNCLEAR". Output only the triplet or UNCLEAR.',
        prompt: opening,
        temperature: 0,
        maxTokens: 40,
      })
      triplet = text.trim()
    } catch {
      /* leave blank */
    }
  }
  const unclear = triplet.length < 5 || /unclear/i.test(triplet)

  if (!unclear && fluff.length === 0) {
    return { ...base, status: 'pass', why: `An AI cleanly maps what you do: “${triplet}”. Concrete noun-verb copy is easy to attribute and cite.`, fix: '' }
  }
  const reasons: string[] = []
  if (unclear) reasons.push('an entity extractor can’t isolate a concrete Subject→Predicate→Object from your copy')
  if (fluff.length) reasons.push(`abstract filler words (${fluff.slice(0, 4).join(', ')}) give the model nothing to map`)
  return {
    ...base,
    status: unclear ? 'fail' : 'warn',
    why: `${reasons.join('; ')}. AI organizes knowledge as triplets — if it can’t map “you → do → X for Y”, it won’t confidently attribute answers to you.`,
    fix: 'Rewrite your hero/opening as a concrete noun-verb statement — e.g. “Our software automates client prospecting for pest-control companies.” Cut the abstract filler.',
  }
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

const STATUS_VALUE: Record<ScannerStatus, number> = { pass: 100, warn: 55, fail: 10 }

// Average scanner status → 0–100. Exported so callers that append scanners
// (e.g. Information Gain) can recompute the blended score.
export function geoScoreOf(scanners: GeoScanner[]): number {
  if (scanners.length === 0) return 0
  return Math.round(scanners.reduce((a, s) => a + STATUS_VALUE[s.status], 0) / scanners.length)
}

// Deterministic-only scanners — no LLM, no network. Cheap enough to run across
// every URL in a sitemap. Returns the chunk map and main text for reuse.
export function deterministicScanners(
  fullHtml: string,
  domain: string
): { scanners: GeoScanner[]; chunkMap: ChunkInfo[]; mainText: string } {
  const main = extractMainRegion(fullHtml)
  const mainText = stripHtml(main)
  const chunkMap = chunkSections(main)
  const scanners: GeoScanner[] = [
    chunkScanner(chunkMap),
    trustScanner(main, mainText, domain),
    synthesisScanner(main, mainText),
    hydrationScanner(fullHtml),
  ]
  return { scanners, chunkMap, mainText }
}

// Full per-page set: deterministic scanners + the entity-predicate LLM call.
// (Information Gain is appended by the caller, since it needs Serper.)
export async function runGeoScanners(fullHtml: string, domain: string): Promise<GeoResult> {
  const { scanners, chunkMap, mainText } = deterministicScanners(fullHtml, domain)
  scanners.push(await entityPredicateScanner(mainText))
  return { scanners, chunkMap, geoScore: geoScoreOf(scanners) }
}
