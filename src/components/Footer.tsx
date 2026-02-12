import { Link } from 'react-router-dom'

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/stratezik/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Stratezik on LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://share.google/VEBDLnS7ZRK7cxRV9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Stratezik on Google Business Profile"
                title="Google Business Profile"
              >
                <GoogleIcon />
              </a>
            </div>
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
              <li>
                <a
                  href="https://share.google/VEBDLnS7ZRK7cxRV9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <GoogleIcon />
                  Google Business
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
