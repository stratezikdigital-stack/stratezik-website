import { createContext, useContext } from 'react'

export type PrerenderBodies = {
  servicesHub: string
  serviceBodies: Record<string, string>
  serviceChildBodies: Record<string, string>
}

export const PrerenderBodiesContext = createContext<PrerenderBodies | null>(null)

export function usePrerenderBodies(): PrerenderBodies | null {
  return useContext(PrerenderBodiesContext)
}
