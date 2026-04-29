import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { TiltCard } from '../three/scenes/TiltCard'
import { useSection } from '../three/world/useSection'

interface Project {
  title: string
  category: string
  description: string
  image: string
  technologies: string[]
  results: string
  /** Chess notation for the move that won this case. */
  notation: string
  /** Glyph for the piece that delivered the move. */
  glyph: string
}

const PROJECTS: Project[] = [
  {
    title: 'E-Commerce Checkmate',
    category: 'Digital Marketing',
    description:
      'Strategic e-commerce campaign that achieved 300% increase in sales and market dominance.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    technologies: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
    results: '300% increase in sales',
    notation: 'Kxe4#',
    glyph: '\u265A',
  },
  {
    title: 'Brand Strategy Victory',
    category: 'Brand Strategy',
    description: 'Complete brand transformation that positioned the client as the industry king.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop',
    technologies: ['Brand Identity', 'Messaging', 'Visual Design', 'Positioning'],
    results: 'Market leadership achieved',
    notation: 'Qg7+',
    glyph: '\u265B',
  },
  {
    title: 'Data Analytics Mastery',
    category: 'Analytics & Data',
    description:
      'Advanced analytics implementation that provided strategic insights and optimization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    technologies: ['Google Analytics', 'Data Studio', 'A/B Testing', 'ROI Tracking'],
    results: '40% improvement in decisions',
    notation: 'Re8',
    glyph: '\u265C',
  },
  {
    title: 'Social Media Domination',
    category: 'Social Media',
    description:
      'Comprehensive social media strategy that captured the market and drove engagement.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&h=300&fit=crop',
    technologies: ['Instagram', 'LinkedIn', 'Content Strategy', 'Community Management'],
    results: '500% engagement increase',
    notation: 'Bxh7+',
    glyph: '\u265D',
  },
  {
    title: 'Lead Generation Success',
    category: 'Lead Generation',
    description:
      'Strategic lead generation campaign that filled the sales pipeline with qualified prospects.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
    technologies: ['PPC', 'Landing Pages', 'CRM', 'Automation'],
    results: '200% more qualified leads',
    notation: 'Nf6',
    glyph: '\u265E',
  },
  {
    title: 'Conversion Optimization',
    category: 'Conversion Optimization',
    description: 'Data-driven optimization that maximized conversion rates and revenue growth.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop',
    technologies: ['A/B Testing', 'UX Design', 'Analytics', 'CRO'],
    results: '150% conversion increase',
    notation: 'e4-e5',
    glyph: '\u265F',
  },
]

const PortfolioSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('portfolio', ref)

  return (
    <section id="portfolio" ref={ref} className="relative py-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-amber-300/15 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 mb-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-700 backdrop-blur">
            <span className="text-red-600">&#9820;</span>
            Strategic victories
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight"
            style={{ fontFamily: '"Fraunces", "Inter", serif' }}
          >
            Recent <span className="bg-gradient-to-br from-red-600 to-amber-500 bg-clip-text text-transparent">checkmates</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Each victory below was a calculated move. Hover any card to feel the position.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <TiltCard className="rounded-2xl">
                <div className="rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.25)] overflow-hidden border border-slate-200 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Notation badge — looks like a chess clock */}
                    <div className="absolute top-3 left-3 rounded-md border border-white/20 bg-slate-900/85 backdrop-blur px-2.5 py-1 shadow-lg flex items-center gap-1.5">
                      <span className="text-amber-300 text-base leading-none">{project.glyph}</span>
                      <span className="text-white text-xs font-mono tracking-wide">{project.notation}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/0 to-transparent" />

                    <div className="absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="rounded-full bg-white/90 text-slate-900 text-xs font-semibold px-2.5 py-1">
                        {project.category}
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-white text-slate-900 px-3 py-1 text-xs font-semibold hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Victory
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-red-600 font-semibold uppercase tracking-[0.15em]">
                        {project.category}
                      </span>
                      <span className="text-xs text-emerald-600 font-semibold">
                        {project.results}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors text-sm flex items-center gap-1.5"
                    >
                      Case Study
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-200"
        >
          {[
            { v: '150+', l: 'Strategic Victories' },
            { v: '98%', l: 'Client Satisfaction' },
            { v: '$5M+', l: 'Revenue Generated' },
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

export default PortfolioSection
