import { StratezikWordmark } from '../StratezikWordmark'

/** Matches stratezik-web StratezikLogo sizing on cheat sheet pages. */
export function CheatSheetLogo({ className = 'h-7' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/stratezik%20logo/favicon.svg?v=6"
        alt=""
        className="h-[1.75rem] w-[1.75rem] shrink-0"
        width={28}
        height={28}
      />
      <StratezikWordmark className="h-[1.05rem] w-auto min-w-0 sm:h-5" />
    </span>
  )
}
