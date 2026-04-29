import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const MoveSequence = lazy(() => import('../three/scenes/MoveSequence'))

interface Step {
  step: 1 | 2 | 3 | 4
  label: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    step: 1,
    label: 'Opening',
    title: 'Strategic Analysis',
    description:
      'We open the game by analyzing your market position, competitors, and opportunities to develop a winning strategy.',
  },
  {
    step: 2,
    label: 'Middle Game',
    title: 'Goal Setting',
    description:
      'Define clear objectives and KPIs that align with your business vision and translate into decisive moves.',
  },
  {
    step: 3,
    label: 'End Game',
    title: 'Execution',
    description:
      'Implement strategic campaigns with precision, monitoring performance and optimizing every move for results.',
  },
  {
    step: 4,
    label: 'Checkmate',
    title: 'Victory',
    description:
      'Achieve checkmate with measurable results, increased ROI, and sustainable, compounding growth.',
  },
]

const StrategyFlow = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 backdrop-blur">
            <span className="text-red-600">&#9821;</span>
            Strategic process — Opening to Checkmate
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Every campaign is a <span className="bg-gradient-to-br from-red-600 to-amber-500 bg-clip-text text-transparent">game</span> we plan to win
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Think like a chess master, act like a champion. Each phase of our process plays a deliberate
            move on the board.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector line */}
          <div
            aria-hidden
            className="hidden lg:block pointer-events-none absolute top-[7.5rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-red-200 via-slate-300 to-amber-200"
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative text-center"
            >
              <div className="relative mx-auto h-44 w-44 sm:h-48 sm:w-48 mb-2">
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center text-3xl text-red-600">
                      {s.step}
                    </div>
                  }
                >
                  <MoveSequence step={s.step} />
                </Suspense>

                <span className="absolute -top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold shadow-md">
                  0{s.step}
                </span>
              </div>

              <div className="text-[11px] tracking-[0.22em] uppercase text-red-600 font-semibold">
                {s.label}
              </div>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-16 border-t border-slate-200"
        >
          {[
            { v: '500+', l: 'Strategic Wins' },
            { v: '98%', l: 'Success Rate' },
            { v: '$10M+', l: 'Revenue Generated' },
            { v: '24/7', l: 'Strategic Support' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{s.v}</div>
              <div className="text-slate-600">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StrategyFlow
