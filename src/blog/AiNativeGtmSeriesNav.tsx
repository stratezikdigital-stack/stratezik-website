import { Link } from 'react-router-dom'
import { AI_NATIVE_GTM_PARTS, AI_NATIVE_GTM_SERIES_TITLE } from './aiNativeGtmSeries'

type Props = {
  currentSlug: string
  variant?: 'top' | 'bottom'
}

export default function AiNativeGtmSeriesNav({ currentSlug, variant = 'top' }: Props) {
  const current = AI_NATIVE_GTM_PARTS.find((p) => p.slug === currentSlug)

  return (
    <nav
      className={
        variant === 'top'
          ? 'mb-12 p-5 md:p-6 border border-ink/10 bg-cream-50'
          : 'mt-14 p-5 md:p-6 border border-ink/10 bg-cream-50'
      }
      aria-label={`${AI_NATIVE_GTM_SERIES_TITLE} series`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">Four-part series · Toronto founders</p>
      <p className="mt-2 font-display text-lg text-ink tracking-tight">{AI_NATIVE_GTM_SERIES_TITLE}</p>
      {current ? (
        <p className="mt-1 text-sm text-ink-600">
          You are on Part {current.part}: {current.shortTitle} ({current.role})
        </p>
      ) : null}
      <ol className="mt-5 space-y-2 text-sm leading-relaxed">
        {AI_NATIVE_GTM_PARTS.map((p) => {
          const active = p.slug === currentSlug
          return (
            <li key={p.part} className={active ? 'text-ink font-medium' : 'text-ink-700'}>
              {active ? (
                <span>
                  Part {p.part}: {p.shortTitle}{' '}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">(this article)</span>
                </span>
              ) : p.slug ? (
                <Link to={`/blog/${p.slug}`} className="text-oxblood hover:text-ink underline underline-offset-2">
                  Part {p.part}: {p.shortTitle}
                </Link>
              ) : (
                <span>
                  Part {p.part}: {p.shortTitle}{' '}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">(coming soon)</span>
                </span>
              )}
              <span className="text-ink-500"> · {p.role}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
