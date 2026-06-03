import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getFeaturedBlogPosts } from '../blog/posts'

const LatestInsightsSection = () => {
  const posts = getFeaturedBlogPosts(4)

  return (
    <section id="insights" className="relative py-24 md:py-32 bg-cream border-y border-ink/10">
      <div className="container-custom px-6 md:px-12">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4 mb-12 md:mb-14"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">Blog</div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Toronto &amp; Canada
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-3 md:text-display-2 text-ink leading-[1.02] tracking-[-0.035em]">
              Latest insights
            </h2>
            <p className="lead mt-6 max-w-2xl text-ink-700">
              Strategy notes on SEO, answer engines, paid media, and GTA growth.{' '}
              <Link to="/blog" className="text-oxblood hover:text-ink underline underline-offset-4">
                View all posts
              </Link>
            </p>
          </div>
        </motion.header>

        <ul className="space-y-0 border-t border-ink/15 max-w-4xl">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-ink/15">
              <Link
                to={`/blog/${post.slug}`}
                data-cursor="cta"
                data-cursor-text="Read"
                className="block py-8 md:py-10 group hover:bg-cream-50/80 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-3">
                  {post.datePublished}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight group-hover:text-oxblood transition-colors">
                  {post.title}
                </h3>
                <p className="mt-3 text-ink-600 leading-relaxed">{post.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  Read article
                  <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LatestInsightsSection
