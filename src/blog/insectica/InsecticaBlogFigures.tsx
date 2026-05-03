/**
 * SVG figures for the Insectica case-study blog post (inline for crisp scaling & theme colours).
 */

export function InsecticaJourneyInfographic() {
  return (
    <svg
      viewBox="0 0 920 520"
      className="w-full h-auto text-ink"
      role="img"
      aria-labelledby="insectica-infographic-title"
    >
      <title id="insectica-infographic-title">
        Three-phase journey from invisible baseline to scaled paid and organic leads for Insectica Pest Control GTA
      </title>
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#0d0c0a" />
        </marker>
      </defs>
      <rect width="920" height="520" fill="#f4ede1" />
      <rect width="920" height="520" fill="url(#grid)" />
      <text x="460" y="44" textAnchor="middle" className="fill-ink font-serif" style={{ fontSize: 22, fontFamily: 'Fraunces, serif' }}>
        From invisible → scaled demand
      </text>
      <text x="460" y="72" textAnchor="middle" fill="#5a554b" style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.14em' }}>
        INSECTICA · GTA PEST CONTROL · FEB 2025 – APR 2026
      </text>

      {/* Phase boxes */}
      <g transform="translate(40, 110)">
        <rect width="250" height="200" fill="#0d0c0a" rx="4" />
        <text x="125" y="36" textAnchor="middle" fill="#c9a961" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}>
          PHASE 1 · BASELINE
        </text>
        <text x="125" y="68" textAnchor="middle" fill="#f4ede1" style={{ fontSize: 15, fontFamily: 'Fraunces, serif' }}>
          Site live, no ads
        </text>
        <text x="125" y="100" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
          ~181 organic impr. / mo avg
        </text>
        <text x="125" y="122" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12 }}>
          Position ~57 · ~80 sessions
        </text>
        <text x="125" y="154" textAnchor="middle" fill="#7a1f1f" style={{ fontSize: 13, fontWeight: 600 }}>
          Conversions: 0
        </text>
      </g>

      <path d="M 305 210 L 335 210" stroke="#0d0c0a" strokeWidth="2" markerEnd="url(#arr)" />

      <g transform="translate(335, 110)">
        <rect width="250" height="200" fill="#1a1815" stroke="#c9a961" strokeWidth="1" rx="4" />
        <text x="125" y="36" textAnchor="middle" fill="#c9a961" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}>
          PHASE 2 · PAID LAUNCH
        </text>
        <text x="125" y="68" textAnchor="middle" fill="#f4ede1" style={{ fontSize: 15, fontFamily: 'Fraunces, serif' }}>
          10 pest-type ad groups
        </text>
        <text x="125" y="100" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12 }}>
          Jun CPA $60.46 → Aug $33.38
        </text>
        <text x="125" y="122" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12 }}>
          Aug: 96 conversions (peak season)
        </text>
        <text x="125" y="154" textAnchor="middle" fill="#c9a961" style={{ fontSize: 13, fontWeight: 600 }}>
          Smart Bidding trained ≤60 days
        </text>
      </g>

      <path d="M 600 210 L 630 210" stroke="#0d0c0a" strokeWidth="2" markerEnd="url(#arr)" />

      <g transform="translate(630, 110)">
        <rect width="250" height="200" fill="#0d0c0a" rx="4" />
        <text x="125" y="36" textAnchor="middle" fill="#c9a961" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.2em' }}>
          PHASE 3 · COMPOUND
        </text>
        <text x="125" y="68" textAnchor="middle" fill="#f4ede1" style={{ fontSize: 15, fontFamily: 'Fraunces, serif' }}>
          Organic authority joins paid
        </text>
        <text x="125" y="100" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12 }}>
          Jan ’26: 28,508 organic impr.
        </text>
        <text x="125" y="122" textAnchor="middle" fill="#a89f8e" style={{ fontSize: 12 }}>
          Apr ’26 avg position 15.3
        </text>
        <text x="125" y="154" textAnchor="middle" fill="#f4ede1" style={{ fontSize: 13, fontWeight: 600 }}>
          Flywheel: paid + SEO signals
        </text>
      </g>

      {/* Stat strip */}
      <g transform="translate(40, 360)">
        {[
          ['700+', 'Paid conversions', '(11 mo window)'],
          ['$42.99', 'Avg CPL', 'vs $80–120 bench'],
          ['168×', 'Organic impressions', 'peak trajectory'],
          ['57 → 15', 'Avg position', 'Search Console'],
        ].map(([a, b, c], i) => (
          <g key={b} transform={`translate(${i * 220}, 0)`}>
            <rect width="200" height="120" fill="#faf6ec" stroke="#0d0c0a" strokeOpacity="0.12" rx="2" />
            <text x="100" y="38" textAnchor="middle" style={{ fontSize: 26, fontFamily: 'Fraunces, serif', fill: '#7a1f1f' }}>
              {a}
            </text>
            <text x="100" y="64" textAnchor="middle" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.16em', fill: '#0d0c0a' }}>
              {String(b).toUpperCase()}
            </text>
            <text x="100" y="92" textAnchor="middle" style={{ fontSize: 11, fill: '#5a554b' }}>
              {c}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

/** Stylized organic impressions from Search Console (selected months). */
export function InsecticaOrganicImpressionsChart() {
  const data = [
    { label: "Feb '25", v: 169 },
    { label: "Jun '25", v: 320 },
    { label: "Aug '25", v: 9995 },
    { label: "Jan '26", v: 28508 },
    { label: "Apr '26", v: 18575 },
  ]
  const max = Math.max(...data.map((d) => d.v))
  const barW = 56
  const gap = 36
  /** Taller plot + lower baseline so bar tops never collide with the header copy */
  const chartH = 210
  const baseY = 300
  const w = 560
  const h = 380

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto h-auto" role="img" aria-label="Organic search impressions growth by month">
      <title>Organic impressions growth February 2025 through April 2026</title>
      <rect width={w} height={h} fill="#faf6ec" />
      <text x={w / 2} y={32} textAnchor="middle" fill="#0d0c0a" style={{ fontSize: 16, fontFamily: 'Fraunces, serif' }}>
        Organic impressions (Search Console)
      </text>
      <text x={w / 2} y={52} textAnchor="middle" fill="#5a554b" style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>
        BAR HEIGHT ∝ MONTHLY IMPRESSIONS
      </text>
      <text x={w / 2} y={68} textAnchor="middle" fill="#7d7669" style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}>
        Source: engagement reporting (Search Console exports)
      </text>
      <line x1="44" y1={baseY} x2={w - 44} y2={baseY} stroke="#0d0c0a" strokeOpacity="0.15" strokeWidth={1.5} />
      {data.map((d, i) => {
        const barH = (d.v / max) * chartH
        const x = 52 + i * (barW + gap)
        const y = baseY - barH
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barW} height={barH} fill="#7a1f1f" opacity={0.88} rx={3} />
            <text
              x={x + barW / 2}
              y={baseY + 18}
              textAnchor="middle"
              style={{ fontSize: 10, fill: '#2a2722', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
            >
              {d.label}
            </text>
            <text x={x + barW / 2} y={baseY + 34} textAnchor="middle" style={{ fontSize: 10, fill: '#5a554b' }}>
              {d.v.toLocaleString()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Paid conversions vs CPL annotations (illustrative bars, not monthly exhaustive). */
export function InsecticaPaidEfficiencyChart() {
  const rows = [
    { month: "Jun '25", conv: 17, cpl: 60.46 },
    { month: "Aug '25", conv: 96, cpl: 33.38 },
    { month: "Apr '26", conv: 86, cpl: 41.89 },
  ]
  const maxConv = Math.max(...rows.map((r) => r.conv))
  const plotMaxH = 120
  const baseY = 230
  const bw = 118
  const gap = 48
  const w = 580
  const h = 310

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto h-auto" role="img" aria-label="Paid conversions and cost per lead highlights">
      <title>Paid conversion volume vs CPL for selected months</title>
      <rect width={w} height={h} fill="#faf6ec" />
      <text x={w / 2} y={30} textAnchor="middle" style={{ fontSize: 16, fontFamily: 'Fraunces, serif', fill: '#0d0c0a' }}>
        Paid conversions &amp; CPL (Google Ads)
      </text>
      <text x={w / 2} y={50} textAnchor="middle" style={{ fontSize: 10, fill: '#5a554b', fontFamily: 'JetBrains Mono, monospace' }}>
        BAR HEIGHT = CONVERSION VOLUME (SELECTED MONTHS)
      </text>
      <line x1="56" y1={baseY} x2={w - 56} y2={baseY} stroke="#0d0c0a" strokeOpacity="0.15" strokeWidth={1.5} />
      {rows.map((r, i) => {
        const x = 72 + i * (bw + gap)
        const barH = (r.conv / maxConv) * plotMaxH
        const y = baseY - barH
        const midY = y + barH / 2 + 4
        const labelInside = barH >= 32
        return (
          <g key={r.month}>
            <rect x={x} y={y} width={bw} height={barH} fill="#0d0c0a" opacity={0.92} rx={3} />
            {labelInside ? (
              <text
                x={x + bw / 2}
                y={midY}
                textAnchor="middle"
                style={{ fontSize: 13, fill: '#f4ede1', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                {r.conv} conv
              </text>
            ) : (
              <text
                x={x + bw / 2}
                y={y - 8}
                textAnchor="middle"
                style={{ fontSize: 11, fill: '#7a1f1f', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}
              >
                {r.conv} conv
              </text>
            )}
            <text x={x + bw / 2} y={baseY + 20} textAnchor="middle" style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fill: '#2a2722', fontWeight: 600 }}>
              {r.month}
            </text>
            <text x={x + bw / 2} y={baseY + 38} textAnchor="middle" style={{ fontSize: 11, fill: '#7a1f1f', fontFamily: 'JetBrains Mono, monospace' }}>
              CPL ${r.cpl.toFixed(2)} CAD
            </text>
          </g>
        )
      })}
      <text x={w / 2} y={h - 14} textAnchor="middle" style={{ fontSize: 9, fill: '#7d7669', fontFamily: 'JetBrains Mono, monospace' }}>
        CPL shown under each month · illustrative peaks only
      </text>
    </svg>
  )
}
