import { Link } from 'react-router-dom'
import { SocialProfileLinks } from './SocialProfileLinks'

/**
 * Plan D - Studio footer.
 *
 * Columned links plus a plain-language section breadcrumb for humans & crawlers.
 */
const Footer = () => {
  const baseUrl = 'https://www.stratezik.com'

  const cols = [
    {
      label: 'I.\u00a0Services',
      links: [
        { name: 'All Services', href: '/services' },
        { name: 'SEO & AEO', href: '/services/seo-aeo' },
        { name: 'Google Ads', href: '/services/paid-search' },
        { name: 'AI Agents', href: '/services/ai-agents' },
        { name: 'Web Design', href: '/services/web-design' },
      ],
    },
    {
      label: 'II.\u00a0Studio',
      links: [
        { name: 'About', href: `${baseUrl}/#about` },
        { name: 'Blog', href: '/blog' },
        { name: 'Free Tools', href: '/free-tools?utm_source=footer&utm_medium=cta' },
        { name: 'Toronto Startup Audit 2026', href: '/toronto-startup-website-audit-2026' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Notice', href: '/privacy' },
        { name: 'Capstone work', href: `${baseUrl}/#portfolio` },
      ],
    },
    {
      label: 'III.\u00a0Connect',
      links: [
        { name: 'dave@stratezik.com', href: 'mailto:dave@stratezik.com' },
        { name: '437.525.4772', href: 'tel:+14375254772' },
        { name: 'Toronto, Canada', href: 'https://maps.google.com/?q=2466+Eglinton+Ave+E,+Toronto' },
      ],
    },
  ]

  return (
    <footer className="relative bg-ink text-cream/90">
      {/* Massive editorial wordmark */}
      <div className="container-custom px-6 md:px-12 pt-20 md:pt-28 pb-12">
        <div className="grid grid-cols-12 gap-4 mb-16">
          <div className="col-span-12 md:col-span-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60">
              Site map
            </div>
            <div className="mt-2 hairline pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60">
              Stratezik, Toronto
            </div>
            <p className="mt-6 lead text-cream/70 max-w-md">
              Toronto digital marketing for startups and SMBs: SEO, PPC, social, and growth marketing in one
              integrated playbook with fewer handoffs, clearer metrics.
            </p>
            <SocialProfileLinks className="mt-6" />
          </div>

          {cols.map((c) => (
            <div key={c.label} className="col-span-6 md:col-span-2 md:col-start-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60">
                {c.label}
              </div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.name}>
                    {l.href.startsWith('/') ? (
                      <Link
                        to={l.href}
                        data-cursor="cta"
                        data-cursor-text="Read"
                        className="text-cream/85 hover:text-cream transition-colors"
                      >
                        {l.name}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        {...(() => {
                          const ext =
                            l.href.startsWith('http') &&
                            !l.href.startsWith('mailto:') &&
                            !l.href.startsWith('tel:')
                          return ext
                            ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                            : {}
                        })()}
                        data-cursor="cta"
                        data-cursor-text="Open"
                        className="text-cream/85 hover:text-cream transition-colors"
                      >
                        {l.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Massive wordmark */}
        <div className="border-t border-cream/15 pt-8">
          <h2 className="font-display font-medium text-[clamp(4rem,18vw,15rem)] leading-[0.85] tracking-[-0.05em] text-cream">
            Stratezik
          </h2>
        </div>

        {/* Section breadcrumb: plain labels for humans & crawlers */}
        <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55 leading-7 break-words">
          <span>Home</span>
          <span className="mx-3 text-cream/25">&middot;</span>
          <Link to="/services" className="hover:text-cream transition-colors">
            Services
          </Link>
          <span className="mx-3 text-cream/25">&middot;</span>
          <span>Process</span>
          <span className="mx-3 text-cream/25">&middot;</span>
          <span>Portfolio</span>
          <span className="mx-3 text-cream/25">&middot;</span>
          <span>Contact</span>
          <span className="mx-3 text-cream/25">&middot;</span>
          <Link to="/blog" className="hover:text-cream transition-colors">
            Blog
          </Link>
          <span className="mx-3 text-cream/25">&middot;</span>
          <Link to="/growth-credit" className="hover:text-cream transition-colors">
            Growth Credit
          </Link>
          <span className="mx-3 text-cream/25">&middot;</span>
          <Link to="/careers" className="hover:text-cream transition-colors">
            Careers
          </Link>
          <span className="mx-3 text-cream/25">&middot;</span>
          <Link to="/privacy" className="hover:text-cream transition-colors">
            Privacy
          </Link>
        </div>

        <div className="mt-10 hairline border-cream/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/60">
          <span>&copy; {new Date().getFullYear()} Stratezik, Toronto, Canada</span>
          <span>Integrated channels · accountable measurement · pragmatic creative</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
