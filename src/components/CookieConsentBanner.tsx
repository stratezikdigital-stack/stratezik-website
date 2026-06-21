import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCookieConsent, setCookieConsent, type CookieConsentLevel } from '../lib/cookieConsent'

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (getCookieConsent() !== null) return undefined

    let cancelled = false
    const show = () => {
      if (!cancelled) setVisible(true)
    }

    // Defer until after typical mobile LCP so the hero paints first.
    const timeoutId = window.setTimeout(show, 2400)
    const ric = window.requestIdleCallback
    let idleId: number | undefined
    if (ric) {
      idleId = ric(show, { timeout: 3200 })
    }

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId)
    }
  }, [])

  function choose(level: CookieConsentLevel) {
    setCookieConsent(level)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-ink/15 bg-cream shadow-[0_-8px_32px_rgba(26,26,26,0.08)]"
    >
      <div className="container-custom px-6 md:px-12 py-5 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-3xl">
            <p
              id="cookie-consent-heading"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood"
            >
              Cookies &amp; privacy
            </p>
            <p id="cookie-consent-desc" className="mt-2 text-sm text-ink-700 leading-relaxed">
              We use essential cookies so the Site works. With your consent, we also use analytics and
              advertising cookies to understand traffic and measure campaigns. See our{' '}
              <Link to="/privacy#cookies" className="text-oxblood underline underline-offset-2">
                Privacy Notice
              </Link>{' '}
              for details and your choices under PIPEDA, CASL, Law 25, GDPR, and CPRA.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => choose('essential')}
              className="btn-secondary text-sm px-5 py-2.5"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => choose('all')}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Accept all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
