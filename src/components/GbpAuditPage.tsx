
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { resolveIndustry, sub } from '../gbp/industryEngine'
import { GBP_AUDIT_FAQS } from '../gbp/gbpAuditFaqs'
import { GbpMapPackIllustration } from './gbp/GbpMapPackIllustration'
import {
  GbpCompetitorPreview,
  GbpEmailUnlockGate,
  GbpFixCard,
  GbpPillarPreview,
  GbpScanProgress,
  GBP_SCAN_STEPS,
} from './gbp/GbpAuditLeadUi'
import { GbpAuditLanding } from './gbp/GbpAuditLanding'

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

type AiWeeklyPhase = { weeks: string; title: string; why: string; actions: string[] }
type AiGooglePost = { week: string; type: string; copy: string }
type AiQandA = { question: string; answer: string }
type AiRoadmap = {
  generatedAt: string
  model: string
  summary: string
  optimizedDescription: string
  recommendedCategories: { primary: string; secondary: string[] }
  reviewPlan: { current: number; ninetyDayTarget: number; perWeek: number; note: string }
  weeklyPlan: AiWeeklyPhase[]
  googlePosts: AiGooglePost[]
  qanda: AiQandA[]
  reviewRequest: { sms: string; email: string }
  competitorInsight: string
}

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
  aiRoadmap?: AiRoadmap | null
  persisted?: boolean
  storageError?: boolean
  storageHint?: string
}

type Phase = 'input' | 'scanning' | 'unlocking' | 'results'

function applyUnlockPayload(
  data: Topline & { pillars?: Pillar[] },
  setters: {
    setTopline: (v: Topline) => void
    setBiz: (v: string) => void
    setCity: (v: string) => void
    setIndustry: (v: string) => void
    setPillars: (v: Pillar[] | null) => void
    setAiRoadmap: (v: AiRoadmap | null) => void
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
  setters.setAiRoadmap(data.aiRoadmap ?? null)
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
  const [aiRoadmap, setAiRoadmap] = useState<AiRoadmap | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
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
  const [scanStep, setScanStep] = useState(0)

  useEffect(() => {
    if (phase !== 'scanning') {
      setScanStep(0)
      return
    }
    setScanStep(0)
    const timers = GBP_SCAN_STEPS.map((_, i) =>
      window.setTimeout(() => setScanStep(i), i * 1400),
    )
    return () => timers.forEach(clearTimeout)
  }, [phase])

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
    setAiRoadmap(null)
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
        setError('Please agree to our Privacy Notice to receive your report.')
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
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setCheckoutLoading(false)
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    }
  }, [topline, email, protection])

  const downloadPdf = useCallback(async () => {
    if (!topline?.scanId) return
    setPdfLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/gbp-roadmap-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId: topline.scanId }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error ?? 'Could not generate the PDF.')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `GBP-Growth-Plan-${(topline.businessName || 'business').replace(/[^a-z0-9]+/gi, '-')}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate the PDF.')
    } finally {
      setPdfLoading(false)
    }
  }, [topline])

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
          setAiRoadmap,
          applyPreview,
          setDeepUnlocked,
          setEmailUnlocked,
          setPhase,
        })
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

  // Re-open a paid plan only from an explicit link (?plan=scanId), e.g. the email we send after checkout.
  // Do not auto-restore from browser storage — a hard refresh should show a fresh scan form.
  useEffect(() => {
    if (searchParams.get('session_id')) return
    const planScanId = searchParams.get('plan')
    if (!planScanId || deepUnlocked || phase !== 'input') return

    setPhase('unlocking')
    setUnlockStep(0)
    setError(null)
    const timer = window.setInterval(
      () => setUnlockStep((i) => Math.min(i + 1, UNLOCK_STEPS.length - 1)),
      2500,
    )

    void (async () => {
      try {
        const res = await fetch('/api/gbp-restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scanId: planScanId }),
        })
        const data = (await res.json()) as Topline & { unlocked?: boolean; pillars?: Pillar[]; error?: string }
        if (!res.ok || !data.unlocked) throw new Error(data.error ?? 'Could not load your plan.')
        applyUnlockPayload(data, {
          setTopline,
          setBiz,
          setCity,
          setIndustry,
          setPillars,
          setAiRoadmap,
          applyPreview,
          setDeepUnlocked,
          setEmailUnlocked,
          setPhase,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load your plan.')
        setPhase('input')
      } finally {
        window.clearInterval(timer)
        setSearchParams({}, { replace: true })
      }
    })()

    return () => window.clearInterval(timer)
  }, [searchParams, deepUnlocked, phase, applyPreview, setSearchParams])

  const switchIndustry = (val: string) => {
    setIndustry(val)
    setEmailUnlocked(false)
    setDeepUnlocked(false)
    setPillars(null)
    setAiRoadmap(null)
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
          <GbpAuditLanding
            cardClass={cardClass}
            inputClass={inputClass}
            btnPrimary={btnPrimary}
            biz={biz}
            city={city}
            industry={industry}
            error={error}
            exampleChips={EXAMPLE_CHIPS}
            canSubmit={protection.canSubmit}
            turnstileSiteKey={protection.turnstileSiteKey}
            honeypot={protection.honeypot}
            onBizChange={setBiz}
            onCityChange={setCity}
            onIndustryChange={setIndustry}
            onIndustryChip={setIndustry}
            onTurnstileSuccess={protection.setTurnstileToken}
            onTurnstileExpire={protection.resetTurnstile}
            onHoneypotChange={protection.setHoneypot}
            onScan={() => void runScan()}
          />
        )}

        {phase === 'scanning' && <GbpScanProgress biz={biz} industry={industry} step={scanStep} />}

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

            {!emailUnlocked ? (
              <div className="mt-10 rounded-sm border border-oxblood/20 bg-oxblood/5 px-5 py-4 md:px-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Your report · partial</p>
                <p className="mt-1 text-sm text-ink-700 leading-relaxed">
                  Below: your personalized dashboard. Fix #1 is unlocked; pillar radar, competitor charts, and Fixes
                  #2–3 complete after email.
                </p>
              </div>
            ) : null}

            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                02 — Fix these first
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink md:text-[1.65rem]">Three fixes, written for you</h3>
              <p className="mt-2 max-w-2xl text-ink-600 leading-relaxed">
                {emailUnlocked
                  ? 'Copy the text, follow where to click in Google Business Profile — no agency required.'
                  : 'Fix #1 is yours now. Email unlocks the copy-paste text for #2 and #3.'}
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {topline.quickWins.map((q, i) => {
                  const key = `${industry}-${i}`
                  const locked = !emailUnlocked && i > 0
                  return (
                    <GbpFixCard
                      key={key}
                      q={q}
                      index={i}
                      locked={locked}
                      copiedKey={copiedKey}
                      copyKey={key}
                      onCopy={copyText}
                      impactBadge={impactBadge}
                      panelClass={panelNested}
                    />
                  )
                })}
              </div>
            </section>

            <section className="mt-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                03 — {emailUnlocked ? 'Health score' : 'Report preview'}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ink">
                {emailUnlocked ? 'Six pillars — where you stand' : 'Six pillars — waiting in your report'}
              </h3>
              {!emailUnlocked ? (
                <p className="mt-2 text-sm text-ink-500">
                  Names and weights are industry-specific. Scores unlock with your email.
                </p>
              ) : null}
              <div className="mt-6">
                <GbpPillarPreview
                  industry={industry}
                  unlocked={emailUnlocked}
                  pillars={pillars}
                  panelClass={panelNested}
                />
              </div>
            </section>

            {(compGaps || topline.competitorGaps) && (
              <section className="mt-14 rounded-sm border border-ink/10 p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">04 — Competitor gap</p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  vs {topCompetitor || topline.topCompetitor || 'your top competitor'}
                </h3>
                {!emailUnlocked ? (
                  <p className="mt-2 text-sm text-ink-500">Reviews row is live from your scan. Full table unlocks by email.</p>
                ) : null}
                <div className="mt-6">
                  <GbpCompetitorPreview
                    topCompetitor={topCompetitor || topline.topCompetitor || ''}
                    compGaps={compGaps ?? topline.competitorGaps ?? null}
                    unlocked={emailUnlocked}
                  />
                </div>
                {emailUnlocked && revenueLine ? (
                  <p className="mt-5 border border-oxblood/20 bg-oxblood/5 p-4 text-sm text-ink-600 leading-relaxed">
                    {revenueLine}
                  </p>
                ) : null}
              </section>
            )}

            {topline.scanId ? (
              <>
                {error && !emailUnlocked ? <p className="mt-4 text-sm text-oxblood">{error}</p> : null}
                <GbpEmailUnlockGate
                email={email}
                consent={consent}
                loading={loading}
                canSubmit={protection.canSubmit}
                turnstileSiteKey={protection.turnstileSiteKey}
                turnstileResetKey={turnstileKey}
                honeypot={protection.honeypot}
                onEmailChange={setEmail}
                onConsentChange={setConsent}
                onTurnstileSuccess={protection.setTurnstileToken}
                onTurnstileExpire={protection.resetTurnstile}
                onHoneypotChange={protection.setHoneypot}
                onSubmit={submitEmail}
                inputClass={inputClass}
                btnPrimary={btnPrimary}
                panelClass={panelAccent}
                emailUnlocked={emailUnlocked}
                sticky
              />
              </>
            ) : null}

            {error && phase === 'results' && emailUnlocked ? <p className="mt-4 text-sm text-oxblood">{error}</p> : null}

            {emailUnlocked && (roadmap ?? topline.roadmap) ? (
            <section className="relative mt-14 overflow-hidden rounded-sm border border-ink/10">
              <div className="border-b border-ink/10 bg-cream-100/60 px-6 py-4 md:px-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">05 — 90-day plan</p>
                <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">
                  Your week-by-week roadmap to overtake the pack
                </h3>
              </div>
              <div className={deepUnlocked ? 'p-6 md:p-8' : 'pointer-events-none select-none blur-[5px] p-6 md:p-8'}>
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Industry roadmap outline</p>
                {(roadmap ?? topline.roadmap)?.map((r) => (
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
              {!deepUnlocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/80 p-8 text-center backdrop-blur-[2px]">
                  <span className="mb-3 text-2xl" aria-hidden>
                    🔒
                  </span>
                  <h3 className="font-display text-2xl text-ink">Get your custom 90-day plan</h3>
                  <p className="mt-2 max-w-md text-sm text-ink-600 leading-relaxed">
                    AI-built from your audit: categories, description, 4 Google posts, 8 Q&amp;A pairs, review scripts,
                    and a PDF by email. {ROADMAP_PRICE} CAD.
                  </p>
                  <div className="mt-5 w-full max-w-sm text-left">
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
                      {checkoutLoading ? 'Redirecting…' : `Get the AI roadmap — ${ROADMAP_PRICE}`}
                    </button>
                    <Link to={BOOK_URL} className={btnPrimary}>
                      Have us do it — free consult →
                    </Link>
                  </div>
                </div>
              ) : null}
            </section>
            ) : null}

            {deepUnlocked && aiRoadmap ? (
              <section className="mt-14 overflow-hidden rounded-sm border border-oxblood/20">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 bg-oxblood/5 px-6 py-5 md:px-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                      Your bespoke plan
                    </p>
                    <h3 className="mt-1 font-display text-xl text-ink md:text-2xl">
                      Built for {topline?.businessName} from your own audit
                    </h3>
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      className={btnSecondary}
                      disabled={pdfLoading}
                      onClick={() => void downloadPdf()}
                    >
                      {pdfLoading ? 'Preparing PDF…' : '↓ Download the PDF'}
                    </button>
                    <p className="mt-1.5 text-[11px] text-ink-400">Also emailed to you.</p>
                  </div>
                </div>

                <div className="space-y-10 p-6 md:p-8">
                  {/* Situation */}
                  <div>
                    <p className="text-sm leading-relaxed text-ink-700">{aiRoadmap.summary}</p>
                    <p className="mt-3 border-l-2 border-oxblood/30 pl-4 text-sm leading-relaxed text-ink-600">
                      {aiRoadmap.competitorInsight}
                    </p>
                  </div>

                  {/* 90-day plan */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Your 90 days</p>
                    <div className="mt-4 space-y-5">
                      {aiRoadmap.weeklyPlan.map((phase) => (
                        <div key={phase.weeks} className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0">
                          <div className="flex flex-wrap items-baseline gap-3">
                            <span className="shrink-0 border border-ink/15 px-2 py-1 font-mono text-[10px] text-oxblood">
                              {phase.weeks}
                            </span>
                            <p className="font-medium text-ink">{phase.title}</p>
                          </div>
                          <p className="mt-1.5 text-xs text-ink-500">{phase.why}</p>
                          <ul className="mt-2 space-y-1.5">
                            {phase.actions.map((a, i) => (
                              <li key={i} className="flex gap-2 text-sm text-ink-700">
                                <span className="text-oxblood">·</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Close the review gap</p>
                    <p className="mt-3 text-sm text-ink-700">
                      You have <span className="font-medium text-ink">{aiRoadmap.reviewPlan.current}</span> reviews.
                      90-day target: <span className="font-medium text-ink">{aiRoadmap.reviewPlan.ninetyDayTarget}</span>{' '}
                      (about {aiRoadmap.reviewPlan.perWeek}/week). {aiRoadmap.reviewPlan.note}
                    </p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {[
                        { key: 'ai-sms', label: 'Text after every job', text: aiRoadmap.reviewRequest.sms },
                        { key: 'ai-email', label: 'Or email this', text: aiRoadmap.reviewRequest.email },
                      ].map((asset) => (
                        <div key={asset.key} className="border border-ink/10 bg-cream-100/60 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">
                              {asset.label}
                            </span>
                            <button
                              type="button"
                              className="font-mono text-[10px] uppercase tracking-wider text-ink-400 hover:text-oxblood"
                              onClick={() => void copyText(asset.key, asset.text)}
                            >
                              {copiedKey === asset.key ? 'Copied ✓' : 'Copy'}
                            </button>
                          </div>
                          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">{asset.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile copy */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">Paste these in today</p>
                    <p className="mt-3 text-sm text-ink-700">
                      <span className="font-medium text-ink">Primary category:</span>{' '}
                      {aiRoadmap.recommendedCategories.primary}
                    </p>
                    <p className="text-sm text-ink-600">
                      <span className="font-medium text-ink">Backups:</span>{' '}
                      {aiRoadmap.recommendedCategories.secondary.join(', ')}
                    </p>
                    <div className="mt-4 border border-ink/10 bg-cream-100/60 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">
                          Your business description
                        </span>
                        <button
                          type="button"
                          className="font-mono text-[10px] uppercase tracking-wider text-ink-400 hover:text-oxblood"
                          onClick={() => void copyText('ai-desc', aiRoadmap.optimizedDescription)}
                        >
                          {copiedKey === 'ai-desc' ? 'Copied ✓' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-sm leading-relaxed text-ink-700">{aiRoadmap.optimizedDescription}</p>
                    </div>
                  </div>

                  {/* Google posts */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                      Month one — 4 posts ready to publish
                    </p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {aiRoadmap.googlePosts.map((post, i) => (
                        <div key={i} className="border border-ink/10 bg-cream-100/60 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">
                              {post.week} · {post.type}
                            </span>
                            <button
                              type="button"
                              className="font-mono text-[10px] uppercase tracking-wider text-ink-400 hover:text-oxblood"
                              onClick={() => void copyText(`ai-post-${i}`, post.copy)}
                            >
                              {copiedKey === `ai-post-${i}` ? 'Copied ✓' : 'Copy'}
                            </button>
                          </div>
                          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">{post.copy}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Q&A */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                      Seed your Q&amp;A — post and answer these yourself
                    </p>
                    <div className="mt-4 space-y-4">
                      {aiRoadmap.qanda.map((qa, i) => (
                        <div key={i} className="border-t border-ink/10 pt-4 first:border-t-0 first:pt-0">
                          <p className="text-sm font-medium text-ink">Q. {qa.question}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-600">A. {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {error ? <p className="mt-6 text-sm text-oxblood">{error}</p> : null}

            <div className="mt-12 border-t border-ink/10 pt-8 text-center">
              <button
                type="button"
                className={btnSecondary}
                onClick={() => {
                  setPhase('input')
                  setTopline(null)
                  setPillars(null)
                  setCompGaps(null)
                  setRoadmap(null)
                  setRevenueLine('')
                  setTopCompetitor('')
                  setEmailUnlocked(false)
                  setDeepUnlocked(false)
                  setAiRoadmap(null)
                  setStorageWarning(null)
                  setError(null)
                  setSearchParams({}, { replace: true })
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
