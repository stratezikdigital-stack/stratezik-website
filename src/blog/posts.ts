import type { BlogPostDefinition } from './postTypes'
import AnswerEngineTorontoArticle from './AnswerEngineTorontoArticle'
import InsecticaCaseStudyArticle from './InsecticaCaseStudyArticle'
import { answerEngineTorontoFaq, insecticaCaseStudyFaq } from './postFaqs'

export const blogPosts: BlogPostDefinition[] = [
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
