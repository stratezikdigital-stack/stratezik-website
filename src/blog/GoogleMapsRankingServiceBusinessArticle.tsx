import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { Link } from 'react-router-dom'
import { googleMapsRankingServiceBusinessFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

const REF = {
  brightLocalFactors: 'https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/',
  whitespark2026: 'https://whitespark.ca/local-search-ranking-factors/',
  harmoOverview: 'https://harmo.me/en/blog/local-seo-ranking-factors-2026-whitespark',
  googleBusiness: 'https://business.google.com/',
}

/** Why service businesses underperform on Google Maps (Ontario / local pack lens). */
export default function GoogleMapsRankingServiceBusinessArticle() {
  const faq = googleMapsRankingServiceBusinessFaq

  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        The thing most service operators believe about{' '}
        <a
          href={REF.googleBusiness}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Google Maps
        </a>{' '}
        rankings is wrong in a costly way: they optimise mid-tier signals while the strongest pack drivers stay untouched.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        Conventional advice stacks up reviews, posts, photos, and reply discipline. None of that is bad. Reviews still matter:{' '}
        <a
          href={REF.brightLocalFactors}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          BrightLocal&apos;s read of the Whitespark 2026 Local Search Ranking Factors report
        </a>{' '}
        puts review signals near <strong className="text-ink">20%</strong> of local pack weight in their model. Meaningful, but not the whole board.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        The signal that tends to outrank reviews, your website, and raw citation hygiene in that same synthesis is your{' '}
        <strong className="text-ink">Google Business Profile primary category</strong>, the choice most teams set once and never stress-test against how buyers actually search.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        If you run a pest programme in Hamilton or any Ontario corridor and spent six months chasing stars while the pack barely moves, this piece is about the upstream levers you probably skipped.
      </p>

      <aside
        className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50"
        aria-labelledby="maps-faq-primary-heading"
      >
        <h2 id="maps-faq-primary-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {faq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{faq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Primary docs to bookmark:{' '}
          <a href={REF.brightLocalFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            BrightLocal ranking-factor primer
          </a>
          ,{' '}
          <a href={REF.whitespark2026} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            Whitespark 2026 methodology
          </a>
          .
        </p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">Why reviews are not usually the whole problem</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Reviews are loud. Customers mention them. Competitors flash counts. So effort piles into generation programmes, response cadences, and screenshot milestones.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Worth doing: BrightLocal notes{' '}
        <a href={REF.brightLocalFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          most consumers read reviews before picking a local provider
        </a>
        , and steady velocity often beats a stale mountain of older ratings.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The disconnect shows up when review counts look healthy yet Maps position stalls. In that situation the constraint is usually category precision, hour accuracy, or site structure tied to listed services, not another burst of five-star asks.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Need the full GBP stack, not one tactic in isolation?{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          Our services lane
        </Link>{' '}
        covers audits through execution for Ontario locals.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">
        Primary category: the factor most teams set once and forget
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        BrightLocal&apos;s analysis emphasises that{' '}
        <a href={REF.brightLocalFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          primary GBP category
        </a>{' '}
        carries outsized weight inside the wider GBP bucket because it answers Google&apos;s first relevance question: what kind of business is this?
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Operators often pick the label that matches internal jargon, not the phrasing buyers type when money is on the line. A pest operator might default to the broadest &ldquo;pest control service&rdquo; label while high-intent searches centre on bed bugs, wasps, or seasonal rodents. Category mismatch equals invisible demand.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Practical fix: take the three to five queries you want to own, inspect which categories the listings already winning those packs selected, then reconcile against Google&apos;s category list for a tighter fit before you launch another review sprint.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        On recent GBP audits for Ontario service trades, we routinely see profiles stuck on the widest category while competitors hug intent-specific labels. That behaviour reads as a catalogue problem, not a reputation problem.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">
        Business hours: ranking relevance most audits skip
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <a href={REF.whitespark2026} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Whitespark&apos;s 2026 factor survey
        </a>{' '}
        highlights whether you appear open at query time as a top-five individual influence inside the pack, with practitioners noting ranking softness as posted closing windows approach.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Outdated Saturday toggles, forgotten holiday overrides, or optimistic &ldquo;always open&rdquo; guesses quietly punish relevance when someone searches late evening or weekend mornings. Accurate schedules align customer trust with Google&apos;s temporal signals.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Fixing hours is usually minutes inside GBP: reconcile each weekday, mirror seasonal shifts, and accept Google&apos;s verification prompts when they appear after statutory breaks.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">
        Per-service pages: where your site proves what GBP promises
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Whitespark&apos;s commentary repeatedly stresses pairing granular GBP services with{' '}
        <strong className="text-ink">distinct website URLs per offer</strong>, not one endless services blob. Google cross-checks whether the site reinforces each listed line item with crawlable detail.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        One catch-all page rarely carries enough topical depth for bed bug treatments, wildlife exclusions, or emergency drainage calls simultaneously. Dedicated URLs carry crawl clarity for Maps and give assistants quotable paragraphs for answer-engine surfaces.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Building that architecture is standard in how we scope{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          SEO and AEO engagements
        </Link>{' '}
        so each service line compounds locally and in AI summaries.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">What coordinated optimisation actually looks like</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We helped{' '}
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Insectica Pest Control
        </Link>{' '}
        climb from roughly Maps slot fifty into the top five inside four months by sequencing structural GBP fixes first (category alignment, hour fidelity, citation hygiene), then layering measured review velocity and supporting content per neighbourhood.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Category and citation adjustments showed lift inside weeks; reviews compounded afterwards. Teams invert that order daily: polish social proof before fixing catalogue fundamentals, then wonder why pack membership stalls.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        If Maps visibility is off versus expectation across Ontario, start with an audit aimed at category fit, hour accuracy, and service-page parity before buying another reputation widget.
      </p>
      <p className="mt-6">
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink"
        >
          Book a GBP audit &rarr;
        </Link>
      </p>

      <div className="mt-16 p-8 md:p-10 bg-ink text-cream border border-ink/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Google Business Profile</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">
          Book a free GBP audit with Stratezik
        </h2>
        <p className="mt-5 text-cream/85 leading-relaxed">
          <Link to="/" className="text-gold hover:text-cream underline underline-offset-4">
            Stratezik
          </Link>{' '}
          coordinates Maps programmes for Ontario service brands: category alignment, hour fidelity, citations, review cadence, and per-service site depth so listings match how buyers actually search.
        </p>
        <p className="mt-4 text-cream/85 leading-relaxed">
          The audit spells out what is misaligned today and what to fix first for your trade and geography.
        </p>
        <Link
          to="/#contact"
          data-cursor="cta"
          data-cursor-text="Open"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          Book your free GBP audit
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
        <p className="mt-6 text-sm text-cream/60">
          Email{' '}
          <BlogStratezikContactLink className="text-gold hover:text-cream">contact form</BlogStratezikContactLink>
          {' · '}
          <Link to="/careers" className="text-gold hover:text-cream underline">
            Careers
          </Link>
        </p>
      </div>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="maps-article-faq-heading">
        <h2 id="maps-article-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {faq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="maps-sources-heading">
        <h2 id="maps-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            BrightLocal:{' '}
            <a href={REF.brightLocalFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Google&apos;s local algorithm and ranking factors
            </a>
          </li>
          <li>
            Whitespark:{' '}
            <a href={REF.whitespark2026} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Local Search Ranking Factors 2026
            </a>
          </li>
          <li>
            Harmo:{' '}
            <a href={REF.harmoOverview} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Whitespark 2026 overview
            </a>
          </li>
          <li>
            Stratezik case study:{' '}
            <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood hover:text-ink underline">
              Insectica GTA scaling breakdown
            </Link>
          </li>
          <li>
            <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
              Stratezik sitemap
            </a>
          </li>
          <li>
            <Link to="/services/google-business-profile" className="text-oxblood hover:text-ink underline">
              Google Business Profile management
            </Link>
          </li>
        </ul>
      </section>

      <BlogAuthorSignoff />
    </div>
  )
}
