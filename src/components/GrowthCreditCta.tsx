import { Link } from 'react-router-dom'
import { buildGrowthCreditUrl, type GrowthCreditLinkOpts } from '../growth-credit/growthCreditLinks'

type Props = GrowthCreditLinkOpts & {
  variant?: 'banner' | 'inline' | 'compact'
  headline?: string
  body?: string
  className?: string
}

const DEFAULT_COPY = {
  banner: {
    headline: '$3,000 in Growth Credits for qualifying Canadian SMBs',
    body: 'Apply the credit against onboarding after a free 20-minute growth assessment. Local search, paid ads, and delivery platforms in one roadmap.',
  },
  inline: {
    headline: 'Claim $3,000 in Stratezik Growth Credits',
    body: 'Qualifying Canadian startups and SMBs can offset onboarding with a credit applied to local search, paid media, and delivery app work.',
  },
  compact: {
    headline: '$3,000 Growth Credit',
    body: 'Free assessment · credit applied to onboarding',
  },
}

export function GrowthCreditCta({
  variant = 'inline',
  source = 'site',
  campaign,
  medium,
  headline,
  body,
  className = '',
}: Props) {
  const href = buildGrowthCreditUrl({ source, campaign, medium })
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
          See if you qualify &rarr;
        </Link>
      </p>
    )
  }

  if (variant === 'banner') {
    return (
      <aside
        className={`p-8 md:p-10 bg-oxblood text-cream border border-ink/10 ${className}`}
        aria-label="Stratezik Growth Credit"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Limited program</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">{title}</h2>
        <p className="mt-5 text-cream/90 leading-relaxed">{desc}</p>
        <Link
          to={href}
          data-cursor="cta"
          data-cursor-text="Claim"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold hover:text-ink transition-colors"
        >
          Request your free assessment
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55">
          Response within 1 business day · no lock-in to qualify
        </p>
      </aside>
    )
  }

  return (
    <aside
      className={`border border-ink/15 bg-cream-50/80 p-6 md:p-8 ${className}`}
      aria-label="Stratezik Growth Credit"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">Growth credit</p>
      <h2 className="mt-3 font-display text-xl md:text-2xl text-ink tracking-tight">{title}</h2>
      <p className="mt-3 text-ink-600 leading-relaxed">{desc}</p>
      <Link
        to={href}
        data-cursor="cta"
        data-cursor-text="Claim"
        className="mt-5 inline-flex items-center gap-3 bg-ink text-cream px-6 py-3 font-medium hover:bg-oxblood transition-colors"
      >
        Claim your credit
        <span aria-hidden className="font-mono">
          &rarr;
        </span>
      </Link>
    </aside>
  )
}
