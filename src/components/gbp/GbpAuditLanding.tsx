import { Link } from 'react-router-dom'
import { FormProtectionFields } from '../spam/FormProtectionFields'
import { resolveIndustry } from '../../gbp/industryEngine'
import {
  GbpBenchmarkBar,
  GbpCompetitorBarChart,
  GbpDashboardChrome,
  GbpKpiCard,
  GbpPillarBarChart,
  GbpPillarRadarChart,
  GbpReportExplorer,
  GbpRevenueImpactChart,
  GbpSampleDashboard,
  GbpScoreRing,
  GbpSparkline,
  SAMPLE_REPORT,
} from './GbpAuditCharts'

const KPI_STRIP = [
  { label: 'Pillars scored', value: '6', sub: 'Weighted visibility model' },
  { label: 'Competitors mapped', value: '3+', sub: 'Map Pack holders' },
  { label: 'Copy-paste fixes', value: '3', sub: 'Ready for your GBP' },
  { label: 'Scan time', value: '~60s', sub: 'Instant topline results' },
]

const REPORT_WALKTHROUGH = [
  {
    tag: '01 · Score',
    title: 'Your visibility score and grade',
    body: 'A 0–100 score weighted across six pillars Google uses for local rankings — reputation, engagement, profile completeness, visuals, competitive signals, and NAP consistency. You see the grade and Map Pack rank instantly.',
    visual: 'score' as const,
  },
  {
    tag: '02 · Map Pack',
    title: 'Who owns pins 1–3 for your query',
    body: 'We map the businesses holding the top three Map Pack spots for your primary “near me” query — names, review counts, and where you sit relative to the fold.',
    visual: 'map' as const,
  },
  {
    tag: '03 · Pillars',
    title: 'Radar + bar charts for every pillar',
    body: 'See exactly which areas drag your score down. Radar chart for at-a-glance shape; horizontal bars with industry weights so you know where effort pays off.',
    visual: 'pillars' as const,
  },
  {
    tag: '04 · Competitors',
    title: 'Side-by-side gap analysis',
    body: 'Reviews, rating, categories, description — bar charts comparing you to the Map Pack leader so the gap is obvious, not abstract.',
    visual: 'competitors' as const,
  },
  {
    tag: '05 · Fixes',
    title: 'Three copy-paste actions',
    body: 'Fix #1 unlocks immediately. Fixes #2 and #3 — full description rewrites, review scripts, category guidance — arrive when you unlock by email.',
    visual: 'fixes' as const,
  },
]

const PILLAR_METHOD = [
  { name: 'Reputation', weight: '25%', desc: 'Review volume, rating, recency, and response rate' },
  { name: 'Engagement', weight: '20%', desc: 'Posts, Q&A activity, and listing interactions' },
  { name: 'Profile', weight: '10%', desc: 'Categories, attributes, hours, and services' },
  { name: 'Visual', weight: '15%', desc: 'Photos, cover image, and virtual tour signals' },
  { name: 'Competitive', weight: '15%', desc: 'Gap vs Map Pack leaders on key metrics' },
  { name: 'Local NAP', weight: '15%', desc: 'Name, address, phone consistency across the web' },
]

const UNLOCK_TIERS = [
  {
    tier: 'Instant',
    price: 'Free',
    items: ['Visibility score & grade', 'Map Pack rank + top 3 names', 'Fix #1 with copy button', 'Money-line estimate'],
    locked: [] as string[],
  },
  {
    tier: 'Full report',
    price: 'Free · email',
    items: ['Six-pillar radar + bar charts', 'Competitor gap visualization', 'Fixes #2 & #3 — full copy', 'Report copy in your inbox'],
    locked: ['Requires email only — no account'],
  },
  {
    tier: 'AI roadmap',
    price: '$29',
    items: ['90-day weekly action plan', 'Google Posts + Q&A drafts', 'Optimized description + categories', 'PDF delivered to inbox'],
    locked: ['After full report unlock'],
  },
]

function WalkthroughVisual({ kind }: { kind: (typeof REPORT_WALKTHROUGH)[number]['visual'] }) {
  const s = SAMPLE_REPORT
  if (kind === 'score') {
    return (
      <div className="rounded-sm border border-ink/10 bg-cream-50 p-6">
        <div className="flex items-center gap-6">
          <GbpScoreRing score={s.score} size={100} />
          <div className="flex-1">
            <p className="font-display text-xl text-ink">Grade {s.grade}</p>
            <GbpBenchmarkBar score={s.score} benchmark={s.avgCompetitorScore} />
            <div className="mt-4">
              <GbpSparkline data={s.trend} height={40} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (kind === 'map') {
    return (
      <div className="rounded-sm border border-ink/10 bg-cream-50 p-5">
        <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400 mb-3">"{s.query}"</p>
        <div className="flex gap-1.5 mb-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-12 flex-1 rounded-sm bg-gold/30 border border-gold/40 flex items-end justify-center pb-1">
              <span className="font-mono text-[9px] text-ink/60">#{n}</span>
            </div>
          ))}
          <div className="h-12 flex-1 rounded-sm border-2 border-dashed border-oxblood/50 bg-oxblood/5 flex items-end justify-center pb-1">
            <span className="font-mono text-[9px] text-oxblood">You</span>
          </div>
        </div>
        <GbpRevenueImpactChart lostCalls={s.lostCalls} />
      </div>
    )
  }
  if (kind === 'pillars') {
    return (
      <div className="grid gap-4 rounded-sm border border-ink/10 bg-cream-50 p-5 md:grid-cols-2">
        <GbpPillarRadarChart pillars={s.pillars} height={180} />
        <GbpPillarBarChart pillars={s.pillars.slice(0, 4)} />
      </div>
    )
  }
  if (kind === 'competitors') {
    return (
      <div className="rounded-sm border border-ink/10 bg-cream-50 p-5">
        <GbpCompetitorBarChart gaps={s.gaps} themLabel={s.competitor} />
      </div>
    )
  }
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`relative rounded-sm border p-4 ${n === 1 ? 'border-oxblood/30 bg-oxblood/5' : 'border-ink/10 bg-cream-50 overflow-hidden'}`}
        >
          <p className="font-mono text-[9px] uppercase text-ink-400">Fix #{n}</p>
          <div className={`mt-2 h-16 rounded-sm bg-cream-200/80 text-[10px] p-2 text-ink-600 ${n > 1 ? 'blur-[3px]' : ''}`}>
            {n === 1 ? s.fixPreview.body.slice(0, 60) + '…' : 'Locked content…'}
          </div>
          {n > 1 ? (
            <div className="absolute inset-0 flex items-center justify-center bg-cream/60 font-mono text-[9px] uppercase text-ink-500">
              Email
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

type GbpAuditLandingProps = {
  cardClass: string
  inputClass: string
  btnPrimary: string
  biz: string
  city: string
  industry: string
  error: string | null
  exampleChips: { label: string; value: string }[]
  canSubmit: boolean
  turnstileSiteKey: string | undefined
  honeypot: string
  onBizChange: (v: string) => void
  onCityChange: (v: string) => void
  onIndustryChange: (v: string) => void
  onIndustryChip: (v: string) => void
  onTurnstileSuccess: (token: string) => void
  onTurnstileExpire: () => void
  onHoneypotChange: (v: string) => void
  onScan: () => void
}

function ScanFormCard(props: GbpAuditLandingProps) {
  const {
    cardClass,
    inputClass,
    btnPrimary,
    biz,
    city,
    industry,
    error,
    exampleChips,
    canSubmit,
    turnstileSiteKey,
    honeypot,
    onBizChange,
    onCityChange,
    onIndustryChange,
    onIndustryChip,
    onTurnstileSuccess,
    onTurnstileExpire,
    onHoneypotChange,
    onScan,
  } = props

  return (
    <div className={`${cardClass} shadow-[0_20px_50px_-16px_rgba(33,31,28,0.15)]`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Start your free scan</p>
      <p className="mt-1 text-sm text-ink-600">Score + Map Pack in ~60 seconds. Full charts by email.</p>
      <label className="mt-5 block text-sm font-medium text-ink-700">Business name</label>
      <input
        className={`${inputClass} mt-1.5`}
        placeholder="e.g. ShieldGuard Pest Control"
        value={biz}
        onChange={(e) => onBizChange(e.target.value)}
      />
      <label className="mt-3 block text-sm font-medium text-ink-700">City</label>
      <input
        className={`${inputClass} mt-1.5`}
        placeholder="e.g. Scarborough, ON"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
      />
      <label className="mt-3 block text-sm font-medium text-ink-700">Industry</label>
      <input
        className={`${inputClass} mt-1.5`}
        placeholder="Plumber, Dentist, Restaurant…"
        value={industry}
        onChange={(e) => onIndustryChange(e.target.value)}
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {exampleChips.slice(0, 6).map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onIndustryChip(c.value)}
            className="rounded-sm border border-ink/12 px-2 py-0.5 text-[11px] font-medium text-ink-600 hover:border-oxblood hover:text-oxblood"
          >
            {c.label}
          </button>
        ))}
      </div>
      {error ? <p className="mt-3 text-sm text-oxblood">{error}</p> : null}
      <FormProtectionFields
        turnstileSiteKey={turnstileSiteKey ?? ''}
        onTurnstileSuccess={onTurnstileSuccess}
        onTurnstileExpire={onTurnstileExpire}
        honeypotValue={honeypot}
        onHoneypotChange={onHoneypotChange}
      />
      <button type="button" className={`${btnPrimary} mt-4`} disabled={!canSubmit} onClick={onScan}>
        Run my free scan →
      </button>
      <p className="mt-3 text-center text-xs text-ink-500">No account · CASL-compliant · Unsubscribe anytime</p>
    </div>
  )
}

export function GbpAuditLanding(props: GbpAuditLandingProps) {
  return (
    <div className="space-y-0">
      {/* Hero — full bleed dark strip + form */}
      <section className="relative -mx-6 md:-mx-12 px-6 md:px-12 pt-4 pb-16 md:pb-24 bg-ink text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative grid items-start gap-10 xl:grid-cols-[1fr_minmax(300px,380px)] xl:gap-16">
          <div>
            <div className="editorial-label text-gold/80">Stratezik · Local Visibility Scan</div>
            <h1 className="mt-4 font-display text-display-3 text-cream leading-[1.04] tracking-[-0.035em] max-w-2xl">
              The Google Maps audit with{' '}
              <span className="text-gold">charts, competitor gaps,</span> and copy-paste fixes.
            </h1>
            <p className="mt-5 max-w-xl text-cream/70 leading-relaxed text-lg">
              See your visibility score, Map Pack position, six-pillar breakdown, and exactly where you lose to the top
              three — before you spend a dollar on ads.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl">
              {KPI_STRIP.map((k) => (
                <div key={k.label} className="rounded-sm border border-cream/10 bg-cream/5 px-3 py-3">
                  <p className="font-display text-2xl text-cream">{k.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-cream/45">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="xl:sticky xl:top-8">
            <ScanFormCard {...props} />
          </div>
        </div>
      </section>

      {/* Live dashboard preview */}
      <section className="py-16 md:py-24 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Sample report</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink tracking-tight">
            This is what lands in your inbox
          </h2>
          <p className="mt-3 text-ink-600 leading-relaxed">
            A structured dashboard — not a PDF of bullet points. Yours is built from your business name, city, and live
            Maps data when we match your listing.
          </p>
        </div>
        <GbpSampleDashboard locked />
      </section>

      {/* Section-by-section walkthrough */}
      <section className="py-16 md:py-24 border-t border-ink/10 bg-cream-100/40">
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">What to expect</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink tracking-tight">
            Every section of your report, explained
          </h2>
          <p className="mt-3 text-ink-600 leading-relaxed">
            We do not hide the methodology behind a paywall. Here is exactly what each part of the audit covers — with
            sample charts so you know the format before you scan.
          </p>
        </div>
        <div className="space-y-16 md:space-y-24">
          {REPORT_WALKTHROUGH.map((row, i) => (
            <div
              key={row.tag}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">{row.tag}</p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-ink">{row.title}</h3>
                <p className="mt-4 text-ink-600 leading-relaxed">{row.body}</p>
              </div>
              <WalkthroughVisual kind={row.visual} />
            </div>
          ))}
        </div>
      </section>

      {/* Interactive report explorer */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Sneak peek</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink tracking-tight">
            Click through the report sections
          </h2>
          <p className="mt-3 text-ink-600 leading-relaxed">
            Overview, Map Pack, pillars, competitors, and fixes — same structure you get after your scan. Sample data
            shown; your report is personalized.
          </p>
        </div>
        <GbpReportExplorer />
      </section>

      {/* Methodology — six pillars */}
      <section className="py-16 md:py-24 border-t border-ink/10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Scoring model</p>
            <h2 className="mt-2 font-display text-3xl text-ink tracking-tight">Six pillars, industry weights</h2>
            <p className="mt-4 text-ink-600 leading-relaxed">
              Your score is not a black box. Each pillar maps to signals Google uses for local rankings — weighted
              differently by industry so a dentist and a plumber are not scored identically.
            </p>
            <div className="mt-6 hidden lg:block">
              <GbpPillarRadarChart pillars={SAMPLE_REPORT.pillars} height={200} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PILLAR_METHOD.map((p) => (
              <div key={p.name} className="border border-ink/10 bg-cream-50 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-ink">{p.name}</h3>
                  <span className="font-mono text-[10px] text-oxblood">{p.weight}</span>
                </div>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock tiers comparison */}
      <section className="py-16 md:py-24 bg-cream-100/50 border-y border-ink/10">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">What you unlock</p>
          <h2 className="mt-2 font-display text-3xl text-ink tracking-tight">Free scan → email report → optional AI plan</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {UNLOCK_TIERS.map((t, i) => (
            <div
              key={t.tier}
              className={`flex flex-col border p-6 ${i === 1 ? 'border-oxblood/40 bg-oxblood/5 shadow-lg' : 'border-ink/10 bg-cream'}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">{t.tier}</p>
              <p className="mt-1 font-display text-2xl text-ink">{t.price}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-700">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-oxblood shrink-0">✓</span>
                    {item}
                  </li>
                ))}
                {t.locked.map((item) => (
                  <li key={item} className="flex gap-2 text-ink-400">
                    <span className="shrink-0">○</span>
                    {item}
                  </li>
                ))}
              </ul>
              {i === 0 ? (
                <div className="mt-6 flex justify-center">
                  <GbpScoreRing score={58} size={80} />
                </div>
              ) : i === 1 ? (
                <div className="mt-6">
                  <GbpPillarBarChart pillars={SAMPLE_REPORT.pillars} locked />
                </div>
              ) : (
                <div className="mt-6 font-mono text-[10px] text-ink-500 leading-relaxed">
                  Wk 1–2 · Reviews & profile
                  <br />
                  Wk 3–6 · Posts & engagement
                  <br />
                  Wk 7–12 · Competitive push
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-side instant vs email */}
      <section className="py-16 md:py-24 grid gap-8 lg:grid-cols-2">
        <GbpDashboardChrome title="Instant results" subtitle="Right after you hit scan" badge="No email">
          <ul className="space-y-3 text-sm text-ink-700">
            {UNLOCK_TIERS[0].items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-oxblood">✓</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <GbpKpiCard label="Sample score" value="64" sub="Grade C" accent />
            <GbpKpiCard label="Map Pack" value="#4" sub="Below fold" />
          </div>
        </GbpDashboardChrome>
        <GbpDashboardChrome title="Full report" subtitle="One email click" badge="Free unlock">
          <ul className="space-y-3 text-sm text-ink-700">
            {UNLOCK_TIERS[1].items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold">✓</span> {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <GbpPillarRadarChart pillars={SAMPLE_REPORT.pillars} locked height={140} />
            <GbpCompetitorBarChart gaps={SAMPLE_REPORT.gaps.slice(0, 3)} locked lockAfterIndex={0} />
          </div>
        </GbpDashboardChrome>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center border-t border-ink/10">
        <h2 className="font-display text-2xl md:text-4xl text-ink">Ready to see your Map Pack gap?</h2>
        <p className="mt-4 text-ink-600 max-w-lg mx-auto">
          Run the free scan above — or compare with our{' '}
          <Link to="/aeo-checker?utm_source=gbp-audit&utm_medium=footer-cta" className="text-oxblood underline underline-offset-2">
            AEO Readiness Checker
          </Link>{' '}
          for your website.
        </p>
        <div className="mt-8 max-w-sm mx-auto">
          <ScanFormCard {...props} />
        </div>
      </section>
    </div>
  )
}

export function GbpResultsReportGrid({
  industry,
  emailUnlocked,
  pillars,
  compGaps,
  topCompetitor,
  panelNested,
}: {
  industry: string
  emailUnlocked: boolean
  pillars: { name: string; weight: string; score: number; note: string }[] | null
  compGaps: { metric: string; you: string; them: string; youN: number; themN: number }[] | null
  topCompetitor: string
  panelNested: string
}) {
  const industryPillars = resolveIndustry(industry).d.pillars.map((p) => ({
    name: p.name,
    score: p.score,
    weight: p.weight,
  }))
  const previewPillars = (emailUnlocked && pillars ? pillars : industryPillars).map((p) => ({
    name: p.name,
    score: p.score,
    weight: p.weight,
  }))

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      <div className={`${panelNested} p-6`}>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Pillar radar</p>
        <GbpPillarRadarChart pillars={previewPillars} locked={!emailUnlocked} height={200} />
        {!emailUnlocked ? (
          <p className="mt-2 text-center text-xs text-ink-500">Email unlocks exact scores and notes</p>
        ) : null}
      </div>
      <div className={`${panelNested} p-6`}>
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">vs {topCompetitor || 'competitor'}</p>
        {compGaps?.length ? (
          <GbpCompetitorBarChart
            gaps={compGaps}
            locked={!emailUnlocked}
            lockAfterIndex={emailUnlocked ? -1 : 0}
          />
        ) : null}
      </div>
    </div>
  )
}
