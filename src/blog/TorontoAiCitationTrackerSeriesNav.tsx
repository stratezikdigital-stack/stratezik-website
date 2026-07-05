import { Link } from 'react-router-dom'
import {
  TORONTO_AI_CITATION_TRACKER_EDITIONS,
  TORONTO_AI_CITATION_TRACKER_HUB_SLUG,
  TORONTO_AI_CITATION_TRACKER_TITLE,
} from './torontoAiCitationTrackerSeries'

type Props = {
  currentSlug?: string
  variant?: 'top' | 'bottom'
}

/** Hub + monthly edition cross-links for the recurring citation tracker. */
export function TorontoAiCitationTrackerSeriesNav({ currentSlug, variant = 'top' }: Props) {
  const onHub = currentSlug === TORONTO_AI_CITATION_TRACKER_HUB_SLUG

  return (
    <nav
      className={
        variant === 'top'
          ? 'mb-12 p-5 md:p-6 border border-ink/10 bg-cream-50'
          : 'mt-14 p-5 md:p-6 border border-ink/10 bg-cream-50'
      }
      aria-label={`${TORONTO_AI_CITATION_TRACKER_TITLE} series`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">Monthly research series</p>
      <p className="mt-2 font-display text-lg text-ink tracking-tight">{TORONTO_AI_CITATION_TRACKER_TITLE}</p>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        {onHub ? (
          <>You are on the series hub — the canonical home for every edition.</>
        ) : (
              <>
                Edition:{' '}
                {TORONTO_AI_CITATION_TRACKER_EDITIONS.find((e) => e.slug === currentSlug)?.monthLabel ?? 'Archive'}
                .{' '}
                <Link
                  to={`/blog/${TORONTO_AI_CITATION_TRACKER_HUB_SLUG}`}
                  className="text-oxblood underline underline-offset-2 hover:text-ink"
                >
                  View the tracker hub
                </Link>
              </>
            )}
      </p>
      <ol className="mt-5 space-y-2 text-sm leading-relaxed list-none">
        <li className={onHub ? 'text-ink font-medium' : 'text-ink-700'}>
          {onHub ? (
            <span>
              Series hub{' '}
              <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">(this page)</span>
            </span>
          ) : (
            <Link
              to={`/blog/${TORONTO_AI_CITATION_TRACKER_HUB_SLUG}`}
              className="text-oxblood hover:text-ink underline underline-offset-2"
            >
              Series hub
            </Link>
          )}
          <span className="text-ink-500"> · Latest edition + archive</span>
        </li>
        {TORONTO_AI_CITATION_TRACKER_EDITIONS.map((edition) => {
          const active = edition.slug === currentSlug
          return (
            <li key={edition.slug} className={active ? 'text-ink font-medium' : 'text-ink-700'}>
              {active ? (
                <span>
                  {edition.monthLabel}: {edition.headline}{' '}
                  <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">(this edition)</span>
                </span>
              ) : (
                <Link
                  to={`/blog/${edition.slug}`}
                  className="text-oxblood hover:text-ink underline underline-offset-2"
                >
                  {edition.monthLabel}: {edition.headline}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
