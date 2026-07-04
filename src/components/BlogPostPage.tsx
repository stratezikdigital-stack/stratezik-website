import type { FC } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthorHeadshot } from '../blog/AuthorHeadshot'
import { BlogDiscoveryHub } from '../blog/BlogDiscoveryHub'
import { BlogHeroImage } from '../blog/BlogHeroImage'
import { BlogArticleBody } from '../blog/LazyBlogArticle'
import { BlogAiSummarizeBar } from './BlogAiSummarizeBar'
import { getPostBySlug } from '../blog/posts'
import { getAuthorBySlug } from '../seo/authors'
import { formatBreadcrumbLabel } from '../seo/buildBreadcrumbJsonLd'
import { fadeUpProps } from '../utils/motionPresets'
import { useMotionEnabled } from '../utils/useMotionEnabled'

type BlogPostPageProps = {
  /** Preloaded article for build-time prerender. */
  articleComponent?: FC
}

const BlogPostPage = ({ articleComponent }: BlogPostPageProps) => {
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug)
  const motionOn = useMotionEnabled()

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const author = getAuthorBySlug(post.authorSlug)
  const breadcrumbLabel = formatBreadcrumbLabel(post.title)
  const isResearch = post.layout === 'research'
  const contentWidth = isResearch ? 'max-w-[960px]' : 'max-w-[720px]'

  return (
    <article className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12">
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-10">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          <Link to="/blog" className="hover:text-ink transition-colors">
            Blog
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          <span className="text-ink" aria-current="page">
            {breadcrumbLabel}
          </span>
        </nav>

        <motion.header
          {...fadeUpProps(motionOn, 0, 14)}
          className={contentWidth}
        >
          {isResearch ? (
            <p className="mb-5 inline-flex border border-oxblood/25 bg-oxblood-50/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">
              Original research · Toronto &amp; GTA · June 2026
            </p>
          ) : null}
          <h1 className="font-display text-display-3 md:text-[clamp(2.25rem,5vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="lead mt-8 text-ink-700">{post.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {author && (
              <>
                <span className="inline-flex items-center gap-3">
                  <AuthorHeadshot author={author} sizeClassName="w-9 h-9" />
                  <span>
                    By{' '}
                    <Link to={`/authors/${author.slug}`} className="text-ink hover:text-oxblood transition-colors">
                      {author.name}
                    </Link>
                  </span>
                </span>
                <span aria-hidden className="hidden sm:inline text-ink-300">
                  |
                </span>
              </>
            )}
            <time dateTime={post.datePublished}>Published {post.datePublished}</time>
            <span aria-hidden className="hidden sm:inline text-ink-300">
              |
            </span>
            <span>Updated {post.dateModified}</span>
          </div>
          <BlogAiSummarizeBar title={post.title} slug={post.slug} />
        </motion.header>

        <BlogHeroImage slug={post.slug} title={post.title} className="mt-10 md:mt-12" />

        <div className="mt-14 md:mt-20">
          <BlogArticleBody post={post} articleComponent={articleComponent} />
        </div>

        <footer className={`${contentWidth} mx-auto mt-16 pt-10 border-t border-ink/10`}>
          <BlogDiscoveryHub excludeSlug={post.slug} heading="More from the Stratezik blog" />
          <Link
            to="/blog"
            className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink"
          >
            &larr; All posts
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default BlogPostPage
