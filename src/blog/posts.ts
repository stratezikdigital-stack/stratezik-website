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
    question: 'What is an answer engine compared to a classic search engine?',
    answer:
      'A classic search engine primarily returns a list of links for the user to choose from. An answer engine synthesises information from multiple sources into one response, often showing only a handful of citations — so visibility depends on being quoted, not only on ranking somewhere on the page.',
  },
  {
    question: 'Why do some local businesses get cited in AI answers while others do not?',
    answer:
      'Systems tend to cite sources that directly answer the user question in clear structure, show topical depth, and align with consistent business facts across the website and Google Business Profile. Thin promotional copy and mismatched contact details reduce trust.',
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
      'Answer engine optimisation is changing how Toronto customers find local businesses. Learn what AEO is, why it matters for AI search and Google AI Overviews, and how to get cited.',
    datePublished: '2026-05-01',
    dateModified: '2026-05-02',
    keywords: [
      'answer engine optimisation Toronto',
      'AEO for local businesses',
      'AI search Toronto',
      'Google AI Overviews',
      'ChatGPT business recommendations',
      'Perplexity local SEO',
    ],
    faqEntities: aeoFaq,
    Component: AnswerEngineTorontoArticle,
  },
]

export function getPostBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return blogPosts.find((p) => p.slug === slug)
}
