import type { BlogPostMeta } from './postTypes'
import {
  TORONTO_AI_CITATION_TRACKER_EDITIONS,
  TORONTO_AI_CITATION_TRACKER_HUB_SLUG,
  TORONTO_AI_CITATION_TRACKER_TITLE,
  getCurrentTorontoAiCitationTrackerEdition,
} from './torontoAiCitationTrackerSeries'
import { buildArticleWithFaqJsonLd } from './buildArticleJsonLd'
import { getBlogShareImagePath } from './blogShareImages'
import { buildBlogPostBreadcrumbJsonLd } from '../seo/buildBreadcrumbJsonLd'
import { organizationNode } from '../seo/organization'
import { SITE_ORIGIN } from '../seo/siteConfig'

const HUB_URL = `${SITE_ORIGIN}/blog/${TORONTO_AI_CITATION_TRACKER_HUB_SLUG}`

function datasetNode(editionSlug: string, datePublished: string) {
  const editionUrl = `${SITE_ORIGIN}/blog/${editionSlug}`
  return {
    '@type': 'Dataset',
    '@id': `${editionUrl}#dataset`,
    name: 'Stratezik Toronto AI Citation Tracker — July 2026 baseline',
    description:
      '200 data points from 50 frozen high-intent Toronto and GTA buyer questions across 10 categories, run through ChatGPT, Perplexity, Google AI Mode, and Claude on July 3, 2026.',
    url: editionUrl,
    creator: organizationNode,
    variableMeasured: 'Share of AI answers naming a specific Toronto or GTA business',
    datePublished,
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    distribution: {
      '@type': 'DataDownload',
      contentUrl: editionUrl,
      encodingFormat: 'text/html',
    },
  }
}

function speakableNode(pageUrl: string) {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-tracker-summary', '.speakable-tracker-finding-1'],
    },
  }
}

/** July 2026 edition — Article + Dataset + FAQ + Speakable. */
export function buildTorontoAiCitationTrackerJulyJsonLd(
  meta: BlogPostMeta,
  faqMainEntity: { question: string; answer: string }[],
) {
  const base = buildArticleWithFaqJsonLd(meta, faqMainEntity) as {
    '@context': string
    '@graph': Record<string, unknown>[]
  }
  const url = `${SITE_ORIGIN}/blog/${meta.slug}`

  base['@graph'].push(datasetNode(meta.slug, meta.datePublished))
  base['@graph'].push(speakableNode(url))

  const article = base['@graph'].find((n) => n['@type'] === 'Article')
  if (article && typeof article === 'object') {
    ;(article as Record<string, unknown>).isPartOf = {
      '@type': 'CollectionPage',
      '@id': `${HUB_URL}#collection`,
      name: TORONTO_AI_CITATION_TRACKER_TITLE,
      url: HUB_URL,
    }
  }

  return base
}

/** Canonical hub — CollectionPage pointing at editions. */
export function buildTorontoAiCitationTrackerHubJsonLd(meta: BlogPostMeta) {
  const current = getCurrentTorontoAiCitationTrackerEdition()
  const sharePath = meta.shareImagePath ?? getBlogShareImagePath(meta.slug)
  const breadcrumb = buildBlogPostBreadcrumbJsonLd(meta.slug, meta.title)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${HUB_URL}#collection`,
        url: HUB_URL,
        name: meta.title,
        description: meta.description,
        inLanguage: 'en-CA',
        publisher: organizationNode,
        image: [`${SITE_ORIGIN}${sharePath}`],
        hasPart: TORONTO_AI_CITATION_TRACKER_EDITIONS.map((edition) => ({
          '@type': 'Article',
          '@id': `${SITE_ORIGIN}/blog/${edition.slug}#article`,
          url: `${SITE_ORIGIN}/blog/${edition.slug}`,
          name: `Toronto AI Citation Tracker: ${edition.monthLabel}`,
          datePublished: edition.datePublished,
        })),
      },
      speakableNode(HUB_URL),
      breadcrumb,
      datasetNode(current.slug, current.datePublished),
    ],
  }
}
