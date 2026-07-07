import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildRouteHeadHtml } from '../src/seo/buildPageHeadHtml'
import { getAllRouteSeoConfigs } from '../src/seo/pageSeoRegistry'
import { SITE_ORIGIN } from '../src/seo/siteConfig'
import { ORG_KNOWS_ABOUT, ORG_SAME_AS } from '../src/seo/organization'
import { serviceChildren as serviceChildDefs, services as serviceDefs } from '../src/services/services'
import {
  assertPrerenderBody,
  shouldPrerenderBody,
} from './prerenderBodyRoutes'
import {
  renderRouteBodyHtml,
  replaceRootInner,
} from './prerender-static'
import { pingSearchEngines } from './pingSearchEngines'
import { indexNowPathsFromConfigs, submitIndexNow } from './submitIndexNow'
import { optimizeCriticalCss } from './optimize-critical-css'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const SEO_START = '<!-- STRATEZIK_SEO_START -->'
const SEO_END = '<!-- STRATEZIK_SEO_END -->'

function replaceSeoBlock(html: string, headFragment: string): string {
  const pattern = new RegExp(`${SEO_START}[\\s\\S]*?${SEO_END}`, 'm')
  if (!pattern.test(html)) {
    throw new Error('Missing STRATEZIK_SEO markers in index.html')
  }
  return html.replace(pattern, `${SEO_START}\n${headFragment}\n    ${SEO_END}`)
}

function assertNoNoscript(routePath: string, html: string): void {
  if (/<noscript\b/i.test(html)) {
    throw new Error(`[seo] P0 violation: <noscript> found in prerendered HTML for ${routePath}`)
  }
}

/** Homepage must ship PrerenderHomePage body, not legacy noscript fallback. */
function assertHomePrerenderBody(html: string): void {
  const required = [
    'Frequently asked questions',
    'Latest insights',
    '/services/ai-agents',
    '/services/web-design',
    'Integrated channels · accountable measurement · pragmatic creative',
  ]
  const forbidden = ['<noscript', 'Our Services', 'All rights reserved']
  for (const text of required) {
    if (!html.includes(text)) {
      throw new Error(`[seo] Homepage prerender missing: ${text}`)
    }
  }
  for (const text of forbidden) {
    if (html.includes(text)) {
      throw new Error(`[seo] Homepage prerender stale marker: ${text}`)
    }
  }
}

async function writeRouteHtml(baseHtml: string, routePath: string, headFragment: string): Promise<void> {
  let html = replaceSeoBlock(baseHtml, headFragment)

  if (shouldPrerenderBody(routePath)) {
    try {
      const bodyHtml = await renderRouteBodyHtml(routePath)
      html = replaceRootInner(html, bodyHtml)
      console.log(`[seo] body prerendered ${routePath}`)
    } catch (err) {
      console.error(`[seo] body prerender failed ${routePath}:`, err)
      throw err
    }
  }

  const outFile =
    routePath === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, routePath.slice(1), 'index.html')

  assertNoNoscript(routePath, html)
  if (routePath === '/') assertHomePrerenderBody(html)
  assertPrerenderBody(routePath, html)

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html, 'utf8')
}

function latestDate(configs: ReturnType<typeof getAllRouteSeoConfigs>): string {
  const dates = configs.flatMap((c) => [c.dateModified, c.datePublished].filter(Boolean) as string[])
  return dates.sort().reverse()[0] ?? new Date().toISOString().slice(0, 10)
}

function generateSitemap(configs: ReturnType<typeof getAllRouteSeoConfigs>): string {
  const urls = configs
    .filter((config) => config.includeInSitemap !== false)
    .map((config) => {
      const loc = config.path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${config.path}`
      const lastmod = config.dateModified ?? config.datePublished ?? latestDate(configs)
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${config.sitemapChangefreq}</changefreq>
    <priority>${config.sitemapPriority.toFixed(2)}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`
}

async function main(): Promise<void> {
  const baseHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    throw new Error('dist/index.html not found — run vite build first')
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')
  const configs = getAllRouteSeoConfigs()

  for (const config of configs) {
    const headFragment = buildRouteHeadHtml(config)
    await writeRouteHtml(baseHtml, config.path, headFragment)
    console.log(`[seo] head prerendered ${config.path}`)
  }

  await optimizeCriticalCss(distDir)

  const sitemap = generateSitemap(configs)
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemap, 'utf8')
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`[seo] sitemap.xml (${configs.length} URLs)`)

  const blogPosts = configs.filter(
    (c) => c.path.startsWith('/blog/') && c.path !== '/blog' && c.includeInSitemap !== false,
  )
  const toolPages = configs.filter((c) =>
    ['/aeo-checker', '/gbp-audit', '/toronto-startup-website-audit-2026', '/growth-credit', '/chatgpt-ads-cheat-sheet', '/free-tools'].includes(c.path),
  )
  const llmsFull = `# Stratezik — extended LLM index

> Toronto digital marketing agency. Canonical site: ${SITE_ORIGIN}

## Core pages

- [Home](${SITE_ORIGIN}/): Digital marketing services, SEO, PPC, strategy, contact
- [Services hub](${SITE_ORIGIN}/services): All digital marketing services in Toronto and the GTA
- [Blog index](${SITE_ORIGIN}/blog): Articles on SEO, AEO, local search, paid media
- [Careers](${SITE_ORIGIN}/careers): Toronto team hiring

## Free tools & offers (${toolPages.length})

${toolPages
  .map(
    (page) =>
      `### ${page.title.replace(/\s*\|\s*Stratezik.*$/, '').trim()}\n- URL: ${SITE_ORIGIN}${page.path}\n- Summary: ${page.description}\n- Updated: ${page.dateModified ?? page.datePublished ?? 'n/a'}`,
  )
  .join('\n\n')}

## Services (${serviceDefs.length})

Service areas: Toronto, Scarborough, and the Greater Toronto Area (GTA), Canada.

${serviceDefs
  .map((svc) => {
    const kids = serviceChildDefs.filter((c) => c.parentSlug === svc.slug)
    const kidLines = kids
      .map((c) => `  - [${c.primaryKeyword}](${SITE_ORIGIN}/services/${c.parentSlug}/${c.slug}): ${c.metaDescription}`)
      .join('\n')
    return `### ${svc.title.replace(/\| Stratezik$/, '').trim()}\n- URL: ${SITE_ORIGIN}/services/${svc.slug}\n- Summary: ${svc.metaDescription}${kids.length ? `\n- Focus areas:\n${kidLines}` : ''}`
  })
  .join('\n\n')}

## Blog articles (${blogPosts.length})

${blogPosts
  .map(
    (post) =>
      `### ${post.title.replace(/\| Stratezik Blog$/, '').trim()}\n- URL: ${SITE_ORIGIN}${post.path}\n- Summary: ${post.description}\n- Published: ${post.datePublished ?? 'n/a'}\n- Updated: ${post.dateModified ?? post.datePublished ?? 'n/a'}`,
  )
  .join('\n\n')}

## Contact

- Email: dave@stratezik.com
- Phone: +1-437-525-4772
`

  fs.writeFileSync(path.join(rootDir, 'public', 'llms-full.txt'), llmsFull, 'utf8')
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFull, 'utf8')
  console.log('[seo] llms-full.txt')

  // Keep the structured brand fact sheet in sync with the org entity and posts.
  const baseContextPath = path.join(rootDir, 'public', 'llm-context.json')
  if (fs.existsSync(baseContextPath)) {
    const context = JSON.parse(fs.readFileSync(baseContextPath, 'utf8'))
    context.sameAs = ORG_SAME_AS
    context.knowsAbout = ORG_KNOWS_ABOUT
    context.sitemap = `${SITE_ORIGIN}/sitemap.xml`
    context.articles = blogPosts.map((post) => ({
      title: post.title.replace(/\| Stratezik Blog$/, '').trim(),
      url: `${SITE_ORIGIN}${post.path}`,
    }))
    context.serviceAreas = ['Toronto', 'Scarborough', 'Greater Toronto Area', 'Canada']
    context.services = serviceDefs.map((svc) => ({
      name: svc.title.replace(/\| Stratezik$/, '').trim(),
      url: `${SITE_ORIGIN}/services/${svc.slug}`,
      summary: svc.metaDescription,
      focusAreas: serviceChildDefs
        .filter((c) => c.parentSlug === svc.slug)
        .map((c) => ({
          name: c.title.replace(/\| Stratezik$/, '').trim(),
          url: `${SITE_ORIGIN}/services/${c.parentSlug}/${c.slug}`,
          summary: c.metaDescription,
        })),
    }))
    context.tools = toolPages.map((page) => ({
      name: page.title.replace(/\s*\|\s*Stratezik.*$/, '').trim(),
      url: `${SITE_ORIGIN}${page.path}`,
      summary: page.description,
      type: page.path === '/aeo-checker' ? 'AEO readiness checker' : page.path === '/growth-credit' ? 'Growth credit offer' : 'Research report',
    }))
    context.researchSeries = [
      {
        name: 'Toronto AI Citation Tracker',
        hubUrl: `${SITE_ORIGIN}/blog/toronto-ai-citation-tracker`,
        cadence: 'monthly',
        plainTextIndex: `${SITE_ORIGIN}/llms-full.txt`,
        latestEdition: {
          month: 'July 2026',
          url: `${SITE_ORIGIN}/blog/toronto-ai-citation-tracker-july-2026`,
          collectionDate: '2026-07-03',
          dataPoints: 200,
          headlineFindings: [
            '89% of 200 AI answers named a specific Toronto or GTA business',
            'Google AI Mode 98%, Claude 94%, ChatGPT 90%, Perplexity 74% local naming',
            'Perplexity resolved several Scarborough queries to the United Kingdom',
          ],
        },
      },
      {
        name: 'Toronto ChatGPT Ads Index',
        hubUrl: `${SITE_ORIGIN}/blog/toronto-chatgpt-ads-index`,
        cadence: 'monthly',
        type: 'living_index',
        latestEdition: {
          month: 'July 2026',
          url: `${SITE_ORIGIN}/blog/toronto-chatgpt-ads-index`,
          industries: 18,
          headlineFindings: [
            '48% of 90 commercial buyer questions carried a ChatGPT ad in June baseline',
            'Fitness, pest control, and electrical showed zero ads in sample',
            '59% of commercial ads were on-target vs 36% in local-service categories',
          ],
        },
        relatedSeries: `${SITE_ORIGIN}/blog/toronto-ai-citation-tracker`,
      },
    ]
    context.generated = new Date().toISOString().slice(0, 10)
    const json = `${JSON.stringify(context, null, 2)}\n`
    fs.writeFileSync(baseContextPath, json, 'utf8')
    fs.writeFileSync(path.join(distDir, 'llm-context.json'), json, 'utf8')
    console.log('[seo] llm-context.json')
  }

  await pingSearchEngines(`${SITE_ORIGIN}/sitemap.xml`)
  await submitIndexNow(indexNowPathsFromConfigs(configs))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
