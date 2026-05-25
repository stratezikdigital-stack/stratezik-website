/** Five-part "Get Found 2026" pillar sequence (foundation → accelerator). */

export type GetFound2026Part = {
  part: 1 | 2 | 3 | 4 | 5
  slug: string
  shortTitle: string
  role: string
}

export const GET_FOUND_2026_SERIES_TITLE = 'How Businesses Get Found and Grow in 2026'

export const GET_FOUND_2026_PARTS: GetFound2026Part[] = [
  { part: 1, slug: 'get-found-2026-brand-positioning', shortTitle: 'Brand & Positioning', role: 'Foundation' },
  { part: 2, slug: 'get-found-2026-seo-organic-search', shortTitle: 'SEO & Organic Search', role: 'Bedrock' },
  { part: 3, slug: 'get-found-2026-ai-search-visibility', shortTitle: 'AI Search Visibility', role: '2026 layer' },
  { part: 4, slug: 'get-found-2026-content-strategy', shortTitle: 'Content Strategy', role: 'Engine' },
  { part: 5, slug: 'get-found-2026-paid-performance', shortTitle: 'Paid & Performance', role: 'Accelerator' },
]

export function getFound2026Part(slug: string) {
  return GET_FOUND_2026_PARTS.find((p) => p.slug === slug)
}
