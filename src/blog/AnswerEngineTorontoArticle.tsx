import { Link } from 'react-router-dom'

const SITE = 'https://www.stratezik.com'

/** External research URLs — aligned with draft v2 JSON / markdown */
const REF = {
  brightEdge: 'https://www.brightedge.com/resources/weekly-ai-search-insights/ai-overviews-one-year-presence-size-citing',
  semrushStudy: 'https://www.semrush.com/blog/semrush-ai-overviews-study/',
  quickSeo: 'https://quickseo.ai/blog/google-ai-overviews-statistics-2026-60-data-points-every-seo-should-know',
  reuters2025: 'https://ruralindiaonline.org/en/library/resource/reuters-institute-digital-news-report-2025/',
  googleAioSite: 'https://developers.google.com/search/docs/appearance/ai-overviews-and-your-website',
  googleStructuredData: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  schemaLocal: 'https://schema.org/LocalBusiness',
  schemaFaq: 'https://schema.org/FAQPage',
  schemaService: 'https://schema.org/Service',
  chatgpt: 'https://chat.openai.com',
  perplexity: 'https://www.perplexity.ai',
  googleBusiness: 'https://business.google.com/',
}

/**
 * Answer Engine Optimisation for Toronto Businesses — v2 (draft 2026-05-03).
 * Internal targets use the live SPA; stratezik.ca service URLs from the ticket map here.
 */
export default function AnswerEngineTorontoArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        There is a number buried in{' '}
        <a
          href={REF.brightEdge}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          BrightEdge&apos;s 2026 AI search tracking
        </a>{' '}
        that changes how Toronto business owners should think about search:{' '}
        <strong className="text-ink">
          83% of the websites cited in Google&apos;s AI-generated answers do not rank in the organic top 10 for that
          same search.
        </strong>
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        Not 10%. Not 30%. Eighty-three. The businesses being recommended by AI tools are mostly not the ones that won the
        traditional SEO race. They are the ones that structured their content so AI systems can extract, parse, and trust
        it &mdash; regardless of where they sit on page one.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        For a plumber in Scarborough or a dentist in Etobicoke, that matters more than most ranking updates. The search
        position you have invested in does not automatically protect your visibility in AI search. They are{' '}
        <strong className="text-ink">two separate competitions</strong>, with different rules, and most Toronto small
        businesses are only playing one of them. This is the conversation around{' '}
        <strong className="text-ink font-medium">answer engine optimisation Toronto</strong> operators need to be having
        now &mdash; not a year from now.
      </p>

      <aside
        className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50"
        aria-labelledby="feat-answer-heading"
      >
        <h2 id="feat-answer-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          What is answer engine optimisation and how does it affect Toronto businesses?
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">
          Answer engine optimisation (AEO) is the practice of structuring your website&apos;s content so it gets cited
          inside AI-generated answers &mdash; in{' '}
          <a href={REF.chatgpt} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            ChatGPT
          </a>
          ,{' '}
          <a href={REF.perplexity} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            Perplexity
          </a>
          , and{' '}
          <a href={REF.googleAioSite} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            Google AI Overviews
          </a>
          . For Toronto businesses, that means showing up when a customer asks an AI tool to recommend a local service
          provider, before they ever open a map or traditional search results page.
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">How large is AI search in 2025 and 2026?</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Most operators underestimate how widespread AI-generated answers have become.{' '}
        <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          BrightEdge&apos;s early 2026 tracking
        </a>{' '}
        found Google AI Overviews in roughly <strong className="text-ink">48%</strong> of the queries they monitor
        &mdash; a <strong className="text-ink">58%</strong> year-over-year increase.{' '}
        <a href={REF.semrushStudy} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Semrush&apos;s AI Overviews impact study
        </a>
        , across <strong>10M+</strong> keywords, recorded <strong className="text-ink">15.69%</strong> prevalence, peaking
        at <strong className="text-ink">24.61%</strong> in July 2025.{' '}
        <a href={REF.quickSeo} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          QuickSEO&apos;s 2026 compilation
        </a>{' '}
        notes Google adjusting trigger thresholds through the year &mdash; which helps explain variance between vendors.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        BrightEdge skews toward commercial, intent-heavy queries (hire-someone searches). Semrush casts a wider net.
        For GTA service businesses, the BrightEdge framing is often closer to commercial reality. When an Overview
        fires, it is not a tiny widget: BrightEdge puts average AI Overview height around{' '}
        <strong className="text-ink">1,200 pixels</strong>, enough to push standard organic listings below the fold.{' '}
        <a href={REF.reuters2025} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Reuters Institute Digital News Report 2025
        </a>{' '}
        documents continued growth in AI-assisted information seeking globally, including Canada.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Explore how{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          Stratezik approaches SEO and answer-engine optimisation
        </Link>{' '}
        for Toronto-area businesses.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">
        The 83% gap &mdash; why your Google ranking doesn&apos;t protect you
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        BrightEdge&apos;s citation work implies roughly the inverse: only about{' '}
        <strong className="text-ink">17%</strong> of URLs cited in AI Overviews also rank in the organic top ten for that
        query. The rest surface on different merit &mdash; structure, direct answers, corroboration &mdash; not position
        alone.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The wrong takeaway is &ldquo;ignore SEO.&rdquo; The right one is that{' '}
        <strong className="text-ink">rank optimisation alone does not enter you in the citation race</strong>. Shared
        foundations (quality site, credible entity) help both; pure rank chasing leaves you exposed in the slice where 83%
        of citations sit outside the top ten.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Picture a competitor fourth for &ldquo;accountant Etobicoke&rdquo; who also answers &ldquo;what does a small
        business accountant do during tax season?&rdquo; plainly and structurally. They can win AI surfacing even when you
        rank higher head-to-head on generic terms.{' '}
        <a href={REF.googleAioSite} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Google Search Central
        </a>{' '}
        stresses citations relate to content quality and structure, not ranking position alone.
      </p>
      <p className="mt-5 text-sm text-ink-600">
        See also:{' '}
        <a href={REF.semrushStudy} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
          Semrush methodology
        </a>{' '}
        ·{' '}
        <a href={REF.quickSeo} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
          QuickSEO data points round-up
        </a>
        .
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">A real Toronto example</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Two Scarborough plumbers; both seasoned; both online. One leads generic rankings.{' '}
        <strong className="text-ink">Firm A</strong> offers a Services blurb and a phone number.{' '}
        <strong className="text-ink">Firm B</strong> publishes &ldquo;What to do if your pipes freeze in a Toronto
        winter&rdquo; &mdash; symptoms, when to call overnight vs wait, what a visit entails.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        When someone asks an AI &ldquo;what do I do if my pipes freeze?&rdquo;, Firm B supplies extractable sentences.
        Firm A does not. That is AEO: usefulness for a specific person, structured so models can quote it confidently.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Pair that pattern with{' '}
        <Link to="/#portfolio" className="text-oxblood underline underline-offset-2">
          listing and local-authority discipline
        </Link>{' '}
        (categories, NAP, reviews) via how we think about{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          SEO/AEO together
        </Link>
        .
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">What AI tools actually look for</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Nobody publishes the full citation algorithm. BrightEdge and Semrush nonetheless show repeating patterns:
      </p>
      <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-6 marker:text-oxblood">
        <li>
          <strong className="text-ink">Direct answers in-section.</strong> Not only &ldquo;we offer X&rdquo; but step-by-step
          what an inspection covers and what the homeowner hears at the end.
        </li>
        <li>
          <strong className="text-ink">Structured data.</strong>{' '}
          <a href={REF.schemaLocal} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            LocalBusiness
          </a>
          ,{' '}
          <a href={REF.schemaFaq} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            FAQPage
          </a>
          , or{' '}
          <a href={REF.schemaService} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            Service
          </a>{' '}
          markup clarifies entity type;{' '}
          <a href={REF.googleStructuredData} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            Google&apos;s structured data guidance
          </a>{' '}
          treats it as a meaningful processing signal.
        </li>
        <li>
          <strong className="text-ink">Consistent NAP.</strong> Name, address, phone aligned across site,{' '}
          <a href={REF.googleBusiness} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            Google Business Profile
          </a>
          , and citations. Mismatched suite numbers or phones erode trust under automated cross-checks.
        </li>
        <li>
          <strong className="text-ink">Local specificity.</strong> &ldquo;GTA&rdquo; alone is thin; &ldquo;same-day across
          Scarborough, North York, East York&rdquo; matches how people ask and how models corroborate geography.
        </li>
      </ul>
      <p className="mt-6 text-ink-700 leading-relaxed">
        More on{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          our SEO/AEO scope
        </Link>{' '}
        and building sites with{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          schema-ready foundations
        </Link>
        .
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">The commercial search shift</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Semrush measured commercial and transactional keywords showing roughly a{' '}
        <strong className="text-ink">1,295%</strong> increase in AI Overview triggers. Surprisingly, when an Overview
        appeared, zero-click share <em>dipped</em> slightly &mdash; from about <strong>33.75%</strong> to{' '}
        <strong>31.53%</strong>, meaning users still click &mdash; often to cited sources.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        High-intent Toronto queries (&ldquo;hire a plumber Mississauga&rdquo;, &ldquo;pest control North York&rdquo;) sit
        exactly where Overviews are expanding fastest per aggregate trackers. Capture citations and you capture clicks;
        miss them and you never see the lost demand.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Layer{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          paid search
        </Link>{' '}
        and{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          integrated local visibility
        </Link>{' '}
        when you need immediate auction coverage while organic and AI citation equity compounds.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Where Toronto businesses stand right now</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Most SMBs are early. That is the window. We helped{' '}
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Insectica
        </Link>
        , a Toronto pest control operator, move from about position <strong>50</strong> on Maps into the{' '}
        <strong>top five</strong> within four months using coordinated content and local authority work &mdash; the same
        substrate strong AEO rests on.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Once a handful of competitors secure trusted answer libraries in a category, displacement gets harder. Early movers
        compound.
      </p>
      <p className="mt-6">
        <Link
          to="/#contact"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-oxblood hover:text-ink"
        >
          Book a call &rarr;
        </Link>
      </p>

      <div className="mt-16 p-8 md:p-10 bg-ink text-cream border border-ink/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Consultation</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">
          Book a free AEO audit with Stratezik
        </h2>
        <p className="mt-5 text-cream/85 leading-relaxed">
          <Link to="/" className="text-gold hover:text-cream underline underline-offset-4">
            Stratezik
          </Link>{' '}
          helps Toronto businesses across Google Search, Maps, and AI answer surfaces through coordinated{' '}
          <Link to="/#services" className="text-gold hover:text-cream underline underline-offset-4">
            SEO/AEO strategy
          </Link>{' '}
          &mdash; grounded in north of <strong>$10M</strong> in historical annual ad spend stewardship plus hands-on
          organic execution.
        </p>
        <p className="mt-4 text-cream/85 leading-relaxed">
          The audit covers content, schema signals, Google Business Profile alignment, and competitor visibility inside AI
          answers for your category.
        </p>
        <Link
          to="/#contact"
          data-cursor="cta"
          data-cursor-text="Open"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          Book your free AEO audit
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
        <p className="mt-6 text-sm text-cream/60">
          Email{' '}
          <a href="mailto:dave@stratezik.com?subject=AEO%20audit" className="text-gold hover:text-cream">
            dave@stratezik.com
          </a>{' '}
          ·{' '}
          <Link to="/careers" className="text-gold hover:text-cream underline">
            Careers
          </Link>
        </p>
      </div>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            BrightEdge:{' '}
            <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Overviews — One Year: Presence, Size, and Citing
            </a>
          </li>
          <li>
            Semrush:{' '}
            <a href={REF.semrushStudy} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Overviews Impact Study 2025
            </a>
          </li>
          <li>
            QuickSEO:{' '}
            <a href={REF.quickSeo} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Google AI Overviews Statistics 2026 — 60 Data Points
            </a>
          </li>
          <li>
            Reuters Institute:{' '}
            <a href={REF.reuters2025} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Digital News Report 2025
            </a>
          </li>
          <li>
            Google Search Central:{' '}
            <a href={REF.googleAioSite} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Overviews and Your Website
            </a>
          </li>
          <li>
            Google:{' '}
            <a href={REF.googleStructuredData} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Structured data introduction
            </a>
          </li>
          <li>
            <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
              Stratezik sitemap
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
