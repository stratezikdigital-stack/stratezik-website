import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWorldStore } from './store'
import { setLenis } from './lenisRef'

interface SmoothScrollProps {
  children: ReactNode
}

/**
 * Provides Lenis smooth scrolling for the whole document and pipes scroll
 * state into the world store every frame. On reduced-motion, falls back to
 * native scrolling + a passive scroll listener.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion()
  const setProgress = useWorldStore((s) => s.setProgress)

  useEffect(() => {
    if (reduced) {
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
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    })

    lenis.on('scroll', (e: { scroll: number; limit: number; progress: number }) => {
      setProgress(e.progress, e.scroll, e.limit)
    })

    setLenis(lenis)

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onResize = () => lenis.resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      setLenis(null)
      lenis.destroy()
    }
  }, [reduced, setProgress])

  return <>{children}</>
}
