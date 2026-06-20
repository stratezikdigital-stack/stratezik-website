import type { ReactNode } from 'react'

/** Wider research article canvas (tables, interactives, hero stats). */
export function ResearchArticleRoot({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[960px]">{children}</div>
}

/** Standard long-form reading measure for prose blocks. */
export function ResearchProse({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[720px] ${className}`.trim()}>{children}</div>
}

/** Full research width for data viz and tables. */
export function ResearchWide({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`w-full ${className}`.trim()}>{children}</div>
}

type Stat = { value: string; label: string; detail?: string }

export function ResearchHeroStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="border border-ink/12 bg-cream-50 px-4 py-5 md:px-5 md:py-6 shadow-[0_12px_40px_-28px_rgba(13,12,10,0.45)]"
        >
          <div className="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-none tracking-[-0.03em] text-ink">
            {stat.value}
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500 leading-snug">
            {stat.label}
          </p>
          {stat.detail ? <p className="mt-1.5 text-xs text-ink-600 leading-relaxed">{stat.detail}</p> : null}
        </div>
      ))}
    </div>
  )
}

export function ResearchExecutiveSummary({ children }: { children: ReactNode }) {
  return (
    <section
      className="border border-ink/12 bg-cream-50 px-5 py-6 md:px-8 md:py-8 ring-1 ring-ink/[0.04]"
      aria-label="Executive summary"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">Executive summary</p>
      <ul className="mt-4 space-y-3 text-ink-700 leading-relaxed list-none">{children}</ul>
    </section>
  )
}

export function ResearchSummaryItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" aria-hidden />
      <span>{children}</span>
    </li>
  )
}

export function ResearchFindingHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="mt-16 md:mt-20">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-400">
        Finding {String(number).padStart(2, '0')}
      </p>
      <h2 className="mt-2 font-display text-[clamp(1.65rem,4.5vw,2.75rem)] text-ink leading-[1.08] tracking-[-0.03em]">
        {title}
      </h2>
    </div>
  )
}

export function ResearchDataTable({
  caption,
  children,
}: {
  caption?: string
  children: ReactNode
}) {
  return (
    <figure className="my-8 border border-ink/10 bg-cream shadow-[0_16px_48px_-36px_rgba(13,12,10,0.5)] overflow-hidden">
      <div className="overflow-x-auto">{children}</div>
      {caption ? (
        <figcaption className="px-4 py-3 md:px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 leading-relaxed border-t border-ink/10 bg-cream-50">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function ResearchPullQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <blockquote className="my-10 border-l-[3px] border-oxblood pl-6 md:pl-8">
      <p className="font-display text-xl md:text-2xl text-ink leading-snug tracking-[-0.02em]">{children}</p>
      {attribution ? (
        <cite className="mt-3 block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400 not-italic">
          {attribution}
        </cite>
      ) : null}
    </blockquote>
  )
}

export function ResearchAnswerAside({
  id,
  question,
  children,
}: {
  id: string
  question: string
  children: ReactNode
}) {
  return (
    <aside
      id={id}
      className="border border-oxblood/20 bg-cream-50 px-5 py-6 md:px-8 md:py-8 ring-1 ring-oxblood/10"
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`} className="font-display text-xl md:text-2xl text-ink tracking-tight leading-snug">
        {question}
      </h2>
      <div className="mt-4 text-ink-700 leading-relaxed">{children}</div>
    </aside>
  )
}
