import { SITE_ORIGIN } from './siteConfig'

export type Author = {
  slug: string
  name: string
  jobTitle: string
  /** Short bio shown on the author page and used in Person description. */
  bio: string
  /** Path to a headshot/avatar under /public, optional. */
  imagePath?: string
  email?: string
  /**
   * Verified external profiles for E-E-A-T. Only include URLs that truly belong
   * to this person. Add the author's real personal LinkedIn here when confirmed.
   */
  sameAs: string[]
}

/**
 * Author registry. Every blog post references an author by `slug`.
 * NOTE: `name` and `sameAs` should be confirmed real values. Personal LinkedIn
 * strengthens E-E-A-T — add it once verified rather than guessing.
 */
export const authors: Author[] = [
  {
    slug: 'didar-sampson',
    name: 'Didar Sampson',
    jobTitle: 'Creative Juggler',
    bio: 'Creative Juggler at Stratezik Digital Inc, a Toronto digital marketing agency. Works hands-on across technical SEO, answer-engine optimisation, paid search, and growth analytics for startups and SMBs across the GTA and Canada.',
    imagePath: '/branding/author-didar-sampson.png',
    email: 'dave@stratezik.com',
    sameAs: ['https://www.linkedin.com/company/stratezik/'],
  },
]

const DEFAULT_AUTHOR_SLUG = 'didar-sampson'

export function getAuthorBySlug(slug?: string): Author | undefined {
  const target = slug ?? DEFAULT_AUTHOR_SLUG
  return authors.find((a) => a.slug === target)
}

export function authorUrl(author: Author): string {
  return `${SITE_ORIGIN}/authors/${author.slug}`
}

/** Person JSON-LD node for use as Article `author` and on the author page. */
export function buildAuthorNode(author: Author) {
  const node: Record<string, unknown> = {
    '@type': 'Person',
    '@id': `${authorUrl(author)}#person`,
    name: author.name,
    url: authorUrl(author),
    jobTitle: author.jobTitle,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'Stratezik',
      url: SITE_ORIGIN,
    },
  }
  if (author.imagePath) node.image = `${SITE_ORIGIN}${author.imagePath}`
  if (author.email) node.email = author.email
  if (author.sameAs.length) node.sameAs = author.sameAs
  return node
}

/** ProfilePage + Person JSON-LD for the standalone /authors/{slug} route. */
export function buildAuthorPageJsonLd(author: Author) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${authorUrl(author)}#profilepage`,
        url: authorUrl(author),
        name: `${author.name} — Stratezik`,
        mainEntity: { '@id': `${authorUrl(author)}#person` },
        inLanguage: 'en-CA',
      },
      buildAuthorNode(author),
    ],
  }
}
