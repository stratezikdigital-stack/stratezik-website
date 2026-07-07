import type { BlogPostMeta } from './postTypes'
import { buildArticleWithFaqJsonLd } from './buildArticleJsonLd'
import { organizationNode } from '../seo/organization'
import { SITE_ORIGIN } from '../seo/siteConfig'
import { TORONTO_AI_CITATION_TRACKER_HUB_SLUG } from './torontoAiCitationTrackerSeries'

const INDEX_URL = `${SITE_ORIGIN}/blog/toronto-chatgpt-ads-index`
const TRACKER_HUB_URL = `${SITE_ORIGIN}/blog/${TORONTO_AI_CITATION_TRACKER_HUB_SLUG}`

function datasetNode(datePublished: string, dateModified: string) {
  return {
    '@type': 'Dataset',
    '@id': `${INDEX_URL}#dataset`,
    name: 'Toronto ChatGPT Ads Index — industry competitiveness map',
    description:
      'Month-over-month measure of ChatGPT ad presence, advertiser relevance, and competitiveness across 18 Toronto buyer industries. June 2026 baseline: 90 logged-in commercial questions (48% ad rate). July 2026 spot check: two questions per industry.',
    url: INDEX_URL,
    creator: organizationNode,
    datePublished,
    dateModified,
    temporalCoverage: '2026-06/2026-07',
    variableMeasured: [
      'Share of buyer questions with a labelled ChatGPT ad',
      'Advertiser relevance to the query',
      'Competitiveness tier by industry',
    ],
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    distribution: {
      '@type': 'DataDownload',
      contentUrl: INDEX_URL,
      encodingFormat: 'text/html',
    },
  }
}

function speakableNode() {
  return {
    '@type': 'WebPage',
    '@id': `${INDEX_URL}#webpage`,
    url: INDEX_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-ads-index-summary', '.speakable-ads-index-map'],
    },
  }
}

/** Living index — Article + Dataset + FAQ + Speakable, cross-linked to citation tracker hub. */
export function buildTorontoChatgptAdsIndexJsonLd(
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
      name: 'ChatGPT advertising in Toronto by industry',
    }
    ;(article as Record<string, unknown>).isRelatedTo = {
      '@type': 'CollectionPage',
      '@id': `${TRACKER_HUB_URL}#collection`,
      name: 'Toronto AI Citation Tracker',
      url: TRACKER_HUB_URL,
    }
  }

  return base
}
