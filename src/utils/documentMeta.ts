/**
 * Client-side meta updates for SPA routes (title, description, canonical, OG, Twitter, article tags).
 * Build-time prerender in scripts/postbuild-seo.ts mirrors this via buildRouteHeadHtml.
 */

import type { RouteSeoConfig } from '../seo/pageSeoRegistry'
import { canonicalUrl } from '../seo/siteConfig'
import { TWITTER_SITE } from '../seo/siteConfig'

const JSON_LD_ID = 'stratezik-jsonld'

function getMetaElement(selector: string): HTMLMetaElement | null {
  return document.querySelector(selector)
}

function snapshotContent(el: HTMLMetaElement | null): string | null {
  return el?.getAttribute('content') ?? null
}

function setMeta(selector: string, content: string): { el: HTMLMetaElement | null; prev: string | null } {
  let el = getMetaElement(selector)
  const prev = snapshotContent(el)
  if (!el && selector.startsWith('meta[')) {
    el = document.createElement('meta')
    const propMatch = selector.match(/property="([^"]+)"/)
    const nameMatch = selector.match(/name="([^"]+)"/)
    if (propMatch) el.setAttribute('property', propMatch[1])
    if (nameMatch) el.setAttribute('name', nameMatch[1])
    document.head.appendChild(el)
  }
  if (el) el.setAttribute('content', content)
  return { el, prev }
}

function setCanonical(href: string): { el: HTMLLinkElement | null; prev: string | null } {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  const prev = el?.getAttribute('href') ?? null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return { el, prev }
}

export type ApplyPageMetaArgs = {
  title: string
  description: string
  /** Pathname only, e.g. /blog or /blog/my-post */
  path: string
  ogType?: 'website' | 'article'
  /** Full absolute URL for og:image and twitter:image */
  ogImageUrl?: string
  ogImageWidth?: number
  ogImageHeight?: number
  ogImageAlt?: string
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  robots?: string
}

/** Apply meta from the central route registry (preferred). */
export function applyRouteSeo(config: RouteSeoConfig): () => void {
  return applyPageMeta({
    title: config.title,
    description: config.description,
    path: config.path,
    ogType: config.ogType,
    ogImageUrl: config.ogImageUrl,
    ogImageWidth: config.ogImageWidth,
    ogImageHeight: config.ogImageHeight,
    ogImageAlt: config.ogImageAlt,
    datePublished: config.datePublished,
    dateModified: config.dateModified,
    keywords: config.keywords,
    robots: config.robots,
  })
}

/** Returns undo function (also runs on unmount via useEffect cleanup). */
export function applyPageMeta(args: ApplyPageMetaArgs): () => void {
  const prevTitle = document.title
  const url = canonicalUrl(args.path)

  const descSnap = setMeta('meta[name="description"]', args.description)
  const keywordsSnap = args.keywords?.length
    ? setMeta('meta[name="keywords"]', args.keywords.join(', '))
    : { el: null as HTMLMetaElement | null, prev: null as string | null }

  const robotsSnap = setMeta(
    'meta[name="robots"]',
    args.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  )

  const canonicalSnap = setCanonical(url)

  const metaUpdates: { selector: string; value: string }[] = [
    { selector: 'meta[property="og:title"]', value: args.title },
    { selector: 'meta[property="og:description"]', value: args.description },
    { selector: 'meta[property="og:url"]', value: url },
    { selector: 'meta[property="og:type"]', value: args.ogType ?? 'website' },
    { selector: 'meta[property="og:locale"]', value: 'en_CA' },
    { selector: 'meta[property="og:site_name"]', value: 'Stratezik' },
    { selector: 'meta[name="twitter:site"]', value: TWITTER_SITE },
    { selector: 'meta[name="twitter:title"]', value: args.title },
    { selector: 'meta[name="twitter:description"]', value: args.description },
  ]

  if (args.ogImageUrl) {
    metaUpdates.push(
      { selector: 'meta[property="og:image"]', value: args.ogImageUrl },
      { selector: 'meta[name="twitter:image"]', value: args.ogImageUrl },
    )
  }
  if (args.ogImageWidth) {
    metaUpdates.push({ selector: 'meta[property="og:image:width"]', value: String(args.ogImageWidth) })
  }
  if (args.ogImageHeight) {
    metaUpdates.push({ selector: 'meta[property="og:image:height"]', value: String(args.ogImageHeight) })
  }
  if (args.ogImageAlt) {
    metaUpdates.push(
      { selector: 'meta[property="og:image:alt"]', value: args.ogImageAlt },
      { selector: 'meta[name="twitter:image:alt"]', value: args.ogImageAlt },
    )
  }

  if (args.ogType === 'article' && args.datePublished) {
    metaUpdates.push({ selector: 'meta[property="article:published_time"]', value: args.datePublished })
  }
  if (args.ogType === 'article' && args.dateModified) {
    metaUpdates.push({ selector: 'meta[property="article:modified_time"]', value: args.dateModified })
  }
  if (args.ogType === 'article') {
    metaUpdates.push(
      { selector: 'meta[property="article:author"]', value: 'Stratezik' },
      { selector: 'meta[property="article:section"]', value: 'Digital Marketing' },
    )
  }

  document.title = args.title

  const snapshots = metaUpdates.map(({ selector, value }) => {
    const el = getMetaElement(selector)
    const prev = snapshotContent(el)
    if (el) el.setAttribute('content', value)
    return { el, prev }
  })

  return () => {
    document.title = prevTitle
    if (descSnap.el && descSnap.prev !== null) descSnap.el.setAttribute('content', descSnap.prev)
    if (keywordsSnap.el) {
      if (keywordsSnap.prev === null) keywordsSnap.el.removeAttribute('content')
      else keywordsSnap.el.setAttribute('content', keywordsSnap.prev)
    }
    if (robotsSnap.el && robotsSnap.prev !== null) robotsSnap.el.setAttribute('content', robotsSnap.prev)
    if (canonicalSnap.el) {
      if (canonicalSnap.prev === null) canonicalSnap.el.remove()
      else canonicalSnap.el.setAttribute('href', canonicalSnap.prev)
    }
    snapshots.forEach(({ el, prev }) => {
      if (!el) return
      if (prev === null) el.removeAttribute('content')
      else el.setAttribute('content', prev)
    })
  }
}

export function injectJsonLd(data: unknown, scriptId: string = JSON_LD_ID): () => void {
  let el = document.getElementById(scriptId) as HTMLScriptElement | null
  const created = !el
  if (!el) {
    el = document.createElement('script')
    el.id = scriptId
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  const prevText = created ? null : el.textContent
  el.textContent = JSON.stringify(data)

  return () => {
    if (created && el?.parentNode) {
      el.parentNode.removeChild(el)
      return
    }
    if (el) {
      if (prevText) el.textContent = prevText
      else el.textContent = ''
    }
  }
}

export function injectRouteJsonLd(config: RouteSeoConfig): () => void {
  const cleanups: (() => void)[] = []
  if (config.jsonLd) cleanups.push(injectJsonLd(config.jsonLd))
  config.extraJsonLd?.forEach(({ id, data }) => {
    cleanups.push(injectJsonLd(data, id))
  })
  return () => cleanups.forEach((fn) => fn())
}
