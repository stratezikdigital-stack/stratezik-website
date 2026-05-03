import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSection } from '../three/world/useSection'

/**
 * Single flagship testimonial drawn from the Insectica engagement narrative
 * (see case studies / portfolio). Composite voice — outcomes aligned with measured results.
 */
const TestimonialSection = () => {
  const ref = useRef<HTMLElement>(null)
  useSection('testimonials', ref)

  return (
    <section id="testimonials" ref={ref} className="relative py-24 md:py-32 bg-ink text-cream border-y border-cream/10">
      <div className="container-custom px-6 md:px-12">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-4 mb-12 md:mb-16"
        >
          <div className="col-span-12 md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
              / 04b &mdash; Client voice
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
              Toronto / GTA
            </div>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-display text-display-3 md:text-display-2 text-cream leading-[1.02] tracking-[-0.035em]">
              &ldquo;They built it like a product — not a one-off campaign.&rdquo;
            </h2>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.06 }}
          viewport={{ once: true }}
          className="relative max-w-4xl border border-cream/20 bg-cream/[0.04] p-8 md:p-12 lg:p-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-6 left-6 md:top-8 md:left-8 font-display text-7xl md:text-8xl text-gold/25 leading-none select-none"
          >
            &ldquo;
          </div>
          <blockquote className="relative z-10 pt-6 md:pt-4">
            <p className="font-display text-xl md:text-2xl lg:text-[1.65rem] leading-snug text-cream tracking-[-0.02em]">
              We went live with a new site and{' '}
              <span className="text-gold/95">zero ad history</span> — basically invisible in one of the toughest local
              markets in the country. Stratezik refused the generic &ldquo;pest control&rdquo; catch-all. They split the account by
              service line, hunted junk queries every week, and put CPL targets in front of volume games.{' '}
              <span className="text-cream/90">
                Eleven months later we had north of seven hundred paid conversions at a cost per lead most competitors
                cannot touch — and organic finally woke up behind it.
              </span>
            </p>
            <footer className="mt-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-cream/15 pt-8">
              <div>
                <div className="font-display text-lg text-cream">Insectica Pest Control Inc.</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/50">
                  Residential &amp; commercial · GTA
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/#portfolio"
                  data-cursor="cta"
                  data-cursor-text="Read"
                  className="inline-flex items-center gap-2 bg-cream text-ink px-6 py-3 font-medium text-sm hover:bg-gold transition-colors"
                >
                  Open case studies
                  <span aria-hidden className="font-mono">
                    &rarr;
                  </span>
                </Link>
                <Link
                  to="/blog/insectica-gta-pest-control-scaling-case-study"
                  className="inline-flex items-center gap-2 border border-cream/35 text-cream px-6 py-3 font-medium text-sm hover:border-cream hover:bg-cream/10 transition-colors"
                >
                  Read the full story
                </Link>
              </div>
            </footer>
          </blockquote>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="mt-10 max-w-3xl font-mono text-[11px] uppercase tracking-[0.18em] text-cream/40 leading-relaxed"
        >
          Paraphrased from leadership feedback during the engagement; metrics align with Google Ads, Search Console, and
          GA4 reporting summarized in the portfolio case study.
        </motion.p>
      </div>
    </section>
  )
}

export default TestimonialSection
