import { Link } from 'react-router-dom'
import { services } from '../services/services'
import LatestInsightsSection from '../components/LatestInsightsSection'
import { HomeFaqSection } from '../components/HomeFaqSection'
import { GrowthCreditHomeBanner } from '../components/GrowthCreditHomeBanner'

const QUOTE_HREF = '/#contact-form'

/** Static homepage body for build-time HTML (no Three.js / Lenis). */
export function PrerenderHomePage() {
  return (
    <>
      <section id="home" className="relative min-h-[70vh] bg-cream" aria-label="Hero introduction">
        <div className="container-custom px-6 md:px-12 pt-8 pb-16 md:pb-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-8">
            Toronto studio · digital growth
          </div>
          <h1 className="font-display text-ink max-w-[58rem]">
            <span className="block font-medium tracking-[-0.04em] leading-[0.98] text-[clamp(2.85rem,8vw,4.5rem)]">
              Toronto digital marketing agency
            </span>
            <span className="block mt-3 italic font-normal text-oxblood tracking-[-0.035em] text-[clamp(1.65rem,4.5vw,2.75rem)]">
              for startups &amp; SMBs.
            </span>
          </h1>
          <p className="lead mt-8 max-w-2xl text-ink-700">
            We help Toronto startups and SMBs accelerate growth through integrated campaigns across SEO, PPC, social
            media, and growth marketing — one roadmap, fewer handoffs, clearer KPIs.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to={QUOTE_HREF}
              className="inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
            >
              Book a free 30-minute consultation
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Toronto · Scarborough · GTA
            </span>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 md:py-32 bg-ink text-cream border-y border-cream/10">
        <div className="container-custom px-6 md:px-12">
          <div className="grid grid-cols-12 gap-4 mb-12">
            <div className="col-span-12 md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/45">Services</div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <h2 className="font-display text-display-3 md:text-display-2 text-cream leading-[1.02] tracking-[-0.035em]">
                Integrated channels, one growth playbook.
              </h2>
              <p className="lead mt-6 text-cream/75 max-w-2xl">
                Paid search, SEO &amp; answer-engine optimisation, Google Business Profile, social, brand strategy, web
                design, and AI agents — built for operators who need measurable demand, not slide decks.
              </p>
              <Link
                to="/services"
                className="mt-6 inline-flex font-mono text-[11px] uppercase tracking-[0.22em] text-gold hover:text-cream transition-colors"
              >
                View all services &rarr;
              </Link>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service) => (
              <li key={service.slug} className="border border-cream/15 bg-cream/5">
                <Link to={`/services/${service.slug}`} className="block p-6 md:p-8 hover:bg-cream/10 transition-colors">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50">{service.serviceType}</p>
                  <h3 className="mt-2 font-display text-2xl text-cream tracking-tight">{service.primaryKeyword}</h3>
                  <p className="mt-4 text-cream/75 leading-relaxed text-sm">{service.metaDescription}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GrowthCreditHomeBanner />

      <LatestInsightsSection />
      <HomeFaqSection />

      <section id="contact" className="py-24 md:py-32 bg-cream border-t border-ink/10">
        <div className="container-custom px-6 md:px-12 max-w-3xl">
          <h2 className="font-display text-display-3 text-ink tracking-tight">Start the conversation</h2>
          <p className="lead mt-6 text-ink-700">
            Share goals, timelines, and budgets. We reply within one business day and, when there&rsquo;s a fit, schedule
            a focused strategy call.
          </p>
          <ul className="mt-8 space-y-3 text-ink-700">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:dave@stratezik.com" className="text-oxblood hover:text-ink underline underline-offset-4">
                dave@stratezik.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a href="tel:+14375254772" className="text-oxblood hover:text-ink underline underline-offset-4">
                +1 (437) 525-4772
              </a>
            </li>
            <li>
              <strong>Studio:</strong> 2466 Eglinton Ave E, Toronto, ON, Canada
            </li>
          </ul>
          <Link
            to={QUOTE_HREF}
            className="mt-10 inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
          >
            Book consultation
          </Link>
        </div>
      </section>
    </>
  )
}
