import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoaderProps {
  onDone?: () => void
}

/**
 * Plan D intro loader — ink scrim with sequenced brand glyphs and progress.
 *
 * Skipped under prefers-reduced-motion.
 */
export function Loader({ onDone }: LoaderProps) {
  const [percent, setPercent] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setPercent(100)
      const t = window.setTimeout(() => {
        setOpen(false)
        onDone?.()
      }, 200)
      return () => window.clearTimeout(t)
    }

    let cancelled = false
    const start = performance.now()
    const duration = 2600

    function tick(now: number) {
      if (cancelled) return
      const t = Math.min(1, (now - start) / duration)
      // Ease-out for the percentage to feel like a real measurement.
      const eased = 1 - Math.pow(1 - t, 1.6)
      setPercent(Math.round(eased * 100))
      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        const close = window.setTimeout(() => {
          setOpen(false)
          onDone?.()
        }, 320)
        return () => window.clearTimeout(close)
      }
    }
    const raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [onDone])

  // Eight glyphs — sequenced entrance for perceived loading progress.
  const pawns = Array.from({ length: 8 }, (_, i) => i)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="plan-d-loader"
          aria-label="Loading Stratezik"
          role="status"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] } }}
          className="fixed inset-0 z-[10000] bg-ink text-cream flex flex-col"
          style={{ willChange: 'transform' }}
        >
          {/* Top notation row */}
          <div className="flex items-center justify-between px-6 md:px-12 pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/65">
            <span>Stratezik</span>
            <span>Preparing experience</span>
          </div>

          {/* Centerpiece — pawns falling into rank 2 */}
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="font-display text-cream/90 text-[clamp(3rem,12vw,9rem)] leading-none tracking-[-0.04em] mb-10">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: 'easeOut' }}
                className="block"
              >
                Stratezik
              </motion.span>
            </div>

            {/* Pawn rank — each glyph drops in sequenced */}
            <div className="flex items-end gap-4 sm:gap-6 md:gap-10 mb-8 select-none">
              {pawns.map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: -120, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.3 + i * 0.16,
                    duration: 0.55,
                    type: 'spring',
                    stiffness: 240,
                    damping: 16,
                  }}
                  className="flex flex-col items-center"
                >
                  <span className="text-cream/90 text-[clamp(2rem,4vw,3rem)] leading-none">{'\u265F'}</span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/35 mt-3 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Hairline + percentage */}
            <div className="w-full max-w-md px-6">
              <div className="relative h-px w-full bg-cream/15">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-cream"
                  animate={{ width: `${percent}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <div className="flex items-center justify-between mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                <span>Loading modules</span>
                <span className="tabular-nums">{percent.toString().padStart(3, '0')}%</span>
              </div>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="px-6 md:px-12 pb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
            <span>Toronto &mdash; digital marketing · growth</span>
            <span className="tabular-nums">{percent.toString().padStart(3, '0')}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
