import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distIndexPath = path.join(rootDir, 'dist/index.html')

function fail(message: string): never {
  console.error(`[release-gates] FAIL: ${message}`)
  process.exit(1)
}

function ok(message: string): void {
  console.log(`[release-gates] OK: ${message}`)
}

/** Homepage must not eagerly preload desktop-only or route-only chunks. */
function checkMobileBundlePreloads(html: string): void {
  if (/modulepreload[^>]+three-vendor/i.test(html)) {
    fail('dist/index.html preloads three-vendor — keep 3D in lazy DesktopExperience only')
  }
  if (/modulepreload[^>]+markdown/i.test(html)) {
    fail('dist/index.html preloads markdown — keep article loaders in postLoaders.ts off the SEO path')
  }
  ok('homepage does not preload three-vendor or markdown')
}

/** Critters/postbuild must defer the main Tailwind bundle. */
function checkCssDefer(html: string): void {
  if (/<link rel="stylesheet" href="\/assets\/index-[^"]+\.css"/i.test(html)) {
    fail('main Tailwind CSS is render-blocking in dist/index.html — fix scripts/optimize-critical-css.ts')
  }
  if (!/<link rel="preload" href="\/assets\/index-[^"]+\.css" as="style" onload=/i.test(html)) {
    fail('main CSS must use rel="preload" as="style" with onload defer in dist/index.html')
  }
  ok('main CSS is deferred (preload + onload)')
}

/** Metadata and heavy chunks stay on separate import paths. */
function checkBlogMetaSplit(): void {
  const registryPath = path.join(rootDir, 'src/seo/pageSeoRegistry.ts')
  const registry = fs.readFileSync(registryPath, 'utf8')

  if (/from ['"].*postLoaders/.test(registry)) {
    fail('pageSeoRegistry.ts must not import postLoaders.ts')
  }
  if (!/from ['"].*postsMeta/.test(registry)) {
    fail('pageSeoRegistry.ts must import blog metadata from postsMeta.ts only')
  }
  if (/from ['"].*\/blog\/posts['"]/.test(registry)) {
    fail('pageSeoRegistry.ts must not import src/blog/posts.ts (pulls loaders into SEO graph)')
  }

  const postsMetaPath = path.join(rootDir, 'src/blog/postsMeta.ts')
  const postsMeta = fs.readFileSync(postsMetaPath, 'utf8')
  if (/import\s*\(\s*['"]\.\//.test(postsMeta)) {
    fail('postsMeta.ts must not contain dynamic import() — register loaders in postLoaders.ts')
  }

  const appPath = path.join(rootDir, 'src/App.tsx')
  const app = fs.readFileSync(appPath, 'utf8')
  const forbiddenStaticImports = [
    "from './three/world/WorldCanvas'",
    "from './components/Loader'",
    "from './components/CustomCursor'",
    "from './components/MoveCounterHUD'",
    "from './three/world/SmoothScroll'",
  ]
  for (const imp of forbiddenStaticImports) {
    if (app.includes(imp)) {
      fail(`App.tsx must not statically import ${imp} — use lazy DesktopExperience + MobileScrollShell`)
    }
  }

  ok('blog metadata split and App shell imports validated')
}

function main(): void {
  if (!fs.existsSync(distIndexPath)) {
    fail('dist/index.html not found — run npm run build (vite + postbuild-seo) first')
  }

  const html = fs.readFileSync(distIndexPath, 'utf8')
  checkMobileBundlePreloads(html)
  checkCssDefer(html)
  checkBlogMetaSplit()
  console.log('[release-gates] All checks passed')
}

main()
