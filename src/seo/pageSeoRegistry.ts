import { blogPosts } from '../blog/posts'
import { buildArticleWithFaqJsonLd, buildSimpleArticleJsonLd } from '../blog/buildArticleJsonLd'
import { buildBlogIndexJsonLd } from '../blog/buildBlogIndexJsonLd'
import { homeFaqJsonLd } from '../utils/homeFaqJsonLd'
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_PATH,
  SITE_ORIGIN,
  canonicalUrl,
  ogImageDimensionsForPath,
} from './siteConfig'

export type RouteSeoConfig = {
  path: string
  title: string
  description: string
  ogType: 'website' | 'article'
  ogImageUrl: string
  ogImageWidth: number
  ogImageHeight: number
  ogImageAlt: string
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  /** Route-specific JSON-LD injected in initial HTML */
  jsonLd?: unknown
  /** Additional JSON-LD blocks (e.g. homepage FAQ separate from route graph) */
  extraJsonLd?: { id: string; data: unknown }[]
  sitemapPriority: number
  sitemapChangefreq: 'weekly' | 'monthly'
}

export const HOME_SEO: RouteSeoConfig = {
  path: '/',
  title: 'Stratezik | Digital Marketing Agency Canada, Toronto SEO, PPC & Strategy',
  description:
    'Stratezik digital marketing Canada. We help Toronto businesses grow with SEO, PPC, and strategy. Get your free consultation.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: 1024,
  ogImageHeight: 625,
  ogImageAlt: DEFAULT_OG_ALT,
  keywords: [
    'Stratezik',
    'digital marketing agency',
    'Canada',
    'Toronto',
    'SEO',
    'PPC',
    'strategic marketing',
    'brand strategy',
    'social media marketing',
    'analytics',
  ],
  extraJsonLd: [{ id: 'stratezik-home-faq-jsonld', data: homeFaqJsonLd }],
  sitemapPriority: 1.0,
  sitemapChangefreq: 'weekly',
}

export const CAREERS_SEO: RouteSeoConfig = {
  path: '/careers',
  title: 'Careers at Stratezik | Join Our Digital Marketing Team in Toronto',
  description:
    'Join Stratezik Digital in Toronto. We are hiring a Business Development Representative. Work with a team of ex-Google, McCann & Hootsuite marketers. Apply now.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: 1024,
  ogImageHeight: 625,
  ogImageAlt: 'Careers at Stratezik Digital Marketing',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_ORIGIN}/careers#webpage`,
    name: 'Careers at Stratezik',
    description:
      'Join Stratezik Digital in Toronto. Business Development Representative and future roles on a Toronto growth team.',
    url: `${SITE_ORIGIN}/careers`,
    inLanguage: 'en-CA',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
  },
  sitemapPriority: 0.8,
  sitemapChangefreq: 'monthly',
}

export const BLOG_INDEX_SEO: RouteSeoConfig = {
  path: '/blog',
  title: 'Blog | Stratezik: Toronto SEO, PPC & Answer Engine Insights',
  description:
    'Articles from Stratezik on answer engine optimisation (AEO), Toronto local SEO, AI search, Google AI Overviews, and integrated growth strategy.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: 1024,
  ogImageHeight: 625,
  ogImageAlt: 'Stratezik Blog',
  jsonLd: buildBlogIndexJsonLd(blogPosts),
  sitemapPriority: 0.85,
  sitemapChangefreq: 'weekly',
}

function blogPostSeo(post: (typeof blogPosts)[number]): RouteSeoConfig {
  const sharePath = post.shareImagePath ?? DEFAULT_OG_IMAGE_PATH
  const dims = ogImageDimensionsForPath(sharePath)
  const jsonLd =
    post.faqEntities && post.faqEntities.length > 0
      ? buildArticleWithFaqJsonLd(post, post.faqEntities)
      : buildSimpleArticleJsonLd(post)

  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} | Stratezik Blog`,
    description: post.description,
    ogType: 'article',
    ogImageUrl: `${SITE_ORIGIN}${sharePath}`,
    ogImageWidth: dims.width,
    ogImageHeight: dims.height,
    ogImageAlt: post.title,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    keywords: post.keywords,
    jsonLd,
    sitemapPriority: 0.92,
    sitemapChangefreq: 'monthly',
  }
}

/** All indexable routes with server-rendered SEO metadata. */
export function getAllRouteSeoConfigs(): RouteSeoConfig[] {
  return [HOME_SEO, CAREERS_SEO, BLOG_INDEX_SEO, ...blogPosts.map(blogPostSeo)]
}

export function getRouteSeoByPath(pathname: string): RouteSeoConfig | undefined {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return getAllRouteSeoConfigs().find((r) => r.path === normalized)
}

export { canonicalUrl }
