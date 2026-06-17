import { CHEAT_SHEET_FAQS } from '../cheatsheet/cheatSheetFaqs'
import { organizationNode } from './organization'
import { SITE_ORIGIN } from './siteConfig'

const PAGE_URL = `${SITE_ORIGIN}/chatgpt-ads-cheat-sheet`
const OG_IMAGE = `${SITE_ORIGIN}/branding/blog-og-chatgpt-ads.png`

export function buildCheatSheetBreadcrumbJsonLd() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Free Tools', item: `${SITE_ORIGIN}/free-tools` },
      { '@type': 'ListItem', position: 3, name: 'ChatGPT Ads Cheat Sheet', item: PAGE_URL },
    ],
  }
}

export function buildCheatSheetJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'The ChatGPT Ads Cheat Sheet (2026)',
      description:
        'Free ChatGPT Ads optimization playbook: context hints, bid-floor testing, CTR plays, conversational landing pages, and the tracking stack. From practitioners actually spending.',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      about: {
        '@type': 'Thing',
        name: 'ChatGPT advertising',
        sameAs: 'https://ads.openai.com',
      },
      inLanguage: 'en-CA',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    },
    {
      '@type': 'DigitalDocument',
      '@id': `${PAGE_URL}#document`,
      name: 'The ChatGPT Ads Cheat Sheet: The Early-Window Optimization Playbook',
      description:
        'Gated lead magnet covering five optimization levers, industry readiness tiers, 30-60-90 plan, and measurement stack for ChatGPT Ads.',
      url: PAGE_URL,
      encodingFormat: 'text/html',
      inLanguage: 'en-CA',
      author: {
        '@type': 'Person',
        name: 'Shah Md. Rifat',
        url: `${SITE_ORIGIN}/authors/shah-md-rifat`,
      },
      publisher: organizationNode,
      datePublished: '2026-06-12',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CAD',
        url: PAGE_URL,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'How to optimize ChatGPT Ads in the early window',
      description:
        'Five levers that still work on ChatGPT Ads: context hints, bids, creative, landing pages, and account structure.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Write context hints in buyer language',
          text: 'Describe the conversation your buyer is having — one tight intent per ad group.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Test CPM bid floors',
          text: 'Probe below platform recommendations; relevance-weighted auctions reward specificity over spend.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Optimize CTR on short copy',
          text: 'Headline and description compete in a relevance-weighted auction — format for the sponsored card.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Match landing pages to the conversation',
          text: 'The click arrives mid-chat; the page should read like the next message, not a generic homepage.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Instrument before you scale',
          text: 'OpenAI pixel in head, Conversions API, GA4 chatgpt channel, and assisted-conversion patience.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: CHEAT_SHEET_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    buildCheatSheetBreadcrumbJsonLd(),
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

export function buildCheatSheetGuideJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'ChatGPT Ads Cheat Sheet — gated guide',
    url: `${SITE_ORIGIN}/chatgpt-ads-cheat-sheet/guide`,
    robots: 'noindex',
    isPartOf: { '@type': 'WebSite', name: 'Stratezik', url: SITE_ORIGIN },
  }
}
