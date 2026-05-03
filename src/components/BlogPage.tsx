import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../blog/posts'
import { applyPageMeta } from '../utils/documentMeta'

/**
 * Blog index: editorial listing aligned with Plan D typography.
 */
const BlogPage = () => {
  useEffect(() => {
    return applyPageMeta({
      title: 'Blog | Stratezik: Toronto SEO, PPC & Answer Engine Insights',
      description:
        'Articles from Stratezik on answer engine optimisation (AEO), Toronto local SEO, AI search, Google AI Overviews, and integrated growth strategy.',
      path: '/blog',
      ogType: 'website',
    })
  }, [])

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-12 gap-4 mb-14 md:mb-20"
        >
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              / 07: Blog
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Strategy notes · Toronto &amp; Canada
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h1 className="font-display text-display-3 md:text-display-2 text-ink leading-[1.02] tracking-[-0.035em]">
              Insights on search, answer engines, and growth.
            </h1>
            <p className="lead mt-8 max-w-2xl">
              Practical writing for operators who need discovery to show up in organic results, AI summaries, and local
              maps without chasing tactics that do not compound.
            </p>
          </div>
        </motion.header>

        <ul className="space-y-0 border-t border-ink/15">
          {blogPosts.map((post) => (
            <li key={post.slug} className="border-b border-ink/15">
              <Link
                to={`/blog/${post.slug}`}
                data-cursor="cta"
                data-cursor-text="Read"
                className="grid grid-cols-12 gap-4 py-10 md:py-12 group hover:bg-cream-50/80 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
              >
                <div className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                  {post.datePublished}
                </div>
                <div className="col-span-12 md:col-span-10">
                  <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight group-hover:text-oxblood transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-ink-600 leading-relaxed max-w-3xl">{post.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                    Read article
                    <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {blogPosts.length === 0 && (
          <p className="text-ink-600 font-mono text-sm">New posts are underway. Check back soon.</p>
        )}
      </div>
    </div>
  )
}

export default BlogPage
