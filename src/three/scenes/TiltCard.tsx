import { ReactNode, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
  /** Optional gloss highlight strength 0..1. */
  gloss?: number
}

/**
 * Lightweight 3D tilt  -  CSS-only, no WebGL canvas. Used in dense grids (Portfolio)
 * where six per-card canvases would be expensive.
 */
export function TiltCard({ children, className = '', max = 10, gloss = 0.45 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const ry = (x - 0.5) * 2 * max
    const rx = -(y - 0.5) * 2 * max
    ref.current.style.setProperty('--ry', `${ry}deg`)
    ref.current.style.setProperty('--rx', `${rx}deg`)
    ref.current.style.setProperty('--gx', `${x * 100}%`)
    ref.current.style.setProperty('--gy', `${y * 100}%`)
  }

  function onLeave() {
    if (!ref.current) return
    ref.current.style.setProperty('--ry', '0deg')
    ref.current.style.setProperty('--rx', '0deg')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
      style={{
        ['--ry' as string]: '0deg',
        ['--rx' as string]: '0deg',
        ['--gloss' as string]: gloss,
        perspective: '1000px',
      }}
    >
      <div
        className="tilt-card__inner"
        style={{
          transform: 'rotateY(var(--ry)) rotateX(var(--rx))',
          transformStyle: 'preserve-3d',
          transition: 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          willChange: 'transform',
          position: 'relative',
        }}
      >
        {children}
        <div
          aria-hidden
          className="tilt-card__gloss"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,calc(var(--gloss) * 1)) 0%, rgba(255,255,255,0) 45%)',
            mixBlendMode: 'overlay',
            borderRadius: 'inherit',
            opacity: 0.8,
            transition: 'opacity 200ms',
          }}
        />
      </div>
    </div>
  )
}
