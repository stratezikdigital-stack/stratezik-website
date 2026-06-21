import fs from 'node:fs'
import path from 'node:path'
import Critters from 'critters'
import { CRITICAL_FONT_FACE_CSS } from './critical-css-constants'

const FONT_STYLE_TAG = `<style id="stratezik-fonts">${CRITICAL_FONT_FACE_CSS}</style>`

function listHtmlFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...listHtmlFiles(full))
    else if (entry.name.endsWith('.html')) files.push(full)
  }
  return files
}

function fixDeferredStylesheets(html: string): string {
  return html
    .replace(
      /<link rel="stylesheet" href="(\/fonts\/fonts\.css)" media="print" onload="this\.rel='stylesheet'">/g,
      `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
    )
    .replace(
      /<link rel="stylesheet" href="(\/fonts\/fonts\.css)" media="print" onload="this\.media='all'">/g,
      `<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'">`,
    )
}

function ensureCriticalFonts(html: string): string {
  if (html.includes('id="stratezik-fonts"')) return html
  const marker = '<!-- Critical fonts (inline) + first-paint shell. Extended faces load async via fonts.css. -->'
  if (html.includes(marker)) {
    return html.replace(marker, `${marker}\n    ${FONT_STYLE_TAG}`)
  }
  return html.replace('</head>', `    ${FONT_STYLE_TAG}\n  </head>`)
}

/** Inline above-the-fold CSS and defer the Vite stylesheet across prerendered HTML. */
export async function optimizeCriticalCss(distDir: string): Promise<void> {
  const critters = new Critters({
    path: distDir,
    publicPath: '/',
    preload: 'swap',
    fonts: false,
    compress: true,
    pruneSource: false,
    inlineFonts: false,
    preloadFonts: false,
    noscriptFallback: false,
    logLevel: 'warn',
  })

  const htmlFiles = listHtmlFiles(distDir)
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8')
    const optimized = ensureCriticalFonts(fixDeferredStylesheets(await critters.process(html)))
    fs.writeFileSync(file, optimized, 'utf8')
  }

  console.log(`[seo] critical CSS inlined (${htmlFiles.length} HTML files)`)
}
