import { useRef } from 'react'
import { motion } from 'framer-motion'
import { scrollToContactSection } from '../utils/navigation'
import { useSection } from '../three/world/useSection'

interface Service {
  glyph: string
  title: string
  description: string
  features: string[]
}

const SERVICES: Service[] = [
  {
    glyph: '\u265A',
    title: 'Strategic Planning',
    description:
      'Data-driven strategies that think several moves ahead, ensuring your business achieves checkmate in the marketplace.',
    features: ['Market Analysis', 'Competitive Research', 'Goal Setting', 'ROI Forecasting'],
  },
  {
    glyph: '\u265B',
    title: 'Brand Strategy',
    description: 'Build a powerful brand presence that positions you as the king in your industry.',
    features: ['Brand Identity', 'Messaging Strategy', 'Visual Design', 'Brand Guidelines'],
  },
  {
    glyph: '\u265E',
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
    glyph: '\u265D',
    title: 'Creative Campaigns',
    description: 'Innovative campaigns that capture attention and drive results with chess master precision.',
    features: ['Content Creation', 'Social Media', 'Email Marketing', 'PPC Campaigns'],
  },
  {
    glyph: '\u265C',
    title: 'Growth Optimization',
    description: 'Scalable growth strategies that maximize your ROI and market position.',
    features: ['Conversion Optimization', 'Lead Generation', 'Customer Retention', 'Market Expansion'],
  },
  {
    glyph: '\u265F',
    title: 'Analytics & Data',
    description: 'Transform your data into actionable insights with advanced analytics and strategic reporting.',
    features: ['Performance Tracking', 'Conversion Optimization', 'A/B Testing', 'Real-time Reporting'],
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-50px' }}
      className="group relative rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-6 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.35)] hover:shadow-[0_30px_70px_-30px_rgba(220,38,38,0.4)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
    >
      <div
        aria-hidden
        className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-red-500/0 via-red-500/60 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <div className="text-4xl text-red-600 mb-3 leading-none">{service.glyph}</div>

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
  const ref = useRef<HTMLElement>(null)
  useSection('services', ref)

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur px-3 py-1 mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700">
            <span className="text-red-600">&#9819;</span>
            The board, the pieces, the play
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Our <span className="bg-gradient-to-br from-red-600 to-amber-500 bg-clip-text text-transparent">strategic</span> services
          </h2>
          <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto bg-white/60 backdrop-blur rounded-xl px-4 py-2 inline-block">
            Each service is a piece on the board. Watch the pawn promote as you scroll.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Full-width flagship: AI agents & bespoke tools */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true, margin: '-40px' }}
          className="mt-10 lg:mt-14 rounded-2xl border border-slate-900/70 bg-gradient-to-br from-slate-900 via-slate-800 to-red-950/90 p-8 sm:p-10 text-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.55)] lg:grid lg:grid-cols-12 lg:gap-10"
          aria-labelledby="ai-services-heading"
        >
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200/90 mb-4">
              <span>&#9819;</span>
              AI &amp; automation
            </div>
            <h3
              id="ai-services-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
              style={{ fontFamily: '"Fraunces", "Inter", serif' }}
            >
              AI agents, apps &amp;{' '}
              <span className="bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">
                workflow tools
              </span>
            </h3>
            <p className="mt-4 text-white/80 text-[15px] sm:text-base leading-relaxed">
              Ship customer-facing configurators and micro-apps, train conversational agents on your funnel and
              brand guardrails, and wire internal dashboards so Ads, CRM, analytics, and your team stay aligned.
              Fewer spreadsheets, sharper decisions hyper-performing teams deserve.
            </p>
          </div>
          <div className="lg:col-span-7 lg:border-l lg:border-white/15 lg:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/85 mb-4">
              What we build
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[15px] text-white/85">
              {[
                'Conversational & task agents grounded in approved knowledge',
                'Customer-facing calculators, scorecards, onboarding flows',
                'Ops dashboards, alerts & QA pipelines across martech stacks',
                'Automation bridges covering leads, creatives, tagging, GBP',
              ].map((t) => (
                <li key={t} className="flex gap-2 items-start">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-300 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollToContactSection}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white text-red-700 px-5 py-2.5 font-semibold text-sm hover:bg-slate-100 transition-colors"
            >
              Talk AI &amp; tools
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-red-900/85 backdrop-blur p-8 sm:p-10 text-white shadow-2xl">
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
