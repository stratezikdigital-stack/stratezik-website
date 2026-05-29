import { Link } from 'react-router-dom'
import { GOOGLE_BUSINESS_PROFILE_URL } from '../constants/externalLinks'

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/** Map pin: used for Google Business Profile / listings link alongside LinkedIn */
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

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
        { name: 'Careers', href: '/careers' },
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
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
              Site map
            </div>
            <div className="mt-2 hairline pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
              Stratezik, Toronto
            </div>
            <p className="mt-6 lead text-cream/70 max-w-md">
              Toronto digital marketing for startups and SMBs: SEO, PPC, social, and growth marketing in one
              integrated playbook with fewer handoffs, clearer metrics.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/stratezik/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stratezik on LinkedIn"
                data-cursor="cta"
                data-cursor-text="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 border border-cream/25 hover:border-cream hover:bg-cream/10 transition-colors"
              >
                <LinkedInIcon />
              </a>
              <a
                href={GOOGLE_BUSINESS_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stratezik on Google Business Profile"
                data-cursor="cta"
                data-cursor-text="Open"
                className="inline-flex items-center justify-center w-10 h-10 border border-cream/25 hover:border-cream hover:bg-cream/10 transition-colors"
              >
                <MapPinIcon />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.label} className="col-span-6 md:col-span-2 md:col-start-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
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
          <Link to="/careers" className="hover:text-cream transition-colors">
            Careers
          </Link>
        </div>

        <div className="mt-10 hairline border-cream/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">
          <span>&copy; {new Date().getFullYear()} Stratezik, Toronto, Canada</span>
          <span>Integrated channels · accountable measurement · pragmatic creative</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
