/**
 * Single source of truth: which routes get build-time React body HTML in #root.
 * When adding an indexable page, update this file + PrerenderApp.tsx + pageSeoRegistry.
 * postbuild-seo.ts fails the build if a listed route ships an empty #root.
 */

/** Exact paths that must prerender body HTML (in addition to prefix matches below). */
export const PRERENDER_BODY_EXACT = new Set([
  '/',
  '/careers',
  '/privacy',
  '/aeo-checker',
  '/gbp-audit',
  '/toronto-startup-website-audit-2026',
  '/growth-credit',
  '/free-tools',
  '/chatgpt-ads-cheat-sheet',
  '/blog',
  '/services',
])

/** Path prefixes — any path equal to or nested under these prerenders body HTML. */
export const PRERENDER_BODY_PREFIXES = ['/blog/', '/authors/', '/services/']

/** Token-gated or noindex routes — head only, no body prerender. */
export const PRERENDER_BODY_EXCLUDE = ['/chatgpt-ads-cheat-sheet/guide']

export function shouldPrerenderBody(path: string): boolean {
  if (PRERENDER_BODY_EXCLUDE.some((ex) => path === ex || path.startsWith(`${ex}/`))) {
    return false
  }
  if (PRERENDER_BODY_EXACT.has(path)) return true
  return PRERENDER_BODY_PREFIXES.some((prefix) => path.startsWith(prefix))
}

/** Minimum #root inner HTML length for routes that require body prerender. */
export const PRERENDER_BODY_MIN_CHARS = 200

export function extractRootInnerHtml(html: string): string {
  const match = html.match(/<div id="root">([\s\S]*?)<\/div>/)
  return match?.[1]?.trim() ?? ''
}

export function assertPrerenderBody(routePath: string, html: string): void {
  if (!shouldPrerenderBody(routePath)) return
  const inner = extractRootInnerHtml(html)
  if (inner.length < PRERENDER_BODY_MIN_CHARS) {
    throw new Error(
      `[seo] P0: ${routePath} requires prerendered body but #root is empty or too short (${inner.length} chars). ` +
        `Add the route to scripts/prerenderBodyRoutes.ts and PrerenderApp.tsx.`,
    )
  }
}
