/** Report-first hero — URL entry lives inside report chrome, not a detached form card. */

import type { FormEvent } from 'react'
import { FormProtectionFields } from '../spam/FormProtectionFields'
import { AEO_SAMPLE, AeoScoreRing } from './AeoCheckerCharts'

type Props = {
  url: string
  error: string | null
  canSubmit: boolean
  turnstileSiteKey: string | undefined
  turnstileResetKey: number
  honeypot: string
  btnPrimary: string
  onUrlChange: (v: string) => void
  onTurnstileSuccess: (token: string) => void
  onTurnstileExpire: () => void
  onHoneypotChange: (v: string) => void
  onSubmit: (e: FormEvent) => void
}

export function AeoHeroLauncher(props: Props) {
  const s = AEO_SAMPLE
  const displayUrl = props.url.trim() || 'yourcompany.com'
  const blockedBot = s.bots.find((b) => !b.allowed)

  return (
    <section className="relative -mx-6 md:-mx-12 overflow-hidden bg-ink text-cream">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="aeo-hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#aeo-hero-grid)" />
        </svg>
      </div>

      <div className="relative px-6 md:px-12 pt-6 pb-0 md:pt-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="editorial-label text-gold/80">Stratezik · AEO Readiness Checker</div>
          <h1 className="mt-5 font-display text-display-3 text-cream leading-[1.04] tracking-[-0.035em]">
            Can AI <span className="text-gold">read, understand,</span> and cite your site?
          </h1>
          <p className="mt-5 text-cream/65 leading-relaxed text-lg max-w-2xl mx-auto">
            Not a vanity visibility %. A 20-point machine audit — crawler access, schema, answer-first copy, and
            page-level fixes. Benchmarked against 50 Toronto startups.
          </p>
        </div>

        {/* Report launcher — the URL field is the report domain bar, not a lead form */}
        <form
          onSubmit={props.onSubmit}
          className="relative z-10 mx-auto mt-10 md:mt-14 max-w-4xl rounded-sm border border-cream/15 bg-cream text-ink shadow-[0_40px_100px_-24px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center gap-2 border-b border-ink/10 bg-ink px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-oxblood/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cream/40" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-cream/45">
              AEO readiness report
            </span>
          </div>

          <div className="border-b-2 border-oxblood/25 bg-white px-5 py-5 md:px-6 md:py-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-oxblood px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
                Step 1
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-oxblood">Enter your website URL</p>
            </div>
            <p className="mt-2 text-sm text-ink-600">We scan your live site — not a sample. Type your domain below, then hit generate.</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-sm border-2 border-oxblood/30 bg-cream px-3 py-2.5 focus-within:border-oxblood focus-within:ring-2 focus-within:ring-oxblood/15">
                <span className="shrink-0 font-mono text-sm text-ink-400">https://</span>
                <input
                  type="text"
                  value={props.url}
                  onChange={(e) => props.onUrlChange(e.target.value)}
                  placeholder="yourcompany.com"
                  required
                  aria-label="Website URL"
                  autoFocus
                  className="min-w-0 flex-1 bg-transparent font-display text-xl md:text-2xl text-ink placeholder:text-ink-300 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!props.canSubmit}
                className={`${props.btnPrimary} w-full sm:w-auto sm:min-w-[200px] shrink-0`}
              >
                Generate report →
              </button>
            </div>
            {props.error ? <p className="mt-2 text-sm text-oxblood">{props.error}</p> : null}
            <FormProtectionFields
              turnstileSiteKey={props.turnstileSiteKey ?? ''}
              onTurnstileSuccess={props.onTurnstileSuccess}
              onTurnstileExpire={props.onTurnstileExpire}
              turnstileResetKey={props.turnstileResetKey}
              honeypotValue={props.honeypot}
              onHoneypotChange={props.onHoneypotChange}
            />
            <p className="mt-3 text-xs text-ink-500">
              Topline score in ~20s · Full breakdown by email · No account
            </p>
          </div>

          {/* Sample preview — visually subordinate to the scan input above */}
          <div className="border-t border-dashed border-ink/20 bg-cream-50/90 px-5 py-4 md:px-6 md:py-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-sm border border-ink/15 bg-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
                  Example only
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                  What your report includes
                </p>
              </div>
              <p className="text-xs text-ink-400">↑ Enter your URL above to run a real scan</p>
            </div>
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-6 md:items-center opacity-90">
              <div className="flex items-center gap-4">
                <AeoScoreRing score={s.total} size={72} />
                <div>
                  <p className="font-display text-lg text-ink/70">{displayUrl}</p>
                  <p className="text-xs text-ink-400">Sample · {s.total}/{s.max} · median {s.benchmark}</p>
                </div>
              </div>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-sm border border-ink/10 bg-cream-50 px-3 py-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-ink-400">Group A</p>
                <p className="font-display text-lg text-ink">{s.groupA.pct}%</p>
                <p className="text-[10px] text-ink-500">Defaults</p>
              </div>
              <div className="rounded-sm border border-ink/10 bg-cream-50 px-3 py-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-ink-400">Group B</p>
                <p className="font-display text-lg text-ink">{s.groupB.pct}%</p>
                <p className="text-[10px] text-ink-500">Deliberate AEO</p>
              </div>
              <div className="rounded-sm border border-oxblood/25 bg-oxblood/5 px-3 py-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-oxblood">Crawler</p>
                <p className="text-sm font-medium text-ink truncate">
                  {blockedBot ? `${blockedBot.name} blocked` : 'All allowed'}
                </p>
                <p className="text-[10px] text-ink-500">{s.crawlers.allowed}/{s.crawlers.total} allowed</p>
              </div>
            </div>
          </div>
          </div>
        </form>

        <div className="h-16 md:h-20" aria-hidden />
      </div>
    </section>
  )
}
