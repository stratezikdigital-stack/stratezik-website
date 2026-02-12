import { Link } from 'react-router-dom'

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const Footer = () => {
  const baseUrl = 'https://www.stratezik.com'
  const footerLinks = {
    services: [
      { name: 'Strategic Planning', href: `${baseUrl}/#services` },
      { name: 'Analytics & Data', href: `${baseUrl}/#services` },
      { name: 'Brand Strategy', href: `${baseUrl}/#services` },
      { name: 'Creative Campaigns', href: `${baseUrl}/#services` }
    ],
    company: [
      { name: 'About Stratezik', href: `${baseUrl}/#about` },
      { name: 'Team', href: `${baseUrl}/#team` },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: `${baseUrl}/#contact` }
    ],
    resources: [
      { name: 'Portfolio', href: `${baseUrl}/#portfolio` },
      { name: 'Case Studies', href: `${baseUrl}/#portfolio` },
      { name: 'Digital Marketing Services', href: `${baseUrl}/#services` },
      { name: 'Contact Stratezik', href: `${baseUrl}/#contact` }
    ]
  }

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <a href="https://www.stratezik.com/" className="focus:outline-none" aria-label="Stratezik digital marketing Canada - Home">
                <img
                  src="/stratezik logo/reverse logo@2x (2).png"
                  alt="Stratezik Digital Marketing Canada"
                  className="h-14 max-w-[180px] w-auto object-contain"
                />
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Stratezik digital marketing Canada. Strategic digital marketing that thinks several moves ahead.
              Every campaign planned with chess master precision.
            </p>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/stratezik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Stratezik on LinkedIn"
            >
              <LinkedInIcon />
              <span className="text-sm">Follow us on LinkedIn</span>
            </a>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-red-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  {link.href === '/careers' ? (
                    <Link to="/careers" className="hover:text-red-600 transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-red-600 transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <ul className="space-y-2 text-slate-400">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-red-600 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://www.linkedin.com/company/stratezik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Stratezik Digital Marketing. All rights reserved. Stratezik digital marketing Canada—every move strategic, every campaign victorious.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
