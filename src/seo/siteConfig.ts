export const SITE_ORIGIN = 'https://www.stratezik.com'

export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/branding/og-share.png`
export const DEFAULT_OG_IMAGE_PATH = '/branding/og-share.png'
export const DEFAULT_OG_ALT = 'Stratezik Digital Marketing'

export const BRAND_OG_DIMENSIONS = { width: 1200, height: 630 }
export const BLOG_OG_DIMENSIONS = { width: 1200, height: 630 }

export const TWITTER_SITE = '@stratezik'

export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE_ORIGIN}/`
  return `${SITE_ORIGIN}${path.replace(/\/$/, '')}`
}

export function ogImageDimensionsForPath(imagePath: string): { width: number; height: number } {
  if (imagePath.includes('blog-og-') || imagePath.startsWith('/services/') || imagePath.includes('og-share')) {
    return BLOG_OG_DIMENSIONS
  }
  return BRAND_OG_DIMENSIONS
}
