import { ReactNode, useEffect } from 'react'
import { useWorldStore } from '../three/world/store'

/** Native scroll + world-store progress on mobile — no Lenis import. */
export function MobileScrollShell({ children }: { children: ReactNode }) {
  const setProgress = useWorldStore((s) => s.setProgress)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(scrollY / limit, scrollY, limit)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [setProgress])

  return <>{children}</>
}
