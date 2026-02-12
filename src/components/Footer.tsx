import { Link } from 'react-router-dom'

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
                <img src="/stratezik logo/reverse logo@2x (2).png" alt="Stratezik Digital Marketing Canada" className="h-20 w-auto" />
              </a>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Stratezik digital marketing Canada. Strategic digital marketing that thinks several moves ahead.
              Every campaign planned with chess master precision.
            </p>
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
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
          <p>© 2024 Stratezik Digital Marketing. All rights reserved. Stratezik digital marketing Canada—every move strategic, every campaign victorious.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
