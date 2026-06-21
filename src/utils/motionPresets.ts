import type { HTMLMotionProps, Transition } from 'framer-motion'

type FadeUpProps = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>

export function fadeUpProps(enabled: boolean, delay = 0, y = 16): FadeUpProps {
  if (!enabled) {
    return { initial: false, transition: { duration: 0 } as Transition }
  }
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  }
}

type InViewProps = Pick<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'transition' | 'viewport'>

export function inViewProps(enabled: boolean, y = 16, delay = 0): InViewProps {
  if (!enabled) {
    return { initial: false, viewport: { once: true } }
  }
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true, margin: '-80px' },
  }
}
