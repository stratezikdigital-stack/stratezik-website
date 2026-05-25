import { Link } from 'react-router-dom'
import { getFound2026Part3AiFaq } from './postFaqs'
import GetFound2026SeriesNav from './GetFound2026SeriesNav'

const SITE = 'https://www.stratezik.com'

const REF = {
  sociNlraIVisibility:
    'https://natlawreview.com/press-releases/ai-search-recommends-only-12-local-businesses-rest-are-invisible',
  oppalertsLlmFactors: 'https://oppalerts.com/LLM-Ranking-Factors/',
  sejAiModePulse: 'https://www.searchenginejournal.com/seo-pulse-google-launches-core-update-amid-i-o-ai-search-overhaul/575676/',
  sejLocalAeoBrief: 'https://www.searchenginejournal.com/webinar-lp-local-aeo-best-practices-for-small-businesses-in-2026/',
  perplexity: 'https://www.perplexity.ai',
}

export default function GetFound2026Part3AiArticle() {
  const currentSlug = 'get-found-2026-ai-search-visibility'

  return (
    <div className="max-w-[720px] mx-auto">
      <GetFound2026SeriesNav currentSlug={currentSlug} variant="top" />

      <p className="lead text-lg text-ink-700 leading-relaxed">
        Coverage of{' '}
        <a
          href={REF.sociNlraIVisibility}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          SOCi&apos;s Local Visibility Index (via National Law Review)
        </a>{' '}
        keeps underscoring the same inconvenient picture: conversational discovery highlights a razor-thin set of entities.
        Assistants behave less like directories and more like picky editors summarising what looks verifiable across the web.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This article is <span className="font-medium text-ink">Part 3</span> of the five-part pillar. Readers who already closed{' '}
        <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood underline underline-offset-2">
          Part 2: SEO foundations
        </Link>{' '}
        move faster because authority and crawl discipline stay coupled. Tactical depth also lives in our{' '}
        <Link to="/blog/get-recommended-by-chatgpt-playbook" className="text-oxblood underline underline-offset-2">
          standalone ChatGPT playbook
        </Link>
        . After citations feel stable, graduate to{' '}
        <Link to="/blog/get-found-2026-content-strategy" className="text-oxblood underline underline-offset-2">
          Part 4: content strategy
        </Link>
        {' '}so proof turns into reservoirs you can remix everywhere.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="gf-part3-feat-heading">
        <h2 id="gf-part3-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {getFound2026Part3AiFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{getFound2026Part3AiFaq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Next stop after this layer:&nbsp;
          <Link to="/blog/get-found-2026-content-strategy" className="text-oxblood underline underline-offset-2">
            Part 4: content engines
          </Link>
          , where crisp answers compound into repeatable demand.
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">Answer engine optimisation, citations, and corroboration</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Think of citations as receipts. Models pull corroborative spans from crawlable surfaces, corroborative listings,
        and reviews journalists would still classify as earnest. OppAlerts synthesis work such as{' '}
        <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          their LLM ranking factor survey
        </a>{' '}
        keeps placing classic discovery authority beside snippet visibility rather than pretending you can brute-force novelty
        slugs alone.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Your job mirrors journalism: decisive answer first, nuanced proof second, unmistakable identifiers third. Structured
        data is not lipstick; it is how machines label who you serve, where labour happens, and which services genuinely differ
        from your neighbour.&nbsp;
        <Link to="/blog/get-recommended-by-chatgpt-playbook" className="text-oxblood underline underline-offset-2">
          The playbook
        </Link>{' '}
        walks granular schema choreography if you crave every checkbox.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Fanout captures how buyers phrase problems</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Keyword fanout (see{' '}
        <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood underline underline-offset-2">
          Part 2
        </Link>
        ) is even more decisive when conversational prompts lengthen. One head term hides dozens of humane question variants:
        timelines, neighbourhoods, exclusions, urgency, permitting, insurance. Bake those branches inside purpose-built FAQs,
        standalone service passages, or short explainers assistants can summarise without hallucinating blanks.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        When you omit the branch, rivals who documented it politely earn the excerpt even if their trucks never rolled through
        your postal code yesterday.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Schema, HTML clarity, and crawler hospitality</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Valid JSON-LD, stable entity naming, truthful hours, coherent NAP footprints, HTTPS, and disciplined heading hierarchy keep
        both Googlebot and GPT-style fetchers oriented. OppAlerts reinforces that blocking or fragmenting crawler access wastes
        the same effort you sank into persuasive copy.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Pair documentation with quarterly checks on robots directives, CDN firewalls, and WordPress defender plugins hiding entire
        template trees. If bots cannot faithfully snapshot HTML, conversational engines cannot ethically cite what they never saw.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Share of voice when summaries replace blue links</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Run a repeatable prompt backlog monthly: same verbs, neighbourhoods, SKU names, qualifiers. Capture whether you appear by
        name, as a tertiary mention, or not at all, then stack results against deliberate competitors. Automated dashboards lag;
        spreadsheets with screenshots age better until vendors normalise transcripts.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Layer branded search deltas and contact-form conversion trends to catch halo lift when mentions happen offsite but never
        click through a classic SERP. Messy-but-consistent notebooks beat hallucinated KPI precision.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">ChatGPT, Perplexity, and Gemini: three habits worth tracking</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Assistants converge on corroborated facts yet diverge on retrieval cadence, sourcing etiquette, and how aggressively they
        blend live versus cached corpora.&nbsp;
        <a href={REF.perplexity} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Perplexity
        </a>{' '}
        habitually cites browse-first references; ChatGPT product surfaces blend tool calls and corpus memory depending on SKU;
        Google Gemini ties tightly into Google-mediated experiences described in&nbsp;
        <a href={REF.sejAiModePulse} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Search Engine Journal&apos;s AI Mode coverage
        </a>
        . Treat each as a stakeholder with different citation vanity: none owe you symmetry.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Keep experiments ethical: scripted buyer language, factual claims you can defend, refusal to spoof competitors. Credibility,
        once torched publicly, metastasizes across models faster than apologies.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Partnering with Stratezik</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We marry assistant audits with schema implementation, GBP depth, and the paid overlays that amplify proof once copy is
        defensible.&nbsp;
        <a href="mailto:dave@stratezik.com?subject=AI%20search%20visibility%20audit" className="text-oxblood underline underline-offset-2">
          dave@stratezik.com
        </a>{' '}
        or{' '}
        <Link to="/#contact" className="text-oxblood underline underline-offset-2">
          the homepage contact lane
        </Link>{' '}
        both reach us quickly.
      </p>
      <p className="mt-10 text-ink-700 leading-relaxed">
        <strong className="text-ink">Dave</strong>
        <br />
        Stratezik · 2466 Eglinton Ave E, Toronto ON M1K 5J8 ·{' '}
        <a href="mailto:dave@stratezik.com" className="text-oxblood underline underline-offset-2">
          dave@stratezik.com
        </a>
      </p>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf-part3-faq-heading">
        <h2 id="gf-part3-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {getFound2026Part3AiFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gf-part3-sources-heading">
        <h2 id="gf-part3-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            National Law Review / SOCi:{' '}
            <a href={REF.sociNlraIVisibility} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI local visibility index coverage
            </a>
          </li>
          <li>
            OppAlerts:{' '}
            <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              LLM ranking factors overview
            </a>
          </li>
          <li>
            Search Engine Journal:{' '}
            <a href={REF.sejAiModePulse} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Mode / macro search pulse recap
            </a>
          </li>
          <li>
            Search Engine Journal:{' '}
            <a href={REF.sejLocalAeoBrief} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Local AEO practices briefing entry point
            </a>
          </li>
          <li>
            <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
              Stratezik XML sitemap
            </a>
          </li>
        </ul>
      </section>

      <GetFound2026SeriesNav currentSlug={currentSlug} variant="bottom" />
    </div>
  )
}
