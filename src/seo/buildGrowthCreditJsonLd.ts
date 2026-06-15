import { GROWTH_CREDIT_FAQS } from '../growth-credit/growthCreditFaqs'
import { organizationNode } from './organization'
import { SITE_ORIGIN } from './siteConfig'

const PAGE_URL = `${SITE_ORIGIN}/growth-credit`

export function buildGrowthCreditJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: '$3,000 Growth Credit for Canadian SMBs',
      description:
        'Stratezik Growth Credits for qualifying Canadian startups and SMBs. $3,000 applied against onboarding after a free 20-minute growth assessment.',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      inLanguage: 'en-CA',
      about: {
        '@type': 'Thing',
        name: 'Digital marketing services',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Growth Credit', item: PAGE_URL },
      ],
    },
    {
      '@type': 'Offer',
      '@id': `${PAGE_URL}#offer`,
      name: 'Stratezik $3,000 Growth Credit',
      url: PAGE_URL,
      price: '3000',
      priceCurrency: 'CAD',
      eligibleRegion: { '@type': 'Country', name: 'Canada' },
      description:
        'Marketing credit applied against Stratezik onboarding for qualifying Canadian startups and SMBs after a free growth assessment.',
      seller: organizationNode,
      availability: 'https://schema.org/LimitedAvailability',
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: GROWTH_CREDIT_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
