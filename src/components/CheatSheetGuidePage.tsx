import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GuideView } from './cheatsheet/GuideView'
import type { GuideParts } from '../cheatsheet/guideParser'

export default function CheatSheetGuidePage() {
  const [params] = useSearchParams()
  const token = params.get('k')
  const [state, setState] = useState<'loading' | 'ok' | 'denied'>('loading')
  const [parts, setParts] = useState<GuideParts | null>(null)
  const [author, setAuthor] = useState('Shah Md. Rifat')

  useEffect(() => {
    if (!token) {
      setState('denied')
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/guide-access?k=${encodeURIComponent(token)}`)
        if (!res.ok) {
          if (!cancelled) setState('denied')
          return
        }
        const data = await res.json()
        if (!cancelled) {
          setParts(data.parts)
          setAuthor(data.author || 'Shah Md. Rifat')
          setState('ok')
        }
      } catch {
        if (!cancelled) setState('denied')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  if (state === 'loading') {
    return (
      <main className="min-h-screen bg-cream flex items-center justify-center">
        <p className="font-mono text-sm text-ink-500">Loading your cheat sheet…</p>
      </main>
    )
  }

  if (state === 'denied' || !parts) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="container-custom mx-auto flex max-w-xl flex-col items-start px-6 pt-24 md:px-12">
          <div className="editorial-label">Access link expired</div>
          <h1 className="font-display text-display-3 mt-4 leading-[1.05] tracking-[-0.03em] text-ink">
            This link isn’t valid anymore.
          </h1>
          <p className="lead mt-6">
            Guide links expire after 30 days. Pop your email in again and we’ll send a fresh one — it lands
            in your inbox instantly.
          </p>
          <Link to="/chatgpt-ads-cheat-sheet" className="btn-primary mt-8">
            Get a fresh copy
          </Link>
        </div>
      </main>
    )
  }

  return <GuideView parts={parts} author={author} />
}
