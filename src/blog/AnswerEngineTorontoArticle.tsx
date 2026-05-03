import { Link } from 'react-router-dom'

const SITE = 'https://www.stratezik.com'

/**
 * Long-form post: Answer Engine Optimisation for Toronto Businesses.
 * Internal links target homepage sections; externals cite Search / research sources.
 */
export default function AnswerEngineTorontoArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        Your customers are changing how they search &mdash; and many Toronto businesses have not adjusted yet.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        More people ask ChatGPT or{' '}
        <a
          href="https://en.wikipedia.org/wiki/Perplexity_AI"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Perplexity
        </a>{' '}
        for local recommendations before they open a map: &ldquo;Who is the best dentist near me in Scarborough?&rdquo;
        &ldquo;Which pest control company in Toronto handles both houses and restaurants?&rdquo; That behaviour is
        part of a broader shift documented across Canadian news audiences in the{' '}
        <a
          href="https://www.digitalnewsreport.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Reuters Institute Digital News Report
        </a>
        , where discovery via platforms and AI-style interfaces keeps growing alongside traditional search.
      </p>

      <p className="mt-6 text-ink-700 leading-relaxed">
        That is where{' '}
        <strong className="text-ink font-semibold">answer engine optimisation</strong> matters for Toronto operators.
        AEO is how you structure content so trustworthy systems can cite your business inside generated answers,
        not only list your site in organic results. Google has been weaving generative summaries directly into
        Search through{' '}
        <a
          href="https://developers.google.com/search/docs/appearance/ai-overviews"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          AI Overviews
        </a>
        ; third-party studies such as{' '}
        <a
          href="https://www.semrush.com/blog/google-ai-overview-study/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Semrush&rsquo;s analysis of AI Overview prevalence
        </a>{' '}
        illustrate how often those modules appear for informational and local-style queries. The practical takeaway:
        ranking alone does not guarantee inclusion in the answer card your prospect reads first.
      </p>

      {/* Featured answer — mirrors FAQ schema for AEO */}
      <aside
        className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50"
        aria-labelledby="feat-answer-heading"
      >
        <h2 id="feat-answer-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          What is answer engine optimisation and how does it affect Toronto businesses?
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">
          Answer engine optimisation (AEO) is the practice of structuring your website&rsquo;s content so it can be
          cited inside AI-generated answers &mdash; in tools like ChatGPT and Perplexity, and in surfaces such as
          Google AI Overviews. For Toronto businesses, it means showing up when someone asks an assistant to
          recommend a local provider before they ever open a map or click a traditional ten-blue-links page.
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">What is an answer engine?</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Classic Google Search returns links; you choose where to click. An answer engine synthesises sources into a
        single response and usually surfaces a small set of citations. If your site is not in that set, the customer
        may never see your brand even when you rank elsewhere on the page. For teams already investing in{' '}
        <Link
          to="/#services"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          SEO, paid media, and creative
        </Link>
        , AEO is the discipline that asks whether machines can confidently quote you when they summarise an entire
        topic.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">A real Toronto example</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Compare two plumbers in Scarborough. Both have websites; both appear somewhere on Google.{' '}
        <strong className="text-ink font-medium">Plumber A</strong> publishes &ldquo;What to do if your pipes freeze in
        a Toronto winter&rdquo;: warning signs, when to call, what a typical repair involves &mdash; concrete,
        neighbourhood-specific guidance. <strong className="text-ink font-medium">Plumber B</strong> offers a generic
        Services line and a phone number.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        When a homeowner asks an assistant what to do about frozen pipes, Plumber A supplies sentences worth citing.
        Plumber B does not. The gap is not workmanship or price; it is whether your{' '}
        <Link
          to="/#strategy"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          content and publishing rhythm
        </Link>{' '}
        answer real questions in a machine-readable structure. That is AEO in practice.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Why some businesses get cited and others do not</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Assistants favour sources that directly answer the prompt, show topical depth, and align with consistent facts
        about your business. Three priorities cover most local cases:
      </p>
      <ul className="mt-6 space-y-3 text-ink-700 leading-relaxed list-disc pl-6 marker:text-oxblood">
        <li>
          <strong className="text-ink">Answer real questions.</strong> Replace vague superlatives with procedures,
          timelines, and trade-offs: what an inspection includes, how long a crown appointment runs, what Ontario
          landlords should document before serving notice.
        </li>
        <li>
          <strong className="text-ink">Use clean structure.</strong> Logical headings, short paragraphs, and explicit
          definitions help systems extract a defensible snippet.
        </li>
        <li>
          <strong className="text-ink">Align local facts everywhere.</strong> Match name, address, phone, and service
          areas across your site and{' '}
          <a
            href="https://support.google.com/business/answer/7107248"
            target="_blank"
            rel="noopener noreferrer"
            className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
          >
            Google Business Profile
          </a>{' '}
          so corroboration signals stay strong &mdash; the same habit that supports strong Maps visibility.
        </li>
      </ul>

      <h2 className="mt-14 font-display text-display-3 text-ink">What AEO looks like alongside your marketing stack</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        AEO is not a separate silo; it layers on the{' '}
        <Link to="/" className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]">
          integrated programmes
        </Link>{' '}
        you already run. You map customer questions by intent, publish answers that reflect how Torontonians actually
        search, and tighten measurement so{' '}
        <Link
          to="/#portfolio"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          content investments
        </Link>{' '}
        tie back to leads and revenue &mdash; not vanity impressions alone.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Stratezik builds this alongside classic discovery channels: we have placed client sites in top organic positions
        and inside AI-style recommendations where categories allow. Insectica, a Toronto pest control brand we
        support, moved from roughly position 50 on Google Maps into the top five within four months through coordinated
        content and local authority work &mdash; the same evidence base answer engines look for when they choose who to
        trust.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Why timing still matters</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Many GTA operators have not formalised AEO yet. Early movers who publish decisive, well-sourced answers tend to
        become default citations for their prompts; late entrants compete against an entrenched corpus. Acting while
        your category is still wide open is materially easier than disputing a model that already prefers three
        competitors.
      </p>

      <div className="mt-16 p-8 md:p-10 bg-ink text-cream border border-ink/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Consultation</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">
          Book a free AEO audit with Stratezik
        </h2>
        <p className="mt-5 text-cream/85 leading-relaxed">
          We review your pages, structured cues, Google Business Profile alignment, and competitor visibility inside
          AI summaries &mdash; then outline what it would take to earn citations that match how your buyers actually
          research. Our team carries deep paid-media bench strength (north of $10M annual spend managed historically)
          paired with organic and local execution.
        </p>
        <Link
          to="/#contact"
          data-cursor="cta"
          data-cursor-text="Open"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">Audit</span>
          Request your free AEO audit
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
        <p className="mt-6 text-sm text-cream/60">
          Prefer email first? Reach{' '}
          <a href="mailto:dave@stratezik.com?subject=AEO%20audit%20request" className="text-gold hover:text-cream">
            dave@stratezik.com
          </a>
          . Hiring pipeline: see{' '}
          <Link to="/careers" className="text-gold hover:text-cream underline underline-offset-4">
            careers at Stratezik
          </Link>
          .
        </p>
      </div>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="further-reading">
        <h2 id="further-reading" className="font-display text-xl text-ink">
          Further reading &amp; sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            <a
              href="https://developers.google.com/search/docs/appearance/ai-overviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Google Search Central &mdash; AI Overviews documentation
            </a>
          </li>
          <li>
            <a
              href="https://www.digitalnewsreport.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Reuters Institute Digital News Report
            </a>
          </li>
          <li>
            <a
              href="https://www.semrush.com/blog/google-ai-overview-study/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Semrush &mdash; Google AI Overview visibility study
            </a>
          </li>
          <li>
            <a
              href="https://support.google.com/business/answer/7107248"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Google Business Profile Help &mdash; Keep business info accurate
            </a>
          </li>
          <li>
            <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
              Stratezik XML sitemap
            </a>{' '}
            for crawl discovery.
          </li>
        </ul>
      </section>
    </div>
  )
}
