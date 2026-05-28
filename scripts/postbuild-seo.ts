import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildRouteHeadHtml } from '../src/seo/buildPageHeadHtml'
import { getAllRouteSeoConfigs } from '../src/seo/pageSeoRegistry'
import { SITE_ORIGIN } from '../src/seo/siteConfig'

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

function writeRouteHtml(baseHtml: string, routePath: string, headFragment: string): void {
  const html = replaceSeoBlock(baseHtml, headFragment)
  const outFile =
    routePath === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, routePath.slice(1), 'index.html')

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, html, 'utf8')
}

function latestDate(configs: ReturnType<typeof getAllRouteSeoConfigs>): string {
  const dates = configs.flatMap((c) => [c.dateModified, c.datePublished].filter(Boolean) as string[])
  return dates.sort().reverse()[0] ?? new Date().toISOString().slice(0, 10)
}

function generateSitemap(configs: ReturnType<typeof getAllRouteSeoConfigs>): string {
  const urls = configs
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

function main(): void {
  const baseHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    throw new Error('dist/index.html not found — run vite build first')
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')
  const configs = getAllRouteSeoConfigs()

  for (const config of configs) {
    const headFragment = buildRouteHeadHtml(config)
    writeRouteHtml(baseHtml, config.path, headFragment)
    console.log(`[seo] prerendered ${config.path}`)
  }

  const sitemap = generateSitemap(configs)
  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemap, 'utf8')
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
  console.log(`[seo] sitemap.xml (${configs.length} URLs)`)

  const blogPosts = configs.filter((c) => c.path.startsWith('/blog/') && c.path !== '/blog')
  const llmsFull = `# Stratezik — extended LLM index

> Toronto digital marketing agency. Canonical site: ${SITE_ORIGIN}

## Core pages

- [Home](${SITE_ORIGIN}/): Digital marketing services, SEO, PPC, strategy, contact
- [Blog index](${SITE_ORIGIN}/blog): Articles on SEO, AEO, local search, paid media
- [Careers](${SITE_ORIGIN}/careers): Toronto team hiring

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
}

main()
