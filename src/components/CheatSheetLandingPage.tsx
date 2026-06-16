import { lazy, Suspense } from 'react'
import { CheatSheetLanding } from './cheatsheet/CheatSheetLanding'
import { usePrerenderBodies } from '../prerender/PrerenderBodiesContext'

const CheatSheetLandingClient = lazy(() => import('./CheatSheetLandingClient'))

export default function CheatSheetLandingPage() {
  const bodies = usePrerenderBodies()
  if (bodies?.cheatSheetPeek) {
    return <CheatSheetLanding peek={bodies.cheatSheetPeek} />
  }
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <p className="font-mono text-sm text-ink-500">Loading…</p>
        </div>
      }
    >
      <CheatSheetLandingClient />
    </Suspense>
  )
}
