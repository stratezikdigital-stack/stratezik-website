/** Unified Stratezik lockup (mark + wordmark) for cheat sheet immersive pages. */
export function CheatSheetLogo({ className = 'h-7 w-auto' }: { className?: string }) {
  return (
    <img
      src="/branding/stratezik-lockup.png"
      alt="Stratezik"
      className={className}
      width={140}
      height={28}
      decoding="async"
    />
  )
}
