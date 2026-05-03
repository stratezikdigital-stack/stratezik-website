import { Link } from 'react-router-dom'
import { answerEngineTorontoFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

/** External research URLs (draft v2) */
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

/** Answer Engine Optimisation for Toronto Businesses (site version; SPA routes inside.) */
export default function AnswerEngineTorontoArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        Pull up{' '}
        <a
          href={REF.brightEdge}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          BrightEdge&apos;s 2026 AI search tracking
        </a>{' '}
        and you hit an awkward stat early:{' '}
        <strong className="text-ink">
          83% of the websites cited in Google&apos;s AI-generated answers do not rank in the organic top 10 for that
          same search.
        </strong>
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        That leaves seventeen percent who rank top ten and still get cited. The rest often sits elsewhere on the SERP
        entirely. Winners tended to structure pages machines could lift cleanly from, not only chase generic rankings on a head term.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        For someone fixing drains in Scarborough or filling chairs in Etobicoke, your trophy rankings still matter for clicks,
        but they do not guarantee inclusion inside AI summaries. Two parallel races show up on one SERP: classic rankings versus citation-worthiness on answers panels.
        Plenty of Toronto shops never bothered with the second. Fair warning if{' '}
        <strong className="text-ink font-medium">answer engine optimisation Toronto</strong> never showed up on your roadmap yet.
      </p>

      <aside
        className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50"
        aria-labelledby="feat-answer-heading"
      >
        <h2 id="feat-answer-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {answerEngineTorontoFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{answerEngineTorontoFaq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Tools referenced in conversation:{' '}
          <a href={REF.chatgpt} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            ChatGPT
          </a>
          ,{' '}
          <a href={REF.perplexity} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            Perplexity
          </a>
          ,{' '}
          <a href={REF.googleAioSite} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            Google AI Overviews
          </a>
          .
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">How large is AI search in 2025 and 2026?</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Plenty of operators still assume Overviews hit occasionally.{' '}
        <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          BrightEdge&apos;s early 2026 tracking
        </a>{' '}
        clocks AI Overviews on roughly <strong className="text-ink">48%</strong> of monitored queries, up{' '}
        <strong className="text-ink">58%</strong> YoY.{' '}
        <a href={REF.semrushStudy} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Semrush&apos;s broader AI Overview study
        </a>{' '}
        landed at <strong className="text-ink">15.69%</strong> prevalence across 10M+ keywords with a{' '}
        <strong className="text-ink">24.61%</strong> spike in July 2025.{' '}
        <a href={REF.quickSeo} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          QuickSEO&apos;s 2026 roundup
        </a>{' '}
        keeps pointing out Google tweaking trigger thresholds, which partly explains why vendors disagree.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        BrightEdge leans commercial intent (people ready to hire). Semrush sweeps everything. For GTA trades, BrightEdge&apos;s slice usually mirrors wallet-out searches better.
        When an Overview renders wide, BrightEdge pegged average height near <strong className="text-ink">1,200 pixels</strong>, enough to shove classic listings below the fold on plenty of desktops.{' '}
        <a href={REF.reuters2025} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Reuters Institute Digital News Report 2025
        </a>{' '}
        tracks AI-assisted lookup climbing globally, Canada included.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Curious how we stitch SEO plus answer-engine work? Jump to{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          services
        </Link>{' '}
        for Toronto engagements.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">
        The 83% gap: why your Google ranking doesn&apos;t protect you
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Flip BrightEdge&apos;s citation math and only{' '}
        <strong className="text-ink">17%</strong> of URLs appearing inside AI Overviews also rank top ten on that query. Everyone else earned placement via clearer excerpting,
        corroboration, topic coverage, or formatting machines liked.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Ignore rankings entirely and you starve both channels. Ignore citations while polishing rank alone and you leave meat on the table whenever AI panels steal attention up top.
        Same foundations help both; citation-winning habits simply stretch beyond title-tag tinkering.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Imagine a rival sits fourth for &ldquo;accountant Etobicoke&rdquo; yet publishes blunt paragraphs answering &ldquo;what does a small-business accountant actually handle during tax season?&rdquo;
        That rival may steal Overview citations while you hug generic SERPs spots.{' '}
        <a href={REF.googleAioSite} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Google Search Central
        </a>{' '}
        stresses citations lean on content quality plus structure, not ranking slots alone.
      </p>
      <p className="mt-5 text-sm text-ink-600">
        Dig deeper:{' '}
        <a href={REF.semrushStudy} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
          Semrush methodology write-up
        </a>{' '}
        ·{' '}
        <a href={REF.quickSeo} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
          QuickSEO stat compilation
        </a>
        .
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">A real Toronto example</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Two Scarborough plumbers with mileage on their vans; both online. Leaderboards favour one overall.{' '}
        <strong className="text-ink">Firm A</strong> sells Services plus a phone number.{' '}
        <strong className="text-ink">Firm B</strong> wrote &ldquo;What to do if your pipes freeze in a Toronto winter,&rdquo; spelling frost cues, when to panic-call,
        and what actually happens on site.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Prompt someone&apos;s voice assistant about frozen pipes and Firm B hands extractable sentences. Firm A doesn&apos;t. Budget wasn&apos;t the divider; answer readiness was.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Stack that playbook beside disciplined GBP hygiene via{' '}
        <Link to="/#portfolio" className="text-oxblood underline underline-offset-2">
          live case history
        </Link>{' '}
        and our{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          SEO/AEO bundles
        </Link>
        .
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">What AI tools actually look for</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Google hides exact citation knobs. Still, BrightEdge plus Semrush echo several behaviours worth stealing:
      </p>
      <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-6 marker:text-oxblood">
        <li>
          <strong className="text-ink">Answer-first paragraphs inside sections.</strong> Spell inspections step-by-step instead of hiding nuance behind vague menus.
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
          clarify entities for parsers;{' '}
          <a href={REF.googleStructuredData} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            Google&apos;s structured data primer
          </a>{' '}
          treats them as real signals.
        </li>
        <li>
          <strong className="text-ink">Consistent NAP.</strong> Match legal entity strings across your site,{' '}
          <a href={REF.googleBusiness} target="_blank" rel="noopener noreferrer" className="text-oxblood underline">
            Google Business Profile
          </a>
          , and citations before bots cross-wire conflicting suites or phones.
        </li>
        <li>
          <strong className="text-ink">Neighbourhood specificity.</strong> Swap vague &ldquo;we cover GTA&rdquo; blurbs for same-day blocks naming Scarborough, North York, East York when true.
        </li>
      </ul>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Scope plus execution live under{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          our SEO/AEO lane
        </Link>{' '}
        alongside builds wired for schema out of the gate.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">The commercial search shift</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Semrush flagged commercial plus transactional keywords logging roughly a <strong className="text-ink">1,295%</strong> jump in Overview appearances.
        Counterintuitively, zero-click share eased slightly when Overviews showed (<strong>33.75%</strong> down to <strong>31.53%</strong>), meaning eyeballs still tap cited URLs sometimes.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Intent-heavy Toronto phrases (&ldquo;hire plumber Mississauga,&rdquo; &ldquo;pest control North York&rdquo;) overlap where panels expanded fastest.
        Own citations, harvest clicks. Skip them quietly bleed pipeline you never see in dashboards.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Need auctions spinning while citations mature? Pair{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          paid search
        </Link>{' '}
        with{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          bundled local visibility
        </Link>{' '}
        work so leads land today while longer bets bake.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Where Toronto businesses stand right now</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Odds are your niche still has whitespace. We lifted{' '}
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Insectica
        </Link>{' '}
        from roughly Maps slot fifty into the top five inside four months using coordinated content plus GBP rigor, basically the same backbone citations feed on.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Wait until three rivals stockpile trusted answer libraries and clawing back share hurts more. Early movers snowball.
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
          runs Toronto programmes across Search, Maps, and AI surfaces via coordinated{' '}
          <Link to="/#services" className="text-gold hover:text-cream underline underline-offset-4">
            SEO/AEO strategy
          </Link>
          , backed by north of <strong>$10M</strong> in historical annual paid spend plus organic grunt work we still touch weekly.
        </p>
        <p className="mt-4 text-cream/85 leading-relaxed">
          Audits walk content, schema, GBP alignment, and where rivals snag citations inside assistants today.
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

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="article-faq-heading">
        <h2 id="article-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {answerEngineTorontoFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            BrightEdge:{' '}
            <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AI Overviews: One Year on Presence, Size, and Citing
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
              Google AI Overviews Statistics 2026 (60 Data Points)
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
