import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PrerenderApp } from '../src/prerender/PrerenderApp'
import { loadPrerenderServiceBodies } from './loadPrerenderServiceBodies'

const CONTENT_ROUTE_PREFIXES = ['/blog', '/authors', '/services', '/careers', '/aeo-checker', '/toronto-startup-website-audit-2026', '/growth-credit']

export function shouldPrerenderBody(path: string): boolean {
  if (path === '/') return true
  return CONTENT_ROUTE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

let cachedBodies: ReturnType<typeof loadPrerenderServiceBodies> | undefined

function getBodies() {
  if (!cachedBodies) cachedBodies = loadPrerenderServiceBodies()
  return cachedBodies
}

/** Full React markup for crawlers (replaced client-side on hydration via createRoot). */
export function renderRouteBodyHtml(pathname: string): string {
  return renderToStaticMarkup(React.createElement(PrerenderApp, { pathname, bodies: getBodies() }))
}

export function replaceRootInner(html: string, innerHtml: string): string {
  return html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${innerHtml}</div>`)
}
