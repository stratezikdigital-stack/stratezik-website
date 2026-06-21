import type { ServiceHeroSources } from '../services/serviceImages'

type ServiceHeroImageProps = {
  sources: ServiceHeroSources
  alt: string
  width: number
  height: number
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

/** Responsive service hero with AVIF/WebP and PNG fallback. */
export function ServiceHeroImage({
  sources,
  alt,
  width,
  height,
  className,
  fetchPriority,
}: ServiceHeroImageProps) {
  return (
    <picture>
      <source srcSet={sources.avif} type="image/avif" />
      <source srcSet={sources.webp} type="image/webp" />
      <img
        src={sources.png}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        decoding="async"
      />
    </picture>
  )
}
