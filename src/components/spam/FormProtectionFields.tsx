import { Turnstile } from '@marsidev/react-turnstile'

type FormProtectionFieldsProps = {
  turnstileSiteKey: string
  onTurnstileSuccess: (token: string) => void
  onTurnstileExpire?: () => void
  /** Unique key to reset widget after each submission attempt. */
  turnstileResetKey?: number
  honeypotName?: string
  honeypotValue: string
  onHoneypotChange: (value: string) => void
}

/**
 * Hidden honeypot + Cloudflare Turnstile widget for bot-resistant forms.
 */
export function FormProtectionFields({
  turnstileSiteKey,
  onTurnstileSuccess,
  onTurnstileExpire,
  turnstileResetKey = 0,
  honeypotName = 'website',
  honeypotValue,
  onHoneypotChange,
}: FormProtectionFieldsProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
        tabIndex={-1}
      >
        <label htmlFor={`hp-${honeypotName}`}>Leave blank</label>
        <input
          id={`hp-${honeypotName}`}
          name={honeypotName}
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={honeypotValue}
          onChange={(e) => onHoneypotChange(e.target.value)}
        />
      </div>

      {turnstileSiteKey ? (
        <div className="mt-4 flex justify-start">
          <Turnstile
            key={turnstileResetKey}
            siteKey={turnstileSiteKey}
            onSuccess={onTurnstileSuccess}
            onExpire={() => onTurnstileExpire?.()}
            options={{ theme: 'light', size: 'normal' }}
          />
        </div>
      ) : null}
    </>
  )
}
