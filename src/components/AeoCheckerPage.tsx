
// Public AEO Readiness Checker — the lead-magnet + paid-report flow:
// 1. URL in → animated per-criterion progress while the server scans
// 2. Topline readiness score + defaults-vs-deliberate split shown immediately
// 3. Email capture (CASL express consent) → full breakdown + fix list
// 4. Paid upsell → Stripe Checkout → AI-visibility report (the "outcome" layer)
//
// Positioning throughout: trackers measure the symptom (are you cited?); we
// measure the cause (can you be?) AND the symptom — then hand you the fix list.

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { resolveLeadSource } from '../aeo/checkerLinks'
import { AEO_CHECKER_FAQS } from '../aeo/checkerFaqs'
import type { DeepScanResult } from '../aeo/deep-scan.types'
import type { SitemapAudit } from '../aeo/sitemap.types'

const REPORT_URL = '/toronto-startup-website-audit-2026'
const BOOK_URL = '/#contact'
// Display price for the paid report. The actual charge is set server-side by
// AEO_REPORT_PRICE_CENTS — keep this label in sync.
const PRICE = '$10'
const SITEMAP_PRICE = '$49'

const inputClass = 'input-editorial flex-1'
const inputSm =
  'border border-ink/20 bg-cream-50 px-4 py-2.5 text-ink placeholder-ink-300 outline-none transition-colors focus:border-oxblood'
const btnPrimary = 'btn-primary shrink-0 disabled:opacity-60'
const btnSecondary = 'btn-secondary disabled:opacity-60'
const cardClass = 'card-editorial'
const panelNested = 'aeo-panel-nested'
const panelInk = 'aeo-panel-ink'
const panelAccent = 'aeo-panel-accent'

// Plain-English translation of each technical diagnostic, for non-technical readers.
const SCANNER_PLAIN: Record<string, string> = {
  hydration: 'Can AI see your page at all?',
  chunking: 'Can AI read each section cleanly?',
  trust_markers: 'Does your content look credible to AI?',
  synthesis: 'Is your info easy for AI to pull out?',
  entity_predicate: 'Does AI understand what you do?',
  info_gain: 'Do you give AI a reason to cite you?',
}

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

const UNLOCK_STEPS = [
  'Asking AI engines your buyers’ questions…',
  'Checking whether they name you…',
  'Scoring your competitors…',
  'Finding which of your pages get cited…',
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
    faqPct: number
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

interface BaseTopline {
  domain: string
  total: number | 'unverifiable'
  groupA: GroupSplit
  groupB: GroupSplit
}

type Phase = 'input' | 'scanning' | 'topline' | 'breakdown' | 'unlocking' | 'deep' | 'sitemap'

// Realistic sample shown (blurred) before purchase so visitors see exactly what
// the $29 report contains. Clearly a template — a fictional brand.
const SAMPLE_BASE: BaseTopline = {
  domain: 'yourcompany.com',
  total: 12.5,
  groupA: { earned: 7.1, possible: 7.5, pct: 95 },
  groupB: { earned: 5.4, possible: 12.5, pct: 43 },
}
const SAMPLE_DEEP: DeepScanResult = {
  visibility: {
    appearedCount: 3,
    searchAppearedCount: 2,
    searchChecked: true,
    total: 5,
    queries: [
      { query: 'best tool for managing client projects', appeared: true, answerSnippet: 'A few strong options include YourCompany, which focuses on…', inSearch: true, searchRank: 4 },
      { query: 'how do agencies track deliverables across clients', appeared: true, answerSnippet: 'Most agencies use a dedicated platform such as…', inSearch: false, searchRank: null },
      { query: 'software to automate client reporting', appeared: false, answerSnippet: 'Popular choices for automated reporting include…', inSearch: true, searchRank: 8 },
      { query: 'alternatives to spreadsheets for project management', appeared: true, answerSnippet: 'Teams moving off spreadsheets often adopt…', inSearch: false, searchRank: null },
      { query: 'AI tools for agency workflow', appeared: false, answerSnippet: 'Several AI-assisted workflow tools have emerged…', inSearch: false, searchRank: null },
    ],
  },
  competitors: [
    { domain: 'competitor-a.com', total: 15.0, groupAPct: 100, groupBPct: 52 },
    { domain: 'competitor-b.com', total: 11.25, groupAPct: 93, groupBPct: 30 },
    { domain: 'competitor-c.com', total: 9.5, groupAPct: 87, groupBPct: 24 },
  ],
  citability: {
    overallScore: 64,
    pagesAnalyzed: 3,
    pages: [
      {
        url: 'https://yourcompany.com',
        title: 'YourCompany: project management for agencies',
        score: 74,
        signals: { headings: 6, qaBlocks: 2, lists: 3, freshness: true, answerFirst: true, factDensity: 2.4 },
        passageVerdict: 2,
        fixes: ['Add concrete specifics: numbers, stats, named facts. AI cites pages with quotable facts over adjective-heavy copy.'],
        geoScore: 70,
        chunkMap: [
          { heading: 'What YourCompany does', words: 180, ok: true },
          { heading: 'How it works', words: 410, ok: false },
          { heading: 'Who it’s for', words: 150, ok: true },
        ],
        scanners: [
          { key: 'chunking', label: 'RAG chunking efficiency', status: 'warn', why: '1 section exceeds ~300 words (“How it works” at 410). RAG chunkers split it mid-section, muddying the embedding.', fix: 'Add an H3 inside “How it works” near word 250 so each chunk holds one complete idea.' },
          { key: 'trust_markers', label: 'Citation trust markers', status: 'warn', why: 'Your claims read as unsourced narrative, missing an expert quote and an outbound citation. AI engines favour claims they can validate.', fix: 'Add an inline stat with an “according to …” attribution and an outbound link to an authoritative source.' },
          { key: 'synthesis', label: 'Synthesis-ready layout', status: 'pass', why: 'Lists and a clear summary hook let engines lift your answer directly.', fix: '' },
          { key: 'hydration', label: 'Raw-HTML visibility (no-JS)', status: 'pass', why: 'Your content ships in the raw HTML. AI crawlers can read it without running JavaScript.', fix: '' },
          { key: 'entity_predicate', label: 'Entity-predicate clarity', status: 'pass', why: 'An AI cleanly maps what you do: “YourCompany | automates | client project tracking for agencies”.', fix: '' },
          { key: 'info_gain', label: 'Information gain', status: 'warn', why: 'Partial information gain: your homepage largely restates category messaging the model already knows. It can answer most of this without you.', fix: 'Add two net-new facts a competitor homepage doesn’t have: proprietary usage data or an original framework.' },
        ],
      },
      {
        url: 'https://yourcompany.com/guides/client-reporting',
        title: 'The complete guide to client reporting',
        score: 52,
        signals: { headings: 8, qaBlocks: 3, lists: 5, freshness: false, answerFirst: false, factDensity: 1.6 },
        passageVerdict: 1,
        fixes: ['Open the page with a substantial, declarative answer, not a slogan. AI quotes the first clear statement it finds.'],
        geoScore: 44,
        chunkMap: [
          { heading: 'Introduction', words: 120, ok: true },
          { heading: 'Why client reporting matters', words: 540, ok: false },
          { heading: 'How to automate it', words: 320, ok: false },
        ],
        scanners: [
          { key: 'chunking', label: 'RAG chunking efficiency', status: 'fail', why: '2 sections exceed ~300 words (largest: “Why client reporting matters” at 540). RAG chunkers split these mid-thought, scattering your point across disjointed vectors.', fix: 'Add H3 sub-headings inside the long sections. Split “Why client reporting matters” near word 250.' },
          { key: 'trust_markers', label: 'Citation trust markers', status: 'warn', why: 'Missing hard statistics and an outbound authority citation. The content reads as opinion an AI can’t validate.', fix: 'Append a concrete percentage and an outbound link (e.g. Statistics Canada) to each major claim.' },
          { key: 'synthesis', label: 'Synthesis-ready layout', status: 'warn', why: 'No summary hook for engines to grab the takeaway.', fix: 'Open each section with “The key takeaway is …”.' },
          { key: 'hydration', label: 'Raw-HTML visibility (no-JS)', status: 'pass', why: 'Your content ships in the raw HTML. AI crawlers can read it without running JavaScript.', fix: '' },
          { key: 'entity_predicate', label: 'Entity-predicate clarity', status: 'warn', why: 'Abstract filler (“leverage”, “seamless”) gives the model nothing concrete to map.', fix: 'Replace filler with concrete noun-verb statements.' },
          { key: 'info_gain', label: 'Information gain', status: 'pass', why: 'Net-new information present: your benchmark data and named workflow aren’t in the existing top results, so the model has a reason to cite you.', fix: '' },
        ],
      },
      {
        url: 'https://yourcompany.com/pricing',
        title: 'Pricing: YourCompany',
        score: 40,
        signals: { headings: 2, qaBlocks: 0, lists: 1, freshness: false, answerFirst: true, factDensity: 3.1 },
        passageVerdict: 1,
        fixes: ['Add question-style headings ("How much does it cost?") with direct answers underneath. The most liftable format.'],
        geoScore: 32,
        chunkMap: [{ heading: '(no sub-headings)', words: 720, ok: false }],
        scanners: [
          { key: 'chunking', label: 'RAG chunking efficiency', status: 'fail', why: 'The page is one undivided 720-word block with no H2/H3 structure. Chunkers split it mid-thought, so your tiers get scattered.', fix: 'Break each plan into its own H2/H3 section under 300 words.' },
          { key: 'trust_markers', label: 'Citation trust markers', status: 'fail', why: 'No statistics, quotes, or outbound citations: nothing for an AI to validate.', fix: 'Add concrete usage numbers and an authoritative outbound link.' },
          { key: 'synthesis', label: 'Synthesis-ready layout', status: 'fail', why: 'Your pricing tiers are buried in paragraphs, so an extraction bot can’t map them to a comparison table.', fix: 'Convert the tiers into a native HTML pricing table with one row per plan.' },
          { key: 'hydration', label: 'Raw-HTML visibility (no-JS)', status: 'fail', why: 'The page ships almost no text in its raw HTML. Content is injected by client-side JavaScript that AI crawlers don’t execute, so they see a near-blank page.', fix: 'Server-render or pre-render this page (SSR/SSG) so your copy is in the initial HTML payload.' },
          { key: 'entity_predicate', label: 'Entity-predicate clarity', status: 'pass', why: 'Concrete pricing language maps cleanly.', fix: '' },
          { key: 'info_gain', label: 'Information gain', status: 'fail', why: 'Level 0 (paraphrase): standard tier descriptions the model can generate without you. No reason to cite this page.', fix: 'Add proprietary specifics: usage limits with real numbers, a named guarantee, or comparison data competitors don’t publish.' },
        ],
      },
    ],
  },
}

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
  const [leadSource, setLeadSource] = useState<string | null>(null)
  const [searchParams] = useSearchParams()

  const [checkoutBusy, setCheckoutBusy] = useState<'' | 'report' | 'sitemap'>('')
  const [competitors, setCompetitors] = useState('') // customer-chosen competitor domains
  const [deep, setDeep] = useState<DeepScanResult | null>(null)
  const [deepBase, setDeepBase] = useState<BaseTopline | null>(null)
  const [sitemapAudit, setSitemapAudit] = useState<SitemapAudit | null>(null)
  const [unlockStep, setUnlockStep] = useState(0)

  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => () => { if (stepTimer.current) clearInterval(stepTimer.current) }, [])

  useEffect(() => {
    const prefill = searchParams.get('url')?.trim()
    if (prefill) setUrl(prefill)
    setLeadSource(resolveLeadSource(searchParams))
  }, [searchParams])

  // Return from Stripe Checkout → verify + run the purchased scan
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (!sessionId) return
    const product = params.get('product') ?? 'report'
    const scanId = params.get('scanId') ?? ''
    const domain = params.get('domain') ?? ''
    if (product === 'report' && !scanId) return
    if (product === 'sitemap' && !domain) return

    setPhase('unlocking')
    setUnlockStep(0)
    const timer = setInterval(
      () => setUnlockStep((i) => Math.min(i + 1, UNLOCK_STEPS.length - 1)),
      4000
    )
    ;(async () => {
      try {
        if (product === 'sitemap') {
          const res = await fetch('/api/aeo-sitemap-unlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, domain }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error ?? 'Could not load your audit.')
          setSitemapAudit(data.audit)
          setPhase('sitemap')
        } else {
          const res = await fetch('/api/aeo-unlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, scanId }),
          })
          const data = await res.json()
          if (!res.ok) throw new Error(data.error ?? 'Could not load your report.')
          setDeep(data.deep)
          setDeepBase(data.base)
          setPhase('deep')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load your purchase.')
        setPhase('input')
      } finally {
        clearInterval(timer)
        window.history.replaceState({}, '', '/aeo-checker')
      }
    })()
    return () => clearInterval(timer)
  }, [])

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
        body: JSON.stringify({ scanId: topline.scanId, email, name, consent, source: leadSource }),
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

  async function handleCheckout(product: 'report' | 'sitemap') {
    if (!topline) return
    setCheckoutBusy(product)
    setError('')
    try {
      const res = await fetch('/api/aeo-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          scanId: topline.scanId,
          domain: topline.domain,
          email,
          competitors: competitors
            .split(/[,\s]+/)
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Could not start checkout.')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout.')
      setCheckoutBusy('')
    }
  }

  return (
    <main className="min-h-screen bg-cream pb-24">
      <div className="container-custom mx-auto max-w-5xl px-6 md:px-12 pt-8 md:pt-12">
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        <Link to="/" className="hover:text-oxblood transition-colors">
          Home
        </Link>
        <span className="mx-2 text-ink-300">/</span>
        <span className="text-ink-600">AEO Readiness Checker</span>
      </nav>
      <header className="mb-14 md:mb-16">
        <div className="editorial-label">Free tool</div>
        <div className="hairline mt-3 pt-3 editorial-label">20-Point AEO Readiness Test</div>
      </header>

      {phase !== 'deep' && phase !== 'unlocking' && (
        <>
          <h1 className="font-display text-display-3 md:text-[3.25rem] text-ink leading-[1.02] tracking-[-0.035em]">
            Can AI engines actually see and cite your website?
          </h1>
          <p className="lead mt-8 max-w-2xl">
            <strong>Answer engine optimisation (AEO)</strong> is how you make your site quotable in
            AI assistants, not just rankable in blue links. Most AEO tools tell you whether you’re{' '}
            <em>winning</em> in AI search today. We tell you <strong>why</strong>, and exactly what to
            fix. Start with the <strong>20-Point AEO Readiness Test</strong>, the same
            machine-verified test from our audit of 50 funded Toronto startups (median:{' '}
            <strong>10.75/20</strong>).
          </p>
        </>
      )}

      {phase === 'input' && (
        <>
          <form onSubmit={handleScan} className="mt-10 border-t border-ink/15 pt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourcompany.com"
                required
                className={inputClass}
              />
              <button type="submit" className={btnPrimary}>
                Check my score
              </button>
            </div>
            {error && <p className="mt-3 font-mono text-sm text-oxblood">{error}</p>}
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Free · ~20 seconds · No signup for your topline score
            </p>
          </form>

          <Storefront />
        </>
      )}

      {phase === 'scanning' && (
        <div className={`mt-10 ${cardClass}`}>
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
            {CHECK_STEPS.length} checks · usually 10 to 30 seconds
          </p>
        </div>
      )}

      {(phase === 'topline' || phase === 'breakdown') && topline && (
        <section className="mt-10 border-t border-ink/15 pt-10">
          {topline.total === 'unverifiable' ? (
            <div className={`${panelAccent}`}>
              <h2 className="font-display text-xl text-ink">
                We couldn’t scan {topline.domain}
              </h2>
              <p className="mt-3 text-ink-600 leading-relaxed">
                Fewer than five of the eight criteria were checkable. That usually means a CDN or
                firewall is blocking automated visitors, which is itself an AEO problem. If our
                scanner can’t read your site, AI crawlers likely can’t either. That alone is worth
                a conversation.
              </p>
              <a href={BOOK_URL} className={`mt-6 ${btnPrimary}`}>
                Book a call
              </a>
            </div>
          ) : (
            <>
              <div className={panelInk}>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">
                  {topline.domain}
                </p>
                <p className="mt-4 font-display text-6xl md:text-7xl leading-[0.95] text-cream">
                  {topline.total}
                  <span className="text-3xl font-medium text-cream/55"> / 20</span>
                </p>
                <p className="mt-4 max-w-2xl text-cream/85 leading-relaxed">
                  {typeof topline.total === 'number' && topline.total > topline.benchmark.median
                    ? `Better than the median funded Toronto startup (${topline.benchmark.median}/20). Nobody in our audit of ${topline.benchmark.n} scored above ${topline.benchmark.max}. There's headroom.`
                    : `The median funded Toronto startup scores ${topline.benchmark.median}/20. You're at or below it, which means the fixes below are your fastest route past the pack.`}
                </p>
                {topline.scoredCount < 8 && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
                    {topline.scoredCount} of 8 criteria checkable · score scaled to /20
                  </p>
                )}

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="border border-cream/20 bg-cream/10 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
                      Defaults
                    </p>
                    <p className="mt-1 text-xs text-cream/50">Crawlers, rendering, presence</p>
                    <p className="mt-3 font-display text-4xl text-cream">
                      {topline.groupA.pct === null ? 'n/a' : `${topline.groupA.pct}%`}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-cream/45">
                      Audit avg {topline.benchmark.groupAPct}%
                    </p>
                  </div>
                  <div className="border border-gold/35 bg-gold/10 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                      Deliberate
                    </p>
                    <p className="mt-1 text-xs text-cream/70">Schema, copy, llms.txt, pricing</p>
                    <p className="mt-3 font-display text-4xl text-gold">
                      {topline.groupB.pct === null ? 'n/a' : `${topline.groupB.pct}%`}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-cream/55">
                      Audit avg {topline.benchmark.groupBPct}% · where you win
                    </p>
                  </div>
                </div>
              </div>

              {phase === 'topline' && (
                <form onSubmit={handleLead} className={`mt-6 ${panelAccent}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                    Free unlock
                  </p>
                  <h2 className="mt-2 font-display text-xl text-ink">
                    Get your full breakdown and fix list
                  </h2>
                  <p className="mt-2 text-sm text-ink-600 leading-relaxed">
                    All 8 criteria with evidence, plus a prioritized fix list on screen and in
                    your inbox.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name (optional)"
                      className={`${inputSm} sm:w-44`}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className={`${inputSm} flex-1`}
                    />
                    <button type="submit" disabled={leadBusy} className={btnPrimary}>
                      {leadBusy ? 'Sending…' : 'Send my report'}
                    </button>
                  </div>
                  <label className="mt-4 flex items-start gap-2.5 text-sm text-ink-600">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 border-ink/20 accent-oxblood"
                    />
                    <span>
                      Yes, email me my report and occasional AEO insights from Stratezik. I can
                      withdraw consent any time. (Required under Canada’s anti-spam legislation.)
                    </span>
                  </label>
                  {leadError && <p className="mt-3 text-sm text-oxblood">{leadError}</p>}
                </form>
              )}
            </>
          )}

          {phase === 'breakdown' && criteria && (
            <div className="mt-6">
              <div className="border border-ink/15 bg-cream-50 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-ink">Full breakdown</h2>
                {emailSent ? (
                  <p className="mt-1 text-sm text-ink-500">A copy is on its way to {email}.</p>
                ) : (
                  <p className="mt-1 text-sm text-ink-500">
                    Your report is below. Email delivery is queued and may take a few minutes.
                  </p>
                )}
                <ul className="mt-4 divide-y divide-ink/10">
                  {criteria.map((c) => (
                    <li key={c.key} className="py-4">
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-medium text-ink-700">
                          {c.label}{' '}
                          <span className="text-xs text-ink-400">
                            · {c.group === 'A' ? 'default' : 'deliberate'}
                          </span>
                        </p>
                        <p
                          className={`shrink-0 font-semibold ${
                            c.score === 'unverifiable'
                              ? 'text-ink-400'
                              : c.score >= c.max
                                ? 'text-oxblood'
                                : c.score > 0
                                  ? 'text-gold-600'
                                  : 'text-oxblood'
                          }`}
                        >
                          {c.score === 'unverifiable' ? 'not checkable' : `${c.score} / ${c.max}`}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-ink-500">{c.evidence}</p>
                      {c.fix && <p className="mt-2 text-sm text-ink-600">→ {c.fix}</p>}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Paid upsell — full report shown openly as a worked sample */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-oxblood">
                  Readiness is half the picture
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  Here’s exactly what your AI Visibility Report looks like
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-ink-500">
                  Below is a full report run on a demo brand: the real thing, nothing hidden.
                  Readiness says AI <em>can</em> read you; this is whether it <em>does</em>. Want it
                  for {topline.domain}? Grab your brand’s version at the bottom.
                </p>

                {/* Clear sample badge so it's not mistaken for their own data */}
                <div className="mt-5 border border-oxblood/25 border-b-0 bg-oxblood/8 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">
                  Sample report · demo brand (yours runs on your real data)
                </div>
                <div className="border border-ink/15 bg-cream-50 px-2 pb-2 pt-1 sm:px-4">
                  <DeepReport deep={SAMPLE_DEEP} base={SAMPLE_BASE} preview />
                </div>

                {/* Choose your plan + customer-picked competitors */}
                <div className="mt-8">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oxblood">
                      Get your real numbers
                    </p>
                    <h3 className="mt-2 text-2xl font-display font-semibold text-ink">
                      Run the full diagnostic on {topline.domain}
                    </h3>
                  </div>

                  {/* Competitor picker (used by the page report) */}
                  <div className={`mx-auto mt-6 max-w-2xl ${panelNested}`}>
                    <label className="text-sm font-medium text-ink-700">
                      Who do you want to be benchmarked against?
                    </label>
                    <input
                      type="text"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                      placeholder="competitor1.com, competitor2.com, competitor3.com"
                      className={`${inputSm} mt-2 w-full`}
                    />
                    <p className="mt-2 text-xs text-ink-400">
                      You choose the competitors. We score the exact domains you name. Leave blank
                      and we’ll find your closest ones automatically.
                    </p>
                  </div>

                  {/* $10 vs $49 — value comparison */}
                  <div className="mt-6 grid items-stretch gap-4 lg:grid-cols-2">
                    <PlanCard
                      eyebrow="One page, fully diagnosed"
                      name="Page report"
                      price={PRICE}
                      features={[
                        ['Your AEO readiness score', true],
                        ['AI-answer visibility (+ real Google)', true],
                        ['Competitors you choose, scored head-to-head', true],
                        ['5 key pages: full GEO diagnostic + chunk map', true],
                        ['Information-gain scoring + fix list', true],
                        ['Downloadable PDF', true],
                      ]}
                      cta={checkoutBusy === 'report' ? 'Starting checkout…' : `Run it on my site for ${PRICE}`}
                      onClick={() => handleCheckout('report')}
                      disabled={checkoutBusy !== ''}
                      highlight
                    />
                    <PlanCard
                      eyebrow="Every page in your sitemap"
                      name="Full-site audit"
                      price={SITEMAP_PRICE}
                      badge="Everything above, site-wide"
                      features={[
                        ['Everything in the Page report', true],
                        ['Up to 25 pages crawled automatically', true],
                        ['Site-wide AI-readiness score', true],
                        ['Pages invisible to AI crawlers, flagged', true],
                        ['Your worst pages ranked + exact fixes', true],
                        ['Downloadable PDF', true],
                      ]}
                      cta={checkoutBusy === 'sitemap' ? 'Starting checkout…' : `Audit my whole site for ${SITEMAP_PRICE}`}
                      onClick={() => handleCheckout('sitemap')}
                      disabled={checkoutBusy !== ''}
                    />
                  </div>
                  {error && <p className="mt-3 text-center text-sm text-oxblood">{error}</p>}
                  <p className="mt-3 text-center text-xs text-ink-400">
                    One-time · secure Stripe checkout · instant results
                  </p>
                </div>
              </div>

              <DealCta />
            </div>
          )}
        </section>
      )}

      {phase === 'unlocking' && (
        <div className={`mt-10 ${cardClass}`}>
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
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
            Payment confirmed. Building your report · up to a minute
          </p>
        </div>
      )}

      {phase === 'deep' && deep && (
        <DeepReport deep={deep} base={deepBase} />
      )}

      {phase === 'sitemap' && sitemapAudit && <SitemapDashboard audit={sitemapAudit} />}

      <CheckerFaqSection />

      <footer className="mt-16 hairline pt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
        Stratezik Digital · Toronto, ON · The 20-Point AEO Readiness Test is from the{' '}
        <a href={REPORT_URL} className="text-oxblood underline hover:text-oxblood">
          Toronto Startup Website Audit 2026
        </a>
      </footer>
      </div>
    </main>
  )
}

function DeepReport({
  deep,
  base,
  preview = false,
}: {
  deep: DeepScanResult
  base: BaseTopline | null
  preview?: boolean
}) {
  const v = deep.visibility
  const ranked = base
    ? [
        { domain: base.domain, total: base.total, isYou: true },
        ...deep.competitors.map((c) => ({ domain: c.domain, total: c.total, isYou: false })),
      ].sort((a, b) => (typeof b.total === 'number' ? b.total : 0) - (typeof a.total === 'number' ? a.total : 0))
    : []
  const yourRank = ranked.findIndex((r) => r.isYou) + 1

  return (
    <section id={preview ? undefined : 'aeo-report'} className={preview ? '' : 'mt-10'}>
      {!preview && (
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-semibold text-ink">
              Your AI Visibility Report{base ? `: ${base.domain}` : ''}
            </h1>
            <p className="mt-2 text-ink-500">
              Readiness tells you AI <em>can</em> read you. This is whether it actually does.
            </p>
          </div>
          <PrintButton />
        </div>
      )}

      {/* Scorecard — three pillars at a glance */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <ScoreCard
          label="AI visibility"
          value={`${v.appearedCount}/${v.total}`}
          sub="buyer questions name you"
        />
        <ScoreCard
          label="Competitive rank"
          value={yourRank > 0 ? `${ordinal(yourRank)} / ${ranked.length}` : 'n/a'}
          sub="on AEO readiness"
        />
        <ScoreCard
          label="Citability"
          value={`${deep.citability.overallScore}/100`}
          sub="pages built to be cited"
        />
      </div>

      {/* Visibility — dual signal: AI answers + real Google */}
      <div className="mt-6 border border-ink/15 bg-cream-50 p-6 md:p-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink">Are AI engines naming you?</h2>
          <p className="text-2xl font-display font-semibold text-oxblood">
            {v.appearedCount}
            <span className="text-base font-medium text-ink-500"> / {v.total}</span>
          </p>
        </div>
        <p className="mt-1 text-sm text-ink-500">
          We asked AI engines {v.total} questions your buyers would ask, without naming you. You
          were named in <strong className="text-ink-700">{v.appearedCount}</strong>
          {v.searchChecked && (
            <>
              {' '}· and surfaced in real Google results for{' '}
              <strong className="text-ink-700">{v.searchAppearedCount}</strong> of them
            </>
          )}
          .
        </p>
        <ul className="mt-4 space-y-3">
          {v.queries.map((q, i) => (
            <li key={i} className="border border-ink/10 bg-cream-200/45 p-3">
              <p className="text-sm font-medium text-ink-700">“{q.query}”</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    q.appeared ? 'aeo-chip-ok' : 'bg-cream-200 text-ink-400'
                  }`}
                >
                  {q.appeared ? '✓ named in AI answer' : '○ not named by AI'}
                </span>
                {v.searchChecked && (
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      q.inSearch ? 'aeo-chip-ok' : 'bg-cream-200 text-ink-400'
                    }`}
                  >
                    {q.inSearch ? `✓ Google #${q.searchRank}` : '○ not in Google top 10'}
                  </span>
                )}
              </div>
              {q.answerSnippet && (
                <p className="mt-1.5 text-xs text-ink-400">{q.answerSnippet}…</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Competitors */}
      {ranked.length > 0 && (
        <div className="mt-6 border border-ink/15 bg-cream-50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-ink">How you stack up</h2>
          <p className="mt-1 text-sm text-ink-500">
            Your readiness score vs the competitors AI surfaces in your space.{' '}
            {yourRank > 0 && (
              <span className="text-ink-600">
                You rank {ordinal(yourRank)} of {ranked.length}.
              </span>
            )}
          </p>
          <ul className="mt-4 space-y-2">
            {ranked.map((r) => (
              <li
                key={r.domain}
                className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                  r.isYou ? 'bg-oxblood/10 ring-1 ring-oxblood/20' : 'bg-cream-200/50'
                }`}
              >
                <span className={`text-sm ${r.isYou ? 'font-semibold text-oxblood' : 'text-ink-600'}`}>
                  {r.domain} {r.isYou && '(you)'}
                </span>
                <span className="font-semibold text-ink">
                  {typeof r.total === 'number' ? `${r.total} / 20` : 'n/a'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Citability — are your pages built to BE cited? (cause, not output) */}
      <div className="mt-6 border border-ink/15 bg-cream-50 p-6 md:p-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-ink">
            Why AI skips your pages, and how to fix it
          </h2>
          <p className="text-2xl font-display font-semibold text-oxblood">
            {deep.citability.overallScore}
            <span className="text-base font-medium text-ink-500"> / 100</span>
          </p>
        </div>

        {/* Plain-English explainer for non-technical readers */}
        <div className="mt-3 rounded-lg border border-ink/15 bg-cream-200/40 p-4 text-sm text-ink-500">
          <p>
            <strong className="text-ink-700">In plain terms:</strong> an AI assistant doesn’t
            “rank” your page. It reads it, breaks it into pieces, and decides whether to quote you in
            its answer. We deep-analyzed {deep.citability.pagesAnalyzed} of your key pages on the
            checks that decide that. Each row below is one check, with what it means for you and the
            exact change to make.
          </p>
          <p className="mt-2 text-xs text-ink-400">
            Want this across <em>all</em> your pages, not just your key ones? The Full-site audit
            crawls up to 25.
          </p>
        </div>
        <ul className="mt-4 space-y-3">
          {deep.citability.pages.map((p, i) => (
            <li key={i} className="border border-ink/10 bg-cream-200/45 p-4">
              <div className="flex items-baseline justify-between gap-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm font-medium text-ink-700 hover:text-oxblood"
                >
                  {p.title || p.url}
                </a>
                <span
                  className={`shrink-0 font-semibold ${
                    p.score >= 70 ? 'text-oxblood' : p.score >= 40 ? 'text-gold-600' : 'text-oxblood'
                  }`}
                >
                  {p.score} / 100
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                <Signal ok={p.signals.headings >= 3} label="structured headings" />
                <Signal ok={p.signals.qaBlocks >= 1} label="Q&A blocks" />
                <Signal ok={p.signals.answerFirst} label="answer-first" />
                <Signal ok={p.signals.lists >= 1} label="liftable lists" />
                <Signal ok={p.signals.freshness} label="dated" />
                <Signal ok={p.signals.factDensity >= 2} label="factual" />
              </div>
              {/* GEO diagnostics — why an AI won't cite this, and the exact fix */}
              <ul className="mt-3 space-y-2">
                {p.scanners.map((s) => (
                  <li key={s.key} className="border border-ink/10 bg-cream-100 p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-display font-semibold uppercase ${
                          s.status === 'pass'
                            ? 'aeo-status-pass'
                            : s.status === 'warn'
                              ? 'aeo-status-warn'
                              : 'aeo-status-fail'
                        }`}
                      >
                        {s.status}
                      </span>
                      <span className="text-sm font-medium text-ink-700">
                        {SCANNER_PLAIN[s.key] ?? s.label}
                      </span>
                      <span className="text-[10px] text-ink-400">· {s.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">{s.why}</p>
                    {s.fix && <p className="mt-1 text-xs text-oxblood">→ Fix: {s.fix}</p>}
                  </li>
                ))}
              </ul>

              {/* Chunk map — how a RAG splitter sees the page */}
              {p.chunkMap.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] uppercase tracking-wide text-ink-400">
                    How a RAG chunker splits this page
                  </p>
                  <div className="mt-1.5 space-y-1">
                    {p.chunkMap.filter((c) => c.words > 0).slice(0, 6).map((c, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="w-40 shrink-0 truncate text-xs text-ink-500">{c.heading}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream-200">
                          <div
                            className={`h-full rounded-full ${c.ok ? 'bg-green-500/70' : 'bg-red-500/70'}`}
                            style={{ width: `${Math.min(100, (c.words / 500) * 100)}%` }}
                          />
                        </div>
                        <span className={`w-12 shrink-0 text-right text-xs ${c.ok ? 'text-ink-400' : 'text-oxblood'}`}>
                          {c.words}w
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {!preview && <DealCta />}
    </section>
  )
}

function SitemapDashboard({ audit }: { audit: SitemapAudit }) {
  const issues: { key: keyof SitemapAudit['issueCounts']; label: string }[] = [
    { key: 'hydration', label: 'Invisible to JS-free AI crawlers' },
    { key: 'trust_markers', label: 'Missing citation trust markers' },
    { key: 'chunking', label: 'Poor RAG chunking (over-long sections)' },
    { key: 'synthesis', label: 'Buried in prose, not synthesis-ready' },
  ]
  const n = Math.max(audit.pagesAudited, 1)
  return (
    <section id="aeo-report" className="mt-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-ink">Full-Site AI Audit: {audit.domain}</h1>
          <p className="mt-2 text-ink-500">
            We crawled {audit.pagesAudited} of {audit.urlsDiscovered} pages in your sitemap and
            scored each for how easily AI engines can read, understand, and quote them.
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <ScoreCard label="Site-wide score" value={`${audit.overallScore}/100`} sub="avg RAG-readiness" />
        <ScoreCard label="Pages audited" value={`${audit.pagesAudited}`} sub={`of ${audit.urlsDiscovered} found`} />
        <ScoreCard
          label="Blank to AI"
          value={`${audit.jsBlankCount}`}
          sub="pages need JS to render"
        />
      </div>

      <div className="mt-6 border border-ink/15 bg-cream-50 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-ink">Where your site is losing AI search</h2>
        <ul className="mt-4 space-y-3">
          {issues.map(({ key, label }) => {
            const count = audit.issueCounts[key]
            const pct = Math.round((count / n) * 100)
            return (
              <li key={key}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-ink-600">{label}</span>
                  <span className={count > 0 ? 'font-semibold text-gold-600' : 'text-ink-400'}>
                    {count} {count === 1 ? 'page' : 'pages'}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream-200">
                  <div
                    className={`h-full rounded-full ${count > 0 ? 'bg-amber-500/70' : 'bg-green-500/50'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-6 border border-ink/15 bg-cream-50 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-ink">Worst-performing pages</h2>
        <p className="mt-1 text-sm text-ink-500">Fix these first. Biggest AI-visibility wins.</p>
        <ul className="mt-4 space-y-2">
          {audit.worstPages.map((p) => (
            <li key={p.url} className="border border-ink/10 bg-cream-200/45 p-3">
              <div className="flex items-baseline justify-between gap-3">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm text-ink-700 hover:text-oxblood"
                >
                  {p.url}
                </a>
                <span
                  className={`shrink-0 font-semibold ${
                    p.geoScore >= 70 ? 'text-oxblood' : p.geoScore >= 45 ? 'text-gold-600' : 'text-oxblood'
                  }`}
                >
                  {p.geoScore}/100
                </span>
              </div>
              {p.topIssue && <p className="mt-1 text-xs text-oxblood">→ {p.topIssue}</p>}
            </li>
          ))}
        </ul>
      </div>

      <DealCta />
    </section>
  )
}

function CheckerFaqSection() {
  return (
    <section id="aeo-checker-faq" className="mt-16 border-t border-ink/15 pt-12" aria-labelledby="aeo-faq-heading">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">FAQ</p>
      <h2 id="aeo-faq-heading" className="mt-2 font-display text-2xl text-ink sm:text-3xl">
        AEO readiness checker: common questions
      </h2>
      <dl className="mt-8 space-y-6">
        {AEO_CHECKER_FAQS.map((item) => (
          <div key={item.question} className="border border-ink/12 bg-cream-50 p-6">
            <dt className="font-display text-lg text-ink">{item.question}</dt>
            <dd className="mt-3 text-ink-600 leading-relaxed">{item.answer}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-sm text-ink-500">
        Research behind the benchmark:{' '}
        <Link to={REPORT_URL} className="text-oxblood underline underline-offset-2 hover:text-ink">
          Toronto Startup Website Audit 2026
        </Link>
        . Need help implementing fixes?{' '}
        <a href={BOOK_URL} className="text-oxblood underline underline-offset-2 hover:text-ink">
          Book a call
        </a>
        .
      </p>
    </section>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">{children}</p>
  )
}

function Storefront() {
  const reveals: [string, string, string][] = [
    ['📊', 'Your AEO readiness score', 'The 20-point test from our audit of 50 funded Toronto startups, instantly on screen.'],
    ['👁️', 'Can AI even read you?', 'Whether your content reaches AI crawlers at all, or vanishes behind JavaScript and blocked bots.'],
    ['💬', 'Are AI engines naming you?', 'We ask AI the questions your buyers ask (without naming you) and check if you come up.'],
    ['🥊', 'How you beat the competitors you choose', 'Name your rivals and we score them head-to-head on AI-readiness. See exactly where to leapfrog them.'],
    ['🔍', 'Why specific pages get skipped', 'A page-by-page breakdown of what makes AI quote a page, and what’s stopping yours.'],
    ['🛠️', 'Your prioritized fix list', 'Not “improve your content.” The specific headings, stats, and structure to change first.'],
  ]
  const steps: [string, string][] = [
    ['Enter your site', 'Drop your URL and email. No signup, no credit card. Your topline score is free.'],
    ['We read it like AI does', 'In ~20 seconds we run the full diagnostic: crawlers, structure, content, competitors.'],
    ['You get the fixes', 'A clear breakdown of what’s holding you back in AI search, with the exact changes to make.'],
  ]
  return (
    <div className="mt-16 space-y-16">
      {/* Why we're different — generic, no brand names */}
      <div>
        <Eyebrow>Not another vanity scoreboard</Eyebrow>
        <h2 className="mt-2 text-2xl font-display font-semibold text-ink sm:text-3xl">
          Your typical AI-visibility tracker gang stops at a number
        </h2>
        <p className="mt-3 max-w-2xl text-ink-500">
          The usual crowd of AI-tracking tools count how often AI <em>mentions</em> you and hand you
          a percentage. That’s a scoreboard. It names the symptom, never the cause, and never the
          fix. We read your pages the way an AI engine does and tell you{' '}
          <strong className="text-ink-700">exactly why it skips you and what to change.</strong>
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="border border-ink/15 bg-cream-50 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">Typical tracker</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-600">
              <li className="flex gap-2"><span className="text-ink-300">✗</span> “You have 12% AI visibility.”</li>
              <li className="flex gap-2"><span className="text-ink-300">✗</span> A vanity number, updated monthly.</li>
              <li className="flex gap-2"><span className="text-ink-300">✗</span> No reason. No fix. Nothing you can act on.</li>
            </ul>
          </div>
          <div className="border border-oxblood/30 bg-cream-50 p-6 ring-1 ring-oxblood/15">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Stratezik</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-700">
              <li className="flex gap-2"><span className="text-oxblood">✓</span> “AI skips your pricing page: the tiers are buried in prose.”</li>
              <li className="flex gap-2"><span className="text-oxblood">✓</span> Page-by-page, written like an engineer’s review.</li>
              <li className="flex gap-2"><span className="text-oxblood">✓</span> The exact sentence, heading, or table to change, and why.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What your analysis reveals */}
      <div>
        <Eyebrow>What your email unlocks</Eyebrow>
        <h2 className="mt-2 text-2xl font-display font-semibold text-ink sm:text-3xl">
          What your free analysis reveals
        </h2>
        <p className="mt-3 max-w-2xl text-ink-500">
          Enter your site and email and we run the full diagnostic stack. Here’s what comes back:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reveals.map(([icon, title, body]) => (
            <div
              key={title}
              className="border border-ink/12 bg-cream-50 p-5 transition hover:border-oxblood/35 hover:ring-1 hover:ring-oxblood/15"
            >
              <span className="text-2xl" aria-hidden>{icon}</span>
              <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works — numbered badges, connected feel */}
      <div>
        <Eyebrow>Three steps</Eyebrow>
        <h2 className="mt-2 text-2xl font-display font-semibold text-ink sm:text-3xl">How it works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map(([title, body], i) => (
            <div key={title} className="relative border border-ink/15 bg-cream-50 p-6">
              <span className="flex h-9 w-9 items-center justify-center bg-ink font-display text-sm font-semibold text-cream">
                {i + 1}
              </span>
              <p className="mt-4 text-base font-semibold text-ink">{title}</p>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why it matters — gradient banner */}
      <div className={`${panelInk} overflow-hidden`}>
        <h2 className="font-display text-xl sm:text-2xl text-cream">
          Your buyers now start in AI, not a list of blue links
        </h2>
        <p className="mt-3 max-w-2xl text-cream/85 leading-relaxed">
          If AI can’t read, understand, and quote your site, you’re invisible at the exact moment a
          customer is deciding. Most companies are wide open on this. The ones who fix it first win
          the next decade of search.
        </p>
        <button
          type="button"
          onClick={() => document.querySelector('input')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="mt-6 inline-flex items-center gap-3 bg-cream px-7 py-3.5 font-medium text-ink transition hover:bg-gold"
        >
          Run my free analysis
          <span aria-hidden className="font-mono">↑</span>
        </button>
      </div>
    </div>
  )
}

function PlanCard({
  eyebrow,
  name,
  price,
  badge,
  features,
  cta,
  onClick,
  disabled,
  highlight = false,
}: {
  eyebrow: string
  name: string
  price: string
  badge?: string
  features: [string, boolean][]
  cta: string
  onClick: () => void
  disabled: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`relative flex flex-col p-6 md:p-8 ${
        highlight
          ? 'border-2 border-oxblood/40 bg-ink text-cream shadow-lg shadow-ink/10'
          : 'border border-ink/15 bg-cream-50'
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-6 bg-oxblood px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
          Most popular
        </span>
      )}
      <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${highlight ? 'text-gold' : 'text-oxblood'}`}>
        {eyebrow}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-lg font-semibold ${highlight ? 'text-cream' : 'text-ink'}`}>{name}</span>
        <span className={`font-display text-4xl ${highlight ? 'text-cream' : 'text-ink'}`}>{price}</span>
      </div>
      {badge && (
        <span
          className={`mt-3 inline-block self-start px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
            highlight ? 'border border-cream/25 bg-cream/10 text-cream/90' : 'border border-ink/15 bg-cream-200/60 text-ink-600'
          }`}
        >
          {badge}
        </span>
      )}
      <ul className="mt-5 flex-1 space-y-2.5">
        {features.map(([f]) => (
          <li key={f} className={`flex items-start gap-2 text-sm ${highlight ? 'text-cream/90' : 'text-ink-700'}`}>
            <span className={`mt-0.5 ${highlight ? 'text-gold' : 'text-oxblood'}`}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`mt-8 w-full px-6 py-3.5 font-medium tracking-wide transition disabled:opacity-60 ${
          highlight
            ? 'bg-cream text-ink hover:bg-gold'
            : 'border border-ink bg-transparent text-ink hover:bg-ink hover:text-cream'
        }`}
      >
        {cta}
      </button>
    </div>
  )
}

function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`${btnSecondary} shrink-0 px-4 py-2 text-sm print:hidden`}
    >
      ↓ Download PDF
    </button>
  )
}

function ScoreCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="border border-ink/15 bg-cream-50 p-5 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">{label}</p>
      <p className="mt-2 font-display text-4xl text-oxblood">{value}</p>
      <p className="mt-1 text-xs text-ink-500">{sub}</p>
    </div>
  )
}

function Signal({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={ok ? 'aeo-chip-ok' : 'aeo-chip-muted'}>
      {ok ? '✓' : '○'} {label}
    </span>
  )
}

function DealCta() {
  return (
    <aside className="mt-8 border border-ink bg-ink p-8 md:p-10 text-center text-cream" aria-label="Book a call">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Done-for-you</p>
      <h2 className="mt-3 font-display text-xl md:text-2xl text-cream">Want us to fix the gaps for you?</h2>
      <p className="mx-auto mt-3 max-w-xl text-cream/85 leading-relaxed">
        Schema, answer-first copy, llms.txt, machine-readable pricing: the deliberate column where
        almost everyone fails. We do this for startups every week.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={BOOK_URL}
          className="inline-flex items-center justify-center bg-cream px-7 py-3.5 font-medium text-ink transition hover:bg-gold"
        >
          Book a call
        </a>
        <a href={REPORT_URL} className={`${btnSecondary} border-cream/40 text-cream hover:bg-cream hover:text-ink`}>
          Read the full audit report
        </a>
      </div>
    </aside>
  )
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}
