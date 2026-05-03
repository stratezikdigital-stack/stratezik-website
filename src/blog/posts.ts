import type { BlogPostDefinition } from './postTypes'
import AnswerEngineTorontoArticle from './AnswerEngineTorontoArticle'
import InsecticaCaseStudyArticle from './InsecticaCaseStudyArticle'

const aeoFaq = [
  {
    question: 'What is answer engine optimisation and how does it affect Toronto businesses?',
    answer:
      'Answer engine optimisation (AEO) is the practice of structuring your website content so it can be cited inside AI-generated answers in tools like ChatGPT and Perplexity and in Google AI Overviews. For Toronto businesses, it means appearing when someone asks an assistant to recommend a local provider before they open a map or traditional search results.',
  },
  {
    question: "Does ranking in Google's top 10 mean my site will be cited in AI Overviews?",
    answer:
      'Not necessarily. Research cited by BrightEdge suggests only about 17% of URLs appearing in AI Overviews also rank in the organic top ten for that query, meaning most citations come from other pages. Google documents that citations depend on content quality and structure, not ranking position alone.',
  },
  {
    question: 'What should Toronto service businesses prioritise for answer engine optimisation?',
    answer:
      'Prioritise direct, extractable answers in your content; structured data such as LocalBusiness, FAQPage, or Service schema where appropriate; consistent name, address, and phone across your website and Google Business Profile; and specific local language that matches how customers search. Layer paid search if you need immediate coverage while citation equity compounds.',
  },
]

const insecticaFaq = [
  {
    question: 'How did Insectica Pest Control scale leads across the GTA?',
    answer:
      'Stratezik launched Google Ads with ten pest-type-specific ad groups, aggressive negative keyword hygiene, and CPA-first Smart Bidding fed by phone and form conversions. Over eleven months the account produced more than seven hundred paid conversions at roughly forty-three dollars average cost per lead while organic impressions compounded into the tens of thousands monthly.',
  },
  {
    question: 'What cost per lead did Insectica achieve versus industry benchmarks?',
    answer:
      'Average cost per lead held near forty-three Canadian dollars against an eighty to one hundred twenty dollar benchmark often cited for Canadian pest control search. The best month dipped to about thirty-three dollars with ninety-six conversions during peak season.',
  },
  {
    question: 'Did organic search improve without a separate SEO retainer?',
    answer:
      'Yes. Organic impressions grew roughly one hundred sixty-eight times from the February twenty twenty five baseline to peak months in early twenty twenty six, and average Google ranking position improved from the high fifties to about fifteen by April twenty twenty six alongside consistent paid demand and structured site content.',
  },
]

export const blogPosts: BlogPostDefinition[] = [
  {
    slug: 'insectica-gta-pest-control-scaling-case-study',
    title: 'How We Scaled a Toronto Pest Control Company: The Insectica Story (700+ Leads, Full Breakdown)',
    description:
      'Month-by-month narrative of Insectica Pest Control’s GTA growth: ten ad groups, CPA-first bidding, 700+ paid conversions at ~$43 CPL, organic impressions up 168×, plus charts and infographic.',
    datePublished: '2026-05-02',
    dateModified: '2026-05-02',
    keywords: [
      'Insectica Pest Control case study',
      'Toronto pest control marketing',
      'Google Ads pest control CPL',
      'GTA local lead generation',
      'organic growth Search Console',
      'Stratezik case study',
    ],
    faqEntities: insecticaFaq,
    Component: InsecticaCaseStudyArticle,
  },
  {
    slug: 'answer-engine-optimisation-toronto',
    title: 'Answer Engine Optimisation for Toronto Businesses',
    description:
      "83% of businesses cited in AI search don't rank in Google's top 10. What answer engine optimisation means for Toronto businesses.",
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
    faqEntities: aeoFaq,
    Component: AnswerEngineTorontoArticle,
  },
]

export function getPostBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return blogPosts.find((p) => p.slug === slug)
}
