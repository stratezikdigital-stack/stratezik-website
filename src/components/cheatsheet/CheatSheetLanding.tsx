import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FormProtectionFields } from '../spam/FormProtectionFields'
import { EmailTypoHint } from '../spam/EmailTypoHint'
import { useFormProtection } from '../../lib/spam/useFormProtection'
import { CheatSheetHeader } from './CheatSheetHeader'

interface Tile {
  stat: string
  caption: string
  source: string
}

const OUR_TILES: Tile[] = [
  { stat: '$250 → $35', caption: 'CPM vs Google Search — 86% cheaper impressions', source: 'Stratezik campaign data' },
  { stat: '+46% CTR', caption: 'vs our own Google Search campaigns', source: 'Stratezik campaign data' },
  { stat: '~10× cheaper clicks', caption: 'what those two numbers compound to*', source: 'Derived: 7.1× CPM × 1.46 CTR ≈ 10.4× effective CPC' },
]

const SUPPORT_TILES: Tile[] = [
  { stat: '$30 → $3–8', caption: 'B2B SaaS CPC, Google vs ChatGPT', source: 'TripleDart (B2B SaaS client campaigns)' },
  { stat: '$2.00 → $0.40', caption: 'CPC after CTR optimization', source: 'David Melamed' },
  { stat: '+50% ROAS', caption: 'from cutting 8 context hints to 1', source: 'Opascope ($100K spend)' },
]

const INSIDE = [
  ['Context hints', 'The new keyword — written in buyer language, one intent per ad group.'],
  ['Bid-floor testing', 'The platform recommends ~$60 CPM. Early spenders found $8 still delivers.'],
  ['The CTR game', '2009 affiliate-era mechanics, played on a 2026 platform — with judgment.'],
  ['Conversational landing pages', 'The click arrives mid-conversation. Your page must read like the next message.'],
  ['The measurement stack', 'Pixel in the head, Conversions API, a GA4 channel, CallRail for calls.'],
]

const VERTICALS = [
  { value: 'beauty', label: 'Beauty & personal care' },
  { value: 'ecommerce', label: 'E-commerce & DTC' },
  { value: 'b2b-saas', label: 'B2B SaaS' },
  { value: 'travel', label: 'Travel & hospitality' },
  { value: 'education', label: 'Online education & coaching' },
  { value: 'fitness', label: 'Fitness & wellness' },
  { value: 'legal', label: 'Professional & legal services' },
  { value: 'local-services', label: 'Local & home services' },
  { value: 'finance', label: 'Finance & insurance' },
  { value: 'agency', label: 'Agency' },
  { value: 'other', label: 'Other' },
]

function TileCard({ t, accent }: { t: Tile; accent?: boolean }) {
  return (
    <div className={`card-editorial ${accent ? 'border-oxblood/40 bg-oxblood-50/40' : ''}`}>
      <div className={`font-display text-3xl md:text-4xl tracking-[-0.03em] ${accent ? 'text-oxblood' : 'text-ink'}`}>
        {t.stat}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.caption}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400" title={t.source}>
        {t.source}
      </p>
    </div>
  )
}

export function CheatSheetLanding({ peek }: { peek: string }) {
  const formRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [vertical, setVertical] = useState('')
  const [consent, setConsent] = useState(false)
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [error, setError] = useState('')
  const [guideUrl, setGuideUrl] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [turnstileKey, setTurnstileKey] = useState(0)
  const protection = useFormProtection()

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!firstName.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!businessName.trim()) {
      setError('Please enter your business name.')
      return
    }
    if (!consent) {
      setError('Please tick the consent box so we can send the cheat sheet.')
      return
    }
    if (!protection.canSubmit) {
      setError('Please complete the security check and try again.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/guide-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          businessName,
          vertical,
          consent,
          company,
          ...protection.spamPayload(),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.')
        setStatus('idle')
        return
      }
      setGuideUrl(data.guideUrl || '')
      setEmailSent(Boolean(data.emailSent))
      setStatus('done')
      ;(window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
        event: 'guide_lead',
        guide: 'chatgpt-ads-cheat-sheet',
      })
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    } catch {
      setError('Network error. Try again.')
      setStatus('idle')
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
    }
  }

  return (
    <main className="cheatsheet-shell min-h-screen">
      <CheatSheetHeader
        maxWidth="max-w-5xl"
        trailing={
          <Link
            to="/services/paid-search"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:text-oxblood"
          >
            Paid Search →
          </Link>
        }
      />

      <section className="cheatsheet-landing-hero container-custom mx-auto max-w-5xl px-6 pt-10 md:px-10 md:pt-14">
        <div className="editorial-label">Free cheat sheet · Toronto’s most forward ChatGPT Ads agency</div>
        <h1 className="mt-5 max-w-4xl font-display text-display-3 leading-[1.02] tracking-[-0.035em] text-ink md:text-[3.5rem]">
          ChatGPT Ads is Google Ads in 2002. The window is open.
        </h1>
        <p className="lead mt-7 max-w-2xl">
          We’re buying clicks roughly <strong>10× cheaper</strong> than Google Search. This is the
          playbook — context hints, bid-floor testing, CTR plays, and the tracking stack. Free, in
          your inbox.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="button" onClick={scrollToForm} className="btn-primary">
            Get the cheat sheet
          </button>
          <p className="max-w-md text-sm leading-relaxed text-ink-500">
            OpenAI is already testing multi-advertiser placements. The uncrowded auction won’t last.
          </p>
        </div>
      </section>

      <section className="container-custom mx-auto mt-16 max-w-5xl px-6 md:mt-20 md:px-10">
        <div className="editorial-label">Stratezik campaign data</div>
        <p className="mt-3 max-w-2xl text-ink-700">
          We run ChatGPT Ads for ourselves and for SaaS and other clients across Canada — and we’ve
          seen it work. Our own numbers lead; what other early spenders report backs them up.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {OUR_TILES.map((t) => (
            <TileCard key={t.stat} t={t} accent />
          ))}
        </div>
        <p className="mt-4 max-w-3xl font-mono text-[11px] leading-relaxed text-ink-400">
          * Effective CPC = CPM ÷ CTR. Impressions at a seventh of the price (7.1×) clicked 46% more
          often (1.46×) work out to <strong className="text-ink-500">≈ 10.4× cheaper clicks</strong>.
          That’s not a projection — it’s division.
        </p>

        <div className="mt-10 editorial-label">What other early spenders report</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {SUPPORT_TILES.map((t) => (
            <TileCard key={t.stat} t={t} />
          ))}
        </div>
      </section>

      <section className="container-custom mx-auto mt-20 max-w-5xl px-6 md:px-10">
        <div className="hairline pt-8" />
        <h2 className="font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
          What’s inside: the five levers
        </h2>
        <p className="lead mt-5 max-w-2xl">
          Strip away everything ChatGPT Ads doesn’t have — no keyword research, no audience builder,
          no device split — and exactly five things stay under your control.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {INSIDE.map(([title, desc], i) => (
            <div key={title} className="bg-cream-50 p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-oxblood">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-xl text-ink">{title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Plus: the 30-60-90 plan, the six mistakes killing early accounts, and a readiness read on
          nine categories — from beauty and B2B SaaS to finance — so you know if yours is ready now.
        </p>
      </section>

      <section className="container-custom mx-auto mt-20 max-w-3xl px-6 md:px-10">
        <div className="editorial-label">Start reading — no email needed</div>
        <article className="cheatsheet-prose mt-6 font-sans">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{peek}</ReactMarkdown>
        </article>
      </section>

      <section ref={formRef} className="container-custom mx-auto mt-2 max-w-3xl px-6 md:px-10">
        <div className="relative -mb-6 select-none" aria-hidden="true">
          <div className="bg-gradient-to-b from-transparent to-cream pb-10">
            <h3 className="font-display text-2xl text-ink/70 blur-[6px]">
              Lever 1 — Context hints: the new keyword, written in buyer language…
            </h3>
            <p className="mt-3 text-ink/60 blur-[6px]">
              Context hints are plain-language descriptions of the conversations where your ad
              belongs. Not keywords, not personas. The rules that are producing results…
            </p>
          </div>
        </div>

        {status === 'done' ? (
          <div className="card-editorial border-oxblood/40 bg-oxblood-50/40">
            <div className="editorial-label text-oxblood">You’re in</div>
            <h3 className="mt-3 font-display text-2xl text-ink">
              {emailSent ? 'Check your inbox.' : 'Here’s your cheat sheet.'}
            </h3>
            <p className="mt-3 text-ink-700">
              {emailSent
                ? 'We just emailed you the full cheat sheet. While that lands, read it right here:'
                : 'Read the full cheat sheet right here — and we’ll keep a copy in your inbox shortly:'}
            </p>
            <Link to={guideUrl} className="btn-primary mt-5 inline-flex">
              Read the full cheat sheet →
            </Link>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Tip: the web version has a “Save as PDF” button at the top.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-editorial">
            <h3 className="font-display text-2xl text-ink">
              Read the other four levers — and how to pull them.
            </h3>
            <p className="mt-2 text-sm text-ink-700">
              Everything below this point — all five lever chapters, the measurement stack, the
              industry plays, the 30-60-90 plan — is in the full guide. Tell us where to send it.
            </p>

            <FormProtectionFields
              turnstileSiteKey={protection.turnstileSiteKey}
              onTurnstileSuccess={protection.setTurnstileToken}
              onTurnstileExpire={protection.resetTurnstile}
              turnstileResetKey={turnstileKey}
              honeypotName="company"
              honeypotValue={company}
              onHoneypotChange={setCompany}
            />

            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className="input-editorial"
              />
              <EmailTypoHint email={email} onAccept={setEmail} />
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  autoComplete="given-name"
                  className="input-editorial"
                />
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Business name"
                  required
                  autoComplete="organization"
                  className="input-editorial"
                />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                  className="input-editorial text-ink"
                  aria-label="What are you advertising?"
                >
                  <option value="">What are you advertising? (optional)</option>
                  {VERTICALS.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-700">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-oxblood"
              />
              <span>
                Send me the cheat sheet plus occasional ChatGPT Ads and AI-search insights from
                Stratezik, as described in our{' '}
                <Link to="/privacy" className="text-oxblood underline underline-offset-2">
                  Privacy Notice
                </Link>
                . Unsubscribe anytime.
              </span>
            </label>

            {error && <p className="mt-4 font-mono text-sm text-oxblood">{error}</p>}

            <FormProtectionFields
              turnstileSiteKey={protection.turnstileSiteKey}
              onTurnstileSuccess={protection.setTurnstileToken}
              onTurnstileExpire={protection.resetTurnstile}
              turnstileResetKey={turnstileKey}
              honeypotName="company"
              honeypotValue={company}
              onHoneypotChange={setCompany}
            />

            <button
              type="submit"
              disabled={status === 'loading' || !protection.canSubmit}
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              {status === 'loading' ? 'Sending…' : 'Send me the cheat sheet'}
            </button>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Instant access · No spam · CASL-compliant
            </p>
          </form>
        )}
      </section>

      <section className="container-custom mx-auto mt-20 max-w-5xl px-6 pb-20 md:px-10">
        <div className="hairline pt-8" />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="editorial-label">Who’s behind this</div>
            <p className="mt-4 text-ink-700">
              Stratezik is a Toronto marketing agency that runs on its own AI agent system. We were
              early to AEO and AI-citation tracking, and we run ChatGPT Ads for ourselves and clients
              across Canada. Our paid media lead has managed{' '}
              <strong className="text-ink">$10M+ in annual ad spend</strong> and is a{' '}
              <strong className="text-ink">Google Search Honours Award</strong> recipient.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Byline — Shah Md. Rifat
            </p>
            <Link to="/services/paid-search" className="btn-secondary mt-6 inline-flex">
              See how we run paid search
            </Link>
          </div>
          <div className="card-editorial">
            <div className="editorial-label">Also free from Stratezik</div>
            <h3 className="mt-3 font-display text-xl text-ink">AEO Readiness Checker</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              The same answer-first page that converts ChatGPT ad clicks is the page that wins
              organic AI citations. Score yours on the 20-Point AEO Readiness Test — instantly, on
              screen.
            </p>
            <Link
              to="/aeo-checker?utm_source=chatgpt-cheat-sheet&utm_medium=cta"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood hover:underline"
            >
              Check my site →
            </Link>
          </div>
        </div>
      </section>

      <footer className="container-custom mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <div className="hairline pt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          Stratezik Digital · Toronto, ON · Every statistic on this page carries its source · dave@stratezik.com
        </div>
      </footer>
    </main>
  )
}
