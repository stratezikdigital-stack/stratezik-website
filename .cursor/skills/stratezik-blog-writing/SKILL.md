---
name: stratezik-blog-writing
description: >-
  Drafts and edits Stratezik blog copy in the site's established voice: pillar
  explainers (answer engines, SEO, local) and metric-led case studies with
  executive snapshots and phased narratives. Use when writing or rewriting
  blog posts, blog FAQs in posts.ts, case study articles, figure captions, or
  any long-form marketing content for stratezik.com that should match existing
  blog tone and structure. For publish-ready posts that must also satisfy SEO
  and AEO, prefer stratezik-blog-seo-pipeline (Chain A after SEO brief, or
  Chain B after SEO pre-publish audit of supplied drafts) before final edits.
  Shipped posts require the agent to run npm run build — not the user.
---

# Stratezik blog writing

## Pair with SEO/AEO

For anything **publish-ready** (ranking + citations + voice), do **not** use this skill alone for greenfield posts. Use **`stratezik-blog-seo-pipeline`** (**Chain A**) so **`stratezik-seo-aeo`** produces the brief first, then apply this skill to draft.

If the user supplies **ready content** first, use **`stratezik-blog-seo-pipeline` Chain B**: SEO runs **`stratezik-seo-aeo`** section 8 (pre-publish audit), then this skill **merges** required SEO additions (headings, asides, FAQ blocks, internal links, TSX structure) while keeping voice and punctuation rules.

If you only have a **tone or structure** tweak on existing strong URLs, you may use this skill alone.

## Default stance

Write for **operators** (founders, marketing leads, gritty local SMBs), not textbook readers or tourists. Be **specific**: numbers, neighbourhoods, channels, tool names, month windows, and what actually changed. Prefer **plain admission** where markets are hard or data disagrees, over polished neutrality.

**Canadian / site spelling** where it matches shipped copy: *optimisation*, *programmes*, *behaviour*, *catalogue* when appropriate; not enforced US spellings unless the surrounding file already uses US.

## GEO authority (Toronto · Scarborough · GTA)

Stratezik’s commercial GEO is **Toronto and Scarborough first**, then **GTA**, then **Canada**. Blogs compound entity signals for local discovery and AEO; they do **not** replace GBP, `areaServed` schema, or NAP consistency on service pages.

**Do not** keyword-stuff city names into every heading or repeat “Toronto Scarborough GTA” in a footer block. Search and answer engines reward **scoped, truthful locality** tied to the reader’s intent.

### Pick a tier before drafting

| Tier | When to use | Title / meta | Body | `posts.ts` `keywords[]` |
|------|-------------|--------------|------|-------------------------|
| **A · Hyper-local** | Post targets one neighbourhood or “agency near me” intent (e.g. Scarborough triggers) | Include primary geo in **title** or **description** where honest | **Scarborough** + **Toronto** + **GTA** in lead, examples, and ≥2 FAQs; name real corridors (Eglinton, STC, etc.) only when accurate | 2–3 geo phrases (`digital marketing agency Scarborough`, `GTA SMB marketing`) |
| **B · GTA operator** | Advice for founders/SMBs in the region but not one borough (GTM series, Get Found, AEO Toronto) | **Toronto** or **GTA** in title or description | **Toronto/GTA** in cold open + at least one later section; optional neighbourhood vignette | ≥1 of `Toronto …`, `GTA …` |
| **C · Universal pillar** | National/global topic (old SEO → agent-ready, ChatGPT ads) | Geo optional in title; prefer **GTA/Toronto in meta description** if the post feeds local pipeline | **One** explicit local-application block (H2 or strong paragraph): “For Toronto and GTA operators…” + link to a **Tier A/B** sibling post | ≥1 geo keyword; rest topical |

### Placement that reads natural (best-fit slots)

1. **Cold open (lead)** — who this is for (`Toronto marketing teams`, `GTA service businesses`).
2. **Answer-first aside** — scope the definitional answer (“For Toronto businesses, this means…”).
3. **Examples section** — local service or startup vignette (trades, clinics, SaaS with GTA customers).
4. **FAQ answers** — at least one Q scoped to Toronto/GTA when Tier B or C.
5. **Internal links** — mesh to hyper-local posts (`/blog/when-hire-digital-marketing-agency-scarborough-gta`), `/blog/answer-engine-optimisation-toronto`, and relevant `/services/seo-aeo/local-seo` or `/services/google-business-profile`.
6. **`posts.ts` description** — one geo anchor when Tier B/C and the post supports local leads.

### What to avoid

- Renaming a universal H1 to “… in Toronto” when the SERP intent is not local (hurts relevance).
- Identical geo boilerplate appended to every article (duplicate thin blocks).
- Claiming Scarborough-specific facts on posts that are not Scarborough-focused.
- More than **one** neighbourhood name per paragraph unless the post is a local case study.

### Quick geo self-check

- [ ] Tier A/B/C chosen and matches search intent.
- [ ] Primary geo appears in **lead** or **aside** (all tiers except narrow national news).
- [ ] Tier A: Scarborough + Toronto visible; Tier B: Toronto or GTA ≥2× in body; Tier C: one dedicated local-application section + geo in meta or keywords.
- [ ] ≥1 internal link to a GTA/local sibling post or local service page.
- [ ] FAQ/schema copy matches visible geo scope (no “Toronto” in schema only).

## Hard bans (punctuation and “AI voice”)

- **No em dash** (`—`) and **no** `&mdash;`. Do not use en dash as a sentence glue either.
- **Ranges**: `Feb to May 2025`, `Jun to Sep 2025`, `$80 to $120` or `$80-$120` (ASCII hyphen for numeric bands only). Say **to**, not a unicode dash, for date spans in titles and body.
- **Figure captions**: `Figure 1. Description…` (period after number), not `Figure 1 — …`.
- Avoid **stock AI rhythm**: symmetrical “first… second… third…”, hollow openers (“In today’s digital landscape”), filler transitions (“Moreover,” “It’s important to note”), and vague payoff lines (“unlock growth,” “leverage synergies”).
- **Vary sentence length**; mix short blunt lines with longer explanatory ones. Do not chain many clauses with semicolons.

## Archetype A: Pillar / topical (answer engines, trends, “why this matters in Toronto”)

Match the pattern of the **AEO Toronto** piece:

1. **Cold open**: Concrete hook: often a named external source linked in the first sentence; then a **bold** stat or contradiction users feel on the SERP.
2. **Early definitional block**: A bordered **aside** (or equivalent) whose `h2` is phrased like a **real search question**. Answer in tight prose; wire **named links** (Google docs, ChatGPT, Perplexity, GBP, etc.) into the definition, not a naked URL list.
3. **H2 sections**: Titles are **specific claims or questions** (“How large is…”, “The 83% gap…”), not “Overview” / “Introduction”.
4. **Body paragraphs**: When vendors disagree (methodology, sample bias), **say so** and tell the reader which slice matters for GTA / trades / wallet-out intent.
5. **Internal links**: One natural CTA per section where it fits (`Link` to `/#services`, `/#contact`, blog sibling), no billboard paragraphs.

**Sources**: Prefer primary studies, Google Search Central, Schema.org, or obviously authoritative vendors; linked **on the anchor phrase**, not `(source)` dumps.

## Archetype B: Case study / proof (client narrative)

Match the pattern of the **Insectica** post:

1. **Lead paragraph** (`lead`): Client link + geography/service footprint + **compressed before/after** (timeline, CPL band, conversions, organic impression scale, retainer framing) in **one** dense graf, not a bullet list.
2. **Executive snapshot**: Short `h2` (“Executive snapshot” or similar) + **ul** items beginning with **`<strong>Label:</strong>`** (bold label, colon, scannable detail). Numbers front-loaded.
3. **Figures**: `figure` / `figcaption`; caption in **mono-ish editorial voice** (uppercase tracking acceptable): provenance (“Ads, Search Console…”), no hype. Use **Figure N.** prefix.
4. **Phased H2s**: `Phase 1 · Baseline (Feb to May 2025)`: middle dot **`·`** between phase index and label; date range in parentheses with **to**.
5. **Body**: Frank operational language where accurate (“tuition,” “cold start,” “bruising” vertical). Tie superlatives to **measurement** (exports, tools, months). Never orphan claims.
6. **Portfolio / services**: Link to `/#portfolio` or `/#services` where it replaces repetition.

## Shared UI/copy habits (when outputting JSX)

- Stack sections with **`mt-14` / `mt-16`** style rhythm between major `h2`s (match existing articles).
- Body copy: `text-ink-700 leading-relaxed`; leads slightly larger; **bold** for KPIs and pivotal phrases, not whole sentences.
- Keep **paragraphs** default; use lists only for snapshots, tactics worth scanning, or FAQs, not for every section.

## Author byline and contact CTAs (single source of truth)

**Never hardcode** author names, job titles, LinkedIn URLs, office addresses, or `mailto:` links inside `*Article.tsx` files.

| Need | Use | Registry |
|------|-----|----------|
| Header byline + headshot | Automatic via `BlogPostPage` + `AuthorHeadshot` + `posts.ts` `authorSlug` | `src/seo/authors.ts` (`imagePath`) |
| Closing sign-off before FAQ | `<BlogAuthorSignoff />` (includes headshot) | `src/blog/BlogAuthorSignoff.tsx` → `getAuthorBySlug()` |
| “Email us / contact” CTA in body | `<BlogStratezikContactLink>contact form</BlogStratezikContactLink>` | `src/blog/BlogStratezikContactLink.tsx` → `/#contact-form` |

**Changing the default blog author** = edit `src/seo/authors.ts` and `posts.ts` only. Do **not** grep-and-replace names across article TSX.

**Long-form pillar posts** (series explainers, playbooks with FAQ sections): end the main narrative with `<BlogAuthorSignoff />` immediately before the FAQ `<section>`. Case studies may use a CTA card instead if that matches the archetype.

**Release gate:** `npm run build` runs `scripts/check-blog-author.ts`, which fails on `Dave`, `dave@stratezik.com`, `mailto:`, or hardcoded `2466 Eglinton` in `src/blog/*Article.tsx`.

## `posts.ts` / SEO adjunct

- **Descriptions**: One honest sentence + concrete outcome or angle; no em dash.
- **FAQ answers** (if present): Short sentences; avoid semicolon-stacked “AI lists.”

## Quick self-check before shipping

- [ ] GEO tier applied; Toronto/Scarborough/GTA placed per table above (not stuffed).
- [ ] No hardcoded author name, address, or `mailto:` in article TSX (`BlogAuthorSignoff` / `BlogStratezikContactLink` only).
- [ ] Zero `—`, `&mdash;`, and no en dash used as prose punctuation.
- [ ] Opens with something **specific**, not a generic industry preamble.
- [ ] Every bold metric or dramatic claim traceable to **source or engagement fact**.
- [ ] Archetype matches: pillar (aside + contested stats + internal links) vs case study (snapshot + figures + phased `·` headings).
- [ ] If committing to repo: **`npm run build` run by agent**; sitemap and `llms-full.txt` updated (see **`stratezik-seo-master`**).
