import { Link } from 'react-router-dom'
import { FREE_TOOLS_FAQS } from '../free-tools/freeToolsFaqs'
import { FREE_TOOLS } from '../free-tools/tools'

export default function FreeToolsPage() {
  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="container-custom mx-auto max-w-5xl px-6 md:px-12 pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          <Link to="/" className="hover:text-oxblood transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-600">Free Tools</span>
        </nav>

        <header className="mb-14 md:mb-16 max-w-3xl">
          <div className="editorial-label">Stratezik · Toronto</div>
          <h1 className="mt-4 font-display text-display-3 md:text-[3.25rem] text-ink leading-[1.02] tracking-[-0.035em]">
            Free tools for growth teams
          </h1>
          <p className="lead mt-8">
            Diagnostics, playbooks, and offers we built for ourselves and clients — free to use. Each tool has its own
            page with everything you need. No account required unless noted.
          </p>
        </header>

        <div className="grid gap-6 md:gap-8">
          {FREE_TOOLS.map((tool) => (
            <article
              key={tool.slug}
              className="border border-ink/10 bg-cream-50 p-6 md:p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            >
              <div className="max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">{tool.label}</span>
                  {tool.badge ? (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500 border border-ink/15 px-2 py-0.5">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-[1.75rem] text-ink tracking-tight">{tool.title}</h2>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">{tool.tagline}</p>
                <p className="mt-4 text-ink-700 leading-relaxed">{tool.description}</p>
              </div>
              <Link
                to={tool.href}
                className="btn-primary shrink-0 self-start md:mt-8 px-6 py-3 text-sm whitespace-nowrap"
              >
                {tool.cta} →
              </Link>
            </article>
          ))}
        </div>

        <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="free-tools-faq-heading">
          <h2 id="free-tools-faq-heading" className="font-display text-display-3 text-ink">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-8">
            {FREE_TOOLS_FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-display text-lg text-ink">{faq.question}</dt>
                <dd className="mt-2 text-ink-700 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400 text-center">
          More tools shipping — bookmark this page
        </p>
      </div>
    </main>
  )
}
