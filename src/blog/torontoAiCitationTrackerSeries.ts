export const TORONTO_AI_CITATION_TRACKER_HUB_SLUG = 'toronto-ai-citation-tracker'

export const TORONTO_AI_CITATION_TRACKER_TITLE = 'Toronto AI Citation & ChatGPT Ads Tracker'

/** Flagship audit that defines the 20-point AEO test used across the research series. */
export const TORONTO_STARTUP_WEBSITE_AUDIT_BLOG_SLUG = 'toronto-startup-website-audit-2026'

export const TORONTO_STARTUP_WEBSITE_AUDIT_TITLE = 'The Toronto Startup Website Audit 2026'

export type TorontoAiCitationTrackerEdition = {
  slug: string
  monthLabel: string
  datePublished: string
  headline: string
  isCurrent?: boolean
}

/** Newest first — add each monthly permalink here when published. */
export const TORONTO_AI_CITATION_TRACKER_EDITIONS: TorontoAiCitationTrackerEdition[] = [
  {
    slug: 'toronto-ai-citation-tracker-july-2026',
    monthLabel: 'July 2026',
    datePublished: '2026-07-08',
    headline: '89% local citations + ChatGPT ad map across 18 industries',
    isCurrent: true,
  },
]

export function getCurrentTorontoAiCitationTrackerEdition() {
  return TORONTO_AI_CITATION_TRACKER_EDITIONS.find((e) => e.isCurrent) ?? TORONTO_AI_CITATION_TRACKER_EDITIONS[0]
}
