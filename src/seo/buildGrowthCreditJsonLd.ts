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
      name: 'Stratezik Growth Credits: Up to $3,000 to Fuel Your Foundation',
      description:
        'Proprietary funding program for qualifying Canadian businesses. Up to $3,000 in service credits applied automatically to monthly invoices — up to 40% of eligible Stratezik management fees for 12 months.',
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
        'Up to CAD $3,000 promotional service credit for qualifying Canadian businesses. Automatically offsets up to 40% of eligible monthly Stratezik management fees for 12 months. Not applicable to third-party ad spend. Subject to approval.',
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
