import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../three/world/useSection'

interface MatchRecord {
  num: string
  /** Headline framed as the opponent we beat */
  opponent: string
  /** Discipline */
  category: string
  /** Game story — short editorial */
  description: string
  /** The winning move in algebraic notation */
  notation: string
  /** Glyph for the piece that delivered the move. */
  glyph: string
  /** Headline result */
  result: string
  /** Opening played */
  opening: string
  /** Match length */
  moves: string
}

const MATCHES: MatchRecord[] = [
  {
    num: '#047',
    opponent: 'vs Fragmented CPC Market',
    category: 'Paid Media',
    description:
      'Opponent had been bidding on every long-tail keyword without a unifying narrative. We consolidated 240 ad groups into 18 strategic clusters, each anchored by a deliberate creative thesis.',
    notation: 'Bxh7+',
    glyph: '\u265D',
    result: '+312% CTR &middot; 90 days',
    opening: "King's Gambit",
    moves: '1\u201347',
  },
  {
    num: '#039',
    opponent: 'vs Stalled Organic Growth',
    category: 'SEO & Content',
    description:
      'Twelve months of SEO work, no compounding return. We rebuilt topical authority from a hub-and-spoke model and rewrote the technical foundation. Recovered position in nine weeks.',
    notation: 'Re8',
    glyph: '\u265C',
    result: '+184% organic sessions &middot; 9 weeks',
    opening: 'Sicilian Defense',
    moves: '1\u201339',
  },
  {
    num: '#031',
    opponent: 'vs Generic Brand Identity',
    category: 'Brand Strategy',
    description:
      'Visual sameness was costing them deals against challengers. We rebuilt the wordmark, voice, and visual system around a single ownable position and gave sales a story to lead with.',
    notation: 'Qg7+',
    glyph: '\u265B',
    result: 'Win-rate +28pts',
    opening: "Queen's Gambit",
    moves: '1\u201331',
  },
  {
    num: '#024',
    opponent: 'vs Misattributed Spend',
    category: 'Analytics',
    description:
      'Reporting attributed 70% of revenue to last-click. We rebuilt measurement on server-side tagging and incrementality testing. Reallocated $1.4M to verifiably profitable channels.',
    notation: 'Nf6',
    glyph: '\u265E',
    result: '$1.4M reallocated &middot; ROAS +2.4x',
    opening: 'English Opening',
    moves: '1\u201324',
  },
  {
    num: '#018',
    opponent: 'vs Low-Converting Funnel',
    category: 'Conversion',
    description:
      'Traffic was healthy. Conversion was bleeding. We re-architected the offer ladder, rewrote three landing pages, and instrumented systematic A/B testing.',
    notation: 'e4-e5',
    glyph: '\u265F',
    result: '+150% conversion rate',
    opening: 'Reti Opening',
    moves: '1\u201318',
  },
  {
    num: '#012',
    opponent: 'vs Quiet Social Presence',
    category: 'Social',
    description:
      'Audience was there but unconvinced. We installed an editorial cadence and a weekly creative review. Engagement compounded; community built itself.',
    notation: 'Kxe4',
    glyph: '\u265A',
    result: '+500% engagement &middot; 6 months',
    opening: 'Italian Game',
    moves: '1\u201312',
  },
]

const PortfolioSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('portfolio', ref)

  return (
    <section id="portfolio" ref={ref} className="relative py-24 md:py-32">
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
              Six games.
              <br />
              <span className="italic font-light text-oxblood">Six wins.</span>
            </h2>
            <p className="lead mt-8 max-w-3xl">
              We treat every engagement like a tournament match. Each card below is a record of a
              specific position, the opening we chose, and the move that decided it.
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
              className="group grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-ink/15 hover:bg-cream-50 transition-colors duration-700 cursor-pointer"
            >
              {/* Game number */}
              <div className="col-span-3 md:col-span-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 pt-2">
                Game
                <div className="text-ink mt-0.5 tabular-nums">{m.num}</div>
              </div>

              {/* Opponent + category */}
              <div className="col-span-9 md:col-span-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                  {m.category} &middot; {m.opening}
                </div>
                <h3 className="mt-1 font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-[1.05] tracking-[-0.025em] group-hover:translate-x-1 transition-transform duration-700">
                  {m.opponent}
                </h3>
                <p className="mt-3 text-ink-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {m.description}
                </p>
              </div>

              {/* Result */}
              <div className="col-span-12 md:col-span-3 flex flex-col justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                  Result
                </div>
                <div
                  className="mt-2 font-display text-lg text-ink leading-tight"
                  dangerouslySetInnerHTML={{ __html: m.result }}
                />
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  Moves {m.moves}
                </div>
              </div>

              {/* Winning move + glyph */}
              <div className="col-span-12 md:col-span-3 flex items-start justify-end">
                <div className="text-right">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                    Winning move
                  </div>
                  <div className="mt-1 inline-flex items-baseline gap-2">
                    <span className="text-3xl text-oxblood leading-none">{m.glyph}</span>
                    <span className="font-mono text-xl text-ink tabular-nums">{m.notation}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioSection
