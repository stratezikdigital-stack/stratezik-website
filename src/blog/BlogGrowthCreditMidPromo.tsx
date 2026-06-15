import { useParams } from 'react-router-dom'
import { BlogGrowthCreditLink } from './BlogGrowthCreditLink'

/**
 * Mid-article Growth Credit mention — after intro / first aside.
 * Simple bullet highlight, not a card.
 */
export function BlogGrowthCreditMidPromo() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <ul
      className="my-12 md:my-14 list-disc pl-5 marker:text-oxblood text-ink-700 leading-relaxed"
      aria-label="Stratezik Growth Credit offer"
    >
      <li>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood block mb-1">
          $3,000 Growth Credit
        </span>
        Free assessment · credit applied to onboarding.{' '}
        <BlogGrowthCreditLink slug={slug ?? 'blog'} medium="mid">
          See if you qualify &rarr;
        </BlogGrowthCreditLink>
      </li>
    </ul>
  )
}
