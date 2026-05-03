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
---

# Stratezik blog writing

## Pair with SEO/AEO

For anything **publish-ready** (ranking + citations + voice), do **not** use this skill alone for greenfield posts. Use **`stratezik-blog-seo-pipeline`** (**Chain A**) so **`stratezik-seo-aeo`** produces the brief first, then apply this skill to draft.

If the user supplies **ready content** first, use **`stratezik-blog-seo-pipeline` Chain B**: SEO runs **`stratezik-seo-aeo`** section 8 (pre-publish audit), then this skill **merges** required SEO additions (headings, asides, FAQ blocks, internal links, TSX structure) while keeping voice and punctuation rules.

If you only have a **tone or structure** tweak on existing strong URLs, you may use this skill alone.

## Default stance

Write for **operators** (founders, marketing leads, gritty local SMBs), not textbook readers or tourists. Be **specific**: numbers, neighbourhoods, channels, tool names, month windows, and what actually changed. Prefer **plain admission** where markets are hard or data disagrees, over polished neutrality.

**Canadian / site spelling** where it matches shipped copy: *optimisation*, *programmes*, *behaviour*, *catalogue* when appropriate; not enforced US spellings unless the surrounding file already uses US.

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

## `posts.ts` / SEO adjunct

- **Descriptions**: One honest sentence + concrete outcome or angle; no em dash.
- **FAQ answers** (if present): Short sentences; avoid semicolon-stacked “AI lists.”

## Quick self-check before shipping

- [ ] Zero `—`, `&mdash;`, and no en dash used as prose punctuation.
- [ ] Opens with something **specific**, not a generic industry preamble.
- [ ] Every bold metric or dramatic claim traceable to **source or engagement fact**.
- [ ] Archetype matches: pillar (aside + contested stats + internal links) vs case study (snapshot + figures + phased `·` headings).
