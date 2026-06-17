import { FREE_TOOLS_FAQS } from '../free-tools/freeToolsFaqs'
import { FREE_TOOLS } from '../free-tools/tools'
import { organizationNode } from './organization'
import { SITE_ORIGIN } from './siteConfig'

const PAGE_URL = `${SITE_ORIGIN}/free-tools`

export function buildFreeToolsJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Free Marketing Tools',
      description:
        'Free tools from Stratezik: AEO Readiness Checker, ChatGPT Ads Cheat Sheet, and Growth Credit for Toronto businesses.',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      inLanguage: 'en-CA',
    },
    {
      '@type': 'CollectionPage',
      '@id': `${PAGE_URL}#collection`,
      url: PAGE_URL,
      name: 'Stratezik Free Tools',
      description: 'Hub of free marketing diagnostics, playbooks, and offers from Stratezik Digital.',
      publisher: organizationNode,
      hasPart: FREE_TOOLS.map((tool) => ({
        '@type': 'WebApplication',
        name: tool.title,
        url: `${SITE_ORIGIN}${tool.href.split('?')[0]}`,
        description: tool.description,
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CAD',
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Free Tools', item: PAGE_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FREE_TOOLS_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}
