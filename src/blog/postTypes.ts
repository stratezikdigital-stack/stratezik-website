import type { FC } from 'react'

export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  /** ISO date YYYY-MM-DD */
  datePublished: string
  dateModified: string
  keywords: string[]
  /** Path on origin for OG/Twitter + Article `image`, e.g. `/branding/blog-og-x.png` */
  shareImagePath?: string
  /** Author registry slug (see src/seo/authors.ts). Defaults to the primary author. */
  authorSlug?: string
  /** Wider canvas + research chrome for data-heavy pillars. */
  layout?: 'default' | 'research'
  /** Badge line on research-layout posts (defaults to June 2026 legacy copy). */
  researchLabel?: string
  /** Override default Article/FAQ JSON-LD graph. */
  buildJsonLd?: (meta: BlogPostMeta) => unknown
}

export type BlogPostDefinition = BlogPostMeta & {
  loadComponent: () => Promise<{ default: FC }>
  /** Optional FAQ entries for FAQPage JSON-LD */
  faqEntities?: { question: string; answer: string }[]
}
