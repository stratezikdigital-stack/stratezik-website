import { useState, useEffect } from 'react'
import { Menu, X, Phone, Mail, Calendar } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { scrollToContactSection } from '../utils/navigation'

const PHONE_DISPLAY = '437-525-4772'
const PHONE_TEL = '+14375254772'
const EMAIL = 'dave@stratezik.com'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', isHome: true },
    { name: 'Services', href: '#services', isHome: false },
    { name: 'Portfolio', href: '#portfolio', isHome: false },
    { name: 'About', href: '#about', isHome: false },
    { name: 'Contact', href: '#contact', isHome: false },
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

  const handleNavClick = (item: (typeof navItems)[0]) => {
    if (item.isHome) {
      setIsOpen(false)
      if (location.pathname !== '/') {
        window.location.href = '/'
        return
      }
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    goHash(item.href)
  }

  const onBookConsultation = () => {
    setIsOpen(false)
    scrollToContactSection()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm">
      {/* Top contact rail — phone, email, and CTA in one cohesive strip */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white/95 border-b border-red-900/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 py-2 text-[11px] sm:text-sm">
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium tracking-tight hover:bg-white/20 transition-colors"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 shrink-0" aria-hidden />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a
              href={`mailto:${EMAIL}?subject=Book%201%20hour%20consultation`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium tracking-tight hover:bg-white/20 transition-colors max-w-[200px] sm:max-w-none truncate sm:overflow-visible sm:whitespace-normal"
              aria-label={`Email ${EMAIL}`}
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 shrink-0" aria-hidden />
              <span className="truncate">{EMAIL}</span>
            </a>
            <span className="hidden sm:inline h-4 w-px bg-white/25" aria-hidden />
            <button
              type="button"
              onClick={onBookConsultation}
              className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 sm:px-4 py-1 font-semibold text-white shadow-md shadow-red-900/40 hover:bg-red-500 transition-colors"
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden />
              Book 1 hr consultation
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200' : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/" className="focus:outline-none shrink-0" aria-label="Stratezik digital marketing - Home">
                <img src="/stratezik logo/vertical logo (1).png" alt="Stratezik Digital Marketing Canada" className="h-14 sm:h-16 w-auto" />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className="text-slate-600 hover:text-red-600 transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/careers"
                className="text-slate-600 hover:text-red-600 transition-colors font-medium"
              >
                Careers
              </Link>
            </div>

            <div className="hidden md:flex items-center shrink-0">
              <button
                type="button"
                onClick={onBookConsultation}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Book 1 hr consultation
              </button>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-red-600 focus:outline-none focus:text-red-600 p-1"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden border-t border-slate-100 mt-3 pt-3 pb-2">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className="text-slate-600 hover:text-red-600 block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left rounded-lg hover:bg-slate-50"
                  >
                    {item.name}
                  </button>
                ))}
                <Link
                  to="/careers"
                  className="text-slate-600 hover:text-red-600 block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-lg hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>
                <div className="pt-3 px-1">
                  <button
                    type="button"
                    onClick={onBookConsultation}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full"
                  >
                    Book 1 hr consultation
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
