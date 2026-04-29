import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToContactSection } from '../utils/navigation'
import type { PieceName } from '../three/pieces'

const ServicePieceCanvas = lazy(() => import('../three/scenes/ServicePieceCanvas'))

interface Service {
  piece: PieceName
  title: string
  description: string
  features: string[]
}

const SERVICES: Service[] = [
  {
    piece: 'king',
    title: 'Strategic Planning',
    description:
      'Data-driven strategies that think several moves ahead, ensuring your business achieves checkmate in the marketplace.',
    features: ['Market Analysis', 'Competitive Research', 'Goal Setting', 'ROI Forecasting'],
  },
  {
    piece: 'queen',
    title: 'Brand Strategy',
    description: 'Build a powerful brand presence that positions you as the king in your industry.',
    features: ['Brand Identity', 'Messaging Strategy', 'Visual Design', 'Brand Guidelines'],
  },
  {
    piece: 'knight',
    title: 'Paid Search & Social Media Ads',
    description:
      'Data-driven search, display and social media campaigns that deliver maximum ROI and qualified leads.',
    features: [
      'High-performance Google Ads',
      'Google Business Profile (GBP) and Local SEO',
      'Remarketing and retargeting campaigns',
      'Ad campaigns on LinkedIn, Instagram, Facebook, TikTok, and other platforms',
      'Video advertising on any platforms',
    ],
  },
  {
    piece: 'bishop',
    title: 'Creative Campaigns',
    description: 'Innovative campaigns that capture attention and drive results with chess master precision.',
    features: ['Content Creation', 'Social Media', 'Email Marketing', 'PPC Campaigns'],
  },
  {
    piece: 'rook',
    title: 'Growth Optimization',
    description: 'Scalable growth strategies that maximize your ROI and market position.',
    features: ['Conversion Optimization', 'Lead Generation', 'Customer Retention', 'Market Expansion'],
  },
  {
    piece: 'pawn',
    title: 'Analytics & Data',
    description: 'Transform your data into actionable insights with advanced analytics and strategic reporting.',
    features: ['Performance Tracking', 'Conversion Optimization', 'A/B Testing', 'Real-time Reporting'],
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.18)] hover:shadow-[0_24px_60px_-25px_rgba(220,38,38,0.35)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
    >
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-red-500/0 via-red-500/60 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div className="relative h-28 w-28 -mt-4 mb-3">
        <Suspense
          fallback={
            <div className="h-full w-full flex items-center justify-center text-4xl text-red-600">
              &#9818;
            </div>
          }
        >
          <ServicePieceCanvas piece={service.piece} active={hover} />
        </Suspense>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
      <p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.description}</p>

      <ul className="space-y-1.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start text-sm text-slate-600">
            <span className="mt-2 mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-red-600 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={scrollToContactSection}
        className="mt-5 inline-flex items-center gap-1 text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
      >
        Learn Strategy
        <span aria-hidden className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
      </button>
    </motion.div>
  )
}

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
      >
        <div className="grid grid-cols-16 grid-rows-16 h-full w-full">
          {Array.from({ length: 256 }).map((_, i) => (
            <div
              key={i}
              className={(Math.floor(i / 16) + i) % 2 === 0 ? 'bg-slate-900' : 'bg-transparent'}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 backdrop-blur">
            <span className="text-red-600">&#9819;</span>
            The board, the pieces, the play
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Our <span className="bg-gradient-to-br from-red-600 to-amber-500 bg-clip-text text-transparent">strategic</span> services
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Each service is a piece on the board. Hover any of them to see the move it makes for your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-red-900/80 p-8 sm:p-10 text-white shadow-2xl">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              <div className="grid grid-cols-12 grid-rows-4 h-full w-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className={(Math.floor(i / 12) + i) % 2 === 0 ? 'bg-white' : 'bg-transparent'} />
                ))}
              </div>
            </div>
            <div className="relative grid sm:grid-cols-[1fr_auto] items-center gap-6">
              <div>
                <div className="text-3xl mb-2">&#9818;</div>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                  Ready to make your strategic move?
                </h3>
                <p className="text-white/80 mt-2 max-w-xl">
                  Let&apos;s discuss how our strategic services can help you achieve checkmate.
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToContactSection}
                className="inline-flex items-center justify-center bg-white text-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                Book 1 hr consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
