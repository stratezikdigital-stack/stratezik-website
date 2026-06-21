import { useEffect, useState } from 'react'
import { getIsMobile } from '../../utils/device'

/** True when viewport is narrow OR device exposes coarse pointer (touch). */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => getIsMobile(breakpoint))

  useEffect(() => {
    const compute = () => setIsMobile(getIsMobile(breakpoint))
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [breakpoint])

  return isMobile
}
