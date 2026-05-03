import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../three/world/useSection'

interface Step {
  step: number
  numeral: string
  phaseStrip: string
  label: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    step: 1,
    numeral: 'I',
    phaseStrip: 'Discovery · weeks 1\u20132',
    label: 'Audit & clarity',
    title: 'Understand demand, gaps, and constraints.',
    description:
      'We review audiences, competitors, tracking, creative, funnels, and economics before spend ramps\u2014so budgets fight for verified opportunities, not guesses.',
  },
  {
    step: 2,
    numeral: 'II',
    phaseStrip: 'Planning · scope lock',
    label: 'Roadmap & priorities',
    title: 'Agree on the playbook and KPIs.',
    description:
      'You get a prioritized roadmap with channel roles, budgets, milestones, and explicit trade-offs. Leadership signs scope once; execution stays aligned.',
  },
  {
    step: 3,
    numeral: 'III',
    phaseStrip: 'Execution · always-on',
    label: 'Ship, learn, tune',
    title: 'Run campaigns with a weekly operating rhythm.',
    description:
      'Structured reporting, creative iterations, search-query hygiene, and landing-page tests\u2014issues surfaced fast and resolved inside the same sprint cadence.',
  },
  {
    step: 4,
    numeral: 'IV',
    phaseStrip: 'Scale · compound',
    label: 'Optimize & expand',
    title: 'Reinvest what proves out.',
    description:
      'Double down on compliant CPA/CPL, strengthen organic authority, tighten attribution narratives for finance, and document repeatable motions your team can own.',
  },
]

const StrategyFlow = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('flow', ref)

  return (
    <section ref={ref} id="strategy" className="relative py-24 md:py-32 bg-cream">
      <div className="container-custom px-6 md:px-12">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              / 03: How we work
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Four phases &middot; one accountable roadmap
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
              From audit to scale,
              <br />
              <span className="italic font-light text-oxblood">without losing the thread.</span>
            </h2>
          </div>
        </motion.header>

        {/* Phases: vertical editorial list with hairline rules */}
        <div className="border-t border-ink/15">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              viewport={{ once: true, margin: '-80px' }}
              className="grid grid-cols-12 gap-4 py-10 md:py-14 border-b border-ink/15 group"
            >
              <div className="col-span-2 md:col-span-1 font-display text-3xl md:text-5xl text-ink-300 group-hover:text-oxblood transition-colors duration-700">
                {s.numeral}
              </div>
              <div className="col-span-10 md:col-span-3 flex flex-col justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                  {s.phaseStrip}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  Phase &middot; {s.label}
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 max-w-3xl">
                <h3 className="font-display text-display-3 text-ink leading-[1.04] tracking-[-0.025em] group-hover:translate-x-1 transition-transform duration-700">
                  {s.title}
                </h3>
                <p className="lead mt-4 text-[1.05rem] sm:text-[1.15rem]">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Index strip: running results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/15"
        >
          {[
            { k: 'Strategic wins', v: '500+' },
            { k: 'Success rate', v: '98%' },
            { k: 'Revenue generated', v: '$10M+' },
            { k: 'Strategic support', v: '24/7' },
          ].map((s) => (
            <div key={s.k} className="bg-cream pt-5 pr-4 pb-3 pl-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                {s.k}
              </div>
              <div className="font-display text-3xl md:text-5xl text-ink mt-1 tabular-nums leading-[1]">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StrategyFlow
