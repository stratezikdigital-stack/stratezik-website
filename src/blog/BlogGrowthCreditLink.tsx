import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { buildGrowthCreditUrl } from '../growth-credit/growthCreditLinks'

type Props = {
  children: ReactNode
  slug?: string
  medium?: string
  className?: string
}

/** Inline Growth Credit CTA for blog copy — routes to /growth-credit with UTM tagging. */
export function BlogGrowthCreditLink({
  children,
  slug = 'blog',
  medium = 'inline',
  className = 'text-oxblood underline underline-offset-2 hover:text-ink transition-colors',
}: Props) {
  const href = buildGrowthCreditUrl({
    source: slug.startsWith('blog-') ? slug : `blog-${slug}`,
    medium,
    campaign: 'growth-credit',
  })

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}
