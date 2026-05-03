import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToContactSection } from '../utils/navigation'

const PHONE_DISPLAY = '437-525-4772'
const PHONE_TEL = '+14375254772'
const EMAIL = 'dave@stratezik.com'

/**
 * Plan D — Editorial navbar (Champion's Hall).
 *
 * Two thin rails:
 *  • Top rail (hairline-divided): contact info as monospace notation
 *  • Bottom rail: tiny editorial wordmark, monospace nav, ink-on-cream
 *    consultation button.
 *
 * Quiet, considered, magazine-masthead vibe.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Openings', label: '02', href: '#services' },
    { name: 'Strategy', label: '03', href: '#strategy' },
    { name: 'Record', label: '04', href: '#portfolio' },
    { name: 'Move', label: '05', href: '#contact' },
  ]

  const goHash = (hash: string) => {
    setIsOpen(false)
    if (location.pathname !== '/') {
      window.location.href = `/${hash}`
      return
    }
    const element = document.querySelector(hash)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onBookConsultation = () => {
    setIsOpen(false)
    scrollToContactSection()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top notation rail */}
      <div className="bg-ink text-cream/85">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between gap-3 py-2 font-mono text-[12px] sm:text-[13px] tracking-[0.12em]">
            <span className="hidden md:inline uppercase tracking-[0.22em] text-[11px] text-cream/55">
              Game #2026 &mdash; in&nbsp;progress
            </span>
            <span className="md:hidden uppercase tracking-[0.22em] text-[11px] text-cream/55">
              Stratezik &mdash; Toronto
            </span>
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={`tel:${PHONE_TEL}`}
                data-cursor="cta"
                data-cursor-text="Call"
                className="hover:text-cream transition-colors tabular-nums"
                aria-label={`Call ${PHONE_DISPLAY}`}
              >
                {PHONE_DISPLAY}
              </a>
              <span aria-hidden className="text-cream/30">|</span>
              <a
                href={`mailto:${EMAIL}?subject=Book%201%20hour%20consultation`}
                data-cursor="cta"
                data-cursor-text="Mail"
                className="hover:text-cream transition-colors truncate max-w-[200px] sm:max-w-none"
                aria-label={`Email ${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <nav
        className={`transition-all duration-500 border-b border-ink/10 ${
          isScrolled ? 'bg-cream/92 backdrop-blur-md' : 'bg-cream/82 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between gap-4 py-3">
            {/* Wordmark */}
            <Link
              to="/"
              data-cursor="cta"
              data-cursor-text="Home"
              className="flex items-baseline gap-2 group"
              aria-label="Stratezik — Home"
            >
              <span className="font-display text-2xl md:text-3xl text-ink tracking-[-0.03em] leading-none">
                Stratezik
              </span>
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
                / Toronto
              </span>
            </Link>

            {/* Center nav */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goHash(item.href)}
                  data-cursor="cta"
                  data-cursor-text={item.label}
                  className="group inline-flex items-baseline gap-1.5 text-ink-700 hover:text-ink transition-colors"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-300 group-hover:text-oxblood transition-colors">
                    /{item.label}
                  </span>
                  <span className="font-display text-[1.05rem] tracking-tight">{item.name}</span>
                </button>
              ))}
              <Link
                to="/careers"
                data-cursor="cta"
                data-cursor-text="Read"
                className="font-display text-[1.05rem] tracking-tight text-ink-700 hover:text-ink transition-colors"
              >
                Careers
              </Link>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center shrink-0">
              <button
                type="button"
                onClick={onBookConsultation}
                data-cursor="cta"
                data-cursor-text="Open"
                className="bg-ink text-cream px-5 py-2.5 font-medium text-sm tracking-wide hover:bg-oxblood transition-colors"
              >
                Book consultation
              </button>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-ink hover:text-oxblood focus:outline-none p-1"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden border-t border-ink/10 pt-3 pb-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => goHash(item.href)}
                    className="flex items-baseline gap-2 text-ink-700 hover:text-oxblood block px-2 py-2 font-display text-lg w-full text-left"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-300">
                      /{item.label}
                    </span>
                    {item.name}
                  </button>
                ))}
                <Link
                  to="/careers"
                  className="block px-2 py-2 font-display text-lg text-ink-700 hover:text-oxblood"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>
                <div className="pt-3 px-1">
                  <button
                    type="button"
                    onClick={onBookConsultation}
                    className="bg-ink text-cream px-5 py-3 font-medium w-full hover:bg-oxblood transition-colors"
                  >
                    Book consultation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
