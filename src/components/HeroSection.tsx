import { useRef } from 'react'
import { motion } from 'framer-motion'
import { scrollToContactSection } from '../utils/navigation'
import { useSection } from '../three/world/useSection'

/**
 * Plan D — Editorial hero (Champion's Hall).
 *
 * Layout philosophy:
 *   • A single oversized serif headline carries the entire hero.
 *     Layout is deliberately asymmetric — heading hugs the left edge,
 *     a thin column of editorial body sits below.
 *   • Top-row notation marker '/ 01 — Opening' anchors the visitor in
 *     the metaphor: this is move 01 of an unfolding game.
 *   • The 3D world canvas behind the page provides the focal pawn under
 *     a raking key light. We leave the right half of the viewport empty
 *     so the pawn has space to breathe.
 *   • Stats live as a hairline-divided index strip at the bottom — like
 *     the running record on a magazine cover.
 */
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('hero', ref)

  // Headline: "Think n moves ahead." with the 'n' typeset as a slim italic
  // chess-style variable. Tiny detail, huge editorial signal.
  return (
    <section
      id="home"
      ref={ref}
      className="relative flex items-stretch min-h-[calc(100vh-9rem)] lg:min-h-[180vh]"
      aria-label="Hero — Move 01"
    >
      <div className="lg:sticky lg:top-0 w-full lg:h-screen flex flex-col">
        {/* Editorial top rule + notation row */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="hairline mx-6 md:mx-12 mt-6 pt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500"
        >
          <span>/ 01 &mdash; Opening</span>
          <span className="hidden sm:inline">Game #2026 &mdash; in&nbsp;progress</span>
          <span>1.&thinsp;e4</span>
        </motion.div>

        {/* Soft left scrim — keeps headline crisp over 3D world */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/30 to-transparent"
        />

        <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 px-6 md:px-12 pt-12 md:pt-16 lg:pt-12 pb-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-9 lg:col-span-7 max-w-[58rem]"
          >
            <h1
              className="font-display font-medium text-display-1 text-ink"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              <span className="block">Think</span>
              <span className="block">
                <span className="italic font-light text-oxblood pr-2">n</span>
                moves
              </span>
              <span className="block">ahead.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9 }}
              className="lead mt-10 max-w-2xl"
            >
              Most agencies react to the market. <span className="text-ink">Stratezik anticipates it.</span>{' '}
              We architect digital growth like grandmasters architect victories &mdash; pattern by
              pattern, gambit by gambit, until the position is undeniable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                type="button"
                onClick={scrollToContactSection}
                data-cursor="cta"
                data-cursor-text="Open"
                className="group inline-flex items-center justify-center gap-3 bg-ink text-cream px-8 py-4 font-medium tracking-wide hover:bg-oxblood transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">01</span>
                Book the consultation
                <span aria-hidden className="font-mono">&rarr;</span>
              </button>
              <a
                href="#services"
                data-cursor="cta"
                data-cursor-text="Read"
                className="inline-flex items-center justify-center gap-3 border border-ink/35 hover:border-ink text-ink px-8 py-4 font-medium tracking-wide transition-colors hover:bg-ink hover:text-cream"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-500 group-hover:text-cream/60">02</span>
                Study the openings
              </a>
            </motion.div>
          </motion.div>

          {/* Right column intentionally empty — the global 3D world's focal
              pawn lives here. */}
          <div className="md:col-span-3 lg:col-span-5 hidden md:block" aria-hidden />
        </div>

        {/* Hairline-divided index strip — magazine cover vibe.
            Sits inside its own cream band so the 3D world doesn't bleed
            dark pieces through the editorial type. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 bg-cream"
        >
          <div className="hairline mx-6 md:mx-12 mb-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/15">
              {[
                { k: 'Strategic victories', v: '150+' },
                { k: 'Client satisfaction', v: '98%' },
                { k: 'Revenue generated', v: '$5M+' },
                { k: 'Toronto, Canada', v: 'EST. 2018' },
              ].map((s) => (
                <div key={s.k} className="bg-cream pt-4 pr-4 pb-4 pl-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                    {s.k}
                  </div>
                  <div className="font-display text-2xl md:text-3xl text-ink mt-1 tabular-nums">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
