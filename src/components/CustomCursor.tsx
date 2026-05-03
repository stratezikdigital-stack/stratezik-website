import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor — Champion's Hall signature.
 *
 * Two layered elements:
 *   • a small ink dot that tracks the pointer 1:1
 *   • a larger ring that lerps behind with damping (Lusion-style trail)
 *
 * On hover over `[data-cursor]` elements:
 *   • the ring fattens and changes mode
 *   • optional `data-cursor-text` shows a tiny label inside the ring
 *
 * Disabled on touch devices (handled by the consumer via the
 * `has-custom-cursor` class on <html>; we only render when active).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<'default' | 'cta' | 'glyph'>('default')
  const [label, setLabel] = useState<string>('')
  const [glyph, setGlyph] = useState<string>('')

  // Cursor position state held in refs so we don't re-render every mousemove.
  const target = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only enable on devices with a fine pointer + hover capability.
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    const apply = () => {
      const on = mq.matches
      setEnabled(on)
      document.documentElement.classList.toggle('has-custom-cursor', on)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest('[data-cursor]') as HTMLElement | null
      if (!el) {
        setVariant('default')
        setLabel('')
        setGlyph('')
        return
      }
      const v = el.dataset.cursor || 'cta'
      setVariant(v as 'default' | 'cta' | 'glyph')
      setLabel(el.dataset.cursorText || '')
      setGlyph(el.dataset.cursorGlyph || '')
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    let raf = 0
    const loop = () => {
      // Lerp the ring toward target with damping
      const lerp = 0.18
      ring.current.x += (target.current.x - ring.current.x) * lerp
      ring.current.y += (target.current.y - ring.current.y) * lerp
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  const ringSize = variant === 'cta' ? 88 : variant === 'glyph' ? 64 : 36
  const ringBg =
    variant === 'cta'
      ? 'rgba(13,12,10,0.92)'
      : variant === 'glyph'
        ? 'rgba(122,31,31,0.92)'
        : 'transparent'
  const ringBorder = variant === 'default' ? '1px solid rgba(13,12,10,0.55)' : 'none'
  const ringTextColor = '#f4ede1'

  return (
    <>
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] transition-[width,height,background,border-color,color] duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: '9999px',
          background: ringBg,
          border: ringBorder,
          color: ringTextColor,
          mixBlendMode: variant === 'default' ? 'difference' : 'normal',
          willChange: 'transform',
        }}
      >
        {variant === 'cta' && label ? <span>{label}</span> : null}
        {variant === 'glyph' && glyph ? (
          <span style={{ fontSize: 22, lineHeight: 1 }}>{glyph}</span>
        ) : null}
      </div>

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          width: 6,
          height: 6,
          background: variant === 'default' ? '#0d0c0a' : '#f4ede1',
          willChange: 'transform',
          mixBlendMode: variant === 'default' ? 'difference' : 'normal',
          transition: 'background 200ms',
        }}
      />
    </>
  )
}
