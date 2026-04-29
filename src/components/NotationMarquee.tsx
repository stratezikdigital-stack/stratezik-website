/**
 * Notation marquee — divider between sections.
 *
 * An infinite-scrolling row of chess notation + editorial pull-quote
 * fragments. Two variants:
 *   • dark  — ink background, cream type. Used to punctuate.
 *   • light — cream background, ink type. Quieter rhythm.
 *
 * Pure CSS animation (no JS) so it costs effectively nothing.
 */
interface NotationMarqueeProps {
  lines: string[]
  variant?: 'dark' | 'light'
}

export function NotationMarquee({ lines, variant = 'dark' }: NotationMarqueeProps) {
  const isDark = variant === 'dark'
  const containerCls = isDark
    ? 'bg-ink text-cream/90 border-y border-ink-700'
    : 'bg-cream text-ink border-y border-ink/10'
  const sepCls = isDark ? 'text-cream/35' : 'text-ink/35'

  // Render the line list twice so the loop is seamless.
  const rendered = (
    <span className="flex items-center gap-10 px-5 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-[-0.02em] whitespace-nowrap">
      {lines.map((line, i) => (
        <span key={i} className="flex items-center gap-10">
          <span>{line}</span>
          <span className={sepCls} aria-hidden>&#9670;</span>
        </span>
      ))}
    </span>
  )

  return (
    <div
      aria-hidden
      className={`relative ${containerCls} py-5 overflow-hidden`}
    >
      <div className="marquee-track flex">
        {rendered}
        {rendered}
      </div>
    </div>
  )
}
