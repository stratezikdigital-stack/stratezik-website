/** AEO checker — mature dashboard visuals (GBP-quality bar, AEO-specific data). */

import { useState } from 'react'
import {
  FreeToolDashboardChrome,
  FreeToolKpiCard,
  FreeToolSparkline,
  FreeToolSplitBar,
} from '../free-tools/FreeToolUi'
import { AEO_SAMPLE } from './aeoSampleData'
import { SampleReportWatermark } from './SampleReportWatermark'

export { AEO_SAMPLE }

export function AeoScoreRing({ score, max = 20, size = 100 }: { score: number; max?: number; size?: number }) {
  const pct = (score / max) * 100
  const r = 54
  const c = 2 * Math.PI * r * (1 - pct / 100)
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(33,31,28,0.12)" strokeWidth="9" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="#7a1f1f" strokeWidth="9" strokeLinecap="round" strokeDasharray={339.3} strokeDashoffset={c} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-ink">
        <span className="font-display leading-none" style={{ fontSize: size * 0.26 }}>{score}</span>
        <span className="font-mono text-[10px] text-ink-400">/{max}</span>
      </div>
    </div>
  )
}

export function AeoCriterionBarChart({ locked = false }: { locked?: boolean }) {
  return (
    <div className="space-y-3">
      {AEO_SAMPLE.criteria.map((c, i) => {
        const w = locked ? 38 + (i % 4) * 12 : (c.score / c.max) * 100
        return (
          <div key={c.label}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-ink-700">
                {c.label}
                <span className="ml-1 font-mono text-[9px] text-ink-400">Grp {c.group}</span>
              </span>
              <span className="font-mono text-ink-400">{locked ? '—' : `${c.score}/${c.max}`}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cream-200">
              <div className="h-full rounded-full bg-gradient-to-r from-oxblood/90 to-oxblood/55" style={{ width: `${w}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function AeoCrawlerAccessList() {
  const allowed = AEO_SAMPLE.bots.filter((b) => b.allowed).length
  const blocked = AEO_SAMPLE.bots.length - allowed
  return (
    <div>
      <p className="mb-4 text-sm leading-relaxed text-ink-600">
        We request your homepage as each AI crawler.{' '}
        <strong className="text-ink">
          {allowed}/{AEO_SAMPLE.bots.length} can reach your site
        </strong>
        {blocked > 0 ? (
          <>
            {' '}
            — <strong className="text-oxblood">{blocked} blocked</strong> in robots.txt, so those engines cannot
            index or cite you.
          </>
        ) : (
          '.'
        )}
      </p>
      <ul className="space-y-2">
        {AEO_SAMPLE.bots.map((b) => (
          <li
            key={b.name}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border border-ink/10 bg-cream px-4 py-2.5 text-sm"
          >
            <span className="font-medium text-ink">{b.name}</span>
            <span className={b.allowed ? 'font-medium text-green-700' : 'font-medium text-oxblood'}>
              {b.allowed ? '✓ Allowed' : '✗ Blocked in robots.txt'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AeoCompetitorBars() {
  const max = Math.max(...AEO_SAMPLE.competitors.map((c) => c.score))
  return (
    <div className="space-y-3">
      {AEO_SAMPLE.competitors.map((c) => (
        <div key={c.domain}>
          <div className="mb-1 flex justify-between text-xs">
            <span className={c.you ? 'text-oxblood font-medium' : 'text-ink-700'}>{c.domain}</span>
            <span className="font-mono text-ink-400">{c.score}/20</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-cream-200">
            <div className={`h-full rounded-full ${c.you ? 'bg-oxblood/80' : 'bg-ink/25'}`} style={{ width: `${(c.score / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export function AeoSampleDashboard({ locked = false }: { locked?: boolean }) {
  const s = AEO_SAMPLE
  return (
    <FreeToolDashboardChrome
      title={s.domain}
      subtitle="Demo brand only — enter your URL above to generate a live readiness report"
      badge={locked ? 'Sample · not your scan' : 'Example'}
      darkHeader
    >
      <SampleReportWatermark>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <FreeToolKpiCard label="Readiness score" value={`${s.total}`} sub={`/${s.max} · median ${s.benchmark}`} accent />
        <FreeToolKpiCard label="Group A (defaults)" value={`${s.groupA.pct}%`} sub={`${s.groupA.earned}/${s.groupA.possible} pts`} />
        <FreeToolKpiCard label="Group B (deliberate)" value={`${s.groupB.pct}%`} sub={`${s.groupB.earned}/${s.groupB.possible} pts`} />
        <FreeToolKpiCard label="AI crawlers" value={`${s.crawlers.allowed}/${s.crawlers.total}`} sub="Allowed in robots.txt" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(140px,180px)_1fr]">
        <div className="flex flex-col items-center rounded-sm border border-ink/10 bg-cream-50 p-4 text-center">
          <AeoScoreRing score={s.total} size={100} />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-400">AEO score</p>
          <div className="mt-4 w-full">
            <FreeToolSplitBar leftLabel="Group A" leftPct={s.groupA.pct ?? 0} rightLabel="Group B" rightPct={s.groupB.pct ?? 0} leftValue={`${s.groupA.pct}%`} rightValue={`${s.groupB.pct}%`} />
          </div>
          <div className="mt-3 w-full"><FreeToolSparkline data={s.trend} height={32} /></div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">Crawler access</p>
          <p className="mb-3 text-xs text-ink-500">Each row is a live probe — not a chart. Blocked bots cannot read your pages.</p>
          <AeoCrawlerAccessList />
        </div>
      </div>
      <div className="mt-6 grid gap-6 border-t border-ink/10 pt-6 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">Criteria breakdown</p>
          <AeoCriterionBarChart locked={locked} />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">vs competitors (email)</p>
          <AeoCompetitorBars />
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3 border-t border-ink/10 pt-6">
        {['Fix #1 — sample', 'Fix #2 — email', 'Fix #3 — email'].map((label, i) => (
          <div key={label} className={`relative overflow-hidden rounded-sm border p-4 ${i === 0 ? 'border-oxblood/25 bg-oxblood/5' : 'border-ink/10 bg-cream-50'}`}>
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">{label}</p>
            <p className="mt-2 text-sm font-medium text-ink">{i === 0 ? s.fixPreview.issue : 'Page-level fix'}</p>
            <p className={`mt-2 text-xs text-ink-600 leading-relaxed ${i > 0 ? 'blur-[4px]' : ''}`}>{i === 0 ? s.fixPreview.fix : 'Add schema and answer-first blocks…'}</p>
            {i > 0 ? <div className="absolute inset-0 flex items-center justify-center bg-cream/60 font-mono text-[9px] uppercase text-ink-500">Email unlock</div> : null}
          </div>
        ))}
      </div>
      </SampleReportWatermark>
    </FreeToolDashboardChrome>
  )
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'crawlers', label: 'Crawlers' },
  { id: 'criteria', label: 'Criteria' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'fixes', label: 'Fixes' },
] as const

export function AeoReportExplorer() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('overview')
  const s = AEO_SAMPLE
  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_32px_80px_-24px_rgba(33,31,28,0.22)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-oxblood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">AEO report preview · sample</span>
      </div>
      <div className="flex flex-wrap gap-1 border-b border-ink/10 bg-cream-100/80 px-4 py-2">
        {TABS.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)} className={`rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${tab === t.id ? 'bg-oxblood text-cream' : 'text-ink-500 hover:bg-cream-200'}`}>{t.label}</button>
        ))}
      </div>
      <div className="p-5 md:p-8 min-h-[300px]">
        {tab === 'overview' && (
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="flex items-center gap-5">
              <AeoScoreRing score={s.total} size={110} />
              <div>
                <p className="font-display text-2xl text-ink">{s.total} / {s.max}</p>
                <p className="text-sm text-ink-600">Toronto median {s.benchmark}</p>
              </div>
            </div>
            <FreeToolSplitBar leftLabel="Defaults" leftPct={s.groupA.pct ?? 0} rightLabel="Deliberate" rightPct={s.groupB.pct ?? 0} leftValue={`${s.groupA.pct}%`} rightValue={`${s.groupB.pct}%`} />
          </div>
        )}
        {tab === 'crawlers' && <AeoCrawlerAccessList />}
        {tab === 'criteria' && <AeoCriterionBarChart />}
        {tab === 'competitors' && <AeoCompetitorBars />}
        {tab === 'fixes' && (
          <div className="max-w-lg rounded-sm border border-oxblood/25 bg-oxblood/5 p-5">
            <p className="font-mono text-[10px] uppercase text-oxblood">{s.fixPreview.page}</p>
            <p className="mt-2 font-medium text-ink">{s.fixPreview.issue}</p>
            <p className="mt-2 text-sm text-ink-600">{s.fixPreview.fix}</p>
          </div>
        )}
      </div>
    </div>
  )
}
