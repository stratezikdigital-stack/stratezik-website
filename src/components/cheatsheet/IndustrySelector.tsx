import { useState } from 'react'
import { INDUSTRIES, TIERS, type Industry } from '../../cheatsheet/industries'

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{value}</span>
    </div>
  )
}

function Panel({ ind }: { ind: Industry }) {
  const tier = TIERS[ind.tier]
  return (
    <div className="card-editorial border-ink/12 bg-cream shadow-[0_12px_40px_-24px_rgba(13,12,10,0.35)]">
      <div className="flex items-center gap-3">
        <ind.icon className="h-5 w-5 text-ink-500" strokeWidth={1.6} aria-hidden />
        <h3 className="font-display text-2xl text-ink">{ind.name}</h3>
      </div>
      <div className="mt-3 inline-flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: tier.dot }} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: tier.text }}>
          {tier.label}
        </span>
      </div>

      <div className="mt-5">
        <MetricRow label="Buyer intent" value={ind.intent} />
        <MetricRow label="Cost vs Google" value={ind.cost} />
        {ind.competition && <MetricRow label="Competition" value={ind.competition} />}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-700">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Why now · </span>
        {ind.why}
      </p>

      <div className="mt-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Context hints to write</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {ind.hints.map((h) => (
            <span key={h} className="border border-ink/15 bg-cream px-3 py-1 text-sm text-ink-700">
              “{h}”
            </span>
          ))}
        </div>
      </div>

      <p className="mt-5 border-l-2 border-oxblood/50 pl-3 text-sm leading-relaxed text-ink-700">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Watch · </span>
        {ind.watch}
      </p>
    </div>
  )
}

export function IndustrySelector() {
  const [selected, setSelected] = useState<string>(INDUSTRIES[0].id)
  const active = INDUSTRIES.find((i) => i.id === selected) ?? INDUSTRIES[0]

  return (
    <div className="not-prose cheatsheet-industry my-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-8">
      <div className="flex flex-col gap-2">
        {INDUSTRIES.map((ind) => {
          const tier = TIERS[ind.tier]
          const isActive = ind.id === selected
          return (
            <button
              key={ind.id}
              type="button"
              onClick={() => setSelected(ind.id)}
              aria-pressed={isActive}
              className={`flex items-center gap-3 border px-4 py-3.5 text-left transition-all duration-200 ${
                isActive
                  ? 'border-oxblood bg-oxblood-50/60 shadow-[inset_3px_0_0_#7a1f1f]'
                  : 'border-ink/12 bg-cream hover:border-ink/25 hover:bg-cream-50'
              }`}
            >
              <ind.icon className="h-[18px] w-[18px] shrink-0 text-ink-500" strokeWidth={1.6} aria-hidden />
              <span className="flex-1 text-[15px] font-medium text-ink">{ind.name}</span>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: tier.dot }}
                title={tier.label}
              />
            </button>
          )
        })}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {(['prime', 'strong', 'test'] as const).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: TIERS[t].dot }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
                {TIERS[t].label.split(' — ')[0]}
              </span>
            </span>
          ))}
        </div>
      </div>
      <Panel ind={active} />
    </div>
  )
}
