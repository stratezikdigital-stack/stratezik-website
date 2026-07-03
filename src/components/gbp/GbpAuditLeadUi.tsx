import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { resolveIndustry } from '../../gbp/industryEngine'
import { FormProtectionFields } from '../spam/FormProtectionFields'
import { EmailTypoHint } from '../spam/EmailTypoHint'
import { GbpCompetitorBarChart, GbpPillarBarChart, GbpPillarRadarChart, GbpEmailGatePreview } from './GbpAuditCharts'

export const GBP_SCAN_STEPS = [
  'Finding your Google Business Profile…',
  'Mapping who holds the top 3 pins…',
  'Scoring your visibility gap…',
  'Drafting your first copy-paste fix…',
]

type Pillar = { name: string; weight: string; score: number; note: string }
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
type CompGap = { metric: string; you: string; them: string; youN: number; themN: number }

export function GbpHowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Scan',
      body: 'Enter your business name and city. We pull live Maps data when available.',
    },
    {
      n: '02',
      title: 'See your gap',
      body: 'Score, Map Pack rank, and your first ready-to-paste fix — personalized to you.',
    },
    {
      n: '03',
      title: 'Get the full report',
      body: 'Email unlocks the rest: two more fixes, six-pillar scores, and competitor gaps.',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((s) => (
        <div key={s.n} className="border border-ink/10 bg-cream-50 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">{s.n}</p>
          <h3 className="mt-2 font-display text-lg text-ink">{s.title}</h3>
          <p className="mt-2 text-sm text-ink-600 leading-relaxed">{s.body}</p>
        </div>
      ))}
    </div>
  )
}

export function GbpSampleReportMock() {
  const pillars = resolveIndustry('Plumber').d.pillars.slice(0, 3)

  return (
    <div className="relative overflow-hidden rounded-sm border border-ink/12 bg-cream-50">
      <div className="border-b border-ink/10 bg-cream-100/80 px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Example report</p>
        <p className="mt-1 text-sm text-ink-600">Acme Plumbing · Toronto — yours is built from your audit</p>
      </div>
      <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr]">
        <div className="relative mx-auto h-24 w-24">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(33,31,28,0.12)" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#7a1f1f"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={339.3}
              strokeDashoffset={122}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl text-ink">64</span>
            <span className="font-mono text-[9px] text-ink-400">/100</span>
          </div>
        </div>
        <div>
          <p className="font-display text-lg text-ink leading-snug">
            Pin <span className="text-oxblood">#4</span> for &quot;plumber near me&quot;
          </p>
          <div className="mt-3 flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-8 flex-1 rounded-sm bg-gold/30 border border-gold/40" />
            ))}
            <div className="h-8 flex-1 rounded-sm border-2 border-dashed border-oxblood/40 bg-oxblood/5" />
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-3">Pillar preview</p>
        <div className="space-y-2">
          {pillars.map((p) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-xs text-ink-600">{p.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                <div className="h-full w-[58%] rounded-full bg-oxblood/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream-50 to-transparent" />
    </div>
  )
}

export function GbpScanProgress({ biz, industry, step }: { biz: string; industry: string; step: number }) {
  const pct = ((step + 1) / GBP_SCAN_STEPS.length) * 100
  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div className="card-editorial">
        <h2 className="font-display text-2xl text-ink text-center">Building your report…</h2>
        <p className="mt-2 text-center text-sm text-ink-500">{biz || industry}</p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-cream-200">
          <div className="h-full bg-oxblood transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <ul className="mt-8 space-y-4">
          {GBP_SCAN_STEPS.map((label, i) => {
            const done = i < step
            const active = i === step
            return (
              <li key={label} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full font-mono text-[11px] ${
                    done
                      ? 'bg-oxblood text-cream'
                      : active
                        ? 'border-2 border-oxblood text-oxblood'
                        : 'border border-ink/20 text-ink-300'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className={`text-sm leading-relaxed ${active ? 'text-ink font-medium' : done ? 'text-ink-600' : 'text-ink-400'}`}>
                  {label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="rounded-sm border border-ink/10 bg-cream-50 p-5 opacity-80">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-3">Rendering charts</p>
        <GbpPillarRadarChart
          pillars={resolveIndustry(industry).d.pillars.map((p) => ({ name: p.name, score: Math.min(p.score, 40 + step * 15) }))}
          height={160}
        />
      </div>
    </div>
  )
}

function LockOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/75 backdrop-blur-[3px] px-4 text-center">
      <span className="mb-2 text-lg" aria-hidden>
        🔒
      </span>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-600">{label}</p>
    </div>
  )
}

export function GbpFixCard({
  q,
  index,
  locked,
  copiedKey,
  copyKey,
  onCopy,
  impactBadge,
  panelClass,
}: {
  q: QuickWin
  index: number
  locked: boolean
  copiedKey: string | null
  copyKey: string
  onCopy: (key: string, text: string) => void
  impactBadge: (tag: string, index: number) => string
  panelClass: string
}) {
  const fixText = q.fixText ?? ''
  const teaser = q.lossLine.split(/(?<=[.!?])\s+/)[0] ?? q.lossLine

  return (
    <article className={`${panelClass} relative overflow-hidden p-6 md:p-7`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">Fix {q.n}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood bg-oxblood/10 px-2 py-0.5">
          {q.tag}
        </span>
        <span className="font-mono text-[10px] text-ink-500">{impactBadge(q.impactTag, index)}</span>
      </div>
      <h4 className="mt-3 font-display text-xl text-ink">{q.title}</h4>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{locked ? teaser : q.lossLine}</p>
      {q.hasCopy && fixText ? (
        <div className="relative mt-4 border border-ink/10 bg-cream p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400 mb-2">{q.fixLabel}</p>
          <pre
            className={`whitespace-pre-wrap pr-28 text-sm text-ink-700 leading-relaxed font-sans ${locked ? 'blur-[5px] select-none' : ''}`}
          >
            {fixText}
          </pre>
          {!locked ? (
            <button
              type="button"
              className="absolute right-3 top-3 rounded-sm border border-ink/20 bg-cream-50 px-3 py-1 font-mono text-[11px] hover:border-oxblood"
              onClick={() => onCopy(copyKey, fixText)}
            >
              {copiedKey === copyKey ? 'Copied ✓' : 'Copy text'}
            </button>
          ) : null}
          {locked ? <LockOverlay label="Email unlocks copy-paste text" /> : null}
        </div>
      ) : null}
      {!locked ? (
        <p className="mt-4 rounded-sm border border-ink/10 bg-cream-100/80 px-3 py-2 text-sm text-ink-600">
          <strong className="text-ink">Where:</strong> {q.where}
        </p>
      ) : null}
    </article>
  )
}

export function GbpPillarPreview({
  industry,
  unlocked,
  pillars,
  panelClass,
}: {
  industry: string
  unlocked: boolean
  pillars: Pillar[] | null
  panelClass: string
}) {
  const preview = resolveIndustry(industry).d.pillars
  const rows = unlocked && pillars ? pillars : preview

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className={`${panelClass} p-4 flex items-center justify-center`}>
        <GbpPillarRadarChart
          pillars={rows.map((p) => ({ name: p.name, score: unlocked ? p.score : Math.min(p.score, 52) }))}
          locked={!unlocked}
          height={220}
        />
      </div>
      <div className={`${panelClass} p-5`}>
        <GbpPillarBarChart
          pillars={rows.map((p) => ({ name: p.name, score: p.score, weight: p.weight }))}
          locked={!unlocked}
          showValues={unlocked}
        />
        {unlocked
          ? rows.map((p) => (
              <p key={p.name} className="mt-3 border-t border-ink/8 pt-3 text-xs text-ink-500 first:mt-4">
                <strong className="text-ink">{p.name}:</strong> {p.note}
              </p>
            ))
          : null}
      </div>
    </div>
  )
}

export function GbpCompetitorPreview({
  topCompetitor,
  compGaps,
  unlocked,
}: {
  topCompetitor: string
  compGaps: CompGap[] | null
  unlocked: boolean
}) {
  if (!compGaps?.length) return null

  return (
    <div className="rounded-sm border border-ink/10 bg-cream-50 p-5 md:p-6">
      <GbpCompetitorBarChart
        gaps={compGaps}
        themLabel={topCompetitor || 'Top competitor'}
        locked={!unlocked}
        lockAfterIndex={unlocked ? -1 : 0}
      />
    </div>
  )
}

export function GbpReportUnlockChecklist({ emailUnlocked }: { emailUnlocked: boolean }) {
  const items = [
    { label: 'Visibility score & Map Pack rank', done: true },
    { label: 'Fix #1 — copy-paste text', done: true },
    { label: 'Fixes #2 & #3 — copy-paste text', done: emailUnlocked },
    { label: 'Six-pillar health breakdown', done: emailUnlocked },
    { label: 'Competitor gap table', done: emailUnlocked },
  ]

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2.5 text-sm">
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10px] ${
              item.done ? 'bg-oxblood text-cream' : 'border border-ink/25 text-ink-400'
            }`}
          >
            {item.done ? '✓' : '○'}
          </span>
          <span className={item.done ? 'text-ink-700' : 'text-ink-500'}>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function GbpEmailUnlockGate({
  email,
  name,
  businessName,
  consent,
  loading,
  canSubmit,
  turnstileSiteKey,
  turnstileResetKey,
  honeypot,
  onEmailChange,
  onNameChange,
  onBusinessNameChange,
  onConsentChange,
  onTurnstileSuccess,
  onTurnstileExpire,
  onHoneypotChange,
  onSubmit,
  inputClass,
  btnPrimary,
  panelClass,
  emailUnlocked,
  sticky,
}: {
  email: string
  name: string
  businessName: string
  consent: boolean
  loading: boolean
  canSubmit: boolean
  turnstileSiteKey: string | undefined
  turnstileResetKey: number
  honeypot: string
  onEmailChange: (v: string) => void
  onNameChange: (v: string) => void
  onBusinessNameChange: (v: string) => void
  onConsentChange: (v: boolean) => void
  onTurnstileSuccess: (token: string) => void
  onTurnstileExpire: () => void
  onHoneypotChange: (v: string) => void
  onSubmit: (e: FormEvent) => void
  inputClass: string
  btnPrimary: string
  panelClass: string
  emailUnlocked: boolean
  sticky?: boolean
}) {
  if (emailUnlocked) return null

  return (
    <form
      id="gbp-email-unlock"
      onSubmit={onSubmit}
      className={`${panelClass} ${sticky ? 'sticky bottom-4 z-20 shadow-lg ring-1 ring-ink/10 md:static md:shadow-none md:ring-0' : ''} mt-10 rounded-sm p-7 md:p-8`}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,340px)_200px]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Your report is ready</p>
          <h3 className="mt-2 font-display text-2xl text-ink md:text-[1.65rem]">
            Enter your email to unlock charts &amp; fixes
          </h3>
          <p className="mt-2 max-w-lg text-sm text-ink-600 leading-relaxed">
            Pillar radar, competitor bars, Fixes #2–3, and a copy in your inbox. CASL-compliant, no spam.
          </p>
          <GbpReportUnlockChecklist emailUnlocked={false} />
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <input
            type="text"
            required
            autoComplete="organization"
            className={inputClass}
            placeholder="Business name"
            value={businessName}
            onChange={(e) => onBusinessNameChange(e.target.value)}
          />
          <input
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@business.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <EmailTypoHint email={email} onAccept={onEmailChange} />
          <label className="flex items-start gap-2.5 text-xs text-ink-600 leading-relaxed">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => onConsentChange(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 shrink-0 border-ink/20 accent-oxblood"
            />
            <span>
              I agree Stratezik may email my report and related messages about services and insights for my business,
              as described in our{' '}
              <Link to="/privacy" className="text-oxblood underline underline-offset-2">
                Privacy Notice
              </Link>
              . I can unsubscribe anytime. (Required under Canada&apos;s anti-spam legislation.)
            </span>
          </label>
          <FormProtectionFields
            turnstileSiteKey={turnstileSiteKey ?? ''}
            onTurnstileSuccess={onTurnstileSuccess}
            onTurnstileExpire={onTurnstileExpire}
            turnstileResetKey={turnstileResetKey}
            honeypotValue={honeypot}
            onHoneypotChange={onHoneypotChange}
          />
          <button type="submit" className={btnPrimary} disabled={loading || !canSubmit || !consent}>
            {loading ? 'Sending…' : 'Send my full report →'}
          </button>
        </div>
        <GbpEmailGatePreview unlocked={false} />
      </div>
    </form>
  )
}
