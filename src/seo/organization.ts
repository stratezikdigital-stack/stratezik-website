import { SITE_ORIGIN } from './siteConfig'
import {
  CLUTCH_PROFILE_URL,
  CRUNCHBASE_ORG_URL,
  GOOGLE_BUSINESS_PROFILE_URL,
  INSTAGRAM_URL,
  LINKEDIN_COMPANY_URL,
  REDDIT_USER_URL,
  TIKTOK_URL,
  YOUTUBE_CHANNEL_URL,
} from '../constants/externalLinks'

export const ORG_SAME_AS = [
  `${SITE_ORIGIN}/blog`,
  LINKEDIN_COMPANY_URL,
  CLUTCH_PROFILE_URL,
  CRUNCHBASE_ORG_URL,
  YOUTUBE_CHANNEL_URL,
  INSTAGRAM_URL,
  TIKTOK_URL,
  REDDIT_USER_URL,
  GOOGLE_BUSINESS_PROFILE_URL,
]

export const ORG_KNOWS_ABOUT = [
  'https://en.wikipedia.org/wiki/Search_engine_optimization',
  'https://en.wikipedia.org/wiki/Pay-per-click',
  'https://en.wikipedia.org/wiki/Digital_marketing',
  'https://en.wikipedia.org/wiki/Social_media_marketing',
  'https://en.wikipedia.org/wiki/Local_search_(Internet)',
  'https://en.wikipedia.org/wiki/Conversion_rate_optimization',
  'https://en.wikipedia.org/wiki/Web_analytics',
]

/** Shared publisher/organization node for Article and Blog JSON-LD. */
export const organizationNode = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: 'Stratezik',
  alternateName: 'Stratezik Digital Marketing',
  url: SITE_ORIGIN,
  foundingDate: '2026',
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_ORIGIN}/branding/stratezik-vertical.png`,
  },
  sameAs: ORG_SAME_AS,
  knowsAbout: ORG_KNOWS_ABOUT,
}
