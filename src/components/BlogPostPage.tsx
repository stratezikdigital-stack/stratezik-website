import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPostBySlug } from '../blog/posts'
import { getAuthorBySlug } from '../seo/authors'
import { formatBreadcrumbLabel } from '../seo/buildBreadcrumbJsonLd'

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Component } = post
  const author = getAuthorBySlug(post.authorSlug)
  const breadcrumbLabel = formatBreadcrumbLabel(post.title)

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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[720px]"
        >
          <h1 className="font-display text-display-3 md:text-[clamp(2.25rem,5vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="lead mt-8 text-ink-700">{post.description}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {author && (
              <>
                <span>
                  By{' '}
                  <Link to={`/authors/${author.slug}`} className="text-ink hover:text-oxblood transition-colors">
                    {author.name}
                  </Link>
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
        </motion.header>

        <div className="mt-14 md:mt-20">
          <Component />
        </div>

        <footer className="max-w-[720px] mx-auto mt-16 pt-10 border-t border-ink/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink"
          >
            &larr; All posts
          </Link>
        </footer>
      </div>
    </article>
  )
}

export default BlogPostPage
