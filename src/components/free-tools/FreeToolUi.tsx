/** Shared shell components for Stratezik free-tool landings (GBP, AEO, cheat sheets). */

import type { ReactNode } from 'react'

export function FreeToolHeroShell({ children }: { children: ReactNode }) {
  return (
    <section className="relative -mx-6 md:-mx-12 px-6 md:px-12 pt-4 pb-16 md:pb-24 bg-ink text-cream overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ft-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ft-grid)" />
        </svg>
      </div>
      <div className="relative">{children}</div>
    </section>
  )
}

export function FreeToolSectionHeader({
  label,
  title,
  description,
  center,
}: {
  label: string
  title: string
  description?: string
  center?: boolean
}) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-10 md:mb-14`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">{label}</p>
      <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink tracking-tight">{title}</h2>
      {description ? <p className="mt-3 text-ink-600 leading-relaxed">{description}</p> : null}
    </div>
  )
}

export function FreeToolKpiStrip({
  items,
  dark,
}: {
  items: { value: string; label: string }[]
  dark?: boolean
}) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-2xl ${dark ? '' : 'mt-6'}`}>
      {items.map((k) => (
        <div
          key={k.label}
          className={
            dark
              ? 'rounded-sm border border-cream/10 bg-cream/5 px-3 py-3'
              : 'rounded-sm border border-ink/10 bg-cream-50 px-3 py-3'
          }
        >
          <p className={`font-display text-2xl ${dark ? 'text-cream' : 'text-ink'}`}>{k.value}</p>
          <p
            className={`mt-1 font-mono text-[9px] uppercase tracking-wider ${dark ? 'text-cream/45' : 'text-ink-400'}`}
          >
            {k.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export function FreeToolSparkline({
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

export function FreeToolKpiCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-sm border p-4 min-h-[96px] ${
        accent ? 'border-oxblood/30 bg-oxblood/5' : 'border-ink/10 bg-cream-50'
      }`}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-400">{label}</p>
      <div className="mt-2">
        <p className={`font-display text-2xl leading-none ${accent ? 'text-oxblood' : 'text-ink'}`}>{value}</p>
        {sub ? <p className="mt-1 text-[11px] text-ink-500">{sub}</p> : null}
      </div>
    </div>
  )
}

export function FreeToolDashboardChrome({
  title,
  subtitle,
  children,
  badge,
  darkHeader,
}: {
  title: string
  subtitle?: string
  children: ReactNode
  badge?: string
  darkHeader?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_24px_60px_-20px_rgba(33,31,28,0.18)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-oxblood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">stratezik.com</span>
      </div>
      <div
        className={`border-b border-ink/10 px-5 py-4 md:px-6 ${darkHeader ? 'bg-ink text-cream' : 'bg-cream-100/90'}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.18em] ${darkHeader ? 'text-gold/80' : 'text-oxblood'}`}
            >
              Sample report
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

export function FreeToolSplitBar({
  leftLabel,
  leftPct,
  rightLabel,
  rightPct,
  leftValue,
  rightValue,
}: {
  leftLabel: string
  leftPct: number
  rightLabel: string
  rightPct: number
  leftValue: string
  rightValue: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex h-3 overflow-hidden rounded-full bg-cream-200">
        <div className="bg-oxblood/80 transition-all" style={{ width: `${leftPct}%` }} />
        <div className="bg-gold/70 transition-all" style={{ width: `${rightPct}%` }} />
      </div>
      <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-400">
        <span>
          {leftLabel} · {leftValue}
        </span>
        <span>
          {rightLabel} · {rightValue}
        </span>
      </div>
    </div>
  )
}
