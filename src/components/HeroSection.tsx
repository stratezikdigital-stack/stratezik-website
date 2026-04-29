import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { scrollToContactSection } from '../utils/navigation'

const HeroBoardScene = lazy(() => import('../three/scenes/HeroBoardScene'))

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-9rem)] overflow-hidden bg-gradient-to-b from-[#f7f4ee] via-[#f9f6ef] to-white"
    >
      {/* Soft chess-board pattern + radial light */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className={`${(Math.floor(i / 12) + i) % 2 === 0 ? 'bg-slate-900' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-red-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-amber-300/15 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 lg:pt-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left — copy & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 mb-6 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 backdrop-blur">
              <span className="text-red-600">&#9818;</span>
              Toronto, Canada — Strategic Growth Partner
            </div>

            <h1
              className="font-display text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-semibold leading-[1.05] tracking-tight text-slate-900"
              style={{ fontFamily: '"Fraunces", "Inter", serif' }}
            >
              Think
              <span className="block">several moves</span>
              <span className="bg-gradient-to-br from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
                ahead.
              </span>
            </h1>

            <div className="mt-6 max-w-xl mx-auto lg:mx-0 space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                Stratezik is a full-service digital marketing and growth agency based in Toronto, Canada.
                We help small and mid-sized businesses accelerate growth with integrated SEO, PPC,
                Social, and Growth Marketing.
              </p>
              <p className="text-slate-500">
                Every campaign planned with chess-master precision — so your business achieves
                checkmate in the digital marketplace.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={scrollToContactSection}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-7 py-4 font-semibold shadow-lg shadow-red-900/15 transition-colors"
              >
                Book 1 hr consultation
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white/70 backdrop-blur px-7 py-4 font-semibold text-slate-800 hover:border-slate-400 hover:bg-white transition-colors"
              >
                See our strategic services
              </a>
            </motion.div>

            {/* Stat tiles — glass chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0"
            >
              {[
                { v: '150+', l: 'Strategic Victories' },
                { v: '98%', l: 'Client Satisfaction' },
                { v: '$5M+', l: 'Revenue Generated' },
                { v: '24/7', l: 'Strategic Support' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-white/70 bg-white/55 backdrop-blur px-4 py-3 shadow-sm"
                >
                  <div className="text-2xl font-bold text-red-600">{s.v}</div>
                  <div className="text-xs text-slate-600 leading-tight">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D hero board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto w-full max-w-[640px] aspect-square">
              <div
                aria-hidden
                className="absolute inset-4 rounded-[2.25rem] bg-gradient-to-br from-white/80 via-white/40 to-white/0 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur-sm"
              />
              <div className="relative h-full w-full">
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center text-7xl text-red-600/80">
                      &#9818;
                    </div>
                  }
                >
                  <HeroBoardScene />
                </Suspense>
              </div>

              {/* Floating "strategic dashboard" chip — kept as HTML, anchored to the canvas */}
              <div className="absolute -right-2 sm:right-4 top-6 sm:top-8 hidden sm:block">
                <div className="rounded-2xl bg-slate-900/95 text-white px-4 py-3 shadow-xl backdrop-blur-md border border-white/10 w-56">
                  <div className="flex items-center justify-between mb-2 text-xs text-slate-300">
                    <span className="uppercase tracking-[0.2em]">Strategic Dashboard</span>
                    <span>&#9819;</span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Position</span>
                      <span className="font-semibold text-emerald-400">Checkmate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Growth</span>
                      <span className="font-semibold text-amber-300">+150%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">ROI</span>
                      <span className="font-semibold text-sky-300">$2.5M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="animate-bounce">
          <div className="w-5 h-9 border-2 border-slate-400/70 rounded-full flex justify-center">
            <div className="w-1 h-2.5 bg-slate-400 rounded-full mt-1.5" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
