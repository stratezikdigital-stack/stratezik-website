import { Link } from 'react-router-dom'
import { AEO_BENCHMARK } from '../aeo/benchmark'
import { AeoCheckerCta } from './AeoCheckerCta'

export default function TorontoStartupAuditPage() {
  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12 max-w-4xl">
        <header className="mb-14 md:mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
            Research report · June 2026
          </div>
          <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
            Toronto Startup Website Audit
          </div>
          <h1 className="mt-8 font-display text-display-3 md:text-[3.25rem] text-ink leading-[1.02] tracking-[-0.035em]">
            Toronto Startup Website Audit 2026
          </h1>
          <p className="lead mt-8 max-w-2xl">
            We machine-verified the public websites of <strong>{AEO_BENCHMARK.n} funded Toronto startups</strong> using
            our 20-Point AEO Readiness Test — the same test now live as a{' '}
            <Link to="/aeo-checker?utm_source=audit-report&utm_medium=cta" className="text-oxblood underline underline-offset-2">
              free checker
            </Link>
            . The doors are open, but the house is empty.
          </p>
        </header>

        <section className="border-t border-ink/15 pt-10 space-y-10">
          <div>
            <h2 className="font-display text-2xl text-ink">Headline findings</h2>
            <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-6">
              <li>
                <strong>Median score: {AEO_BENCHMARK.median}/20.</strong> No company scored 0; none scored above{' '}
                {AEO_BENCHMARK.max}.
              </li>
              <li>
                Startups capture <strong>{AEO_BENCHMARK.groupAPct}%</strong> of &ldquo;default&rdquo; points (crawler
                access, server-rendered HTML, entity presence) but only <strong>{AEO_BENCHMARK.groupBPct}%</strong> of
                &ldquo;deliberate&rdquo; points (schema, answer-first copy, llms.txt, pricing transparency).
              </li>
              <li>
                Only <strong>{AEO_BENCHMARK.faqPct}%</strong> have FAQPage schema;{' '}
                <strong>{AEO_BENCHMARK.orgMissingPct}%</strong> lack Organization schema;{' '}
                <strong>{AEO_BENCHMARK.llmsTxtPct}%</strong> have llms.txt (roughly 3× the ~10% global rate).
              </li>
              <li>
                Only <strong>{AEO_BENCHMARK.pricingSchemaCount}</strong> of {AEO_BENCHMARK.n} has machine-readable
                pricing in schema.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink">The 20-point test</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Eight criteria, each worth 2.5 points: AI crawler access, JavaScript-free rendering, off-page entity
              alignment, Organization schema, FAQPage schema, answer-first formatting, llms.txt, and pricing transparency.
              Group A captures what your stack gives you by default; Group B is what you must build deliberately.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              The audit used plain server-side fetches — no headless browser — so results reflect what AI crawlers and
              assistants actually see in raw HTML.
            </p>
          </div>

          <AeoCheckerCta
            variant="banner"
            source="audit-report"
            headline="How does your site compare?"
            body={`Run the identical test on your domain. Free topline score in ~20 seconds — see your defaults vs deliberate split against the ${AEO_BENCHMARK.n}-startup benchmark.`}
            className="mt-8"
          />

          <div className="hairline pt-10">
            <h2 className="font-display text-2xl text-ink">What to do next</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Fix the deliberate column first: Organization and FAQ schema, answer-first hero copy, llms.txt, and
              machine-readable pricing where it fits your model. Stratezik runs these programmes for Toronto and GTA
              operators every week.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/aeo-checker?utm_source=audit-report&utm_medium=cta"
                className="inline-flex items-center justify-center bg-ink text-cream px-7 py-3 font-medium tracking-wide hover:bg-oxblood transition-colors"
              >
                Check my score
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center border border-ink px-7 py-3 font-medium tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors"
              >
                Book a call
              </Link>
              <Link
                to="/services/seo-aeo/answer-engine-optimization?utm_source=audit-report"
                className="inline-flex items-center justify-center border border-ink/30 px-7 py-3 font-medium tracking-wide text-ink-700 hover:border-ink transition-colors"
              >
                AEO services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
