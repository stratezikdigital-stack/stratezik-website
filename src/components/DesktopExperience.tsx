import { ReactNode } from 'react'
import { SmoothScroll } from '../three/world/SmoothScroll'
import { WorldCanvas } from '../three/world/WorldCanvas'
import { Loader } from './Loader'
import { CustomCursor } from './CustomCursor'
import { MoveCounterHUD } from './MoveCounterHUD'

type DesktopExperienceProps = {
  isHome: boolean
  loaded: boolean
  onLoaded: () => void
  children: ReactNode
}

/** Desktop-only chrome (3D world, loader, Lenis, cursor) — lazy-loaded off the mobile path. */
export default function DesktopExperience({
  isHome,
  loaded,
  onLoaded,
  children,
}: DesktopExperienceProps) {
  return (
    <>
      <Loader onDone={onLoaded} />
      <CustomCursor />
      <SmoothScroll>
        {isHome && loaded ? <WorldCanvas /> : null}
        {isHome && loaded ? <MoveCounterHUD /> : null}
        {children}
      </SmoothScroll>
    </>
  )
}
