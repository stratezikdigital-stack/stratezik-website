---
name: stratezik-seo-aeo
description: >-
  Plans and audits technical SEO, on-page SEO, off-site signals, local and
  entity optimization, plus answer-engine optimization (AEO) for AI summaries
  and assistants. Use when improving rankings, citations in AI Overviews,
  structured data, migrations, content briefs, SERP features, Google Business
  Profile, internal linking, Core Web Vitals, or any stratezik.com property
  where organic discovery and answer surfaces matter.
---

# Stratezik SEO and AEO playbook

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

Use as an audit spine; tailor depth to the stack (here: Vercel-hosted SPA with prerender/noscript shell, client routing).

### Crawling and indexation

- [ ] **Robots**: no accidental broad blocks; critical resources not disallowed; staging excluded.
- [ ] **Sitemap**: clean URLs only, accurate `lastmod` where truthful, submitted in GSC, no junk or orphan masses.
- [ ] **Canonical**: single preferred URL per indexable page; self-referencing canonical on indexable pages; HTTP→HTTPS and host consolidation (www vs apex) consistent with live internal links.
- [ ] **Redirects**: 301 chains minimized; soft 404s eliminated; redirect hop count sane for bots.
- [ ] **Pagination/filters**: parameters handled (canonical or noindex strategy coherent); infinite states not indexed as duplicates.
- [ ] **JavaScript rendering**: confirm critical content and links in **initial HTML** where possible; validate **mobile-friendly** and **fetch like Google** equivalents when debugging.

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
- [ ] **Internal links**: descriptive anchors; hub-and-spoke between related services, proof (case studies), and conversions (contact).

### Duplicate and thin content

- Consolidate near-duplicates with redirects or clear differentiation.
- Avoid doorway-style programmatic spreads unless each URL earns existence with unique utility.

---

## 3. Structured data and rich results

- Pick types that **truthfully match** the page: `Organization`, `LocalBusiness` where applicable, `WebSite`, `BreadcrumbList`, `FAQPage`, `Article`, `Service`, `Product` only when honest.
- **JSON-LD** preferred for consistency with current examples in Search Central.
- Validate with **Rich Results Test** and monitor **GSC enhancements**.
- Keep FAQ answers aligned with visible content; avoid contradictory schema.

---

## 4. AEO (answer engines and AI summaries)

Goal: be **quotable** and **corroborated**, not merely ranked.

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
- [ ] Internal links to next steps (service, case proof, contact).
- [ ] Schema matches visible content.
- [ ] No conflicting canonical or noindex surprises.
- [ ] Metrics or claims sourced or qualified (avoid stale stats).
- [ ] **AEO pass**: could an assistant cite one paragraph without hallucinating context?

---

## Stratezik alignment

- Respect shipped voice rules from **`stratezik-blog-writing`**: no long-dash punctuation as prose glue; Canadian spelling where the site uses it.
- Prefer **Toronto / GTA / Canada** specificity when the asset targets local operators.
- Tie recommendations to **measurable engagement outcomes**, not vanity rankings alone.

When platform guidance conflicts with legacy SEO folklore, **follow primary documentation** and explain the trade in one sentence.
