import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { scrollToContactSection } from '../utils/navigation'
import { useSection } from '../three/world/useSection'

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('hero', ref)

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex items-stretch min-h-[calc(100vh-9rem)] lg:min-h-[180vh]"
      aria-label="Hero"
    >
      {/* Sticky inner container — on lg+ the copy stays pinned for one
          viewport while the global 3D world plays the intro beat behind it.
          On mobile we use natural flow so users can read + scroll without
          a tall blank section. */}
      <div className="lg:sticky lg:top-0 w-full lg:h-screen flex items-center">
        {/* Soft horizontal vignette — keeps the headline area legible without
            washing out the 3D world. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f7f4ee]/85 via-[#f7f4ee]/30 to-transparent"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 lg:col-span-6 text-left"
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
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start"
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
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl"
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

          {/* Right column intentionally empty — the world canvas behind us is
              the visual; we leave a column of breathing room so the focal pawn
              has space to move into. */}
          <div className="md:col-span-5 lg:col-span-6 hidden md:block" aria-hidden />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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
