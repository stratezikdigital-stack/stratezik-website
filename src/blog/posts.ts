import type { BlogPostDefinition } from './postTypes'
import AnswerEngineTorontoArticle from './AnswerEngineTorontoArticle'
import ChatGPTAdsGuideArticle from './ChatGPTAdsGuideArticle'
import GoogleMapsRankingServiceBusinessArticle from './GoogleMapsRankingServiceBusinessArticle'
import InsecticaCaseStudyArticle from './InsecticaCaseStudyArticle'
import {
  answerEngineTorontoFaq,
  chatgptAdsGuideFaq,
  googleMapsRankingServiceBusinessFaq,
  insecticaCaseStudyFaq,
} from './postFaqs'

export const blogPosts: BlogPostDefinition[] = [
  {
    slug: 'chatgpt-ads-2026-guide',
    title: 'ChatGPT Ads in 2026: Setup, Costs, and When to Skip It',
    description:
      'How OpenAI Ads Manager Beta places sponsored recommendations in ChatGPT, what context hints replace keywords, reported pricing bands, geography, category gates, and honest fit notes for Toronto operators.',
    datePublished: '2026-05-11',
    dateModified: '2026-05-11',
    keywords: [
      'ChatGPT Ads',
      'Ads Manager Beta OpenAI',
      'context hints advertising',
      'ChatGPT CPC ads',
      'Canada ChatGPT advertising',
      'Toronto digital marketing ChatGPT',
      'Stratezik paid media',
    ],
    shareImagePath: '/branding/stratezik-horizontal.png',
    faqEntities: chatgptAdsGuideFaq,
    Component: ChatGPTAdsGuideArticle,
  },
  {
    slug: 'google-maps-ranking-service-business',
    title: 'Why Service Businesses Lose on Google Maps',
    description:
      'Whitespark 2026 local ranking factors put GBP primary category ahead of reviews for Maps pack influence. What Ontario service operators should fix first: categories, hours, and per-service site depth.',
    datePublished: '2026-05-07',
    dateModified: '2026-05-07',
    keywords: [
      'Google Maps ranking service business',
      'Google Business Profile primary category',
      'Ontario local SEO',
      'local pack ranking factors 2026',
      'GBP audit Ontario',
      'Stratezik local search',
    ],
    shareImagePath: '/branding/stratezik-horizontal.png',
    faqEntities: googleMapsRankingServiceBusinessFaq,
    Component: GoogleMapsRankingServiceBusinessArticle,
  },
  {
    slug: 'insectica-gta-pest-control-scaling-case-study',
    title: 'How We Scaled a Toronto Pest Control Company: The Insectica Story (700+ Leads, Full Breakdown)',
    description:
      'Month-by-month narrative of Insectica Pest Control’s GTA growth: ten ad groups, CPA-first bidding, 700+ paid conversions at ~$43 CPL, organic impressions up 168x, plus charts and infographic.',
    datePublished: '2026-05-02',
    dateModified: '2026-05-03',
    keywords: [
      'Insectica Pest Control case study',
      'Toronto pest control marketing',
      'Google Ads pest control CPL',
      'GTA local lead generation',
      'organic growth Search Console',
      'Stratezik case study',
    ],
    shareImagePath: '/branding/blog-og-insectica-case-study.png',
    faqEntities: insecticaCaseStudyFaq,
    Component: InsecticaCaseStudyArticle,
  },
  {
    slug: 'answer-engine-optimisation-toronto',
    title: 'Answer Engine Optimisation for Toronto Businesses',
    description:
      "Most websites cited in Google's AI-generated answers don't rank in the organic top 10 for that query. What answer engine optimisation means for Toronto businesses.",
    datePublished: '2026-05-01',
    dateModified: '2026-05-03',
    keywords: [
      'answer engine optimisation Toronto',
      'AI search Toronto',
      'Google AI Overviews local business',
      'AEO vs SEO Toronto',
      'ChatGPT local recommendations',
      'Perplexity search',
    ],
    shareImagePath: '/branding/stratezik-horizontal.png',
    faqEntities: answerEngineTorontoFaq,
    Component: AnswerEngineTorontoArticle,
  },
]

export function getPostBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return blogPosts.find((p) => p.slug === slug)
}
