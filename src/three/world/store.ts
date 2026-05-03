import { create } from 'zustand'

export type SectionName = 'hero' | 'services' | 'flow' | 'portfolio' | 'testimonials' | 'contact'

export interface SectionBounds {
  top: number
  height: number
}

interface WorldState {
  /** Page-wide scroll progress 0..1 (driven by Lenis). */
  progress: number
  /** Smoothed scroll Y in pixels. */
  scrollY: number
  /** Page total scrollable height. */
  scrollLimit: number
  /** Current "most-visible" section. */
  current: SectionName
  /** Per-section progress 0..1 (where 0 = section just entered viewport, 1 = leaving). */
  sectionProgress: Record<SectionName, number>
  /** Section bounds in pixels, registered by each section component. */
  sections: Partial<Record<SectionName, SectionBounds>>
  /** True when the form has been submitted (drives the "checkmate" beat). */
  resigned: boolean

  setProgress: (progress: number, scrollY: number, scrollLimit: number) => void
  registerSection: (name: SectionName, bounds: SectionBounds) => void
  setResigned: (v: boolean) => void
}

const ZERO_SECTION_PROGRESS: Record<SectionName, number> = {
  hero: 0,
  services: 0,
  flow: 0,
  portfolio: 0,
  testimonials: 0,
  contact: 0,
}

/**
 * Computes which section is "current" and per-section progress, given
 * global scroll position. Called every scroll tick.
 */
function computeSectionState(
  scrollY: number,
  viewportHeight: number,
  sections: Partial<Record<SectionName, SectionBounds>>
): Pick<WorldState, 'current' | 'sectionProgress'> {
  const fovCenter = scrollY + viewportHeight / 2
  let current: SectionName = 'hero'
  let bestDist = Infinity

  const sectionProgress: Record<SectionName, number> = { ...ZERO_SECTION_PROGRESS }

  ;(Object.keys(sections) as SectionName[]).forEach((name) => {
    const b = sections[name]
    if (!b) return
    const start = b.top - viewportHeight
    const end = b.top + b.height
    const span = end - start
    sectionProgress[name] = Math.max(0, Math.min(1, (scrollY - start) / span))

    const center = b.top + b.height / 2
    const dist = Math.abs(center - fovCenter)
    if (dist < bestDist) {
      bestDist = dist
      current = name
    }
  })

  return { current, sectionProgress }
}

export const useWorldStore = create<WorldState>((set, get) => ({
  progress: 0,
  scrollY: 0,
  scrollLimit: 1,
  current: 'hero',
  sectionProgress: { ...ZERO_SECTION_PROGRESS },
  sections: {},
  resigned: false,

  setProgress(progress, scrollY, scrollLimit) {
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
    const { current, sectionProgress } = computeSectionState(scrollY, viewportHeight, get().sections)
    set({ progress, scrollY, scrollLimit, current, sectionProgress })
  },

  registerSection(name, bounds) {
    set((state) => ({ sections: { ...state.sections, [name]: bounds } }))
  },

  setResigned(v) {
    set({ resigned: v })
  },
}))
