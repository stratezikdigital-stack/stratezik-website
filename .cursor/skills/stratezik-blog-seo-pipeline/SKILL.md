---
name: stratezik-blog-seo-pipeline
description: >-
  Orchestrates Stratezik blog and landing content so SEO/AEO briefs and
  editorial drafting stay aligned. Use when creating or overhauling blog
  articles, case studies, posts.ts entries, or long-form pages that must rank,
  earn citations in AI summaries, and match Stratezik voice. Handles both
  SEO-first drafts and user-supplied drafts needing a full SEO/AEO pre-publish
  audit before merge. Agent must run npm run build and verify prerender/sitemap
  on every shipped post — not a manual user step. Combines stratezik-gsc-intelligence (when Search Console
  MCP is used), stratezik-seo-aeo, stratezik-blog-writing, and stratezik-seo-master
  for build-time prerender and release gates in an explicit order.
---

# Stratezik blog + SEO/AEO pipeline

## When this skill applies

Use this **instead of picking only one skill** when the deliverable is **shipped content** (React blog TSX, `posts.ts`, FAQs, deep landing sections) that must be **discoverable** and **on-brand**.

## Mandatory bundle

Shipped blog work **must** run **`stratezik-seo-aeo`** and **`stratezik-blog-writing`** through the chains below. Do not treat one skill alone as sufficient unless the user explicitly scoped a non-content change.

When the **google-search-console** MCP is enabled and work touches **existing URLs**, **refreshes**, **striking distance**, **CTR fixes**, or **traffic drops**, run **`stratezik-gsc-intelligence`** first (scout → brief), then continue the chain.

## Agent obligation (not a user manual step)

When the user asks to **write, publish, or ship** a blog post in this repo, the agent **must** complete the full technical SEO pass before calling the task done:

1. Add or update `src/blog/postsMeta.ts`, matching entry in `src/blog/postLoaders.ts`, article TSX, and `postFaqs.ts` as needed.
2. Article TSX: use **`BlogAuthorSignoff`** (closing byline) and **`BlogStratezikContactLink`** (contact CTAs). Never paste author names, addresses, or `mailto:` into article bodies — identity lives in `src/seo/authors.ts`.
3. Run **`npm run build`** (runs `check-blog-author`, then prerender, `public/sitemap.xml`, and `public/llms-full.txt`).
4. Confirm `dist/blog/{slug}/index.html` exists; grep title/canonical **and** closing byline author name (must match `authors.ts`, not stale copy).
5. Commit (and push when the user asks) so Vercel deploys prerendered HTML.

**Never** tell the user to run the build themselves unless they explicitly asked for copy-only or a draft with no repo changes. **`posts.ts` alone is not “published”** until build has run and artifacts are committed.

---

## Skill chains

### Chain A: SEO brief first (greenfield)

1. **`stratezik-gsc-intelligence`** first **only when** MCP is available **and** the target URL(s) already exist in GSC or the user asked for a data-backed sync — otherwise skip.  
   Use MCP tools per that skill: `list_sites` if needed, then `query_search_analytics`, `find_keyword_opportunities`, `get_top_pages`, `compare_performance`, and/or `inspect_url` as appropriate. Produce the compact scout handoff (plays, queries, pages, date ranges).

2. **`stratezik-seo-aeo`**  
   Produce or validate: primary intent and query cluster, recommended title/H1 pattern, H2 outline answering SERP gaps, target entities, internal links (hubs, portfolio, contact), FAQ/schema candidates, AEO extractability notes (definition block, atomic stats, sources). **Ground priorities in scout output** when step 1 ran; otherwise note assumptions.

3. **`stratezik-blog-writing`**  
   Draft or revise copy using the SEO brief as **constraints**. Apply archetype (pillar vs case study), voice bans, punctuation rules, and JSX layout habits. Do **not** discard SEO decisions without fixing a concrete conflict (e.g., misleading title).

4. **`stratezik-seo-aeo`** again (short pass)  
   Re-check: intent still clear in title and opening, headings map to outline, internal links present, **free tools inline links** placed per §9, FAQ/schema matches visible copy, AEO “single paragraph citation” test, no accidental noindex/canonical issues called out for implementers.

5. **`stratezik-blog-writing`** final skim  
   Tighten rhythm; ensure no banned punctuation or generic AI cadence crept in during SEO edits.

6. **`stratezik-seo-master`** release gate (**agent runs automatically**)  
   Run `npm run build`; verify `dist/blog/{slug}/index.html`, updated `public/sitemap.xml` and `public/llms-full.txt`; commit when shipping.

### Chain B: user-supplied draft first (ready content)

1. **`stratezik-gsc-intelligence`** when MCP is enabled — pull performance for the draft’s URL(s) and relevant queries (`query_search_analytics` with `page` filter or dimension `page` + `query`, `compare_performance` if refresh/decay). Attach scout summary to the audit.

2. **`stratezik-seo-aeo`** section **“8. Pre-publish review: user-supplied blog draft”**  
   Full audit: gap list; concrete deltas for `posts.ts` (title, description, slug, keywords, dates, `faqEntities`), article TSX; schema alignment with `buildArticleJsonLd.ts`. Sitemap and prerender are **auto-generated on build** — see **`stratezik-seo-master`**. Validate with **Rich Results Test** and **URL Inspection** after deploy; reconcile with scout metrics when step 1 ran. Do **not** claim one numeric perfect score across all third-party SEO testers.

3. **`stratezik-blog-writing`**  
   Merge SEO-required sections and links into the supplied draft while preserving Stratezik patterns and punctuation rules.

4. **`stratezik-seo-aeo`** validation  
   Confirm single page `h1` comes from `post.title` only; body uses `h2`+; FAQ schema mirrors visible copy.

5. **`stratezik-blog-writing`** micro-pass  
   Final readability only.

6. **`stratezik-seo-master`** release gate (**agent runs automatically**)  
   Run `npm run build`; curl-verify prerendered meta for the new slug; confirm `llms-full.txt` and sitemap updated; commit (and push if requested).

Use **Chain A** for net-new posts. Use **Chain B** when the user drops in mostly finished prose.

## Handoff artifact (what SEO passes to writing)

Keep this compact in chat or a scratch note:

- Intent + 3 to 6 supporting queries  
- **GEO tier** (A hyper-local / B GTA operator / C universal) + where Toronto/Scarborough/GTA land (title, meta, lead, FAQ, local H2)  
- Title + meta description suggestion  
- H2 list with one-line “job” per section  
- Links: internal URLs + suggested anchor phrasing (include ≥1 local service or GTA blog sibling when tier B/C feeds local pipeline)  
- **Free tools links**: which of `/aeo-checker`, `/chatgpt-ads-cheat-sheet`, `/growth-credit` deserve **inline** anchors in which sections + UTM `utm_source` / `utm_medium=inline` (see **`stratezik-seo-aeo` §9**)  
- Schema: types and which copy blocks they mirror  
- Stats/facts to cite with source URLs  
- AEO: required definitional sentence or aside question (scoped to geo when tier A/B)

## If Search Console MCP is enabled

Follow **`stratezik-gsc-intelligence`**: explicit plays (growth / optimization / decay), tool choice, and scout → architect handoff. Do not skip **`inspect_url`** when investigating indexing or post-major deploy checks.

## Related skills

- GSC scout layer: **`stratezik-gsc-intelligence`**  
- Full SEO/AEO depth: **`stratezik-seo-aeo`**  
- Implementation / prerender / release gates: **`stratezik-seo-master`**  
- Voice, structure, JSX: **`stratezik-blog-writing`**
