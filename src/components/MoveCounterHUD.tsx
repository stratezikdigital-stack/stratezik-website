import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '../three/world/store'

/**
 * Plan D — Now-playing HUD.
 *
 * Bottom-left compact strip: scroll progress through major sections.
 *
 * Hidden on the hero (that section already carries primary messaging).
 * Hidden on small screens (clutters mobile layouts).
 */
const MOVES = [
  { name: 'hero', stage: 'Hero' },
  { name: 'services', stage: 'Services' },
  { name: 'flow', stage: 'Process' },
  { name: 'portfolio', stage: 'Case studies' },
  { name: 'testimonials', stage: 'Proof' },
  { name: 'contact', stage: 'Contact' },
] as const

export function MoveCounterHUD() {
  const current = useWorldStore((s) => s.current)
  const progress = useWorldStore((s) => s.progress)
  const [appeared, setAppeared] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setAppeared(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  // Hero carries primary positioning; HUD starts below fold.
  if (current === 'hero') return null

  const idx = MOVES.findIndex((m) => m.name === current)
  const move = idx >= 0 ? MOVES[idx] : MOVES[1]
  const total = MOVES.length - 1
  const ordinal = idx >= 1 ? idx : 1

  return (
    <AnimatePresence>
      {appeared ? (
        <motion.aside
          key="hud"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex pointer-events-none fixed bottom-6 left-6 z-30 items-center gap-3 select-none bg-cream/92 backdrop-blur-md border border-ink/15 px-4 py-2.5 shadow-lg"
          aria-label="Page scroll progress"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-oxblood animate-pulse" />
          <div className="flex items-center gap-2 min-w-[180px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
              {ordinal}/{total}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={move.name}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.3 }}
                className="font-display text-[15px] text-ink leading-none tracking-tight"
              >
                {move.stage}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative h-px w-24 bg-ink/15 ml-1">
            <motion.div
              className="absolute inset-y-0 left-0 bg-ink"
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 tabular-nums w-9 text-right">
            {Math.round(progress * 100).toString().padStart(2, '0')}%
          </span>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
