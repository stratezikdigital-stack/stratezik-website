import { Suspense, lazy, useMemo } from 'react'
import type { FC } from 'react'
import type { BlogPostDefinition } from './postTypes'

type LazyBlogArticleProps = {
  post: BlogPostDefinition
}

export function LazyBlogArticle({ post }: LazyBlogArticleProps) {
  const Article = useMemo(() => lazy(post.loadComponent), [post.slug])
  return (
    <Suspense
      fallback={
        <p className="font-mono text-sm text-ink-500 py-8" aria-live="polite">
          Loading article…
        </p>
      }
    >
      <Article />
    </Suspense>
  )
}

type BlogArticleBodyProps = {
  post: BlogPostDefinition
  /** Preloaded article for build-time prerender (SSR-safe). */
  articleComponent?: FC
}

export function BlogArticleBody({ post, articleComponent }: BlogArticleBodyProps) {
  if (articleComponent) {
    const Article = articleComponent
    return <Article />
  }
  return <LazyBlogArticle post={post} />
}
