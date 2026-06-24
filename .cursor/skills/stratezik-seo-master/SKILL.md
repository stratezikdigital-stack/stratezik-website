---
name: stratezik-seo-master
description: >-
  Enterprise technical SEO implementation and audit for stratezik.com: build-time
  prerendered meta, JSON-LD, sitemap, llms.txt, registry-driven route SEO, and
  release gates. Use when fixing crawl/index issues, SPA meta gaps, schema,
  canonicals, OG/Twitter cards, breadcrumbs, AEO machine-readable files, or
  shipping any new indexable page or blog post. Agent must run npm run build
  automatically when publishing — never defer to the user. Pair with stratezik-seo-aeo for
  strategy/briefs, stratezik-blog-seo-pipeline for editorial content, and
  stratezik-web-performance for App shell / bundle / LCP work.
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
| Body prerender routes | `scripts/prerenderBodyRoutes.ts` | **Single source:** which paths get React HTML in `#root`; build fails if listed route ships empty body |
| Prerender shell | `src/prerender/PrerenderApp.tsx` | Static routes for SSR markup — must mirror indexable `App.tsx` routes |
| Build asserts | `scripts/postbuild-seo.ts` | **Fails build** on `<noscript>` in prerender; homepage body markers (FAQ, services, footer) |
| Critical CSS | `scripts/optimize-critical-css.ts` | Critters inline + deferred CSS/fonts on all prerendered HTML |
| Release gates | `scripts/check-release-gates.ts` | Post-build: no mobile preload of three-vendor/markdown, CSS defer, blog meta split |
| Blog metadata | `src/blog/postsMeta.ts` | Slug, dates, description, keywords, `authorSlug`, FAQs — **no** dynamic imports |
| Blog loaders | `src/blog/postLoaders.ts` | `() => import('./Article')` map — blog routes + prerender only |
| Blog merge | `src/blog/posts.ts` | `getPostBySlug()` joins meta + loader for `BlogPostPage` / prerender |
| Blog author UI | `src/blog/BlogAuthorSignoff.tsx`, `BlogStratezikContactLink.tsx` | Closing byline + contact CTA; **must not** hardcode names/mailto in article TSX |
| Article schema | `src/blog/buildArticleJsonLd.ts` | Article + FAQPage + BreadcrumbList `@graph`; Person author |
| Services data | `src/services/services.ts` (metadata) + `src/services/serviceContent.ts` (raw md bodies, browser-only) | Slug, title, meta, keywords, `serviceType`, `faqEntities` |
| Service schema | `src/services/buildServiceJsonLd.ts` | Service + FAQPage + BreadcrumbList; hub = CollectionPage + ItemList; `areaServed` Toronto/Scarborough/GTA/Canada (GEO) |
| Service rendering | `src/components/ServicePage.tsx` + `src/components/Markdown.tsx` | `/services` hub + `/services/:slug`; markdown renderer strips links to non-existent (Phase 2) routes |
| Organization entity | `src/seo/organization.ts` | Shared publisher node: `sameAs`, `knowsAbout`, `foundingDate` |
| Author entities | `src/seo/authors.ts` + `src/components/AuthorPage.tsx` | Person + ProfilePage schema, `/authors/{slug}` pages |
| AEO files | `public/llms.txt`, generated `llms-full.txt`, `public/llm-context.json` | Machine-readable site index + structured brand facts |
| Free tools hub | `src/free-tools/tools.ts`, `src/components/FreeToolsPage.tsx`, `FREE_TOOLS_SEO` | Lead-magnet index; add new tools to `FREE_TOOLS[]` + registry |
| Lead magnets | `src/components/cheatsheet/*`, `server/cheatsheet/*`, `content/*.md` | Immersive landing + gated guide; API via `api/aeo.ts` actions `guide-lead` / `guide-access` |
| Sheets webhooks | `google-apps-script-*.js`, env `GOOGLE_*_WEBHOOK_URL` | Per-tool Apps Script → spreadsheet tab; see `GOOGLE_SHEETS_SETUP.md` |

**Rule:** Every new indexable route MUST be added to `getAllRouteSeoConfigs()` in the registry. **Also add the path to `scripts/prerenderBodyRoutes.ts` and `src/prerender/PrerenderApp.tsx`** — `npm run build` fails if `#root` is empty on a prerender-body route. Blog posts need **`postsMeta.ts` + `postLoaders.ts`** — registry reads metadata via `postsMeta` only (never `postLoaders` or `posts.ts` on the SEO import path).

**Rule (build):** Full ship is `npm run build` → prerender + `check:release-gates`. Do not skip postbuild or release gates. After deploy, optional: `bash scripts/verify-live-homepage.sh`.

**Rule (free tools):** New lead magnets get a dedicated landing route, registry entry, `FREE_TOOLS[]` card, inline-link guidance in **`stratezik-seo-aeo` §9**, and (if email-gated) Supabase table + optional Sheets script. Nav points to `/free-tools`, not individual tools.

**Rule (Vercel Hobby):** Max **12** serverless functions. Never add standalone files under `api/lib/` as routes — helpers live in `server/` (e.g. `server/cheatsheet/`). Fold new API actions into `api/aeo.ts` with rewrites in `vercel.json`; verify function count after `vercel build --prod`.

**Rule (immersive funnels):** Routes under `/chatgpt-ads-cheat-sheet` (and future similar) skip site `Navbar`/`Footer`/cookie/loader in `App.tsx`. Use unified brand lockup (`/branding/stratezik-lockup.png`), shared `CheatSheetHeader`.

**Rule (services):** Keep service *metadata* (`services.ts`) free of Vite `?raw` imports — `postbuild-seo.ts` imports the registry chain under Node/tsx, which cannot resolve `*.md?raw`. Raw markdown bodies live in `serviceContent.ts` (browser-only, imported by `ServicePage`). Never give the markdown renderer a link to a route that is not in `serviceRoutePaths` / the registry; it strips unresolved internal links to plain text to avoid broken links / soft 404s.

**Agent rule:** After any blog or indexable page change, run `npm run build` in the same session. Include regenerated `public/sitemap.xml` and `public/llms-full.txt` in the commit. Do not mark “published” until build passes and prerender output is verified.

## Release checklist (run before merge)

Copy and complete:

```
SEO release gate:
- [ ] Route in pageSeoRegistry (or postsMeta.ts + postLoaders.ts for blog)
- [ ] Route in prerenderBodyRoutes.ts + PrerenderApp.tsx (build fails on empty #root if omitted)
- [ ] Blog articles: `<BlogAuthorSignoff />` + `<BlogStratezikContactLink>` only — no hardcoded author names or `mailto:` in `*Article.tsx` (`npm run check:blog-author`)
- [ ] npm run build succeeds (postbuild prerender + sitemap + check:release-gates)
- [ ] curl -s URL | grep -E '<title>|canonical|og:title' shows ROUTE values (not homepage)
- [ ] dist/blog/{slug}/index.html exists for new blog slug
- [ ] public/sitemap.xml includes new URL with truthful lastmod
- [ ] llms-full.txt regenerated (build step)
- [ ] FAQ visible copy matches postFaqs.ts / faqEntities
- [ ] shareImagePath set; blog-og-* images are 1200×630
- [ ] Internal links from ≥1 existing post (when editorially fit)
- [ ] Free tools: ≥1 inline contextual link to `/aeo-checker` and/or `/chatgpt-ads-cheat-sheet` when topic matches (`stratezik-seo-aeo` §9)
- [ ] `Dataset` schema includes `license` URL when used (AEO benchmark)
```

## Adding a blog post

1. Add metadata to `src/blog/postsMeta.ts` (slug, title, description, dates, keywords, `authorSlug`, faqEntities).
2. Add matching loader to `src/blog/postLoaders.ts`: `'your-slug': () => import('./YourArticle')`.
3. Add FAQ copy to `src/blog/postFaqs.ts` if using FAQ schema.
4. Set `authorSlug` to a real person in `src/seo/authors.ts`; add a new author there if needed (never invent `sameAs` profiles).
5. **Agent runs** `npm run build` — do **not** hand-edit `public/sitemap.xml`, `llms-full.txt`, or `llm-context.json` (all generated).
6. Verify `dist/blog/{slug}/index.html` title, canonical, and Person author; commit generated files with the post.
7. After deploy, optional: `curl -s https://www.stratezik.com/blog/{slug} | grep -E '<title>|canonical|Person'`

## Adding a non-blog page

1. Add React route in `App.tsx` (+ `PrerenderApp.tsx` if prerendered).
2. Add `RouteSeoConfig` in `pageSeoRegistry.ts` with full meta + jsonLd.
3. Add path to `scripts/prerenderBodyRoutes.ts` (`PRERENDER_BODY_EXACT` or prefix) and matching route in `PrerenderApp.tsx`.
4. If lead magnet: add to `src/free-tools/tools.ts`, wire lead API + Sheets if needed, add `vercel.json` headers (gated routes `noindex`).
5. Build and curl-verify as above (`curl -s URL | grep '<h1'` or check `dist/{path}/index.html` #root is non-empty).

## Adding a lead magnet (checklist)

```
Lead magnet release gate:
- [ ] Landing route indexable; gated/token URL noindex (vercel.json headers + registry robots)
- [ ] FREE_TOOLS[] card + breadcrumb parent → /free-tools where applicable
- [ ] JSON-LD: WebPage + FAQPage (+ DigitalDocument/HowTo if honest)
- [ ] Inline promo component or ≥1 sibling blog link with utm_medium=inline
- [ ] API: single aeo.ts action (not new api/*.ts file); helpers in server/
- [ ] Supabase migration SQL if storing leads; Sheets script + Vercel env if sheet sync
- [ ] Immersive chrome: no site nav/footer on funnel routes
- [ ] npm run build; function count ≤12 on Hobby
```

## Adding a service page

1. Add metadata entry to `services` in `src/services/services.ts` (slug, title, meta, keywords, `serviceType`, `faqEntities` mirroring visible copy).
2. Add the markdown body file under `src/services/content/{slug}.md` and register it in `serviceBodies` in `src/services/serviceContent.ts` (body only — no frontmatter; drop redundant address signature line).
3. Registry auto-maps it via `servicePageSeo` in `pageSeoRegistry.ts` (no manual `RouteSeoConfig` needed for `/services/{slug}`). The `:slug` route in `App.tsx` already renders it.
4. **Agent runs** `npm run build` — prerender, sitemap, `llms-full.txt`, and `llm-context.json` services list regenerate automatically.
5. Verify `dist/services/{slug}/index.html` shows the Service + FAQPage + BreadcrumbList JSON-LD with `areaServed` and a self-referencing canonical.

## Primary SEO (must pass)

- [ ] **Unique title + meta description** per indexable URL
- [ ] **Self-referencing canonical** (`https://www.stratezik.com/...`)
- [ ] **Initial HTML** contains correct meta **and cite-worthy body copy** (postbuild prerender — not JS-only). LLM fetchers typically do not execute JavaScript; verify with `curl -s` without a browser.
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

## LLM fetchers don't run JavaScript

**Policy for stratezik.com:** Answer-engine and assistant fetchers (ChatGPT, Claude, Gemini-class systems, and many research crawlers) **do not reliably run React or download Vite chunks**. They read the **first HTML response** — the same constraint validated in public AEO experiments (decoy HTML vs JS-only “real” content).

| Requirement | Implementation |
|-------------|----------------|
| Cite-worthy facts in first byte | `scripts/postbuild-seo.ts` prerenders `#root` body for indexable routes |
| Meta + schema without hydration | `buildPageHeadHtml.ts` + registry injected at build time |
| Machine-readable site index | `llms.txt`, `llms-full.txt`, `llm-context.json` |
| No regression to JS-only content | `check:release-gates` + **`stratezik-web-performance`** (lazy chunks must not replace prerender body) |

**Never ship** indexable pages where definitions, pricing, stats, or service claims exist **only** after client render or lazy import with no prerender equivalent.

**Verify (no browser):**

```bash
curl -sS "https://www.stratezik.com/blog/{slug}" | grep -i "key phrase you expect cited"
curl -sS "https://www.stratezik.com/services/seo-aeo" | grep -i "Toronto"
```

Strategy and audit framing: **`stratezik-seo-aeo` §4**.

## Roadmap / deliberate decisions (not yet implemented)

These are intentional next steps. Do **not** start them silently — confirm scope with the user, then implement and update this skill.

| Item | Why deferred | Trigger to do it |
|------|--------------|------------------|
| **Full SSR/ISR (article body in HTML)** | Build-time prerender already ships full article body in `dist/` for blog and services; further SSR only needed if prerender coverage gaps appear | When a new template ships content JS-only without postbuild body |
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

# Post-build gates (also run automatically at end of build)
npm run check:release-gates

# Live homepage prerender smoke
bash scripts/verify-live-homepage.sh

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
| New post 404 in sitemap | Missing `postsMeta.ts` / `postLoaders.ts` entry or build not run |
| check:release-gates fails | See `stratezik-web-performance` — preload/CSS/App import regression |
| FAQ schema mismatch | Sync `postFaqs.ts` with on-page FAQ |
| Broken diagram on blog | Asset path must be `/illustrations/...` not `/blog/...` |
| Duplicate FAQ on wrong URL | Do not inject home FAQ outside `/`; use registry only |
| Vercel deploy fails: 12 functions | Move `api/lib/*` helpers to `server/`; merge endpoints into `api/aeo.ts` |
| GSC Dataset: missing license | Add `license` URL to Dataset node in JSON-LD builder |
| Logo misaligned on cheat sheet | Use `/branding/stratezik-lockup.png`, not favicon + wordmark stitch |

## Pairing

- **Strategy / SERP / AEO brief**: `stratezik-seo-aeo`
- **GSC data scout**: `stratezik-gsc-intelligence`
- **New blog end-to-end**: `stratezik-blog-seo-pipeline`
- **App shell / PageSpeed / bundles**: `stratezik-web-performance`
- **This skill**: implementation, audits, and release gates

## Reference

Detailed audit spine (intent, off-site, AEO copy): see [../stratezik-seo-aeo/SKILL.md](../stratezik-seo-aeo/SKILL.md).
