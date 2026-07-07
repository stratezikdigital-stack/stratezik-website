import type { ReactNode } from 'react'

/** Design-layer charts for the Toronto Startup Audit report (data from approved chart comments). */

type BarRow = { label: string; value: number; detail?: string }

function ChartShell({
  title,
  source,
  children,
}: {
  title: string
  source: string
  children: ReactNode
}) {
  return (
    <figure className="my-12 border border-ink/10 bg-cream-50 p-6 md:p-8 shadow-[0_20px_60px_-40px_rgba(13,12,10,0.45)]">
      <figcaption className="font-display text-xl md:text-2xl text-ink tracking-tight">{title}</figcaption>
      <div className="mt-8">{children}</div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500 leading-relaxed">{source}</p>
    </figure>
  )
}

function HorizontalBars({ rows, max }: { rows: BarRow[]; max: number }) {
  return (
    <ul className="space-y-4">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="font-medium text-ink">{row.label}</span>
            <span className="font-mono text-ink-600 tabular-nums">{row.value}</span>
          </div>
          <div className="mt-2 h-3 bg-cream border border-ink/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-oxblood to-ink transition-all"
              style={{ width: `${Math.min(100, (row.value / max) * 100)}%` }}
            />
          </div>
          {row.detail ? <p className="mt-1 text-xs text-ink-500">{row.detail}</p> : null}
        </li>
      ))}
    </ul>
  )
}

function GroupedBars({
  groups,
}: {
  groups: { label: string; pct: number; tone: 'default' | 'deliberate' }[]
}) {
  return (
    <ul className="space-y-5">
      {groups.map((g) => (
        <li key={g.label}>
          <div className="flex items-baseline justify-between gap-4 text-sm">
            <span className="font-medium text-ink">{g.label}</span>
            <span className="font-mono text-ink-600 tabular-nums">{g.pct}%</span>
          </div>
          <div className="mt-2 h-3 bg-cream border border-ink/10 overflow-hidden">
            <div
              className={`h-full ${g.tone === 'default' ? 'bg-ink/70' : 'bg-oxblood'}`}
              style={{ width: `${g.pct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

const CHARTS: Record<string, ReactNode> = {
  distribution_by_band: (
    <ChartShell
      title="Distribution of composite scores (N=44)"
      source="Source: Stratezik audit of N=44 Toronto/GTA funded startups with verifiable composite scores, collected May–June 2026."
    >
      <HorizontalBars
        max={21}
        rows={[
          { label: '0–25', value: 4 },
          { label: '26–50', value: 11 },
          { label: '51–75', value: 21 },
          { label: '76–100', value: 8 },
        ]}
      />
    </ChartShell>
  ),
  dimension_medians: (
    <ChartShell
      title="Median score by dimension (N varies by dimension)"
      source="Source: Stratezik audit of N=50 Toronto/GTA funded startups, collected May–June 2026. Sample size varies by dimension due to unverifiable scores."
    >
      <HorizontalBars
        max={10}
        rows={[
          { label: 'Positioning (N=39)', value: 8, detail: '80% of max' },
          { label: 'AEO — 20-pt test halved (N=42)', value: 5.38, detail: '54% of max on /20 scale' },
          { label: 'Paid media (N=15)', value: 0 },
          { label: 'Content (N=43)', value: 5, detail: '50% of max' },
          { label: 'Trust (N=45)', value: 8, detail: '80% of max' },
        ]}
      />
      <p className="mt-4 text-xs text-ink-500">Technical health excluded (N=0 due to API rate-limiting).</p>
    </ChartShell>
  ),
  aeo_defaults_vs_deliberate: (
    <ChartShell
      title="The 20-Point AEO Test — points captured by default vs by deliberate work (N=39 with all 8 criteria checkable)"
      source="Source: Stratezik 20-Point AEO Readiness Test, machine-verified June 2026. N=42 auditable companies; group means over N=39 with all criteria checkable."
    >
      <p className="mb-6 text-sm font-medium text-ink">Default criteria — group mean 95%</p>
      <GroupedBars
        groups={[
          { label: 'AI crawler access', pct: 90, tone: 'default' },
          { label: 'No-JS rendering', pct: 93, tone: 'default' },
          { label: 'Entity alignment', pct: 92, tone: 'default' },
        ]}
      />
      <p className="mt-8 mb-6 text-sm font-medium text-ink">Deliberate criteria — group mean 29%</p>
      <GroupedBars
        groups={[
          { label: 'Organization schema', pct: 48, tone: 'deliberate' },
          { label: 'Answer-first copy', pct: 48, tone: 'deliberate' },
          { label: 'llms.txt', pct: 28, tone: 'deliberate' },
          { label: 'Pricing schema', pct: 17, tone: 'deliberate' },
          { label: 'FAQPage schema', pct: 5, tone: 'deliberate' },
        ]}
      />
    </ChartShell>
  ),
}

export function TorontoStartupAuditChart({ id }: { id: string }) {
  const chart = CHARTS[id]
  if (!chart) return null
  return <div className="speakable-audit-chart not-prose">{chart}</div>
}
