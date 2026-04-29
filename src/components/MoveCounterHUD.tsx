import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '../three/world/store'

/**
 * Plan D — Now-playing HUD.
 *
 * Top-left fixed overlay. Mirrors the visitor's progress through the
 * page-as-game: section name + move number tick up as you scroll.
 * Hidden on small screens (clutters the editorial hero on mobile).
 */
const MOVES = [
  { name: 'hero',      label: 'Opening',    move: '1.\u00a0e4',     stage: 'I.\u00a0Opening' },
  { name: 'services',  label: 'Development',move: '2.\u00a0Nf3',    stage: 'II.\u00a0Development' },
  { name: 'flow',      label: 'Strategy',   move: '12.\u00a0\u2658d5', stage: 'III.\u00a0Middle\u00a0game' },
  { name: 'portfolio', label: 'Tactics',    move: '24.\u00a0\u2655xh7', stage: 'IV.\u00a0Tactics' },
  { name: 'contact',   label: 'Endgame',    move: '47.\u00a0\u2654g8#', stage: 'V.\u00a0Checkmate' },
] as const

export function MoveCounterHUD() {
  const current = useWorldStore((s) => s.current)
  const progress = useWorldStore((s) => s.progress)
  const [appeared, setAppeared] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setAppeared(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  const idx = MOVES.findIndex((m) => m.name === current)
  const move = idx >= 0 ? MOVES[idx] : MOVES[0]

  return (
    <AnimatePresence>
      {appeared ? (
        <motion.aside
          key={`hud`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex pointer-events-none fixed top-32 left-6 z-30 items-stretch gap-4 select-none"
          aria-label="Game progress"
        >
          {/* Vertical hairline */}
          <div className="w-px bg-ink/25" />

          <div className="flex flex-col gap-3 min-w-[160px]">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-oxblood animate-pulse" />
              <span>Now playing</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={move.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-display text-2xl text-ink leading-none tracking-tight"
              >
                {move.stage}
              </motion.div>
            </AnimatePresence>

            <div className="font-mono text-[12px] text-ink-700 tabular-nums">
              {move.move}
            </div>

            {/* Progress hairline */}
            <div className="relative h-px w-40 bg-ink/15 mt-2">
              <motion.div
                className="absolute inset-y-0 left-0 bg-ink"
                animate={{ width: `${Math.round(progress * 100)}%` }}
                transition={{ ease: 'linear', duration: 0.1 }}
              />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
              {Math.round(progress * 100).toString().padStart(3, '0')}% complete
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
