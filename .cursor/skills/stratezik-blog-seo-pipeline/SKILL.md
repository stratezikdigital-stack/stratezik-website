---
name: stratezik-blog-seo-pipeline
description: >-
  Orchestrates Stratezik blog and landing content so SEO/AEO briefs and
  editorial drafting stay aligned. Use when creating or overhauling blog
  articles, case studies, posts.ts entries, or long-form pages that must rank,
  earn citations in AI summaries, and match Stratezik voice. Handles both
  SEO-first drafts and user-supplied drafts needing a full SEO/AEO pre-publish
  audit before merge. Combines stratezik-gsc-intelligence (when Search Console
  MCP is used), stratezik-seo-aeo, stratezik-blog-writing, and stratezik-seo-master
  for build-time prerender and release gates in an explicit order.
---

# Stratezik blog + SEO/AEO pipeline

## When this skill applies

Use this **instead of picking only one skill** when the deliverable is **shipped content** (React blog TSX, `posts.ts`, FAQs, deep landing sections) that must be **discoverable** and **on-brand**.

## Mandatory bundle

Shipped blog work **must** run **`stratezik-seo-aeo`** and **`stratezik-blog-writing`** through the chains below. Do not treat one skill alone as sufficient unless the user explicitly scoped a non-content change.

When the **google-search-console** MCP is enabled and work touches **existing URLs**, **refreshes**, **striking distance**, **CTR fixes**, or **traffic drops**, run **`stratezik-gsc-intelligence`** first (scout → brief), then continue the chain.

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
   Re-check: intent still clear in title and opening, headings map to outline, internal links present, FAQ/schema matches visible copy, AEO “single paragraph citation” test, no accidental noindex/canonical issues called out for implementers.

5. **`stratezik-blog-writing`** final skim  
   Tighten rhythm; ensure no banned punctuation or generic AI cadence crept in during SEO edits.

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

6. **`stratezik-seo-master`** release gate  
   Run `npm run build`; curl-verify prerendered meta for the new slug; confirm `llms-full.txt` updated.

Use **Chain A** for net-new posts. Use **Chain B** when the user drops in mostly finished prose.

## Handoff artifact (what SEO passes to writing)

Keep this compact in chat or a scratch note:

- Intent + 3 to 6 supporting queries  
- Title + meta description suggestion  
- H2 list with one-line “job” per section  
- Links: internal URLs + suggested anchor phrasing  
- Schema: types and which copy blocks they mirror  
- Stats/facts to cite with source URLs  
- AEO: required definitional sentence or aside question

## If Search Console MCP is enabled

Follow **`stratezik-gsc-intelligence`**: explicit plays (growth / optimization / decay), tool choice, and scout → architect handoff. Do not skip **`inspect_url`** when investigating indexing or post-major deploy checks.

## Related skills

- GSC scout layer: **`stratezik-gsc-intelligence`**  
- Full SEO/AEO depth: **`stratezik-seo-aeo`**  
- Implementation / prerender / release gates: **`stratezik-seo-master`**  
- Voice, structure, JSX: **`stratezik-blog-writing`**
