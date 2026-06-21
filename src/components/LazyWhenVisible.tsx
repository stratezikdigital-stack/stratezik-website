import { ComponentType, useEffect, useRef, useState } from 'react'

type LazyWhenVisibleProps = {
  loader: () => Promise<{ default: ComponentType }>
  /** Reserve space before the chunk loads to limit CLS. */
  minHeight?: string
  /** Start fetching before the block enters the viewport. */
  rootMargin?: string
  /** Skip intersection wait (e.g. /#contact-form deep links). */
  eager?: boolean
}

/**
 * Dynamic-import a section only when the user scrolls near it.
 * Keeps the initial homepage bundle off below-fold React trees.
 */
export function LazyWhenVisible({
  loader,
  minHeight = '320px',
  rootMargin = '480px 0px',
  eager = false,
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Component, setComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (Component) return
    const el = ref.current

    let cancelled = false
    const startLoad = () => {
      void loader().then((mod) => {
        if (!cancelled) setComponent(() => mod.default)
      })
    }

    if (eager) {
      startLoad()
      return () => {
        cancelled = true
      }
    }

    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      startLoad()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startLoad()
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [Component, eager, loader, rootMargin])

  if (!Component) {
    return <div ref={ref} style={{ minHeight }} aria-hidden="true" />
  }

  return <Component />
}
