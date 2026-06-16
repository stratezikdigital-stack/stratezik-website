import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { AeoCheckerCta } from '../components/AeoCheckerCta'
import { Link } from 'react-router-dom'
import { chatgptRecommendationPlaybookFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

/** Research + citations for the playbook */
const REF = {
  sociAiLocalVisibility: 'https://natlawreview.com/press-releases/ai-search-recommends-only-12-local-businesses-rest-are-invisible',
  yextCitationBlog: 'https://www.yext.com/blog/ai-citations-86-percent-of-sources-are-brand-managed',
  profoundCitationMix: 'https://www.tryprofound.com/blog/ai-platform-citation-patterns',
  perplexityApp: 'https://www.perplexity.ai',
  oppalertsLlmFactors: 'https://oppalerts.com/LLM-Ranking-Factors/',
  sejGoogleIoPulse: 'https://www.searchenginejournal.com/seo-pulse-google-launches-core-update-amid-i-o-ai-search-overhaul/575676/',
  sejLocalAeoWebinar: 'https://www.searchenginejournal.com/webinar-lp-local-aeo-best-practices-for-small-businesses-in-2026/',
  almAeoPlaybook2026: 'https://almcorp.com/blog/answer-engine-optimization-2026/',
  hubspotAeoTrends: 'https://blog.hubspot.com/marketing/answer-engine-optimization-trends',
  niseusChatgptGuide: 'https://niseus.com/en/blog/how-to-get-recommended-by-chatgpt/',
  wpRidersSchemaAi: 'https://wpriders.com/schema-markup-for-ai-search-types-that-get-you-cited/',
  findskillAudit: 'https://findskill.ai/blog/get-found-in-chatgpt-small-business/',
  brightEdgeAiInsights: 'https://www.brightedge.com/resources/weekly-ai-search-insights/ai-overviews-one-year-presence-size-citing',
  portfolioFramework: 'https://www.linkedin.com/in/akaushik/',
  googleStructuredIntro: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  schemaLocalBusiness: 'https://schema.org/LocalBusiness',
}

export default function GetRecommendedByChatGPTPlaybookArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        According to SOCi&apos;s{' '}
        <a
          href={REF.sociAiLocalVisibility}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          2026 Local Visibility Index reporting
        </a>
        , AI-mediated search surfaces reportedly recommend roughly{' '}
        <strong className="text-ink">1.2%</strong> of local business locations while the remainder never receive a
        direct recommendation-style mention in that framing. Translation: assistants are choosing a microscopic slice of
        brands when someone asks conversational questions instead of paging through blue links.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This is a playbook, not philosophy. Deep background sits in our{' '}
        <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
          answer engine optimisation explainer for Toronto businesses
        </Link>
        . Here we assume you already believe assistants matter and want the operating steps: how citations form, what to
        implement, how to sanity-check outcomes, and what honest limits look like.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="rec-feat-heading">
        <h2 id="rec-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {chatgptRecommendationPlaybookFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{chatgptRecommendationPlaybookFaq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          For paid placements versus organic mentions, compare our{' '}
          <Link to="/blog/chatgpt-ads-2026-guide" className="text-oxblood underline underline-offset-2">
            ChatGPT Ads guide
          </Link>
          . Organic recommendations still come down to crawlability, structure, corroboration, and authority proxies.
        </p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">A different scoreboard than Google</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Maps pack dominance does not promise assistant mentions. The inverse also happens: middling SERP placement with
        surgically precise service copy can outperform a cluttered category leader inside tools that summarise instead of
        listing ten URLs. Engines weight extractability, corroboration, and relevance to the verbatim question users now
        type or speak aloud.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        If bulky competitors outspent you on classic SEO moats, AI discovery is comparatively open: fewer practitioners have
        shipped schema, conversational service depth, or reputable third-party footprints intentionally. Territory you
        claim now compounds while attention is still fractured between legacy dashboards and conversational surfaces.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">How ChatGPT-style systems shortlist businesses</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        At a pragmatic level models stitch answers from layered sources such as crawlable websites, structured listings,
        review ecosystems, and open-web discussion venues. Vendor research underscores how much cites trace to marketer
        stewarded properties:{' '}
        <a href={REF.yextCitationBlog} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Yext&apos;s public write-up on AI citations
        </a>{' '}
        attributes roughly forty-four percent of studied citations to first-party websites and forty-two percent to
        manageable listings with the remainder split among reviews or social influences and uncontrollable publishers.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Independent breakdowns such as{' '}
        <a href={REF.profoundCitationMix} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Profound&apos;s summarised platform citation mixes
        </a>{' '}
        show models diverging dramatically: conversational engines that lean on live retrieval (for example Perplexity in
        their sample window) overweight community publishers like Reddit compared with models that cite Wikipedia or SERP
        snippets more aggressively. Assume your category may not match aggregate charts. Always corroborate with your own
        question list audit.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Three tests decide whether your brand stays in the invisible majority: readable facts about what you deliver and
        where, independent confirmation that the entity is credible, and direct alignment with how the shopper phrased the
        assistance request.
      </p>

      <figure className="mt-10">
        <img
          src="/illustrations/chatgpt-local-recommendation-signals.svg"
          width={620}
          height={220}
          alt="Diagram: three columns for first-party site signals, corroboration, and query fit"
          className="w-full border border-ink/10 bg-cream-50"
          loading="lazy"
        />
        <figcaption className="mt-3 text-sm text-ink-600 leading-relaxed">
          Operational checklist used internally when diagnosing why a GTA operator is omitted from conversational answers.
        </figcaption>
      </figure>

      <h2 className="mt-16 font-display text-display-3 text-ink">What correlation studies imply</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          OppAlerts&apos; multi-industry study
        </a>{' '}
        clusters signals correlated with appearing inside ChatGPT-derived recommendations: domain-level search authority,
        solid ordinary rankings, and healthy backlink profiles remain top-tier predictors alongside snippet visibility.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Signals people label &quot;AEO-only&quot;, such as presence inside Common Crawl corpora or structured entities,
        behave as amplifiers rather than substitutions for legitimacy in traditional search ecosystems. OppAlerts stresses
        industry-specific nuance when applying those tiers mechanically.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        For ongoing macro tracking complementary to OppAlerts,&nbsp;
        <a href={REF.brightEdgeAiInsights} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          BrightEdge&apos;s AI search trackers
        </a>{' '}
        remain a useful pulse on citation behaviour shifts inside Google-mediated answers.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Google&apos;s 2026 search reset and why AEO is still foundational SEO
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <a href={REF.sejGoogleIoPulse} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Search Engine Journal&apos;s coverage of Google&apos;s AI Mode expansion
        </a>{' '}
        underscores longer conversational prompts, multimodal inputs gaining share, and follow-up chatter climbing sharply.
        Google&apos;s public narrative continues to insist generative optimisation is an extension of core SEO craftsmanship,
        not an unrelated dark art: crawlability, truthful expertise, structured clarity, and backlink-worthy narratives still
        describe the sandbox.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Content must match how buyers phrase assistance today: granular intent strings such as{' '}
        <span className="italic">same-day wasp nest removal in Scarborough</span> outperform thin pages repeating a single city
        head term. Measurement lags surfaced through Search Console for AI-exclusive panels, reinforcing why manual auditing
        with consistent prompt banks matters.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Execution playbook</h2>

      <h3 className="mt-10 font-display text-2xl text-ink tracking-tight">1. Encode machine-readable identities</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Structured data communicates labelled facts{' '}
        <a href={REF.googleStructuredIntro} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Google outlines in its structured data primer
        </a>
        . Local programmes should prioritize{' '}
        <a href={REF.schemaLocalBusiness} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          LocalBusiness
        </a>
        , FAQPage payloads for repeatable Q&amp;A snippets, granular Service markup per offer, plus AggregateRating when
        data is truthful. Tactical walkthrough examples appear in guides from{' '}
        <a href={REF.wpRidersSchemaAi} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          WPRiders
        </a>{' '}
        and peers.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">2. Answer-first prose</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Lead paragraphs with decisive facts assistants can excerpt. Narrative warmup sentences that postpone the payoff
        increase the likelihood the crawler jumps to competitors who spoon-feed numbers upfront. Preserve nuance in
        paragraphs two and beyond once the succinct answer is nailed.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">3. Entity discipline</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Normalise naming, casing, incorporation suffixes, punctuation, addresses, and phone numbers everywhere they appear so
        graph-style systems reconcile a single coherent entity. Invest in substantive About narratives and, when warranted,
        reference-grade listings such as Wikidata for brands large enough to justify the maintenance burden.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">4. Earn corroborative mentions responsibly</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Thin single-domain footprints read suspicious. Pursue diligently completed profiles (Yelp, sector directories,
        Better Business Bureau when authentic), diversify fresh reviews ethically, participate helpfully wherever buyers
        already seek advice rather than astro-turfing threads. Fraudulent citation schemes age poorly.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">5. Local clarity beyond boilerplate swaps</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        GBP primary categories should mirror documented buyer language. Layer neighbourhood-specific narratives, transit cues,
        and distinct services per trade line instead of mechanically duplicated city stubs. Structural clarity powering Maps is
        the same lucidity conversational models extrapolate.&nbsp;
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Insectica&apos;s Toronto case study
        </Link>{' '}
        shows how combined paid plus organic groundwork benefitted discoverability broadly.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">6. Keep AI crawler paths open</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Audit robots directives, CDN firewalls, and WordPress plugins that auto-block GPTBot clones. Locked doors undo every
        copy investment. Combine this check with HTTPS health, crawl budget basics, and anything inhibiting faithful HTML
        snapshotting.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Publishing portfolio for citations</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Thin schema without substance loses to materially deep sites. Borrow the portfolio ordering Abhishek Kaushik surfaced
        (see{' '}
        <a href={REF.portfolioFramework} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          his LinkedIn profile for the originating framework cues
        </a>
        ) and adapt downward for local trades: exhaustive buying guides, schema-rich standalone service URLs, clustered
        conversational FAQs, trench commentary, credible origin narratives, procedural HowTo content, surfaced testimonials with
        review markup, transcripts of expert commentary, plus publishable operational statistics when accurate.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Start top-heavy on guides plus service granularity. Layer the remainder quarterly so each asset answers another latent
        question buyers pose to assistants.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Monthly audit routine</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Without a universal leaderboard export, reproducibility beats vibes. Maintain a numbered prompt backlog mirroring buyer
        language, run those prompts across ChatGPT,{' '}
        <a href={REF.perplexityApp} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Perplexity
        </a>
        , and Google&apos;s AI surfaces, screenshot or log outputs, annotate competitors, revise schema or narrative gaps, then re-run thirty days later. Expect stochastic drift as models refresh.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Supplement assistant checks with trending branded search volume analytics and uplift in tracked phone/email leads to
        catch zero-click halo effects.&nbsp;
        <a href={REF.findskillAudit} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          FindSkill&apos;s checklist-style audit article
        </a>{' '}
        offers additional lenses if you outsource portions of diligence.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Measurements when dashboards stay incomplete</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Track presence frequency on the fixed prompts, relativise share-of-voice against named rivals, monitor downstream branded
        demand. Untidy beats imaginary precision so long as the methodology stays consistent meeting to meeting.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">What honesty requires</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Nobody can guarantee permanent ordering inside generative summaries. Behaviour shifts abruptly. What you sell instead is
        compounding readiness: unmistakable structured identity, corroborative proof, ethically earned reputation, iterative
        content that tracks evolving question shapes, resilient crawl paths. Agencies promising instantaneous guaranteed mentions
        are misaligned with observable platform variance.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Seven-day starter checklist</h2>
      <ol className="mt-6 list-decimal pl-6 space-y-3 text-ink-700 leading-relaxed">
        <li>Ship LocalBusiness + FAQ schema on flagship URLs.</li>
        <li>Rewrite three hero service sections answer-first.</li>
        <li>Audit robots logs for AI crawler exclusions.</li>
        <li>Reconcile GBP and external listings for identical NAP data.</li>
        <li>Record baseline answers for ten customer questions across assistants.</li>
      </ol>

      <AeoCheckerCta
        variant="banner"
        source="blog-chatgpt-playbook"
        headline="Run the checklist against your live site"
        body="Our free AEO Readiness Checker scores crawler access, schema, answer-first copy, llms.txt, and more — benchmarked against 50 funded Toronto startups."
        className="mt-10"
      />
      <p className="mt-6 text-ink-700 leading-relaxed">
        Want hands-on help? Reach our{' '}
        <BlogStratezikContactLink className="text-oxblood underline underline-offset-2">contact form</BlogStratezikContactLink>{' '}
        for a conversational visibility audit keyed to real buyer prompts, or explore our{' '}
        <Link to="/services/seo-aeo/answer-engine-optimization" className="text-oxblood underline underline-offset-2">
          AEO service lane
        </Link>
        .
      </p>
      <BlogAuthorSignoff />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-rec-faq-heading">
        <h2 id="chatgpt-rec-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {chatgptRecommendationPlaybookFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-rec-sources-heading">
        <h2 id="chatgpt-rec-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            National Law Review:{' '}
            <a href={REF.sociAiLocalVisibility} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI search visibility index coverage
            </a>
          </li>
          <li>
            Yext:{' '}
            <a href={REF.yextCitationBlog} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Brand-managed citation research summary
            </a>
          </li>
          <li>
            Profound:{' '}
            <a href={REF.profoundCitationMix} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Platform citation mixes
            </a>
          </li>
          <li>
            OppAlerts:{' '}
            <a href={REF.oppalertsLlmFactors} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              LLM ranking factor study
            </a>
          </li>
          <li>
            Search Engine Journal:{' '}
            <a href={REF.sejGoogleIoPulse} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Mode / core update recap
            </a>
          </li>
          <li>
            Search Engine Journal:{' '}
            <a href={REF.sejLocalAeoWebinar} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Local AEO best practices briefing
            </a>
          </li>
          <li>
            ALM Corp:{' '}
            <a href={REF.almAeoPlaybook2026} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Answer engine optimisation playbook
            </a>
          </li>
          <li>
            HubSpot:{' '}
            <a href={REF.hubspotAeoTrends} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AEO trend overview
            </a>
          </li>
          <li>
            Niseus:{' '}
            <a href={REF.niseusChatgptGuide} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Long-form ChatGPT positioning guide
            </a>
          </li>
          <li>
            WPRiders:{' '}
            <a href={REF.wpRidersSchemaAi} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Schema markup for AI search
            </a>
          </li>
          <li>
            FindSkill.ai:{' '}
            <a href={REF.findskillAudit} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Local business audit perspective
            </a>
          </li>
          <li>
            BrightEdge:{' '}
            <a href={REF.brightEdgeAiInsights} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI citation research hub
            </a>
          </li>
          <li>
            Abhishek Kaushik (&quot;portfolio&quot; lineage):{' '}
            <a href={REF.portfolioFramework} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              LinkedIn reference
            </a>
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
