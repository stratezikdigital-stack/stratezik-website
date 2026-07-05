import { useState } from 'react'
import { getBlogHeroImagePath } from './blogShareImages'

type BlogHeroImageProps = {
  slug: string
  title: string
  className?: string
}

/** Full-width hero banner shown at the top of each blog article. */
export function BlogHeroImage({ slug, title, className = '' }: BlogHeroImageProps) {
  const src = getBlogHeroImagePath(slug)
  const [hidden, setHidden] = useState(false)

  if (!src || hidden) return null

  return (
    <figure className={`mx-auto w-full max-w-[960px] ${className}`.trim()}>
      <img
        src={src}
        alt={title}
        width={1024}
        height={576}
        decoding="async"
        fetchPriority="high"
        onError={() => setHidden(true)}
        className="w-full h-auto border border-ink/10 shadow-[0_20px_60px_-40px_rgba(13,12,10,0.55)]"
      />
    </figure>
  )
}
