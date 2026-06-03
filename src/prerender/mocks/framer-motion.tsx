import React from 'react'

type MotionProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  initial?: unknown
  animate?: unknown
  transition?: unknown
  whileInView?: unknown
  viewport?: unknown
}

function createMotionComponent(tag: keyof JSX.IntrinsicElements) {
  return React.forwardRef<HTMLElement, MotionProps>(function MotionComponent(
    { children, initial: _i, animate: _a, transition: _t, whileInView: _w, viewport: _v, ...props },
    ref,
  ) {
    return React.createElement(tag, { ...props, ref }, children)
  })
}

export const motion = {
  div: createMotionComponent('div'),
  header: createMotionComponent('header'),
  article: createMotionComponent('article'),
  section: createMotionComponent('section'),
}

export const AnimatePresence = ({ children }: { children?: React.ReactNode }) => <>{children}</>
