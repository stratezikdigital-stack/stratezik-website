import { resolveIndustry } from './industryEngine.js'
import {
  geocodeCity,
  inferRegionCode,
  filterPlacesNear,
  placesConfigured,
  searchPlaces,
  type PlaceSummary,
  type SearchPlacesOptions,
} from './places.js'

export type GbpBusinessCandidate = {
  placeId: string
  name: string
  address: string
  rating: string | null
  reviewCount: number
  mapsUri: string | null
  matchScore: number
  matchLabel: 'exact' | 'close' | 'possible'
}

export type GbpLookupResult = {
  candidates: GbpBusinessCandidate[]
  placesConfigured: boolean
  reason?: 'missing_api_key' | 'no_results'
}

export function normalizeBusinessName(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b(incorporated|inc|llc|ltd|limited|corp|corporation|co|company|plc)\b\.?/gi, '')
    .replace(/[^a-z0-9]/g, '')
}

/** Score how well a Places result matches what the user typed. */
export function scoreBusinessMatch(query: string, place: PlaceSummary): number {
  const target = normalizeBusinessName(query)
  const candidate = normalizeBusinessName(place.name)
  if (!target || !candidate) return 0
  if (target === candidate) return 100
  if (candidate.includes(target) || target.includes(candidate)) {
    const shorter = target.length <= candidate.length ? target : candidate
    const longer = target.length > candidate.length ? target : candidate
    if (shorter.length >= 4 && shorter.length / longer.length >= 0.4) return 88
  }

  const queryWords = query
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ''))
    .filter((w) => w.length > 2)
  const nameWords = place.name
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ''))
    .filter((w) => w.length > 2)
  if (!queryWords.length || !nameWords.length) return 0

  let hits = 0
  for (const qw of queryWords) {
    if (nameWords.some((nw) => nw.includes(qw) || qw.includes(nw))) hits++
  }
  return Math.round((hits / queryWords.length) * 72)
}

function matchLabel(score: number): GbpBusinessCandidate['matchLabel'] {
  if (score >= 95) return 'exact'
  if (score >= 70) return 'close'
  return 'possible'
}

function stripLegalSuffix(name: string): string {
  return name.replace(/\b(incorporated|inc|llc|ltd|limited|corp|corporation|plc)\b\.?/gi, '').trim()
}

function toCandidate(name: string, p: PlaceSummary): GbpBusinessCandidate {
  const matchScore = scoreBusinessMatch(name, p)
  return {
    placeId: p.placeId,
    name: p.name,
    address: p.formattedAddress,
    rating: p.rating != null ? p.rating.toFixed(1) : null,
    reviewCount: p.reviewCount,
    mapsUri: p.mapsUri,
    matchScore,
    matchLabel: matchLabel(matchScore),
  }
}

function buildLookupQueries(businessName: string, city: string, industry: string): string[] {
  const name = businessName.trim()
  const stripped = stripLegalSuffix(name)
  const trade = resolveIndustry(industry).display
  const cityShort = city.split(',')[0]?.trim() || city

  const raw = [
    `${name} ${city}`.trim(),
    `${name} ${trade} ${city}`.trim(),
    `${stripped} ${trade} ${cityShort}`.trim(),
    `${name} ${trade} ${cityShort}`.trim(),
    `${stripped} ${city}`.trim(),
    name,
    stripped,
    `${name} ${trade}`.trim(),
  ]
  return [...new Set(raw.filter(Boolean))]
}

/** Find Google Maps listings for the user to confirm before a full scan. */
export async function lookupBusinessCandidates(
  businessName: string,
  city: string,
  industry = 'Local business',
): Promise<GbpLookupResult> {
  const name = businessName.trim()
  if (!name) {
    return { candidates: [], placesConfigured: placesConfigured(), reason: 'no_results' }
  }

  if (!placesConfigured()) {
    return { candidates: [], placesConfigured: false, reason: 'missing_api_key' }
  }

  const uniqueQueries = buildLookupQueries(name, city, industry)
  const geoCenter = await geocodeCity(city)
  const regionCode = inferRegionCode(city)
  const searchOpts: SearchPlacesOptions = geoCenter
    ? { location: geoCenter, radiusMeters: 50000, regionCode }
    : { regionCode }

  const pool: PlaceSummary[] = []
  for (const q of uniqueQueries) {
    const batch = await searchPlaces(q, 10, searchOpts)
    if (batch?.length) pool.push(...batch)
  }

  if (!pool.length) {
    return { candidates: [], placesConfigured: true, reason: 'no_results' }
  }

  const deduped = pool.filter((p, i, arr) => arr.findIndex((x) => x.placeId === p.placeId) === i)
  let near = deduped
  if (geoCenter) {
    const filtered = filterPlacesNear(deduped, geoCenter, 80)
    near = filtered.length > 0 ? filtered : deduped
  }

  const scored = near
    .map((p) => toCandidate(name, p))
    .filter((c) => c.matchScore >= 25)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 8)

  if (scored.length > 0) {
    return { candidates: scored, placesConfigured: true }
  }

  // Last resort: show raw name-search hits so the user can still pick by address.
  return {
    candidates: near
      .slice(0, 8)
      .map((p) => ({ ...toCandidate(name, p), matchLabel: 'possible' as const })),
    placesConfigured: true,
  }
}
