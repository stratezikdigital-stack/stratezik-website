export type ServiceFaq = { question: string; answer: string }

export type ServiceDefinition = {
  /** URL slug under /services, e.g. 'paid-search' */
  slug: string
  /** SEO title (already includes brand suffix) */
  title: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  /** schema.org serviceType label */
  serviceType: string
  /** FAQ entries mirrored from visible copy (parents only) */
  faqEntities?: ServiceFaq[]
}

export type ServicesHubDefinition = {
  slug: 'services'
  title: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
}

export type ServiceChildDefinition = {
  /** Parent service slug, e.g. 'paid-search' */
  parentSlug: string
  /** Child slug under the parent, e.g. 'google-ads' */
  slug: string
  title: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  serviceType: string
  faqEntities?: ServiceFaq[]
}
