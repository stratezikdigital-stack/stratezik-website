
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { resolveIndustry, sub } from '../gbp/industryEngine'

const BOOK_URL = '/#contact'
const ROADMAP_PRICE = '$29'

const EXAMPLE_CHIPS = [
  { label: '🔧 Plumber', value: 'Plumber' },
  { label: '❄️ HVAC', value: 'HVAC' },
  { label: '🦷 Dentist', value: 'Dentist' },
  { label: '🍽️ Restaurant', value: 'Restaurant' },
  { label: '💇 Hair salon', value: 'Hair salon' },
  { label: '🚗 Auto repair', value: 'Auto repair' },
  { label: '⚖️ Law firm', value: 'Law firm' },
  { label: '🐛 Pest control', value: 'Pest control' },
]

const SWITCH_CHIPS = [
  'Plumber',
  'Dentist',
  'Restaurant',
  'Law firm',
  'Hair salon',
  'Tutoring centre',
]

type Winner = {
  rank: string
  rankColor: string
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
}

type Phase = 'input' | 'scanning' | 'results'

function gradeColor(score: number): string {
  return score >= 75 ? '#74C28A' : score >= 60 ? '#ECC15B' : '#E8694C'
}

function pillarColor(score: number): string {
  return score >= 70 ? '#74C28A' : score >= 50 ? '#ECC15B' : '#E8694C'
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
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('gbp-audit-active')
    document.body.classList.add('gbp-audit-active')
    return () => {
      document.documentElement.classList.remove('gbp-audit-active')
      document.body.classList.remove('gbp-audit-active')
    }
  }, [])

  const ctx = useMemo(() => {
    const cityShort = (city || 'Scarborough').split(',')[0]
    const trade = topline?.industryDisplay ?? industry
    return { biz: biz || topline?.businessName || trade, city: cityShort, trade }
  }, [biz, city, industry, topline])

  const runScan = useCallback(async () => {
    if (!city.trim()) {
      setError('Enter your city — e.g. Scarborough, ON.')
      return
    }
    setError(null)
    setPhase('scanning')
    setEmailUnlocked(false)
    setDeepUnlocked(false)
    setPillars(null)

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

        setTopline((prev) =>
          prev ??
          ({
            scanId,
            businessName: '',
            city: '',
            industry: '',
            industryDisplay: '',
            score: 0,
            grade: '',
            verdict: '',
            rankNum: 0,
            rankWord: '',
            query: '',
            found: false,
            dataSource: 'template',
            youRating: '',
            youReviews: 0,
            moneyLine: '',
            winners: [],
            quickWins: [],
            gapText: '',
            headline: '',
            mapsUri: null,
          } satisfies Topline),
        )
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
  const gc = topline ? gradeColor(topline.score) : '#E8694C'

  return (
    <div className="gbp-audit-root">
      <div className="gbp-inner">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
          <Link to="/" className="flex items-center gap-3 no-underline text-inherit">
            <div className="grid h-[30px] w-[30px] place-items-center rounded-md bg-[#F4A23C] font-serif text-xl text-[#16120D]">
              S
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-tight">Stratezik</div>
              <div className="mono text-[9.5px] uppercase tracking-[0.16em] text-[#8E8268]">
                Local Visibility Scan
              </div>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <span className="mono text-[11px] text-[#8E8268]">Toronto · Scarborough · GTA</span>
            <Link
              to={BOOK_URL}
              className="rounded-lg border border-[#4A4029] px-4 py-2 text-[13px] font-semibold text-[#F7F1E6] no-underline"
            >
              Book a consult
            </Link>
          </div>
        </div>

        {phase === 'input' && (
          <div className="gbp-input-grid sz-anim grid items-center gap-12 pt-6 md:grid-cols-2">
            <div>
              <div className="mono mb-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4A23C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F4A23C] shadow-[0_0_12px_#F4A23C]" />
                Free · No login · 60 seconds
              </div>
              <h1 className="display mb-6 text-[clamp(34px,4.4vw,54px)] font-normal leading-[1.08] tracking-tight">
                Find out why customers pick the shop{' '}
                <em className="text-[#F4A23C] not-italic">down the street</em> — not you.
              </h1>
              <p className="mb-6 max-w-[50ch] text-[17.5px] leading-relaxed text-[#CBBFA9]">
                Whatever you run — a trade, a clinic, a restaurant — this scan shows what&apos;s costing
                you calls on Google, then gives you fixes in your own words, ready to paste in.
              </p>
            </div>
            <div className="panel">
              <div className="mono mb-4 text-[10.5px] uppercase tracking-[0.14em] text-[#8E8268]">
                Scan your Google Business Profile
              </div>
              <label className="mb-1.5 block text-[12.5px] font-semibold text-[#CBBFA9]">
                Business name
              </label>
              <input
                className="mb-4"
                placeholder="e.g. ShieldGuard Pest Control"
                value={biz}
                onChange={(e) => setBiz(e.target.value)}
              />
              <label className="mb-1.5 block text-[12.5px] font-semibold text-[#CBBFA9]">City</label>
              <input
                className="mb-4"
                placeholder="e.g. Scarborough, ON"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label className="mb-1.5 block text-[12.5px] font-semibold text-[#CBBFA9]">
                Your industry <span className="font-normal text-[#8E8268]">— type anything</span>
              </label>
              <input
                className="mb-2"
                placeholder="e.g. Plumber, Bakery, Law firm…"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
              <div className="mb-5 flex flex-wrap gap-2">
                {EXAMPLE_CHIPS.map((c) => (
                  <button key={c.value} type="button" className="chip-btn" onClick={() => setIndustry(c.value)}>
                    {c.label}
                  </button>
                ))}
              </div>
              {error ? <p className="mb-3 text-sm text-[#E8694C]">{error}</p> : null}
              <button type="button" className="btn-primary" onClick={() => void runScan()}>
                Run my free scan →
              </button>
            </div>
          </div>
        )}

        {phase === 'scanning' && (
          <div className="flex min-h-[62vh] flex-col items-center justify-center text-center">
            <div className="relative mb-8 h-[120px] w-[120px]">
              <div className="absolute inset-0 rounded-full border border-[#3A3122]" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F4A23C]"
                style={{ animation: 'gbpRing 1.05s linear infinite' }}
              />
            </div>
            <div className="display mb-6 text-3xl">Scanning {biz || industry}…</div>
            <p className="mono text-sm text-[#8E8268]">Pulling Google Maps data & tailoring checks…</p>
          </div>
        )}

        {phase === 'results' && topline && (
          <div className="sz-anim">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div className="mono text-[11px] uppercase tracking-[0.12em] text-[#8E8268]">
                Audit for{' '}
                <span className="text-[#F4A23C]">{topline.industryDisplay}</span>
                {topline.dataSource === 'places' ? ' · live Maps data' : ' · template (add Places API key)'}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono text-[10.5px] text-[#8E8268]">try another trade:</span>
                {SWITCH_CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`switch-pill ${industry === c ? 'active' : ''}`}
                    onClick={() => switchIndustry(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="gbp-verdict-grid mb-4 grid items-center gap-10 rounded-[22px] border border-[#4A4029] bg-gradient-to-br from-[#241E16] to-[#1C1710] p-8 md:grid-cols-[auto_1fr]">
              <div className="relative mx-auto h-[148px] w-[148px] shrink-0">
                <svg viewBox="0 0 120 120" className="h-[148px] w-[148px] -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#3A3122" strokeWidth="9" />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke={gc}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={339.3}
                    strokeDashoffset={scoreRing}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="display text-[52px] leading-none">{topline.score}</div>
                  <div className="mono mt-0.5 text-[10px] tracking-widest text-[#8E8268]">/ 100</div>
                </div>
              </div>
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span
                    className="mono rounded-full border px-3 py-0.5 text-[13px] font-semibold"
                    style={{ color: gc, borderColor: gc }}
                  >
                    Grade {topline.grade}
                  </span>
                  <span className="text-sm text-[#CBBFA9]">{topline.verdict}</span>
                </div>
                <h2 className="display mb-3 text-[clamp(26px,3vw,36px)] font-normal leading-tight">
                  {topline.headline}
                </h2>
                <div className="inline-flex items-center gap-3 rounded-xl border border-[rgba(232,105,76,0.35)] bg-[rgba(232,105,76,0.1)] px-4 py-3">
                  <span className="text-2xl">📞</span>
                  <span className="text-[15px]">
                    Roughly <strong className="text-[#E8694C]">{topline.moneyLine}</strong> walk past you
                    monthly.
                  </span>
                </div>
                {topline.mapsUri ? (
                  <p className="mt-3 text-sm">
                    <a href={topline.mapsUri} target="_blank" rel="noopener noreferrer" className="text-[#F4A23C]">
                      View listing on Google Maps →
                    </a>
                  </p>
                ) : null}
              </div>
            </div>

            {/* Map pack */}
            <h3 className="display mb-4 text-[27px] font-normal">
              The Map Pack for &quot;{topline.query}&quot;
            </h3>
            <div className="gbp-map-grid mb-10 grid gap-4 md:grid-cols-[1fr_1.25fr]">
              <div className="min-h-[280px] rounded-2xl border border-[#3A3122] bg-[#171c19]" aria-hidden />
              <div className="flex flex-col gap-2">
                {topline.winners.map((w) => (
                  <div
                    key={w.rank}
                    className="flex items-center gap-3 rounded-xl border border-[#3A3122] bg-[#211B13] p-4"
                  >
                    <div
                      className="mono grid h-7 w-7 shrink-0 place-items-center rounded-md text-[13px] font-bold text-[#16120D]"
                      style={{ background: w.rankColor }}
                    >
                      {w.rank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold">{w.name}</div>
                      <div className="text-xs text-[#8E8268]">{w.badge}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-bold text-[#F4D03C]">★ {w.rating}</div>
                      <div className="mono text-[11px] text-[#8E8268]">{w.reviews} reviews</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 rounded-xl border border-[rgba(232,105,76,0.4)] bg-[rgba(232,105,76,0.07)] p-4">
                  <div className="mono grid h-7 w-7 shrink-0 place-items-center rounded-md border border-[#E8694C] text-[13px]">
                    {topline.rankNum}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">
                      {topline.businessName}{' '}
                      <span className="mono ml-1 rounded border border-[#E8694C] px-1.5 text-[10px] text-[#E8694C]">
                        YOU
                      </span>
                    </div>
                    <div className="text-xs text-[#8E8268]">★ {topline.youRating} · {topline.youReviews} reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick wins */}
            <h3 className="display mb-4 text-[27px] font-normal">Three fixes, written for you. Free.</h3>
            <div className="mb-10 flex flex-col gap-3">
              {topline.quickWins.map((q, i) => {
                const key = `${industry}-${i}`
                const fixText = q.fixText ?? ''
                return (
                  <div key={key} className="rounded-2xl border border-[#3A3122] bg-[#211B13] p-6">
                    <div className="mono mb-2 text-[10px] text-[#F4A23C]">{q.tag}</div>
                    <div className="mb-2 text-lg font-bold">{q.title}</div>
                    <p className="mb-4 text-sm leading-relaxed text-[#CBBFA9]">{q.lossLine}</p>
                    {q.hasCopy && fixText ? (
                      <div className="relative mb-4 rounded-xl border border-[#3A3122] bg-[#16120D] p-4">
                        <pre className="whitespace-pre-wrap pr-24 text-sm leading-relaxed">{fixText}</pre>
                        <button
                          type="button"
                          className="mono absolute right-3 top-3 rounded-lg border border-[#4A4029] bg-[#2A2318] px-3 py-1.5 text-[11px]"
                          onClick={() => void copyText(key, fixText)}
                        >
                          {copiedKey === key ? 'Copied ✓' : 'Copy text'}
                        </button>
                      </div>
                    ) : null}
                    <p className="text-sm text-[#CBBFA9]">
                      <strong className="text-[#F7F1E6]">Where:</strong> {q.where}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Email gate */}
            {!emailUnlocked ? (
              <form
                onSubmit={submitEmail}
                className="gbp-email-gate mb-10 grid items-center gap-6 rounded-2xl border border-[#4A4029] bg-gradient-to-br from-[#2A2318] to-[#1E1810] p-7 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <h3 className="display mb-2 text-2xl font-normal">There are more issues on your profile.</h3>
                  <p className="max-w-lg text-sm leading-relaxed text-[#CBBFA9]">
                    Get the full 6-pillar breakdown — plus a saved copy of this scan. One email, no spam.
                  </p>
                </div>
                <div className="flex w-full max-w-xs flex-col gap-2">
                  <input
                    type="email"
                    required
                    placeholder="you@business.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="flex items-start gap-2 text-xs text-[#8E8268]">
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
                  <button type="submit" className="btn-primary" disabled={loading || !protection.canSubmit}>
                    {loading ? 'Saving…' : 'Unlock the full breakdown'}
                  </button>
                </div>
              </form>
            ) : null}

            {emailUnlocked && pillars ? (
              <div className="mb-10">
                <h3 className="display mb-4 text-[27px] font-normal">Six pillars — where you stand</h3>
                <div className="gbp-pillar-grid grid gap-3 md:grid-cols-2">
                  {pillars.map((p) => (
                    <div key={p.name} className="rounded-xl border border-[#3A3122] bg-[#211B13] p-4">
                      <div className="mb-2 flex justify-between">
                        <span className="font-bold">
                          {p.name}{' '}
                          <span className="mono text-[10px] font-normal text-[#8E8268]">· {p.weight}</span>
                        </span>
                        <span className="mono font-semibold" style={{ color: pillarColor(p.score) }}>
                          {p.score}
                        </span>
                      </div>
                      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-[#16120D]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.score}%`, background: pillarColor(p.score) }}
                        />
                      </div>
                      <p className="text-xs leading-relaxed text-[#8E8268]">{p.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Paid roadmap */}
            <div className="relative overflow-hidden rounded-2xl border border-[#4A4029]">
              <div className={deepUnlocked ? '' : 'pointer-events-none blur-sm'}>
                {compGaps && roadmap ? (
                  <div className="grid md:grid-cols-2">
                    <div className="border-b border-[#3A3122] p-7 md:border-b-0 md:border-r">
                      <div className="mono mb-4 text-[10.5px] uppercase text-[#8E8268]">
                        vs {topCompetitor}
                      </div>
                      {compGaps.map((c) => (
                        <div key={c.metric} className="mb-3 text-sm">
                          <div className="flex justify-between text-[#CBBFA9]">
                            <span>{c.metric}</span>
                            <span className="mono text-[#8E8268]">
                              you {c.you} · them {c.them}
                            </span>
                          </div>
                        </div>
                      ))}
                      {revenueLine ? (
                        <p className="mt-4 rounded-xl border border-[rgba(116,194,138,0.3)] bg-[rgba(116,194,138,0.08)] p-3 text-sm text-[#CBBFA9]">
                          {revenueLine}
                        </p>
                      ) : null}
                    </div>
                    <div className="p-7">
                      <div className="mono mb-4 text-[10.5px] uppercase text-[#8E8268]">90-day roadmap</div>
                      {roadmap.map((r) => (
                        <div key={r.weeks} className="mb-4 flex gap-3">
                          <span className="mono shrink-0 rounded border border-[#4A4029] px-2 py-1 text-[10px] text-[#F4A23C]">
                            {r.weeks}
                          </span>
                          <div>
                            <div className="font-bold">{r.title}</div>
                            <div className="text-xs text-[#8E8268]">{r.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              {!deepUnlocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[rgba(22,18,13,0.55)] to-[rgba(22,18,13,0.92)] p-8 text-center">
                  <div className="mb-4 text-2xl">🔒</div>
                  <h3 className="display mb-2 max-w-md text-2xl font-normal">Want the whole plan?</h3>
                  <p className="mb-5 max-w-md text-sm text-[#CBBFA9]">
                    Full competitor breakdown and prioritized 90-day roadmap — {ROADMAP_PRICE} CAD.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      className="rounded-xl border border-[#4A4029] bg-[#2A2318] px-5 py-3 font-bold"
                      disabled={checkoutLoading}
                      onClick={() => void startCheckout()}
                    >
                      {checkoutLoading ? 'Redirecting…' : `Get the roadmap — ${ROADMAP_PRICE}`}
                    </button>
                    <Link to={BOOK_URL} className="rounded-xl bg-[#F4A23C] px-5 py-3 font-extrabold text-[#16120D] no-underline">
                      Free consult →
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className="mt-4 text-sm text-[#E8694C]">{error}</p> : null}

            <div className="mt-10 border-t border-[#3A3122] pt-8 text-center">
              <button
                type="button"
                className="rounded-lg border border-[#4A4029] px-5 py-2.5 text-sm font-semibold text-[#CBBFA9]"
                onClick={() => {
                  setPhase('input')
                  setTopline(null)
                  setEmailUnlocked(false)
                  setDeepUnlocked(false)
                }}
              >
                ↻ Scan another business
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
