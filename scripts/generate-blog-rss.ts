import { getPublishedBlogPosts } from '../src/blog/postsMeta'
import { getAuthorBySlug } from '../src/seo/authors'
import { SITE_ORIGIN } from '../src/seo/siteConfig'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** RFC-822 for RSS <pubDate> from YYYY-MM-DD (noon UTC). */
function toRfc822(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00.000Z`)
  return d.toUTCString()
}

/**
 * Blog-only RSS 2.0 for Reddit brand "Sync your content" and readers.
 * Items are published posts only (title + excerpt + absolute URL) — not full HTML bodies.
 */
export function generateBlogRssXml(): string {
  const posts = [...getPublishedBlogPosts()].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  )
  const lastBuild = posts[0]?.dateModified ?? posts[0]?.datePublished ?? new Date().toISOString().slice(0, 10)
  const feedUrl = `${SITE_ORIGIN}/blog/rss.xml`

  const items = posts
    .map((post) => {
      const url = `${SITE_ORIGIN}/blog/${post.slug}`
      const author = getAuthorBySlug(post.authorSlug)
      const cats = post.keywords
        .slice(0, 5)
        .map((k) => `      <category>${escapeXml(k)}</category>`)
        .join('\n')

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRfc822(post.datePublished)}</pubDate>
      <description>${escapeXml(post.description)}</description>
${author ? `      <dc:creator>${escapeXml(author.name)}</dc:creator>\n` : ''}${cats}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Stratezik Blog — research &amp; AEO</title>
    <link>${SITE_ORIGIN}/blog</link>
    <description>Original Toronto / GTA research and practical guides on ChatGPT visibility, answer engine optimisation, and local growth from Stratezik.</description>
    <language>en-ca</language>
    <lastBuildDate>${toRfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_ORIGIN}/branding/og-share.png</url>
      <title>Stratezik Blog</title>
      <link>${SITE_ORIGIN}/blog</link>
    </image>
${items}
  </channel>
</rss>
`
}
