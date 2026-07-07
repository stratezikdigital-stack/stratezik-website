import { getBlogShareImagePath } from '../blog/blogShareImages'
import { blogPostsMeta, getPublishedBlogPosts } from '../blog/postsMeta'
import { buildArticleWithFaqJsonLd, buildSimpleArticleJsonLd } from '../blog/buildArticleJsonLd'
import { buildBlogIndexJsonLd } from '../blog/buildBlogIndexJsonLd'
import { authors, buildAuthorPageJsonLd, getAuthorBySlug } from './authors'
import { buildCareersBreadcrumbJsonLd } from './buildBreadcrumbJsonLd'
import { buildAeoCheckerJsonLd } from './buildAeoCheckerJsonLd'
import { buildGbpAuditJsonLd } from './buildGbpAuditJsonLd'
import { buildCheatSheetJsonLd, buildCheatSheetGuideJsonLd } from './buildCheatSheetJsonLd'
import { buildFreeToolsJsonLd } from './buildFreeToolsJsonLd'
import { buildGrowthCreditJsonLd } from './buildGrowthCreditJsonLd'
import { serviceChildren, services, servicesHub } from '../services/services'
import { buildServiceChildJsonLd, buildServiceJsonLd, buildServicesHubJsonLd } from '../services/buildServiceJsonLd'
import { getServiceHeroImage, serviceHeroImageAlt } from '../services/serviceImages'
import { homeFaqJsonLd } from '../utils/homeFaqJsonLd'
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_IMAGE,
  SITE_ORIGIN,
  BRAND_OG_DIMENSIONS,
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
  /** When false, omitted from sitemap.xml (e.g. gated guide). Default true. */
  includeInSitemap?: boolean
  /** robots meta content; default is index,follow with max snippet hints. */
  robots?: string
  /** Person name for article:author meta (blogs only). */
  articleAuthor?: string
}

export const HOME_SEO: RouteSeoConfig = {
  path: '/',
  title: 'Stratezik | Digital Marketing Agency Canada, Toronto SEO, PPC & Strategy',
  description:
    'Stratezik digital marketing Canada. We help Toronto businesses grow with SEO, PPC, and strategy. Get your free consultation.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
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
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Careers at Stratezik Digital Marketing',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/careers#webpage`,
        name: 'Careers at Stratezik',
        description:
          'Join Stratezik Digital in Toronto. Business Development Representative and future roles on a Toronto growth team.',
        url: `${SITE_ORIGIN}/careers`,
        inLanguage: 'en-CA',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      },
      buildCareersBreadcrumbJsonLd(),
    ],
  },
  sitemapPriority: 0.8,
  sitemapChangefreq: 'monthly',
}

export const PRIVACY_SEO: RouteSeoConfig = {
  path: '/privacy',
  title: 'Privacy Notice | Stratezik Digital',
  description:
    'How Stratezik Digital collects, uses, and protects personal information under PIPEDA, CASL, Law 25, GDPR, and CPRA. Cookies, marketing consent, and your privacy rights.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik Digital Privacy Notice',
  keywords: [
    'Stratezik privacy policy',
    'PIPEDA privacy notice',
    'CASL consent',
    'cookie policy Canada',
    'Law 25 Quebec privacy',
    'digital marketing agency privacy',
  ],
  datePublished: '2026-06-16',
  dateModified: '2026-06-16',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/privacy#webpage`,
        name: 'Privacy Notice',
        description:
          'Stratezik Digital privacy notice covering data collection, CASL marketing consent, cookies, and privacy rights.',
        url: `${SITE_ORIGIN}/privacy`,
        inLanguage: 'en-CA',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_ORIGIN}/privacy#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Privacy Notice', item: `${SITE_ORIGIN}/privacy` },
        ],
      },
    ],
  },
  sitemapPriority: 0.5,
  sitemapChangefreq: 'monthly',
}

export const AEO_CHECKER_SEO: RouteSeoConfig = {
  path: '/aeo-checker',
  title: 'Free AEO Checker: 20-Point Website Readiness Test | Stratezik',
  description:
    'Free AEO checker — scan your site in ~20 seconds. Score AI crawler access, schema, answer-first copy, and llms.txt. Benchmarked vs 50 Toronto startups (median 10.75/20).',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik free AEO checker — 20-point website readiness test',
  keywords: [
    'AEO checker',
    'free AEO checker',
    'AEO readiness test',
    'free AEO audit',
    'answer engine optimization',
    'answer engine optimisation',
    'AI visibility test',
    'website AI audit',
    'llms.txt checker',
    'Organization schema audit',
    'ChatGPT citation readiness',
    'Toronto AEO',
    'Toronto startups',
    'Stratezik',
  ],
  jsonLd: buildAeoCheckerJsonLd(),
  datePublished: '2026-06-01',
  dateModified: '2026-07-07',
  sitemapPriority: 0.92,
  sitemapChangefreq: 'weekly',
}

export const GBP_AUDIT_SEO: RouteSeoConfig = {
  path: '/gbp-audit',
  title: 'Local Visibility Scan: Free Google Business Profile Audit | Stratezik',
  description:
    'Free GBP audit for Toronto and GTA businesses. See your Map Pack ranking, get three copy-paste weekend fixes, and unlock a 6-pillar local visibility score tuned to your industry.',
  ogType: 'website',
  ogImageUrl: `${SITE_ORIGIN}/services/google-business-profile.webp`,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik Local Visibility Scan — free Google Business Profile audit for Toronto and GTA',
  keywords: [
    'Google Business Profile audit',
    'GBP audit',
    'local SEO audit',
    'Google Maps ranking',
    'Map Pack audit',
    'local visibility scan',
    'Toronto local SEO',
    'Scarborough GBP',
    'GTA local visibility',
    'Google Maps near me',
    'Stratezik',
  ],
  jsonLd: buildGbpAuditJsonLd(),
  datePublished: '2026-06-22',
  dateModified: '2026-06-23',
  sitemapPriority: 0.92,
  sitemapChangefreq: 'weekly',
}

export const TORONTO_AUDIT_SEO: RouteSeoConfig = {
  path: '/toronto-startup-website-audit-2026',
  title: 'Toronto Startup Website Audit 2026 | AEO Research | Stratezik',
  description:
    'Machine-verified audit of 50 funded Toronto startup websites. Median AEO readiness score 10.75/20. Defaults pass; deliberate criteria fail. Run the same free test on your site.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Toronto Startup Website Audit 2026 — Stratezik',
  keywords: [
    'Toronto startup website audit',
    'AEO readiness',
    'answer engine optimization',
    'Toronto startups',
    'website audit 2026',
    'Stratezik',
  ],
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Toronto Startup Website Audit 2026',
    description:
      'Research report: 50 funded Toronto startups scored on the 20-Point AEO Readiness Test. Median 10.75/20.',
    url: `${SITE_ORIGIN}/toronto-startup-website-audit-2026`,
    author: { '@type': 'Organization', name: 'Stratezik', url: SITE_ORIGIN },
    publisher: { '@type': 'Organization', name: 'Stratezik', url: SITE_ORIGIN },
    datePublished: '2026-06-01',
    inLanguage: 'en-CA',
  },
  datePublished: '2026-06-01',
  sitemapPriority: 0.88,
  sitemapChangefreq: 'monthly',
}

const CHATGPT_CHEAT_OG = `${SITE_ORIGIN}/branding/blog-og-chatgpt-ads.png`

export const CHATGPT_CHEAT_SHEET_SEO: RouteSeoConfig = {
  path: '/chatgpt-ads-cheat-sheet',
  title: 'ChatGPT Ads Cheat Sheet (2026): Free Optimization Playbook | Stratezik',
  description:
    'Free ChatGPT Ads cheat sheet from a Toronto agency running the channel. Context hints, bid-floor testing, ~10× cheaper clicks vs Google Search, CTR plays, landing pages, and tracking — sourced from practitioners spending real budgets.',
  ogType: 'website',
  ogImageUrl: CHATGPT_CHEAT_OG,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'ChatGPT Ads Cheat Sheet — Stratezik free optimization playbook',
  keywords: [
    'ChatGPT Ads cheat sheet',
    'ChatGPT Ads optimization',
    'ChatGPT advertising playbook',
    'context hints ChatGPT Ads',
    'ChatGPT Ads Canada',
    'ChatGPT Ads agency Toronto',
    'paid search ChatGPT',
    'early window advertising',
    'Stratezik',
  ],
  jsonLd: buildCheatSheetJsonLd(),
  datePublished: '2026-06-12',
  dateModified: '2026-07-07',
  sitemapPriority: 0.93,
  sitemapChangefreq: 'weekly',
}

export const CHATGPT_CHEAT_SHEET_GUIDE_SEO: RouteSeoConfig = {
  path: '/chatgpt-ads-cheat-sheet/guide',
  title: 'ChatGPT Ads Cheat Sheet — Full Guide | Stratezik',
  description: 'Gated web version of the ChatGPT Ads optimization playbook.',
  ogType: 'website',
  ogImageUrl: CHATGPT_CHEAT_OG,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'ChatGPT Ads Cheat Sheet guide',
  jsonLd: buildCheatSheetGuideJsonLd(),
  robots: 'noindex, nofollow',
  includeInSitemap: false,
  sitemapPriority: 0,
  sitemapChangefreq: 'monthly',
}

export const FREE_TOOLS_SEO: RouteSeoConfig = {
  path: '/free-tools',
  title: 'Free Marketing Tools | AEO Checker & ChatGPT Ads Playbook | Stratezik',
  description:
    'Free marketing tools from Stratezik Toronto: 20-point AEO Readiness Checker, ChatGPT Ads Cheat Sheet, and $3,000 Growth Credit for qualifying Canadian businesses.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik free marketing tools hub',
  keywords: [
    'free marketing tools',
    'AEO checker free',
    'ChatGPT Ads cheat sheet',
    'Toronto marketing tools',
    'free SEO audit Canada',
    'answer engine optimization test',
    'Stratezik free tools',
  ],
  jsonLd: buildFreeToolsJsonLd(),
  datePublished: '2026-06-16',
  dateModified: '2026-06-16',
  sitemapPriority: 0.92,
  sitemapChangefreq: 'weekly',
}

export const GROWTH_CREDIT_SEO: RouteSeoConfig = {
  path: '/growth-credit',
  title: 'Stratezik Growth Credits: Up to $3,000 | Stratezik Digital',
  description:
    'Qualifying Canadian businesses can receive up to $3,000 in Stratezik Growth Credits — automatically applied to up to 40% of your monthly management retainer for 12 months. Free growth assessment.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik $3,000 Growth Credit for Canadian SMBs',
  keywords: [
    'Stratezik growth credit',
    'marketing credit Canada',
    'digital marketing offer Toronto',
    'SMB marketing credit',
    'startup marketing Canada',
    'Google Maps marketing Toronto',
    'restaurant marketing GTA',
  ],
  jsonLd: buildGrowthCreditJsonLd(),
  datePublished: '2026-06-15',
  dateModified: '2026-06-15',
  sitemapPriority: 0.9,
  sitemapChangefreq: 'weekly',
}

export const BLOG_INDEX_SEO: RouteSeoConfig = {
  path: '/blog',
  title: 'Blog | Stratezik: Toronto SEO, PPC & Answer Engine Insights',
  description:
    'Articles from Stratezik on answer engine optimisation (AEO), Toronto local SEO, AI search, Google AI Overviews, and integrated growth strategy.',
  ogType: 'website',
  ogImageUrl: DEFAULT_OG_IMAGE,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: 'Stratezik Blog',
  jsonLd: buildBlogIndexJsonLd(getPublishedBlogPosts()),
  sitemapPriority: 0.85,
  sitemapChangefreq: 'weekly',
}

function blogPostSeo(post: (typeof blogPostsMeta)[number]): RouteSeoConfig {
  const sharePath = post.shareImagePath ?? getBlogShareImagePath(post.slug)
  const dims = ogImageDimensionsForPath(sharePath)
  const jsonLd = post.buildJsonLd
    ? post.buildJsonLd(post)
    : post.faqEntities && post.faqEntities.length > 0
      ? buildArticleWithFaqJsonLd(post, post.faqEntities)
      : buildSimpleArticleJsonLd(post)

  const author = getAuthorBySlug(post.authorSlug)
  const isDraft = post.published === false

  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} | Stratezik Blog`,
    description: post.description,
    articleAuthor: author?.name ?? 'Shah Md. Rifat',
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
    includeInSitemap: !isDraft,
    robots: isDraft ? 'noindex, nofollow' : undefined,
  }
}

function authorPageSeo(author: (typeof authors)[number]): RouteSeoConfig {
  return {
    path: `/authors/${author.slug}`,
    title: `${author.name}, ${author.jobTitle} | Stratezik`,
    description: author.bio,
    ogType: 'website',
    ogImageUrl: author.imagePath ? `${SITE_ORIGIN}${author.imagePath}` : DEFAULT_OG_IMAGE,
    ogImageWidth: BRAND_OG_DIMENSIONS.width,
    ogImageHeight: BRAND_OG_DIMENSIONS.height,
    ogImageAlt: `${author.name} — Stratezik`,
    jsonLd: buildAuthorPageJsonLd(author),
    sitemapPriority: 0.6,
    sitemapChangefreq: 'monthly',
  }
}

const SERVICES_HUB_SEO: RouteSeoConfig = {
  path: '/services',
  title: servicesHub.title,
  description: servicesHub.metaDescription,
  ogType: 'website',
  ogImageUrl: `${SITE_ORIGIN}${getServiceHeroImage(undefined)!}`,
  ogImageWidth: BRAND_OG_DIMENSIONS.width,
  ogImageHeight: BRAND_OG_DIMENSIONS.height,
  ogImageAlt: serviceHeroImageAlt('Stratezik digital marketing services in Toronto and the GTA'),
  keywords: [servicesHub.primaryKeyword, ...servicesHub.secondaryKeywords],
  jsonLd: buildServicesHubJsonLd(),
  sitemapPriority: 0.9,
  sitemapChangefreq: 'monthly',
}

function servicePageSeo(service: (typeof services)[number]): RouteSeoConfig {
  const heroPath = getServiceHeroImage(service.slug)
  return {
    path: `/services/${service.slug}`,
    title: service.title,
    description: service.metaDescription,
    ogType: 'website',
    ogImageUrl: heroPath ? `${SITE_ORIGIN}${heroPath}` : DEFAULT_OG_IMAGE,
    ogImageWidth: BRAND_OG_DIMENSIONS.width,
    ogImageHeight: BRAND_OG_DIMENSIONS.height,
    ogImageAlt: heroPath
      ? serviceHeroImageAlt(`${service.primaryKeyword} — Stratezik`)
      : `${service.primaryKeyword} — Stratezik`,
    keywords: [service.primaryKeyword, ...service.secondaryKeywords],
    jsonLd: buildServiceJsonLd(service),
    sitemapPriority: 0.88,
    sitemapChangefreq: 'monthly',
  }
}

function serviceChildPageSeo(child: (typeof serviceChildren)[number]): RouteSeoConfig {
  const heroPath = getServiceHeroImage(child.parentSlug, child.slug)
  return {
    path: `/services/${child.parentSlug}/${child.slug}`,
    title: child.title,
    description: child.metaDescription,
    ogType: 'website',
    ogImageUrl: heroPath ? `${SITE_ORIGIN}${heroPath}` : DEFAULT_OG_IMAGE,
    ogImageWidth: BRAND_OG_DIMENSIONS.width,
    ogImageHeight: BRAND_OG_DIMENSIONS.height,
    ogImageAlt: heroPath
      ? serviceHeroImageAlt(`${child.primaryKeyword} — Stratezik`)
      : `${child.primaryKeyword} — Stratezik`,
    keywords: [child.primaryKeyword, ...child.secondaryKeywords],
    jsonLd: buildServiceChildJsonLd(child),
    sitemapPriority: 0.82,
    sitemapChangefreq: 'monthly',
  }
}

/** All indexable routes with server-rendered SEO metadata. */
export function getAllRouteSeoConfigs(): RouteSeoConfig[] {
  return [
    HOME_SEO,
    CAREERS_SEO,
    PRIVACY_SEO,
    AEO_CHECKER_SEO,
    GBP_AUDIT_SEO,
    TORONTO_AUDIT_SEO,
    CHATGPT_CHEAT_SHEET_SEO,
    CHATGPT_CHEAT_SHEET_GUIDE_SEO,
    FREE_TOOLS_SEO,
    GROWTH_CREDIT_SEO,
    SERVICES_HUB_SEO,
    ...services.map(servicePageSeo),
    ...serviceChildren.map(serviceChildPageSeo),
    BLOG_INDEX_SEO,
    ...blogPostsMeta.map(blogPostSeo),
    ...authors.map(authorPageSeo),
  ]
}

export function getRouteSeoByPath(pathname: string): RouteSeoConfig | undefined {
  const normalized = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
  return getAllRouteSeoConfigs().find((r) => r.path === normalized)
}

export { canonicalUrl }
