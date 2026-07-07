/** ChatGPT ad competitiveness map — toronto-chatgpt-ads-competitiveness.csv (June 19 logged-in study). */

export type ChatgptAdPlay = 'Own it' | 'Compete' | 'Defend'

export type ChatgptAdCompetitivenessRow = {
  industry: string
  adsRun: boolean
  competition: string
  competitionPct: number
  changeSinceLastReading: string
  adRelevance: string
  opportunity: string
  cpcCpm: string
  play: ChatgptAdPlay
}

export const CHATGPT_AD_MAP_CAPTION =
  'June 2026 reading, the first in the series. The change column is Baseline this month because there is nothing before it to compare; from the next reading it shows the move since the prior month. The full standing version lives in the Toronto ChatGPT Ads Index.'

export const CHATGPT_AD_MAP_FOOTNOTE =
  'CPC and CPM are third-party market estimates; OpenAI does not publish rates, so treat them as directional. Tiers are from the Stratezik logged-in ChatGPT ad study, 90 buyer questions across 18 industries, June 19, 2026.'

export const CHATGPT_AD_COMPETITIVENESS_ROWS: ChatgptAdCompetitivenessRow[] = [
  { industry: 'Fitness & gyms', adsRun: false, competition: 'None (0%)', competitionPct: 0, changeSinceLastReading: 'Baseline', adRelevance: 'n/a', opportunity: 'High', cpcCpm: 'No bids yet (~$3 floor)', play: 'Own it' },
  { industry: 'Pest control', adsRun: false, competition: 'None (0%)', competitionPct: 0, changeSinceLastReading: 'Baseline', adRelevance: 'n/a', opportunity: 'High', cpcCpm: 'No bids yet (~$3 floor)', play: 'Own it' },
  { industry: 'Electrical', adsRun: false, competition: 'None (0%)', competitionPct: 0, changeSinceLastReading: 'Baseline', adRelevance: 'n/a', opportunity: 'High', cpcCpm: 'No bids yet (~$3 floor)', play: 'Own it' },
  { industry: 'Dental', adsRun: true, competition: 'Low (20%)', competitionPct: 20, changeSinceLastReading: 'Baseline', adRelevance: 'Relevant', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Optometry', adsRun: true, competition: 'Low (20%)', competitionPct: 20, changeSinceLastReading: 'Baseline', adRelevance: 'Mismatched', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Auto repair', adsRun: true, competition: 'Low (20%)', competitionPct: 20, changeSinceLastReading: 'Baseline', adRelevance: 'Loose', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Moving', adsRun: true, competition: 'Low (20%)', competitionPct: 20, changeSinceLastReading: 'Baseline', adRelevance: 'Mismatched', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Beauty & personal care', adsRun: true, competition: 'Medium (40%)', competitionPct: 40, changeSinceLastReading: 'Baseline', adRelevance: 'Loose / mismatched', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Veterinary', adsRun: true, competition: 'Medium (40%)', competitionPct: 40, changeSinceLastReading: 'Baseline', adRelevance: 'Loose', opportunity: 'High', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Online education', adsRun: true, competition: 'High (80%)', competitionPct: 80, changeSinceLastReading: 'Baseline', adRelevance: 'Mostly non-endemic', opportunity: 'High (relevance gap)', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'Professional / legal', adsRun: true, competition: 'High (60%)', competitionPct: 60, changeSinceLastReading: 'Baseline', adRelevance: 'Mostly non-endemic', opportunity: 'High (relevance gap)', cpcCpm: '$3-5 / $25-60', play: 'Own it' },
  { industry: 'E-commerce / DTC', adsRun: true, competition: 'High (60%)', competitionPct: 60, changeSinceLastReading: 'Baseline', adRelevance: 'Mixed', opportunity: 'Medium', cpcCpm: '$2.50-5 / $25-60', play: 'Compete' },
  { industry: 'Local / home services', adsRun: true, competition: 'High (60%)', competitionPct: 60, changeSinceLastReading: 'Baseline', adRelevance: 'Loose (lead-gen)', opportunity: 'Medium', cpcCpm: '$3-5 / $25-60', play: 'Compete' },
  { industry: 'HVAC', adsRun: true, competition: 'High (60%)', competitionPct: 60, changeSinceLastReading: 'Baseline', adRelevance: 'Relevant (1 buyer)', opportunity: 'Medium', cpcCpm: '$3-5 / $25-60', play: 'Compete' },
  { industry: 'Real estate agents', adsRun: true, competition: 'High (80%)', competitionPct: 80, changeSinceLastReading: 'Baseline', adRelevance: 'Loose (insurers)', opportunity: 'Medium', cpcCpm: '$3-5 / $25-60', play: 'Compete' },
  { industry: 'B2B SaaS', adsRun: true, competition: 'Saturated (100%)', competitionPct: 100, changeSinceLastReading: 'Baseline', adRelevance: 'Relevant', opportunity: 'Low', cpcCpm: '$8-18 / $25-60', play: 'Defend' },
  { industry: 'Finance & insurance', adsRun: true, competition: 'Saturated (100%)', competitionPct: 100, changeSinceLastReading: 'Baseline', adRelevance: 'Relevant', opportunity: 'Low', cpcCpm: '$8-18 / $25-60', play: 'Defend' },
  { industry: 'Travel & hospitality', adsRun: true, competition: 'Saturated (100%)', competitionPct: 100, changeSinceLastReading: 'Baseline', adRelevance: 'Relevant', opportunity: 'Low', cpcCpm: '$3-5 / $25-60', play: 'Defend' },
]
