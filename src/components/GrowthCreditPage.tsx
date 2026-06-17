import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { GROWTH_CREDIT_FAQS } from '../growth-credit/growthCreditFaqs'

const CTA_LABEL = 'Claim your credit'

const PILLARS = [
  {
    index: '01',
    title: 'Dominate local search and Google Maps',
    desc: 'We manage your Google Business Profile so you rank in the map pack when nearby customers search. One past client moved from rank 60+ to top 5 in four months.',
  },
  {
    index: '02',
    title: 'Scale paid advertising on Google and social',
    desc: 'Campaigns built around real customer intent, not generic templates. Every dollar is tracked, tested, and optimized for measurable return.',
  },
  {
    index: '03',
    title: 'Maximize delivery app revenue',
    desc: 'Uber Eats, Skip, DoorDash, Fantuan: we optimize your presence on the platforms where customers already order, so you capture more volume with less guesswork.',
  },
  {
    index: '04',
    title: 'Full-funnel reporting and accountability',
    desc: 'Monthly reports on what your credit produces: impressions, calls, orders, leads, and ROI. No vanity metrics.',
  },
] as const

const STEPS = [
  {
    num: '01',
    title: 'Submit your Growth Assessment request',
    desc: 'Fill in the form below. Takes under 60 seconds. No commitment required to qualify. We review every submission before reaching out.',
  },
  {
    num: '02',
    title: 'Free 20-minute Growth Assessment',
    desc: 'A Stratezik specialist reviews your digital presence: local search visibility, ad activity, delivery app footprint. We identify where the biggest opportunities are. No obligation to move forward.',
  },
  {
    num: '03',
    title: 'Credits applied to your onboarding plan',
    desc: 'If we are a fit, your $3,000 credit is applied directly against your first months of service. Your specialist walks you through how it maps to your plan before you sign anything.',
  },
] as const

const BUSINESS_TYPES = [
  'Restaurant / Food & Beverage',
  'Retail',
  'Professional Services',
  'Health & Wellness',
  'Home Services',
  'E-Commerce',
  'Other',
] as const

export default function GrowthCreditPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    business: '',
    email: '',
    phone: '',
    businessType: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const protection = useFormProtection()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!protection.canSubmit) {
      setSubmitError('Please complete the security check and try again.')
      return
    }
    setSubmitError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/growth-credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ...protection.spamPayload(),
          website: protection.honeypot,
        }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }
      setSubmitted(true)
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    } catch (err) {
      console.error('[growth-credit] form error:', err)
      setSubmitError(
        err instanceof Error ? err.message : 'Sorry, something went wrong. Email dave@stratezik.com or call 437 525 4772.',
      )
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12">
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-10">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          <span className="text-ink" aria-current="page">
            Growth Credit
          </span>
        </nav>

        <header className="max-w-4xl mb-16 md:mb-20">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
            Exclusive growth program · qualifying businesses
          </div>
          <div className="hairline mt-3 pt-3 editorial-label">$3,000 Stratezik Growth Credit</div>
          <h1 className="mt-8 font-display text-display-2 md:text-[clamp(2.75rem,5.5vw,4rem)] text-ink leading-[1.02] tracking-[-0.04em]">
            <span className="text-oxblood">$3,000</span> in marketing credits for your next growth move.
          </h1>
          <p className="lead mt-8 max-w-2xl text-ink-700">
            Stratezik is extending $3,000 in Growth Credits to qualifying Canadian startups and SMBs,
            applied directly against onboarding so you start with momentum from day one.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#claim"
              data-cursor="cta"
              data-cursor-text="Claim"
              className="inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
            >
              {CTA_LABEL}
            </a>
            <a href="#how" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 hover:text-ink">
              See how it works &rarr;
            </a>
          </div>
          <dl className="mt-12 pt-8 hairline grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Credit value</dt>
              <dd className="mt-2 font-display text-2xl text-ink">$3,000</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Response</dt>
              <dd className="mt-2 font-display text-2xl text-ink">1 day</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Past client</dt>
              <dd className="mt-2 font-display text-2xl text-ink">168×</dd>
              <dd className="text-xs text-ink-500 mt-1">organic impression growth</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Past client</dt>
              <dd className="mt-2 font-display text-2xl text-ink">Top 5</dd>
              <dd className="text-xs text-ink-500 mt-1">map pack in 4 months</dd>
            </div>
          </dl>
        </header>
      </div>

      <section className="border-t border-ink/10 bg-cream-50/50">
        <div className="container-custom px-6 md:px-12 py-16 md:py-20 max-w-5xl">
          <div className="editorial-label text-oxblood">What your credit covers</div>
          <h2 className="mt-4 font-display text-display-3 text-ink tracking-tight max-w-2xl">
            Every channel that compounds local growth.
          </h2>
          <p className="mt-5 text-ink-600 leading-relaxed max-w-xl">
            Your $3,000 credit is applied across the services that move the needle for Canadian SMBs,
            from the first Google search to the moment a customer orders.
          </p>
          <ul className="mt-12 border-t border-ink/10">
            {PILLARS.map((p) => (
              <li
                key={p.index}
                className="grid md:grid-cols-[3rem_1fr_1.2fr] gap-4 md:gap-8 py-8 border-b border-ink/10"
              >
                <span className="font-mono text-[11px] text-oxblood tracking-widest">{p.index}</span>
                <span className="font-display text-lg text-ink tracking-tight">{p.title}</span>
                <span className="text-ink-600 text-sm leading-relaxed md:col-start-3">{p.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-oxblood text-cream" aria-label="Credit amount">
        <div className="container-custom px-6 md:px-12 py-14 md:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div>
            <p className="font-display text-[clamp(3rem,8vw,5rem)] leading-none tracking-[-0.04em]">$3,000</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
              Stratezik Growth Credit · Applied to your retainer
            </p>
          </div>
          <ul className="space-y-3 max-w-md text-cream/90 text-sm leading-relaxed">
            <li>Reduces what you pay during your first months of service</li>
            <li>Covers local search, paid ads, and delivery platforms</li>
            <li>One roadmap, clear KPIs, weekly rhythm</li>
            <li>Available to qualifying Canadian startups and SMBs</li>
          </ul>
        </div>
      </section>

      <section id="how" className="container-custom px-6 md:px-12 py-16 md:py-20 max-w-5xl">
        <div className="editorial-label text-oxblood">How it works</div>
        <h2 className="mt-4 font-display text-display-3 text-ink tracking-tight">
          Three steps from today to your credits.
        </h2>
        <p className="mt-5 text-ink-600 max-w-lg">
          The process is straightforward. It starts with one conversation.
        </p>
        <ol className="mt-12 border-t border-ink/10 list-none">
          {STEPS.map((s) => (
            <li key={s.num} className="grid md:grid-cols-[3rem_1fr] gap-4 py-8 border-b border-ink/10">
              <span className="font-mono text-[11px] text-ink-400 tracking-widest">{s.num}</span>
              <div>
                <h3 className="font-display text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-ink/10 bg-ink text-cream">
        <div className="container-custom px-6 md:px-12 py-16 md:py-20 max-w-4xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/80">Client voice</div>
          <h2 className="mt-4 font-display text-display-3 tracking-tight leading-[1.05]">
            &ldquo;They built it like a product, not a one-off campaign.&rdquo;
          </h2>
          <blockquote className="mt-10 border border-cream/15 bg-cream/[0.04] p-8 md:p-10">
            <p className="font-display text-lg md:text-xl leading-snug text-cream tracking-[-0.02em]">
              We went live with a new site and{' '}
              <span className="text-gold/95">zero ad history</span>, basically invisible in one of the toughest local
              markets in the country. Stratezik refused the generic &ldquo;pest control&rdquo; catch-all. They split the
              account by service line, hunted junk queries every week, and put CPL targets in front of volume games.{' '}
              <span className="text-cream/90">
                Eleven months later we had north of seven hundred paid conversions at a cost per lead most competitors
                cannot touch, and organic finally woke up behind it.
              </span>
            </p>
            <footer className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-t border-cream/15 pt-8">
              <div>
                <div className="font-display text-lg text-cream">Insectica Pest Control Inc.</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/50">
                  Residential &amp; commercial · GTA
                </div>
              </div>
              <Link
                to="/blog/insectica-gta-pest-control-scaling-case-study?utm_source=growth-credit&utm_medium=cta"
                className="inline-flex items-center gap-2 border border-cream/35 text-cream px-6 py-3 font-medium text-sm hover:border-cream hover:bg-cream/10 transition-colors"
              >
                Read the full story
              </Link>
            </footer>
          </blockquote>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/40 leading-relaxed max-w-2xl">
            Paraphrased from leadership feedback during the engagement; metrics align with Google Ads, Search Console,
            and GA4 reporting in the portfolio case study.
          </p>
        </div>
      </section>

      <section id="claim" className="border-t border-ink/10">
        <div className="container-custom px-6 md:px-12 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            <div>
              <div className="editorial-label text-oxblood">Claim your credit</div>
              <h2 className="mt-4 font-display text-display-3 text-ink tracking-tight">
                Request your free Growth Assessment.
              </h2>
              <p className="mt-6 text-ink-600 leading-relaxed">
                Submit your details and a Client Growth Specialist contacts you within one business day
                for a free 20-minute audit of your digital presence. No pitch decks. No obligation.
              </p>
              <p className="mt-4 text-ink-600 leading-relaxed">
                If we are a fit, your $3,000 credit is applied directly to your onboarding plan.
              </p>
              <ul className="mt-8 space-y-2 text-sm text-ink-500 border-t border-ink/10 pt-8">
                <li>Response within 1 business day</li>
                <li>No lock-in required to qualify</li>
                <li>Assessment is free with zero obligation</li>
                <li>Limited spots for this program</li>
              </ul>
            </div>

            <div className="card-editorial p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-oxblood text-cream flex items-center justify-center mx-auto font-display text-xl">
                    ✓
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink">You are on the list.</h3>
                  <p className="mt-3 text-ink-600 text-sm leading-relaxed">
                    A Stratezik specialist will reach out within one business day to schedule your free
                    Growth Assessment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gc-first" className="editorial-label block mb-2">
                        First name
                      </label>
                      <input
                        id="gc-first"
                        name="firstName"
                        type="text"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="input-editorial w-full"
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="gc-last" className="editorial-label block mb-2">
                        Last name
                      </label>
                      <input
                        id="gc-last"
                        name="lastName"
                        type="text"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="input-editorial w-full"
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gc-biz" className="editorial-label block mb-2">
                      Business name
                    </label>
                    <input
                      id="gc-biz"
                      name="business"
                      type="text"
                      required
                      value={form.business}
                      onChange={handleChange}
                      className="input-editorial w-full"
                      autoComplete="organization"
                    />
                  </div>
                  <div>
                    <label htmlFor="gc-email" className="editorial-label block mb-2">
                      Business email
                    </label>
                    <input
                      id="gc-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="input-editorial w-full"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="gc-phone" className="editorial-label block mb-2">
                      Phone number
                    </label>
                    <input
                      id="gc-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="input-editorial w-full"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label htmlFor="gc-type" className="editorial-label block mb-2">
                      Business type
                    </label>
                    <select
                      id="gc-type"
                      name="businessType"
                      required
                      value={form.businessType}
                      onChange={handleChange}
                      className="input-editorial w-full"
                    >
                      <option value="" disabled>
                        Select your industry
                      </option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <FormProtectionFields
                    turnstileSiteKey={protection.turnstileSiteKey}
                    onTurnstileSuccess={protection.setTurnstileToken}
                    onTurnstileExpire={protection.resetTurnstile}
                    turnstileResetKey={turnstileKey}
                    honeypotValue={protection.honeypot}
                    onHoneypotChange={protection.setHoneypot}
                  />
                  {submitError && <p className="font-mono text-sm text-oxblood">{submitError}</p>}
                  <button
                    type="submit"
                    disabled={submitting || !protection.canSubmit}
                    className="w-full mt-2 bg-ink text-cream py-3.5 font-medium hover:bg-oxblood transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : CTA_LABEL}
                  </button>
                  <p className="text-[11px] text-ink-400 text-center leading-relaxed">
                    Your information stays private. By submitting you agree to be contacted by a
                    Stratezik specialist.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="growth-credit-faq" className="container-custom px-6 md:px-12 py-16 md:py-20 max-w-3xl">
        <div className="editorial-label text-oxblood">Questions</div>
        <h2 className="mt-4 font-display text-display-3 text-ink tracking-tight">
          What to know before you apply.
        </h2>
        <div className="mt-10 border-t border-ink/10">
          {GROWTH_CREDIT_FAQS.map((faq, i) => (
            <details
              key={faq.question}
              className="border-b border-ink/10 group"
              open={openFaq === i}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpenFaq(i)
              }}
            >
              <summary className="py-5 cursor-pointer list-none flex justify-between gap-4 font-display text-ink">
                {faq.question}
                <span className="text-oxblood font-mono shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="pb-5 text-ink-600 text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
