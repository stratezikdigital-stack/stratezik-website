/** Per-article hero + OG/social images (1024×576 chessboard art). */
const BLOG_HERO_IMAGE_BY_SLUG: Record<string, string> = {
  'old-seo-to-agent-ready-seo-2026': '/branding/blog-heroes/old-seo-to-agent-ready-seo-2026.jpg',
  'ai-native-gtm-build-from-day-1': '/branding/blog-heroes/ai-native-gtm-build-from-day-1.jpg',
  'ai-native-gtm-cited-by-chatgpt': '/branding/blog-heroes/ai-native-gtm-cited-by-chatgpt.jpg',
  'ai-native-gtm-agent-stack-by-stage': '/branding/blog-heroes/ai-native-gtm-agent-stack-by-stage.jpg',
  'ai-native-gtm-marketing-hire-2026': '/branding/blog-heroes/ai-native-gtm-marketing-hire-2026.jpg',
  'when-hire-digital-marketing-agency-scarborough-gta':
    '/branding/blog-heroes/when-hire-digital-marketing-agency-scarborough-gta.jpg',
  'signs-time-digital-marketing-agency-gta': '/branding/blog-heroes/signs-time-digital-marketing-agency-gta.jpg',
  'get-found-2026-brand-positioning': '/branding/blog-heroes/get-found-2026-brand-positioning.jpg',
  'get-found-2026-seo-organic-search': '/branding/blog-heroes/get-found-2026-seo-organic-search.jpg',
  'get-found-2026-ai-search-visibility': '/branding/blog-heroes/get-found-2026-ai-search-visibility.jpg',
  'get-found-2026-content-strategy': '/branding/blog-heroes/get-found-2026-content-strategy.jpg',
  'get-found-2026-paid-performance': '/branding/blog-heroes/get-found-2026-paid-performance.jpg',
  'get-recommended-by-chatgpt-toronto': '/branding/blog-heroes/get-recommended-by-chatgpt-toronto.jpg',
  'get-recommended-by-chatgpt-playbook': '/branding/blog-heroes/get-recommended-by-chatgpt-playbook.jpg',
  'chatgpt-ads-toronto-industries': '/branding/blog-heroes/chatgpt-ads-toronto-industries.jpg',
  'chatgpt-ads-2026-guide': '/branding/blog-heroes/chatgpt-ads-2026-guide.jpg',
  'google-maps-ranking-service-business': '/branding/blog-heroes/google-maps-ranking-service-business.jpg',
  'insectica-gta-pest-control-scaling-case-study':
    '/branding/blog-heroes/insectica-gta-pest-control-scaling-case-study.jpg',
  'answer-engine-optimisation-toronto': '/branding/blog-heroes/answer-engine-optimisation-toronto.jpg',
}

const FALLBACK = '/branding/og-share.png'

export function getBlogHeroImagePath(slug: string): string | null {
  return BLOG_HERO_IMAGE_BY_SLUG[slug] ?? null
}

/** OG/Twitter + Article JSON-LD image — same dedicated hero art when available. */
export function getBlogShareImagePath(slug: string): string {
  return BLOG_HERO_IMAGE_BY_SLUG[slug] ?? FALLBACK
}
