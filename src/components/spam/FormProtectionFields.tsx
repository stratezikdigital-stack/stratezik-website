import { lazy, Suspense, useEffect, useRef, useState } from 'react'

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

const LazyTurnstile = lazy(() =>
  import('@marsidev/react-turnstile').then((mod) => ({ default: mod.Turnstile })),
)

/**
 * Hidden honeypot + Cloudflare Turnstile widget for bot-resistant forms.
 * Turnstile loads only when the form nears the viewport.
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
  const turnstileSlotRef = useRef<HTMLDivElement>(null)
  const [activateTurnstile, setActivateTurnstile] = useState(false)

  useEffect(() => {
    if (!turnstileSiteKey || activateTurnstile) return
    const el = turnstileSlotRef.current
    if (!el) return

    const activate = () => setActivateTurnstile(true)

    if (typeof IntersectionObserver === 'undefined') {
      activate()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          activate()
          io.disconnect()
        }
      },
      { rootMargin: '240px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [turnstileSiteKey, activateTurnstile])

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
        <div ref={turnstileSlotRef} className="mt-4 flex justify-start min-h-[65px]">
          {activateTurnstile ? (
            <Suspense fallback={<div className="h-[65px] w-[300px] bg-cream-50 border border-ink/10" aria-hidden />}>
              <LazyTurnstile
                key={turnstileResetKey}
                siteKey={turnstileSiteKey}
                onSuccess={onTurnstileSuccess}
                onExpire={() => onTurnstileExpire?.()}
                options={{ theme: 'light', size: 'normal' }}
              />
            </Suspense>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
