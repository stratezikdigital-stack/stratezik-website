export interface SitemapPageAudit {
  url: string
  geoScore: number
  statuses: Record<string, 'pass' | 'warn' | 'fail' | undefined>
  topIssue: string | null
}

export interface SitemapAudit {
  domain: string
  sitemapFound: boolean
  urlsDiscovered: number
  pagesAudited: number
  overallScore: number
  jsBlankCount: number
  issueCounts: Record<string, number>
  worstPages: SitemapPageAudit[]
  pages: SitemapPageAudit[]
}
