import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { FC } from 'react'
import { PrerenderApp } from '../src/prerender/PrerenderApp'
import { getPostBySlug } from '../src/blog/posts'
import { loadPrerenderServiceBodies } from './loadPrerenderServiceBodies'

const CONTENT_ROUTE_PREFIXES = ['/blog', '/authors', '/services', '/careers', '/aeo-checker', '/gbp-audit', '/toronto-startup-website-audit-2026', '/growth-credit', '/chatgpt-ads-cheat-sheet']

export function shouldPrerenderBody(path: string): boolean {
  if (path === '/') return true
  if (path.startsWith('/chatgpt-ads-cheat-sheet/guide')) return false
  return CONTENT_ROUTE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

let cachedBodies: ReturnType<typeof loadPrerenderServiceBodies> | undefined

function getBodies() {
  if (!cachedBodies) cachedBodies = loadPrerenderServiceBodies()
  return cachedBodies
}

async function resolveBlogArticleComponent(pathname: string): Promise<FC | undefined> {
  const match = pathname.match(/^\/blog\/([^/]+)$/)
  if (!match) return undefined
  const post = getPostBySlug(match[1])
  if (!post) return undefined
  const mod = await post.loadComponent()
  return mod.default
}

/** Full React markup for crawlers (replaced client-side on hydration via createRoot). */
export async function renderRouteBodyHtml(pathname: string): Promise<string> {
  const blogArticleComponent = await resolveBlogArticleComponent(pathname)
  return renderToStaticMarkup(
    React.createElement(PrerenderApp, { pathname, bodies: getBodies(), blogArticleComponent }),
  )
}

export function replaceRootInner(html: string, innerHtml: string): string {
  return html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${innerHtml}</div>`)
}
