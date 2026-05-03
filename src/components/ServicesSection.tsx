import { useRef } from 'react'
import { motion } from 'framer-motion'
import { scrollToContactSection } from '../utils/navigation'
import { useSection } from '../three/world/useSection'

/**
 * Plan D — Services as openings.
 *
 * Each Stratezik service is reframed as a famous chess opening, paired
 * with a small SVG diagram showing that opening's first three moves.
 * Cards are editorial: hairline rules, tabular notation, no gradient
 * candy. Hover lifts the card slightly and reveals an accent rule.
 */

interface Opening {
  number: string
  /** The actual service we sell (large, dominant headline). */
  service: string
  /** Chess-opening accent — small label only. */
  opening: string
  /** Editorial blurb */
  thesis: string
  /** Tactical bullets */
  tactics: string[]
  /** SVG diagram path d's — coordinates on a 8x8 grid (0..7) */
  arrows: { from: [number, number]; to: [number, number]; color: 'white' | 'black' }[]
}

const OPENINGS: Opening[] = [
  {
    number: '01',
    service: 'Paid Search & Social Ads',
    opening: "King's Gambit",
    thesis:
      'Sacrifice a pawn early to seize the centre and the initiative. In paid media: a bold opening bid that buys position your competitors can\u2019t recover from.',
    tactics: [
      'High-performance Google Ads',
      'Programmatic + retargeting',
      'Meta, LinkedIn, TikTok, YouTube',
      'Local + GBP dominance',
    ],
    arrows: [
      { from: [4, 1], to: [4, 3], color: 'white' },
      { from: [4, 6], to: [4, 4], color: 'black' },
      { from: [5, 1], to: [5, 3], color: 'white' },
    ],
  },
  {
    number: '02',
    service: 'SEO & Organic Growth',
    opening: 'Sicilian Defense',
    thesis:
      'The most-studied counter in modern chess. Asymmetric, patient, ruthlessly long-term. SEO\u2019s exact temperament \u2014 you don\u2019t buy attention, you compound it.',
    tactics: [
      'Technical SEO + site architecture',
      'Topical authority clusters',
      'Programmatic content engines',
      'E-E-A-T + link strategy',
    ],
    arrows: [
      { from: [4, 1], to: [4, 3], color: 'white' },
      { from: [2, 6], to: [2, 4], color: 'black' },
      { from: [6, 0], to: [5, 2], color: 'white' },
    ],
  },
  {
    number: '03',
    service: 'Social Strategy & Content',
    opening: 'Italian Game',
    thesis:
      'Develops pieces toward the most provocative square \u2014 right next to the opponent\u2019s king. Social done right: every post is positional, none of it is filler.',
    tactics: [
      'Editorial calendars + creative direction',
      'Short-form video systems',
      'Community + influencer programs',
      'Always-on reporting cadence',
    ],
    arrows: [
      { from: [4, 1], to: [4, 3], color: 'white' },
      { from: [6, 0], to: [5, 2], color: 'white' },
      { from: [5, 0], to: [2, 3], color: 'white' },
    ],
  },
  {
    number: '04',
    service: 'Brand Strategy & Identity',
    opening: "Queen's Gambit",
    thesis:
      'Offer a flank pawn to dominate the centre. The premium brand play: trade short-term volume for long-term positioning that no challenger can dislodge.',
    tactics: [
      'Brand architecture + naming',
      'Visual identity systems',
      'Messaging frameworks',
      'Brand books + governance',
    ],
    arrows: [
      { from: [3, 1], to: [3, 3], color: 'white' },
      { from: [2, 1], to: [2, 3], color: 'white' },
      { from: [3, 6], to: [3, 4], color: 'black' },
    ],
  },
  {
    number: '05',
    service: 'Conversion & Growth',
    opening: 'English Opening',
    thesis:
      'Flexible, hyper-modern, transposable. Conversion engineering at its best: every funnel adapts to the visitor, no scripted opening required.',
    tactics: [
      'CRO + landing-page systems',
      'Lead-gen + nurture flows',
      'Lifecycle + retention',
      'Pricing & offer testing',
    ],
    arrows: [
      { from: [2, 1], to: [2, 3], color: 'white' },
      { from: [4, 6], to: [4, 4], color: 'black' },
      { from: [1, 0], to: [2, 2], color: 'white' },
    ],
  },
  {
    number: '06',
    service: 'Analytics & Data',
    opening: "Reti Opening",
    thesis:
      'Win without revealing your plan. Modern analytics: the answer doesn\u2019t come from the dashboard \u2014 it comes from the question we frame two layers above it.',
    tactics: [
      'Measurement architecture',
      'GA4 + server-side tagging',
      'Attribution + MMM',
      'Executive reporting',
    ],
    arrows: [
      { from: [6, 0], to: [5, 2], color: 'white' },
      { from: [3, 6], to: [3, 4], color: 'black' },
      { from: [2, 1], to: [2, 3], color: 'white' },
    ],
  },
]

/**
 * Tiny SVG mini-board with arrowed move overlay.
 * 8x8, coordinates 0..7 (file, rank).
 */
function MiniBoard({ arrows }: { arrows: Opening['arrows'] }) {
  const tile = 12
  const board = []
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const dark = (f + r) % 2 === 1
      board.push(
        <rect
          key={`${f}-${r}`}
          x={f * tile}
          y={(7 - r) * tile}
          width={tile}
          height={tile}
          fill={dark ? '#2a2722' : '#e6dfcf'}
        />,
      )
    }
  }

  return (
    <svg
      viewBox={`0 0 ${tile * 8} ${tile * 8}`}
      className="w-full h-full"
      role="img"
      aria-label="Opening diagram"
    >
      <defs>
        <marker
          id="white-head"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f4ede1" />
        </marker>
        <marker
          id="black-head"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a1f1f" />
        </marker>
      </defs>
      {board}
      <rect x={0} y={0} width={tile * 8} height={tile * 8} fill="none" stroke="#0d0c0a" strokeWidth={1} />
      {arrows.map((a, i) => {
        const x1 = a.from[0] * tile + tile / 2
        const y1 = (7 - a.from[1]) * tile + tile / 2
        const x2 = a.to[0] * tile + tile / 2
        const y2 = (7 - a.to[1]) * tile + tile / 2
        const stroke = a.color === 'white' ? '#f4ede1' : '#7a1f1f'
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth={2.5}
            strokeLinecap="round"
            markerEnd={a.color === 'white' ? 'url(#white-head)' : 'url(#black-head)'}
            opacity={0.95}
          />
        )
      })}
    </svg>
  )
}

function OpeningCard({ opening, index }: { opening: Opening; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      data-cursor="glyph"
      data-cursor-glyph={'\u265F'}
      className="group relative bg-cream-50 border border-ink/10 hover:border-ink/30 transition-all duration-700 lift"
    >
      {/* Top hairline accent — appears on hover */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-px bg-oxblood transition-all duration-700 ease-out group-hover:w-full"
        style={{ width: '0%' }}
      />

      <div className="grid grid-cols-12 gap-4 p-7 md:p-8">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
            {opening.number}
          </span>
        </div>

        {/* Title block — service name is the headline, opening is a tiny accent */}
        <div className="col-span-10 md:col-span-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
            Plays the {opening.opening}
          </div>
          <h3 className="mt-2 font-display text-display-3 text-ink leading-[1.02] tracking-[-0.025em]">
            {opening.service}
          </h3>
        </div>

        {/* Mini board — small visual accent */}
        <div className="col-span-12 md:col-span-3 flex items-start justify-end">
          <div className="w-16 md:w-20 aspect-square opacity-80">
            <MiniBoard arrows={opening.arrows} />
          </div>
        </div>
      </div>

      <div className="hairline mx-7 md:mx-8" />

      <div className="p-7 md:p-8 pt-6">
        <p className="lead text-[1.05rem] sm:text-[1.15rem] mb-5 leading-snug max-w-3xl">
          {opening.thesis}
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {opening.tactics.map((t) => (
            <li key={t} className="flex items-baseline gap-2 text-sm text-ink-700">
              <span className="font-mono text-[10px] text-oxblood">&#9670;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('services', ref)

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-cream">
      <div className="container-custom px-6 md:px-12">
        {/* Section heading row — editorial */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              / 02 &mdash; Services
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Six disciplines &middot; one repertoire
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
              We don&rsquo;t run campaigns.
              <br />
              <span className="italic font-light text-oxblood">We run gambits.</span>
            </h2>
            <p className="lead mt-8 max-w-3xl">
              Every Stratezik engagement is built on a documented playbook &mdash; six disciplines
              we&rsquo;ve studied, refined, and won with. Pick the discipline that suits your
              position, or let us prepare a tailored line of play.
            </p>
          </div>
        </motion.header>

        {/* Opening cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/10">
          {OPENINGS.map((o, i) => (
            <OpeningCard key={o.opening} opening={o} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip — editorial CTA, no gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-28 grid grid-cols-12 gap-4"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Choose your line
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 hairline pt-8">
            <h3 className="font-display text-display-3 text-ink max-w-3xl tracking-[-0.025em] leading-[1.02]">
              Or let us prepare a tailored opening for your market.
            </h3>
            <button
              type="button"
              onClick={scrollToContactSection}
              data-cursor="cta"
              data-cursor-text="Open"
              className="mt-8 inline-flex items-center gap-3 bg-ink text-cream px-8 py-4 font-medium hover:bg-oxblood transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">/03</span>
              Book the consultation
              <span aria-hidden className="font-mono">&rarr;</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesSection
