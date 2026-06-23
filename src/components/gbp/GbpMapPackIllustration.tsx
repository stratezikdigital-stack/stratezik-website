type MapWinner = { rank: string; rankColor: string; name: string }

type Props = {
  rankNum: number
  businessName: string
  winners: MapWinner[]
  city: string
}

const PACK_PINS = [
  { rank: 1, x: 24, y: 26 },
  { rank: 2, x: 50, y: 20 },
  { rank: 3, x: 76, y: 28 },
]

export function GbpMapPackIllustration({ rankNum, businessName, winners, city }: Props) {
  const cityShort = city.split(',')[0] || city
  const youPin = { rank: rankNum, x: rankNum <= 3 ? PACK_PINS[rankNum - 1]?.x ?? 50 : 52, y: rankNum <= 3 ? PACK_PINS[rankNum - 1]?.y ?? 24 : 72 }

  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-sm border border-ink/15 bg-[#171c19]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="gbp-map-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2420" />
            <stop offset="100%" stopColor="#121614" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#gbp-map-sky)" />
        {/* stylized blocks / streets */}
        {[
          [8, 38, 28, 14],
          [38, 42, 22, 18],
          [66, 36, 26, 22],
          [14, 58, 34, 16],
          [52, 62, 38, 14],
          [6, 78, 88, 8],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill="#222a26" stroke="#2d3832" strokeWidth="0.4" />
        ))}
        {[
          [18, 44, 40, 0.6],
          [44, 18, 0.6, 52],
          [62, 44, 38, 0.6],
          [20, 66, 60, 0.5],
        ].map(([x, y, w, h], i) => (
          <rect key={`r-${i}`} x={x} y={y} width={w} height={h} fill="#3a4540" opacity="0.55" />
        ))}
      </svg>

      {PACK_PINS.map((pin, i) => {
        const w = winners[i]
        const color = w?.rankColor ?? '#CBBFA9'
        return (
          <div
            key={pin.rank}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-bold text-ink shadow-lg"
              style={{ background: color }}
              title={w?.name}
            >
              {pin.rank}
            </div>
            <div className="mx-auto mt-0.5 h-2 w-2 rotate-45 bg-cream/90" />
          </div>
        )
      })}

      {rankNum > 3 ? (
        <div
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: `${youPin.x}%`, top: `${youPin.y}%` }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-oxblood bg-oxblood/90 font-mono text-xs font-bold text-cream shadow-lg"
            title={businessName}
          >
            {rankNum}
          </div>
          <div className="mx-auto mt-0.5 h-2 w-2 rotate-45 bg-oxblood" />
        </div>
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/45 px-3 py-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cream/50">Map preview · {cityShort}</p>
        <p className="truncate text-xs text-cream/80">&quot;{winners[0]?.name ?? 'Local pack'}&quot; area</p>
      </div>
    </div>
  )
}
