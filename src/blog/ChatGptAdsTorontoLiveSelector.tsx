import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import {
  LIVE_AD_INDUSTRIES,
  LIVE_AD_TIER_STYLES,
  liveAdTierOf,
  type LiveAdIndustry,
  type LiveAdTier,
} from './chatgptAdsTorontoLiveData'

function AdMeter({ ads, tier }: { ads: number; tier: LiveAdTier }) {
  const style = LIVE_AD_TIER_STYLES[tier]
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-1 w-2.5 md:w-3 rounded-sm ${i < ads ? style.meter : 'bg-ink/10'}`}
        />
      ))}
    </div>
  )
}

function TierLegend() {
  const tiers: LiveAdTier[] = ['greenfield', 'open', 'filling', 'saturated']
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {tiers.map((tier) => {
        const style = LIVE_AD_TIER_STYLES[tier]
        return (
          <span key={tier} className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${style.dot}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/70">
              {style.label}
              <span className="text-cream/45"> · {style.sublabel}</span>
            </span>
          </span>
        )
      })}
    </div>
  )
}

function DetailPanel({ industry, rank }: { industry: LiveAdIndustry; rank: number }) {
  const tierKey = liveAdTierOf(industry.ads)
  const tier = LIVE_AD_TIER_STYLES[tierKey]
  const Icon = industry.icon

  return (
    <div className={`bg-cream p-6 md:p-8 ring-1 ring-inset ${tier.panelRing}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink/10 bg-cream-50">
            <Icon className="h-5 w-5 text-ink-600" strokeWidth={1.5} aria-hidden />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
              Opportunity rank #{rank}
            </p>
            <h3 className="mt-1 font-display text-2xl md:text-[1.75rem] text-ink leading-tight tracking-[-0.02em]">
              {industry.name}
            </h3>
            <span
              className={`mt-2 inline-flex items-center border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${tier.badge}`}
            >
              {tier.label} · {tier.sublabel}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-[-0.04em] text-ink">
            {industry.ads}
            <span className="text-xl text-ink-300">/5</span>
          </div>
          <p className="mt-1 max-w-[11rem] font-mono text-[9px] uppercase tracking-[0.12em] text-ink-400 leading-snug">
            Queries with a live ad
          </p>
          <div className="mt-2 flex justify-end">
            <AdMeter ads={industry.ads} tier={tierKey} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Who is advertising</p>
          {industry.advs.length === 0 ? (
            <div className="mt-3 flex items-start gap-3 border border-oxblood/20 bg-oxblood-50/80 px-4 py-3.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-oxblood" aria-hidden />
              <p className="text-sm font-medium text-ink leading-relaxed">
                No one. The ad slot is empty, and you could be the only voice in it.
              </p>
            </div>
          ) : (
            <ul className="mt-3 space-y-2">
              {industry.advs.map(([name, role]) => (
                <li
                  key={`${name}-${role}`}
                  className="flex items-baseline justify-between gap-3 border-b border-ink/8 pb-2 last:border-0"
                >
                  <span className="text-sm font-medium text-ink">{name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-400">{role}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Why now</p>
          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-ink-700">{industry.why}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-ink/10 pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Your first move</p>
        <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-700">{industry.move}</p>
      </div>

      {industry.health ? (
        <div className="mt-5 flex items-start gap-3 border border-gold/35 bg-gold/10 px-4 py-3.5">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
          <p className="text-sm leading-relaxed text-ink-700">
            Health-adjacent category: verify ad eligibility in ChatGPT Ads Manager before you build a campaign.
          </p>
        </div>
      ) : null}
    </div>
  )
}

export function ChatGptAdsTorontoLiveSelector() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramId = searchParams.get('industry')
  const validId =
    paramId && LIVE_AD_INDUSTRIES.some((d) => d.id === paramId) ? paramId : LIVE_AD_INDUSTRIES[0].id
  const [selected, setSelected] = useState(validId)

  useEffect(() => {
    if (paramId && LIVE_AD_INDUSTRIES.some((d) => d.id === paramId)) {
      setSelected(paramId)
    }
  }, [paramId])

  const activeIndex = LIVE_AD_INDUSTRIES.findIndex((d) => d.id === selected)
  const active = LIVE_AD_INDUSTRIES[activeIndex] ?? LIVE_AD_INDUSTRIES[0]

  function selectIndustry(id: string) {
    setSelected(id)
    const next = new URLSearchParams(searchParams)
    next.set('industry', id)
    setSearchParams(next, { replace: true })
  }

  return (
    <section className="not-prose toronto-ad-study" aria-labelledby="toronto-ad-study-heading">
      <div className="overflow-hidden border border-ink/15 bg-cream shadow-[0_28px_70px_-40px_rgba(13,12,10,0.55)]">
        <header className="bg-ink px-5 py-5 md:px-8 md:py-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50">
                Stratezik original research
              </p>
              <h3
                id="toronto-ad-study-heading"
                className="mt-2 font-display text-xl md:text-2xl text-cream leading-tight tracking-[-0.02em]"
              >
                Toronto ChatGPT Ads opportunity map
              </h3>
              <p className="mt-2 max-w-xl text-sm text-cream/65 leading-relaxed">
                18 GTA industries ranked emptiest-first. Select yours to see who is buying the ad slot today and what to
                do first.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/45">
              Snapshot · Jun 2026 · 5 queries/industry
            </p>
          </div>
          <div className="mt-5 border-t border-cream/10 pt-4">
            <TierLegend />
          </div>
        </header>

        {/* Mobile industry picker */}
        <div className="border-b border-ink/10 bg-cream-50 px-4 py-4 md:hidden">
          <label htmlFor="toronto-ad-industry-select" className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
            Your industry
          </label>
          <select
            id="toronto-ad-industry-select"
            value={selected}
            onChange={(e) => selectIndustry(e.target.value)}
            className="mt-2 w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink outline-none focus:border-oxblood"
          >
            {LIVE_AD_INDUSTRIES.map((ind, index) => (
              <option key={ind.id} value={ind.id}>
                #{index + 1} · {ind.name} ({ind.ads}/5 ads)
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)]">
          <div
            className="hidden md:flex max-h-[620px] flex-col gap-px overflow-y-auto border-r border-ink/10 bg-cream-50/80"
            role="listbox"
            aria-label="Industries ranked by opportunity"
          >
            {LIVE_AD_INDUSTRIES.map((ind, index) => {
              const tierKey = liveAdTierOf(ind.ads)
              const tier = LIVE_AD_TIER_STYLES[tierKey]
              const isActive = ind.id === selected
              const Icon = ind.icon
              return (
                <button
                  key={ind.id}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => selectIndustry(ind.id)}
                  className={`group flex w-full items-center gap-3 border border-transparent px-4 py-3.5 text-left transition-all ${
                    isActive ? tier.listActive : 'hover:bg-cream hover:border-ink/8'
                  }`}
                >
                  <span className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-ink-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-ink' : 'text-ink-400 group-hover:text-ink-600'}`}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-ink">{ind.name}</span>
                  <div className="hidden shrink-0 sm:block">
                    <AdMeter ads={ind.ads} tier={tierKey} />
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-0.5 font-mono text-[10px] tabular-nums ${tier.badge}`}
                  >
                    {ind.ads}/5
                  </span>
                  {isActive ? (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-oxblood" aria-hidden />
                  ) : (
                    <span className="w-3.5 shrink-0" aria-hidden />
                  )}
                </button>
              )
            })}
          </div>

          <div className="min-h-[320px]">
            <DetailPanel industry={active} rank={activeIndex + 1} />
          </div>
        </div>

        <footer className="border-t border-ink/10 bg-cream-50 px-5 py-3 md:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400 leading-relaxed">
            Point-in-time ChatGPT free-tier snapshot. Ad delivery rotates by user and session. Deep-link with{' '}
            <span className="text-ink-600">?industry=pestcontrol</span> (or any id).
          </p>
        </footer>
      </div>
    </section>
  )
}
