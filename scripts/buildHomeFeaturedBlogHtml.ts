import { getFeaturedBlogPosts } from '../src/blog/posts'

/** Inline HTML for homepage noscript (kept in sync with LatestInsightsSection). */
export function buildHomeFeaturedBlogNoscriptHtml(): string {
  const posts = getFeaturedBlogPosts(4)
  const items = posts
    .map(
      (post) =>
        `<li style="margin-bottom: 14px;"><a href="https://www.stratezik.com/blog/${post.slug}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${escapeHtml(post.title)}</a><br><span style="color: #6b7280; font-size: 0.95rem;">${escapeHtml(post.description)}</span></li>`,
    )
    .join('\n                  ')

  return `<section style="padding: 60px 0; background: #fff;">
              <div style="max-width: 900px; margin: 0 auto; text-align: left;">
                <h2 style="font-size: 2rem; font-weight: bold; color: #111827; margin-bottom: 12px;">Latest insights</h2>
                <p style="color: #6b7280; margin-bottom: 28px;">Strategy notes on SEO, answer engines, paid media, and GTA growth — <a href="https://www.stratezik.com/blog" style="color: #dc2626; text-decoration: none;">view all posts</a>.</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${items}
                </ul>
              </div>
            </section>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
