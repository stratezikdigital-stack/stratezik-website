/**
 * Case study source-of-truth.
 *
 * We currently have one full client engagement (Insectica Pest Control). For
 * the portfolio we expose:
 *   - one fully named card (Insectica) with the complete story in the modal
 *   - three anonymized cards drawn from the same engagement, each highlighting
 *     a different facet (PPC efficiency / organic / Google Business profile).
 *
 * The redaction layer lets the same source data render either fully named or
 * fully anonymized through a single component. IDs (Google Ads CID + GA4
 * Property ID) are NEVER exposed in either mode.
 */

export type CaseStudyMode = 'named' | 'anonymized'

/** Headline framing for the portfolio card */
export interface MatchRecord {
  num: string
  /** Whether the card reveals the brand or keeps it confidential */
  mode: CaseStudyMode
  /** What the card is anchored on — the angle the headline emphasizes */
  angle: 'overview' | 'paid' | 'organic' | 'gbp'
  /** Headline shown on the card. Should match the angle. */
  headline: string
  /** Discipline label (chess-style category) */
  category: string
  /** Short editorial excerpt for the card */
  description: string
  /** Headline result quote, can include &middot; */
  result: string
  /** Algebraic-notation flourish */
  notation: string
  /** Glyph for the piece that decides the move */
  glyph: string
  /** Opening / engagement label */
  opening: string
}

export const MATCHES: MatchRecord[] = [
  {
    num: '#047',
    mode: 'named',
    angle: 'overview',
    headline: 'Insectica Pest Control · Toronto/GTA',
    category: 'Paid + Organic · Lead Generation',
    description:
      'Brand-new website, zero ad history, invisible in search. We launched 10 hyper-targeted Google Ads groups, trained Smart Bidding to beat target in 60 days, and let the paid signal compound into organic authority. Eleven months later: a self-sustaining lead engine.',
    result: '700 paid leads &middot; $42.99 avg CPL',
    notation: 'Bxh7+',
    glyph: '\u265D',
    opening: 'Italian Game · 11 months',
  },
  {
    num: '#039',
    mode: 'anonymized',
    angle: 'organic',
    headline: 'GTA Service SMB · organic breakout',
    category: 'SEO & Domain Authority',
    description:
      'Sat at the bottom of page 5+ for every commercial keyword. We rebuilt site architecture, fed it consistent paid traffic, and let the engagement signals teach Google to trust the domain. Fifteen months later: page-one visibility on the bread-and-butter terms.',
    result: '+10,990% organic impressions &middot; pos 57 \u2192 15',
    notation: 'Re8',
    glyph: '\u265C',
    opening: 'Sicilian Defense · 15 months',
  },
  {
    num: '#031',
    mode: 'anonymized',
    angle: 'paid',
    headline: 'Toronto Local Services · CPL crushed',
    category: 'Paid Media · Lead Cost',
    description:
      "Industry CPL benchmark sat at $80\u2013120. We refused to accept it. Tight ad-group structure, aggressive negative keyword work, and CPA-first Smart Bidding pulled cost-per-lead to $33.38 in the best month \u2014 with quality holding through 700+ conversions.",
    result: '$42.99 CPL &middot; 46\u201364% under industry avg',
    notation: 'Qg7+',
    glyph: '\u265B',
    opening: "Queen's Gambit · CPA-first",
  },
  {
    num: '#024',
    mode: 'anonymized',
    angle: 'gbp',
    headline: 'GTA Lead-Gen Brand · Google Business',
    category: 'Local SEO · Map Pack',
    description:
      'When we took over, the Google Business Profile sat past rank 60 for every commercial query they cared about. We rebuilt listing taxonomy, service categories, and review velocity, then layered the paid signal on top. Top 5 inside four months \u2014 then it stayed there.',
    result: 'GBP 60+ \u2192 top 5 &middot; 4 months',
    notation: 'Nf6',
    glyph: '\u265E',
    opening: 'English Opening · GBP optimization',
  },
]

/* ──────────────────────────────────────────────────────────────────────────
 * Full case study payload — used by the modal popup.
 * Single source. The modal's renderer applies the redaction map for
 * anonymized cards so we never ship the brand name in those views.
 * ────────────────────────────────────────────────────────────────────────── */

export interface CaseStudyPhase {
  tag: string
  title: string
  date: string
  body: string
  metrics: { key: string; val: string; emphasis?: 'good' }[]
}

export interface CaseStudyTimelineItem {
  date: string
  body: string
  glyph: string
}

export interface CaseStudyApproachPillar {
  glyph: string
  title: string
  body: string
}

export interface CaseStudyScorecard {
  metric: string
  before: string
  after: string
  change: string
}

export interface CaseStudyPayload {
  badge: string
  brandName: string
  brandShort: string
  /** Big hero headline */
  headline: { lead: string; accent: string; tail: string }
  subhead: string
  heroStats: { num: string; lbl: string }[]
  /** "The Client" overview block */
  client: { label: string; body: string[]; stats: { big: string; sub: string; note: string }[] }
  phases: CaseStudyPhase[]
  bigQuote: { quote: string; sub: string }
  /** Final scorecard — table of before/after */
  scorecard: CaseStudyScorecard[]
  /** GBP callout — supplemental claim that's not in the original PDF but is true */
  gbpCallout: { headline: string; body: string }
  timeline: CaseStudyTimelineItem[]
  approach: CaseStudyApproachPillar[]
  closingQuote: { quote: string; sub: string }
  sources: string
}

/** Insectica engagement — full, source-of-truth payload */
export const INSECTICA_PAYLOAD: CaseStudyPayload = {
  badge: 'Case Study \u00b7 Pest Control \u00b7 Toronto, GTA',
  brandName: 'Insectica Pest Control Inc.',
  brandShort: 'Insectica',
  headline: {
    lead: 'From invisible to',
    accent: '700 leads',
    tail: 'in 11 months.',
  },
  subhead:
    'How Stratezik Digital transformed a brand-new pest-control website with virtually zero digital presence into a lead-generating machine across paid and organic channels.',
  heroStats: [
    { num: '700', lbl: 'Paid Conversions' },
    { num: '$42.99', lbl: 'Avg Cost Per Lead' },
    { num: '168\u00d7', lbl: 'Organic Impressions Growth' },
    { num: '19\u00d7', lbl: 'Website Sessions Growth' },
  ],
  client: {
    label: 'The Client',
    body: [
      'A Toronto-based pest control company serving the Greater Toronto Area (GTA). Insectica offers residential and commercial services covering bed bugs, rodents, spiders, wasps, ants, cockroaches, and more.',
      "When they came to Stratezik Digital in early 2025, they had a freshly built website, zero ad history, and minimal organic presence \u2014 essentially starting from scratch in one of Canada's most competitive local service markets.",
    ],
    stats: [
      { big: 'GTA', sub: 'Service Area', note: '~100km radius of Toronto' },
      { big: '10', sub: 'Ad Groups', note: 'Hyper-targeted by pest type' },
      { big: "Feb '25", sub: 'Engagement Start', note: 'Site live, zero ad history' },
      { big: '$42.99', sub: 'Avg CPL', note: 'vs. $80\u2013120 industry avg' },
    ],
  },
  phases: [
    {
      tag: 'Phase 1 \u00b7 Baseline',
      title: 'Building the foundation',
      date: 'February \u2013 May 2025 (4 months)',
      body: 'The website was live but invisible. Organic rankings were at the bottom of page 5+, sessions were in the dozens, and there was no paid advertising in place. Conversions? Zero.',
      metrics: [
        { key: 'Organic impressions/mo', val: '~181 avg' },
        { key: 'Avg position', val: '~57' },
        { key: 'Monthly sessions', val: '~80' },
        { key: 'Conversions', val: '0' },
      ],
    },
    {
      tag: 'Phase 2 \u00b7 Launch & Learn',
      title: 'Google Ads goes live',
      date: 'June \u2013 September 2025 (4 months)',
      body: 'A highly structured Google Search campaign with 10 hyper-targeted ad groups (one per pest type). Smart Bidding was trained rapidly, and CPA dropped from $60 at launch to an incredible $33.38 by August 2025 \u2014 peak pest control season.',
      metrics: [
        { key: 'Launch CPA (Jun)', val: '$60.46' },
        { key: 'Best CPA (Aug)', val: '$33.38', emphasis: 'good' },
        { key: 'Aug conversions', val: '96' },
        { key: 'Sessions (Aug)', val: '1,346' },
        { key: 'CPA improvement', val: '\u221245% in 90 days', emphasis: 'good' },
      ],
    },
    {
      tag: 'Phase 3 \u00b7 Scale & Compound',
      title: 'Organic authority builds',
      date: 'October 2025 \u2013 April 2026 (7 months)',
      body: 'As paid campaigns ran consistently, Google began recognizing the domain as a legitimate local authority. Organic impressions exploded \u2014 from 320/month in June 2025 to 28,508 in January 2026. By April 2026, average position climbed to 15.3, up from 57.',
      metrics: [
        { key: "Jan '26 organic impressions", val: '28,508', emphasis: 'good' },
        { key: "Avg position (Apr '26)", val: '15.3', emphasis: 'good' },
        { key: "Best paid month (Apr '26)", val: '24,345 impr' },
        { key: "Apr '26 conversions", val: '86' },
        { key: 'Stable CPA', val: '~$42 avg' },
      ],
    },
  ],
  bigQuote: {
    quote:
      'Cost per lead of $42.99 \u2014 roughly 46\u201364% below the Canadian pest control industry average of $80\u2013120.',
    sub: 'Achieved through tight ad-group structure, aggressive negative-keyword management, and continuous CPA-first optimization \u2014 not budget cuts.',
  },
  scorecard: [
    { metric: 'Monthly Ad Conversions', before: '0', after: '86', change: '\u221e (from zero)' },
    { metric: 'Cost Per Lead', before: 'N/A', after: '$41.89', change: 'Under $45 target' },
    { metric: 'Monthly Impressions (Paid)', before: '0', after: '24,345', change: 'New channel' },
    { metric: 'Organic Impressions/mo', before: '~181 avg', after: '18,575', change: '+10,163%' },
    { metric: 'Avg Organic Position', before: '57.4', after: '15.3', change: '\u221273% (better)' },
    { metric: 'Monthly Website Sessions', before: '~80', after: '1,456', change: '+1,720%' },
    { metric: 'GA4 Conversions/mo', before: '0', after: '142', change: '\u221e (from zero)' },
    { metric: 'Organic Clicks/mo', before: '~11', after: '140', change: '+1,173%' },
  ],
  gbpCallout: {
    headline: 'Google Business Profile · rank 60+ \u2192 top 5 in 4 months',
    body: 'A parallel local-SEO play: we rebuilt the Google Business Profile listing \u2014 service categories, attributes, NAP consistency, photo cadence, and review velocity \u2014 then let the paid signal layer reinforce local authority. The map-pack ranking moved from past position 60 on every commercial pest-control query to inside the top 5 within four months, where it has held.',
  },
  timeline: [
    {
      date: 'February 2025',
      glyph: '\u2660',
      body: 'Engagement begins. Website is live. Organic footprint: 169 impressions, position 57, 8 clicks, 75 sessions. No paid advertising. Stratezik audits the account, builds campaign structure, and begins keyword research for 10 pest-type ad groups.',
    },
    {
      date: 'June 2025',
      glyph: '\u2659',
      body: 'Google Ads launches. First month: 3,264 impressions, 155 clicks, 17 conversions at $60.46 CPA \u2014 an expected learning-phase cost while Smart Bidding trains. Website sessions jump to 361. GA4 records 80 conversions.',
    },
    {
      date: 'August 2025',
      glyph: '\u2657',
      body: 'Record month. Peak pest season drives volume. Ads deliver 96 conversions at $33.38 CPA \u2014 45% below the $60 launch cost and 63% below industry average. Impressions hit 17,467. Sessions reach 1,346. Organic search begins waking up: 9,995 impressions as Google crawls more pages.',
    },
    {
      date: 'October \u2013 December 2025',
      glyph: '\u2658',
      body: 'Steady compounding. CPA stabilizes in the $44\u201349 range (on-target). Meanwhile, organic impressions jump from 5,756 (Oct) to 18,755 (Dec) as domain authority builds. Average position improves to 24.3.',
    },
    {
      date: 'January 2026',
      glyph: '\u2656',
      body: 'Organic breakthrough. 28,508 organic impressions \u2014 the highest month on record. Position improves to 19.3 (approaching top 2 pages for most target keywords). Paid delivers 84 conversions at $38.26 CPA.',
    },
    {
      date: 'April 2026',
      glyph: '\u2655',
      body: 'Best paid month ever. 24,345 impressions \u2014 a new record. 86 conversions at $41.89 CPA. Organic position reaches 15.3 (improved 73% from starting position of 57.4). The flywheel is turning: paid drives brand signals, organic authority grows, total leads increase.',
    },
  ],
  approach: [
    {
      glyph: '\u265F',
      title: '10 hyper-targeted ad groups',
      body: 'One ad group per pest type (bed bugs, rodents, spiders, wasps, ants, cockroaches, etc.) \u2014 no generic "pest control" catch-all. This maximizes Quality Score, drives down CPC, and ensures the right message reaches the right searcher.',
    },
    {
      glyph: '\u265D',
      title: 'Aggressive negative keywords',
      body: 'Continuous search-query review \u2014 DIY intent, chemical product searches, job listings, competitor brand terms, and out-of-GTA geo queries were all negated. Every dollar was directed at genuine service-intent searches.',
    },
    {
      glyph: '\u265B',
      title: 'CPA-first bidding',
      body: 'Target CPA set at $45 CAD \u2014 below the $60 launch cost. Smart Bidding was given clear signal through proper conversion tracking of both form fills and phone calls. Algorithm trained in 60 days to beat target.',
    },
    {
      glyph: '\u265C',
      title: 'Real-time intelligence dashboard',
      body: 'A custom-built Google Ads Intelligence Tool (built by Stratezik) provides live monitoring of CPA, Quality Score drops, auction insights, and cross-channel performance \u2014 enabling faster decisions than any manual reporting cycle.',
    },
    {
      glyph: '\u265E',
      title: 'Geo-targeted GTA coverage',
      body: 'Coverage precisely mapped to the ~100km GTA service area. Searches from outside the service zone were excluded. Bid adjustments applied to high-density urban cores (Toronto, Mississauga, Brampton) for peak efficiency.',
    },
    {
      glyph: '\u265A',
      title: 'Organic authority as a byproduct',
      body: 'Consistent paid traffic sent quality engagement signals to Google. Combined with structured site architecture, organic impressions grew 168\u00d7 and average position improved from 57 to 15 \u2014 without a separate SEO retainer.',
    },
  ],
  closingQuote: {
    quote:
      'In 11 months, the brand went from zero digital leads to a self-sustaining growth engine \u2014 generating 700+ qualified leads at $42.99 each while building long-term organic authority that will keep compounding.',
    sub: 'The paid channel delivers immediate ROI. The organic channel, now at position 15 and climbing, represents free leads that will only grow over time.',
  },
  sources:
    'All metrics sourced directly from Google Ads, Google Search Console, and Google Analytics 4. Data period: February 2025 \u2013 April 2026. Property and account IDs withheld for client confidentiality.',
}

/**
 * Redaction map for anonymized cards.
 * Replaces brand-identifying language with neutral equivalents so the same
 * source payload can render either named or anonymized.
 */
const REDACTION_PAIRS: [RegExp, string][] = [
  // Brand name variants — order matters: longest specific match first.
  [/Insectica Pest Control Inc\./g, 'Confidential GTA Service Brand'],
  [/Insectica Pest Control/g, 'Confidential GTA Service Brand'],
  // Sentence-initial Insectica (start of string OR after period+space) → capitalized "The brand"
  [/(^|\. )Insectica\b/g, '$1The brand'],
  // Any other "Insectica" → lowercase "the brand"
  [/Insectica\b/g, 'the brand'],

  // Industry-specific noun phrases — handle compound forms BEFORE the bare ones
  // so "Peak pest season" doesn't double-replace into "Peak peak demand season".
  [/Peak pest season/g, 'Peak demand season'],
  [/peak pest season/gi, 'peak demand season'],
  [/pest season/gi, 'demand season'],
  [/Canadian pest control industry/gi, 'Canadian local-services industry'],
  [/pest control/gi, 'local services'],
  [/pest-control/gi, 'local-service'],
  [/pest types/gi, 'service categories'],
  [/pest-type/gi, 'service-category'],
  [/pest type/gi, 'service category'],

  // Specific phrases from the source PDF that name pest categories explicitly
  [
    /bed bugs, rodents, spiders, wasps, ants, cockroaches, and more/gi,
    'their full residential and commercial service catalog',
  ],
  [
    /\(bed bugs, rodents, spiders, wasps, ants, cockroaches, etc\.\)/gi,
    '(one per service line)',
  ],

  // Badge / breadcrumb
  [/Pest Control \u00b7 Toronto/g, 'Local Services \u00b7 Toronto'],
]

const redact = (s: string): string =>
  REDACTION_PAIRS.reduce((acc, [pat, rep]) => acc.replace(pat, rep), s)

/** Returns the payload tailored to either the named or anonymized presentation. */
export function getCaseStudyPayload(mode: CaseStudyMode): CaseStudyPayload {
  if (mode === 'named') return INSECTICA_PAYLOAD

  const p = INSECTICA_PAYLOAD
  return {
    ...p,
    badge: redact(p.badge),
    brandName: 'Confidential GTA Service Brand',
    brandShort: 'Confidential client',
    headline: { ...p.headline },
    subhead: redact(p.subhead),
    client: {
      ...p.client,
      body: p.client.body.map(redact),
      stats: p.client.stats.map((s) => ({ ...s, big: redact(s.big), sub: s.sub, note: redact(s.note) })),
    },
    phases: p.phases.map((ph) => ({
      ...ph,
      title: redact(ph.title),
      body: redact(ph.body),
      metrics: ph.metrics.map((m) => ({ ...m, key: redact(m.key), val: redact(m.val) })),
    })),
    bigQuote: { quote: redact(p.bigQuote.quote), sub: redact(p.bigQuote.sub) },
    scorecard: p.scorecard.map((s) => ({ ...s, metric: redact(s.metric) })),
    gbpCallout: { headline: redact(p.gbpCallout.headline), body: redact(p.gbpCallout.body) },
    timeline: p.timeline.map((t) => ({ ...t, body: redact(t.body) })),
    approach: p.approach.map((a) => ({ ...a, title: redact(a.title), body: redact(a.body) })),
    closingQuote: { quote: redact(p.closingQuote.quote), sub: redact(p.closingQuote.sub) },
    sources: redact(p.sources),
  }
}
