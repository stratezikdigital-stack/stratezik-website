import type { FC } from 'react'

type ArticleLoader = () => Promise<{ default: FC }>

/** Article chunks — kept separate from metadata so SEO routes never preload markdown bodies. */
const postLoaders: Record<string, ArticleLoader> = {
  'old-seo-to-agent-ready-seo-2026': () => import('./OldSeoToAgentReadyArticle'),
  'ai-native-gtm-build-from-day-1': () => import('./AiNativeGtmPart1Article'),
  'ai-native-gtm-cited-by-chatgpt': () => import('./AiNativeGtmPart2Article'),
  'ai-native-gtm-agent-stack-by-stage': () => import('./AiNativeGtmPart3Article'),
  'ai-native-gtm-marketing-hire-2026': () => import('./AiNativeGtmPart4Article'),
  'when-hire-digital-marketing-agency-scarborough-gta': () => import('./ScarboroughAgencyTriggersArticle'),
  'signs-time-digital-marketing-agency-gta': () => import('./GtaAgencyTriggersScenariosArticle'),
  'get-found-2026-brand-positioning': () => import('./GetFound2026Part1BrandArticle'),
  'get-found-2026-seo-organic-search': () => import('./GetFound2026Part2SeoArticle'),
  'get-found-2026-ai-search-visibility': () => import('./GetFound2026Part3AiArticle'),
  'get-found-2026-content-strategy': () => import('./GetFound2026Part4ContentArticle'),
  'get-found-2026-paid-performance': () => import('./GetFound2026Part5PaidArticle'),
  'get-recommended-by-chatgpt-playbook': () => import('./GetRecommendedByChatGPTPlaybookArticle'),
  'chatgpt-ads-toronto-industries': () => import('./ChatGPTAdsTorontoIndustriesArticle'),
  'chatgpt-ads-2026-guide': () => import('./ChatGPTAdsGuideArticle'),
  'google-maps-ranking-service-business': () => import('./GoogleMapsRankingServiceBusinessArticle'),
  'insectica-gta-pest-control-scaling-case-study': () => import('./InsecticaCaseStudyArticle'),
  'answer-engine-optimisation-toronto': () => import('./AnswerEngineTorontoArticle'),
}

export function getPostLoader(slug: string): ArticleLoader | undefined {
  return postLoaders[slug]
}
