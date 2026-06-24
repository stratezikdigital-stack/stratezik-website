/** Symptom trackers vs Stratezik cause+fix — the positioning meat of the AEO landing. */

import { AEO_SAMPLE, AeoScoreRing } from './AeoCheckerCharts'

const COMPARE_ROWS = [
  {
    dimension: 'The question',
    tracker: '“Did ChatGPT mention our brand this month?”',
    stratezik: '“Can GPTBot read our site, understand our entity, and quote our copy?”',
  },
  {
    dimension: 'What it checks',
    tracker: 'Sampled AI answers to a curated prompt list',
    stratezik: 'robots.txt, raw HTML, schema, llms.txt, answer-first structure — on your live pages',
  },
  {
    dimension: 'When you get it',
    tracker: 'Monthly dashboard refresh',
    stratezik: 'Topline in ~20s after you enter a URL; fixes by email',
  },
  {
    dimension: 'What you can do Monday',
    tracker: '“Publish more thought leadership” (maybe)',
    stratezik: '“Add FAQPage schema on /pricing — tiers are buried in prose”',
  },
]

function TrackerMockPanel() {
  return (
    <div className="overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_24px_60px_-20px_rgba(33,31,28,0.15)]">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink/90 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink-400" />
        <span className="h-2 w-2 rounded-full bg-ink-400" />
        <span className="h-2 w-2 rounded-full bg-ink-400" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/40">ai-visibility.app</span>
      </div>
      <div className="border-b border-ink/10 bg-cream-100/80 px-5 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">Monthly report</p>
        <h3 className="mt-1 font-display text-xl text-ink">Typical AI visibility tracker</h3>
        <p className="mt-1 text-sm text-ink-500">Symptom only — mentions, not mechanics</p>
      </div>
      <div className="space-y-5 p-5 md:p-6">
        <div className="rounded-sm border border-ink/10 bg-cream-50 p-5 text-center">
          <p className="font-display text-5xl tracking-tight text-ink/80">12%</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-ink-400">AI visibility score</p>
          <p className="mt-2 text-xs text-ink-500">847 tracked prompts · Updated Feb 28</p>
        </div>

        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-wider text-ink-400">Share of voice (sample)</p>
          <div className="flex h-16 items-end gap-1.5">
            {[38, 52, 44, 61, 48, 55, 42].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-ink/15" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-2 text-[11px] italic text-ink-400">Bars show relative mentions — not tied to any page on your site.</p>
        </div>

        <div className="rounded-sm border border-dashed border-ink/20 bg-cream-100/60 p-4">
          <p className="text-sm leading-relaxed text-ink-600">
            “Your brand appeared in <strong>12%</strong> of sampled answers, up <strong>2 pts</strong> from last month.”
          </p>
          <p className="mt-3 text-xs text-ink-400">No URL, no schema detail, no robots.txt finding.</p>
        </div>

        <ul className="space-y-2.5 border-t border-ink/10 pt-5 text-sm text-ink-600">
          <li className="flex gap-2">
            <span className="text-ink-400">✗</span>
            <span>Can’t tell if PerplexityBot is blocked in robots.txt</span>
          </li>
          <li className="flex gap-2">
            <span className="text-ink-400">✗</span>
            <span>Doesn’t know if your pricing page renders without JavaScript</span>
          </li>
          <li className="flex gap-2">
            <span className="text-ink-400">✗</span>
            <span>No page-level fix list — just a trend line</span>
          </li>
        </ul>

        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
          Recommended action: Upgrade to see competitor breakdown →
        </p>
      </div>
    </div>
  )
}

function StratezikMockPanel() {
  const s = AEO_SAMPLE
  const blocked = s.bots.filter((b) => !b.allowed)

  return (
    <div className="overflow-hidden rounded-sm border border-oxblood/25 bg-cream shadow-[0_32px_80px_-24px_rgba(122,31,31,0.22)] ring-1 ring-oxblood/10">
      <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-oxblood/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" />
        <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">stratezik.com · aeo-checker</span>
      </div>
      <div className="border-b border-ink/10 bg-ink px-5 py-4 text-cream">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80">Live scan output</p>
        <h3 className="mt-1 font-display text-xl md:text-2xl">Stratezik AEO Readiness Checker</h3>
        <p className="mt-1 text-sm text-cream/60">Cause + fix — can AI read you, and what to change first</p>
      </div>
      <div className="space-y-5 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-5">
          <AeoScoreRing score={s.total} size={88} />
          <div className="min-w-[140px] flex-1">
            <p className="font-display text-2xl text-ink">
              {s.total} <span className="text-lg text-ink-400">/ {s.max}</span>
            </p>
            <p className="mt-1 text-sm text-ink-600">
              Toronto median {s.benchmark} · Group A {s.groupA.pct}% · Group B {s.groupB.pct}%
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-oxblood">Scored at scan time — not a monthly rollup</p>
          </div>
        </div>

        {blocked.length > 0 ? (
          <div className="rounded-sm border border-oxblood/30 bg-oxblood/5 p-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-oxblood">Critical · Crawler access</p>
            <p className="mt-2 text-sm text-ink-700">
              {blocked.length} AI crawler{blocked.length > 1 ? 's' : ''} blocked in robots.txt — including{' '}
              <strong>{blocked.map((b) => b.name).join(', ')}</strong>. Those engines cannot index or cite your pages until
              you allow them.
            </p>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-sm border border-ink/10 bg-cream-50 p-3">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Criterion · Group B</p>
            <p className="mt-1 text-sm font-medium text-ink">FAQPage schema</p>
            <p className="mt-1 text-xs text-ink-500">0/2 — no quotable Q&A for answer engines</p>
          </div>
          <div className="rounded-sm border border-ink/10 bg-cream-50 p-3">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-400">Criterion · Group A</p>
            <p className="mt-1 text-sm font-medium text-ink">Raw HTML readability</p>
            <p className="mt-1 text-xs text-ink-500">Pass — content visible without JavaScript</p>
          </div>
        </div>

        <div className="rounded-sm border border-oxblood/25 bg-oxblood/[0.04] p-4">
          <p className="font-mono text-[10px] uppercase text-oxblood">{s.fixPreview.page}</p>
          <p className="mt-2 font-medium text-ink">{s.fixPreview.issue}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.fixPreview.fix}</p>
          <p className="mt-3 text-xs text-ink-500">Evidence + full fix list unlock by email — Fix #1 is instant.</p>
        </div>

        <ul className="space-y-2.5 border-t border-ink/10 pt-5 text-sm text-ink-700">
          <li className="flex gap-2">
            <span className="text-oxblood">✓</span>
            <span>Probes GPTBot, ClaudeBot, Google-Extended, PerplexityBot on your live site</span>
          </li>
          <li className="flex gap-2">
            <span className="text-oxblood">✓</span>
            <span>20-point rubric split into defaults vs deliberate AEO work</span>
          </li>
          <li className="flex gap-2">
            <span className="text-oxblood">✓</span>
            <span>Page URLs, schema blocks, and copy changes — not “create more content”</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function AeoPhilosophyComparison() {
  return (
    <section className="py-16 md:py-24 border-t border-ink/10 bg-cream-100/50">
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Why this exists</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl text-ink tracking-tight leading-[1.08]">
          Visibility % tells you IF you showed up.{' '}
          <span className="text-oxblood">We tell you IF you CAN show up — and how to fix it.</span>
        </h2>
        <p className="mt-5 text-ink-600 leading-relaxed text-lg max-w-2xl mx-auto">
          Most AI trackers sample answers to branded prompts and hand you a monthly percentage. That’s a lagging symptom.
          Stratezik runs machine checks on your site — the same gates AI crawlers hit before they ever cite you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
        <TrackerMockPanel />
        <StratezikMockPanel />
      </div>

      <div className="mt-12 md:mt-16 overflow-hidden rounded-sm border border-ink/15 bg-cream shadow-[0_24px_60px_-20px_rgba(33,31,28,0.18)]">
        <div className="border-b border-ink/10 bg-ink px-5 py-3 md:px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">At a glance</p>
          <h3 className="mt-1 font-display text-xl text-cream">Tracker vs checker — four differences</h3>
        </div>
        <div className="hidden md:grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.15fr)] border-b border-ink/10 bg-cream-100">
          <div className="px-6 py-4" />
          <div className="border-l border-ink/10 px-6 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-400">Typical tracker</p>
            <p className="mt-1 text-xs text-ink-500">Symptom · monthly</p>
          </div>
          <div className="border-l border-oxblood/20 bg-oxblood/[0.06] px-6 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood">Stratezik checker</p>
            <p className="mt-1 text-xs text-ink-600">Cause + fix · live scan</p>
          </div>
        </div>
        {COMPARE_ROWS.map((row, i) => (
          <div
            key={row.dimension}
            className={`grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.15fr)] ${i < COMPARE_ROWS.length - 1 ? 'border-b border-ink/10' : ''}`}
          >
            <div className="border-b border-ink/10 bg-ink/[0.03] px-5 py-4 md:border-b-0 md:px-6 md:py-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-oxblood">{row.dimension}</p>
            </div>
            <div className="border-b border-ink/10 px-5 py-4 md:border-b-0 md:border-l md:border-ink/10 md:px-6 md:py-5">
              <p className="md:hidden mb-1 font-mono text-[9px] uppercase tracking-wider text-ink-400">Typical tracker</p>
              <p className="text-sm leading-relaxed text-ink-500">{row.tracker}</p>
            </div>
            <div className="border-l-0 border-oxblood/15 bg-oxblood/[0.04] px-5 py-4 md:border-l md:px-6 md:py-5">
              <p className="md:hidden mb-1 font-mono text-[9px] uppercase tracking-wider text-oxblood">Stratezik</p>
              <p className="text-sm leading-relaxed text-ink-800 font-medium">{row.stratezik}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
