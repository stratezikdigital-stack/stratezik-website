import { useIsMobile } from '../three/hooks/useIsMobile'
import { useReducedMotion } from '../three/hooks/useReducedMotion'

/** Desktop-only Framer entrance/scroll animations (mobile prefers instant paint). */
export function useMotionEnabled(): boolean {
  const mobile = useIsMobile()
  const reduced = useReducedMotion()
  return !mobile && !reduced
}
