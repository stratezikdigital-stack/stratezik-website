/**
 * Release gate: blog article bodies must not hardcode author names or mailto CTAs.
 * Author display comes from src/seo/authors.ts via BlogAuthorSignoff / BlogPostPage.
 * Business contact CTAs use BlogStratezikContactLink (/#contact-form).
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(process.cwd(), 'src/blog')

const ARTICLE_SUFFIX = 'Article.tsx'

/** Patterns that indicate copy-pasted legacy author/contact blocks in article TSX. */
const FORBIDDEN: Array<{ label: string; pattern: RegExp }> = [
  { label: 'legacy author name "Dave"', pattern: /<strong[^>]*>\s*Dave\s*<\/strong>/i },
  { label: 'dave@stratezik.com in article body', pattern: /dave@stratezik\.com/i },
  { label: 'mailto: link in article (use BlogStratezikContactLink)', pattern: /mailto:/i },
  { label: 'hardcoded sign-off address line', pattern: /2466 Eglinton Ave E/i },
]

function main(): void {
  const files = readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith(ARTICLE_SUFFIX))
    .sort()

  const violations: string[] = []

  for (const file of files) {
    const path = join(BLOG_DIR, file)
    const text = readFileSync(path, 'utf8')

    for (const { label, pattern } of FORBIDDEN) {
      if (pattern.test(text)) {
        violations.push(`${file}: ${label}`)
      }
    }
  }

  if (violations.length > 0) {
    console.error('[blog-author] Hardcoded author/contact copy found in article TSX:\n')
    for (const v of violations) {
      console.error(`  - ${v}`)
    }
    console.error(
      '\nFix: use <BlogAuthorSignoff /> and <BlogStratezikContactLink> from src/blog/.',
    )
    console.error('Author identity lives in src/seo/authors.ts only.\n')
    process.exit(1)
  }

  console.log(`[blog-author] OK — ${files.length} article files checked`)
}

main()
