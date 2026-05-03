import type { BlogPostMeta } from './postTypes'

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

export function buildAeoArticleJsonLd(meta: BlogPostMeta, faqMainEntity: { question: string; answer: string }[]) {
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
    image: [`${SITE}/branding/stratezik-vertical.png`],
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

  return {
    '@context': 'https://schema.org',
    '@graph': [article, faq],
  }
}
