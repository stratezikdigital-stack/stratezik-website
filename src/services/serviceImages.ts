/**
 * Hero images for /services routes. Keys match parent slugs or `parent/child` for overrides.
 * Child pages without an entry inherit the parent image.
 */
export const serviceHeroImages: Record<string, string> = {
  services: '/services/services-hub.png',
  'paid-search': '/services/paid-search.png',
  'paid-social': '/services/paid-social.png',
  'seo-aeo': '/services/seo-aeo.png',
  'google-business-profile': '/services/google-business-profile.png',
  'social-media-marketing': '/services/social-media-marketing.png',
  'brand-strategy': '/services/brand-strategy.png',
  'web-design': '/services/web-design.png',
  'ai-agents': '/services/ai-agents.png',
  'seo-aeo/local-seo': '/services/seo-aeo-local-seo.png',
}

export function getServiceHeroImage(parentSlug: string | undefined, childSlug?: string): string | undefined {
  if (!parentSlug) return serviceHeroImages.services
  if (childSlug) {
    const childKey = `${parentSlug}/${childSlug}`
    if (serviceHeroImages[childKey]) return serviceHeroImages[childKey]
  }
  return serviceHeroImages[parentSlug]
}

/** Visible label + alt suffix for AI-generated service hero art. */
export const SERVICE_HERO_AI_LABEL = 'AI-rendered image'

export function serviceHeroImageAlt(description: string): string {
  return `${description}. ${SERVICE_HERO_AI_LABEL}.`
}
