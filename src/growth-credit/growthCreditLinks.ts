export type GrowthCreditLinkOpts = {
  source?: string
  medium?: string
  campaign?: string
}

export function buildGrowthCreditUrl({
  source = 'site',
  medium = 'cta',
  campaign = 'growth-credit',
}: GrowthCreditLinkOpts = {}): string {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  })
  return `/growth-credit?${params.toString()}`
}
