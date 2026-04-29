import { Suspense, lazy, useEffect, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { useReducedMotion } from '../hooks/useReducedMotion'

const CanvasInner = lazy(() => import('./WorldCanvasInner'))

/**
 * Persistent global Canvas mounted once in App.tsx, sitting fixed behind
 * all HTML. Mounts after first idle so HTML LCP isn't blocked.
 *
 * Note: we deliberately mount even with `prefers-reduced-motion` because
 * the camera motion here is scroll-driven (user-initiated), not autonomous.
 * Autonomous wobble/drift (Float, atmosphere drift) is gated separately
 * inside the scene.
 */
export function WorldCanvas() {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
    let timeoutId: number | undefined
    if (ric) {
      ric(() => setReady(true), { timeout: 800 })
    } else {
      timeoutId = window.setTimeout(() => setReady(true), 400)
    }
    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ready ? (
        <Suspense fallback={null}>
          <CanvasInner mobile={mobile} reduced={reduced} />
        </Suspense>
      ) : null}
    </div>
  )
}
