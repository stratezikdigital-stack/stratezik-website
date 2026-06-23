
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { resolveIndustry, sub } from '../gbp/industryEngine'
import { GBP_AUDIT_FAQS } from '../gbp/gbpAuditFaqs'
import { GbpMapPackIllustration } from './gbp/GbpMapPackIllustration'

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
  topCompetitor?: string
  competitorGaps?: CompGap[]
  revenueLine?: string
  roadmap?: RoadmapStep[]
  persisted?: boolean
  storageError?: boolean
  storageHint?: string
}

type Phase = 'input' | 'scanning' | 'unlocking' | 'results'

const GBP_SCAN_STORAGE_KEY = 'gbpRoadmapScanId'

function applyUnlockPayload(
  data: Topline & { pillars?: Pillar[] },
  setters: {
    setTopline: (v: Topline) => void
    setBiz: (v: string) => void
    setCity: (v: string) => void
    setIndustry: (v: string) => void
    setPillars: (v: Pillar[] | null) => void
    applyPreview: (v: Topline) => void
    setDeepUnlocked: (v: boolean) => void
    setEmailUnlocked: (v: boolean) => void
    setPhase: (v: Phase) => void
  },
) {
  setters.setTopline(data)
  setters.setBiz(data.businessName)
  setters.setCity(data.city)
  setters.setIndustry(data.industry)
  setters.setPillars(data.pillars ?? null)
  setters.applyPreview(data)
  setters.setDeepUnlocked(true)
  setters.setEmailUnlocked(true)
  setters.setPhase('results')
}

const UNLOCK_STEPS = [
  'Payment confirmed — verifying with Stripe…',
  'Loading your saved scan…',
  'Unlocking competitor breakdown…',
  'Preparing your 90-day roadmap…',
]

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

function impactBadge(tag: string, index: number): string {
  if (index === 0) return 'Quick win · do this first'
  if (index === 1) return 'Revenue uplift · medium effort'
  return tag
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
  const [turnstileKey, setTurnstileKey] = useState(0)
  const [unlockStep, setUnlockStep] = useState(0)

  const applyPreview = useCallback((data: Topline) => {
    setCompGaps(data.competitorGaps ?? null)
    setRoadmap(data.roadmap ?? null)
    setRevenueLine(data.revenueLine ?? '')
    setTopCompetitor(data.topCompetitor ?? '')
  }, [])

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
      applyPreview(data)
      setStorageWarning(
        data.storageError
          ? data.storageHint ??
              'Results shown, but this scan was not saved — email unlock needs the gbp_scans table in Supabase.'
          : null,
      )
      setPhase('results')
      if (data.scanId) {
        try {
          sessionStorage.setItem(GBP_SCAN_STORAGE_KEY, data.scanId)
        } catch {
          /* ignore */
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Scan failed')
      setPhase('input')
    } finally {
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    }
  }, [biz, city, industry, protection, applyPreview])

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
        setTurnstileKey((k) => k + 1)
        void protection.refreshFormToken()
      }
    },
    [topline, email, consent, protection],
  )

  const startCheckout = useCallback(async () => {
    if (!topline?.scanId) {
      setError('This scan was not saved — run the check again, then checkout.')
      return
    }
    if (!email.trim()) {
      setError('Enter your email below — we need it to deliver the roadmap after payment.')
      return
    }
    if (!protection.canSubmit) {
      setError('Complete the security check below, then try again.')
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
          email: email.trim(),
          website: protection.honeypot,
          ...protection.spamPayload(),
        }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout failed')
      try {
        sessionStorage.setItem(GBP_SCAN_STORAGE_KEY, topline.scanId)
      } catch {
        /* ignore */
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setCheckoutLoading(false)
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    }
  }, [topline, email, protection])

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const scanId = searchParams.get('scanId')
    if (!sessionId || !scanId) return

    setPhase('unlocking')
    setUnlockStep(0)
    setError(null)
    const timer = window.setInterval(
      () => setUnlockStep((i) => Math.min(i + 1, UNLOCK_STEPS.length - 1)),
      2500,
    )

    void (async () => {
      try {
        const res = await fetch('/api/gbp-unlock', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, scanId }),
        })
        const data = (await res.json()) as Topline & {
          unlocked?: boolean
          pillars?: Pillar[]
          error?: string
        }
        if (!res.ok || !data.unlocked) throw new Error(data.error ?? 'Unlock failed')

        applyUnlockPayload(data, {
          setTopline,
          setBiz,
          setCity,
          setIndustry,
          setPillars,
          applyPreview,
          setDeepUnlocked,
          setEmailUnlocked,
          setPhase,
        })
        try {
          sessionStorage.setItem(GBP_SCAN_STORAGE_KEY, data.scanId)
        } catch {
          /* ignore */
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Payment unlock failed')
        setPhase('input')
      } finally {
        window.clearInterval(timer)
        setSearchParams({}, { replace: true })
      }
    })()

    return () => window.clearInterval(timer)
  }, [searchParams, setSearchParams, applyPreview])

  // Return visit after payment when Stripe params were already cleared
  useEffect(() => {
    if (searchParams.get('session_id')) return
    let scanId: string | null = null
    try {
      scanId = sessionStorage.getItem(GBP_SCAN_STORAGE_KEY)
    } catch {
      return
    }
    if (!scanId || deepUnlocked || phase !== 'input') return

    void (async () => {
      try {
        const res = await fetch('/api/gbp-restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scanId }),
        })
        const data = (await res.json()) as Topline & { unlocked?: boolean; pillars?: Pillar[]; error?: string }
        if (!res.ok || !data.unlocked) return
        applyUnlockPayload(data, {
          setTopline,
          setBiz,
          setCity,
          setIndustry,
          setPillars,
          applyPreview,
          setDeepUnlocked,
          setEmailUnlocked,
          setPhase,
        })
      } catch {
        /* not paid or scan missing — stay on input */
      }
    })()
  }, [searchParams, deepUnlocked, phase, applyPreview])

  const switchIndustry = (val: string) => {
    setIndustry(val)
    setEmailUnlocked(false)
    setDeepUnlocked(false)
    setPillars(null)
    if (topline && phase === 'results') {
      const r = resolveIndustry(val)
      const nextCtx = {
        biz: biz || topline.businessName,
        city: (city || topline.city).split(',')[0],
        trade: r.display,
      }
      setTopline({
        ...topline,
        industry: val,
        industryDisplay: r.display,
        query: sub(r.d.query, nextCtx),
        score: r.d.score,
        grade: r.d.grade,
        verdict: r.d.verdict,
        rankNum: r.d.rankNum,
        rankWord: r.d.rankWord,
        moneyLine: r.d.moneyLine,
        youRating: r.d.youRating,
        youReviews: r.d.youReviews,
        gapText: r.d.gapText,
        headline: `You're the ${r.d.rankWord} option people see for "${sub(r.d.query, nextCtx)}" — not in the top 3.`,
        winners: r.d.winners.map((w) => ({
          ...w,
          name: sub(w.name, nextCtx),
          badge: sub(w.badge, nextCtx),
        })),
        quickWins: r.d.quickWins.map((q) => ({
          ...q,
          title: sub(q.title, nextCtx),
          lossLine: sub(q.lossLine, nextCtx),
          fixText: q.fixText ? sub(q.fixText, nextCtx) : undefined,
          where: sub(q.where, nextCtx),
        })),
        topCompetitor: sub(r.d.topCompetitor, nextCtx),
        competitorGaps: r.d.competitorGaps,
        revenueLine: sub(r.d.revenueLine, nextCtx),
        roadmap: r.d.roadmap,
      })
      applyPreview({
        ...topline,
        topCompetitor: sub(r.d.topCompetitor, nextCtx),
        competitorGaps: r.d.competitorGaps,
        revenueLine: sub(r.d.revenueLine, nextCtx),
        roadmap: r.d.roadmap,
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
      <div className="container-custom mx-auto max-w-[72rem] px-6 md:px-12 pt-8 md:pt-12">
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
              <p className="mt-6 text-sm text-ink-600 leading-relaxed">
                Website AI-ready too?{' '}
                <Link
                  to="/aeo-checker?utm_source=gbp-audit&utm_medium=inline"
                  className="text-oxblood underline underline-offset-2 hover:text-ink"
                >
                  Run the AEO Readiness Checker
                </Link>
                . Need done-for-you GBP work?{' '}
                <Link
                  to="/services/google-business-profile"
                  className="text-oxblood underline underline-offset-2 hover:text-ink"
                >
                  GBP management
                </Link>
                .
              </p>
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

        {phase === 'unlocking' && (
          <div className={`${cardClass} mx-auto max-w-lg`}>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-oxblood" />
              <p className="text-ink-700">{UNLOCK_STEPS[unlockStep]}</p>
            </div>
            <div className="mt-5 h-px overflow-hidden bg-ink/10">
              <div
                className="h-full bg-oxblood transition-all duration-700"
                style={{ width: `${((unlockStep + 1) / UNLOCK_STEPS.length) * 90}%` }}
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">
              Payment confirmed · unlocking your roadmap
            </p>
          </div>
        )}

        {phase === 'results' && topline && (
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <div className="mb-6 flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                  Battle plan · tailored for{' '}
                  <span className="text-oxblood">{topline.industryDisplay}</span>
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">
                  {topline.dataSource === 'places' ? 'Live Maps data' : 'Industry template'}
                  {topline.found ? '' : ' · business not matched exactly'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SWITCH_CHIPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => switchIndustry(c)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      industry === c
                        ? 'border-oxblood bg-oxblood text-cream'
                        : 'border-ink/15 text-ink-600 hover:border-oxblood hover:text-oxblood'
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

            <div className={`${panelInk} grid items-center gap-8 rounded-sm p-8 md:grid-cols-[auto_1fr]`}>
              <div className="relative mx-auto h-36 w-36 shrink-0 md:h-[148px] md:w-[148px]">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
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
                  <span className="font-display text-5xl leading-none md:text-[3.25rem]">{topline.score}</span>
                  <span className="font-mono text-[10px] tracking-widest text-cream/50">/ 100</span>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-0.5 font-mono text-xs uppercase tracking-[0.12em] ${scoreTextClass(topline.score)} border-current`}
                  >
                    Grade {topline.grade}
                  </span>
                  <span className="text-cream/75">{topline.verdict}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl text-cream leading-tight md:text-[2rem]">
                  You&apos;re the{' '}
                  <span className="text-gold">{topline.rankWord} option</span> people see for &quot;
                  {topline.query}&quot; — not in the top 3.
                </h2>
                <div className="mt-5 inline-flex max-w-xl items-start gap-3 rounded-sm border border-oxblood/35 bg-oxblood/15 px-4 py-3">
                  <span className="text-xl leading-none" aria-hidden>
                    📞
                  </span>
                  <p className="text-sm leading-relaxed text-cream/90 md:text-[15px]">
                    Roughly <strong className="text-gold">{topline.moneyLine}</strong> are walking past you to
                    competitors above you every month.
                  </p>
                </div>
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
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                01 — What customers actually see
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink md:text-[1.65rem]">
                The Map Pack for &quot;{topline.query}&quot; in {(topline.city || city).split(',')[0]}
              </h3>
              <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.2fr]">
                <GbpMapPackIllustration
                  rankNum={topline.rankNum}
                  businessName={topline.businessName}
                  winners={topline.winners}
                  city={topline.city || city}
                />
                <div className="flex flex-col gap-2">
                  {topline.winners.map((w) => (
                    <div
                      key={w.rank}
                      className="flex items-center gap-3 border border-ink/10 bg-cream-50 px-4 py-3.5"
                    >
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-sm font-mono text-[13px] font-bold text-ink"
                        style={{ background: w.rankColor }}
                      >
                        {w.rank}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink">{w.name}</p>
                        <p className="text-xs text-ink-500">{w.badge}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-semibold text-gold">★ {w.rating}</p>
                        <p className="font-mono text-[10px] text-ink-400">{w.reviews} reviews</p>
                      </div>
                    </div>
                  ))}

                  {topline.rankNum > 3 && topline.gapText ? (
                    <div className="flex items-center gap-3 py-1">
                      <div className="h-px flex-1 bg-ink/15" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
                        {topline.gapText.replace(/↓/g, '').trim() || 'Below the fold'}
                      </span>
                      <div className="h-px flex-1 bg-ink/15" />
                    </div>
                  ) : null}

                  <div className="flex items-center gap-3 border border-oxblood/35 bg-oxblood/8 px-4 py-3.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm border border-oxblood font-mono text-[13px] font-bold text-oxblood">
                      {topline.rankNum}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">
                        {topline.businessName}{' '}
                        <span className="ml-1 rounded-sm border border-oxblood px-1.5 font-mono text-[9px] uppercase tracking-wider text-oxblood">
                          You
                        </span>
                      </p>
                      <p className="text-xs text-ink-500">
                        ★ {topline.youRating} · {topline.youReviews} reviews
                        {topline.rankNum > 3 ? ' · most searchers never scroll this far' : ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                02 — Fix these first
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink md:text-[1.65rem]">Three fixes, written for you</h3>
              <p className="mt-2 max-w-2xl text-ink-600 leading-relaxed">
                Copy the text, follow where to click in Google Business Profile — no agency required.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {topline.quickWins.map((q, i) => {
                  const key = `${industry}-${i}`
                  const fixText = q.fixText ?? ''
                  return (
                    <article key={key} className={`${panelNested} p-6 md:p-7`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">
                          Fix {q.n}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood bg-oxblood/10 px-2 py-0.5">
                          {q.tag}
                        </span>
                        <span className="font-mono text-[10px] text-ink-500">{impactBadge(q.impactTag, i)}</span>
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
                      <p className="mt-4 rounded-sm border border-ink/10 bg-cream-100/80 px-3 py-2 text-sm text-ink-600">
                        <strong className="text-ink">Where:</strong> {q.where}
                      </p>
                    </article>
                  )
                })}
              </div>
            </section>

            {!emailUnlocked && topline.scanId ? (
              <form onSubmit={submitEmail} className={`${panelAccent} mt-14 grid gap-6 rounded-sm p-7 md:grid-cols-[1fr_auto]`}>
                <div>
                  <h3 className="font-display text-xl text-ink md:text-2xl">There are more issues on your profile</h3>
                  <p className="mt-2 max-w-lg text-sm text-ink-600 leading-relaxed">
                    Unlock the full six-pillar health score — reputation, engagement, profile completeness, and more.
                    One email, CASL-compliant, no spam.
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
                    turnstileResetKey={turnstileKey}
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

            <section className="relative mt-14 overflow-hidden rounded-sm border border-ink/10">
              <div className="border-b border-ink/10 bg-cream-100/60 px-6 py-4 md:px-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">03 — Overtake the pack</p>
                <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">
                  Exactly how to overtake the three above you
                </h3>
              </div>
              <div className={deepUnlocked ? 'p-6 md:p-8' : 'pointer-events-none select-none blur-[6px] p-6 md:p-8'}>
                {compGaps && roadmap ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                        vs {topCompetitor}
                      </p>
                      <div className="mt-4 space-y-4">
                        {compGaps.map((c) => {
                          const max = Math.max(c.youN, c.themN, 1)
                          return (
                            <div key={c.metric}>
                              <div className="mb-1.5 flex justify-between text-sm text-ink-700">
                                <span>{c.metric}</span>
                                <span className="font-mono text-[11px] text-ink-400">
                                  you {c.you} · them {c.them}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                                  <div
                                    className="h-full rounded-full bg-oxblood/70"
                                    style={{ width: `${(c.youN / max) * 100}%` }}
                                  />
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-cream-200">
                                  <div
                                    className="h-full rounded-full bg-gold/80"
                                    style={{ width: `${(c.themN / max) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      {revenueLine ? (
                        <p className="mt-5 border border-oxblood/20 bg-oxblood/5 p-4 text-sm text-ink-600 leading-relaxed">
                          {revenueLine}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">90-day roadmap</p>
                      {roadmap.map((r) => (
                        <div key={r.weeks} className="mt-4 flex gap-3 border-t border-ink/10 pt-4 first:mt-3 first:border-t-0 first:pt-0">
                          <span className="shrink-0 font-mono text-[10px] text-oxblood border border-ink/15 px-2 py-1">
                            {r.weeks}
                          </span>
                          <div>
                            <p className="font-medium text-ink">{r.title}</p>
                            <p className="text-xs text-ink-500 leading-relaxed">{r.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-ink-500">Loading competitor breakdown…</p>
                )}
              </div>
              {!deepUnlocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/80 p-8 text-center backdrop-blur-[2px]">
                  <span className="mb-3 text-2xl" aria-hidden>
                    🔒
                  </span>
                  <h3 className="font-display text-2xl text-ink">Want the whole plan done — or done for you?</h3>
                  <p className="mt-2 max-w-md text-sm text-ink-600 leading-relaxed">
                    Full competitor breakdown + prioritized 90-day Google Business Profile roadmap — {ROADMAP_PRICE}{' '}
                    CAD.
                  </p>
                  <div className="mt-5 w-full max-w-sm text-left">
                    <label className="block text-xs font-medium text-ink-600">Email for your roadmap</label>
                    <input
                      type="email"
                      required
                      className={`${inputClass} mt-1.5`}
                      placeholder="you@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormProtectionFields
                      turnstileSiteKey={protection.turnstileSiteKey}
                      onTurnstileSuccess={protection.setTurnstileToken}
                      onTurnstileExpire={protection.resetTurnstile}
                      turnstileResetKey={turnstileKey}
                      honeypotValue={protection.honeypot}
                      onHoneypotChange={protection.setHoneypot}
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      className={btnSecondary}
                      disabled={checkoutLoading || !protection.canSubmit || !email.trim()}
                      onClick={() => void startCheckout()}
                    >
                      {checkoutLoading ? 'Redirecting…' : `Get the roadmap — ${ROADMAP_PRICE}`}
                    </button>
                    <Link to={BOOK_URL} className={btnPrimary}>
                      Have us do it — free consult →
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

        <GbpFaqSection />
      </div>
    </main>
  )
}

function GbpFaqSection() {
  return (
    <section id="gbp-audit-faq" className="mt-16 border-t border-ink/15 pt-12" aria-labelledby="gbp-faq-heading">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">FAQ</p>
      <h2 id="gbp-faq-heading" className="mt-2 font-display text-2xl text-ink sm:text-3xl">
        Local Visibility Scan: common questions
      </h2>
      <dl className="mt-8 space-y-6">
        {GBP_AUDIT_FAQS.map((item) => (
          <div key={item.question} className="border border-ink/12 bg-cream-50 p-6">
            <dt className="font-display text-lg text-ink">{item.question}</dt>
            <dd className="mt-3 text-ink-600 leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm text-ink-500 leading-relaxed">
        More free tools:{' '}
        <Link to="/free-tools" className="text-oxblood underline underline-offset-2 hover:text-ink">
          Stratezik free tools hub
        </Link>
        . AI website audit:{' '}
        <Link
          to="/aeo-checker?utm_source=gbp-audit&utm_medium=faq"
          className="text-oxblood underline underline-offset-2 hover:text-ink"
        >
          AEO Readiness Checker
        </Link>
        .{' '}
        <Link to={BOOK_URL} className="text-oxblood underline underline-offset-2 hover:text-ink">
          Book a consult
        </Link>
        .
      </p>
    </section>
  )
}
