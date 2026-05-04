---
name: stratezik-gsc-intelligence
description: >-
  GSC-driven “scout” layer for Stratezik: uses the google-search-console MCP to
  pull queries/pages, spot striking-distance and CTR opportunities, detect decay,
  inspect URLs, and produce a compact brief for stratezik-seo-aeo and
  stratezik-blog-writing. Use for weekly syncs, content refreshes, pre-brief
  reality checks, or closed-loop SEO/AEO workflows tied to Search Console data.
---

# Stratezik GSC intelligence (scout)

## MCP setup

- Cursor server key: **`google-search-console`** (see `.cursor/mcp.json`; package `google-searchconsole-mcp`).
- If **`list_sites`** returns multiple properties, confirm **`siteUrl`** matches how the property is registered (e.g. `https://www.stratezik.com/` vs `sc-domain:stratezik.com`).

## When to run this skill

- Before locking an SEO brief for an **existing URL** or **refresh** of a blog post or landing section.
- When the user asks for a **weekly sync**, **striking distance**, **CTR fix**, or **traffic drop** diagnosis.
- After deploy of major SEO/schema changes: spot-check **inspect_url** on changed URLs.

Always pass findings into **`stratezik-seo-aeo`** (blueprint) then **`stratezik-blog-writing`** (execution), unless the user scoped analysis-only.

---

## Tool map (google-search-console MCP)

Use these by name when calling the MCP:

| Goal | Tool | Notes |
|------|------|--------|
| Confirm property / pick `siteUrl` | `list_sites` | Run first if unsure. |
| Raw query or page performance | `query_search_analytics` | `dimensions`: `query`, `page`, or `query`+`page`; optional `filters`; `rowLimit` up to 25000. |
| High impressions + low CTR | `find_keyword_opportunities` | Defaults: min impressions 100, max CTR 3%, max position 20 — tune to match “optimization play”. |
| Top URLs by clicks/impressions/CTR/position | `get_top_pages` | `sortBy`: `clicks` \| `impressions` \| `ctr` \| `position`. |
| Period-over-period delta | `compare_performance` | **Decay play**: compare last 30 days vs prior 30 days (or 28 vs 28); `dimension`: `query` or `page`. |
| Single-keyword trajectory | `get_keyword_trend` | Daily series for one query. |
| Brand vs non-brand sanity | `analyze_brand_queries` | Requires **`brandTerms`** (e.g. Stratezik: `["stratezik", "stratezik digital"]`). |
| Slice by surface / type | `query_by_search_type`, `query_by_search_appearance` | When diagnosing Discover / AI / etc. if property has data. |
| Indexing / rich results sanity | `inspect_url` | **`siteUrl`** = property; **`inspectionUrl`** = full URL to test. |
| Archive / spreadsheet | `export_analytics` | `dimensions` + `format` `csv` \| `json`. |
| Sitemap visibility | `list_sitemaps` | Hygiene checks. |

---

## Sync plays (match thresholds to tools)

Interpret GSC as **signals**, not proof of causality. Seasonality, SERP layout, and branding skew averages.

### 1. Growth play — “striking distance”

**Intent:** Queries/pages where average position sits **just outside** strong clicks (often roughly positions **11–20**) but impressions show demand.

**Suggested pulls:**

1. `query_search_analytics` with `dimensions`: `["query","page"]`, date range **last 28 days**, reasonable `rowLimit`.
2. Filter in analysis (MCP rows or mentally): **avg position** \(10 < P \leq 20\) (tune band per niche) and **impressions** above a floor (e.g. ≥ 50–100 depending on volume).

**Brief output:** prioritized table — query, page URL, impressions, clicks, CTR, position — plus **one line “why now”** per row.

### 2. Optimization play — strong position, weak CTR

**Intent:** Position **≤ ~5** but **CTR below expectation** (PDF used **CTR &lt; 3%** as a rule-of-thumb; compare to branded vs non-brand norms).

**Suggested pulls:**

1. `find_keyword_opportunities` with explicit `maxCtr` (e.g. `0.03`), `maxPosition` (e.g. `5`), `minImpressions` scaled to site size.
2. Cross-check with `query_search_analytics` for `dimensions`: `["query","page"]` on top outliers.

**Brief output:** title/meta/showcase hypothesis (SEO architect); **do not** promise a CTR number post-change.

### 3. Decay play — material traffic drop

**Intent:** **30-day** (or 28-day) clicks/impressions **down** versus prior period at URL or query grain.

**Suggested pulls:**

1. `compare_performance` — **current** vs **previous** window of equal length; `dimension`: `page` first for sitewide regressions, then `query` for a single URL.
2. Optionally `get_keyword_trend` on the worst-hit head queries.

**Brief output:** list of losers with approximate delta; separate **technical** (inspect_url, canonical, deployment date) vs **relevance** (intent shift, competition) hypotheses for **`stratezik-seo-aeo`**.

---

## Mandatory order inside Cursor

1. **`stratezik-gsc-intelligence`** (this skill) — pull MCP data; classify plays; list URLs/queries.
2. **`stratezik-seo-aeo`** — content gap blueprint: entities, headings, internal links, schema, AEO extractability; SERP/competitor notes where needed.
3. **`stratezik-blog-writing`** — draft or revise to blueprint + voice rules.

For ship-ready posts, prefer **`stratezik-blog-seo-pipeline`** so chains stay explicit.

---

## Handoff artifact (scout → SEO architect)

Deliver a **short** block the next skill can consume:

- **Property:** `siteUrl` and date range(s).
- **Play type:** growth | optimization | decay (one primary).
- **Top opportunities:** 5–15 rows (query + page where relevant + impressions + clicks + CTR + position).
- **URLs to inspect:** 1–5 paths for **`inspect_url`** after edits or if indexing suspected.
- **Constraints:** e.g. “do not change slug”, “brand-sensitive query”, “already strong on AI Overview — preserve factual sentences”.
- **Noise caveats:** branded queries, low-volume spikes, single-day anomalies.

---

## Guardrails

- **Do not** invent metrics: every number should trace to an MCP response or exported row.
- **Do not** automate destructive CMS/git actions from GSC alone — human review before merge/deploy unless explicitly scripted elsewhere.
- Align FAQ/schema recommendations with **visible** copy (same rule as onsite SEO).
- After substantive HTML/route changes, **`inspect_url`** on affected URLs post-deploy when investigating indexing issues.

---

## Related skills

- **`stratezik-blog-seo-pipeline`** — full SEO → writing loop including when to run this scout first.
- **`stratezik-seo-aeo`** — blueprint and validation.
- **`stratezik-blog-writing`** — execution and voice.
