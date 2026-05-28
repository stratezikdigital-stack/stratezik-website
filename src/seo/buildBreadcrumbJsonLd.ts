import { SITE_ORIGIN } from './siteConfig'

export function buildBlogPostBreadcrumbJsonLd(slug: string, title: string) {
  const articleUrl = `${SITE_ORIGIN}/blog/${slug}`
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
        name: title,
        item: articleUrl,
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
