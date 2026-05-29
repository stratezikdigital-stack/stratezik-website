import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAuthorBySlug } from '../seo/authors'
import { blogPosts } from '../blog/posts'

const AuthorPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const author = getAuthorBySlug(slug)

  if (!author || author.slug !== slug) {
    return <Navigate to="/blog" replace />
  }

  const posts = blogPosts.filter((p) => getAuthorBySlug(p.authorSlug)?.slug === author.slug)

  return (
    <div className="min-h-screen bg-cream pb-24">
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
          <span className="text-ink">Author</span>
        </nav>

        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-[720px]"
        >
          <h1 className="font-display text-display-3 md:text-[clamp(2.25rem,5vw,3.25rem)] text-ink leading-[1.05] tracking-[-0.035em]">
            {author.name}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">{author.jobTitle}</p>
          <p className="lead mt-8 text-ink-700">{author.bio}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {author.email && (
              <a href={`mailto:${author.email}`} className="hover:text-ink transition-colors">
                {author.email}
              </a>
            )}
            {author.sameAs.map((href) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
            ))}
          </div>
        </motion.header>

        {posts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-6">Articles by {author.name}</h2>
            <ul className="space-y-0 border-t border-ink/15">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-ink/15">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="grid grid-cols-12 gap-4 py-8 group hover:bg-cream-50/80 transition-colors -mx-4 px-4 md:-mx-6 md:px-6"
                  >
                    <div className="col-span-12 md:col-span-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                      {post.datePublished}
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      <h3 className="font-display text-xl md:text-2xl text-ink tracking-tight group-hover:text-oxblood transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-ink-600 leading-relaxed max-w-3xl">{post.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="max-w-[720px] mt-16 pt-10 border-t border-ink/10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink"
          >
            &larr; All posts
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default AuthorPage
