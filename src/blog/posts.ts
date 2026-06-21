import type { BlogPostDefinition } from './postTypes'
import { getPostMetaBySlug } from './postsMeta'
import { getPostLoader } from './postLoaders'

export { getFeaturedBlogPosts, getPostMetaBySlug } from './postsMeta'

export function getPostBySlug(slug: string | undefined): BlogPostDefinition | undefined {
  const meta = getPostMetaBySlug(slug)
  if (!meta) return undefined
  const loadComponent = getPostLoader(meta.slug)
  if (!loadComponent) return undefined
  return { ...meta, loadComponent }
}
