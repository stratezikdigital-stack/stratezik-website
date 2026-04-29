import { RefObject, useEffect, useState } from 'react'

/** Returns true once the element enters the viewport (one-shot by default). */
export function useInView<T extends Element>(
  ref: RefObject<T>,
  { rootMargin = '200px', once = true, threshold = 0.05 }: { rootMargin?: string; once?: boolean; threshold?: number } = {}
): boolean {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            if (once) obs.disconnect()
          } else if (!once) {
            setInView(false)
          }
        }
      },
      { rootMargin, threshold }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [ref, rootMargin, once, threshold])

  return inView
}
