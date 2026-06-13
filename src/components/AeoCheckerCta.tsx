import { Link } from 'react-router-dom'
import { AEO_BENCHMARK } from '../aeo/benchmark'
import { buildAeoCheckerUrl, type AeoCheckerLinkOpts } from '../aeo/checkerLinks'

type Props = AeoCheckerLinkOpts & {
  variant?: 'banner' | 'inline' | 'compact'
  headline?: string
  body?: string
  className?: string
}

const DEFAULT_COPY = {
  banner: {
    headline: 'Run the same 20-point test on your site',
    body: `Free, machine-verified, ~20 seconds. Benchmarked against ${AEO_BENCHMARK.n} funded Toronto startups — median score ${AEO_BENCHMARK.median}/20.`,
  },
  inline: {
    headline: 'See your score before you book a call',
    body: `Run our free AEO Readiness Checker — the same test behind our Toronto startup audit. Median funded startup: ${AEO_BENCHMARK.median}/20.`,
  },
  compact: {
    headline: 'Free AEO readiness score',
    body: `~20 seconds · benchmarked vs ${AEO_BENCHMARK.n} Toronto startups`,
  },
}

export function AeoCheckerCta({
  variant = 'inline',
  source = 'site',
  campaign,
  medium,
  url,
  headline,
  body,
  className = '',
}: Props) {
  const href = buildAeoCheckerUrl({ source, campaign, medium, url })
  const copy = DEFAULT_COPY[variant]
  const title = headline ?? copy.headline
  const desc = body ?? copy.body

  if (variant === 'compact') {
    return (
      <p className={`text-ink-600 leading-relaxed ${className}`}>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood block mb-2">
          {title}
        </span>
        {desc}{' '}
        <Link to={href} className="text-oxblood underline underline-offset-2 hover:text-ink transition-colors">
          Check your score &rarr;
        </Link>
      </p>
    )
  }

  if (variant === 'banner') {
    return (
      <aside
        className={`p-8 md:p-10 bg-ink text-cream border border-ink/10 ${className}`}
        aria-label="AEO Readiness Checker"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Free tool</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">{title}</h2>
        <p className="mt-5 text-cream/85 leading-relaxed">{desc}</p>
        <Link
          to={href}
          data-cursor="cta"
          data-cursor-text="Score"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          Check my AEO score
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          No signup for your topline score · full report via email
        </p>
      </aside>
    )
  }

  return (
    <aside
      className={`border border-ink/15 bg-cream-50/80 p-6 md:p-8 ${className}`}
      aria-label="AEO Readiness Checker"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">Free AEO checker</p>
      <h2 className="mt-3 font-display text-xl md:text-2xl text-ink tracking-tight">{title}</h2>
      <p className="mt-3 text-ink-600 leading-relaxed">{desc}</p>
      <Link
        to={href}
        data-cursor="cta"
        data-cursor-text="Score"
        className="mt-5 inline-flex items-center gap-3 bg-ink text-cream px-6 py-3 font-medium hover:bg-oxblood transition-colors"
      >
        Check my score
        <span aria-hidden className="font-mono">
          &rarr;
        </span>
      </Link>
    </aside>
  )
}
