/** ChatGPT ad-presence scan — toronto-chatgpt-ad-presence.csv (July 2026 edition). */

export const CHATGPT_AD_PRESENCE_BY_CATEGORY: { category: string; liveAds: string }[] = [
  { category: 'Dental', liveAds: '0 of 5' },
  { category: 'Personal injury law', liveAds: '1 of 5' },
  { category: 'Accounting', liveAds: '0 of 5' },
  { category: 'Pest control', liveAds: '0 of 5' },
  { category: 'Plumbing', liveAds: '0 of 5' },
  { category: 'General contracting', liveAds: '1 of 5' },
  { category: 'Restaurants', liveAds: '0 of 5' },
  { category: 'Wellness clinics', liveAds: '0 of 5' },
  { category: 'Medical clinics', liveAds: '0 of 5' },
  { category: 'Home services', liveAds: '0 of 5' },
]

export const CHATGPT_LIVE_AD_ROWS: { query: string; advertiser: string; mismatch: string }[] = [
  {
    query: 'Best personal injury lawyer in Toronto',
    advertiser: 'Bergeron Clifford Injury Lawyers',
    mismatch: 'Geo mismatch (Ottawa, not Toronto/GTA)',
  },
  {
    query: 'Bathroom renovation Scarborough budget',
    advertiser: 'EcoTech Windows & Doors',
    mismatch: 'Category mismatch (windows/doors, not bathroom reno)',
  },
]

/** July 3 only — did not reproduce on July 5 re-check. */
export const CHATGPT_HISTORICAL_AD_SIGHTING = {
  query: 'Sedation dentistry (dental_q5)',
  advertiser: '123Dentist Inc.',
  note: 'Sponsored card on July 3; organic answer only on July 5 re-check',
}
