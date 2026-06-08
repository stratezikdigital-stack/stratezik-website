import { SITE_ORIGIN } from './siteConfig'

/** Visible label and JSON-LD `name` must match (Google breadcrumb guideline). */
export function formatBreadcrumbLabel(text: string, maxLength = 72): string {
  const trimmed = text.replace(/\s*\|\s*Stratezik(?:\s+Blog)?$/i, '').trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`
}

export function buildBlogPostBreadcrumbJsonLd(slug: string, title: string) {
  const articleUrl = `${SITE_ORIGIN}/blog/${slug}`
  const label = formatBreadcrumbLabel(title)
  return {
    '@type': 'BreadcrumbList',
    '@id': `${articleUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: label,
        item: articleUrl,
      },
    ],
  }
}

export function buildAuthorBreadcrumbJsonLd(slug: string, name: string) {
  const url = `${SITE_ORIGIN}/authors/${slug}`
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: url,
      },
    ],
  }
}

export function buildCareersBreadcrumbJsonLd() {
  const url = `${SITE_ORIGIN}/careers`
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Careers',
        item: url,
      },
    ],
  }
}

export function buildBlogIndexBreadcrumbJsonLd() {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_ORIGIN}/blog#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_ORIGIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_ORIGIN}/blog`,
      },
    ],
  }
}
