import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getCaseStudyPayload, type CaseStudyMode } from '../data/caseStudies'

interface CaseStudyModalProps {
  open: boolean
  mode: CaseStudyMode
  matchNum: string
  onClose: () => void
}

const easing = [0.22, 1, 0.36, 1] as const

const CaseStudyModal = ({ open, mode, matchNum, onClose }: CaseStudyModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const payload = getCaseStudyPayload(mode)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="case-study-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easing }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Scrim */}
          <button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm cursor-default"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.5, ease: easing }}
            className="relative my-0 md:my-8 mx-0 md:mx-6 w-full max-w-[1180px] bg-cream text-ink overflow-y-auto overflow-x-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)] border-y md:border border-ink/15"
          >
            {/* Sticky top bar with case # and close */}
            <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur-md border-b border-ink/15 px-6 md:px-12 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-5 min-w-0">
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  Case {matchNum}
                </span>
                <span className="hidden sm:inline w-8 h-px bg-ink/25" />
                <span
                  id="case-study-title"
                  className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-ink-500 truncate"
                >
                  {payload.badge}
                </span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                data-cursor="cta"
                data-cursor-text="Close"
                className="ml-3 inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 border border-ink/25 hover:bg-ink hover:text-cream text-ink transition-colors duration-200 font-mono text-[14px] tabular-nums"
                aria-label="Close case study"
              >
                {'\u2715'}
              </button>
            </div>

            {/* HERO */}
            <header className="relative bg-ink text-cream px-6 md:px-16 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(90deg, transparent 0 60px, rgba(244,237,225,0.5) 60px 61px), repeating-linear-gradient(0deg, transparent 0 60px, rgba(244,237,225,0.5) 60px 61px)',
                }}
              />
              <div className="relative max-w-4xl">
                <div className="inline-block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-gold border border-gold/40 px-3 py-1 mb-8 bg-oxblood/20">
                  {payload.badge}
                </div>
                <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-cream">
                  {payload.headline.lead}
                  <br />
                  <span className="text-oxblood-400">{payload.headline.accent}</span>{' '}
                  <span className="italic font-light">{payload.headline.tail}</span>
                </h1>
                <p className="mt-6 md:mt-8 max-w-2xl text-cream/75 text-base md:text-lg leading-relaxed">
                  {payload.subhead}
                </p>
              </div>
              {/* Hero stats */}
              <div className="relative mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-2 max-w-4xl">
                {payload.heroStats.map((s) => (
                  <div key={s.lbl} className="border-l border-cream/20 pl-4 md:pl-5">
                    <div className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tabular-nums leading-none tracking-[-0.02em] text-cream">
                      {s.num}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>
            </header>

            {/* CLIENT OVERVIEW */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                <div className="md:col-span-7">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-3">
                    {payload.client.label}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                    {payload.brandName}
                  </h2>
                  <div className="mt-6 prose-editorial">
                    {payload.client.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-5 grid grid-cols-2 gap-3">
                  {payload.client.stats.map((s) => (
                    <div
                      key={s.sub}
                      className="border border-ink/15 bg-cream-50 p-4 md:p-5"
                    >
                      <div className="font-display text-2xl md:text-[28px] leading-none tabular-nums text-ink">
                        {s.big}
                      </div>
                      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">
                        {s.sub}
                      </div>
                      <div className="mt-1 text-ink-500 text-xs leading-relaxed">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THREE PHASES */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-3">
                The journey
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                Three distinct phases of growth
              </h2>
              <p className="mt-4 max-w-2xl text-ink-700 leading-relaxed">
                The transformation unfolded in three clear phases &mdash; from a dormant start to an
                optimized lead engine, with organic authority building in the background throughout.
              </p>

              <div className="mt-10 grid md:grid-cols-3 gap-6">
                {payload.phases.map((ph, idx) => (
                  <article key={ph.tag} className="relative border border-ink/15 bg-cream-50 p-6">
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{
                        background:
                          idx === 0 ? '#a89f8e' : idx === 1 ? '#c9a961' : '#7a1f1f',
                      }}
                    />
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-oxblood mb-2">
                      {ph.tag}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-ink leading-[1.1] tracking-[-0.02em]">
                      {ph.title}
                    </h3>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                      {ph.date}
                    </div>
                    <p className="mt-4 text-sm text-ink-700 leading-relaxed">{ph.body}</p>

                    <div className="mt-5 pt-4 border-t border-ink/15 space-y-2">
                      {ph.metrics.map((m) => (
                        <div
                          key={m.key}
                          className="flex items-baseline justify-between gap-4 text-[13px]"
                        >
                          <span className="text-ink-500">{m.key}</span>
                          <span
                            className={`font-mono tabular-nums ${
                              m.emphasis === 'good' ? 'text-oxblood font-semibold' : 'text-ink font-semibold'
                            }`}
                          >
                            {m.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* BIG QUOTE */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15 bg-gradient-to-b from-cream to-cream-200">
              <blockquote className="max-w-4xl">
                <p className="font-display text-2xl md:text-[34px] leading-[1.2] tracking-[-0.02em] text-ink">
                  {payload.bigQuote.quote.split(/(\$42\.99|46\u201364% below)/).map((chunk, i) =>
                    chunk === '$42.99' || chunk === '46\u201364% below' ? (
                      <em key={i} className="not-italic text-oxblood font-semibold">
                        {chunk}
                      </em>
                    ) : (
                      <span key={i}>{chunk}</span>
                    )
                  )}
                </p>
                <p className="mt-5 text-ink-700 leading-relaxed text-base md:text-lg">
                  {payload.bigQuote.sub}
                </p>
              </blockquote>
            </section>

            {/* GBP CALLOUT — supplemental */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15 bg-ink text-cream relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -right-12 -top-12 w-72 h-72 rounded-full border border-gold/20 opacity-50"
              />
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-gold/15 opacity-30"
              />
              <div className="relative max-w-3xl">
                <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-gold mb-4">
                  Local SEO &middot; Map pack
                </div>
                <h2 className="font-display text-2xl md:text-[34px] leading-[1.15] tracking-[-0.02em] text-cream">
                  {payload.gbpCallout.headline}
                </h2>
                <p className="mt-5 text-cream/75 leading-relaxed text-base md:text-lg">
                  {payload.gbpCallout.body}
                </p>
              </div>
            </section>

            {/* SCORECARD TABLE */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-3">
                Final scorecard
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                Before Stratezik vs. after (11 months)
              </h2>

              <div className="mt-8 overflow-x-auto border border-ink/15">
                <table className="w-full text-sm">
                  <thead className="bg-ink text-cream">
                    <tr>
                      <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                        Metric
                      </th>
                      <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                        Before (Feb&ndash;May 2025)
                      </th>
                      <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                        After (Apr 2026)
                      </th>
                      <th className="text-right px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payload.scorecard.map((row, i) => (
                      <tr
                        key={row.metric}
                        className={i % 2 === 1 ? 'bg-cream-50' : 'bg-cream'}
                      >
                        <td className="px-4 py-3 font-medium text-ink">{row.metric}</td>
                        <td className="px-4 py-3 text-right text-ink-500 tabular-nums">
                          {row.before}
                        </td>
                        <td className="px-4 py-3 text-right text-ink tabular-nums">
                          {row.after}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-oxblood tabular-nums">
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* TIMELINE */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15 bg-cream-50">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-3">
                Story timeline
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                How it happened, month by month
              </h2>

              <ol className="mt-10 relative">
                <span
                  aria-hidden="true"
                  className="absolute left-[19px] top-2 bottom-2 w-px bg-ink/20"
                />
                {payload.timeline.map((t) => (
                  <li key={t.date} className="relative pl-14 pb-8 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 inline-flex w-10 h-10 items-center justify-center bg-cream border-2 border-ink text-ink font-mono text-[18px]"
                    >
                      {t.glyph}
                    </span>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-oxblood">
                      {t.date}
                    </div>
                    <p className="mt-2 text-ink-700 leading-relaxed text-sm md:text-base">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            {/* APPROACH PILLARS */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood mb-3">
                Our approach
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-ink leading-[1.05] tracking-[-0.025em]">
                What Stratezik did differently
              </h2>

              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {payload.approach.map((a) => (
                  <div
                    key={a.title}
                    className="border border-ink/15 bg-cream-50 p-6 hover:border-oxblood/40 transition-colors duration-300"
                  >
                    <div className="font-display text-3xl text-oxblood leading-none">
                      {a.glyph}
                    </div>
                    <h3 className="mt-4 font-display text-lg md:text-xl text-ink leading-[1.15] tracking-[-0.015em]">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm text-ink-700 leading-relaxed">{a.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CLOSING QUOTE */}
            <section className="px-6 md:px-16 py-14 md:py-20 border-b border-ink/15 bg-gradient-to-b from-cream-200 to-cream">
              <blockquote className="max-w-4xl">
                <p className="font-display text-2xl md:text-[34px] leading-[1.2] tracking-[-0.02em] text-ink">
                  {payload.closingQuote.quote}
                </p>
                <p className="mt-5 text-ink-700 leading-relaxed text-base md:text-lg">
                  {payload.closingQuote.sub}
                </p>
              </blockquote>
            </section>

            {/* FOOTER — sources */}
            <footer className="px-6 md:px-16 py-10 bg-ink text-cream/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="font-display text-xl text-cream">
                    Stratezik<span className="text-oxblood-400">Digital</span>
                  </div>
                  <p className="mt-2 text-xs md:text-sm leading-relaxed max-w-3xl">
                    {payload.sources}
                  </p>
                </div>
                <div className="text-xs md:text-sm font-mono">
                  <span className="text-cream">stratezik.com</span>{' '}
                  <span className="text-cream/40">&middot;</span>{' '}
                  <span>dave@stratezik.com</span>
                </div>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CaseStudyModal
