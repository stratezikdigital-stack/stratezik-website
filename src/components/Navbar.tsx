import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', isHome: true },
    { name: 'Services', href: '#services', isHome: false },
    { name: 'Portfolio', href: '#portfolio', isHome: false },
    { name: 'About', href: '#about', isHome: false },
    { name: 'Contact', href: '#contact', isHome: false },
  ]

  const handleNavClick = (item: any) => {
    setIsOpen(false)
    if (item.isHome) {
      // Navigate to home page
      window.location.href = '/'
    } else {
      // Scroll to section on current page
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/stratezik logo/vertical logo (1).png" alt="Stratezik Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Get Your Free 1-Hour Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-red-600 focus:outline-none focus:text-red-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-slate-600 hover:text-red-600 block px-3 py-2 text-base font-medium transition-colors duration-200 w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/careers"
                className="text-slate-600 hover:text-red-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Careers
              </Link>
              <div className="pt-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors w-full">
                  Get Your Free 1-Hour Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
