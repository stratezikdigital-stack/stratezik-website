import type { BlogPostMeta } from './postTypes'
import {
  answerEngineTorontoFaq,
  chatgptAdsGuideFaq,
  chatgptAdsTorontoIndustriesFaq,
  getRecommendedByChatgptTorontoFaq,
  chatgptRecommendationPlaybookFaq,
  scarboroughAgencyTriggersFaq,
  gtaAgencyTriggersScenariosFaq,
  getFound2026Part1BrandFaq,
  getFound2026Part2SeoFaq,
  getFound2026Part3AiFaq,
  getFound2026Part4ContentFaq,
  getFound2026Part5PaidFaq,
  googleMapsRankingServiceBusinessFaq,
  insecticaCaseStudyFaq,
  aiNativeGtmPart1Faq,
  aiNativeGtmPart2Faq,
  aiNativeGtmPart3Faq,
  aiNativeGtmPart4Faq,
  oldSeoToAgentReadyFaq,
} from './postFaqs'

export type BlogPostMetaEntry = BlogPostMeta & { faqEntities?: { question: string; answer: string }[] }

export const blogPostsMeta: BlogPostMetaEntry[] = [
  {
    slug: 'old-seo-to-agent-ready-seo-2026',
    title: 'The Shift From Old SEO to Agent-Ready SEO in 2026',
    description:
      'How Toronto teams move from keyword-era SEO to agent-ready content: answer-first pages, provenance, structured data, and citations that survive AI summaries.',
    datePublished: '2026-06-08',
    dateModified: '2026-06-17',
    keywords: [
      'agent-ready SEO',
      'old SEO vs new SEO 2026',
      'answer engine optimisation',
      'AI citations SEO',
      'Toronto SEO AEO',
      'topical authority SEO',
      'structured data SEO 2026',
    ],
    faqEntities: oldSeoToAgentReadyFaq,
  },
  {
    slug: 'ai-native-gtm-build-from-day-1',
    title: 'AI-Native GTM Part 1: Build the Function From Day 1',
    description:
      'Part 1 of our AI-native GTM series for Toronto founders: design a marketing function around agents from day one and out-run US-funded rivals.',
    datePublished: '2026-06-03',
    dateModified: '2026-06-17',
    keywords: [
      'AI-native GTM startup',
      'Toronto startup marketing',
      'startup GTM 2026',
      'marketing function design',
      'AI agents marketing',
      'Toronto founder GTM',
      'Stratezik AI agents',
    ],
    faqEntities: aiNativeGtmPart1Faq,
  },
  {
    slug: 'ai-native-gtm-cited-by-chatgpt',
    title: 'AI-Native GTM Part 2: Be Cited by ChatGPT First',
    description:
      'Part 2 of the AI-native GTM series: why Toronto startups should claim AI search visibility now, before US-funded competitors do. Five practical moves.',
    datePublished: '2026-06-01',
    dateModified: '2026-06-17',
    keywords: [
      'AEO for startups',
      'ChatGPT visibility startup',
      'AI search startup',
      'Toronto startup AEO',
      'answer engine optimisation startup',
      'AI-native GTM',
      'Stratezik Toronto founders',
    ],
    faqEntities: aiNativeGtmPart2Faq,
  },
  {
    slug: 'ai-native-gtm-agent-stack-by-stage',
    title: 'AI-Native GTM Part 3: The Agent Stack by Funding Stage',
    description:
      'Part 3 of the AI-native GTM series: which AI tools and agents to build or buy at each funding stage, pre-seed through Series A. No vendor pitch.',
    datePublished: '2026-06-01',
    dateModified: '2026-06-17',
    keywords: [
      'AI marketing stack startup',
      'startup AI tools',
      'agent stack',
      'Toronto startup tooling',
      'AI tools by funding stage',
      'AI-native GTM',
      'Stratezik Toronto founders',
    ],
    faqEntities: aiNativeGtmPart3Faq,
  },
  {
    slug: 'ai-native-gtm-marketing-hire-2026',
    title: 'AI-Native GTM Part 4: The 2026 Marketing Hire',
    description:
      'Part 4 of the AI-native GTM series: what your 2026 marketing hire should look like, how to test AI fluency, and the three hires to avoid.',
    datePublished: '2026-06-08',
    dateModified: '2026-06-17',
    keywords: [
      'startup marketing hire 2026',
      'fractional CMO Toronto',
      'AI marketing hire',
      'first marketing hire startup',
      'head of growth hire',
      'AI-native GTM',
      'Stratezik Toronto founders',
    ],
    faqEntities: aiNativeGtmPart4Faq,
  },
  {
    slug: 'when-hire-digital-marketing-agency-scarborough-gta',
    title: 'When GTA SMBs Decide It Is Time for a Digital Marketing Agency',
    description:
      'Ten real triggers Scarborough and Toronto SMBs hit before hiring an agency: flat conversions, rising ad waste, Maps gaps, launches, expansion, reviews, bandwidth limits, and seasonal urgency, plus Stratezik audit steps and an RFP checklist.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'digital marketing agency Scarborough',
      'Toronto GTA SMB marketing',
      'when to hire marketing agency',
      'Google Ads agency Toronto',
      'local SEO Scarborough',
      'Ontario small business marketing',
      'Stratezik digital marketing',
    ],
    faqEntities: scarboroughAgencyTriggersFaq,
  },
  {
    slug: 'signs-time-digital-marketing-agency-gta',
    title: '10 Signs It Is Time to Partner With a Digital Marketing Agency (GTA SMB Scenarios)',
    description:
      'Part 2 of our GTA agency guide: ten triggers shown as real Scarborough, Toronto, and Ontario neighbourhood scenarios, from no-time owners and leaking ad spend to weak local search, stalled growth, and post-pivot resets, with the first moves Stratezik makes.',
    datePublished: '2026-05-30',
    dateModified: '2026-06-17',
    keywords: [
      'signs to hire digital marketing agency',
      'Scarborough small business marketing',
      'Toronto GTA SMB digital marketing',
      'when to outsource marketing Ontario',
      'local SEO Scarborough',
      'GTA marketing agency',
      'Stratezik Digital',
    ],
    faqEntities: gtaAgencyTriggersScenariosFaq,
  },
  {
    slug: 'get-found-2026-brand-positioning',
    title: 'How Businesses Get Found and Grow in 2026, Part 1: Brand and Positioning',
    description:
      'Positioning before tactics: differentiation that survives the competitor test, voice and visual identity, reputation systems, and trust signals that make SEO, AI, content, and paid work harder together.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'brand positioning small business 2026',
      'differentiation local business',
      'reputation management SEO AI',
      'founder brand voice',
      'Stratezik Get Found 2026',
      'Toronto marketing foundation',
    ],
    faqEntities: getFound2026Part1BrandFaq,
  },
  {
    slug: 'get-found-2026-seo-organic-search',
    title: 'How Businesses Get Found and Grow in 2026, Part 2: SEO and Organic Search',
    description:
      'Keyword fanout, answer-first on-page work, technical plumbing, backlink authority, and indexing gates. Why organic search remains the bedrock AI visibility builds on, not a rival to it.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'SEO organic search 2026',
      'keyword fanout local business',
      'technical SEO AI crawlers',
      'local backlink authority',
      'indexing audit',
      'Stratezik Get Found 2026',
    ],
    faqEntities: getFound2026Part2SeoFaq,
  },
  {
    slug: 'get-found-2026-ai-search-visibility',
    title: 'How Businesses Get Found and Grow in 2026, Part 3: AI Search Visibility',
    description:
      'AEO and GEO citations, conversational fanout, schema and crawler access, share-of-voice audits, and how ChatGPT, Perplexity, and Gemini differ. Built on Part 2 SEO authority.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'answer engine optimisation 2026',
      'AI search visibility local business',
      'ChatGPT Perplexity Gemini citations',
      'SOCi AI local visibility',
      'OppAlerts LLM factors',
      'structured data crawler audit',
      'Stratezik Get Found 2026',
    ],
    faqEntities: getFound2026Part3AiFaq,
  },
  {
    slug: 'get-found-2026-content-strategy',
    title: 'How Businesses Get Found and Grow in 2026, Part 4: Content Strategy',
    description:
      'Founder-led storytelling, educational guides, ethical lead magnets, short-form video transcripts, repurposing ladders, plus how Part 4 locks to brand, SEO, and AI layers before paid acceleration.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'founder-led content strategy',
      'local business repurposing playbook',
      'AI-friendly educational guides',
      'lead magnets service business',
      'video transcripts SEO AI',
      'Stratezik Get Found 2026',
    ],
    faqEntities: getFound2026Part4ContentFaq,
  },
  {
    slug: 'get-found-2026-paid-performance',
    title: 'How Businesses Get Found and Grow in 2026, Part 5: Paid and Performance',
    description:
      'Why order matters inside the pillar, paid versus organic interplay, disciplined Google Ads, retargeting with Part 4 assets, CAC and ROAS guardrails, funnel honesty, plus Insectica proof and services alignment.',
    datePublished: '2026-05-25',
    dateModified: '2026-06-17',
    keywords: [
      'paid social local business 2026',
      'Google Ads retargeting strategy',
      'CAC ROAS LTV playbook',
      'marketing attribution pragmatic',
      'Stratezik Get Found 2026',
      'Toronto performance marketing',
    ],
    faqEntities: getFound2026Part5PaidFaq,
  },
  {
    slug: 'get-recommended-by-chatgpt-toronto',
    title: 'How to Get Your Toronto Business Recommended by ChatGPT (90 Buying Questions Tested)',
    description:
      'We tested 90 Toronto buying questions across ChatGPT and Claude. AI names local businesses often, but engine agreement is low. The practical playbook to become recommendable across both.',
    datePublished: '2026-06-27',
    dateModified: '2026-06-27',
    authorSlug: 'shah-md-rifat',
    keywords: [
      'get recommended by ChatGPT',
      'how to show up in ChatGPT',
      'AI search local business Toronto',
      'answer engine optimisation Toronto',
      'get my business recommended by AI',
      'ChatGPT local recommendations',
      'Toronto AEO playbook',
    ],
    faqEntities: getRecommendedByChatgptTorontoFaq,
  },
  {
    slug: 'get-recommended-by-chatgpt-playbook',
    title: 'How to Get Your Business Recommended by ChatGPT (2026 Playbook)',
    description:
      'SOCi visibility stats, citation research, OppAlerts correlations, schema + answer-first tactics, crawler checks, GTA measurement habits, plus honest limits on controlling generative mentions.',
    datePublished: '2026-05-11',
    dateModified: '2026-06-17',
    keywords: [
      'ChatGPT recommend business',
      'answer engine optimisation playbook',
      'LocalBusiness schema ChatGPT',
      'SOCi AI local visibility 2026',
      'Perplexity ChatGPT citations',
      'Toronto AEO playbook',
      'Stratezik generative visibility',
    ],
    faqEntities: chatgptRecommendationPlaybookFaq,
  },
  {
    slug: 'chatgpt-ads-toronto-industries',
    title:
      'ChatGPT Is Already Running Ads in Toronto. We Checked 90 Local Buying Questions to See Who\'s Buying Them.',
    description:
      'We ran 90 Toronto buying questions through ChatGPT. Ads already show on 48%, from 33 advertisers, but only one was a local business. Industry map, opportunity tiers, and what to do first.',
    datePublished: '2026-06-19',
    dateModified: '2026-06-19',
    authorSlug: 'shah-md-rifat',
    layout: 'research',
    keywords: [
      'ChatGPT ads Toronto',
      'ChatGPT advertising Canada',
      'ChatGPT ads for small business',
      'AI search advertising Toronto',
      'should my business advertise on ChatGPT',
      'Toronto digital marketing ChatGPT',
      'GTA paid media AI',
    ],
    faqEntities: chatgptAdsTorontoIndustriesFaq,
  },
  {
    slug: 'chatgpt-ads-2026-guide',
    title: 'ChatGPT Ads in 2026: Setup, Costs, and When to Skip It',
    description:
      'How OpenAI Ads Manager Beta places sponsored recommendations in ChatGPT, what context hints replace keywords, reported pricing bands, geography, category gates, and honest fit notes for Toronto operators.',
    datePublished: '2026-05-11',
    dateModified: '2026-06-17',
    keywords: [
      'ChatGPT Ads',
      'Ads Manager Beta OpenAI',
      'context hints advertising',
      'ChatGPT CPC ads',
      'Canada ChatGPT advertising',
      'Toronto digital marketing ChatGPT',
      'Stratezik paid media',
    ],
    faqEntities: chatgptAdsGuideFaq,
  },
  {
    slug: 'google-maps-ranking-service-business',
    title: 'Why Service Businesses Lose on Google Maps',
    description:
      'Whitespark 2026 local ranking factors put GBP primary category ahead of reviews for Maps pack influence. What Ontario service operators should fix first: categories, hours, and per-service site depth.',
    datePublished: '2026-05-07',
    dateModified: '2026-06-17',
    keywords: [
      'Google Maps ranking service business',
      'Google Business Profile primary category',
      'Ontario local SEO',
      'local pack ranking factors 2026',
      'GBP audit Ontario',
      'Stratezik local search',
    ],
    faqEntities: googleMapsRankingServiceBusinessFaq,
  },
  {
    slug: 'insectica-gta-pest-control-scaling-case-study',
    title: 'How We Scaled a Toronto Pest Control Company: The Insectica Story (700+ Leads, Full Breakdown)',
    description:
      'Month-by-month narrative of Insectica Pest Control’s GTA growth: ten ad groups, CPA-first bidding, 700+ paid conversions at ~$43 CPL, organic impressions up 168x, plus charts and infographic.',
    datePublished: '2026-05-02',
    dateModified: '2026-06-17',
    keywords: [
      'Insectica Pest Control case study',
      'Toronto pest control marketing',
      'Google Ads pest control CPL',
      'GTA local lead generation',
      'organic growth Search Console',
      'Stratezik case study',
    ],
    faqEntities: insecticaCaseStudyFaq,
  },
  {
    slug: 'answer-engine-optimisation-toronto',
    title: 'Answer Engine Optimisation for Toronto Businesses',
    description:
      "Most websites cited in Google's AI-generated answers don't rank in the organic top 10 for that query. What answer engine optimisation means for Toronto businesses.",
    datePublished: '2026-05-01',
    dateModified: '2026-06-17',
    keywords: [
      'answer engine optimisation Toronto',
      'AI search Toronto',
      'Google AI Overviews local business',
      'AEO vs SEO Toronto',
      'ChatGPT local recommendations',
      'Perplexity search',
    ],
    faqEntities: answerEngineTorontoFaq,
  },
]

export function getPostMetaBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return blogPostsMeta.find((p) => p.slug === slug)
}

/** Homepage + noscript featured list (newest by dateModified). */
export function getFeaturedBlogPosts(limit = 4) {
  return [...blogPostsMeta].sort((a, b) => b.dateModified.localeCompare(a.dateModified)).slice(0, limit)
}
