import { resolveIndustry, sub, titleCase } from './industryEngine.js'
import { searchPlaces, fetchPlaceDetails, type PlaceSummary } from './places.js'

export type GbpWinner = {
  rank: string
  rankColor: string
  name: string
  rating: string
  reviews: number
  badge: string
}

export type GbpPillar = {
  name: string
  weight: string
  score: number
  note: string
}

export type GbpQuickWin = {
  n: string
  tag: string
  impactTag: string
  title: string
  lossLine: string
  hasCopy: boolean
  fixLabel?: string
  fixText?: string
  where: string
}

export type GbpCompGap = {
  metric: string
  you: string
  them: string
  youN: number
  themN: number
}

export type GbpRoadmapStep = {
  weeks: string
  title: string
  desc: string
}

/** Real profile signals from Place Details — grounds the AI roadmap. */
export type GbpProfileSignal = {
  name: string
  reviews: number
  rating: number | null
  categoryCount: number
  hasDescription: boolean
  hasPhone: boolean
  recentReviews: string[]
}

export type GbpScanResult = {
  businessName: string
  city: string
  industry: string
  industryDisplay: string
  placeId: string | null
  found: boolean
  dataSource: 'places' | 'template'
  score: number
  grade: string
  verdict: string
  rankNum: number
  rankWord: string
  moneyLine: string
  query: string
  youRating: string
  youReviews: number
  gapText: string
  topCompetitor: string
  winners: GbpWinner[]
  pillars: GbpPillar[]
  quickWins: GbpQuickWin[]
  competitorGaps: GbpCompGap[]
  revenueLine: string
  roadmap: GbpRoadmapStep[]
  checkedAt: string
  mapsUri: string | null
  profileSignals?: { you: GbpProfileSignal | null; competitors: GbpProfileSignal[] }
}

const RANK_COLORS = ['#F4D03C', '#CBBFA9', '#C98A4B']

function gradeFromScore(score: number): string {
  if (score >= 75) return 'A'
  if (score >= 68) return 'B+'
  if (score >= 60) return 'C+'
  if (score >= 50) return 'C'
  return 'D'
}

function rankWord(n: number): string {
  const words: Record<number, string> = {
    1: '1st',
    2: '2nd',
    3: '3rd',
    4: '4th',
    5: '5th',
    6: '6th',
    7: '7th',
    8: '8th',
    9: '9th',
    10: '10th',
  }
  return words[n] ?? `${n}th`
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(n)))
}

function scoreReputation(you: PlaceSummary | null, topAvgReviews: number): number {
  if (!you) return 45
  const rating = you.rating ?? 0
  const reviews = you.reviewCount
  const ratingScore = (rating / 5) * 40
  const reviewScore = topAvgReviews > 0 ? Math.min(60, (reviews / topAvgReviews) * 60) : reviews > 0 ? 30 : 0
  return clamp(ratingScore + reviewScore)
}

function scoreVisual(you: PlaceSummary | null, topPhotos: number): number {
  if (!you) return 40
  const photos = you.photoCount
  if (topPhotos <= 0) return photos >= 10 ? 70 : photos >= 3 ? 50 : 25
  return clamp((photos / topPhotos) * 100)
}

function scoreCompleteness(you: PlaceSummary | null): number {
  if (!you) return 50
  let s = 30
  if (you.hasHours) s += 20
  if (you.website) s += 20
  if (you.types.length >= 2) s += 15
  if (you.formattedAddress) s += 15
  return clamp(s)
}

function mergePillars(
  template: GbpPillar[],
  you: PlaceSummary | null,
  competitors: PlaceSummary[],
): GbpPillar[] {
  const top = competitors.slice(0, 3)
  const avgReviews =
    top.length > 0 ? top.reduce((a, c) => a + c.reviewCount, 0) / top.length : 200
  const maxPhotos = Math.max(...top.map((c) => c.photoCount), 1)

  const scores: Record<string, number> = {
    Reputation: scoreReputation(you, avgReviews),
    Engagement: you ? (you.reviewCount > 20 ? 42 : 32) : 34,
    'Profile completeness': scoreCompleteness(you),
    Visual: scoreVisual(you, maxPhotos),
    Competitive: you
      ? clamp(
          100 -
            (avgReviews > 0 ? ((avgReviews - you.reviewCount) / avgReviews) * 55 : 40) -
            (maxPhotos > 0 ? ((maxPhotos - you.photoCount) / maxPhotos) * 25 : 20),
        )
      : 40,
    'Local consistency': you?.formattedAddress ? 72 : 55,
  }

  return template.map((p) => ({
    ...p,
    score: scores[p.name] ?? p.score,
    note: you
      ? p.note
          .replace(/\d+ reviews/, `${you.reviewCount} reviews`)
          .replace(/★ [\d.]+/, you.rating ? `★ ${you.rating.toFixed(1)}` : p.note)
      : p.note,
  }))
}

function buildWinners(competitors: PlaceSummary[], ctx: { city: string; trade: string }): GbpWinner[] {
  return competitors.slice(0, 3).map((c, i) => ({
    rank: String(i + 1),
    rankColor: RANK_COLORS[i] ?? '#CBBFA9',
    name: c.name,
    rating: c.rating?.toFixed(1) ?? '—',
    reviews: c.reviewCount,
    badge: c.businessStatus === 'OPERATIONAL' ? 'Open now · Google Maps listing' : 'Google Maps listing',
  }))
}

/**
 * Real, defensible comparison metrics. We deliberately drop the old "Photos"
 * row (the Places API caps photo references at 10, so it read "10 vs 10") and
 * the fake "posts/reply time" metrics, and use only what Place Details truly
 * returns: review count, rating, category breadth, and whether a description
 * is set.
 */
function buildCompGaps(you: PlaceSummary | null, top: PlaceSummary, template: GbpCompGap[]): GbpCompGap[] {
  if (!you || !top) return template
  const youCats = you.categoryCount ?? you.types.length
  const topCats = top.categoryCount ?? top.types.length
  return [
    {
      metric: 'Total reviews',
      you: String(you.reviewCount),
      them: String(top.reviewCount),
      youN: you.reviewCount,
      themN: top.reviewCount,
    },
    {
      metric: 'Rating',
      you: you.rating?.toFixed(1) ?? '—',
      them: top.rating?.toFixed(1) ?? '—',
      youN: Math.round((you.rating ?? 0) * 20),
      themN: Math.round((top.rating ?? 0) * 20),
    },
    {
      metric: 'Categories',
      you: String(youCats),
      them: String(topCats),
      youN: youCats,
      themN: topCats,
    },
    {
      metric: 'Description',
      you: you.hasDescription ? 'yes' : 'no',
      them: top.hasDescription ? 'yes' : 'no',
      youN: you.hasDescription ? 10 : 0,
      themN: top.hasDescription ? 10 : 0,
    },
  ]
}

function buildRevenueLine(
  you: PlaceSummary | null,
  top: PlaceSummary | null,
  templateLine: string,
  ctx: { city: string; trade: string },
): string {
  if (you && top && top.reviewCount > you.reviewCount) {
    const gap = top.reviewCount - you.reviewCount
    return `Closing the ${gap}-review gap with ${top.name} is the difference between page-2 invisible and a top-3 pin. At ${ctx.trade} search volume in ${ctx.city}, that's the local calls you're leaving on the table each month.`
  }
  return sub(templateLine, ctx)
}

/** Merge Place Details into a Text Search summary, keeping summary values where
 * the detail field is absent or empty. */
function mergeDetail(p: PlaceSummary, d: Partial<PlaceSummary>): PlaceSummary {
  const merged: PlaceSummary = { ...p, ...d }
  if (d.rating == null) merged.rating = p.rating
  if (!d.reviewCount) merged.reviewCount = p.reviewCount
  if (!d.types?.length) merged.types = p.types
  return merged
}

async function enrichWithDetails(p: PlaceSummary | null): Promise<PlaceSummary | null> {
  if (!p?.placeId) return p
  const d = await fetchPlaceDetails(p.placeId)
  return d ? mergeDetail(p, d) : p
}

function toProfileSignal(p: PlaceSummary | null): GbpProfileSignal | null {
  if (!p) return null
  return {
    name: p.name,
    reviews: p.reviewCount,
    rating: p.rating,
    categoryCount: p.categoryCount ?? p.types.length,
    hasDescription: Boolean(p.hasDescription),
    hasPhone: Boolean(p.hasPhone),
    recentReviews: (p.reviews ?? []).map((r) => r.text).filter(Boolean).slice(0, 3),
  }
}

function weightedScore(pillars: GbpPillar[]): number {
  const weights: Record<string, number> = {
    Reputation: 0.25,
    Engagement: 0.2,
    'Profile completeness': 0.1,
    Visual: 0.15,
    Competitive: 0.15,
    'Local consistency': 0.15,
  }
  let total = 0
  let w = 0
  for (const p of pillars) {
    const wt = weights[p.name] ?? 0.15
    total += p.score * wt
    w += wt
  }
  return clamp(w > 0 ? total / w : 50)
}

function normalizeName(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function findUserPlace(
  businessName: string,
  candidates: PlaceSummary[],
): PlaceSummary | null {
  const target = normalizeName(businessName)
  if (!target) return candidates[0] ?? null
  const exact = candidates.find((c) => normalizeName(c.name) === target)
  if (exact) return exact
  const partial = candidates.find(
    (c) => normalizeName(c.name).includes(target) || target.includes(normalizeName(c.name)),
  )
  return partial ?? candidates[0] ?? null
}

export async function runGbpScan(input: {
  businessName: string
  city: string
  industry: string
}): Promise<GbpScanResult> {
  const businessName = input.businessName.trim()
  const city = input.city.trim()
  const industry = input.industry.trim() || 'Local business'

  const resolved = resolveIndustry(industry)
  const template = resolved.d
  const industryDisplay = resolved.display
  const cityShort = (city || template.defCity).split(',')[0]
  const trade = industryDisplay
  const ctx = { biz: businessName || titleCase(trade), city: cityShort, trade }

  const searchQuery = sub(template.query, ctx)
  const bizQuery = businessName
    ? `${businessName} ${city}`.trim()
    : `${trade} ${city}`.trim()

  const [bizResults, packResults] = await Promise.all([
    searchPlaces(bizQuery, 5),
    searchPlaces(`${searchQuery} in ${city}`, 10),
  ])

  const dataSource = bizResults || packResults ? 'places' : 'template'
  const pack = packResults ?? []
  const youRaw = businessName
    ? findUserPlace(businessName, bizResults ?? pack)
    : (pack[0] ?? null)
  const competitorsRaw = pack.filter((p) => p.placeId !== youRaw?.placeId).slice(0, 3)

  // Lever 2: enrich the user + top competitors with Place Details (real
  // categories, description, phone, and review snippets). Best-effort and run
  // in parallel. GBP_DETAIL_COMPETITORS caps the per-scan Place Details calls
  // for cost control (the user's own profile is always enriched).
  const detailN = Math.max(0, Math.min(3, Number(process.env.GBP_DETAIL_COMPETITORS ?? 3) || 0))
  const [you, enrichedHead] = await Promise.all([
    enrichWithDetails(youRaw),
    Promise.all(competitorsRaw.slice(0, detailN).map((c) => enrichWithDetails(c))),
  ])
  const competitors = [
    ...enrichedHead.filter((c): c is PlaceSummary => Boolean(c)),
    ...competitorsRaw.slice(detailN),
  ]
  const winners =
    competitors.length >= 3
      ? buildWinners(competitors, ctx)
      : template.winners.map((w, i) => ({
          rank: w.rank,
          rankColor: w.rankColor,
          name: sub(w.name, ctx),
          rating: w.rating,
          reviews: Number(String(w.reviews).replace(/\D/g, '')) || 0,
          badge: sub(w.badge, ctx),
        }))

  let rankNum = template.rankNum
  if (you && pack.length > 0) {
    const idx = pack.findIndex((p) => p.placeId === you.placeId)
    rankNum = idx >= 0 ? idx + 1 : Math.min(pack.length + 1, 10)
  }

  const pillars = mergePillars(template.pillars, you, competitors)
  const score = dataSource === 'places' ? weightedScore(pillars) : template.score
  const grade = gradeFromScore(score)
  const topComp = competitors[0]?.name ?? sub(template.topCompetitor, ctx)

  const quickWins = template.quickWins.map((q) => ({
    ...q,
    title: sub(q.title, ctx),
    lossLine: sub(q.lossLine, ctx),
    fixText: q.fixText ? sub(q.fixText, ctx) : undefined,
    where: sub(q.where, ctx),
  }))

  return {
    businessName: ctx.biz,
    city,
    industry,
    industryDisplay,
    placeId: you?.placeId ?? null,
    found: Boolean(you),
    dataSource,
    score,
    grade,
    verdict: template.verdict,
    rankNum,
    rankWord: rankWord(rankNum),
    moneyLine: template.moneyLine.includes(' ')
      ? template.moneyLine
      : `${template.moneyLine}`,
    query: searchQuery,
    youRating: you?.rating?.toFixed(1) ?? template.youRating,
    youReviews: you?.reviewCount ?? template.youReviews,
    gapText: rankNum > 3 ? `↓ ${Math.max(0, rankNum - 3)} more results ↓` : template.gapText,
    topCompetitor: topComp,
    winners,
    pillars,
    quickWins,
    competitorGaps: buildCompGaps(you, competitors[0], template.competitorGaps),
    revenueLine: buildRevenueLine(you, competitors[0] ?? null, template.revenueLine, ctx),
    roadmap: template.roadmap,
    checkedAt: new Date().toISOString(),
    mapsUri: you?.mapsUri ?? null,
    profileSignals: {
      you: toProfileSignal(you),
      competitors: competitors
        .map(toProfileSignal)
        .filter((s): s is GbpProfileSignal => Boolean(s)),
    },
  }
}

export function topline(scan: GbpScanResult, scanId: string) {
  return {
    scanId,
    businessName: scan.businessName,
    city: scan.city,
    industry: scan.industry,
    industryDisplay: scan.industryDisplay,
    score: scan.score,
    grade: scan.grade,
    verdict: scan.verdict,
    rankNum: scan.rankNum,
    rankWord: scan.rankWord,
    query: scan.query,
    found: scan.found,
    dataSource: scan.dataSource,
    youRating: scan.youRating,
    youReviews: scan.youReviews,
    moneyLine: scan.moneyLine,
    winners: scan.winners,
    quickWins: scan.quickWins,
    gapText: scan.gapText,
    headline: `You're the ${scan.rankWord} option people see for "${scan.query}" — not in the top 3.`,
    mapsUri: scan.mapsUri,
    checkedAt: scan.checkedAt,
    topCompetitor: scan.topCompetitor,
    competitorGaps: scan.competitorGaps,
    revenueLine: scan.revenueLine,
    roadmap: scan.roadmap,
  }
}
