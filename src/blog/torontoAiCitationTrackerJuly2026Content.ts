/** Verbatim approved copy — do not edit without re-syncing from content/approved. */

export const TRACKER_JULY_MAIN_MARKDOWN = `**The short version:**

- We asked ChatGPT, Perplexity, Google AI Mode, and Claude the same 50 high-intent Toronto buying questions, across 10 local-service categories. Across all 200 answers, an AI assistant named a specific local business 89% of the time. AI search recommends real Toronto businesses far more than most owners assume.
- The four engines are not equal. Google AI Mode named a local business 98% of the time, Claude 94%, ChatGPT 90%, and Perplexity only 74%. Which assistant your customer opens changes whether you exist in the answer.
- Perplexity has a Scarborough problem. On several Scarborough queries it resolved the name to Scarborough in the United Kingdom and recommended businesses there. The other three engines kept Scarborough in Toronto every time.
- Claude behaves differently from the other three because it is the one engine people use while signed in. On a few queries it read the founder's own account context into the answer instead of acting as a neutral consumer tool. We flag this because it changes how you should read Claude's numbers, and because it is a preview of a problem every logged-in AI assistant will eventually have.
- ChatGPT is starting to sell ads on these questions, but barely. Only 2 of 50 questions showed a live ad, and both went to a mismatched advertiser (an Ottawa lawyer, a windows company on a bathroom-reno question). 8 of 10 categories showed zero ads.
- This is edition one, our baseline. From August we report month-over-month movement: who gained AI visibility, who lost it, and which categories shifted.

## Why we run this

Nobody publishes a Toronto-specific measure of who the AI assistants actually recommend. The global reports quote a single citation percentage. Nobody tracks the real Toronto picture, category by category, month after month. So we built it.

Each month we ask the same 50 questions, frozen so the numbers stay comparable, to the assistants people actually use: ChatGPT, Perplexity, Google AI Mode, and now Claude. We record whether the answer names a local business, which businesses it names, and where they land in the answer. Over a year this becomes a dataset nobody else has. This is the first full reading.

## How we measured it

We ran 50 fixed questions across 10 categories (dental, personal injury law, accounting, pest control, plumbing, general contracting, restaurants, wellness clinics, medical clinics, and home services), five questions each. Every question went to all four assistants in a clean session on July 3, 2026, giving 200 data points. For each answer we recorded whether any Toronto or GTA business was named, the names, and the position of the first local mention.

One methodology note worth stating plainly: ChatGPT, Perplexity, and Google AI Mode were run logged out, in fresh sessions with no history. Claude does not offer a comparable logged-out mode for this kind of query, so we ran it signed in to a Stratezik account. That difference matters, and Finding 3 below is about exactly what it produces. Where an engine refused a query or errored, we marked it and left it out of the percentages rather than guessing. The full frozen question set and the dataset are available on request.

## Finding 1: AI recommends Toronto businesses most of the time, but the engine matters

Across all 200 answers, an assistant named a specific Toronto or GTA business 89% of the time. That is the reassuring headline for local owners: this channel is built to recommend real businesses, and it does.

The gap between engines is the real story.

| Engine | Named a local business |
|---|---|
| Google AI Mode | 98% (49 of 50) |
| Claude | 94% (47 of 50) |
| ChatGPT | 90% (45 of 50) |
| Perplexity | 74% (37 of 50) |

Google AI Mode almost never fails to name a local option, and Claude is close behind it. ChatGPT trails slightly. Perplexity trails by 20 points or more, either giving generic advice with no businesses attached or, in one case, resolving a place name to the wrong country. If a customer asks Perplexity and gets a how-to article instead of a shortlist, every business in that category is invisible for that search, no matter how good it is.

## Finding 2: Perplexity keeps sending Scarborough to the United Kingdom

This is the result that should concern any business in Scarborough. On several Scarborough queries, Perplexity resolved the name to Scarborough in North Yorkshire, England, and recommended businesses there. It offered UK massage clinics for a registered massage therapist search, and on a related query it resolved "near Eglinton" to Eglinton, a village near Londonderry in Northern Ireland, returning UK dental clinics for a Toronto emergency dentist search.

The other three engines kept Scarborough and Eglinton in Toronto on every one of those same queries, naming real Toronto and Scarborough, Ontario businesses. So this is not a hard problem for AI in general. It is one engine mishandling ambiguous place names, and the cost lands entirely on the businesses that get erased from an answer their customer asked for.

The practical defence is to make your location unmistakable everywhere the assistant reads you: Scarborough, Ontario, or the specific Toronto neighbourhood, with the intersection, in plain text on your site and listings, so the machine cannot confuse you with a town across the ocean.

## Finding 3: The logged-in engine reads its own account into the answer

This is new to this edition because Claude is new to this edition, and it earns its own section rather than a footnote.

On several queries, Claude answered from the Stratezik account it was signed into rather than as a neutral consumer. Asked about small business incorporation, it asked whether the entity was Stratezik's own related venture. Asked about pest control, it referenced two client relationships by name and offered competitive positioning against them instead of a plain list. On "commercial pest control Toronto restaurant," it skipped the consumer answer entirely and opened with a menu asking whether we wanted landing page copy, ad copy, or competitor research, the exact menu it shows a marketing client, not a shopper. We had to clarify plainly that we were a restaurant owner looking for a company to call before it produced a normal shortlist.

We disclose this because it is a real limitation of comparing a logged-in assistant to three logged-out ones, and because it points past this tracker. As AI assistants carry more memory about who is asking, the neutral "what a stranger sees" answer gets harder to isolate from the personalized one. The assistant your own team uses signed in daily may not resemble the assistant your customer meets cold.

Once we asked plainly, Claude's underlying local-recommendation behaviour was strong, hence the 94% in Finding 1. The exceptions above are the more interesting data point for anyone building an AI visibility strategy.

## Finding 4: Some categories are fully covered, others leave gaps

Local presence was not even across categories. Two categories returned a named local business on every single answer across all four engines. Others left real gaps where at least one engine gave generic advice instead of names.

Highest local presence:

| Category | Answers naming a local business |
|---|---|
| Restaurants | 100% |
| Medical clinics | 100% |
| Plumbing | 95% |

Lowest local presence:

| Category | Answers naming a local business |
|---|---|
| General contracting | 75% |
| Accounting | 80% |
| Home services | 85% |
| Pest control | 85% |

The pattern underneath the numbers is intent. Urgent, clearly commercial questions (a plumber, a walk-in clinic, a restaurant with a patio) almost always produced named businesses. Questions that read as research rather than a purchase (a bathroom renovation budget, how corporate tax filing works) were where the engines defaulted to a generic explainer with no business attached. On the bathroom-renovation-budget question, all four engines gave a cost breakdown and named nobody. But the effect is not absolute. On an AC-installation-quote question, another clearly cost-framed query, the engines split: Google AI Mode and Claude still named specific installers, while ChatGPT and Perplexity returned only a price range. So a cost-shaped question lowers the odds of being named rather than removing them, and by how much depends on which engine the customer opened. Those moments read less like lost opportunities and more like a signal that the question itself is not yet a firm buying moment.

## Finding 5: When the engines agree, it is the established name

Across the 200 answers, most of the businesses named were different from one engine to the next. But a handful surfaced repeatedly, and when multiple engines reached for the same name, it was almost always the category's established leader.

Neinstein Personal Injury Lawyers was named 6 times across our 20 injury-law answers, more than any other firm, appearing in every engine we tested. AvantDerm, a dermatology and skin clinic, was named by all four engines on the same dermatologist query, alongside FCP Dermatology and HealthOne Harbourfront Skin Clinic across three of the four. Laneway Home Builders led the general-contracting category, and Expert GTA Electric led home services. These are businesses that have built deep, consistent review histories and cross-platform presence, and the assistants reward that consistency by converging on them regardless of which one you ask.

## Finding 6: ChatGPT is starting to sell ads on these questions, but not many, and not always in the right place

This is ChatGPT-only, because ChatGPT is the only one of the four engines where we saw an ad. Across all 150 Google AI Mode, Perplexity, and Claude answers this month, none carried a labelled advertisement. ChatGPT did, so we went back and checked all 50 frozen questions specifically for a sponsored placement, using the actual "Ad" label ChatGPT shows, not organic map or citation cards, which can look similar at a glance.

The count is small: **2 of 50 questions (4%) carried a live ad** when we checked. "Best personal injury lawyer in Toronto" surfaced an ad for Bergeron Clifford Injury Lawyers, a firm based in Ottawa, not Toronto or the GTA. "Bathroom renovation Scarborough budget" surfaced an ad for EcoTech Windows & Doors, a windows and doors company, not a bathroom renovator. Both are mismatches: one on geography, one on category. The other 8 categories, dental, accounting, pest control, plumbing, restaurants, wellness, medical, and home services, showed zero ads across all 25 questions we checked in them.

Ad presence also is not stable. During our July 3 collection, a sedation-dentistry question showed a sponsored 123Dentist card. We reran the identical question two days later and the ad was gone, replaced by an organic answer. Whatever inventory ChatGPT is selling against Toronto local-service questions right now is thin and appears to rotate in and out session to session.

We are not calling this a mature industry-by-industry competitiveness index. Two live ads and one that vanished is a start, not a verdict, and we will keep checking every month alongside the tracker itself to build the pattern out properly. What we can say now: on the handful of high-intent Toronto local questions where ChatGPT does show an ad, the two advertisers we found were not well matched to the query, a lawyer from the wrong city and a home-improvement category from the wrong trade. For a Toronto business in almost any of these categories, that reads less like "someone else already owns this" and more like open ground nobody has properly claimed yet, with the caveat that a thin, badly-targeted ad market can fill in fast once more advertisers notice it.

## What this means for Toronto business owners

Five things follow from edition one.

First, do not assume AI search skips small local businesses. It named them in 89% of answers, and the businesses it named were mostly independents, not national chains.

Second, do not rely on a single engine. Perplexity missed roughly a quarter of the time and mishandled Scarborough and Eglinton. Being recommended by one assistant tells you little about the others, so the goal is to be recommendable everywhere: strong reviews, presence in the local roundups these engines read, plain-language location, and a website the assistant can actually parse.

Third, if you use Claude signed into a business account to check your own visibility, be careful. What it shows you may be shaped by what it already knows about your account, not what a stranger asking the same question would see. Check from a fresh, logged-out angle where you can, or ask a specific, plainly-worded consumer question the way we did.

Fourth, watch this space. The number that matters is not this month's 89%. It is whether your category and your business move up or down as we run this every month. That comparison starts in August.

Fifth, if you are weighing paid placement inside ChatGPT answers, the field is close to empty right now. We found live ads on only 2 of 50 Toronto local-service questions, and both were mismatched to the query. That will not stay true forever, so this is closer to a short window than a permanent gap.

## Methodology and limitations

We tested 50 frozen questions across 10 GTA categories, five per category, chosen to reflect real purchase-stage searches. The same questions run every month so the numbers stay comparable. Collection date: July 3, 2026. ChatGPT, Perplexity, and Google AI Mode were run logged out in fresh sessions per query. Claude was run signed into a Stratezik account, the only practical way to query it for this kind of task, and its answers on a handful of queries reflected that account context rather than a neutral consumer view (see Finding 3).

The ChatGPT ad-presence check (Finding 6) is a separate companion dataset, not part of the frozen local-business scoring. We checked all 50 questions on July 3 and again on July 5 for a labelled "Ad" placement, recording the advertiser and copy where one appeared. This dataset is new this month and will build up month over month alongside the tracker.

This is a snapshot. AI answers vary between runs, by user, and over time, so any single month is a reading rather than a verdict. This is edition one, so there is no prior month to compare against yet. The point of the exercise is the trend line we start building here. The full question set and dataset are available on request.`

export const TRACKER_JULY_SVG_ENGINE = `<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Share of Toronto buying questions naming a local business, by AI engine: Google AI Mode 98 percent, Claude 94 percent, ChatGPT 90 percent, Perplexity 74 percent.">
<rect x="0" y="0" width="720" height="280" rx="10" fill="#FBFAF7"/>
<text x="24" y="34" font-size="17" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">Which AI engine names a local Toronto business?</text>
<text x="24" y="56" font-size="13" fill="#5F5E5A" font-family="Georgia,serif">Share of 50 buying questions that returned a named local business, July 2026</text>
<g transform="translate(0,74)">
<line x1="210" y1="0" x2="210" y2="160" stroke="#E7E4DC" stroke-width="1"/>
<text x="198" y="27" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Google AI Mode</text>
<rect x="210" y="6" width="431.2" height="24" rx="3" fill="#0F6E56"/>
<text x="649.2" y="27" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">98%</text>
<text x="198" y="67" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Claude</text>
<rect x="210" y="46" width="413.6" height="24" rx="3" fill="#0F6E56"/>
<text x="631.6" y="67" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">94%</text>
<text x="198" y="107" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">ChatGPT</text>
<rect x="210" y="86" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="107" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="147" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Perplexity</text>
<rect x="210" y="126" width="325.6" height="24" rx="3" fill="#C0451F"/>
<text x="543.6" y="147" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">74%</text>
</g>
<text x="24" y="268" font-size="11.5" fill="#5F5E5A" font-family="Georgia,serif">Source: Stratezik Toronto AI Citation Tracker, 50 frozen queries per engine, collected July 3, 2026.</text>
</svg>`

export const TRACKER_JULY_SVG_CATEGORY = `<svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Share of answers naming a local business by category, all four engines combined, July 2026. Restaurants and medical clinics 100 percent; general contracting lowest at 75 percent.">
<rect x="0" y="0" width="720" height="520" rx="10" fill="#FBFAF7"/>
<text x="24" y="34" font-size="17" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">Which categories get named, and which get generic advice?</text>
<text x="24" y="56" font-size="13" fill="#5F5E5A" font-family="Georgia,serif">Share of answers naming a local business, all four engines combined, July 2026</text>
<g transform="translate(0,74)">
<line x1="210" y1="0" x2="210" y2="400" stroke="#E7E4DC" stroke-width="1"/>
<text x="198" y="27" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Restaurants</text>
<rect x="210" y="6" width="440.0" height="24" rx="3" fill="#0F6E56"/>
<text x="658.0" y="27" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">100%</text>
<text x="198" y="67" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Medical clinics</text>
<rect x="210" y="46" width="440.0" height="24" rx="3" fill="#0F6E56"/>
<text x="658.0" y="67" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">100%</text>
<text x="198" y="107" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Plumbing</text>
<rect x="210" y="86" width="418.0" height="24" rx="3" fill="#0F6E56"/>
<text x="636.0" y="107" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">95%</text>
<text x="198" y="147" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Dental</text>
<rect x="210" y="126" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="147" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="187" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Injury law</text>
<rect x="210" y="166" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="187" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="227" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Wellness</text>
<rect x="210" y="206" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="227" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="267" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Home services</text>
<rect x="210" y="246" width="374.0" height="24" rx="3" fill="#0F6E56"/>
<text x="592.0" y="267" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">85%</text>
<text x="198" y="307" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Pest control</text>
<rect x="210" y="286" width="374.0" height="24" rx="3" fill="#0F6E56"/>
<text x="592.0" y="307" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">85%</text>
<text x="198" y="347" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Accounting</text>
<rect x="210" y="326" width="352.0" height="24" rx="3" fill="#0F6E56"/>
<text x="570.0" y="347" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">80%</text>
<text x="198" y="387" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">General contracting</text>
<rect x="210" y="366" width="330.0" height="24" rx="3" fill="#0F6E56"/>
<text x="548.0" y="387" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">75%</text>
</g>
<text x="24" y="508" font-size="11.5" fill="#5F5E5A" font-family="Georgia,serif">Source: Stratezik Toronto AI Citation Tracker, 200 data points across 4 engines, collected July 3, 2026.</text>
</svg>`

export const TRACKER_JULY_ABOUT_MARKDOWN = `## About Stratezik

Stratezik is a Toronto marketing agency that runs on its own AI agent system. We help local businesses and startups get found and cited by AI search. Want your category or your business tracked, or a custom query run? Email [[CONTACT_EMAIL]].

### Sources

1. Stratezik Toronto AI Citation Tracker, July 2026: 50 frozen high-intent GTA buyer questions across 10 categories, run through ChatGPT, Perplexity, Google AI Mode, and Claude on July 3, 2026. Dataset available on request.
2. Stratezik ChatGPT Ad-Presence Dataset, July 2026: the same 50 questions checked for a labelled ChatGPT ad placement on July 3 and July 5, 2026. Dataset available on request.
3. Stratezik AEO Readiness Checker and 20-point methodology: stratezik.com/aeo-checker.`
