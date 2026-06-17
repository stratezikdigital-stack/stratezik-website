import { Link } from 'react-router-dom'
import { blogPosts } from './posts'

type BlogDiscoveryHubProps = {
  heading?: string
  /** Omit the current article from the hub list. */
  excludeSlug?: string
  /** Cap list length (default: all posts). */
  limit?: number
}

/**
 * Sitewide blog crawl mesh — every post links to every other post via this hub.
 * Helps Google discover URLs beyond sitemap-only signals (GSC "Discovered - not indexed").
 */
export function BlogDiscoveryHub({
  heading = 'All Stratezik insights',
  excludeSlug,
  limit,
}: BlogDiscoveryHubProps) {
  const posts = blogPosts.filter((p) => p.slug !== excludeSlug).slice(0, limit ?? blogPosts.length)

  return (
    <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="blog-discovery-hub-heading">
      <h2 id="blog-discovery-hub-heading" className="font-display text-display-3 text-ink">
        {heading}
      </h2>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Get Found series, AI-native GTM, ChatGPT and Maps playbooks, Toronto local SEO, and GTA case studies — for
        operators who want measurable lift without guesswork.
      </p>
      <ul className="mt-6 space-y-3 text-ink-700 leading-relaxed list-disc pl-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="text-oxblood underline underline-offset-2">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
