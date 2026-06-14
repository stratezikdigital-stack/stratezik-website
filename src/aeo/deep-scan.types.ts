// Frontend-only types mirroring api/lib/aeo/deep-scan.ts (UI display)

export interface VisibilityQueryResult {
  query: string
  appeared: boolean
  answerSnippet: string
  inSearch: boolean
  searchRank: number | null
}

export interface VisibilityResult {
  appearedCount: number
  searchAppearedCount: number
  searchChecked: boolean
  total: number
  queries: VisibilityQueryResult[]
}

export interface CompetitorResult {
  domain: string
  total: number | 'unverifiable'
  groupAPct: number | null
  groupBPct: number | null
}

export interface GeoScanner {
  key: string
  label: string
  status: 'pass' | 'warn' | 'fail'
  why: string
  fix: string
}

export interface ChunkInfo {
  heading: string
  words: number
  ok: boolean
}

export interface CitabilityPage {
  url: string
  title: string
  score: number
  signals: {
    headings: number
    qaBlocks: number
    lists: number
    freshness: boolean
    answerFirst: boolean
    factDensity: number
  }
  passageVerdict: number | 'unverifiable'
  fixes: string[]
  geoScore: number
  scanners: GeoScanner[]
  chunkMap: ChunkInfo[]
}

export interface CitabilityResult {
  overallScore: number
  pagesAnalyzed: number
  pages: CitabilityPage[]
}

export interface DeepScanResult {
  visibility: VisibilityResult
  competitors: CompetitorResult[]
  citability: CitabilityResult
}
