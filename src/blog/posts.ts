import type { BlogPostDefinition } from './postTypes'
import AnswerEngineTorontoArticle from './AnswerEngineTorontoArticle'

export const blogPosts: BlogPostDefinition[] = [
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
    Component: AnswerEngineTorontoArticle,
  },
]

export function getPostBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return blogPosts.find((p) => p.slug === slug)
}
