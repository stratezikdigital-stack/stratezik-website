import type { BlogPostMeta } from './postTypes'
import { buildArticleWithFaqJsonLd } from './buildArticleJsonLd'
import { organizationNode } from '../seo/organization'
import { SITE_ORIGIN } from '../seo/siteConfig'
import { TORONTO_AI_CITATION_TRACKER_HUB_SLUG } from './torontoAiCitationTrackerSeries'

const REPORT_URL = `${SITE_ORIGIN}/blog/toronto-startup-website-audit-2026`
const TRACKER_HUB_URL = `${SITE_ORIGIN}/blog/${TORONTO_AI_CITATION_TRACKER_HUB_SLUG}`
const AEO_CHECKER_URL = `${SITE_ORIGIN}/aeo-checker`

function datasetNode(datePublished: string, dateModified: string) {
  return {
    '@type': 'Dataset',
    '@id': `${REPORT_URL}#dataset`,
    name: 'Toronto Startup Website Audit 2026 — composite and AEO scores',
    description:
      'Machine-verified audit of 50 funded Toronto/GTA startup websites across positioning, AEO readiness (20-point test), content, trust, and paid media. Median composite 59/100; median AEO 10.75/20. Collected May–June 2026.',
    url: REPORT_URL,
    creator: organizationNode,
    datePublished,
    dateModified,
    temporalCoverage: '2026-05/2026-06',
    spatialCoverage: { '@type': 'Place', name: 'Greater Toronto Area, Ontario, Canada' },
    variableMeasured: [
      'Composite marketing health score (0–100)',
      'AEO readiness score (0–20)',
      'Positioning clarity (0–10)',
      'Content and founder-led signal (0–10)',
      'Trust and authority signals (0–10)',
    ],
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    distribution: [
      {
        '@type': 'DataDownload',
        contentUrl: REPORT_URL,
        encodingFormat: 'text/html',
      },
      {
        '@type': 'DataDownload',
        contentUrl: `${REPORT_URL}#raw-findings-download`,
        encodingFormat: 'application/pdf',
        name: 'Raw pattern-analysis findings appendix (PDF)',
      },
    ],
  }
}

function speakableNode() {
  return {
    '@type': 'WebPage',
    '@id': `${REPORT_URL}#webpage`,
    url: REPORT_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-audit-summary', '.speakable-audit-finding-1', '.speakable-audit-chart'],
    },
  }
}

/** Flagship audit — Article + Dataset + FAQ + Speakable, linked to citation tracker hub and AEO checker. */
export function buildTorontoStartupWebsiteAudit2026JsonLd(
  meta: BlogPostMeta,
  faqMainEntity: { question: string; answer: string }[],
) {
  const base = buildArticleWithFaqJsonLd(meta, faqMainEntity) as {
    '@context': string
    '@graph': Record<string, unknown>[]
  }

  base['@graph'].push(datasetNode(meta.datePublished, meta.dateModified))
  base['@graph'].push(speakableNode())

  const article = base['@graph'].find((n) => n['@type'] === 'Article')
  if (article && typeof article === 'object') {
    ;(article as Record<string, unknown>).about = {
      '@type': 'Thing',
      name: 'Toronto startup marketing and AEO readiness',
    }
    ;(article as Record<string, unknown>).isRelatedTo = [
      {
        '@type': 'CollectionPage',
        '@id': `${TRACKER_HUB_URL}#collection`,
        name: 'Toronto AI Citation Tracker',
        url: TRACKER_HUB_URL,
      },
      {
        '@type': 'WebApplication',
        '@id': `${AEO_CHECKER_URL}#app`,
        name: 'Stratezik Free AEO Checker',
        url: AEO_CHECKER_URL,
      },
    ]
  }

  return base
}
