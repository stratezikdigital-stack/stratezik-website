/** Sync mobile/touch check for first paint (avoid waiting on useEffect). */
export function getIsMobile(breakpoint = 768): boolean {
  if (typeof window === 'undefined') return false
  const narrow = window.innerWidth < breakpoint
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  return narrow || coarse
}
