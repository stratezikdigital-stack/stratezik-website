import { suggestEmailCorrection } from '../../lib/email/suggestEmail'

/**
 * Inline "Did you mean …?" hint shown under an email input when the typed
 * domain looks like a typo of a popular provider or TLD. Clicking the
 * suggestion applies the fix. Purely additive — never blocks submission.
 */
export function EmailTypoHint({
  email,
  onAccept,
  className = '',
}: {
  email: string
  onAccept: (corrected: string) => void
  className?: string
}) {
  const suggestion = suggestEmailCorrection(email)
  if (!suggestion) return null

  return (
    <p className={`font-mono text-[11px] leading-relaxed text-ink-500 ${className}`}>
      Did you mean{' '}
      <button
        type="button"
        onClick={() => onAccept(suggestion)}
        className="font-semibold text-oxblood underline underline-offset-2 hover:text-ink"
      >
        {suggestion}
      </button>
      ?
    </p>
  )
}
