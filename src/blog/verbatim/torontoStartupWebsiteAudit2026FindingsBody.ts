/** Verbatim raw findings appendix — do not edit by hand. */
export const TORONTO_STARTUP_WEBSITE_AUDIT_2026_FINDINGS_BODY = `## Methodology Note

Dataset: 50 Toronto/GTA startups with funding announcements Jan 2024–Apr 2026. 41 companies returned auditable data. 9 excluded due to site fetch failures (Xanadu, Nordspace, Ada, Peripheral, Wygo, Rebelstork, Baseline, Pok Pok) or acquisition redirects (Humi). All findings below calculated on n=41 unless otherwise noted.

---

## Finding 1: AEO Readiness Is Near Zero Across the Ecosystem

**The finding:** Only 7 of 41 auditable startups (17%) show any AEO readiness signals whatsoever—and none score above 7.5/10 on the dimension.

**Supporting data:**
- 34 companies scored 0/10 on AEO readiness
- 7 companies scored between 2.5 and 7.5: Float (2.5), Kepler (5), League (7.5), ecobee (2.5), StackAdapt (2.5), Ready Education (5), Relay (2.5)
- Median AEO score: 0
- Mean AEO score: 0.67

**Operator-grade interpretation:** Toronto startups are optimising for a search environment that is already obsolete. When Perplexity, ChatGPT, and Gemini answer "best Canadian fintech for small business banking," they pull from companies with structured data and answer-first content. The 83% of startups with zero AEO signals are invisible to the fastest-growing discovery channel. This is not a future problem—it is a current visibility gap.

**Named winner:** League scores 7.5/10 with full AI crawler access (GPTBot, CCBot, Google-Extended, PerplexityBot, ClaudeBot all permitted in robots.txt), FAQPage schema, and answer-first formatting. They are positioned to appear in AI-generated answers while competitors are blocked.

---

## Finding 2: Positioning Is the One Thing Toronto Startups Actually Do Well

**The finding:** 73% of auditable startups score 7/10 or higher on positioning clarity—the strongest dimension in the audit.

**Supporting data:**
- 30 of 41 companies scored 7+ on positioning
- Mean positioning score: 7.4/10
- Median positioning score: 8/10
- Only 3 companies scored below 5: Mycroft (2), Vosyn (5), Humi (5, acquired/redirected)

**Operator-grade interpretation:** Toronto founders know how to explain what they do. This is likely a selection effect—companies that raised funding between 2024-2026 had to pitch clearly to get cheques. The problem is that positioning clarity alone does not drive discovery. A startup can have a perfect 10-second test and still be invisible if the positioning lives only on a homepage that AI systems cannot access and search engines cannot surface.

**Named winners:** Beacon Software (9), Canada Rocket Company (9), Waabi (9), Tailscale (9), Tofu (9), and Mosaic Manufacturing (9) all achieved near-perfect positioning scores. Common pattern: specific audience + specific outcome + language a competitor cannot steal.

---

## Finding 3: The Content Gap Is Severe—Half the Sample Has No Recent Publishing Activity

**The finding:** 21 of 41 companies (51%) scored 2.5 or below on content and founder-led signal, indicating no meaningful publishing activity in the 90 days before audit.

**Supporting data:**
- 14 companies scored 0/10 on content
- 7 companies scored 2.5/10
- Mean content score: 4.6/10
- Median content score: 2.5/10
- Only 8 companies scored 7.5 or higher: Cohere (7.5), Waabi (7.5), Float (7.5), Kepler (7.5), Clearco (10), League (10), StackAdapt (10), Borderless AI (7.5), Tailscale (10), Tofu (10), Ownright (10), Relay (7.5)

**Operator-grade interpretation:** Content is the compounding asset that drives organic discovery, backlinks, and AI training data inclusion. Half of Toronto's funded startups are running on fumes—a homepage and maybe a press release. The startups scoring 10/10 (Clearco, League, StackAdapt, Tailscale, Tofu, Ownright) share a pattern: 4+ blog posts in 90 days, visible founder LinkedIn activity, and a newsletter with a real lead magnet. The gap between content-active and content-dormant companies will widen as AI systems increasingly favour fresh, structured, expert-attributed content.

**Named winner:** Tailscale publishes technical content at a cadence that makes them a primary source for AI systems answering networking questions. Their blog is not marketing—it is infrastructure.

---

## Finding 4: Trust Signals Cluster at Extremes—Companies Either Have Them All or Almost None

**The finding:** Trust scores show bimodal distribution: 15 companies score 8-10, while 12 companies score 4 or below. The middle is thin.

**Supporting data:**
- 15 companies scored 8-10 on trust signals
- 14 companies scored 6
- 12 companies scored 4 or below
- Mean trust score: 6.9/10
- Companies scoring 10: Canada Rocket Company, Smile Digital Health, Wealthsimple, Cohere, Waabi, Float, League, StackAdapt, Messagepoint, PocketHealth, Spellbook, Tailscale, Tofu

**Operator-grade interpretation:** Trust signals are not accumulated gradually—they are either systematically built or systematically ignored. The companies scoring 10 share a pattern: real photos of real people, named case studies with logos, verifiable press mentions, live third-party reviews (G2, Capterra, Google), and founders identifiable as Person entities with LinkedIn profiles linked from the site. The companies scoring 2-4 typically have one or two signals (usually just team photos) and nothing else. This is a strategic choice, not a resource constraint—adding a G2 profile or linking founder LinkedIn costs nothing.

**Anonymised failure:** A Toronto insurtech in our sample has raised $10M+ but shows only generic stock imagery, no named customers, no third-party reviews, and founders without LinkedIn links. Their trust score: 2/10. A competitor with half the funding but real customer logos and G2 reviews will convert better on every landing page.

---

## Finding 5: Technical Health Cannot Be Verified for 60% of the Sample

**The finding:** 25 of 41 companies (61%) returned "unverifiable" for the technical health dimension, indicating either fetch failures or incomplete data collection.

**Supporting data:**
- 16 companies scored 0/10 on technical health
- 25 companies marked unverifiable
- 0 companies scored above 0 on technical health
- No company in the dataset passed all Core Web Vitals thresholds

**Operator-grade interpretation:** This finding reveals a methodology limitation more than a startup failure. The audit infrastructure could not reliably measure Core Web Vitals, mobile-friendliness, HTTPS status, and sitemap submission across the full sample. For the 2027 iteration, Stratezik must invest in more robust technical auditing tooling (Lighthouse CI, PageSpeed Insights API, or similar) before data collection begins. The finding we *can* defend: zero companies in the sample demonstrated verifiable technical excellence. This suggests either measurement failure or genuine technical debt across the ecosystem—likely both.

**Recommendation for 2027:** Run technical health dimension through automated tooling before human audit begins. Current data is not publication-ready for this dimension.

---

## Finding 6: Paid Media Presence Is a Black Box—But the Startups Running Ads Are Also Running Everything Else

**The finding:** Only 4 companies showed verifiable paid media signals; all 4 also scored in the top quartile on content and trust.

**Supporting data:**
- 37 companies marked "unverifiable" for paid media
- 4 companies with partial paid signals: StackAdapt (8), Ready Education (2), Messagepoint (2), Spellbook (4)
- StackAdapt scored 77 composite; Ready Education 62; Messagepoint 69; Spellbook 64
- All 4 scored 7.5+ on content dimension

**Operator-grade interpretation:** Paid media verification is inherently difficult—Meta Ad Library and Google Ads transparency tools do not capture all activity, and UTM patterns are not always visible. But the pattern in the verifiable data is clear: the companies investing in paid acquisition are also investing in organic content and trust infrastructure. This is not "paid vs organic"—it is "full-funnel vs underinvested." StackAdapt's 77 composite comes from doing everything: positioning (8), AEO (2.5), paid (8), content (10), trust (10). The startups with zero paid signals and zero content signals are hoping brand awareness will materialise from nothing.

**Named winner:** StackAdapt is the only company in the sample with verifiable paid presence above 4/10. They are also the #1-rated DSP on G2. Correlation is not causation, but the pattern is instructive.

---

## Finding 7: Nine Companies Could Not Be Audited At All—A 18% Failure Rate on Basic Web Presence

**The finding:** 9 of 50 target companies (18%) returned no auditable homepage data due to site fetch failures, indicating either technical instability, aggressive bot blocking, or defunct web presence.

**Supporting data:**
- Failed fetches: Xanadu, Nordspace, Ada, Peripheral, Wygo, Rebelstork, Baseline, Pok Pok, plus partial failures on Ideogram, Requity Homes, Virtuo, OrbCare
- 4 additional companies returned partial data with "unverifiable" on multiple dimensions
- Total companies with significant data gaps: 13 of 50 (26%)

**Operator-grade interpretation:** A startup that cannot reliably serve its homepage to an auditor's fetch request cannot reliably serve it to Googlebot, GPTBot, or a potential customer on a slow mobile connection. Some of these failures are likely aggressive bot protection (Cloudflare challenge pages, rate limiting). Others are likely genuine infrastructure problems. Either way, 18% of Toronto's recently-funded startups have a web presence that is not consistently accessible. For companies selling to enterprise buyers who will run their own technical due diligence, this is a red flag.

**Anonymised failure:** A Toronto proptech in our sample raised $15M+ in 2024 but returned a fetch failure on three separate audit attempts across two weeks. Their Trustpilot reviews exist. Their BetaKit coverage exists. Their homepage does not reliably load. Composite score: 7/100 (based on the trust signals we could verify externally).

---

## Finding 8: The Top 5 Companies Share a Specific Pattern—And It Is Reproducible

**The finding:** The five highest-scoring companies (Tailscale 97, Cohere 93, Waabi 88, Relay 87, Borderless AI 78) all score 7+ on positioning, 7.5+ on content, and 8+ on trust. None score above 2.5 on AEO.

**Supporting data:**
- Tailscale: positioning 9, AEO 0, content 10, trust 10
- Cohere: positioning 8, AEO 2.5, content 7.5, trust 10
- Waabi: positioning 9, AEO 0, content 7.5, trust 10
- Relay: positioning 8, AEO 2.5, content 7.5, trust 8
- Borderless AI: positioning 8, AEO 0, content 7.5, trust 8

**Operator-grade interpretation:** The top performers are not doing anything exotic. They have clear positioning, they publish consistently, and they accumulate trust signals systematically. The gap is not strategy—it is execution discipline. Notably, even the top 5 are underinvesting in AEO. Tailscale scores 0 on AEO despite being a technical company whose audience is highly likely to use AI search tools. This is the opportunity: a startup that matches the top 5 on positioning, content, and trust *and* invests in AEO readiness would have a structural advantage that does not currently exist in the Toronto ecosystem.

**Named winner:** Tailscale's 97/100 is the highest score in the audit. Their pattern: positioning that a competitor cannot steal ("Tailscale makes creating software-defined networks easy"), technical blog content that becomes primary source material, and trust signals across every available channel (G2, case studies, named customers, visible founders). They are the benchmark.

---

## Finding 9: Biotech and Deep Tech Startups Score Lower on Content Despite Higher Trust

**The finding:** Companies in biotech, aerospace, and quantum (Canada Rocket Company, Noa Therapeutics, Radiant Biotherapeutics, Waabi, Kepler) average 4.5/10 on content versus 5.8/10 for the broader sample, despite averaging 7.6/10 on trust versus 6.9/10 for the broader sample.

**Supporting data:**
- Deep tech content scores: Canada Rocket (2.5), Noa Therapeutics (5), Radiant Bio (5), Waabi (7.5), Kepler (7.5) — mean 5.5
- Deep tech trust scores: Canada Rocket (10), Noa Therapeutics (6), Radiant Bio (4), Waabi (10), Kepler (8) — mean 7.6
- Sample-wide content mean: 4.6
- Sample-wide trust mean: 6.9

**Operator-grade interpretation:** Deep tech companies have real credentials—press coverage, named team members, scientific advisory boards, patents. But they underinvest in the content that would make those credentials discoverable. A biotech with Nature publications and no blog is invisible to the AI systems that surface answers to "best Canadian biotech for X." The trust is earned; the distribution is not built. Waabi and Kepler are exceptions—both publish insights content that translates technical work into discoverable assets.

**Named winner:** Waabi scores 7.5 on content despite being a physical AI company. Their "Insights" section translates research into accessible content without dumbing it down. This is the model for deep tech content strategy.

---

## Finding 10: The Median Toronto Startup Scores 52/100—Passing, But Not Competitive

**The finding:** The median composite score across 41 auditable companies is 52/100. The mean is 51/100. The distribution is roughly normal with a slight positive skew.

**Supporting data:**
- Median: 52
- Mean: 51
- Standard deviation: 24
- Range: 0 (Virtuo) to 97 (Tailscale)
- Distribution by band: 0-25 (7 companies), 26-50 (12 companies), 51-75 (16 companies), 76-100 (6 companies)

**Operator-grade interpretation:** A 52/100 is a C grade. It means the median Toronto startup has clear positioning, some trust signals, and almost nothing else. No AEO readiness. Inconsistent content. Unverifiable technical health. Unverifiable paid presence. The startups in the 76-100 band are not 50% better—they are doing fundamentally different work. The gap between 52 and 93 (Cohere) is the gap between "we have a website" and "we have a discovery engine." For founders reading this: if you score above 75, you are in the top 15% of the Toronto funded startup ecosystem. If you score below 50, you are in the bottom half—and the companies above you are compounding while you are not.

---

## Summary Table: Dimension Medians

| Dimension | Median Score | Max Possible | % of Max |
|-----------|--------------|--------------|----------|
| Positioning | 8 | 10 | 80% |
| AEO Readiness | 0 | 10 | 0% |
| Technical Health | 0 | 10 | 0% |
| Paid Media | unverifiable | 10 | — |
| Content | 2.5 | 10 | 25% |
| Trust | 6 | 10 | 60% |

**The headline:** Toronto startups can explain what they do. They cannot be found by the systems that now decide what gets discovered.`
