export type AeoCheckerLinkOpts = {
  /** Attribution slug, e.g. blog-answer-engine-toronto, nav, footer */
  source?: string
  campaign?: string
  medium?: string
  /** Pre-fill domain in the checker input */
  url?: string
}

/** Build /aeo-checker URL with UTM params for lead attribution. */
export function buildAeoCheckerUrl(opts?: AeoCheckerLinkOpts): string {
  const params = new URLSearchParams()
  if (opts?.source) {
    params.set('utm_source', opts.source)
    params.set('utm_medium', opts.medium ?? 'cta')
  }
  if (opts?.campaign) params.set('utm_campaign', opts.campaign)
  if (opts?.url) params.set('url', opts.url)
  const q = params.toString()
  return q ? `/aeo-checker?${q}` : '/aeo-checker'
}

/** Resolve lead source from checker page query string. */
export function resolveLeadSource(search: URLSearchParams): string | null {
  const source = search.get('utm_source')?.trim()
  if (source) return source.slice(0, 120)
  const campaign = search.get('utm_campaign')?.trim()
  if (campaign) return `campaign:${campaign.slice(0, 100)}`
  return null
}
