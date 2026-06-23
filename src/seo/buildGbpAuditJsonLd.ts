import { GBP_AUDIT_FAQS } from '../gbp/gbpAuditFaqs'
import { organizationNode } from './organization'
import { SITE_ORIGIN } from './siteConfig'

const PAGE_URL = `${SITE_ORIGIN}/gbp-audit`

export function buildGbpAuditBreadcrumbJsonLd() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_ORIGIN}/free-tools` },
      { '@type': 'ListItem', position: 3, name: 'Local Visibility Scan', item: PAGE_URL },
    ],
  }
}

export function buildGbpAuditJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Local Visibility Scan — Free Google Business Profile Audit',
      description:
        'Free GBP audit for Toronto and GTA businesses. Map Pack ranking, three copy-paste fixes, and a six-pillar local visibility score.',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      about: {
        '@type': 'Thing',
        name: 'Google Business Profile',
        sameAs: 'https://www.google.com/business/',
      },
      inLanguage: 'en-CA',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/services/google-business-profile.webp`,
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${PAGE_URL}#app`,
      name: 'Stratezik Local Visibility Scan',
      url: PAGE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      description:
        'Free Google Business Profile audit with Map Pack gap analysis, industry-tuned quick wins, six-pillar score, and optional paid 90-day roadmap.',
      featureList: [
        'Map Pack rank estimate',
        'Local visibility score out of 100',
        'Three copy-paste GBP fixes',
        'Six-pillar health breakdown',
        'Live Google Maps data when available',
        'Industry templates for 8+ trades',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Free topline scan',
          price: '0',
          priceCurrency: 'CAD',
          url: PAGE_URL,
        },
        {
          '@type': 'Offer',
          name: '90-day GBP growth roadmap',
          price: '29',
          priceCurrency: 'CAD',
          url: PAGE_URL,
        },
      ],
      provider: organizationNode,
      audience: {
        '@type': 'Audience',
        audienceType: 'Local service businesses',
        geographicArea: { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'How to run the free Google Business Profile audit',
      description: 'Check your Map Pack gap and get three fixes in about 60 seconds.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter your business',
          text: 'Add your business name, city (e.g. Scarborough, ON), and industry on stratezik.com/gbp-audit.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Review your Map Pack gap',
          text: 'See your approximate rank, competitors in the local pack, and a visibility score out of 100.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Apply the fixes',
          text: 'Copy the three weekend fixes into Google Business Profile, unlock the six-pillar breakdown with email, or purchase the full roadmap.',
        },
      ],
    },
    buildGbpAuditBreadcrumbJsonLd(),
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: GBP_AUDIT_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}
