---
name: stratezik-seo-master
description: >-
  Enterprise technical SEO implementation and audit for stratezik.com: build-time
  prerendered meta, JSON-LD, sitemap, llms.txt, registry-driven route SEO, and
  release gates. Use when fixing crawl/index issues, SPA meta gaps, schema,
  canonicals, OG/Twitter cards, breadcrumbs, AEO machine-readable files, or
  shipping any new indexable page or blog post. Agent must run npm run build
  automatically when publishing — never defer to the user. Pair with stratezik-seo-aeo for
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
| Blog data | `src/blog/posts.ts` | Slug, dates, description, keywords, `shareImagePath`, `authorSlug`, FAQs |
| Article schema | `src/blog/buildArticleJsonLd.ts` | Article + FAQPage + BreadcrumbList `@graph`; Person author |
| Services data | `src/services/services.ts` (metadata) + `src/services/serviceContent.ts` (raw md bodies, browser-only) | Slug, title, meta, keywords, `serviceType`, `faqEntities` |
| Service schema | `src/services/buildServiceJsonLd.ts` | Service + FAQPage + BreadcrumbList; hub = CollectionPage + ItemList; `areaServed` Toronto/Scarborough/GTA/Canada (GEO) |
| Service rendering | `src/components/ServicePage.tsx` + `src/components/Markdown.tsx` | `/services` hub + `/services/:slug`; markdown renderer strips links to non-existent (Phase 2) routes |
| Organization entity | `src/seo/organization.ts` | Shared publisher node: `sameAs`, `knowsAbout`, `foundingDate` |
| Author entities | `src/seo/authors.ts` + `src/components/AuthorPage.tsx` | Person + ProfilePage schema, `/authors/{slug}` pages |
| AEO files | `public/llms.txt`, generated `llms-full.txt`, `public/llm-context.json` | Machine-readable site index + structured brand facts |

**Rule:** Every new indexable route MUST be added to `getAllRouteSeoConfigs()` in the registry. Blog posts only need `posts.ts` — registry maps them automatically.

**Rule (services):** Keep service *metadata* (`services.ts`) free of Vite `?raw` imports — `postbuild-seo.ts` imports the registry chain under Node/tsx, which cannot resolve `*.md?raw`. Raw markdown bodies live in `serviceContent.ts` (browser-only, imported by `ServicePage`). Never give the markdown renderer a link to a route that is not in `serviceRoutePaths` / the registry; it strips unresolved internal links to plain text to avoid broken links / soft 404s.

**Agent rule:** After any blog or indexable page change, run `npm run build` in the same session. Include regenerated `public/sitemap.xml` and `public/llms-full.txt` in the commit. Do not mark “published” until build passes and prerender output is verified.

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

1. Add entry to `src/blog/posts.ts` (slug, title, description, dates, keywords, shareImagePath, `authorSlug`, faqEntities, Component).
2. Add FAQ copy to `src/blog/postFaqs.ts` if using FAQ schema.
3. Set `authorSlug` to a real person in `src/seo/authors.ts`; add a new author there if needed (never invent `sameAs` profiles).
4. **Agent runs** `npm run build` — do **not** hand-edit `public/sitemap.xml`, `llms-full.txt`, or `llm-context.json` (all generated).
5. Verify `dist/blog/{slug}/index.html` title, canonical, and Person author; commit generated files with the post.
6. After deploy, optional: `curl -s https://www.stratezik.com/blog/{slug} | grep -E '<title>|canonical|Person'`

## Adding a non-blog page

1. Add React route in `App.tsx`.
2. Add `RouteSeoConfig` in `pageSeoRegistry.ts` with full meta + jsonLd.
3. Build and curl-verify as above.

## Adding a service page

1. Add metadata entry to `services` in `src/services/services.ts` (slug, title, meta, keywords, `serviceType`, `faqEntities` mirroring visible copy).
2. Add the markdown body file under `src/services/content/{slug}.md` and register it in `serviceBodies` in `src/services/serviceContent.ts` (body only — no frontmatter; drop redundant address signature line).
3. Registry auto-maps it via `servicePageSeo` in `pageSeoRegistry.ts` (no manual `RouteSeoConfig` needed for `/services/{slug}`). The `:slug` route in `App.tsx` already renders it.
4. **Agent runs** `npm run build` — prerender, sitemap, `llms-full.txt`, and `llm-context.json` services list regenerate automatically.
5. Verify `dist/services/{slug}/index.html` shows the Service + FAQPage + BreadcrumbList JSON-LD with `areaServed` and a self-referencing canonical.

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
- [ ] **Person author** on posts (visible byline + Person schema linked to `/authors/{slug}#person`)
- [ ] **Org entity**: `foundingDate`, `sameAs`, `knowsAbout` (Wikipedia/Wikidata) on publisher + `index.html` schema
- [ ] **llms.txt** + **llms-full.txt** + **llm-context.json** (structured brand facts) for AI crawlers
- [ ] **Keywords** in registry (JSON-LD + meta where configured)

## Advanced / enterprise

- [ ] **No homepage meta leakage** on deep links (verify raw curl, Rich Results, LinkedIn debugger)
- [ ] **Entity consistency**: NAP, org schema in `index.html` body, GBP link in sameAs
- [ ] **OG dimensions**: brand 1024×625; `blog-og-*` 1200×630 via `ogImageDimensionsForPath`
- [ ] **Self-hosted fonts**: woff2 in `public/fonts/` (latin + latin-ext, variable), `fonts.css` linked, above-fold weights preloaded with `fetchpriority`, no Google Fonts CDN `<link>`. Regenerate with `node scripts/fetch-fonts.mjs`
- [ ] **SPA navigation** does not duplicate or orphan JSON-LD (`RouteSeoManager` cleanup)
- [ ] **No hidden/cloaked SEO blocks** in DOM
- [ ] **Static assets** for illustrations under `/public/illustrations/` (not `/blog/*` — SPA rewrite conflict)
- [ ] **Preview/staging** noindex if ever exposed (production only indexed today)

## Roadmap / deliberate decisions (not yet implemented)

These are intentional next steps. Do **not** start them silently — confirm scope with the user, then implement and update this skill.

| Item | Why deferred | Trigger to do it |
|------|--------------|------------------|
| **Full SSR/ISR (article body in HTML)** | Current prerender already ships meta + JSON-LD in first packet; body SSR likely means a framework migration (Next.js) | When zero-JS full-text indexing or strict crawl-budget needs justify a migration |
| **`/services/*/*` child focus-area pages** | Phase 1 ships the hub + 8 parent service pages; child routes (e.g. `technical-seo`, `meta-ads`) are Phase 2 content. Parent-page links to them are stripped by the markdown renderer until they exist | When Phase 2 child content is written |
| **Author E-E-A-T hardening** | `authors.ts` exists; needs real full name, headshot (`imagePath`), and verified personal LinkedIn in `sameAs` | When the author confirms profile details — never fabricate `sameAs` |

**Done (2026-05):** `/services` hub + 8 parent service pages (`paid-search`, `paid-social`, `seo-aeo`, `google-business-profile`, `social-media-marketing`, `brand-strategy`, `web-design`, `ai-agents`) with Service/CollectionPage + FAQPage + BreadcrumbList schema, GEO `areaServed` (Toronto/Scarborough/GTA), prerender, sitemap, and llm-context entries.

## Off-page / citational footprint

Off-page is **operational marketing work**, tracked here as a standing playbook (strategy lives in `stratezik-seo-aeo` §5). For LLM/AEO trust:

- **Digital PR**: earn contextual co-mentions ("Stratezik" + "technical SEO" + "Canada") on reputable publications, even `nofollow`.
- **Third-party validation**: steady, keyword-rich review velocity on **Google Business Profile**, **Clutch**, **G2**.
- **Developer footprint**: public **GitHub** tools/configs reinforce authenticity for developer-focused models.
- Keep NAP and brand facts identical to `index.html` schema and `llm-context.json`.

## Validation commands

```bash
npm run build

# Blog post — must show article title, not homepage
curl -sS "https://www.stratezik.com/blog/chatgpt-ads-2026-guide" | grep -E '<title>|rel="canonical"|og:title|article:published'

# Blog index
curl -sS "https://www.stratezik.com/blog" | grep -E '<title>|rel="canonical"'

# Author entity
curl -sS "https://www.stratezik.com/authors/dave" | grep -E '<title>|ProfilePage|"Person"'

# Service page — Service schema + GEO areaServed, not homepage
curl -sS "https://www.stratezik.com/services/seo-aeo" | grep -E '<title>|rel="canonical"|"Service"|areaServed|FAQPage'

# LLM files
curl -sS "https://www.stratezik.com/llms.txt" | head
curl -sS "https://www.stratezik.com/llms-full.txt" | head
curl -sS "https://www.stratezik.com/llm-context.json" | head
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
