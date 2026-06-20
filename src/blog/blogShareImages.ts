/** Per-article OG/social images (1200×630 service art or dedicated blog-og assets). */
const BLOG_SHARE_IMAGE_BY_SLUG: Record<string, string> = {
  'when-hire-digital-marketing-agency-scarborough-gta': '/services/services-hub.png',
  'signs-time-digital-marketing-agency-gta': '/services/paid-search.png',
  'get-found-2026-brand-positioning': '/services/brand-strategy.png',
  'get-found-2026-seo-organic-search': '/services/seo-aeo.png',
  'get-found-2026-ai-search-visibility': '/services/seo-aeo.png',
  'get-found-2026-content-strategy': '/services/social-media-marketing.png',
  'get-found-2026-paid-performance': '/services/paid-search.png',
  'get-recommended-by-chatgpt-playbook': '/branding/blog-og-chatgpt-recommendations.png',
  'chatgpt-ads-2026-guide': '/branding/blog-og-chatgpt-ads.png',
  'chatgpt-ads-toronto-industries': '/branding/blog-og-chatgpt-ads.png',
  'google-maps-ranking-service-business': '/services/google-business-profile-maps.png',
  'insectica-gta-pest-control-scaling-case-study': '/branding/blog-og-insectica-case-study.png',
  'answer-engine-optimisation-toronto': '/services/seo-aeo-local-seo.png',
  'ai-native-gtm-build-from-day-1': '/services/ai-agents.png',
  'ai-native-gtm-cited-by-chatgpt': '/branding/blog-og-chatgpt-recommendations.png',
  'ai-native-gtm-agent-stack-by-stage': '/services/ai-agents.png',
  'ai-native-gtm-marketing-hire-2026': '/services/ai-agents.png',
  'old-seo-to-agent-ready-seo-2026': '/services/seo-aeo.png',
}

export function getBlogShareImagePath(slug: string): string {
  return BLOG_SHARE_IMAGE_BY_SLUG[slug] ?? '/services/services-hub.png'
}
