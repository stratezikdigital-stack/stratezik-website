import { SITE_ORIGIN } from '../seo/siteConfig'
import { organizationNode } from '../seo/organization'
import type { ServiceDefinition } from './serviceTypes'
import { services, servicesHub } from './services'

/** GEO targeting: office is in Scarborough (M1K), serving Toronto + GTA. */
const AREA_SERVED = [
  { '@type': 'City', name: 'Toronto' },
  { '@type': 'City', name: 'Scarborough' },
  { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
  { '@type': 'Country', name: 'Canada' },
]

function breadcrumb(slug: string, name: string) {
  const url = `${SITE_ORIGIN}/services/${slug}`
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_ORIGIN}/services` },
      { '@type': 'ListItem', position: 3, name, item: url },
    ],
  }
}

export function buildServiceJsonLd(service: ServiceDefinition) {
  const url = `${SITE_ORIGIN}/services/${service.slug}`
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title.replace(/\s*\|\s*Stratezik$/, '').trim(),
      description: service.metaDescription,
      serviceType: service.serviceType,
      url,
      provider: organizationNode,
      areaServed: AREA_SERVED,
      inLanguage: 'en-CA',
    },
    breadcrumb(service.slug, service.primaryKeyword),
  ]

  if (service.faqEntities && service.faqEntities.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: service.faqEntities.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

export function buildServicesHubJsonLd() {
  const url = `${SITE_ORIGIN}/services`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        name: servicesHub.title.replace(/\s*\|\s*Stratezik$/, '').trim(),
        description: servicesHub.metaDescription,
        url,
        inLanguage: 'en-CA',
        isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
        about: organizationNode,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.primaryKeyword,
            url: `${SITE_ORIGIN}/services/${s.slug}`,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: url },
        ],
      },
    ],
  }
}
