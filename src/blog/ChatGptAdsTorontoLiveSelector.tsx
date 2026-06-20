import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import {
  LIVE_AD_INDUSTRIES,
  LIVE_AD_TIERS,
  liveAdTierOf,
  type LiveAdIndustry,
} from './chatgptAdsTorontoLiveData'

function DetailPanel({ industry }: { industry: LiveAdIndustry }) {
  const tier = LIVE_AD_TIERS[liveAdTierOf(industry.ads)]
  const Icon = industry.icon

  return (
    <div className="card-editorial border-ink/12 bg-cream p-5 md:p-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-md"
          style={{ background: tier.fill }}
        >
          <Icon className="h-5 w-5" style={{ color: tier.text }} strokeWidth={1.6} aria-hidden />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl text-ink leading-tight">{industry.name}</h3>
          <span
            className="mt-1 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: tier.text, background: tier.fill }}
          >
            {tier.label}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2 rounded-md bg-cream-50 px-3 py-3 border border-ink/8">
        <span className="font-display text-3xl text-ink">
          {industry.ads}
          <span className="text-base text-ink-400">/5</span>
        </span>
        <span className="text-sm text-ink-600">of these buying questions already show a ChatGPT ad</span>
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
        Who is advertising right now
      </p>
      {industry.advs.length === 0 ? (
        <div className="mt-2 flex items-center gap-2 rounded-md px-3 py-3" style={{ background: '#E1F5EE' }}>
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#0F6E56' }} aria-hidden />
          <span className="text-sm font-medium" style={{ color: '#085041' }}>
            No one. The ad slot is empty, and you could be the only voice in it.
          </span>
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          {industry.advs.map(([name, role]) => (
            <span
              key={`${name}-${role}`}
              className="rounded-md border border-ink/10 bg-cream-50 px-2.5 py-1.5 text-sm text-ink-700"
            >
              {name} <span className="text-ink-400">· {role}</span>
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Why now</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-700">{industry.why}</p>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Your first move</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-700">{industry.move}</p>

      {industry.health ? (
        <div
          className="mt-4 flex items-start gap-2 rounded-md px-3 py-2.5"
          style={{ background: '#FAEEDA' }}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: '#854F0B' }} aria-hidden />
          <span className="text-xs leading-relaxed" style={{ color: '#633806' }}>
            Health-adjacent: ChatGPT restricts ads near health topics. Verify ad eligibility in Ads Manager before
            building a campaign.
          </span>
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

  const active = LIVE_AD_INDUSTRIES.find((d) => d.id === selected) ?? LIVE_AD_INDUSTRIES[0]

  function selectIndustry(id: string) {
    setSelected(id)
    const next = new URLSearchParams(searchParams)
    next.set('industry', id)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="not-prose my-10">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] md:gap-6">
        <div
          className="flex max-h-[560px] flex-col gap-1.5 overflow-y-auto pr-1"
          role="listbox"
          aria-label="Toronto ChatGPT Ads industries by opportunity"
        >
          {LIVE_AD_INDUSTRIES.map((ind) => {
            const tier = LIVE_AD_TIERS[liveAdTierOf(ind.ads)]
            const isActive = ind.id === selected
            const Icon = ind.icon
            return (
              <button
                key={ind.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => selectIndustry(ind.id)}
                className={`flex w-full items-center gap-2.5 border px-3 py-2.5 text-left transition-colors ${
                  isActive
                    ? 'border-oxblood bg-oxblood-50/50 shadow-[inset_3px_0_0_#7a1f1f]'
                    : 'border-ink/12 bg-cream hover:border-ink/25 hover:bg-cream-50'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color: tier.dot }} strokeWidth={1.6} aria-hidden />
                <span className="flex-1 text-[13px] font-medium text-ink">{ind.name}</span>
                <span
                  className="min-w-[2rem] rounded-full px-2 py-0.5 text-center font-mono text-[10px] font-medium"
                  style={{ color: tier.text, background: tier.fill }}
                >
                  {ind.ads}/5
                </span>
              </button>
            )
          })}
        </div>
        <DetailPanel industry={active} />
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400 leading-relaxed">
        Ad presence from a ChatGPT snapshot (free tier, 5 queries per industry, June 2026). Delivery rotates, so
        figures are point-in-time. Sorted by opportunity: emptiest first.
      </p>
    </div>
  )
}
