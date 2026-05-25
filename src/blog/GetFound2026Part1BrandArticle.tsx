import { Link } from 'react-router-dom'
import GetFound2026SeriesNav from './GetFound2026SeriesNav'
import { getFound2026Part1BrandFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

const REF = {
  googleHelpfulContent: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
  schemaOrganization: 'https://schema.org/Organization',
}

export default function GetFound2026Part1BrandArticle() {
  const faq = getFound2026Part1BrandFaq

  return (
    <div className="max-w-[720px] mx-auto">
      <GetFound2026SeriesNav currentSlug="get-found-2026-brand-positioning" variant="top" />

      <p className="lead text-lg text-ink-700 leading-relaxed">
        Before you chase rankings, citations, or ad auctions, clarity wins. Customers do not memorise taglines until they{' '}
        <em className="not-italic text-ink font-medium">experience</em> a consistent promise: what you solve, who it is for, and why
        you deserve the trip. Positioning locks that logic. Voice, visuals, reputation, and trust signals{' '}
        <span className="italic">carry</span> it into discovery and conversion. Weak foundations inflate media costs forever.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This is{' '}
        <strong className="text-ink">Part 1: Brand & Positioning</strong> in{' '}
        <span className="text-ink">How Businesses Get Found and Grow in 2026</span>. Next,{' '}
        <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood underline underline-offset-2">
          Part 2: SEO & Organic Search
        </Link>{' '}
        turns intentional positioning into search demand because intent strings and onsite structure lift every channel afterward,
        including answer engine optimisation. If you prefer the conversational layer first, skim our{' '}
        <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
          Toronto answer engine optimisation explainer
        </Link>{' '}
        after you tighten the premise below so models inherit a sharper story than your competitors guessed.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="gf2026-brand-feat-heading">
        <h2 id="gf2026-brand-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {faq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{faq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          If paid discovery is urgent while you tighten narrative, pairing media with GBP depth still works. Reach us via{' '}
          <Link to="/#contact" className="text-oxblood underline underline-offset-2">
            Stratezik contact
          </Link>{' '}
          for a GTA programme that aligns spend with the storyline you intend to compound.
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">Foundation: positioning before tactics</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Positioning chooses the slice of the market where you refuse to compromise. Pick the buyer tension you resolve best, the pricing
        band that matches competence, proof you can replay, then commit in copy, onboarding, receipts, uniforms, invoicing descriptors,
        and recruiter briefs alike. Tactical teams optimising channels without those guardrails optimise noise: every channel amplifies{' '}
        <span className="italic">something</span>, so tighten the premise first.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Translate positioning into observable claims prospective customers verify in minutes (service scope, neighbourhoods, licences,
        response windows, escalation paths). When Google evaluates{' '}
        <a
          href={REF.googleHelpfulContent}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          whether content helps people accomplish goals
        </a>
        , generic platitudes wilt. Narrow truth compound better than inflated superlatives.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">The differentiation competitor test</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Draft a headline promise. Ask your smartest rival to steal it verbatim: do they blush? Iterate until refusal is honest. Survivors
        usually originate in delivery reality: dispatch speed, speciality species, multilingual intake, strata documentation fluency,
        forensic reporting, bundled maintenance. Celebrate the inconvenient detail competitors skip because documenting it burdens their
        margin story.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Document proof points as modules you can splice into webpages, FAQs, GBP services, recruiter posts, onboarding emails, estimator
        scripts. Consistency across surfaces is easier when each module originates from one{' '}
        <span className="italic">source of positioning truth</span> your team trusts.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Voice: how differentiation sounds</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Voice expresses posture: reassuring after storms, meticulous for strata boards, kinetic for nightlife venues. Decide plain-language
        ranges (sentence length, humour tolerance, jargon ceiling) and forbid drift between crisis pages and evergreen guides. Editors
        who enforce voice protect SEO and paid creative from sounding like stitched vendor templates.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Capture micro phrases operators say on calls verbatim. Bots and humans excerpt natural speech faster than sterile marketing fluff.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Visual identity as operational shorthand</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Visual identity stretches beyond logos: colour restraint on trucks, estimator slide decks, annotated photo styles, infographic
        grids. Coherent visuals shorten recognition on Maps photos, carousel ads, recruiter reels, quoting PDF headers. Decide rules once,
        reuse templates, forbid one-off Illustrator experiments that shred recall.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Mirror critical trust badges (association memberships, licences, insurer partners) visually where policies require them anyway,
        not buried on an orphan compliance page nobody links.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Reputation as a live operating system</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Reputation is iterative: request reviews ethically, acknowledge criticism with accountable fixes, escalate offline when threads
        need privacy. Scheduling reputation work beats quarterly scrambles triggered by outliers. Signals influence both human comparison
        shopping and model summaries that summarise sentiment across sources.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Spotlight representative jobs (photos, timelines, outcomes) wherever policy allows because narrative proof outperforms star
        counts alone on higher-ticket buys.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Trust signals you can engineer</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Trust layering stacks evidence: licences, insurer letters, memberships, tenure stats, dispatcher availability windows, SLA
        language, technician certifications, bilingual intake, escalation phone trees documented on site. Structured identity via{' '}
        <a href={REF.schemaOrganization} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Organization schema markup
        </a>{' '}
        reinforces verifiable linkage between legal entity, GBP, domain, email domains, branded social handles, directories, editorial
        quotes. Disarray across those references taxes both conversions and corroborative retrieval later.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Publish truthful policies upfront (warranties, reservice terms, cancellations) instead of trapping prospects on calls. Transparency
        is not soft brand; it trims objection handling labour and aligns sales with delivery.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Partnering with Stratezik</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We align positioning, onsite architecture, GBP, organic authority, assistants, then paid amplification for GTA operators who want
        one accountable programme. Ping{' '}
        <a
          href="mailto:dave@stratezik.com?subject=Get%20Found%202026%20brand%20foundation"
          className="text-oxblood underline underline-offset-2"
        >
          dave@stratezik.com
        </a>{' '}
        or open{' '}
        <Link to="/#contact" className="text-oxblood underline underline-offset-2">
          our homepage contact lane
        </Link>{' '}
        once your differentiation test is drafted; we tighten language, rollout templates, then hand off cleanly to technical SEO work.
      </p>
      <p className="mt-10 text-ink-700 leading-relaxed">
        Ready for mechanics? Continue to{' '}
        <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood underline underline-offset-2">
          Part 2: SEO & Organic Search
        </Link>
        .
      </p>
      <p className="mt-10 text-ink-700 leading-relaxed">
        <strong className="text-ink">Dave</strong>
        <br />
        Stratezik · 2466 Eglinton Ave E, Toronto ON M1K 5J8 ·{' '}
        <a href="mailto:dave@stratezik.com" className="text-oxblood underline underline-offset-2">
          dave@stratezik.com
        </a>
      </p>

      <GetFound2026SeriesNav currentSlug="get-found-2026-brand-positioning" variant="bottom" />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf2026-brand-faq-heading">
        <h2 id="gf2026-brand-faq-heading" className="font-display text-display-3 text-ink">
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

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf2026-brand-sources-heading">
        <h2 id="gf2026-brand-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            Google Search Central:{' '}
            <a href={REF.googleHelpfulContent} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Creating helpful content
            </a>
          </li>
          <li>
            Schema.org:{' '}
            <a href={REF.schemaOrganization} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Organization type reference
            </a>
          </li>
          <li>
            <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood hover:text-ink underline">
              Stratezik: Part 2 (SEO &amp; Organic Search)
            </Link>
          </li>
          <li>
            <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
              Stratezik XML sitemap
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
