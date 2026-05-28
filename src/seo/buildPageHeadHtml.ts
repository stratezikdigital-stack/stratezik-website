import type { RouteSeoConfig } from './pageSeoRegistry'
import { canonicalUrl } from './siteConfig'
import { TWITTER_SITE } from './siteConfig'

const ROUTE_JSON_LD_ID = 'stratezik-jsonld'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function metaLine(tag: string, attrs: Record<string, string>): string {
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
    .join(' ')
  return `    <${tag} ${attrStr} />`
}

function jsonLdScript(id: string, data: unknown): string {
  return `    <script type="application/ld+json" id="${id}">\n${JSON.stringify(data, null, 2)}\n    </script>`
}

/** HTML fragment for build-time prerender and validation. */
export function buildRouteHeadHtml(config: RouteSeoConfig): string {
  const url = canonicalUrl(config.path)
  const lines: string[] = []

  lines.push(`    <title>${escapeHtml(config.title)}</title>`)
  lines.push(metaLine('meta', { name: 'description', content: config.description }))

  if (config.keywords?.length) {
    lines.push(metaLine('meta', { name: 'keywords', content: config.keywords.join(', ') }))
  }

  lines.push(metaLine('meta', { property: 'og:title', content: config.title }))
  lines.push(metaLine('meta', { property: 'og:description', content: config.description }))
  lines.push(metaLine('meta', { property: 'og:type', content: config.ogType }))
  lines.push(metaLine('meta', { property: 'og:url', content: url }))
  lines.push(metaLine('meta', { property: 'og:image', content: config.ogImageUrl }))
  lines.push(metaLine('meta', { property: 'og:image:width', content: String(config.ogImageWidth) }))
  lines.push(metaLine('meta', { property: 'og:image:height', content: String(config.ogImageHeight) }))
  lines.push(metaLine('meta', { property: 'og:image:alt', content: config.ogImageAlt }))
  lines.push(metaLine('meta', { property: 'og:locale', content: 'en_CA' }))
  lines.push(metaLine('meta', { property: 'og:site_name', content: 'Stratezik' }))

  if (config.ogType === 'article' && config.datePublished) {
    lines.push(metaLine('meta', { property: 'article:published_time', content: config.datePublished }))
  }
  if (config.ogType === 'article' && config.dateModified) {
    lines.push(metaLine('meta', { property: 'article:modified_time', content: config.dateModified }))
  }
  if (config.ogType === 'article') {
    lines.push(metaLine('meta', { property: 'article:author', content: 'Stratezik' }))
    lines.push(metaLine('meta', { property: 'article:section', content: 'Digital Marketing' }))
  }

  lines.push(metaLine('meta', { name: 'twitter:card', content: 'summary_large_image' }))
  lines.push(metaLine('meta', { name: 'twitter:site', content: TWITTER_SITE }))
  lines.push(metaLine('meta', { name: 'twitter:title', content: config.title }))
  lines.push(metaLine('meta', { name: 'twitter:description', content: config.description }))
  lines.push(metaLine('meta', { name: 'twitter:image', content: config.ogImageUrl }))
  lines.push(metaLine('meta', { name: 'twitter:image:alt', content: config.ogImageAlt }))

  lines.push(`    <link rel="canonical" href="${escapeHtml(url)}" />`)

  lines.push(
    metaLine('meta', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    }),
  )

  if (config.jsonLd) {
    lines.push(jsonLdScript(ROUTE_JSON_LD_ID, config.jsonLd))
  }

  config.extraJsonLd?.forEach(({ id, data }) => {
    lines.push(jsonLdScript(id, data))
  })

  return lines.join('\n')
}

export { ROUTE_JSON_LD_ID }
