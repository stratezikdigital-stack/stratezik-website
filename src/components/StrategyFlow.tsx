import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../three/world/useSection'

interface Step {
  step: 1 | 2 | 3 | 4
  glyph: string
  label: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    step: 1,
    glyph: '\u265E',
    label: 'Opening',
    title: 'Strategic Analysis',
    description:
      'We open the game by analyzing your market position, competitors, and opportunities to develop a winning strategy.',
  },
  {
    step: 2,
    glyph: '\u265D',
    label: 'Middle Game',
    title: 'Goal Setting',
    description:
      'Define clear objectives and KPIs that align with your business vision and translate into decisive moves.',
  },
  {
    step: 3,
    glyph: '\u265B',
    label: 'End Game',
    title: 'Execution',
    description:
      'Implement strategic campaigns with precision, monitoring performance and optimizing every move for results.',
  },
  {
    step: 4,
    glyph: '\u265A',
    label: 'Checkmate',
    title: 'Victory',
    description:
      'Achieve checkmate with measurable results, increased ROI, and sustainable, compounding growth.',
  },
]

const StrategyFlow = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('flow', ref)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur px-3 py-1 mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700">
            <span className="text-red-600">&#9821;</span>
            Strategic process — Opening to Checkmate
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Every campaign is a <span className="bg-gradient-to-br from-red-600 to-amber-500 bg-clip-text text-transparent">game</span> we plan to win
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl mx-auto bg-white/60 backdrop-blur rounded-xl px-4 py-2 inline-block">
            Think like a chess master, act like a champion. Each phase plays a deliberate move.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            aria-hidden
            className="hidden lg:block pointer-events-none absolute top-[5.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-red-200 via-slate-300 to-amber-200"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-6 text-center shadow-[0_20px_50px_-25px_rgba(15,23,42,0.3)]"
            >
              <span className="absolute -top-3 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold shadow-md">
                0{s.step}
              </span>

              <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-4xl text-red-600 mb-4 shadow-inner">
                {s.glyph}
              </div>

              <div className="text-[11px] tracking-[0.22em] uppercase text-red-600 font-semibold">
                {s.label}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-slate-200/70"
        >
          {[
            { v: '500+', l: 'Strategic Wins' },
            { v: '98%', l: 'Success Rate' },
            { v: '$10M+', l: 'Revenue Generated' },
            { v: '24/7', l: 'Strategic Support' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{s.v}</div>
              <div className="text-slate-700">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StrategyFlow
