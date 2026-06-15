import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { AeoCheckerCta } from '../components/AeoCheckerCta'
import { Link } from 'react-router-dom'
import { oldSeoToAgentReadyFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

const REF = {
  googleAio: 'https://developers.google.com/search/docs/appearance/ai-overviews-and-your-website',
  googleStructuredData: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
  googleEeat: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
  schemaFaq: 'https://schema.org/FAQPage',
  brightEdge: 'https://www.brightedge.com/resources/weekly-ai-search-insights/ai-overviews-one-year-presence-size-citing',
}

export default function OldSeoToAgentReadyArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        Most Toronto marketing teams we audit are still running a playbook built for 2018: keyword maps, monthly blog
        volume, backlink counts, and traffic dashboards. The pages rank sometimes. They rarely get cited inside{' '}
        <a
          href={REF.googleAio}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          Google AI Overviews
        </a>
        , ChatGPT, or Perplexity. That gap is not a tooling problem. It is a shape problem: old SEO optimised for a list of
        blue links. Agent-ready SEO optimises for answers machines can quote, verify, and act on.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This post maps the shift in plain language: what to stop doing, what to start doing, and how GTA service businesses
        and startups can move without throwing away everything that still works.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="agent-ready-feat-heading">
        <h2 id="agent-ready-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {oldSeoToAgentReadyFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{oldSeoToAgentReadyFaq[0].answer}</p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">Old SEO vs agent-ready SEO at a glance</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Use this as a working checklist when you review a page template or a content calendar.
      </p>
      <div className="mt-8 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
              <th className="px-3 py-3">Old SEO habit</th>
              <th className="px-3 py-3">Agent-ready replacement</th>
              <th className="px-3 py-3">What to do now</th>
            </tr>
          </thead>
          <tbody className="text-ink-700 divide-y divide-ink/10">
            <tr>
              <td className="px-3 py-3 align-top">Keyword stuffing and meta tricks</td>
              <td className="px-3 py-3 align-top">Answer-first, intent-driven copy</td>
              <td className="px-3 py-3 align-top">Lead with a one-line answer; use clear headings and Q&amp;A blocks.</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Volume over depth</td>
              <td className="px-3 py-3 align-top">Topical authority and depth</td>
              <td className="px-3 py-3 align-top">Build clusters and original proof; link internally by topic.</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Backlink count focus</td>
              <td className="px-3 py-3 align-top">Provenance and citation quality</td>
              <td className="px-3 py-3 align-top">Publish primary data and earn contextual links from trusted sources.</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Single-format blog posts</td>
              <td className="px-3 py-3 align-top">Repurposed multi-format assets</td>
              <td className="px-3 py-3 align-top">Ship snippets, tables, FAQs, and structured summaries assistants can lift.</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Traffic as the main KPI</td>
              <td className="px-3 py-3 align-top">Citations, agent referrals, and conversions</td>
              <td className="px-3 py-3 align-top">Track AI mentions and downstream actions, not pageviews alone.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">What old SEO got right, and where it broke</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Legacy SEO grew up when search engines mostly matched keywords to pages. Meta tags, on-page signals, and link volume
        moved the needle because the systems were easier to influence. Teams learned to publish often, chase backlinks, and
        tune titles. That still matters for crawlability, relevance, and trust signals.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The failure mode was treating visibility as the finish line. Short-term traffic spikes replaced durable authority.
        Pages were written for ranking in a list, not for being summarized, verified, or handed to another system. When
        assistants began answering queries directly, those pages became invisible in the layer users actually read.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Research from{' '}
        <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          BrightEdge&apos;s AI search tracking
        </a>{' '}
        keeps showing the same tension: many URLs cited in AI answers do not sit in the organic top ten for the same query.
        Rankings and citation-worthiness are related, not identical. Our{' '}
        <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
          AEO Toronto guide
        </Link>{' '}
        unpacks that split for local operators.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Why 2026 SEO is different</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Search is increasingly an answer engine. Large language models synthesize information, cite sources they trust, and
        in some flows act on behalf of users. That raises three priorities every content team should design for.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Extractability.</strong> Agents need short, unambiguous answers they can quote. A long
        narrative buried in paragraph three is less useful than a clear one-line answer followed by supporting detail,
        tables, and FAQs.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Provenance.</strong> Machines favour sources with visible authorship, dates, methodology,
        and original data.{' '}
        <a href={REF.googleEeat} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Google&apos;s helpful content guidance
        </a>{' '}
        and real-world citation patterns both reward pages a human auditor could trust.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Actionability.</strong> When an agent books, buys, or compares options, it needs structured
        signals: schema, consistent NAP, service definitions, and honest availability or pricing ranges in machine-readable
        form. That is why{' '}
        <Link to="/services/google-business-profile" className="text-oxblood underline underline-offset-2">
          GBP hygiene
        </Link>{' '}
        and{' '}
        <Link to="/services/seo-aeo/technical-seo" className="text-oxblood underline underline-offset-2">
          technical SEO
        </Link>{' '}
        still sit underneath the answer layer.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Three examples you can apply this week</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Product or service page.</strong> Old shape: long description with keyword variants and a
        few reviews. Agent-ready shape: open with a factual one-liner a buyer would repeat aloud, add a compact specs or
        scope table, mirror claims in FAQ schema, and keep proof (case studies, methodology) one click away.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">How-to or guide.</strong> Old shape: instructions buried in prose. Agent-ready shape: two-sentence
        solution up top, numbered steps, a visible FAQ block, and a downloadable or on-page checklist. Our{' '}
        <Link to="/blog/get-recommended-by-chatgpt-playbook" className="text-oxblood underline underline-offset-2">
          ChatGPT recommendation playbook
        </Link>{' '}
        follows that pattern on purpose.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Local GTA service.</strong> Old shape: directory-style copy and keyword-heavy neighbourhoods.
        Agent-ready shape: plain service summary, consistent hours and service area, pricing bands where you can state them
        honestly, and booking or contact paths that match your{' '}
        <Link to="/services/seo-aeo/local-seo" className="text-oxblood underline underline-offset-2">
          local SEO
        </Link>{' '}
        entity data. Agents compare options from structured facts, not adjectives.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Seven reality shifts behind the table</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Industry roundups often list these as slogans. We translate them into decisions you can make on a Friday afternoon.
      </p>
      <div className="mt-8 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
              <th className="px-3 py-3">Old assumption</th>
              <th className="px-3 py-3">2026 reality</th>
            </tr>
          </thead>
          <tbody className="text-ink-700 divide-y divide-ink/10">
            <tr>
              <td className="px-3 py-3 align-top">E-E-A-T is nice to have</td>
              <td className="px-3 py-3 align-top">E-E-A-T is non-negotiable for anything you want cited or recommended</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Abuse AI to publish faster</td>
              <td className="px-3 py-3 align-top">AI is a production tool inside a strategy, not a substitute for one</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Keywords are the brief</td>
              <td className="px-3 py-3 align-top">Search intent is the brief; keywords are evidence</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Broad top-of-funnel volume wins</td>
              <td className="px-3 py-3 align-top">Topical authority and depth beat thin coverage</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">One blog channel is enough</td>
              <td className="px-3 py-3 align-top">Repurposing into snippets, FAQs, and structured assets multiplies reach</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Any backlink helps</td>
              <td className="px-3 py-3 align-top">Contextual citations from reputable sources still move trust</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Google is the only game</td>
              <td className="px-3 py-3 align-top">ChatGPT, Perplexity, and assistants add a parallel discovery race</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink-600 leading-relaxed">
        Founders building GTM from zero should read this alongside{' '}
        <Link to="/blog/ai-native-gtm-cited-by-chatgpt" className="text-oxblood underline underline-offset-2">
          AI-native GTM Part 2
        </Link>{' '}
        and{' '}
        <Link to="/blog/get-found-2026-ai-search-visibility" className="text-oxblood underline underline-offset-2">
          Get Found 2026: AI search visibility
        </Link>
        .
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Tactical steps to move from old SEO to agent-ready content</h2>
      <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-5">
        <li>
          <strong className="text-ink">Lead with the answer.</strong> Put one concise, factual sentence at the top that directly
          answers the query the page targets.
        </li>
        <li>
          <strong className="text-ink">Add provenance.</strong> Show author, dates, and how you know what you claim. Link primary
          sources where you cite stats.
        </li>
        <li>
          <strong className="text-ink">Structure for machines.</strong> Use honest{' '}
          <a href={REF.schemaFaq} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
            FAQ
          </a>{' '}
          and Article schema, short headings, and tables when comparison is the job of the page.
        </li>
        <li>
          <strong className="text-ink">Create citation hooks.</strong> Original benchmarks, neighbourhood-specific data, or tools
          others will reference earn mentions in AI summaries over time.
        </li>
        <li>
          <strong className="text-ink">Repurpose deliberately.</strong> Break long posts into extractable snippets for email,
          LinkedIn, and sales enablement so the same facts stay consistent everywhere.
        </li>
        <li>
          <strong className="text-ink">Measure differently.</strong> Log assistant referral traffic where analytics allow, track
          branded mentions in AI tools manually at first, and tie SEO work to pipeline, not vanity sessions.
        </li>
      </ul>

      <h2 className="mt-16 font-display text-display-3 text-ink">Tradeoffs and guardrails</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Human experience still matters. Answer-first snippets satisfy machines; the paragraphs below should still sound like
        your brand, especially for high-trust categories (legal, health-adjacent, finance-adjacent services).
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Over-optimizing for extraction produces sterile copy nobody shares. Keep atomic facts up top and narrative, proof, and
        opinion underneath. And treat provenance as a liability if it is wrong: agents amplify mistakes faster than ten blue
        links ever did. Build a correction workflow before you scale production.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Where Stratezik fits</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We run integrated{' '}
        <Link to="/services/seo-aeo" className="text-oxblood underline underline-offset-2">
          SEO and AEO programmes
        </Link>{' '}
        for Toronto and GTA operators: technical bedrock, answer-engine structure, GBP alignment, and content that survives
        both rankings and AI citations. Deeper tactical work lives in our{' '}
        <Link to="/services/seo-aeo/answer-engine-optimization" className="text-oxblood underline underline-offset-2">
          Answer Engine Optimisation
        </Link>{' '}
        service.
      </p>
      <AeoCheckerCta
        variant="inline"
        source="blog-old-seo-agent-ready"
        headline="Where does your site sit on the agent-ready spectrum?"
        body="Run the free 20-Point AEO Readiness Test — the same machine-verified checks from our Toronto startup audit. Topline score in ~20 seconds."
        className="mt-10"
      />
      <p className="mt-6 text-ink-700 leading-relaxed">
        Want a human read on priorities? Use our{' '}
        <BlogStratezikContactLink>contact form</BlogStratezikContactLink> for a free strategy consultation — we will tell
        you what to fix first and what can wait.
      </p>
      <BlogAuthorSignoff />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="old-seo-agent-faq-heading">
        <h2 id="old-seo-agent-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {oldSeoToAgentReadyFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="old-seo-agent-sources-heading">
        <h2 id="old-seo-agent-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            <a href={REF.googleAio} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Google Search Central: AI Overviews and your website
            </a>
          </li>
          <li>
            <a
              href={REF.googleStructuredData}
              target="_blank"
              rel="noopener noreferrer"
              className="text-oxblood hover:text-ink underline"
            >
              Google Search Central: Structured data introduction
            </a>
          </li>
          <li>
            <a href={REF.googleEeat} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Google Search Central: Creating helpful, reliable, people-first content
            </a>
          </li>
          <li>
            <a href={REF.brightEdge} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              BrightEdge: AI Overviews presence and citing patterns
            </a>
          </li>
          <li>
            <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood hover:text-ink underline">
              Stratezik: Answer engine optimisation for Toronto businesses
            </Link>
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
