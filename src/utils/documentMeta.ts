/**
 * Client-side meta updates for SPA routes (title, description, OG, Twitter).
 * Restores previous values on unmount so navigation does not leak tags between pages.
 */

const SITE = 'https://www.stratezik.com'

function getMetaElement(selector: string): HTMLMetaElement | null {
  return document.querySelector(selector)
}

function snapshotContent(el: HTMLMetaElement | null): string | null {
  return el?.getAttribute('content') ?? null
}

export type ApplyPageMetaArgs = {
  title: string
  description: string
  /** Pathname only, e.g. /blog or /blog/my-post */
  path: string
  ogType?: string
  /** Full absolute URL for og:image and twitter:image */
  ogImageUrl?: string
}

/** Returns undo function (also runs on unmount via useEffect cleanup). */
export function applyPageMeta(args: ApplyPageMetaArgs): () => void {
  const prevTitle = document.title
  const descEl = getMetaElement('meta[name="description"]')
  const prevDesc = snapshotContent(descEl)

  const path = args.path === '/' ? '/' : args.path.replace(/\/$/, '')
  const canonicalUrl = path === '/' ? `${SITE}/` : `${SITE}${path}`

  document.title = args.title
  if (descEl) descEl.setAttribute('content', args.description)

  const ogTwitter: { selector: string; value: string }[] = [
    { selector: 'meta[property="og:title"]', value: args.title },
    { selector: 'meta[property="og:description"]', value: args.description },
    { selector: 'meta[property="og:url"]', value: canonicalUrl },
    { selector: 'meta[property="og:type"]', value: args.ogType ?? 'website' },
    { selector: 'meta[name="twitter:title"]', value: args.title },
    { selector: 'meta[name="twitter:description"]', value: args.description },
  ]

  const ogImageEl = getMetaElement('meta[property="og:image"]')
  const twitterImageEl = getMetaElement('meta[name="twitter:image"]')
  const prevOgImage = snapshotContent(ogImageEl)
  const prevTwitterImage = snapshotContent(twitterImageEl)

  if (args.ogImageUrl) {
    if (ogImageEl) ogImageEl.setAttribute('content', args.ogImageUrl)
    if (twitterImageEl) twitterImageEl.setAttribute('content', args.ogImageUrl)
  }

  const snapshots = ogTwitter.map(({ selector }) => {
    const el = getMetaElement(selector)
    return { el, prev: snapshotContent(el) }
  })

  ogTwitter.forEach(({ value }, i) => {
    const el = snapshots[i].el
    if (el) el.setAttribute('content', value)
  })

  return () => {
    document.title = prevTitle
    if (descEl && prevDesc !== null) descEl.setAttribute('content', prevDesc)
    if (args.ogImageUrl) {
      if (ogImageEl) {
        if (prevOgImage !== null) ogImageEl.setAttribute('content', prevOgImage)
        else ogImageEl.removeAttribute('content')
      }
      if (twitterImageEl) {
        if (prevTwitterImage !== null) twitterImageEl.setAttribute('content', prevTwitterImage)
        else twitterImageEl.removeAttribute('content')
      }
    }
    snapshots.forEach(({ el, prev }) => {
      if (!el) return
      if (prev === null) el.removeAttribute('content')
      else el.setAttribute('content', prev)
    })
  }
}

const JSON_LD_ID = 'stratezik-jsonld'

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
