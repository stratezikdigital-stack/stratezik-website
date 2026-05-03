/**
 * Tiny module-level ref for the active Lenis smooth-scroll instance so that
 * components outside the SmoothScroll provider (e.g. modals) can pause and
 * resume page-level scrolling.
 *
 * SmoothScroll registers/unregisters via setLenis(); modals call pauseLenis()
 * on open and resumeLenis() on close.
 */

import type Lenis from 'lenis'

let instance: Lenis | null = null

export function setLenis(l: Lenis | null): void {
  instance = l
}

export function getLenis(): Lenis | null {
  return instance
}

export function pauseLenis(): void {
  instance?.stop()
}

export function resumeLenis(): void {
  instance?.start()
}
