/**
 * Central outbound links reused in footer, contact ledger, and JSON-LD `sameAs`.
 *
 * GBP share link matches Stratezik Digital Inc. on Google Business / Maps,
 * mirrored from structured data (`sameAs` in index.html).
 */
export const GOOGLE_BUSINESS_PROFILE_URL = 'https://share.google/VEBDLnS7ZRK7cxRV9'

export const LINKEDIN_COMPANY_URL = 'https://www.linkedin.com/company/stratezik/'

export const X_PROFILE_URL = 'https://x.com/stratezik'

export const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/stratezik-digital'

export const CRUNCHBASE_ORG_URL =
  'https://www.crunchbase.com/organization/stratezik-digital-inc-dec8'

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@stratezik-digital'

export const INSTAGRAM_URL = 'https://www.instagram.com/stratezikdigital/'

export const TIKTOK_URL = 'https://www.tiktok.com/@stratezik.digital'

export const REDDIT_USER_URL = 'https://www.reddit.com/user/Stratezik/'

export type SocialProfile = {
  id: string
  label: string
  href: string
}

/** Owned social profiles — order matches footer icon row. */
export const SOCIAL_PROFILES: SocialProfile[] = [
  { id: 'linkedin', label: 'Stratezik on LinkedIn', href: LINKEDIN_COMPANY_URL },
  { id: 'x', label: 'Stratezik on X', href: X_PROFILE_URL },
  { id: 'clutch', label: 'Stratezik on Clutch', href: CLUTCH_PROFILE_URL },
  { id: 'crunchbase', label: 'Stratezik on Crunchbase', href: CRUNCHBASE_ORG_URL },
  { id: 'youtube', label: 'Stratezik on YouTube', href: YOUTUBE_CHANNEL_URL },
  { id: 'instagram', label: 'Stratezik on Instagram', href: INSTAGRAM_URL },
  { id: 'tiktok', label: 'Stratezik on TikTok', href: TIKTOK_URL },
  { id: 'reddit', label: 'Stratezik on Reddit', href: REDDIT_USER_URL },
  { id: 'gbp', label: 'Stratezik on Google Business Profile', href: GOOGLE_BUSINESS_PROFILE_URL },
]
