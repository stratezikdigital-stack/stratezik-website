import { Link } from 'react-router-dom'
import type { FormEvent } from 'react'
import { FormProtectionFields } from '../spam/FormProtectionFields'
import {
  FreeToolSectionHeader,
  FreeToolSparkline,
  FreeToolSplitBar,
} from '../free-tools/FreeToolUi'
import { AeoHeroLauncher } from './AeoHeroLauncher'
import { AeoPhilosophyComparison } from './AeoPhilosophyComparison'
import {
  AEO_SAMPLE,
  AeoCompetitorBars,
  AeoCriterionBarChart,
  AeoCrawlerAccessList,
  AeoReportExplorer,
  AeoSampleDashboard,
  AeoScoreRing,
} from './AeoCheckerCharts'

const WALKTHROUGH = [
  { tag: '01 · Score', title: 'Your 20-point readiness score', body: 'Machine-verified across crawler access, schema, answer-first copy, entity clarity, and llms.txt — benchmarked against 50 funded Toronto startups.', visual: 'score' as const },
  { tag: '02 · Crawlers', title: 'Can AI bots read you at all?', body: 'We probe GPTBot, ClaudeBot, Google-Extended, PerplexityBot, and others. A robots.txt block makes the rest of the audit moot.', visual: 'crawlers' as const },
  { tag: '03 · Criteria', title: 'Group A defaults vs Group B deliberate', body: 'Group A catches baseline gaps most sites miss. Group B scores intentional AEO — FAQ schema, answer-first headings, information gain.', visual: 'criteria' as const },
  { tag: '04 · Competitors', title: 'Head-to-head on the same rubric', body: 'Name rivals after email unlock and see who wins on the same 20-point test — not a vanity visibility percentage.', visual: 'competitors' as const },
  { tag: '05 · Fixes', title: 'Page-level fix list', body: 'Specific URLs, schema blocks, and copy changes — not “improve your content.” Fix depth unlocks by email; topline is instant.', visual: 'fixes' as const },
]

const CRITERIA_METHOD = [
  { name: 'Crawler access', weight: 'Critical', desc: 'GPTBot, ClaudeBot, Google-Extended, PerplexityBot' },
  { name: 'Raw HTML', weight: 'Group A', desc: 'Content visible without JavaScript execution' },
  { name: 'Organization schema', weight: 'Group A', desc: 'Entity clarity for knowledge graphs' },
  { name: 'FAQPage schema', weight: 'Group B', desc: 'Quotable Q&A for answer engines' },
  { name: 'Answer-first copy', weight: 'Group B', desc: 'Declarative opening sentences AI can cite' },
  { name: 'llms.txt', weight: 'Group B', desc: 'Machine-readable site map for LLM crawlers' },
]

const UNLOCK_TIERS = [
  { tier: 'Instant', price: 'Free', items: ['Score out of 20', 'Group A vs B split', 'Crawler block alert', 'Toronto benchmark'], highlight: false },
  { tier: 'Full breakdown', price: 'Free · email', items: ['All criteria + evidence', 'Per-criterion fixes', 'Competitor comparison', 'Report in inbox'], highlight: true },
  { tier: 'AI visibility', price: '$10', items: ['5 live AI query tests', 'Page citability scores', 'Competitor AI visibility', 'PDF by email'], highlight: false },
]

function WalkthroughVisual({ kind }: { kind: (typeof WALKTHROUGH)[number]['visual'] }) {
  const s = AEO_SAMPLE
  if (kind === 'score') {
    return (
      <div className="rounded-sm border border-ink/10 bg-cream-50 p-6">
        <div className="flex items-center gap-6">
          <AeoScoreRing score={s.total} size={100} />
          <div className="flex-1">
            <p className="font-display text-xl text-ink">Below median ({s.benchmark})</p>
            <FreeToolSplitBar leftLabel="Group A" leftPct={s.groupA.pct ?? 0} rightLabel="Group B" rightPct={s.groupB.pct ?? 0} leftValue={`${s.groupA.pct}%`} rightValue={`${s.groupB.pct}%`} />
            <div className="mt-4"><FreeToolSparkline data={s.trend} height={40} /></div>
          </div>
        </div>
      </div>
    )
  }
  if (kind === 'crawlers') return <div className="rounded-sm border border-ink/10 bg-cream-50 p-5"><AeoCrawlerAccessList /></div>
  if (kind === 'criteria') return <div className="rounded-sm border border-ink/10 bg-cream-50 p-5"><AeoCriterionBarChart /></div>
  if (kind === 'competitors') return <div className="rounded-sm border border-ink/10 bg-cream-50 p-5"><AeoCompetitorBars /></div>
  return (
    <div className="rounded-sm border border-oxblood/25 bg-oxblood/5 p-5">
      <p className="font-mono text-[10px] uppercase text-oxblood">{s.fixPreview.page}</p>
      <p className="mt-2 font-medium text-ink">{s.fixPreview.issue}</p>
      <p className="mt-2 text-sm text-ink-600">{s.fixPreview.fix}</p>
    </div>
  )
}

type Props = {
  url: string
  error: string | null
  canSubmit: boolean
  turnstileSiteKey: string | undefined
  turnstileResetKey: number
  honeypot: string
  inputClass: string
  btnPrimary: string
  cardClass: string
  onUrlChange: (v: string) => void
  onTurnstileSuccess: (token: string) => void
  onTurnstileExpire: () => void
  onHoneypotChange: (v: string) => void
  onSubmit: (e: FormEvent) => void
}

function UrlScanForm(props: Props & { variant?: 'inline' | 'panel' }) {
  const {
    variant = 'panel',
    url,
    error,
    canSubmit,
    turnstileSiteKey,
    turnstileResetKey,
    honeypot,
    inputClass,
    btnPrimary,
    cardClass,
    onUrlChange,
    onTurnstileSuccess,
    onTurnstileExpire,
    onHoneypotChange,
    onSubmit,
  } = props

  if (variant === 'inline') {
    return (
      <form onSubmit={onSubmit} className={`${cardClass} text-left`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input type="text" value={url} onChange={(e) => onUrlChange(e.target.value)} placeholder="yourcompany.com" required className={`${inputClass} flex-1`} />
          <button type="submit" disabled={!canSubmit} className={`${btnPrimary} sm:min-w-[180px] shrink-0`}>Generate report →</button>
        </div>
        <FormProtectionFields turnstileSiteKey={turnstileSiteKey ?? ''} onTurnstileSuccess={onTurnstileSuccess} onTurnstileExpire={onTurnstileExpire} turnstileResetKey={turnstileResetKey} honeypotValue={honeypot} onHoneypotChange={onHoneypotChange} />
        {error ? <p className="mt-2 text-sm text-oxblood">{error}</p> : null}
      </form>
    )
  }

  return (
    <form onSubmit={onSubmit} className={`${cardClass} text-left`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Run your scan</p>
      <p className="mt-1 text-sm text-ink-600">You’ve seen the difference — enter your URL for a personalized report.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="text" value={url} onChange={(e) => onUrlChange(e.target.value)} placeholder="yourcompany.com" required className={`${inputClass} flex-1`} />
        <button type="submit" disabled={!canSubmit} className={`${btnPrimary} sm:min-w-[180px] shrink-0`}>Generate report →</button>
      </div>
      <FormProtectionFields turnstileSiteKey={turnstileSiteKey ?? ''} onTurnstileSuccess={onTurnstileSuccess} onTurnstileExpire={onTurnstileExpire} turnstileResetKey={turnstileResetKey} honeypotValue={honeypot} onHoneypotChange={onHoneypotChange} />
      {error ? <p className="mt-2 text-sm text-oxblood">{error}</p> : null}
    </form>
  )
}

export function AeoCheckerLanding(props: Props) {
  return (
    <div className="space-y-0">
      <AeoHeroLauncher
        url={props.url}
        error={props.error}
        canSubmit={props.canSubmit}
        turnstileSiteKey={props.turnstileSiteKey}
        turnstileResetKey={props.turnstileResetKey}
        honeypot={props.honeypot}
        btnPrimary={props.btnPrimary}
        onUrlChange={props.onUrlChange}
        onTurnstileSuccess={props.onTurnstileSuccess}
        onTurnstileExpire={props.onTurnstileExpire}
        onHoneypotChange={props.onHoneypotChange}
        onSubmit={props.onSubmit}
      />

      <AeoPhilosophyComparison />

      <section className="py-16 md:py-24 -mt-4 relative z-0">
        <FreeToolSectionHeader center label="Full sample report" title="Everything in one dashboard" description="Score, Group A/B split, crawler probe results, criteria bars, and page-level fixes — built from your URL after you scan." />
        <AeoSampleDashboard locked />
        <div className="mt-12 max-w-3xl mx-auto">
          <UrlScanForm {...props} variant="panel" />
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-ink/10 bg-cream-100/40">
        <FreeToolSectionHeader label="What to expect" title="Every section of your audit, explained" description="Sample visuals below — yours is personalized after the scan." />
        <div className="space-y-16 md:space-y-24">
          {WALKTHROUGH.map((row, i) => (
            <div key={row.tag} className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">{row.tag}</p>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-ink">{row.title}</h3>
                <p className="mt-4 text-ink-600 leading-relaxed">{row.body}</p>
              </div>
              <WalkthroughVisual kind={row.visual} />
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <FreeToolSectionHeader center label="Sneak peek" title="Click through the report sections" description="Overview, crawlers, criteria, competitors, and fixes — same structure after your scan." />
        <AeoReportExplorer />
      </section>

      <section className="py-16 md:py-24 border-t border-ink/10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16">
          <div>
            <FreeToolSectionHeader label="Scoring model" title="Twenty points, two groups" description="Group A = defaults. Group B = deliberate answer-engine work." />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CRITERIA_METHOD.map((p) => (
              <div key={p.name} className="border border-ink/10 bg-cream-50 p-4">
                <div className="flex justify-between gap-2">
                  <h3 className="font-display text-lg text-ink">{p.name}</h3>
                  <span className="font-mono text-[10px] text-oxblood">{p.weight}</span>
                </div>
                <p className="mt-2 text-sm text-ink-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-100/50 border-y border-ink/10">
        <FreeToolSectionHeader center label="What you unlock" title="Free score → email breakdown → optional AI report" />
        <div className="grid gap-6 lg:grid-cols-3">
          {UNLOCK_TIERS.map((t) => (
            <div key={t.tier} className={`flex flex-col border p-6 ${t.highlight ? 'border-oxblood/40 bg-oxblood/5 shadow-lg' : 'border-ink/10 bg-cream'}`}>
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">{t.tier}</p>
              <p className="mt-1 font-display text-2xl text-ink">{t.price}</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm text-ink-700">
                {t.items.map((item) => (
                  <li key={item} className="flex gap-2"><span className="text-oxblood">✓</span>{item}</li>
                ))}
              </ul>
              {t.tier === 'Instant' ? (
                <div className="mt-6 flex justify-center">
                  <AeoScoreRing score={12.5} size={80} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center border-t border-ink/10">
        <h2 className="font-display text-2xl md:text-4xl text-ink">Ready to see if AI can cite you?</h2>
        <p className="mt-4 text-ink-600 max-w-lg mx-auto">
          Generate your report — or try our{' '}
          <Link to="/gbp-audit?utm_source=aeo-checker&utm_medium=footer-cta" className="text-oxblood underline underline-offset-2">Local Visibility Scan</Link>.
        </p>
        <div className="mt-8 max-w-3xl mx-auto"><UrlScanForm {...props} variant="inline" /></div>
      </section>
    </div>
  )
}
