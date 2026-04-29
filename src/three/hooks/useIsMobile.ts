import { useEffect, useState } from 'react'

/** True when viewport is narrow OR device exposes coarse pointer (touch). */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const compute = () => {
      const narrow = window.innerWidth < breakpoint
      const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
      setIsMobile(narrow || coarse)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [breakpoint])

  return isMobile
}
