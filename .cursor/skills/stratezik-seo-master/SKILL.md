---
name: stratezik-seo-master
description: >-
  Enterprise technical SEO implementation and audit for stratezik.com: build-time
  prerendered meta, JSON-LD, sitemap, llms.txt, registry-driven route SEO, and
  release gates. Use when fixing crawl/index issues, SPA meta gaps, schema,
  canonicals, OG/Twitter cards, breadcrumbs, AEO machine-readable files, or
  shipping any new indexable page or blog post. Pair with stratezik-seo-aeo for
  strategy/briefs and stratezik-blog-seo-pipeline for editorial content.
---

# Stratezik SEO Master

## Role

Own **implementation-grade** SEO for stratezik.com (Vite SPA on Vercel). Strategy and content briefs stay in **`stratezik-seo-aeo`**; prose in **`stratezik-blog-writing`**. This skill is the **engineering playbook** — no client-only meta for indexable routes.

## Architecture (do not bypass)

| Layer | Location | Purpose |
|-------|----------|---------|
| Route registry | `src/seo/pageSeoRegistry.ts` | Single source: title, description, OG, dates, JSON-LD, sitemap priority |
| Head HTML builder | `src/seo/buildPageHeadHtml.ts` | Server-visible `<head>` fragment |
| Client hydration | `src/seo/RouteSeoManager.tsx` | Mirrors registry on SPA navigation |
| Build prerender | `scripts/postbuild-seo.ts` | Writes `dist/{route}/index.html` + `sitemap.xml` + `llms-full.txt` |
| Blog data | `src/blog/posts.ts` | Slug, dates, description, keywords, `shareImagePath`, FAQs |
| Article schema | `src/blog/buildArticleJsonLd.ts` | Article + FAQPage + BreadcrumbList `@graph` |
| AEO files | `public/llms.txt`, generated `llms-full.txt` | Machine-readable site index |

**Rule:** Every new indexable route MUST be added to `getAllRouteSeoConfigs()` in the registry. Blog posts only need `posts.ts` — registry maps them automatically.

## Release checklist (run before merge)

Copy and complete:

```
SEO release gate:
- [ ] Route in pageSeoRegistry (or posts.ts for blog)
- [ ] npm run build succeeds (postbuild prerender + sitemap)
- [ ] curl -s URL | grep -E '<title>|canonical|og:title' shows ROUTE values (not homepage)
- [ ] dist/blog/{slug}/index.html exists for new blog slug
- [ ] public/sitemap.xml includes new URL with truthful lastmod
- [ ] llms-full.txt regenerated (build step)
- [ ] FAQ visible copy matches postFaqs.ts / faqEntities
- [ ] shareImagePath set; blog-og-* images are 1200×630
- [ ] Internal links from ≥1 existing post (when editorially fit)
```

## Adding a blog post

1. Add entry to `src/blog/posts.ts` (slug, title, description, dates, keywords, shareImagePath, faqEntities, Component).
2. Add FAQ copy to `src/blog/postFaqs.ts` if using FAQ schema.
3. Run `npm run build` — do **not** hand-edit `public/sitemap.xml`.
4. Verify prerender: `curl -s https://www.stratezik.com/blog/{slug} | head -40`

## Adding a non-blog page

1. Add React route in `App.tsx`.
2. Add `RouteSeoConfig` in `pageSeoRegistry.ts` with full meta + jsonLd.
3. Build and curl-verify as above.

## Primary SEO (must pass)

- [ ] **Unique title + meta description** per indexable URL
- [ ] **Self-referencing canonical** (`https://www.stratezik.com/...`)
- [ ] **Initial HTML** contains correct meta (postbuild prerender — not JS-only)
- [ ] **Single H1** per page template
- [ ] **robots.txt** allows `/`; sitemap URL declared
- [ ] **sitemap.xml** auto-generated, all indexable routes, accurate `lastmod`

## Mid-tier SEO (standard on stratezik.com)

- [ ] **Open Graph**: title, description, url, type, image, width, height, alt, locale, site_name
- [ ] **Twitter**: card, site, title, description, image, alt
- [ ] **Article OG** on posts: `article:published_time`, `article:modified_time`, author, section
- [ ] **JSON-LD**: Article + FAQPage + BreadcrumbList on posts; Blog + BlogPosting on index; FAQ on home
- [ ] **BreadcrumbList** in schema (visible breadcrumb nav on posts)
- [ ] **llms.txt** + **llms-full.txt** for AI crawlers
- [ ] **Keywords** in registry (JSON-LD + meta where configured)

## Advanced / enterprise

- [ ] **No homepage meta leakage** on deep links (verify raw curl, Rich Results, LinkedIn debugger)
- [ ] **Entity consistency**: NAP, org schema in `index.html` body, GBP link in sameAs
- [ ] **OG dimensions**: brand 1024×625; `blog-og-*` 1200×630 via `ogImageDimensionsForPath`
- [ ] **SPA navigation** does not duplicate or orphan JSON-LD (`RouteSeoManager` cleanup)
- [ ] **No hidden/cloaked SEO blocks** in DOM
- [ ] **Static assets** for illustrations under `/public/illustrations/` (not `/blog/*` — SPA rewrite conflict)
- [ ] **Preview/staging** noindex if ever exposed (production only indexed today)

## Validation commands

```bash
npm run build

# Blog post — must show article title, not homepage
curl -sS "https://www.stratezik.com/blog/chatgpt-ads-2026-guide" | grep -E '<title>|rel="canonical"|og:title|article:published'

# Blog index
curl -sS "https://www.stratezik.com/blog" | grep -E '<title>|rel="canonical"'

# LLM files
curl -sS "https://www.stratezik.com/llms.txt" | head
curl -sS "https://www.stratezik.com/llms-full.txt" | head
```

## Common failures

| Symptom | Fix |
|---------|-----|
| Social preview shows homepage title | Deploy without postbuild; run full `npm run build` |
| New post 404 in sitemap | Missing `posts.ts` entry or build not run |
| FAQ schema mismatch | Sync `postFaqs.ts` with on-page FAQ |
| Broken diagram on blog | Asset path must be `/illustrations/...` not `/blog/...` |
| Duplicate FAQ on wrong URL | Do not inject home FAQ outside `/`; use registry only |

## Pairing

- **Strategy / SERP / AEO brief**: `stratezik-seo-aeo`
- **GSC data scout**: `stratezik-gsc-intelligence`
- **New blog end-to-end**: `stratezik-blog-seo-pipeline`
- **This skill**: implementation, audits, and release gates

## Reference

Detailed audit spine (intent, off-site, AEO copy): see [../stratezik-seo-aeo/SKILL.md](../stratezik-seo-aeo/SKILL.md).
