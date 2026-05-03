import { ReactNode, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, CanvasProps } from '@react-three/fiber'
import { useInView } from './hooks/useInView'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useIsMobile } from './hooks/useIsMobile'

interface SceneShellProps {
  /** Aspect ratio for the wrapper, e.g. '1 / 1' for square, '4 / 3' for landscape. */
  aspect?: string
  /** Static fallback shown when reduced-motion is set. */
  fallback?: ReactNode
  /** Camera position. */
  camera?: CanvasProps['camera']
  /** Custom DPR cap (mobile gets clamped). */
  dpr?: [number, number]
  /** Pass-through Canvas children (the scene). */
  children: ReactNode
  /** Optional className on the wrapper div. */
  className?: string
  /** Disable shadows entirely (mobile / low-power scenes). */
  shadows?: boolean
  /** When true, scene re-renders every frame; when false, frameloop is "demand". */
  alwaysRender?: boolean
}

/**
 * Wraps a Canvas with sensible defaults: lazy mount via IntersectionObserver,
 * mobile DPR clamp, reduced-motion fallback, demand frameloop, pause on tab blur.
 */
export function SceneShell({
  aspect = '1 / 1',
  fallback,
  camera = { position: [0, 1.6, 4.5], fov: 35 },
  dpr = [1, 2],
  children,
  className,
  shadows = true,
  alwaysRender = false,
}: SceneShellProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const visible = useInView(wrapperRef, { rootMargin: '150px' })
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [tabHidden, setTabHidden] = useState(false)

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const finalDpr: [number, number] = mobile ? [1, Math.min(1.5, dpr[1])] : dpr
  const useShadows = shadows && !mobile
  // Reduced-motion still renders the scene  -  it's the per-frame animations
  // (Float speed, useFrame deltas) that should be quieted, not the visuals.
  const mountCanvas = visible
  const wantsAnimation = alwaysRender && !tabHidden && !reduced

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ position: 'relative', aspectRatio: aspect, width: '100%' }}
      aria-hidden
    >
      {mountCanvas ? (
        <Canvas
          camera={camera}
          dpr={finalDpr}
          shadows={useShadows}
          frameloop={wantsAnimation ? 'always' : 'demand'}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {fallback}
        </div>
      )}
    </div>
  )
}
