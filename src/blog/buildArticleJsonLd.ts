import type { BlogPostMeta } from './postTypes'
import { buildBlogPostBreadcrumbJsonLd } from '../seo/buildBreadcrumbJsonLd'

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

function articleImageUrls(meta: BlogPostMeta): string[] {
  const path = meta.shareImagePath ?? '/branding/stratezik-horizontal.png'
  return [`${SITE}${path}`]
}

export function buildArticleWithFaqJsonLd(meta: BlogPostMeta, faqMainEntity: { question: string; answer: string }[]) {
  const url = `${SITE}/blog/${meta.slug}`
  const article = {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: meta.title,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    author: publisher,
    publisher,
    image: articleImageUrls(meta),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: meta.keywords.join(', '),
    inLanguage: 'en-CA',
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqMainEntity.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  const breadcrumb = buildBlogPostBreadcrumbJsonLd(meta.slug, meta.title)

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faq, breadcrumb],
  }
}

/** Article structured data without FAQ block. */
export function buildSimpleArticleJsonLd(meta: BlogPostMeta) {
  const url = `${SITE}/blog/${meta.slug}`
  const breadcrumb = buildBlogPostBreadcrumbJsonLd(meta.slug, meta.title)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: meta.title,
        description: meta.description,
        datePublished: meta.datePublished,
        dateModified: meta.dateModified,
        author: publisher,
        publisher,
        image: articleImageUrls(meta),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        keywords: meta.keywords.join(', '),
        inLanguage: 'en-CA',
      },
      breadcrumb,
    ],
  }
}

/** @deprecated Use buildArticleWithFaqJsonLd */
export const buildAeoArticleJsonLd = buildArticleWithFaqJsonLd
