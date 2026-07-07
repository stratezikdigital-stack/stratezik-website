import { Fragment, useMemo, useState } from 'react'
import { ResearchWide } from './BlogResearchLayout'
import {
  CHATGPT_AD_COMPETITIVENESS_ROWS,
  CHATGPT_AD_MAP_CAPTION,
  CHATGPT_AD_MAP_FOOTNOTE,
  type ChatgptAdCompetitivenessRow,
  type ChatgptAdPlay,
} from './torontoChatgptAdsCompetitivenessData'

const PLAY_ORDER: ChatgptAdPlay[] = ['Own it', 'Compete', 'Defend']

const PLAY_META: Record<
  ChatgptAdPlay,
  { label: string; detail: string; accent: string; bar: string; badge: string; ring: string }
> = {
  'Own it': {
    label: 'Own it',
    detail: 'White space or weak rivals — claim the lane',
    accent: 'border-emerald-700/25 bg-emerald-50/80',
    bar: 'bg-emerald-700',
    badge: 'bg-emerald-800 text-cream',
    ring: 'ring-emerald-700/20',
  },
  Compete: {
    label: 'Compete',
    detail: 'Ads present — win on relevance and local fit',
    accent: 'border-gold/35 bg-gold/10',
    bar: 'bg-gold',
    badge: 'bg-ink text-cream',
    ring: 'ring-gold/25',
  },
  Defend: {
    label: 'Defend',
    detail: 'Saturated — table stakes for incumbents',
    accent: 'border-oxblood/25 bg-oxblood/5',
    bar: 'bg-oxblood',
    badge: 'bg-oxblood text-cream',
    ring: 'ring-oxblood/20',
  },
}

function CompetitionBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-3 min-w-[140px]">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/8">
        <div
          className={`h-full rounded-full transition-all duration-500 ${pct >= 80 ? 'bg-oxblood' : pct >= 40 ? 'bg-gold' : pct > 0 ? 'bg-emerald-700' : 'bg-ink/15'}`}
          style={{ width: `${Math.max(pct, pct === 0 ? 4 : 8)}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-600 w-12 text-right">{pct}%</span>
    </div>
  )
}

function AdsPill({ run }: { run: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
        run ? 'bg-ink/10 text-ink' : 'bg-emerald-800/10 text-emerald-900'
      }`}
    >
      {run ? 'Yes' : 'No'}
    </span>
  )
}

function OpportunityBadge({ value }: { value: string }) {
  const high = value.toLowerCase().startsWith('high')
  const low = value.toLowerCase().startsWith('low')
  return (
    <span
      className={`inline-flex max-w-[11rem] text-left text-xs leading-snug ${
        high ? 'text-emerald-900' : low ? 'text-ink-500' : 'text-ink-700'
      }`}
    >
      {value}
    </span>
  )
}

function DesktopTable({ rows }: { rows: ChatgptAdCompetitivenessRow[] }) {
  let lastPlay: ChatgptAdPlay | null = null

  return (
    <div className="hidden lg:block overflow-hidden border border-ink/12 bg-cream shadow-[0_24px_80px_-48px_rgba(13,12,10,0.55)]">
      <table className="w-full border-collapse text-sm text-left">
        <thead>
          <tr className="border-b border-ink/10 bg-ink text-cream">
            <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[18%]">Industry</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70">Ads run?</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[14%]">Competition</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[11%]">Change since last reading</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[12%]">Ad relevance</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[12%]">Opportunity</th>
            <th className="px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[14%]">CPC / CPM (est.)*</th>
            <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-cream/70 w-[10%]">Play</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const showTier = row.play !== lastPlay
            lastPlay = row.play
            const meta = PLAY_META[row.play]
            return (
              <Fragment key={row.industry}>
                {showTier ? (
                  <tr className={`${meta.accent} border-t border-ink/10`}>
                    <td colSpan={8} className="px-5 py-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className={`inline-flex rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${meta.badge}`}>
                          {meta.label}
                        </span>
                        <span className="text-sm text-ink-700">{meta.detail}</span>
                      </div>
                    </td>
                  </tr>
                ) : null}
                <tr className="group hover:bg-cream-50/90 transition-colors">
                  <td className="px-5 py-4 font-display text-base text-ink border-t border-ink/8">{row.industry}</td>
                  <td className="px-4 py-4 border-t border-ink/8">
                    <AdsPill run={row.adsRun} />
                  </td>
                  <td className="px-4 py-4 border-t border-ink/8">
                    <p className="text-xs text-ink-600 mb-2">{row.competition.replace(/\s*\(\d+%\)/, '')}</p>
                    <CompetitionBar pct={row.competitionPct} />
                  </td>
                  <td className="px-4 py-4 border-t border-ink/8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">{row.changeSinceLastReading}</span>
                  </td>
                  <td className="px-4 py-4 text-ink-700 border-t border-ink/8 text-xs leading-relaxed">{row.adRelevance}</td>
                  <td className="px-4 py-4 border-t border-ink/8">
                    <OpportunityBadge value={row.opportunity} />
                  </td>
                  <td className="px-4 py-4 font-mono text-[11px] text-ink-600 border-t border-ink/8">{row.cpcCpm}</td>
                  <td className="px-5 py-4 border-t border-ink/8">
                    <span className={`inline-flex rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ring-1 ${meta.badge} ${meta.ring}`}>
                      {row.play}
                    </span>
                  </td>
                </tr>
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function MobileCards({ rows }: { rows: ChatgptAdCompetitivenessRow[] }) {
  return (
    <div className="lg:hidden space-y-4">
      {PLAY_ORDER.map((play) => {
        const tierRows = rows.filter((r) => r.play === play)
        if (tierRows.length === 0) return null
        const meta = PLAY_META[play]
        return (
          <div key={play} className={`border ${meta.accent} overflow-hidden`}>
            <div className="px-4 py-3 border-b border-ink/10 flex items-center gap-3">
              <span className={`inline-flex rounded-sm px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${meta.badge}`}>
                {play}
              </span>
              <span className="text-xs text-ink-600">{meta.detail}</span>
            </div>
            <ul className="divide-y divide-ink/8">
              {tierRows.map((row) => (
                <li key={row.industry} className="px-4 py-4 bg-cream">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-lg text-ink">{row.industry}</p>
                    <AdsPill run={row.adsRun} />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Competition</p>
                      <p className="mt-1 text-ink-700">{row.competition}</p>
                      <div className="mt-2">
                        <CompetitionBar pct={row.competitionPct} />
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Change</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink-500">{row.changeSinceLastReading}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Opportunity</p>
                      <p className="mt-1">
                        <OpportunityBadge value={row.opportunity} />
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Ad relevance</p>
                      <p className="mt-1 text-ink-700 leading-relaxed">{row.adRelevance}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">CPC / CPM (est.)*</p>
                      <p className="mt-1 font-mono text-[11px] text-ink-600">{row.cpcCpm}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

type Filter = 'all' | ChatgptAdPlay

export function TorontoChatgptAdCompetitivenessMap() {
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    const base = [...CHATGPT_AD_COMPETITIVENESS_ROWS]
    if (filter === 'all') return base
    return base.filter((r) => r.play === filter)
  }, [filter])

  const counts = useMemo(
    () =>
      PLAY_ORDER.map((play) => ({
        play,
        count: CHATGPT_AD_COMPETITIVENESS_ROWS.filter((r) => r.play === play).length,
      })),
    [],
  )

  return (
    <ResearchWide className="my-10 md:my-14">
      <div className="border border-ink/12 bg-cream-50/60 px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">Finding 3 · Table</p>
            <h3 className="mt-2 font-display text-xl md:text-2xl text-ink tracking-tight">
              ChatGPT ad competitiveness map — 18 Toronto industries
            </h3>
            <p className="mt-2 text-sm text-ink-600 max-w-2xl leading-relaxed">
              90 commercial buyer questions · June 19, 2026 · 48% carried an ad
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by play tier">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] border transition-colors ${
                filter === 'all' ? 'border-ink bg-ink text-cream' : 'border-ink/15 bg-cream text-ink-600 hover:border-ink/30'
              }`}
            >
              All 18
            </button>
            {counts.map(({ play, count }) => {
              const meta = PLAY_META[play]
              return (
                <button
                  key={play}
                  type="button"
                  onClick={() => setFilter(play)}
                  className={`rounded-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] border transition-colors ${
                    filter === play
                      ? `${meta.badge} border-transparent`
                      : 'border-ink/15 bg-cream text-ink-600 hover:border-ink/30'
                  }`}
                >
                  {play} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 mb-3 text-[13px] text-ink-500 leading-relaxed max-w-4xl">{CHATGPT_AD_MAP_CAPTION}</p>

      <DesktopTable rows={rows} />
      <MobileCards rows={rows} />

      <p className="mt-4 text-xs text-ink-500 leading-relaxed border-l-2 border-ink/15 pl-4">{CHATGPT_AD_MAP_FOOTNOTE}</p>
    </ResearchWide>
  )
}
