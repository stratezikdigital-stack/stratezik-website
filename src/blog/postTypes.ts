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
}

export type BlogPostDefinition = BlogPostMeta & {
  Component: FC
  /** Optional FAQ entries for FAQPage JSON-LD */
  faqEntities?: { question: string; answer: string }[]
}
