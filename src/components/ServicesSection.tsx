import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { scrollToContactSection } from '../utils/navigation'
import { useSection } from '../three/world/useSection'
import { inViewProps } from '../utils/motionPresets'
import { useMotionEnabled } from '../utils/useMotionEnabled'

/**
 * Plan D - Services grid.
 *
 * Six discipline cards with abstract lane diagrams. Copy stays channel-native
 * so visitors immediately map tiles to acquisition work.
 */

interface Opening {
  /** The actual service we sell (large, dominant headline). */
  service: string
  /** Short discipline lane label (mono accent). */
  opening: string
  /** Editorial blurb */
  thesis: string
  /** Tactical bullets */
  tactics: string[]
  /** SVG diagram path d's: coordinates on a 8x8 grid (0..7) */
  arrows: { from: [number, number]; to: [number, number]; color: 'white' | 'black' }[]
  /** Detail page this discipline maps to */
  href: string
}

const OPENINGS: Opening[] = [
  {
    service: 'Paid Search & Social Ads',
    opening: 'Paid acquisition',
    thesis:
      'Structured accounts beat guesswork: tight geo/device splits, conversion-grade creative velocity, disciplined negatives, and pacing tuned to margin\u2014not vanity reach.',
    tactics: [
      'High-performance Google Ads',
      'Programmatic + retargeting',
      'Meta, LinkedIn, TikTok, YouTube',
      'Local + Google Business Profile',
    ],
    arrows: [
      { from: [4, 1], to: [4, 3], color: 'white' },
      { from: [4, 6], to: [4, 4], color: 'black' },
      { from: [5, 1], to: [5, 3], color: 'white' },
    ],
    href: '/services/paid-search',
  },
  {
    service: 'SEO & Organic Growth',
    opening: 'Organic growth',
    thesis:
      'Search compounds when technical foundations, topical authority, helpful content, and earned links align\u2014patient capital that keeps yielding once rankings stabilize.',
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
    href: '/services/seo-aeo',
  },
  {
    service: 'Social Strategy & Content',
    opening: 'Social & content',
    thesis:
      'Channels grow when editorial calendars, formats, and hooks ladder to revenue narratives\u2014always-on reporting keeps creative accountable to pipeline, not likes.',
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
    href: '/services/social-media-marketing',
  },
  {
    service: 'Brand Strategy & Identity',
    opening: 'Brand platform',
    thesis:
      'Premium positioning trades noisy short-term volume for durable recall\u2014architecture, naming, visual systems, and messaging your sales team can repeat without translating.',
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
    href: '/services/brand-strategy',
  },
  {
    service: 'Conversion & Growth',
    opening: 'Conversion systems',
    thesis:
      'Lifecycle revenue comes from deliberate experimentation\u2014landing tests, offers, nurture arcs, and retention hooks instrumented so winners scale with governance.',
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
    href: '/services/web-design',
  },
  {
    service: 'Analytics & Data',
    opening: 'Measurement stack',
    thesis:
      'Dashboards only help when definitions match finance\u2014clean events, honest attribution narratives, executive summaries, and alerting before anomalies become crises.',
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
    href: '/services',
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
      aria-label="Service lane diagram"
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

function OpeningCard({ opening, index, motionOn }: { opening: Opening; index: number; motionOn: boolean }) {
  return (
    <motion.article
      {...inViewProps(motionOn, 30, index * 0.05)}
      data-cursor="glyph"
      data-cursor-glyph={'\u265F'}
      className="group relative bg-cream-50 border border-ink/10 hover:border-ink/30 transition-all duration-700 lift"
    >
      {/* Top hairline accent: appears on hover */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-px bg-oxblood transition-all duration-700 ease-out group-hover:w-full"
        style={{ width: '0%' }}
      />

      <div className="grid grid-cols-12 gap-4 p-7 md:p-8">
        {/* Title block: service name is the headline, opening is a tiny accent */}
        <div className="col-span-12 md:col-span-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
            Lane &middot; {opening.opening}
          </div>
          <h3 className="mt-2 font-display text-display-3 text-ink leading-[1.02] tracking-[-0.025em]">
            {opening.service}
          </h3>
        </div>

        {/* Mini board: small visual accent */}
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
        <Link
          to={opening.href}
          data-cursor="cta"
          data-cursor-text="Explore"
          className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink transition-colors"
        >
          Explore service
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </motion.article>
  )
}

const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('services', ref)
  const motionOn = useMotionEnabled()

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-cream">
      <div className="container-custom px-6 md:px-12">
        {/* Section heading row: editorial */}
        <motion.header
          {...inViewProps(motionOn)}
          className="grid grid-cols-12 gap-4 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Services
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Six disciplines &middot; one playbook
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
              We ship integrated programs,
              <br />
              <span className="italic font-light text-oxblood">not random tactics.</span>
            </h2>
            <p className="lead mt-8 max-w-3xl">
              Every engagement ties channels to revenue-facing KPIs: paid, organic, creative,
              analytics, and tooling share one roadmap instead of competing narratives.
            </p>
            <Link
              to="/services"
              data-cursor="cta"
              data-cursor-text="Explore"
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink transition-colors"
            >
              Explore all services
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </motion.header>

        {/* Opening cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink/10">
          {OPENINGS.map((o, i) => (
            <OpeningCard key={o.opening} opening={o} index={i} motionOn={motionOn} />
          ))}
        </div>

        {/* Seventh discipline masthead: same grid pattern as opening services */}
        <motion.header
          {...inViewProps(motionOn)}
          className="grid grid-cols-12 gap-4 mt-24 md:mt-32 mb-10 md:mb-14"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Seventh discipline
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              AI agents &middot; custom apps &middot; integrations
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
              AI agent &amp; tool creation for clients
            </h2>
            <p className="lead mt-6 max-w-3xl">
              We design, build, and maintain customer-facing apps and internal tools backed by AI where
              it actually helps:&nbsp;research, drafting, routing, QA, reporting, and first-line customer
              questions. Agents and workflows connect to your ad accounts, CRM, analytics suite, Google
              Business Profile, and other systems you already use so your marketing and sales teams move
              faster without broken handoffs or mystery automation.
            </p>
          </div>
        </motion.header>

        {/* Flagship: full-width band (two OpeningCard columns) */}
        <motion.article
          {...inViewProps(motionOn, 24)}
          data-cursor="glyph"
          data-cursor-glyph={'\u265B'}
          className="relative bg-ink text-cream border border-ink/10 overflow-hidden lift"
          aria-labelledby="ai-band-title"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(#f4ede1 1px, transparent 1px), linear-gradient(90deg, #f4ede1 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-12 lg:p-14">
            <div className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div>
                <h3
                  id="ai-band-title"
                  className="font-display text-[clamp(1.65rem,3.2vw,2.35rem)] leading-[1.05] tracking-[-0.03em]"
                >
                  What we build together
                </h3>
                <p className="mt-5 text-cream/85 text-base md:text-[1.05rem] leading-relaxed max-w-lg">
                  Custom tools and assistants are scoped against your funnel, approvals, privacy rules,
                  and measurement plan. Typical deliverables combine a working product or agent, prompts
                  and playbooks people can repeat, APIs or secure data connections where needed, and a
                  short training pass so adoption sticks past launch week.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                <button
                  type="button"
                  onClick={scrollToContactSection}
                  data-cursor="cta"
                  data-cursor-text="Brief"
                  className="inline-flex self-start items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
                    Discuss a build
                  </span>
                  <span aria-hidden className="font-mono">&rarr;</span>
                </button>
                <Link
                  to="/services/ai-agents"
                  data-cursor="cta"
                  data-cursor-text="Explore"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gold hover:text-cream transition-colors"
                >
                  AI Agents service
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-cream/15 lg:pl-12 pt-8 lg:pt-0 space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">
                Examples of scoped work
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {[
                  'Chat and voice-style agents wired to CRM, ticketing, knowledge bases',
                  'Customer calculators, onboarding wizards, and quote flows on your site',
                  'Internal dashboards: pacing, creatives, anomalies, SLA alerts across channels',
                  'Ops automation: ingest lead data, tag, escalate, annotate, reopen closed loops',
                  'Prompt packs, escalation rules, auditing, reviewer roles, and veto paths',
                  'Rollout checklist, stakeholder training, and a 30-day hardening window',
                ].map((line) => (
                  <li key={line} className="flex items-baseline gap-2.5 text-sm text-cream/90 leading-snug">
                    <span className="font-mono text-[10px] text-oxblood-400 shrink-0">◇</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>

        {/* Bottom CTA strip: editorial CTA, no gradient */}
        <motion.div
          {...inViewProps(motionOn, 20)}
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
