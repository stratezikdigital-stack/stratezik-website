import { RefObject, useEffect } from 'react'
import { SectionName, useWorldStore } from './store'

/**
 * Registers a section's scroll bounds with the world store so the
 * orchestrator knows which section is on stage.
 */
export function useSection<T extends HTMLElement>(name: SectionName, ref: RefObject<T>) {
  const registerSection = useWorldStore((s) => s.registerSection)

  useEffect(() => {
    function measure() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const top = rect.top + window.scrollY
      registerSection(name, { top, height: rect.height })
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (ref.current) ro.observe(ref.current)
    window.addEventListener('resize', measure)
    // Re-measure once after a tick to catch late layout (fonts, async images).
    const t = window.setTimeout(measure, 250)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
    }
  }, [name, ref, registerSection])
}
