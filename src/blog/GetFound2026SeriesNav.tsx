import { Link } from 'react-router-dom'
import { GET_FOUND_2026_PARTS, GET_FOUND_2026_SERIES_TITLE } from './getFound2026Series'

type Props = {
  currentSlug: string
  variant?: 'top' | 'bottom'
}

/** Cross-links all five parts; highlights the active article. */
export default function GetFound2026SeriesNav({ currentSlug, variant = 'top' }: Props) {
  const current = GET_FOUND_2026_PARTS.find((p) => p.slug === currentSlug)

  return (
    <nav
      className={
        variant === 'top'
          ? 'mb-12 p-5 md:p-6 border border-ink/10 bg-cream-50'
          : 'mt-14 p-5 md:p-6 border border-ink/10 bg-cream-50'
      }
      aria-label={`${GET_FOUND_2026_SERIES_TITLE} series`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
        Five-part series · read in order
      </p>
      <p className="mt-2 font-display text-lg text-ink tracking-tight">{GET_FOUND_2026_SERIES_TITLE}</p>
      {current ? (
        <p className="mt-1 text-sm text-ink-600">
          You are on Part {current.part}: {current.shortTitle} ({current.role})
        </p>
      ) : null}
      <ol className="mt-5 space-y-2 text-sm leading-relaxed">
        {GET_FOUND_2026_PARTS.map((p) => {
          const active = p.slug === currentSlug
          return (
            <li key={p.slug} className={active ? 'text-ink font-medium' : 'text-ink-700'}>
              {active ? (
                <span>
                  Part {p.part}: {p.shortTitle}{' '}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">(this article)</span>
                </span>
              ) : (
                <Link to={`/blog/${p.slug}`} className="text-oxblood hover:text-ink underline underline-offset-2">
                  Part {p.part}: {p.shortTitle}
                </Link>
              )}
              <span className="text-ink-500"> · {p.role}</span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
