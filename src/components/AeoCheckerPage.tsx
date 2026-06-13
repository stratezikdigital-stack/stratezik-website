import { useEffect, useRef, useState, FormEvent } from 'react'

const REPORT_URL = 'https://www.stratezik.com/toronto-startup-website-audit-2026'
const BOOK_URL = '/#contact'

const CHECK_STEPS = [
  'Checking AI crawler access (robots.txt)…',
  'Reading your homepage without JavaScript…',
  'Looking for Organization schema…',
  'Looking for FAQPage schema…',
  'Checking pricing transparency…',
  'Fetching llms.txt…',
  'Checking LinkedIn and Crunchbase presence…',
  'Judging answer-first formatting…',
]

interface GroupSplit {
  earned: number
  possible: number
  pct: number | null
}

interface Topline {
  scanId: string
  domain: string
  total: number | 'unverifiable'
  scoredCount: number
  groupA: GroupSplit
  groupB: GroupSplit
  benchmark: {
    median: number
    max: number
    groupAPct: number
    groupBPct: number
    n: number
  }
}

interface Criterion {
  key: string
  label: string
  group: 'A' | 'B'
  score: number | 'unverifiable'
  max: number
  evidence: string
  fix: string | null
}

type Phase = 'input' | 'scanning' | 'topline' | 'breakdown'

const inputClass =
  'flex-1 border border-ink/20 bg-cream-50 px-4 py-3 text-ink placeholder-ink-300 outline-none focus:border-oxblood transition-colors'
const btnPrimary =
  'inline-flex items-center justify-center bg-ink text-cream px-7 py-3 font-medium tracking-wide hover:bg-oxblood transition-colors disabled:opacity-60'
const btnSecondary =
  'inline-flex items-center justify-center border border-ink px-7 py-3 font-medium tracking-wide text-ink hover:bg-ink hover:text-cream transition-colors'
const cardClass = 'border border-ink/15 bg-cream-50/80 p-6 md:p-8'

export default function AeoCheckerPage() {
  const [phase, setPhase] = useState<Phase>('input')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [stepIdx, setStepIdx] = useState(0)
  const [topline, setTopline] = useState<Topline | null>(null)
  const [criteria, setCriteria] = useState<Criterion[] | null>(null)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [consent, setConsent] = useState(false)
  const [leadBusy, setLeadBusy] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(
    () => () => {
      if (stepTimer.current) clearInterval(stepTimer.current)
    },
    []
  )

  async function handleScan(e: FormEvent) {
    e.preventDefault()
    setError('')
    setPhase('scanning')
    setStepIdx(0)
    stepTimer.current = setInterval(
      () => setStepIdx((i) => Math.min(i + 1, CHECK_STEPS.length - 1)),
      3200
    )
    try {
      const res = await fetch('/api/aeo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Scan failed. Try again.')
      setTopline(data)
      setPhase('topline')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed. Try again.')
      setPhase('input')
    } finally {
      if (stepTimer.current) clearInterval(stepTimer.current)
    }
  }

  async function handleLead(e: FormEvent) {
    e.preventDefault()
    if (!topline) return
    setLeadError('')
    setLeadBusy(true)
    try {
      const res = await fetch('/api/aeo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scanId: topline.scanId, email, name, consent }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong. Try again.')
      setCriteria(data.criteria)
      setEmailSent(data.emailSent)
      setPhase('breakdown')
    } catch (err) {
      setLeadError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    } finally {
      setLeadBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12 max-w-4xl">
        <header className="mb-14 md:mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
            Free tool
          </div>
          <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
            20-Point AEO Readiness Test
          </div>
          <h1 className="mt-8 font-display text-display-3 md:text-[3.25rem] text-ink leading-[1.02] tracking-[-0.035em]">
            Can AI engines actually see your website?
          </h1>
          <p className="lead mt-8 max-w-2xl">
            Run your site through the same machine-verified test from our audit of 50 funded Toronto
            startups. The median scored <strong>10.75/20</strong>. Most pass the defaults and fail
            everything deliberate.
          </p>
        </header>

        {phase === 'input' && (
          <form onSubmit={handleScan} className="border-t border-ink/15 pt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourcompany.com"
                required
                className={inputClass}
              />
              <button type="submit" className={`${btnPrimary} shrink-0`}>
                Check my score
              </button>
            </div>
            {error && <p className="mt-3 font-mono text-sm text-oxblood">{error}</p>}
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Free · ~20 seconds · No signup for your topline score
            </p>
          </form>
        )}

        {phase === 'scanning' && (
          <div className={`mt-4 ${cardClass}`}>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-oxblood" />
              <p className="text-ink-700">{CHECK_STEPS[stepIdx]}</p>
            </div>
            <div className="mt-5 h-px overflow-hidden bg-ink/10">
              <div
                className="h-full bg-oxblood transition-all duration-700"
                style={{ width: `${((stepIdx + 1) / CHECK_STEPS.length) * 90}%` }}
              />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              {CHECK_STEPS.length} checks · usually 10–30 seconds
            </p>
          </div>
        )}

        {(phase === 'topline' || phase === 'breakdown') && topline && (
          <section className="border-t border-ink/15 pt-10">
            {topline.total === 'unverifiable' ? (
              <div className={`${cardClass} border-gold/40 bg-cream-50`}>
                <h2 className="font-display text-2xl text-ink">We couldn’t scan {topline.domain}</h2>
                <p className="mt-4 text-ink-600 leading-relaxed">
                  Fewer than five of the eight criteria were checkable. That usually means a CDN or
                  firewall is blocking automated visitors — which is itself an AEO problem. If our
                  scanner can’t read your site, AI crawlers likely can’t either.
                </p>
                <a href={BOOK_URL} className={`${btnPrimary} mt-6`}>
                  Book a call
                </a>
              </div>
            ) : (
              <>
                <div className={cardClass}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                    {topline.domain}
                  </p>
                  <p className="mt-3 font-display text-6xl md:text-7xl text-ink tracking-tight">
                    {topline.total}
                    <span className="text-2xl md:text-3xl font-sans font-normal text-ink-400"> / 20</span>
                  </p>
                  <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl">
                    {typeof topline.total === 'number' && topline.total > topline.benchmark.median
                      ? `Better than the median funded Toronto startup (${topline.benchmark.median}/20) — but nobody in our audit of ${topline.benchmark.n} scored above ${topline.benchmark.max}. There's headroom.`
                      : `The median funded Toronto startup scores ${topline.benchmark.median}/20. You're at or below it — the fixes below are your fastest route past the pack.`}
                  </p>
                  {topline.scoredCount < 8 && (
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
                      {topline.scoredCount} of 8 criteria checkable · score scaled to /20
                    </p>
                  )}

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="border border-ink/10 bg-cream p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                        Defaults
                      </p>
                      <p className="mt-1 text-xs text-ink-400">Crawlers, rendering, presence</p>
                      <p className="mt-3 font-display text-4xl text-ink">
                        {topline.groupA.pct === null ? '—' : `${topline.groupA.pct}%`}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-ink-400">
                        Audit avg: {topline.benchmark.groupAPct}%
                      </p>
                    </div>
                    <div className="border border-oxblood/25 bg-cream p-5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                        Deliberate
                      </p>
                      <p className="mt-1 text-xs text-ink-400">Schema, copy, llms.txt, pricing</p>
                      <p className="mt-3 font-display text-4xl text-oxblood">
                        {topline.groupB.pct === null ? '—' : `${topline.groupB.pct}%`}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-ink-400">
                        Audit avg: {topline.benchmark.groupBPct}% — where you win
                      </p>
                    </div>
                  </div>
                </div>

                {phase === 'topline' && (
                  <form onSubmit={handleLead} className={`mt-6 ${cardClass} border-oxblood/20`}>
                    <h2 className="font-display text-2xl text-ink">Get your full breakdown and fix list</h2>
                    <p className="mt-2 text-ink-600">
                      All 8 criteria with evidence, plus a prioritized fix list — on screen and in your
                      inbox.
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name (optional)"
                        className={`${inputClass} sm:w-44`}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className={inputClass}
                      />
                      <button type="submit" disabled={leadBusy} className={`${btnPrimary} shrink-0`}>
                        {leadBusy ? 'Sending…' : 'Send my report'}
                      </button>
                    </div>
                    <label className="mt-5 flex items-start gap-3 text-sm text-ink-600 leading-relaxed">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 border-ink/30 accent-oxblood"
                      />
                      <span>
                        Yes, email me my report and occasional AEO insights from Stratezik. I can
                        withdraw consent any time. (Required under Canada’s anti-spam legislation.)
                      </span>
                    </label>
                    {leadError && <p className="mt-3 font-mono text-sm text-oxblood">{leadError}</p>}
                  </form>
                )}
              </>
            )}

            {phase === 'breakdown' && criteria && (
              <div className="mt-6">
                <div className={cardClass}>
                  <h2 className="font-display text-2xl text-ink">Full breakdown</h2>
                  {emailSent ? (
                    <p className="mt-2 text-ink-600">A copy is on its way to {email}.</p>
                  ) : (
                    <p className="mt-2 text-ink-600">
                      Your report is below — email delivery is queued and may take a few minutes.
                    </p>
                  )}
                  <ul className="mt-6 divide-y divide-ink/10">
                    {criteria.map((c) => (
                      <li key={c.key} className="py-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <p className="font-medium text-ink">
                            {c.label}{' '}
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                              · {c.group === 'A' ? 'default' : 'deliberate'}
                            </span>
                          </p>
                          <p
                            className={`shrink-0 font-mono text-sm ${
                              c.score === 'unverifiable'
                                ? 'text-ink-400'
                                : c.score >= c.max
                                  ? 'text-oxblood-400'
                                  : c.score > 0
                                    ? 'text-gold-600'
                                    : 'text-oxblood'
                            }`}
                          >
                            {c.score === 'unverifiable' ? 'not checkable' : `${c.score} / ${c.max}`}
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-ink-500">{c.evidence}</p>
                        {c.fix && <p className="mt-2 text-sm text-ink-700 leading-relaxed">→ {c.fix}</p>}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-6 ${cardClass} text-center`}>
                  <h2 className="font-display text-2xl text-ink">Want the deliberate column fixed for you?</h2>
                  <p className="mx-auto mt-3 max-w-xl text-ink-600">
                    Schema, answer-first copy, llms.txt, machine-readable pricing — we do this for
                    startups every week.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <a href={BOOK_URL} className={btnPrimary}>
                      Book a call
                    </a>
                    <a href={REPORT_URL} className={btnSecondary}>
                      Read the full audit report
                    </a>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="mt-20 hairline pt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          Stratezik Digital · Toronto, ON ·{' '}
          <a href={REPORT_URL} className="text-ink-500 hover:text-oxblood transition-colors">
            Toronto Startup Website Audit 2026
          </a>
        </footer>
      </div>
    </div>
  )
}
