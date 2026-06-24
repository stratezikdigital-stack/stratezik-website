/** Shared chart + dashboard visuals for GBP audit lead-gen (landing + results). */

import { useState } from 'react'

export type ChartPillar = { name: string; score: number; weight?: string }
export type ChartGap = { metric: string; you: string; them: string; youN: number; themN: number }

export const SAMPLE_REPORT = {
  business: 'Acme Plumbing',
  city: 'Toronto',
  query: 'plumber near me',
  score: 64,
  grade: 'C',
  rank: 4,
  competitor: 'Metro Plumbing Co.',
  moneyLine: '~11 calls/month',
  lostCalls: 11,
  avgCompetitorScore: 78,
  pillars: [
    { name: 'Reputation', score: 48, weight: '25%' },
    { name: 'Engagement', score: 35, weight: '20%' },
    { name: 'Profile', score: 70, weight: '10%' },
    { name: 'Visual', score: 55, weight: '15%' },
    { name: 'Competitive', score: 40, weight: '15%' },
    { name: 'Local NAP', score: 66, weight: '15%' },
  ] as ChartPillar[],
  gaps: [
    { metric: 'Reviews', you: '41', them: '218', youN: 41, themN: 218 },
    { metric: 'Rating', you: '4.8', them: '4.9', youN: 96, themN: 98 },
    { metric: 'Categories', you: '2', them: '4', youN: 2, themN: 4 },
    { metric: 'Description', you: 'no', them: 'yes', youN: 0, themN: 10 },
  ] as ChartGap[],
  mapWinners: [
    { rank: '1', name: 'FlowRight Plumbing', reviews: 312 },
    { rank: '2', name: 'Metro Plumbing Co.', reviews: 218 },
    { rank: '3', name: 'DrainPro Toronto', reviews: 189 },
  ],
  trend: [52, 54, 51, 58, 55, 61, 64],
  fixPreview: {
    title: 'Rewrite your GBP description',
    body: 'Licensed Toronto plumber — same-day emergency service, drain cleaning, water heaters. Serving Scarborough, North York & Etobicoke. Call for a free quote.',
  },
}

export function GbpScoreRing({
  score,
  size = 120,
  stroke = '#7a1f1f',
  track = 'rgba(33,31,28,0.12)',
  dark = false,
}: {
  score: number
  size?: number
  stroke?: string
  track?: string
  dark?: boolean
}) {
  const r = 54
  const c = 2 * Math.PI * r * (1 - score / 100)
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke={track} strokeWidth="9" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={339.3}
          strokeDashoffset={c}
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${dark ? 'text-cream' : 'text-ink'}`}>
        <span className="font-display leading-none" style={{ fontSize: size * 0.28 }}>
          {score}
        </span>
        <span className={`font-mono text-[10px] ${dark ? 'text-cream/50' : 'text-ink-400'}`}>/100</span>
      </div>
    </div>
  )
}

export function GbpSparkline({
  data,
  height = 40,
  stroke = '#7a1f1f',
  fill = 'rgba(122,31,31,0.12)',
}: {
  data: number[]
  height?: number
  stroke?: string
  fill?: string
}) {
  const w = 120
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = height - ((v - min) / range) * (height - 8) - 4
    return `${x},${y}`
  })
  const area = `0,${height} ${pts.join(' ')} ${w},${height}`
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" style={{ height }} aria-hidden>
      <polygon points={area} fill={fill} />
      <polyline points={pts.join(' ')} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GbpKpiCard({
  label,
  value,
  sub,
  delta,
  spark,
  accent,
}: {
  label: string
  value: string
  sub?: string
  delta?: string
  spark?: number[]
  accent?: boolean
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-sm border p-4 min-h-[108px] ${
        accent ? 'border-oxblood/30 bg-oxblood/5' : 'border-ink/10 bg-cream-50'
      }`}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-400">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <p className={`font-display text-2xl leading-none ${accent ? 'text-oxblood' : 'text-ink'}`}>{value}</p>
          {sub ? <p className="mt-1 text-[11px] text-ink-500">{sub}</p> : null}
          {delta ? <p className="mt-1 font-mono text-[10px] text-oxblood">{delta}</p> : null}
        </div>
        {spark?.length ? (
          <div className="w-20 shrink-0 opacity-80">
            <GbpSparkline data={spark} height={32} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function GbpBenchmarkBar({ score, benchmark }: { score: number; benchmark: number }) {
  return (
    <div className="space-y-2">
      <div className="relative h-3 overflow-hidden rounded-full bg-cream-200">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gold/50" style={{ width: `${benchmark}%` }} />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-oxblood/80"
          style={{ width: `${score}%` }}
        />
        <div
          className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-ink/40"
          style={{ left: `${benchmark}%` }}
          title={`Market avg: ${benchmark}`}
        />
      </div>
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-400">
        <span>You · {score}</span>
        <span>Top-3 avg · {benchmark}</span>
      </div>
    </div>
  )
}

export function GbpPillarRadarChart({
  pillars,
  locked = false,
  height = 220,
}: {
  pillars: ChartPillar[]
  locked?: boolean
  height?: number
}) {
  const n = pillars.length
  const cx = 110
  const cy = 110
  const maxR = 78
  const levels = [25, 50, 75, 100]

  const point = (i: number, pct: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = (pct / 100) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPoly = pillars
    .map((p, i) => {
      const pt = point(i, locked ? Math.min(p.score, 55) : p.score)
      return `${pt.x},${pt.y}`
    })
    .join(' ')

  return (
    <svg viewBox="0 0 220 220" className="mx-auto w-full max-w-[240px]" style={{ height }} aria-hidden>
      {levels.map((lv) => (
        <polygon
          key={lv}
          points={pillars
            .map((_, i) => {
              const pt = point(i, lv)
              return `${pt.x},${pt.y}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(33,31,28,0.08)"
          strokeWidth="1"
        />
      ))}
      {pillars.map((p, i) => {
        const outer = point(i, 100)
        const label = point(i, 118)
        return (
          <g key={p.name}>
            <line x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="rgba(33,31,28,0.06)" strokeWidth="1" />
            <text
              x={label.x}
              y={label.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ink-500"
              style={{ fontSize: 7, fontFamily: 'ui-monospace, monospace' }}
            >
              {p.name.split(' ')[0]}
            </text>
          </g>
        )
      })}
      <polygon points={dataPoly} fill="rgba(122,31,31,0.18)" stroke="#7a1f1f" strokeWidth="1.5" />
      {pillars.map((p, i) => {
        const pt = point(i, locked ? Math.min(p.score, 55) : p.score)
        return <circle key={`${p.name}-dot`} cx={pt.x} cy={pt.y} r="3" fill="#7a1f1f" />
      })}
    </svg>
  )
}

export function GbpPillarBarChart({
  pillars,
  locked = false,
  showValues = true,
}: {
  pillars: ChartPillar[]
  locked?: boolean
  showValues?: boolean
}) {
  return (
    <div className="space-y-3">
      {pillars.map((p, i) => {
        const w = locked ? 35 + (i % 4) * 10 : p.score
        return (
          <div key={p.name}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-ink-700">
                {p.name}
                {p.weight ? <span className="ml-1 font-mono text-[9px] text-ink-400">({p.weight})</span> : null}
              </span>
              <span className="font-mono text-ink-400">{showValues && !locked ? p.score : locked ? '—' : p.score}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cream-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-oxblood/90 to-oxblood/60 transition-all duration-700"
                style={{ width: `${w}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function GbpCompetitorBarChart({
  gaps,
  youLabel = 'You',
  themLabel = 'Top competitor',
  locked = false,
  lockAfterIndex = -1,
}: {
  gaps: ChartGap[]
  youLabel?: string
  themLabel?: string
  locked?: boolean
  lockAfterIndex?: number
}) {
  const maxVal = Math.max(...gaps.flatMap((g) => [g.youN, g.themN]), 1)

  return (
    <div>
      <div className="mb-4 flex gap-4 font-mono text-[10px] uppercase tracking-wider text-ink-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-oxblood/80" /> {youLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-gold/80" /> {themLabel}
        </span>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${gaps.length}, minmax(0, 1fr))` }}>
        {gaps.map((g, i) => {
          const hideThem = locked && lockAfterIndex >= 0 && i > lockAfterIndex
          return (
            <div key={g.metric} className="relative text-center">
              <div className="flex h-32 items-end justify-center gap-1">
                <div
                  className="w-5 rounded-t-sm bg-oxblood/75 transition-all"
                  style={{ height: `${Math.max(8, (g.youN / maxVal) * 100)}%` }}
                  title={`You: ${g.you}`}
                />
                <div
                  className={`w-5 rounded-t-sm bg-gold/80 transition-all ${hideThem ? 'opacity-30 blur-[3px]' : ''}`}
                  style={{ height: `${Math.max(8, (g.themN / maxVal) * 100)}%` }}
                  title={`Them: ${g.them}`}
                />
              </div>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-wide text-ink-500 leading-tight">{g.metric}</p>
              <p className={`mt-0.5 font-mono text-[10px] text-ink-400 ${hideThem ? 'blur-[4px]' : ''}`}>
                {g.you} / {g.them}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function GbpMapPackRankChart({
  rank,
  winners,
}: {
  rank: number
  winners: { rank: string; name: string; reviews: number }[]
}) {
  return (
    <div className="space-y-2">
      {winners.map((w) => (
        <div key={w.rank} className="flex items-center gap-2 rounded-sm border border-ink/10 bg-cream-50 px-3 py-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-gold/25 font-mono text-[11px] font-bold text-ink">
            {w.rank}
          </span>
          <div className="min-w-0 flex-1 truncate text-xs font-medium text-ink">{w.name}</div>
          <span className="font-mono text-[10px] text-ink-400">{w.reviews} rev</span>
        </div>
      ))}
      <div className="flex items-center gap-2 py-1">
        <div className="h-px flex-1 bg-ink/15" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Below the fold</span>
        <div className="h-px flex-1 bg-ink/15" />
      </div>
      <div className="flex items-center gap-2 rounded-sm border border-oxblood/30 bg-oxblood/5 px-3 py-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm border border-oxblood font-mono text-[11px] font-bold text-oxblood">
          {rank}
        </span>
        <div className="text-xs font-medium text-oxblood">Your listing</div>
      </div>
    </div>
  )
}

export function GbpRevenueImpactChart({ lostCalls }: { lostCalls: number }) {
  const bars = [18, 14, 11, 8, 5]
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400 mb-3">Estimated calls lost vs Map Pack #1</p>
      <div className="flex h-28 items-end gap-2">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-sm ${i === 2 ? 'bg-oxblood/80' : 'bg-ink/10'}`}
              style={{ height: `${(h / 18) * 100}%` }}
            />
            <span className="font-mono text-[8px] text-ink-400">{i === 0 ? '#1' : i === 2 ? 'You' : `#${i + 1}`}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-ink-600">
        At pin <strong className="text-oxblood">#{SAMPLE_REPORT.rank}</strong>, you may be missing{' '}
        <strong className="text-ink">~{lostCalls} calls/month</strong> for your primary query.
      </p>
    </div>
  )
}

export function GbpDashboardChrome({
  title,
  subtitle,
  children,
  badge,
  darkHeader,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  badge?: string
  darkHeader?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_24px_60px_-20px_rgba(33,31,28,0.18)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-oxblood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">stratezik.com/gbp-audit</span>
      </div>
      <div
        className={`border-b border-ink/10 px-5 py-4 md:px-6 ${darkHeader ? 'bg-ink text-cream' : 'bg-cream-100/90'}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.18em] ${darkHeader ? 'text-gold/80' : 'text-oxblood'}`}
            >
              Local visibility report
            </p>
            <h3 className={`mt-1 font-display text-xl md:text-2xl ${darkHeader ? 'text-cream' : 'text-ink'}`}>{title}</h3>
            {subtitle ? (
              <p className={`mt-1 text-sm ${darkHeader ? 'text-cream/60' : 'text-ink-500'}`}>{subtitle}</p>
            ) : null}
          </div>
          {badge ? (
            <span
              className={`rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
                darkHeader ? 'border-cream/20 bg-cream/10 text-cream/70' : 'border-ink/15 bg-cream text-ink-500'
              }`}
            >
              {badge}
            </span>
          ) : null}
        </div>
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  )
}

export function GbpSampleDashboard({ locked = false }: { locked?: boolean }) {
  const s = SAMPLE_REPORT
  return (
    <GbpDashboardChrome
      title={s.business}
      subtitle={`${s.city} · "${s.query}"`}
      badge={locked ? 'Preview' : 'Example'}
      darkHeader
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <GbpKpiCard label="Visibility score" value={`${s.score}`} sub={`Grade ${s.grade}`} accent />
        <GbpKpiCard label="Map Pack rank" value={`#${s.rank}`} sub="Below top 3" delta="−14 pts vs #1" />
        <GbpKpiCard label="Calls at risk" value={`~${s.lostCalls}/mo`} sub={s.moneyLine} spark={s.trend} />
        <GbpKpiCard label="Weakest pillar" value="Engagement" sub="35 / 100 · 20% weight" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(140px,180px)_1fr]">
        <div className="flex flex-col items-center rounded-sm border border-ink/10 bg-cream-50 p-4 text-center">
          <GbpScoreRing score={s.score} size={100} />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-400">Visibility score</p>
          <div className="mt-4 w-full">
            <GbpBenchmarkBar score={s.score} benchmark={s.avgCompetitorScore} />
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-3">Who holds the top 3</p>
          <GbpMapPackRankChart rank={s.rank} winners={s.mapWinners} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 border-t border-ink/10 pt-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">Six-pillar breakdown</p>
          <GbpPillarRadarChart pillars={s.pillars} locked={locked} />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">vs {s.competitor}</p>
          <GbpCompetitorBarChart gaps={s.gaps} locked={locked} lockAfterIndex={locked ? 0 : -1} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 border-t border-ink/10 pt-6 md:grid-cols-3">
        {['Fix #1 — unlocked', 'Fix #2 — email', 'Fix #3 — email'].map((label, i) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-sm border p-4 ${i === 0 ? 'border-oxblood/25 bg-oxblood/5' : 'border-ink/10 bg-cream-50'}`}
          >
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">{label}</p>
            <p className="mt-2 font-medium text-sm text-ink">
              {i === 0 ? s.fixPreview.title : 'Copy-paste GBP text'}
            </p>
            <div className={`mt-2 rounded-sm bg-cream-200/80 p-2 text-[11px] leading-relaxed text-ink-600 ${i > 0 ? 'blur-[4px]' : ''}`}>
              {i === 0 ? s.fixPreview.body.slice(0, 80) + '…' : 'Lorem ipsum dolor sit amet consectetur…'}
            </div>
            {i > 0 ? (
              <div className="absolute inset-0 flex items-center justify-center bg-cream/60 font-mono text-[9px] uppercase tracking-wider text-ink-500">
                Email unlock
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </GbpDashboardChrome>
  )
}

const REPORT_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'map', label: 'Map Pack' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'fixes', label: 'Fixes' },
] as const

export function GbpReportExplorer() {
  const [tab, setTab] = useState<(typeof REPORT_TABS)[number]['id']>('overview')
  const s = SAMPLE_REPORT

  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_32px_80px_-24px_rgba(33,31,28,0.22)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-oxblood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">Report preview · sample data</span>
      </div>
      <div className="flex flex-wrap gap-1 border-b border-ink/10 bg-cream-100/80 px-4 py-2">
        {REPORT_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
              tab === t.id ? 'bg-oxblood text-cream' : 'text-ink-500 hover:bg-cream-200 hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        <aside className="hidden border-r border-ink/10 bg-cream-50 p-4 lg:block">
          <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Sections</p>
          <ul className="mt-3 space-y-2">
            {REPORT_TABS.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left text-xs py-1.5 px-2 rounded-sm ${
                    tab === t.id ? 'bg-oxblood/10 text-oxblood font-medium' : 'text-ink-600 hover:bg-cream-200'
                  }`}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-sm border border-ink/10 bg-cream p-3">
            <p className="font-mono text-[8px] uppercase tracking-wider text-ink-400">Data source</p>
            <p className="mt-1 text-[11px] text-ink-600">Live Maps when matched · industry template fallback</p>
          </div>
        </aside>
        <div className="p-5 md:p-8 min-h-[320px]">
          {tab === 'overview' && (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-oxblood mb-4">Executive snapshot</p>
                <div className="flex items-center gap-6">
                  <GbpScoreRing score={s.score} size={110} />
                  <div>
                    <p className="font-display text-2xl text-ink">Grade {s.grade}</p>
                    <p className="mt-2 text-sm text-ink-600">{s.moneyLine} at risk from Map Pack position</p>
                    <GbpSparkline data={s.trend} height={36} />
                  </div>
                </div>
              </div>
              <GbpRevenueImpactChart lostCalls={s.lostCalls} />
            </div>
          )}
          {tab === 'map' && (
            <div className="max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-wider text-oxblood mb-4">
                Query · "{s.query}"
              </p>
              <GbpMapPackRankChart rank={s.rank} winners={s.mapWinners} />
            </div>
          )}
          {tab === 'pillars' && (
            <div className="grid gap-8 md:grid-cols-2">
              <GbpPillarRadarChart pillars={s.pillars} height={240} />
              <GbpPillarBarChart pillars={s.pillars} />
            </div>
          )}
          {tab === 'competitors' && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-oxblood mb-4">
                Gap vs {s.competitor}
              </p>
              <GbpCompetitorBarChart gaps={s.gaps} themLabel={s.competitor} />
              <div className="mt-6">
                <GbpBenchmarkBar score={s.score} benchmark={s.avgCompetitorScore} />
              </div>
            </div>
          )}
          {tab === 'fixes' && (
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`rounded-sm border p-4 ${n === 1 ? 'border-oxblood/30 bg-oxblood/5' : 'border-ink/10 bg-cream-50 relative overflow-hidden'}`}
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Fix #{n}</p>
                  <p className="mt-2 font-medium text-sm text-ink">{n === 1 ? s.fixPreview.title : 'Category & attribute guidance'}</p>
                  <p className={`mt-2 text-xs text-ink-600 leading-relaxed ${n > 1 ? 'blur-[3px]' : ''}`}>
                    {n === 1 ? s.fixPreview.body : 'Add secondary categories that match how customers search…'}
                  </p>
                  {n > 1 ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-cream/70 font-mono text-[9px] uppercase text-ink-500">
                      Email unlock
                    </div>
                  ) : (
                    <button type="button" className="mt-3 font-mono text-[10px] text-oxblood underline">
                      Copy to clipboard →
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Mini chart preview beside email gate on results page */
export function GbpEmailGatePreview({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="hidden lg:block rounded-sm border border-ink/10 bg-cream-50 p-4 opacity-90">
      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400 mb-3">Unlocks in your report</p>
      <GbpPillarRadarChart pillars={SAMPLE_REPORT.pillars} locked={!unlocked} height={140} />
      <div className="mt-3 scale-90 origin-top">
        <GbpCompetitorBarChart gaps={SAMPLE_REPORT.gaps.slice(0, 3)} locked={!unlocked} lockAfterIndex={0} />
      </div>
    </div>
  )
}
