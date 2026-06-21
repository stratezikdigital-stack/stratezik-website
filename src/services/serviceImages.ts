/**
 * Hero images for /services routes. Keys match parent slugs or `parent/child` for overrides.
 * Child pages without an entry inherit the parent image.
 */
const serviceHeroBasenames: Record<string, string> = {
  services: 'services-hub',
  'paid-search': 'paid-search',
  'paid-social': 'paid-social',
  'seo-aeo': 'seo-aeo',
  'google-business-profile': 'google-business-profile',
  'social-media-marketing': 'social-media-marketing',
  'brand-strategy': 'brand-strategy',
  'web-design': 'web-design',
  'ai-agents': 'ai-agents',
  'seo-aeo/local-seo': 'seo-aeo-local-seo',
}

export type ServiceHeroSources = {
  avif: string
  webp: string
  png: string
}

export function getServiceHeroBasename(parentSlug: string | undefined, childSlug?: string): string | undefined {
  if (!parentSlug) return serviceHeroBasenames.services
  if (childSlug) {
    const childKey = `${parentSlug}/${childSlug}`
    if (serviceHeroBasenames[childKey]) return serviceHeroBasenames[childKey]
  }
  return serviceHeroBasenames[parentSlug]
}

export function getServiceHeroSources(basename: string): ServiceHeroSources {
  const base = `/services/${basename}`
  return { avif: `${base}.avif`, webp: `${base}.webp`, png: `${base}.png` }
}

/** Preferred lightweight path for OG/meta and simple img fallbacks. */
export function getServiceHeroImage(parentSlug: string | undefined, childSlug?: string): string | undefined {
  const basename = getServiceHeroBasename(parentSlug, childSlug)
  return basename ? getServiceHeroSources(basename).webp : undefined
}

/** Visible label + alt suffix for AI-generated service hero art. */
export const SERVICE_HERO_AI_LABEL = 'AI-rendered image'

export function serviceHeroImageAlt(description: string): string {
  return `${description}. ${SERVICE_HERO_AI_LABEL}.`
}
