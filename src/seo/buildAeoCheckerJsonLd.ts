import { AEO_BENCHMARK } from '../aeo/benchmark'
import { AEO_CHECKER_FAQS } from '../aeo/checkerFaqs'
import { organizationNode } from './organization'
import { SITE_ORIGIN } from './siteConfig'

const PAGE_URL = `${SITE_ORIGIN}/aeo-checker`

export function buildAeoCheckerBreadcrumbJsonLd() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'AEO Readiness Checker', item: PAGE_URL },
    ],
  }
}

export function buildAeoCheckerJsonLd() {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: 'Free AEO Checker — 20-Point Website Readiness Test',
      description:
        'Free AEO checker — scan your site in ~20 seconds. Score AI crawler access, schema, answer-first copy, and llms.txt. Benchmarked vs 50 Toronto startups.',
      datePublished: '2026-06-01',
      dateModified: '2026-07-07',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Stratezik', url: SITE_ORIGIN },
      about: {
        '@type': 'Thing',
        name: 'Answer engine optimisation',
        sameAs: 'https://en.wikipedia.org/wiki/Search_engine_optimization',
      },
      inLanguage: 'en-CA',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/services/seo-aeo.webp`,
      },
    },
    {
      '@type': 'WebApplication',
      '@id': `${PAGE_URL}#app`,
      name: 'Stratezik Free AEO Checker',
      url: PAGE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      dateModified: '2026-07-07',
      description:
        'Free AEO checker with machine-verified scoring: AI crawler access, SSR, entity alignment, Organization and FAQ schema, answer-first copy, llms.txt, and pricing transparency. Optional paid AI visibility and full-site audits.',
      featureList: [
        '20-point AEO readiness score',
        'Defaults vs deliberate split',
        'Eight-criterion evidence and fix list',
        'Toronto startup benchmark comparison',
        'Paid AI visibility and GEO page reports',
        'Paid full-site sitemap audit (up to 25 pages)',
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
          name: 'Page AI visibility report',
          price: '10',
          priceCurrency: 'CAD',
          url: PAGE_URL,
        },
        {
          '@type': 'Offer',
          name: 'Full-site AEO audit',
          price: '49',
          priceCurrency: 'CAD',
          url: PAGE_URL,
        },
      ],
      provider: organizationNode,
      audience: {
        '@type': 'Audience',
        audienceType: 'Startups and SMBs',
        geographicArea: { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
      },
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE_URL}#howto`,
      name: 'How to run the free AEO readiness test',
      description: 'Check your website’s answer-engine readiness in three steps.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enter your site',
          text: 'Paste your domain on stratezik.com/aeo-checker. No credit card required for the topline score.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'We read it like AI does',
          text: 'In about 20 seconds the checker runs crawler, schema, copy, and entity checks the way AI systems see your raw HTML.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Get your fixes',
          text: 'Unlock the full breakdown with email consent, or purchase a deeper AI visibility or full-site audit report.',
        },
      ],
    },
    {
      '@type': 'Dataset',
      '@id': `${PAGE_URL}#benchmark`,
      name: 'Toronto startup AEO readiness benchmark (2026)',
      description: `Median AEO readiness score ${AEO_BENCHMARK.median}/20 across ${AEO_BENCHMARK.n} funded Toronto startups.`,
      url: `${SITE_ORIGIN}/toronto-startup-website-audit-2026`,
      creator: organizationNode,
      variableMeasured: 'AEO readiness score (0-20)',
      datePublished: '2026-06-01',
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by/4.0/',
    },
    buildAeoCheckerBreadcrumbJsonLd(),
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: AEO_CHECKER_FAQS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return { '@context': 'https://schema.org', '@graph': graph }
}
