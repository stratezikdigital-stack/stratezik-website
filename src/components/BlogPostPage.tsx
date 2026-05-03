import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPostBySlug } from '../blog/posts'
import { buildAeoArticleJsonLd } from '../blog/buildArticleJsonLd'
import { applyPageMeta, injectJsonLd } from '../utils/documentMeta'

const faqEntities = [
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

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (!post) return undefined

    const undoMeta = applyPageMeta({
      title: `${post.title} | Stratezik Blog`,
      description: post.description,
      path: `/blog/${post.slug}`,
      ogType: 'article',
    })

    const jsonLd =
      post.slug === 'answer-engine-optimisation-toronto'
        ? buildAeoArticleJsonLd(post, faqEntities)
        : {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Article',
                headline: post.title,
                description: post.description,
                datePublished: post.datePublished,
                dateModified: post.dateModified,
                author: { '@type': 'Organization', name: 'Stratezik', url: 'https://www.stratezik.com' },
                publisher: {
                  '@type': 'Organization',
                  name: 'Stratezik',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.stratezik.com/branding/stratezik-vertical.png',
                  },
                },
              },
            ],
          }

    const undoLd = injectJsonLd(jsonLd)

    return () => {
      undoMeta()
      undoLd()
    }
  }, [post?.slug, post?.title, post?.description, post?.datePublished, post?.dateModified])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Component } = post

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
          <span className="text-ink">Article</span>
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
