import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../three/world/useSection'
import { MATCHES, type CaseStudyMode } from '../data/caseStudies'
import CaseStudyModal from './CaseStudyModal'

interface OpenCase {
  num: string
  mode: CaseStudyMode
}

const PortfolioSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('portfolio', ref)

  const [openCase, setOpenCase] = useState<OpenCase | null>(null)

  return (
    <section id="portfolio" ref={ref} className="relative py-24 md:py-32 bg-cream">
      <div className="container-custom px-6 md:px-12">
        {/* Editorial header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              / 04 &mdash; Match record
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Selected wins
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
              Four games.
              <br />
              <span className="italic font-light text-oxblood">Four wins.</span>
            </h2>
            <p className="lead mt-8 max-w-3xl">
              Each card below is a record of a real engagement &mdash; the position we walked into,
              the move that decided it, and the outcome. Click any case to read the full story.
            </p>
          </div>
        </motion.header>

        {/* Match list — editorial table */}
        <div className="border-t border-ink/15">
          {MATCHES.map((m, i) => (
            <motion.article
              key={m.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              viewport={{ once: true, margin: '-80px' }}
              data-cursor="cta"
              data-cursor-text="Read"
              onClick={() => setOpenCase({ num: m.num, mode: m.mode })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOpenCase({ num: m.num, mode: m.mode })
                }
              }}
              className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-ink/15 hover:bg-cream-50 transition-colors duration-700 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-oxblood"
            >
              {/* Case number */}
              <div className="col-span-3 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 pt-2">
                Case
                <div className="text-ink mt-0.5 tabular-nums">{m.num}</div>
              </div>

              {/* Headline + category + body */}
              <div className="col-span-9 md:col-span-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood flex items-center gap-2">
                  <span>{m.category}</span>
                  {m.mode === 'anonymized' && (
                    <>
                      <span className="text-ink/30">&middot;</span>
                      <span className="text-ink-500">Confidential</span>
                    </>
                  )}
                </div>
                <h3 className="mt-1 font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.05] tracking-[-0.025em] group-hover:translate-x-1 transition-transform duration-700">
                  {m.headline}
                </h3>
                <p className="mt-3 text-ink-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {m.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 group-hover:text-oxblood transition-colors duration-300">
                  <span>Explore more</span>
                  <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform duration-300">
                    {'\u2192'}
                  </span>
                </div>
              </div>

              {/* Result — leads with the actual outcome */}
              <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end md:text-right">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                  Result
                </div>
                <div
                  className="mt-2 font-display text-2xl md:text-3xl text-ink leading-[1.05]"
                  dangerouslySetInnerHTML={{ __html: m.result }}
                />
                <div className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-300">
                  <span className="text-oxblood text-base leading-none">{m.glyph}</span>
                  <span>{m.opening}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Case study deep-dive modal */}
      <CaseStudyModal
        open={openCase !== null}
        mode={openCase?.mode ?? 'named'}
        matchNum={openCase?.num ?? ''}
        onClose={() => setOpenCase(null)}
      />
    </section>
  )
}

export default PortfolioSection
