# Stratezik.com – Ultra-Comprehensive GSC Audit & Recommendations

Full findings from a deep Google Search Console audit covering indexing, crawling, canonicals, sitemaps, search analytics (web/image/video/news/discover), device & country breakdowns, URL inspection of 24 URLs, and on-page analysis.

**Audit date:** Feb 12, 2026 | **Property:** sc-domain:stratezik.com

---

## 0. Full Indexing Audit

### 0.1 URL Inspection Results (24 URLs inspected)

| URL | Status | Coverage | Last Crawled | Key Issue |
|-----|--------|----------|-------------|-----------|
| `https://www.stratezik.com/` | **PASS** | Submitted and indexed | Feb 12, 2026 | None – canonical homepage |
| `https://www.stratezik.com/careers` | **PASS** | Submitted and indexed | Jan 23, 2026 | Duplicate content risk (see below) |
| `https://stratezik.com/` | NEUTRAL | Page with redirect | Feb 4, 2026 | Redirects to www (expected) |
| `https://www.stratezik.com/front_page/` | **NEUTRAL** | **Blocked by robots.txt** | Dec 19, 2025 | **CRITICAL** – blocked but still getting impressions |
| `https://stratezik.com/front_page/` | **NEUTRAL** | Duplicate, Google chose different canonical | Jul 30, 2025 | **CRITICAL** – Google mapped to `/author/biplab/` |
| `https://www.stratezik.com/author/biplab/` | NEUTRAL | Crawled – currently not indexed | Oct 16, 2025 | Ghost canonical target; fed by WP users sitemap |
| `https://stratezik.com/author/biplab/` | NEUTRAL | Crawled – currently not indexed | Oct 16, 2025 | Non-www duplicate of above; referred by `wp-sitemap-users-1.xml` |
| `https://www.stratezik.com/about` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/about-us` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/services` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/contact` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/contact-us` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/blog` | NEUTRAL | **Unknown to Google** | Never | Never crawled |
| `https://www.stratezik.com/feed/` | NEUTRAL | Unknown to Google | Never | – |
| `https://www.stratezik.com/sample-page/` | NEUTRAL | Unknown to Google | Never | WP default — delete if exists |
| `https://www.stratezik.com/hello-world/` | NEUTRAL | Unknown to Google | Never | WP default post — delete if exists |
| `https://www.stratezik.com/privacy-policy/` | NEUTRAL | Unknown to Google | Never | Should be in sitemap if it exists |
| `https://www.stratezik.com/category/uncategorized/` | NEUTRAL | Unknown to Google | Never | WP default — delete or noindex |
| `https://www.stratezik.com/wp-login.php` | NEUTRAL | Unknown to Google | Never | Expected, not an issue |
| `https://www.stratezik.com/wp-sitemap.xml` | NEUTRAL | Unknown to Google | Never | WordPress auto-sitemap (see issue below) |
| `https://www.stratezik.com/wp-sitemap-posts-page-1.xml` | NEUTRAL | Unknown to Google | Never | – |
| `https://www.stratezik.com/wp-sitemap-posts-post-1.xml` | NEUTRAL | Unknown to Google | Never | – |
| `https://www.stratezik.com/wp-sitemap-users-1.xml` | NEUTRAL | Unknown to Google | Never | – |
| `https://www.stratezik.com/wp-sitemap-taxonomies-category-1.xml` | NEUTRAL | Unknown to Google | Never | – |

**Totals: 2 indexed / 2 redirect-blocked / 1 canonical conflict / 1 robots-blocked / 18 unknown to Google.**

### 0.2 Sitemap Status

| Sitemap | Type | Submitted | Indexed | Last Downloaded | Errors | Warnings |
|---------|------|-----------|---------|-----------------|--------|----------|
| `https://www.stratezik.com/sitemap.xml` | sitemap | 2 | **0** | Dec 31, 2025 | 0 | 0 |

- **0 out of 2 submitted URLs are indexed from the sitemap.** The sitemap is effectively useless — Google found the 2 indexed pages through crawling, not the sitemap.

### 0.3 Search Performance – Pages (16 months)

| Page | Clicks | Impressions | CTR | Avg Pos |
|------|--------|-------------|-----|---------|
| `https://www.stratezik.com/` | 2 | 37 | 5.41% | 7.3 |
| `https://stratezik.com/` | 2 | 18 | 11.11% | 3.9 |
| `https://www.stratezik.com/careers` | 0 | 12 | 0.00% | 9.8 |
| `https://stratezik.com/front_page/` | 0 | 8 | 0.00% | 2.0 |
| `https://www.stratezik.com/front_page/` | 0 | 4 | 0.00% | 2.8 |

**Signal splitting:** The homepage shows impressions under BOTH `stratezik.com/` and `www.stratezik.com/` — Google is counting them as separate entities, diluting your authority.

### 0.4 Search Performance – Queries (16 months)

| Query | Clicks | Impressions | CTR | Avg Pos |
|-------|--------|-------------|-----|---------|
| *(anonymous/branded queries)* | 4 | 56 | — | — |
| `zik-digital.com` | 0 | 2 | 0.00% | 76.0 |

**Only 1 named query in 16 months of data.** The vast majority of your 56 impressions come from queries Google doesn't surface (likely brand variations like "stratezik"), but you get almost no clicks.

### 0.5 Device Breakdown (16 months)

| Device | Clicks | Impressions | CTR | Avg Pos |
|--------|--------|-------------|-----|---------|
| **Desktop** | 4 | 53 | 7.55% | 8.1 |
| **Mobile** | 0 | 5 | 0.00% | 1.4 |

- 91% of impressions are desktop. Mobile has only 5 impressions total (position 1.4 though, which is good).
- **0 clicks on mobile** — could indicate mobile rendering or UX issues.

### 0.6 Country Breakdown (16 months)

| Country | Clicks | Impressions | CTR | Avg Pos |
|---------|--------|-------------|-----|---------|
| **Canada (can)** | 3 | 12 | 25.00% | 2.8 |
| **UAE (are)** | 1 | 1 | 100.00% | 1.0 |
| **USA (usa)** | 0 | 24 | 0.00% | 9.6 |
| Brazil (bra) | 0 | 3 | 0.00% | 1.0 |
| Germany (deu) | 0 | 2 | 0.00% | 1.0 |
| Turkey (tur) | 0 | 2 | 0.00% | 2.5 |
| Philippines (phl) | 0 | 2 | 0.00% | 25.0 |
| 8 other countries | 0 | 8 total | 0.00% | varies |

- **USA has 24 impressions (41% of total) but 0 clicks** — your snippet/title isn't compelling enough, or you rank too low (avg pos 9.6 = bottom of page 1).
- **Canada (your target market) has only 12 impressions total** in 16 months.

### 0.7 Page + Query Combinations

| Page | Query | Clicks | Impressions | Pos |
|------|-------|--------|-------------|-----|
| `https://www.stratezik.com/` | `zik-digital.com` | 0 | 1 | 88.0 |
| `https://www.stratezik.com/careers` | `zik-digital.com` | 0 | 1 | 64.0 |

The only surfaced query is a competitor domain. You have zero visibility for your own brand terms in the query data.

### 0.8 Search Appearance

**No rich results. No special search features. No sitelinks. Nothing.**

### 0.9 Image / Video / News / Discover

| Channel | Data |
|---------|------|
| **Image Search** | 2 impressions total: "stragistic" (pos 18) and "stratskye" (pos 15) — both misspellings, 0 clicks |
| **Video Search** | No data |
| **News Search** | No data |
| **Google Discover** | No data |

### 0.10 Monthly Performance Trend

| Month | Clicks | Impressions | Days with data |
|-------|--------|-------------|----------------|
| 2025-10 | 2 | 10 | 15 |
| 2025-11 | 0 | 7 | 30 |
| 2025-12 | 1 | 10 | 31 |
| 2026-01 | 1 | 25 | 31 |
| 2026-02 | 0 | 6 | 10 |

- Performance is **flat/stagnant** — no growth trend over 5 months.
- January spike to 25 impressions, but still 0 clicks in February so far.

---

## 1. ALL Critical & New Issues Found

### CRITICAL 1: WordPress Auto-Sitemaps Still Active on Non-WWW Domain
- **`https://stratezik.com/wp-sitemap-posts-page-1.xml`** is still live and referring Google to non-www URLs like `https://stratezik.com/` and `https://stratezik.com/front_page/`.
- **`https://stratezik.com/wp-sitemap-users-1.xml`** is still live and referring Google to `https://stratezik.com/author/biplab/` — this is the ROOT CAUSE of the `/author/biplab/` canonical conflict.
- **Fix:** Disable WordPress default XML sitemaps entirely (add `add_filter('wp_sitemaps_enabled', '__return_false');` to `functions.php`) and use only your manually submitted sitemap. Or redirect all `/wp-sitemap*` URLs to your main sitemap.

### CRITICAL 2: `/front_page/` Canonical Conflict (Still Active)
- `https://stratezik.com/front_page/` → Google chose `https://www.stratezik.com/author/biplab/` as canonical.
- `https://www.stratezik.com/front_page/` → Blocked by robots.txt (Google can't even see the redirect).
- **Root cause:** The non-www WordPress pages sitemap (`wp-sitemap-posts-page-1.xml`) lists `/front_page/` as a URL. Google crawls it, sees similar thin content as the author page, and picks the author page as canonical.
- **Fix:** 301 redirect `/front_page/` → `/` at server level. Remove from all sitemaps. Unblock in robots.txt so Google sees the 301.

### CRITICAL 3: /careers Page May Be Duplicate/Thin Content
- The live `/careers` page serves content that is **nearly identical** to the homepage in structure — same layout, similar meta, overlapping text.
- Google indexed it, but it gets 0 clicks and 12 impressions at position 9.8.
- **Fix:** Give `/careers` unique, differentiated content (actual job listings, team info, benefits). If there are no open positions, consider noindexing it or merging it into the homepage.

### CRITICAL 4: Signal Splitting Between www and Non-www
- Google is counting `https://stratezik.com/` and `https://www.stratezik.com/` as **separate URLs** in search analytics.
- Combined: 4 clicks, 55 impressions. Split: each gets roughly half the authority.
- **Fix:** The non-www → www redirect exists, but the **non-www WordPress sitemaps** keep feeding Google non-www URLs. Disabling WP auto-sitemaps (Critical 1) will fix this over time.

### CRITICAL 5: Sitemap Is Broken/Ineffective (0 Indexed from Sitemap)
- 2 URLs submitted, **0 indexed from sitemap**.
- The sitemap likely contains URLs that redirect or aren't final canonical versions.
- **Fix:** Rebuild the sitemap with only canonical www URLs. Resubmit in GSC. Verify using the Sitemaps report.

### HIGH 6: Zero Brand Query Visibility
- In 16 months, the only named query Google shows is `zik-digital.com` (a competitor).
- Searches for "stratezik" or "stratezik digital marketing" don't appear in your query data — meaning Google either doesn't associate your site with those terms, or your impressions for them are below the reporting threshold.
- **Fix:** See on-page recommendations (Section 3). Also ensure you have a Google Business Profile, social media profiles, and directory listings all using "Stratezik" consistently.

### HIGH 7: No Rich Results / Search Appearance Features
- Zero structured data detected. No sitelinks, no FAQ schema, no organization markup, nothing.
- **Fix:** Add Organization JSON-LD, LocalBusiness JSON-LD, and FAQ schema where applicable. This helps Google show enhanced results (sitelinks, knowledge panel, rich snippets).

### HIGH 8: 6+ Key Pages Completely Unknown to Google
- `/about`, `/about-us`, `/services`, `/contact`, `/contact-us`, `/blog`, `/privacy-policy/` — none of these have ever been crawled.
- **Fix:** Add all existing pages to the sitemap. Ensure they're linked from the main navigation. Request indexing for each in GSC.

### HIGH 9: USA – 24 Impressions, 0 Clicks
- USA is your highest-impression country but has **zero clicks** (avg position 9.6).
- **Fix:** Improve title tag and meta description to be more compelling and action-oriented. Position 9.6 means you're at the bottom of page 1 — improving on-page signals could push you up.

### MEDIUM 10: WordPress Default Content (sample-page, hello-world, uncategorized)
- These WordPress default pages exist (or may exist) and could be crawled in the future.
- **Fix:** Delete `sample-page`, `hello-world` post, and the `uncategorized` category. If they can't be deleted, noindex them.

### MEDIUM 11: Mobile – 0 Clicks, Only 5 Impressions
- Mobile gets almost no visibility despite ranking at position 1.4 on average.
- **Fix:** Check mobile rendering (PageSpeed Insights mobile audit). Ensure the site is fully responsive with good Core Web Vitals on mobile.

### MEDIUM 12: No Image Optimization
- Image search only triggered for 2 misspelled queries. No brand-related image impressions.
- **Fix:** Add descriptive alt text to all images (e.g., "Stratezik digital marketing team Toronto"). Use WebP format. Add image structured data if you have a logo or key visuals.

---

## 2. robots.txt Review

### Current robots.txt (already updated from previous recommendations):
```
User-agent: *
Allow: /

# Block WordPress admin
Disallow: /wp-admin/

# Block author archives
Disallow: /author/

# Block date archives
Disallow: /2020/
Disallow: /2021/
Disallow: /2022/
Disallow: /2023/
Disallow: /2024/
Disallow: /2025/
Disallow: /2026/

Sitemap: https://www.stratezik.com/sitemap.xml
```

**Status:** The `/wp-content/` and `/wp-json/` blocks have been removed (good). However:
- The `/front_page/` URL is still **showing as blocked** in Google's index from the old robots.txt. It will take time for Google to re-crawl and see the updated robots.txt.
- **Action:** Request re-crawl of `https://www.stratezik.com/front_page/` in URL Inspection after confirming the 301 redirect is in place.

---

## 3. On-Page Recommendations

### 3.1 Homepage Title Tag
- **Current:** *Stratezik - Toronto's Premier Digital Marketing Agency | Strategic Solutions*
- **Recommended:** `Stratezik | Digital Marketing Agency Canada – Toronto SEO, PPC & Strategy`

### 3.2 Homepage Meta Description
- Include "Stratezik digital marketing Canada" + benefit + CTA.
- **Example:** *Stratezik is a digital marketing agency in Canada. We help Toronto businesses grow with SEO, PPC, and strategy. Get your free consultation.*

### 3.3 Homepage H1 and First Paragraph
- Include "Stratezik," "digital marketing," and "Canada" / "Toronto, Canada" in the H1 and first 150 words.

### 3.4 Careers Page
- Must have **completely different content** from the homepage.
- Include job-specific content: open positions, company culture, benefits, application process.

### 3.5 Structured Data (JSON-LD)
Add to the homepage `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stratezik",
  "url": "https://www.stratezik.com/",
  "description": "Stratezik is a digital marketing agency in Toronto, Canada specializing in SEO, PPC, and strategy.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "sameAs": [
    "https://www.linkedin.com/company/stratezik",
    "https://www.instagram.com/stratezik"
  ]
}
```

---

## 4. WordPress-Specific Fixes

### 4.1 Disable WordPress Default XML Sitemaps
Add to `functions.php`:
```php
// Disable WordPress default sitemaps (we use our own sitemap.xml)
add_filter( 'wp_sitemaps_enabled', '__return_false' );
```
This prevents `wp-sitemap.xml`, `wp-sitemap-posts-page-1.xml`, `wp-sitemap-users-1.xml`, etc. from being generated and feeding Google non-www and author URLs.

### 4.2 Delete Default WordPress Content
- Delete the "Hello World" post
- Delete the "Sample Page"
- Delete or rename the "Uncategorized" category
- Delete or repurpose `/front_page/` slug (change the page slug in WordPress, then 301 redirect old URL)

### 4.3 Author Archives
- If using an SEO plugin (Yoast/RankMath/AIOSEO), disable author archives entirely.
- Or add noindex to author archive pages.

### 4.4 Ensure the Non-www → www Redirect Covers All Paths
- Currently `stratezik.com/` → `www.stratezik.com/` works.
- Verify that ALL non-www paths redirect (e.g., `stratezik.com/careers` → `www.stratezik.com/careers`).
- Verify that `stratezik.com/wp-sitemap-posts-page-1.xml` also redirects properly (currently it seems to resolve to the homepage instead of a proper redirect).

---

## 5. Master Fix Checklist (Prioritized)

| # | Issue | Fix | Priority | Category |
|---|-------|-----|----------|----------|
| 1 | WordPress auto-sitemaps feeding Google non-www + author URLs | Add `wp_sitemaps_enabled` → false in functions.php | **Critical** | Root cause |
| 2 | `/front_page/` canonical mapped to `/author/biplab/` | 301 redirect `/front_page/` → `/`, remove from sitemaps | **Critical** | Canonical conflict |
| 3 | Signal splitting: www vs non-www in search results | Fix #1 stops feeding non-www; redirect already exists | **Critical** | Authority dilution |
| 4 | Sitemap: 0 out of 2 indexed | Rebuild sitemap with only canonical www URLs, resubmit | **Critical** | Indexing |
| 5 | `/careers` page — near-duplicate of homepage | Rewrite with unique career/job content | **High** | Duplicate content |
| 6 | 6+ key pages unknown to Google | Add to sitemap, link from nav, request indexing | **High** | Discovery |
| 7 | No structured data / rich results | Add Organization + LocalBusiness JSON-LD | **High** | Search features |
| 8 | Author archives still crawlable (and cached by Google) | Noindex via SEO plugin, or disable entirely | **High** | Canonical cleanup |
| 9 | Zero brand query visibility | Update title/meta/H1 with "Stratezik digital marketing Canada" | **High** | On-page |
| 10 | USA: 24 impressions, 0 clicks | Improve title + meta description for CTR | **High** | CTR |
| 11 | WP defaults (hello-world, sample-page, uncategorized) | Delete or noindex | **Medium** | Cleanup |
| 12 | Mobile: 0 clicks, 5 impressions | Audit mobile UX, check Core Web Vitals | **Medium** | Mobile |
| 13 | No image SEO | Add alt text, WebP, image structured data | **Medium** | Images |
| 14 | Internal linking weak | Link all pages from nav, use brand anchor text | **Medium** | Link equity |
| 15 | No Google Business Profile signal | Create/verify GBP with "Stratezik" + Toronto | **Medium** | Brand |
| 16 | Request re-indexing for updated pages | Use URL Inspection → Request Indexing for homepage, careers | **Low** | Indexing |

---

## 6. Expected Impact Timeline

| Timeframe | What to expect |
|-----------|----------------|
| **Week 1-2** | Implement all Critical fixes (WP sitemaps, redirects, sitemap rebuild). Request re-indexing. |
| **Week 2-4** | Google re-crawls with new robots.txt and sitemap. `/front_page/` and author page canonical conflict starts resolving. |
| **Month 2** | Signal consolidation: www and non-www merge in search results. New pages start appearing in index. |
| **Month 2-3** | Brand searches ("stratezik") should start showing your site more consistently. Rich results may begin appearing if structured data is correct. |
| **Month 3-6** | Steady growth in impressions and clicks as on-page optimizations take effect and Google trusts the consolidated signals. |

---

*Generated from ultra-comprehensive GSC audit — Stratezik (sc-domain:stratezik.com) — Feb 12, 2026.*
*24 URLs inspected | 16 months of search data analyzed | Web, Image, Video, News, Discover channels checked.*
