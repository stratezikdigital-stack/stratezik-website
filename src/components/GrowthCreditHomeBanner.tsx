import { Link } from 'react-router-dom'
import { buildGrowthCreditUrl } from '../growth-credit/growthCreditLinks'

export function GrowthCreditHomeBanner() {
  const href = buildGrowthCreditUrl({ source: 'home', medium: 'banner', campaign: 'growth-credit' })

  return (
    <aside
      className="relative bg-oxblood text-cream border-y border-cream/10"
      aria-label="Stratezik Growth Credit promotion"
    >
      <div className="container-custom px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">
              Limited offer
            </p>
            <p className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-none tracking-[-0.04em]">
              $3,000
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">
              Growth credit
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            <h2 className="font-display text-display-3 md:text-[2.35rem] tracking-tight leading-[1.05] max-w-3xl">
              Marketing credits for Canadian startups and SMBs ready to scale.
            </h2>
            <p className="mt-5 text-cream/85 leading-relaxed max-w-2xl">
              Qualifying businesses receive $3,000 applied against onboarding after a free 20-minute
              growth assessment. Local search, paid ads, and delivery platforms in one plan.
            </p>
            <Link
              to={href}
              data-cursor="cta"
              data-cursor-text="Claim"
              className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold transition-colors"
            >
              Claim your Growth Credit
              <span aria-hidden className="font-mono">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
