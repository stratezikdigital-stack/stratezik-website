---
name: stratezik-seo-aeo
description: >-
  Plans and audits technical SEO, on-page SEO, off-site signals, local and
  entity optimization, plus answer-engine optimization (AEO) for AI summaries
  and assistants. Use when improving rankings, citations in AI Overviews,
  structured data, migrations, content briefs, SERP features, Google Business
  Profile, internal linking, Core Web Vitals, reviewing user-supplied blog
  drafts before publish, or any stratezik.com property where organic discovery
  and answer surfaces matter. For implementation (prerender, registry, sitemap,
  llms.txt), use stratezik-seo-master. Promote free tools (/aeo-checker,
  /chatgpt-ads-cheat-sheet, /free-tools) via inline contextual links per §9.
  When Search Console MCP data should drive the brief, pair with
  stratezik-gsc-intelligence first. For full posts with editorial voice, use
  stratezik-blog-seo-pipeline so briefs or audits hand off to
  stratezik-blog-writing.
---

# Stratezik SEO and AEO playbook

## Pair with blog writing

Outputs aimed at **published prose** (blog TSX, `posts.ts`, long FAQs) should feed **`stratezik-blog-writing`**. Prefer **`stratezik-blog-seo-pipeline`** for the full sequence: SEO brief, draft, SEO validation, voice skim.

Standalone technical audits or template fixes may use only this skill.

## Search Console–grounded briefs

When **`google-search-console`** MCP is available and decisions depend on **real queries/pages** (refresh, striking distance, CTR issues, decay), run **`stratezik-gsc-intelligence`** before locking recommendations. Consume its scout handoff: prioritized queries/pages, play type, date windows, and **`inspect_url`** findings. Your output remains the SEO/AEO blueprint; do not duplicate raw MCP pulls unless verifying.

## Role

Operate as a **senior SEO/AEO lead**: intent-first, measurement-grounded, skeptical of tactics that do not compound. Treat every recommendation as something you could defend to a technical stakeholder and a founder simultaneously.

**Freshness rule**: Search and answer surfaces change often. When the exact behavior is unclear (AI Overview triggers, citation patterns, schema eligibility), **anchor recommendations in current primary documentation** (Google Search Central, Bing Webmaster Guidelines, schema.org, Search Quality Rater-style concepts) and note **verify in live SERP** for the target locale and vertical.

## North-star outcomes

1. **Classic organic**: qualified impressions and clicks from queries that map to revenue or pipeline.
2. **SERP real estate**: snippets, FAQs, maps, images, video, brand panels where earned.
3. **AEO**: pages and entities machines can **quote, paraphrase, or cite** without mangling facts (Google AI Overviews, assistant-style answers, Perplexity-class surfaces).

## Operating principles

- **Intent beats volume**: map URLs to intent clusters (informational, commercial, transactional, local). One primary intent per page unless the query truly warrants hybrid layout with clear sections.
- **Crawl and index first**: no amount of copy fixes a page that never renders correctly, canonicalizes wrong, or lives behind conflicting signals.
- **Entity consistency**: one factual graph across site, GBP, schema, socials, and citations (name, address, phone, brand variants, service taxonomy).
- **Extractability for AEO**: definitional sentences, scannable lists, explicit comparisons, and attributable statistics win more than buzzwords.
- **Risk awareness**: distinguish **policy** (spam, scaled AI gibberish, doorway patterns) from **quality** (thin, duplicate, conflicting canonicals). Never recommend tricks that trade short clicks for long-term trust.

---

## 1. Technical SEO (foundation)

Use as an audit spine; tailor depth to the stack (Vercel-hosted SPA with **build-time prerender** via `scripts/postbuild-seo.ts` + `RouteSeoManager` for client navigation). Implementation details: **`stratezik-seo-master`**.

### Crawling and indexation

- [ ] **Robots**: no accidental broad blocks; critical resources not disallowed; staging excluded.
- [ ] **Sitemap**: clean URLs only, accurate `lastmod` where truthful, submitted in GSC, no junk or orphan masses.
- [ ] **Canonical**: single preferred URL per indexable page; self-referencing canonical on indexable pages; HTTP→HTTPS and host consolidation (www vs apex) consistent with live internal links.
- [ ] **Redirects**: 301 chains minimized; soft 404s eliminated; redirect hop count sane for bots.
- [ ] **Pagination/filters**: parameters handled (canonical or noindex strategy coherent); infinite states not indexed as duplicates.
- **JavaScript rendering**: confirm critical content and links in **initial HTML** where possible; validate **mobile-friendly** and **fetch like Google** equivalents when debugging. For **LLM/AEO citation fetchers**, treat **no-JS HTML as the only guaranteed surface** (see §4 — LLM fetchers don't run JavaScript).

### Architecture

- [ ] **URL design**: readable, stable slugs; avoid churn unless paired with redirects.
- [ ] **Internal link depth**: money pages discoverable within few hops from home and hubs.
- [ ] **Faceted navigation**: does not explode low-value indexable URLs.

### Performance and UX signals

- [ ] **Core Web Vitals**: LCP, INP, CLS within acceptable ranges on real devices for priority templates.
- [ ] **Mobile parity**: content and CTAs not hidden behind interactions that harm extraction or usability.

### Security and hygiene

- [ ] HTTPS everywhere, mixed content resolved, no leaked staging domains in production sitemap or links.

---

## 2. On-site SEO (content and relevance)

### Keywords and topics

- Build **topic clusters** around commercial pillars and supporting informational pages.
- Align **H1 and title** with dominant intent; avoid misleading clickbait that spikes bounce.
- Use headings for **outline logic**, not keyword stuffing.

### Page-level checklist

- [ ] **Title**: primary intent near start; unique per URL; aligned with query language variants (CA English).
- [ ] **Meta description**: compelling, accurate; not a ranking lever but drives CTR.
- [ ] **H1 through H3 hierarchy**: one clear H1; sections answer natural follow-up questions.
- [ ] **Intro paragraph**: states what the page solves and for whom (humans and extractors).
- [ ] **Body**: satisfies intent comprehensively for the query class; updates when facts or regulations change.
- [ ] **Images**: descriptive filenames and alt where helpful; compression sane.
- [ ] **Internal links**: descriptive anchors; hub-and-spoke between related services, proof (case studies), conversions (contact), and **free tools** (see §9).

### Duplicate and thin content

- Consolidate near-duplicates with redirects or clear differentiation.
- Avoid doorway-style programmatic spreads unless each URL earns existence with unique utility.

---

## 3. Structured data and rich results

- Pick types that **truthfully match** the page: `Organization`, `LocalBusiness` where applicable, `WebSite`, `BreadcrumbList`, `FAQPage`, `Article`, `Service`, `Product` only when honest.
- **`Dataset`**: when declaring benchmark or research data (e.g. Toronto AEO benchmark on `/aeo-checker`), include **`license`** (URL), **`isAccessibleForFree`**, **`datePublished`**, and **`creator`**. GSC flags missing `license` as non-critical. Default for Stratezik-published public benchmarks: `https://creativecommons.org/licenses/by/4.0/`.
- **JSON-LD** preferred for consistency with current examples in Search Central.
- Validate with **Rich Results Test** and monitor **GSC enhancements**.
- Keep FAQ answers aligned with visible content; avoid contradictory schema.

---

## 4. AEO (answer engines and AI summaries)

Goal: be **quotable** and **corroborated**, not merely ranked.

### LLM fetchers don't run JavaScript

**Assume major answer-engine fetchers read the first HTML response only** — they do not reliably download your JS bundles or execute React. Empirical tests (e.g. Andre Alpar’s decoy-HTML vs JS-only-content experiment, widely discussed in the SEO/AEO community) show that **ChatGPT, Claude, and Gemini** often report whatever is in raw HTML and **miss content that exists only after client-side render**. Some other fetchers behave differently; do not bet citations on any of them running your SPA.

| Fetcher class | Typical behavior | Stratezik implication |
|---------------|------------------|------------------------|
| **Google / Bing (search)** | Often render JS (with limits and delay) | Prerender still helps LCP and guarantees first paint; not a substitute for good HTML |
| **ChatGPT, Claude, Gemini-class citation fetchers** | Mostly **no JS execution**; may not even request `.js` assets | Facts, definitions, stats, and service claims must live in **initial HTML** or machine-readable files |
| **Hybrid / research fetchers** (varies by product) | Inconsistent | Same rule: never hide the canonical answer behind hydration |

**Do not:**

- Put cite-worthy facts only in React state, `useEffect` fetches, or lazy-loaded chunks with no prerender body.
- Serve an empty `#root` shell and expect LLMs to “see” the hydrated page.
- Use **HTML decoy vs JS reveal** patterns (cloaking) — policy risk and fails on non-JS fetchers anyway.

**Do (Stratezik standard — see `stratezik-seo-master`):**

- Ship **build-time prerender** body HTML in `dist/{route}/index.html` for every indexable URL.
- Keep **JSON-LD, title, canonical, OG** in the prerendered `<head>` (not client-only).
- Maintain **`llms.txt`**, generated **`llms-full.txt`**, and **`llm-context.json`** as a structured index for models that prefer summary files.
- After changes, verify with **`curl -s URL`** (no JS) — the answer you want cited must appear in that output.

**Agent rule:** If a brief or feature puts “the real” AEO copy behind JavaScript, **reject or redesign** — use prerender, static sections, or API-backed HTML at build time instead.

### Page patterns that travel well

- **Lead with a crisp definition** when the page targets "what is / how does" intent.
- **Atomic factual sentences**: one claim per sentence for stats, dates, jurisdictions, pricing bands when public.
- **Named sources**: link out to primary studies or official docs where claims need credibility.
- **Comparisons**: short tables (A vs B) when users decide between options.
- **Scope discipline**: say who the advice applies to (e.g., GTA trades vs national SaaS).

### Trust and corroboration

- Align on-site facts with **GBP**, **schema**, and **third-party listings**.
- Earn **brand + entity** familiarity via consistent naming and authoritative mentions (within ethical outreach).

### Measurement mindset

- Track classic rankings **and** visibility in AI-heavy SERPs where tools exist; reconcile disagreements by query sampling (commercial vs broad corpus).

---

## 5. Off-site SEO and authority

- **Links**: prioritize relevance and qualified referral traffic over raw DR vanity.
- **Digital PR**: newsworthy angles, data drops, expert commentary tied to brand expertise.
- **Local**: GBP completeness, categories, services, photos, reviews velocity handled ethically, UTM hygiene for reporting.
- **Brand SERP**: owned profiles, consistent NAP, suppression of incorrect duplicates via official channels where possible.

### Citational footprint for AEO (LLM trust matrix)

LLMs weight **co-mentions** and **third-party corroboration**, not just PageRank. Build:

- **Contextual co-mentions**: editorial sentences pairing the brand with target services + geo ("Stratezik" + "technical SEO" + "Canada"), valuable even when `nofollow`.
- **Regulated third-party platforms**: steady, keyword-rich reviews on **Google Business Profile**, **Clutch**, **G2** (LLMs trust these over self-hosted copy).
- **Developer footprint**: public **GitHub** tools/configs as authentic authority signals.
- **Entity linking**: `knowsAbout` → Wikipedia/Wikidata service entries; `sameAs` → owned profiles. Keep brand facts identical across site schema, `llm-context.json`, and listings.

Implementation of the on-site pieces (schema, `llm-context.json`, author entities) lives in **`stratezik-seo-master`**.

---

## 6. Analytics and diagnostics

- **Google Search Console**: impressions, clicks, queries, pages, Core Web Vitals, crawl stats, canonical selection.
- **GA4**: landing engagement by campaign and organic segment; conversions mapped honestly.
- **Logs** (when available): crawl budget waste, orphan discovery.

Always separate **technical indexation** issues from **relevance** issues before rewriting copy.

---

## 7. Brief and ship checklist (content going live)

- [ ] Primary intent stated in title, H1, and opening graf.
- [ ] Unique value versus existing SERP (why this page exists).
- [ ] Internal links to next steps (service, case proof, contact, **free tools** where editorially fit).
- [ ] Schema matches visible content.
- [ ] No conflicting canonical or noindex surprises.
- [ ] Metrics or claims sourced or qualified (avoid stale stats).
- [ ] **AEO pass**: could an assistant cite one paragraph without hallucinating context?

---

## 8. Pre-publish review: user-supplied blog draft

Use when the user brings **ready prose** (paste, Doc export, or existing TSX) and wants it **shipped** on Stratezik with strongest SEO/AEO readiness.

**Reality check**: third-party “SEO scores” and automated testers disagree and change often. Target **full checklist coverage** and validation in **Google’s Rich Results Test**, **URL Inspection**, and **live SERPs**, not a mythical single 10/10.

### Repo wiring (this codebase)

| Surface | Where it lives |
|--------|----------------|
| Post registry, slug, dates, keywords, FAQ entities | `src/blog/postsMeta.ts` + `src/blog/postLoaders.ts` (see `src/blog/posts.ts` merge helper) |
| Route SEO registry (all pages) | `src/seo/pageSeoRegistry.ts` |
| Build-time prerender + sitemap + llms-full | `scripts/postbuild-seo.ts` (runs on `npm run build`) |
| Client navigation meta + JSON-LD | `src/seo/RouteSeoManager.tsx` |
| Article (+ FAQPage + BreadcrumbList) JSON-LD | `src/blog/buildArticleJsonLd.ts` |
| Person author + `/authors/{slug}` | `src/seo/authors.ts`, `src/components/AuthorPage.tsx` (set `authorSlug` in `postsMeta.ts`) |
| Org entity (`sameAs`, `knowsAbout`, `foundingDate`) | `src/seo/organization.ts` + `index.html` schema |
| Structured brand facts for LLMs | `public/llm-context.json` (regenerated on build) |
| Title, meta, OG/Twitter, canonical | `src/seo/buildPageHeadHtml.ts` (server) + `applyRouteSeo` (client) |
| Article body component | `src/blog/*.tsx` (e.g. pillar or case study component) |
| Sitemap | Auto-generated to `public/sitemap.xml` on build |
| LLM index | `public/llms.txt` + generated `llms-full.txt` |

`BlogPostPage` already renders **one** `<h1>` from `post.title`. Body components should use **`h2`+** only so hierarchy stays valid.

### Audit output (what you deliver before merge)

1. **Gap list**: bullets of missing or weak items from the checklist below.
2. **Concrete deltas**: exact suggested `title`, `description`, `slug`, `keywords[]`, `faqEntities[]` (if used), `datePublished` / `dateModified`, plus copy edits or new sections in the article TSX.
3. **Schema**: confirm `faqEntities` answers match **visible** FAQ or definitional copy (or add visible FAQ); otherwise use Article-only JSON-LD (`buildSimpleArticleJsonLd`).
4. **Verification**: Rich Results Test on URL or markup snippet; URL Inspection after deploy when possible; GSC MCP for query/page context when relevant.

### Checklist: technical (blog URL)

- [ ] **Indexable route**: `/blog/{slug}` matches production hostname strategy (`www` vs apex) used elsewhere; no accidental noindex on template.
- [ ] **Sitemap**: post URL included after `npm run build` (auto-generated).
- [ ] **Canonical + initial HTML meta**: prerendered `dist/blog/{slug}/index.html` matches registry; curl-verify before deploy.
- [ ] **Performance**: hero images or embeds not destroying LCP on mobile; lazy-load heavy below-fold assets where sensible.

### Checklist: on-page

- [ ] **Title (`post.title`)**: dominant intent, distinct vs other posts; length sensible for SERP display; honest vs body.
- [ ] **Meta description (`post.description`)**: tight value prop + differentiation; aligned with first screen of content.
- [ ] **GEO scope** (see **`stratezik-blog-writing` § GEO authority**): tier A/B/C assigned; Toronto/Scarborough/GTA in title, meta, body, or FAQ per tier; internal link to at least one local service URL or GTA blog sibling when the post feeds local pipeline.
- [ ] **Keywords (`keywords[]`)**: 5–8 phrases reflecting content and queries; include 1–2 geo phrases when Tier A or B (or Tier C with local-application section); no stuffing in body.
- [ ] **Heading outline**: `h2`/`h3` cover SERP sub-questions; no skipped levels inside article body.
- [ ] **Intro**: answers who/for what in two to three sentences (humans + extractors).
- [ ] **Internal links**: mesh to services, portfolio/case proof, contact, sibling posts, and **free tools** with descriptive inline anchors (see §9).
- [ ] **Images**: `alt` where they carry information; compress large assets.
- [ ] **Outbound citations**: stats and claims tied to linked sources where applicable.

### Checklist: AEO

- [ ] **Definition**: early block or aside answering “what is / how does this apply” when intent warrants it.
- [ ] **Local extractability**: for GTA-facing posts, definitional or FAQ sentences should be quotable with explicit scope (“For Toronto service businesses…”) so assistants do not generalize to the wrong market.
- [ ] **Atomic facts**: one stat or date per sentence; scope explicit (geo, vertical).
- [ ] **Quotability**: at least one passage that could be cited without missing context.
- [ ] **No-JS surface**: key claims visible in `curl -s` HTML (not only after React hydrate); see §4.
- [ ] **Consistency**: numbers in prose match FAQ/schema and executive snapshot if present.

### Checklist: structured data

- [ ] **Article**: `title`, `description`, `datePublished`, `dateModified`, `keywords`, `inLanguage` consistent with `postsMeta.ts`.
- [ ] **FAQPage**: only if FAQs exist on-page or are mirrored verbatim in-page; no contradiction with article body.
- [ ] Validate merged **`@graph`** in Rich Results Test.

### Checklist: off-site (post-launch or parallel)

- [ ] **GBP / NAP / entity**: claims in local posts align with Google Business Profile and homepage organization schema where referenced.
- [ ] **Distribution**: ethical amplification (newsletter, LinkedIn, partners): supports discovery and mentions, not a prerequisite for going live.

After this audit, **`stratezik-blog-writing`** merges SEO-required additions while preserving voice and punctuation rules unless an SEO requirement explicitly overrides (rare).

---

## 9. Free Tools distribution (internal linking)

**Hub:** `/free-tools` — canonical index of lead magnets. Registry: `FREE_TOOLS_SEO` in `pageSeoRegistry.ts`; cards in `src/free-tools/tools.ts`.

**Priority tools to link in prose** (inline contextual hyperlinks, not footer dumps):

| Tool | Path | Link when the copy discusses… |
|------|------|-------------------------------|
| **AEO Readiness Checker** | `/aeo-checker` | AI visibility, answer engines, schema, llms.txt, crawlability, ChatGPT/Perplexity citations, Toronto startup audit benchmark |
| **ChatGPT Ads Cheat Sheet** | `/chatgpt-ads-cheat-sheet` | ChatGPT Ads, context hints, early-window paid social, conversational landing pages, OpenAI advertising |
| **$3,000 Growth Credit** | `/growth-credit` | Toronto-area SMB offers, local search + paid + delivery onboarding credit |
| **Hub (optional)** | `/free-tools` | “our free tools,” tool roundups, nav/footer — not every mention |

### Inline linking rules

- **Prefer in-sentence anchors** inside the paragraph where the tool is relevant: e.g. “Run the [20-Point AEO Readiness Test](/aeo-checker?utm_source=blog-{slug}&utm_medium=inline)” — not a standalone CTA block unless the section is explicitly a promo.
- **Minimum on publish**: every new **pillar** or **refresh** that touches AEO/AI search should include ≥1 inline link to `/aeo-checker`; every post on **ChatGPT Ads** should include ≥1 inline link to `/chatgpt-ads-cheat-sheet`. Cross-link the other tool when both topics appear in one article.
- **UTM pattern**: `?utm_source={page-slug}&utm_medium=inline` (blog), `utm_medium=card` (hub cards), `utm_medium=cta` (nav/footer). Keep slugs truthful (`blog-chatgpt-ads`, `services-seo-aeo`, `chatgpt-cheat-sheet-guide`).
- **Reusable components** (use before inventing new promos): `BlogCheatSheetMidPromo`, `AeoCheckerCta`, `BlogDiscoveryHub` sibling links.
- **Do not** keyword-stuff tool names; one natural link per section is enough.
- **Gated guides** (`/chatgpt-ads-cheat-sheet/guide`) stay `noindex` — link the **landing** URL in indexable content.

### Lead-magnet pages (SEO/AEO notes)

- Immersive funnels hide site nav/footer/cookie/loader (`App.tsx` cheat-sheet routes).
- Landing = indexable + full registry/JSON-LD/FAQ/sitemap; gated guide = `noindex, nofollow`.
- Lead capture: Supabase (`guide_leads`) + optional Google Sheets webhook per tool (`GOOGLE_*_WEBHOOK_URL`); see `GOOGLE_SHEETS_SETUP.md`.
- PDF = browser print (`window.print()` + `.no-print` chrome); no hosted PDF file required.

---

## Stratezik alignment

- For **published articles** and **`posts.ts`**, run **`stratezik-blog-seo-pipeline`** or hand off explicitly to **`stratezik-blog-writing`** after your brief (see that skill’s “Pair with SEO/AEO” section).
- Respect shipped voice rules from **`stratezik-blog-writing`**: no long-dash punctuation as prose glue; Canadian spelling where the site uses it.
- **GEO authority ladder**: hyper-local posts earn **Scarborough + Toronto**; regional pillars earn **Toronto/GTA** in lead + local-application section; universal pillars earn **meta/keywords + one GTA paragraph**, not city-stuffed titles. Full placement rules: **`stratezik-blog-writing` § GEO authority**.
- Prefer **Toronto / Scarborough / GTA / Canada** specificity when the asset targets local operators; align claims with GBP and `organization.ts` / service `areaServed`.
- Tie recommendations to **measurable engagement outcomes**, not vanity rankings alone.

When platform guidance conflicts with legacy SEO folklore, **follow primary documentation** and explain the trade in one sentence.
