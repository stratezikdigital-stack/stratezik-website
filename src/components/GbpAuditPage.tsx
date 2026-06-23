
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { resolveIndustry, sub } from '../gbp/industryEngine'

const BOOK_URL = '/#contact'
const ROADMAP_PRICE = '$29'

const inputClass = 'input-editorial w-full'
const btnPrimary = 'btn-primary w-full disabled:opacity-60'
const btnSecondary = 'btn-secondary disabled:opacity-60'
const cardClass = 'card-editorial'
const panelInk = 'aeo-panel-ink'
const panelAccent = 'aeo-panel-accent'
const panelNested = 'aeo-panel-nested'

const EXAMPLE_CHIPS = [
  { label: 'Plumber', value: 'Plumber' },
  { label: 'HVAC', value: 'HVAC' },
  { label: 'Dentist', value: 'Dentist' },
  { label: 'Restaurant', value: 'Restaurant' },
  { label: 'Hair salon', value: 'Hair salon' },
  { label: 'Auto repair', value: 'Auto repair' },
  { label: 'Law firm', value: 'Law firm' },
  { label: 'Pest control', value: 'Pest control' },
]

const SWITCH_CHIPS = ['Plumber', 'Dentist', 'Restaurant', 'Law firm', 'Hair salon', 'Tutoring centre']

type Winner = {
  rank: string
  name: string
  rating: string
  reviews: number
  badge: string
}

type QuickWin = {
  n: string
  tag: string
  impactTag: string
  title: string
  lossLine: string
  hasCopy: boolean
  fixLabel?: string
  fixText?: string
  where: string
}

type Pillar = { name: string; weight: string; score: number; note: string }
type CompGap = { metric: string; you: string; them: string; youN: number; themN: number }
type RoadmapStep = { weeks: string; title: string; desc: string }

type Topline = {
  scanId: string
  businessName: string
  city: string
  industry: string
  industryDisplay: string
  score: number
  grade: string
  verdict: string
  rankNum: number
  rankWord: string
  query: string
  found: boolean
  dataSource: 'places' | 'template'
  youRating: string
  youReviews: number
  moneyLine: string
  winners: Winner[]
  quickWins: QuickWin[]
  gapText: string
  headline: string
  mapsUri: string | null
  persisted?: boolean
  storageError?: boolean
  storageHint?: string
}

type Phase = 'input' | 'scanning' | 'results'

function scoreTone(score: number): 'good' | 'mid' | 'low' {
  if (score >= 75) return 'good'
  if (score >= 55) return 'mid'
  return 'low'
}

function scoreTextClass(score: number): string {
  const t = scoreTone(score)
  return t === 'good' ? 'text-oxblood' : t === 'mid' ? 'text-gold' : 'text-oxblood-700'
}

function scoreStroke(score: number): string {
  const t = scoreTone(score)
  return t === 'good' ? '#7a1f1f' : t === 'mid' ? '#c9a227' : '#a33a2a'
}

export default function GbpAuditPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const protection = useFormProtection()

  const [phase, setPhase] = useState<Phase>('input')
  const [biz, setBiz] = useState('')
  const [city, setCity] = useState('')
  const [industry, setIndustry] = useState('Pest control')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [topline, setTopline] = useState<Topline | null>(null)
  const [pillars, setPillars] = useState<Pillar[] | null>(null)
  const [compGaps, setCompGaps] = useState<CompGap[] | null>(null)
  const [revenueLine, setRevenueLine] = useState('')
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null)
  const [topCompetitor, setTopCompetitor] = useState('')
  const [emailUnlocked, setEmailUnlocked] = useState(false)
  const [deepUnlocked, setDeepUnlocked] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [storageWarning, setStorageWarning] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const ctx = useMemo(() => {
    const cityShort = (city || 'Scarborough').split(',')[0]
    const trade = topline?.industryDisplay ?? industry
    return { biz: biz || topline?.businessName || trade, city: cityShort, trade }
  }, [biz, city, industry, topline])

  const runScan = useCallback(async () => {
    if (!protection.canSubmit) {
      setError('Complete the bot check below, then try again.')
      return
    }
    if (!city.trim()) {
      setError('Enter your city — e.g. Scarborough, ON.')
      return
    }
    setError(null)
    setPhase('scanning')
    setEmailUnlocked(false)
    setDeepUnlocked(false)
    setPillars(null)
    setStorageWarning(null)

    try {
      const res = await fetch('/api/gbp-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: biz.trim(),
          city: city.trim(),
          industry: industry.trim() || 'Local business',
          website: protection.honeypot,
          ...protection.spamPayload(),
        }),
      })
      const data = (await res.json()) as Topline & { error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Scan failed')
      setTopline(data)
      setStorageWarning(
        data.storageError
          ? data.storageHint ??
              'Results shown, but this scan was not saved — email unlock needs the gbp_scans table in Supabase.'
          : null,
      )
      setPhase('results')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scan failed')
      setPhase('input')
    } finally {
      void protection.refreshFormToken()
    }
  }, [biz, city, industry, protection])

  const submitEmail = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!topline || !protection.canSubmit) return
      if (!consent) {
        setError('Please confirm CASL consent to receive your breakdown.')
        return
      }
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/gbp-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scanId: topline.scanId,
            email,
            consent: true,
            source: 'gbp-audit',
            website: protection.honeypot,
            ...protection.spamPayload(),
          }),
        })
        const data = (await res.json()) as {
          pillars?: Pillar[]
          competitorGaps?: CompGap[]
          revenueLine?: string
          roadmap?: RoadmapStep[]
          topCompetitor?: string
          error?: string
        }
        if (!res.ok) throw new Error(data.error ?? 'Could not save email')
        setPillars(data.pillars ?? null)
        setCompGaps(data.competitorGaps ?? null)
        setRevenueLine(data.revenueLine ?? '')
        setRoadmap(data.roadmap ?? null)
        setTopCompetitor(data.topCompetitor ?? '')
        setEmailUnlocked(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
        protection.resetTurnstile()
        void protection.refreshFormToken()
      }
    },
    [topline, email, consent, protection],
  )

  const startCheckout = useCallback(async () => {
    if (!topline || !email) {
      setError('Enter your email above first — we need it to deliver the roadmap.')
      return
    }
    setCheckoutLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/gbp-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scanId: topline.scanId,
          email,
          website: protection.honeypot,
          ...protection.spamPayload(),
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setCheckoutLoading(false)
    }
  }, [topline, email, protection])

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const scanId = searchParams.get('scanId')
    if (!sessionId || !scanId) return

    void (async () => {
      try {
        const res = await fetch('/api/gbp-unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, scanId }),
        })
        const data = (await res.json()) as {
          unlocked?: boolean
          competitorGaps?: CompGap[]
          revenueLine?: string
          roadmap?: RoadmapStep[]
          topCompetitor?: string
          error?: string
        }
        if (!res.ok) throw new Error(data.error ?? 'Unlock failed')
        setCompGaps(data.competitorGaps ?? null)
        setRevenueLine(data.revenueLine ?? '')
        setRoadmap(data.roadmap ?? null)
        setTopCompetitor(data.topCompetitor ?? '')
        setDeepUnlocked(true)
        setEmailUnlocked(true)
        setPhase('results')

        const fullRes = await fetch('/api/gbp-full', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scanId }),
        })
        const full = (await fullRes.json()) as { pillars?: Pillar[] }
        if (fullRes.ok) setPillars(full.pillars ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment unlock failed')
      } finally {
        setSearchParams({}, { replace: true })
      }
    })()
  }, [searchParams, setSearchParams])

  const switchIndustry = (val: string) => {
    setIndustry(val)
    setEmailUnlocked(false)
    setDeepUnlocked(false)
    setPillars(null)
    if (topline && phase === 'results') {
      const r = resolveIndustry(val)
      setTopline({
        ...topline,
        industry: val,
        industryDisplay: r.display,
        quickWins: r.d.quickWins.map((q) => ({
          ...q,
          title: sub(q.title, ctx),
          lossLine: sub(q.lossLine, ctx),
          fixText: q.fixText ? sub(q.fixText, ctx) : undefined,
          where: sub(q.where, ctx),
        })),
      })
    }
  }

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      /* ignore */
    }
    setCopiedKey(key)
    window.setTimeout(() => setCopiedKey(null), 1600)
  }

  const scoreRing = topline ? 2 * Math.PI * 54 * (1 - topline.score / 100) : 0

  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="container-custom mx-auto max-w-5xl px-6 md:px-12 pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          <Link to="/" className="hover:text-oxblood transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">/</span>
          <Link to="/free-tools" className="hover:text-oxblood transition-colors">
            Free Tools
          </Link>
          <span className="mx-2 text-ink-300">/</span>
          <span className="text-ink-600">Local Visibility Scan</span>
        </nav>

        {phase === 'input' && (
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <header>
              <div className="editorial-label">Stratezik · Toronto &amp; GTA</div>
              <h1 className="mt-4 font-display text-display-3 md:text-[3rem] text-ink leading-[1.05] tracking-[-0.035em]">
                Find out why customers pick the shop{' '}
                <span className="text-oxblood">down the street</span> — not you.
              </h1>
              <p className="lead mt-8">
                Free Google Business Profile audit. See your Map Pack gap, get three copy-paste weekend fixes,
                and unlock a six-pillar score tuned to your industry. No login.
              </p>
              <ul className="mt-6 space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">
                <li className="flex items-center gap-2">
                  <span className="text-oxblood">✓</span> Live Maps data when available
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-oxblood">✓</span> Three fixes written for you
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-oxblood">✓</span> Industry-tailored recommendations
                </li>
              </ul>
            </header>

            <div className={cardClass}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                Scan your Google Business Profile
              </p>
              <label className="mt-5 block text-sm font-medium text-ink-700">Business name</label>
              <input
                className={`${inputClass} mt-1.5`}
                placeholder="e.g. ShieldGuard Pest Control"
                value={biz}
                onChange={(e) => setBiz(e.target.value)}
              />
              <label className="mt-4 block text-sm font-medium text-ink-700">City</label>
              <input
                className={`${inputClass} mt-1.5`}
                placeholder="e.g. Scarborough, ON"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label className="mt-4 block text-sm font-medium text-ink-700">
                Your industry <span className="font-normal text-ink-400">— type anything</span>
              </label>
              <input
                className={`${inputClass} mt-1.5`}
                placeholder="e.g. Plumber, Bakery, Law firm…"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLE_CHIPS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setIndustry(c.value)}
                    className="rounded-sm border border-ink/15 bg-cream px-2.5 py-1 text-xs font-medium text-ink-600 hover:border-oxblood hover:text-oxblood transition-colors"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {error ? <p className="mt-4 text-sm text-oxblood">{error}</p> : null}
              <FormProtectionFields
                turnstileSiteKey={protection.turnstileSiteKey}
                onTurnstileSuccess={protection.setTurnstileToken}
                onTurnstileExpire={protection.resetTurnstile}
                honeypotValue={protection.honeypot}
                onHoneypotChange={protection.setHoneypot}
              />
              <button
                type="button"
                className={`${btnPrimary} mt-4`}
                disabled={!protection.canSubmit}
                onClick={() => void runScan()}
              >
                Run my free scan →
              </button>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
                Free · ~60 seconds · No signup for your topline score
              </p>
            </div>
          </div>
        )}

        {phase === 'scanning' && (
          <div className={`${cardClass} mx-auto max-w-lg text-center`}>
            <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-2 border-ink/15 border-t-oxblood" />
            <h2 className="font-display text-2xl text-ink">Scanning {biz || industry}…</h2>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Pulling Google Maps data &amp; tailoring checks
            </p>
          </div>
        )}

        {phase === 'results' && topline && (
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-500">
                Audit for <span className="text-oxblood">{topline.industryDisplay}</span>
                {topline.dataSource === 'places' ? ' · live Maps data' : ' · industry template (Places API key missing or no match)'}
              </p>
              <div className="flex flex-wrap gap-2">
                {SWITCH_CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => switchIndustry(c)}
                    className={`rounded-sm border px-2.5 py-1 text-xs font-medium transition-colors ${
                      industry === c
                        ? 'border-oxblood bg-oxblood/10 text-oxblood'
                        : 'border-ink/15 text-ink-600 hover:border-oxblood'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {storageWarning ? (
              <p className="mb-6 border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink-700">{storageWarning}</p>
            ) : null}

            <div className={`${panelInk} grid items-center gap-8 md:grid-cols-[auto_1fr]`}>
              <div className="relative mx-auto h-36 w-36 shrink-0">
                <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(244,237,225,0.2)" strokeWidth="9" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={scoreStroke(topline.score)}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={339.3}
                    strokeDashoffset={scoreRing}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cream">
                  <span className="font-display text-5xl leading-none">{topline.score}</span>
                  <span className="font-mono text-[10px] tracking-widest text-cream/50">/ 100</span>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
                    Grade {topline.grade}
                  </span>
                  <span className="text-cream/70">{topline.verdict}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl text-cream leading-tight">
                  {topline.headline}
                </h2>
                <p className="mt-4 max-w-xl text-cream/85 leading-relaxed">
                  Roughly <strong className="text-gold">{topline.moneyLine}</strong> are walking past you to
                  competitors above you every month.
                </p>
                {topline.mapsUri ? (
                  <a
                    href={topline.mapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-gold hover:text-cream"
                  >
                    View listing on Google Maps →
                  </a>
                ) : null}
              </div>
            </div>

            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">01 — Map Pack</p>
              <h3 className="mt-2 font-display text-2xl text-ink">
                Who ranks for &quot;{topline.query}&quot;
              </h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div
                  className="min-h-[240px] rounded-sm border border-ink/10 bg-cream-200/40"
                  aria-hidden
                />
                <div className="flex flex-col gap-2">
                  {topline.winners.map((w) => (
                    <div
                      key={w.rank}
                      className="flex items-center gap-3 border border-ink/10 bg-cream-50 px-4 py-3"
                    >
                      <span className="font-mono text-sm font-bold text-oxblood">{w.rank}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink">{w.name}</p>
                        <p className="text-xs text-ink-500">{w.badge}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-semibold text-ink">★ {w.rating}</p>
                        <p className="font-mono text-[10px] text-ink-400">{w.reviews} reviews</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 border border-oxblood/30 bg-oxblood/5 px-4 py-3">
                    <span className="font-mono text-sm font-bold text-oxblood">{topline.rankNum}</span>
                    <div className="flex-1">
                      <p className="font-medium text-ink">
                        {topline.businessName}{' '}
                        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">You</span>
                      </p>
                      <p className="text-xs text-ink-500">
                        ★ {topline.youRating} · {topline.youReviews} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">02 — Weekend fixes</p>
              <h3 className="mt-2 font-display text-2xl text-ink">Three fixes, written for you</h3>
              <p className="mt-2 max-w-2xl text-ink-600 leading-relaxed">
                Copy the text, follow where to click in Google Business Profile — no agency required.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {topline.quickWins.map((q, i) => {
                  const key = `${industry}-${i}`
                  const fixText = q.fixText ?? ''
                  return (
                    <article key={key} className={panelNested}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood bg-oxblood/10 px-2 py-0.5">
                          {q.tag}
                        </span>
                        <span className="font-mono text-[10px] text-ink-500">{q.impactTag}</span>
                      </div>
                      <h4 className="mt-3 font-display text-xl text-ink">{q.title}</h4>
                      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{q.lossLine}</p>
                      {q.hasCopy && fixText ? (
                        <div className="relative mt-4 border border-ink/10 bg-cream p-4">
                          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">
                            {q.fixLabel}
                          </p>
                          <pre className="whitespace-pre-wrap pr-28 text-sm text-ink-700 leading-relaxed font-sans">
                            {fixText}
                          </pre>
                          <button
                            type="button"
                            className="absolute right-3 top-3 rounded-sm border border-ink/20 bg-cream-50 px-3 py-1 font-mono text-[11px] hover:border-oxblood"
                            onClick={() => void copyText(key, fixText)}
                          >
                            {copiedKey === key ? 'Copied ✓' : 'Copy text'}
                          </button>
                        </div>
                      ) : null}
                      <p className="mt-4 text-sm text-ink-600">
                        <strong className="text-ink">Where:</strong> {q.where}
                      </p>
                    </article>
                  )
                })}
              </div>
            </section>

            {!emailUnlocked && topline.scanId ? (
              <form onSubmit={submitEmail} className={`${panelAccent} mt-14 grid gap-6 md:grid-cols-[1fr_auto]`}>
                <div>
                  <h3 className="font-display text-xl text-ink">Unlock your full six-pillar breakdown</h3>
                  <p className="mt-2 max-w-lg text-sm text-ink-600 leading-relaxed">
                    One email for the complete health score across reputation, engagement, profile completeness,
                    and more. CASL-compliant — no spam.
                  </p>
                </div>
                <div className="flex w-full max-w-sm flex-col gap-3">
                  <input
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="flex items-start gap-2 text-xs text-ink-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5"
                    />
                    I agree to receive my report and related messages from Stratezik (CASL).
                  </label>
                  <FormProtectionFields
                    turnstileSiteKey={protection.turnstileSiteKey}
                    onTurnstileSuccess={protection.setTurnstileToken}
                    onTurnstileExpire={protection.resetTurnstile}
                    honeypotValue={protection.honeypot}
                    onHoneypotChange={protection.setHoneypot}
                  />
                  <button type="submit" className={btnPrimary} disabled={loading || !protection.canSubmit}>
                    {loading ? 'Saving…' : 'Unlock the full breakdown'}
                  </button>
                </div>
              </form>
            ) : null}

            {emailUnlocked && pillars ? (
              <section className="mt-14">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">03 — Health score</p>
                <h3 className="mt-2 font-display text-2xl text-ink">Six pillars — where you stand</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {pillars.map((p) => (
                    <div key={p.name} className={panelNested}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-medium text-ink">
                          {p.name}{' '}
                          <span className="font-mono text-[10px] text-ink-400">· {p.weight}</span>
                        </span>
                        <span className={`font-mono font-semibold ${scoreTextClass(p.score)}`}>{p.score}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-200">
                        <div
                          className="h-full rounded-full bg-oxblood/80"
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-ink-500 leading-relaxed">{p.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="relative mt-14 overflow-hidden border border-ink/10">
              <div className={deepUnlocked ? 'p-6 md:p-8' : 'pointer-events-none select-none blur-sm p-6 md:p-8'}>
                {compGaps && roadmap ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                        vs {topCompetitor}
                      </p>
                      {compGaps.map((c) => (
                        <div key={c.metric} className="mt-3 text-sm">
                          <div className="flex justify-between text-ink-700">
                            <span>{c.metric}</span>
                            <span className="font-mono text-xs text-ink-400">
                              you {c.you} · them {c.them}
                            </span>
                          </div>
                        </div>
                      ))}
                      {revenueLine ? (
                        <p className="mt-4 border border-oxblood/20 bg-oxblood/5 p-3 text-sm text-ink-600 leading-relaxed">
                          {revenueLine}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">90-day roadmap</p>
                      {roadmap.map((r) => (
                        <div key={r.weeks} className="mt-4 flex gap-3">
                          <span className="shrink-0 font-mono text-[10px] text-oxblood border border-ink/15 px-2 py-1">
                            {r.weeks}
                          </span>
                          <div>
                            <p className="font-medium text-ink">{r.title}</p>
                            <p className="text-xs text-ink-500">{r.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              {!deepUnlocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/85 p-8 text-center backdrop-blur-[2px]">
                  <h3 className="font-display text-2xl text-ink">Want the full growth plan?</h3>
                  <p className="mt-2 max-w-md text-sm text-ink-600">
                    Competitor breakdown + prioritized 90-day roadmap — {ROADMAP_PRICE} CAD.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      className={btnSecondary}
                      disabled={checkoutLoading}
                      onClick={() => void startCheckout()}
                    >
                      {checkoutLoading ? 'Redirecting…' : `Get the roadmap — ${ROADMAP_PRICE}`}
                    </button>
                    <Link to={BOOK_URL} className={btnPrimary}>
                      Free consult →
                    </Link>
                  </div>
                </div>
              ) : null}
            </section>

            {error ? <p className="mt-6 text-sm text-oxblood">{error}</p> : null}

            <div className="mt-12 border-t border-ink/10 pt-8 text-center">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setPhase('input')
                  setTopline(null)
                  setEmailUnlocked(false)
                  setDeepUnlocked(false)
                  setError(null)
                }}
              >
                ↻ Scan another business
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
