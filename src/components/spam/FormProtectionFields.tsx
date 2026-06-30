import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

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
  // Force a fresh widget mount when Cloudflare reports a failed challenge.
  const [recoverKey, setRecoverKey] = useState(0)
  const errorAttempts = useRef(0)
  const [hardFailed, setHardFailed] = useState(false)

  const handleTurnstileError = useCallback(() => {
    // Drop any stale token so the form stays gated until a fresh pass.
    onTurnstileExpire?.()
    if (errorAttempts.current >= 3) {
      setHardFailed(true)
      return
    }
    errorAttempts.current += 1
    // Remount the widget after a short beat to clear the failed state.
    window.setTimeout(() => setRecoverKey((k) => k + 1), 1500)
  }, [onTurnstileExpire])

  const retryTurnstile = useCallback(() => {
    errorAttempts.current = 0
    setHardFailed(false)
    setRecoverKey((k) => k + 1)
  }, [])

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
        <div ref={turnstileSlotRef} className="mt-4 flex flex-col items-start gap-2 min-h-[65px]">
          {hardFailed ? (
            <div className="text-sm text-oxblood">
              Security check failed to load.{' '}
              <button type="button" className="underline underline-offset-2" onClick={retryTurnstile}>
                Try again
              </button>
              .
            </div>
          ) : activateTurnstile ? (
            <Suspense fallback={<div className="h-[65px] w-[300px] bg-cream-50 border border-ink/10" aria-hidden />}>
              <LazyTurnstile
                key={`${turnstileResetKey}-${recoverKey}`}
                siteKey={turnstileSiteKey}
                onSuccess={onTurnstileSuccess}
                onExpire={() => onTurnstileExpire?.()}
                onError={handleTurnstileError}
                options={{ theme: 'light', size: 'normal', retry: 'auto', retryInterval: 2000 }}
              />
            </Suspense>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
