import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { Link } from 'react-router-dom'
import GetFound2026SeriesNav from './GetFound2026SeriesNav'
import { getFound2026Part2SeoFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

const REF = {
  oppalertsLlmFactors: 'https://oppalerts.com/LLM-Ranking-Factors/',
  sejGoogleIoPulse: 'https://www.searchenginejournal.com/seo-pulse-google-launches-core-update-amid-i-o-ai-search-overhaul/575676/',
  googleStructuredIntro: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
}

export default function GetFound2026Part2SeoArticle() {
  const faq = getFound2026Part2SeoFaq

  return (
    <div className="max-w-[720px] mx-auto">
      <GetFound2026SeriesNav currentSlug="get-found-2026-seo-organic-search" variant="top" />

      <p className="lead text-lg text-ink-700 leading-relaxed">
        SEO is still the bedrock assistants lean on even when conversational surfaces steal attention. Keyword fanout catches how people{' '}
        actually ask for help. On-page optimisation encodes relevance. Technical work keeps crawlers trustworthy. Earned backlinks
        certify authority. Clear indexing rituals close the loop. Skip one layer and downstream channels inflate costs: paid clicks,
        map packs, and AI citations compound only when foundational search signals cooperate.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This{' '}
        <strong className="text-ink">Part 2</strong>{' '}
        assumes{' '}
        <Link to="/blog/get-found-2026-brand-positioning" className="text-oxblood underline underline-offset-2">
          Part 1: Brand &amp; Positioning
        </Link>{' '}
        tightened who you serve and why you win, because fanout prioritisation and onsite copy sharpen when differentiation is blunt.
        Upstream conversational visibility receives its dedicated pass in{' '}
        <Link to="/blog/get-found-2026-ai-search-visibility" className="text-oxblood underline underline-offset-2">
          Part 3: AI Search Visibility
        </Link>{' '}
        after search authority and extractable pages exist.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="gf2026-seo-feat-heading">
        <h2 id="gf2026-seo-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {faq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{faq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Correlation trackers such as{' '}
          <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            OppAlerts&apos; LLM factor study
          </a>{' '}
          still rank classic domain strength near the dominant tier alongside snippet visibility traits. Maintain organic muscle while{' '}
          <Link to="/blog/get-found-2026-ai-search-visibility" className="text-oxblood underline underline-offset-2">
            layering Part 3
          </Link>
          .
        </p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Macro context: search platforms still marry classic craft with conversational layers
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Industry reporting tracked in{' '}
        <a href={REF.sejGoogleIoPulse} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Search Engine Journal&apos;s Google I/O era SEO Pulse coverage
        </a>{' '}
        describes longer conversational prompts, multimodal follow-ups, and AI Mode expansion. Google&apos;s outward story still frames
        generative optimisation as an extension of crawlability, expertise, truthful structure, and authority signals marketers already owe
        shoppers. Interpretation costs matter: sloppy technical roots surface faster when models summarise instead of paging through noisy
        URLs.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Read that macro beat as reinforcing order of operations from Part 1: precise narrative, disciplined fanout mapped to intents, onsite
        clarity robots can summarise, backlinks that certify expertise, instrumentation proving pages enter the corpus you expect before
        you chase assistant-specific tactics.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Five SEO steps that ladder into Part 3</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Use the roadmap below sequentially when practical. Accelerate later steps only if earlier layers already pass blunt audits (
        crawler access, index coverage, purposeful internal links, purposeful schema where truthful).
      </p>

      <h3 className="mt-10 font-display text-2xl text-ink tracking-tight">1. Keyword fanout anchored in positioning</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Branch every hero service into the questions GTA buyers articulate: neighbourhoods, qualifiers (same-day, commercial, multilingual),
        infestation species, strata versus residential, permitting edge cases. Map head, torso, tail groups to dedicated URLs or purposeful
        sections so editors stop stuffing unrelated intents into thin city stubs. Tie fanout artefacts to GBP services and FAQs so parity
        exists between listings and onsite proof.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Longer conversational queries mean winnable specificity often hides downstream of blunt category terms competitors overbid.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">2. On-page optimisation with operator truth</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Ship answer-first introductions, logically nested headings, scannable bullets, truthful comparison tables where allowed, FAQs that
        mirror dispatch scripts, contextual internal links bridging related services. Mention proof from Part 1 (certifications,
        neighbourhoods served, SLA language) verbatim so summaries cannot flatten you into generics. Pair persuasive copy with machine
        readability using{' '}
        <a
          href={REF.googleStructuredIntro}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          structured data primitives Google publishes
        </a>{' '}
        wherever schema honestly describes offerings.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">3. Technical foundation (speed, crawl, schema validity)</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Prioritise mobile Largest Contentful Paint discipline, prudent JavaScript hydration, HTTPS consistency, canonical hygiene, purposeful
        XML sitemaps, redirect chains trimmed, orphaned money pages surfaced through internal links and navigation. Confirm AI-oriented
        crawlers remain welcome unless you consciously exclude them as a policy stance. Structured data validates: invalid JSON-LD sabotages
        rich results trust.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Technical debt taxes both classic rankings and conversational extraction because brittle HTML yields brittle summaries.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">4. Backlinks as corroborative authority</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Pursue backlinks that testify to competence: credible trade journalism, municipality resources, strata associations you educate,
        local sponsorships paired with substantive write-ups (not naked badge spam). Mention unique data you can defend because narrative
        assets attract editorial citation more reliably than interchangeable vendor directories.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        OppAlerts-style correlation ladders still highlight domain-level signals as dominant tiers; backlinks remain the slow compounding{' '}
        layer that distinguishes operators who plateau from operators who widen moats responsibly.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">5. Indexing discipline and measurable feedback</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Monitor Search Console coverage, inspect URL indexing states, reconcile soft 404s, fix duplicate parameter cruft. Schedule content
        refresh cadences for pages whose queries drift because AI Mode phrasing evolves seasonally or after weather events spike demand.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Watch impression growth per fanout cohort, not vanity rank checks alone. Operational SEO teams pair rankings with attributable call
        and form lift so leadership sees revenue impact.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Operational proof beats theory</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        See how combined disciplined paid structure plus organic groundwork lifted a GTA operator in{' '}
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Stratezik&apos;s Insectica case study
        </Link>
        . The playbook emphasises how technical plus content compounding interacted with auctions: your vertical may diverge tactically yet
        the layering logic holds.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Partnering with Stratezik</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We sequence technical remediation, topical authority clusters, GBP alignment, instrumentation, assistant audits, performance media as
        one accountable programme instead of departmental silos. Use our{' '}
        <BlogStratezikContactLink>contact form</BlogStratezikContactLink> for a GTA audit that aligns fanout, crawl health,
        backlinks, indexing, then hands off cleanly to{' '}
        <Link to="/blog/get-found-2026-ai-search-visibility" className="text-oxblood underline underline-offset-2">
          AI search optimisation
        </Link>
        .
      </p>
      <BlogAuthorSignoff />

      <GetFound2026SeriesNav currentSlug="get-found-2026-seo-organic-search" variant="bottom" />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf2026-seo-faq-heading">
        <h2 id="gf2026-seo-faq-heading" className="font-display text-display-3 text-ink">
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

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf2026-seo-sources-heading">
        <h2 id="gf2026-seo-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            OppAlerts:{' '}
            <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              LLM ranking factors study
            </a>
          </li>
          <li>
            Search Engine Journal:{' '}
            <a href={REF.sejGoogleIoPulse} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              SEO Pulse (Google AI search overhaul context)
            </a>
          </li>
          <li>
            Google Search Central:{' '}
            <a
              href={REF.googleStructuredIntro}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Structured data introduction
            </a>
          </li>
          <li>
            <Link to="/blog/get-found-2026-brand-positioning" className="text-oxblood hover:text-ink underline">
              Stratezik: Part 1 (Brand &amp; Positioning)
            </Link>
          </li>
          <li>
            <Link to="/blog/get-found-2026-ai-search-visibility" className="text-oxblood hover:text-ink underline">
              Stratezik: Part 3 (AI Search Visibility)
            </Link>
          </li>
          <li>
            <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood hover:text-ink underline">
              Stratezik: Insectica case study
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
