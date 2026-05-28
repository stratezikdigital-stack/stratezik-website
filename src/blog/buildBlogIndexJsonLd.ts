import type { BlogPostMeta } from './postTypes'
import { buildBlogIndexBreadcrumbJsonLd } from '../seo/buildBreadcrumbJsonLd'

const SITE = 'https://www.stratezik.com'

const publisher = {
  '@type': 'Organization',
  name: 'Stratezik',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/branding/stratezik-vertical.png`,
  },
}

/** Blog listing page: Blog + BlogPosting entries for crawl context. */
export function buildBlogIndexJsonLd(posts: BlogPostMeta[]) {
  const blogUrl = `${SITE}/blog`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${blogUrl}#blog`,
        name: 'Stratezik Blog',
        description:
          'Articles on answer engine optimisation (AEO), Toronto and Ontario local SEO, Google Maps and Business Profile, PPC, AI search, and growth strategy.',
        url: blogUrl,
        inLanguage: 'en-CA',
        publisher,
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE}/blog/${p.slug}#article`,
          headline: p.title,
          description: p.description,
          url: `${SITE}/blog/${p.slug}`,
          datePublished: p.datePublished,
          dateModified: p.dateModified,
          author: publisher,
          publisher,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE}/blog/${p.slug}`,
          },
        })),
      },
      buildBlogIndexBreadcrumbJsonLd(),
    ],
  }
}
