import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  Children,
  isValidElement,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CompetitivenessTableContext = createContext(false)

export function useIsCompetitivenessTable() {
  return useContext(CompetitivenessTableContext)
}

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (isValidElement(node)) return nodeText(node.props.children)
  return ''
}

const PLAY_STYLES: Record<string, { badge: string; ring: string }> = {
  'Own it': { badge: 'bg-emerald-800 text-cream', ring: 'ring-emerald-700/30' },
  Compete: { badge: 'bg-ink text-cream', ring: 'ring-gold/40' },
  Defend: { badge: 'bg-oxblood text-cream', ring: 'ring-oxblood/30' },
}

function AdsRunPill({ value }: { value: string }) {
  const yes = value.trim().toLowerCase() === 'yes'
  return (
    <span
      className={`inline-flex min-w-[2.75rem] justify-center rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
        yes ? 'bg-ink/12 text-ink' : 'bg-emerald-800 text-cream'
      }`}
    >
      {value.trim()}
    </span>
  )
}

function CompetitionCell({ value }: { value: string }) {
  const pctMatch = value.match(/\((\d+)%\)/)
  const pct = pctMatch ? Number.parseInt(pctMatch[1], 10) : value.toLowerCase().includes('none') ? 0 : null
  const label = value.replace(/\s*\(\d+%\)/, '').trim()
  const bar =
    pct === null ? 'bg-ink/20' : pct >= 80 ? 'bg-oxblood' : pct >= 40 ? 'bg-gold' : pct > 0 ? 'bg-emerald-700' : 'bg-ink/15'

  return (
    <div className="min-w-[8.5rem]">
      <p className="text-xs font-medium text-ink-800">{label}</p>
      {pct !== null ? (
        <div className="mt-2 flex items-center gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
            <div
              className={`h-full rounded-full ${bar}`}
              style={{ width: `${Math.max(pct, pct === 0 ? 6 : 12)}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-600">{pct}%</span>
        </div>
      ) : null}
    </div>
  )
}

function PlayBadge({ value }: { value: string }) {
  const play = value.trim()
  const styles = PLAY_STYLES[play] ?? { badge: 'bg-ink/10 text-ink', ring: 'ring-ink/15' }
  return (
    <span
      className={`inline-flex rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ring-1 ${styles.badge} ${styles.ring}`}
    >
      {play}
    </span>
  )
}

function OpportunityText({ value }: { value: string }) {
  const lower = value.toLowerCase()
  const tone = lower.startsWith('high')
    ? 'text-emerald-900 font-medium'
    : lower.startsWith('low')
      ? 'text-ink-500'
      : 'text-ink-700'
  return <span className={`text-xs leading-snug ${tone}`}>{value}</span>
}

function RelevanceText({ value }: { value: string }) {
  const lower = value.toLowerCase()
  const tone = lower.includes('mismatch')
    ? 'text-oxblood'
    : lower.includes('relevant') && !lower.includes('non')
      ? 'text-emerald-900'
      : lower === 'n/a'
        ? 'text-ink-400'
        : 'text-ink-700'
  return <span className={`text-xs leading-snug ${tone}`}>{value}</span>
}

function ChangeBadge({ value }: { value: string }) {
  return (
    <span className="inline-flex rounded-sm bg-ink/6 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
      {value.trim()}
    </span>
  )
}

export function CompetitivenessTableCell({ columnIndex, children }: { columnIndex: number; children: ReactNode }) {
  const text = nodeText(children).trim()

  switch (columnIndex) {
    case 0:
      return <span className="font-display text-[15px] text-ink">{children}</span>
    case 1:
      return <AdsRunPill value={text} />
    case 2:
      return <CompetitionCell value={text} />
    case 3:
      return <ChangeBadge value={text} />
    case 4:
      return <RelevanceText value={text} />
    case 5:
      return <OpportunityText value={text} />
    case 6:
      return <span className="font-mono text-[11px] text-ink-600">{children}</span>
    case 7:
      return <PlayBadge value={text} />
    default:
      return <>{children}</>
  }
}

export function CompetitivenessTableRow({ children }: { children?: ReactNode }) {
  const cells = Children.toArray(children)
  const playText = nodeText(cells[7] ?? '')
  const playAccent =
    playText === 'Own it'
      ? 'hover:bg-emerald-50/70'
      : playText === 'Compete'
        ? 'hover:bg-gold/5'
        : playText === 'Defend'
          ? 'hover:bg-oxblood/5'
          : 'hover:bg-cream-50/90'

  return (
    <tr className={`group border-t border-ink/8 transition-colors ${playAccent}`}>
      {cells.map((cell, index) => {
        if (!isValidElement(cell)) return cell
        return (
          <td key={index} className="px-4 py-3.5 align-top whitespace-nowrap md:px-5 md:py-4 first:md:pl-6 last:md:pr-6">
            <CompetitivenessTableCell columnIndex={index}>{cell.props.children}</CompetitivenessTableCell>
          </td>
        )
      })}
    </tr>
  )
}

function TableLegend() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 border border-ink/10 bg-cream-50 px-4 py-3 md:px-5">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-400">Key</span>
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-600">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-700" aria-hidden />
        Open lane
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-600">
        <span className="inline-block h-2 w-2 rounded-full bg-gold" aria-hidden />
        Medium competition
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs text-ink-600">
        <span className="inline-block h-2 w-2 rounded-full bg-oxblood" aria-hidden />
        Saturated
      </span>
      <span className="hidden sm:inline text-ink-300" aria-hidden>
        |
      </span>
      <span className="text-xs text-ink-500">Play tiers: Own it · Compete · Defend</span>
    </div>
  )
}

/** Full-width shell for the 18-industry competitiveness table (breaks out of prose column). */
export function CompetitivenessScrollTableShell({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({ canScroll: false, atStart: true, atEnd: true })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const update = () => {
      const canScroll = el.scrollWidth > el.clientWidth + 2
      setScrollState({
        canScroll,
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      })
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const nudge = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'left' ? -280 : 280, behavior: 'smooth' })
  }

  return (
    <CompetitivenessTableContext.Provider value={true}>
      <figure className="competitiveness-table-bleed my-10 md:my-14 not-prose">
        <TableLegend />
        <div className="relative overflow-hidden border border-ink/15 bg-cream shadow-[0_24px_80px_-48px_rgba(13,12,10,0.55)]">
          {scrollState.canScroll && !scrollState.atStart ? (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-cream via-cream/80 to-transparent"
              aria-hidden
            />
          ) : null}
          {scrollState.canScroll && !scrollState.atEnd ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-cream via-cream/80 to-transparent"
              aria-hidden
            />
          ) : null}

          <div
            ref={scrollRef}
            className="competitiveness-table-scroll overflow-x-auto overscroll-x-contain scroll-smooth"
            tabIndex={0}
            role="region"
            aria-label="ChatGPT ad competitiveness table — scroll horizontally for all columns"
          >
            {children}
          </div>

          <div className="flex flex-col gap-2 border-t border-ink/12 bg-ink sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-center gap-2 px-4 py-3 text-cream sm:justify-start">
              <ChevronLeft className={`h-4 w-4 shrink-0 ${scrollState.canScroll ? 'text-gold animate-pulse' : 'text-cream/30'}`} aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/90">
                {scrollState.canScroll ? 'Scroll sideways for all columns' : 'All columns visible on this screen'}
              </span>
              <ChevronRight className={`h-4 w-4 shrink-0 ${scrollState.canScroll ? 'text-gold animate-pulse' : 'text-cream/30'}`} aria-hidden />
            </div>
            <div className="flex items-center justify-center gap-2 border-t border-cream/10 px-4 py-2 sm:border-t-0 sm:border-l sm:border-cream/10 sm:py-0 sm:pl-4 sm:pr-4">
              <button
                type="button"
                onClick={() => nudge('left')}
                disabled={!scrollState.canScroll || scrollState.atStart}
                className="inline-flex items-center gap-1 rounded-sm border border-cream/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cream/10 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                Left
              </button>
              <button
                type="button"
                onClick={() => nudge('right')}
                disabled={!scrollState.canScroll || scrollState.atEnd}
                className="inline-flex items-center gap-1 rounded-sm border border-cream/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-cream/10 disabled:opacity-40"
              >
                Right
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </figure>
    </CompetitivenessTableContext.Provider>
  )
}
