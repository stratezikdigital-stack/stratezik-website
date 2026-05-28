import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteSeoByPath } from '../seo/pageSeoRegistry'
import { applyRouteSeo, injectRouteJsonLd } from '../utils/documentMeta'

/** Applies registry-driven title, meta, canonical, OG, Twitter, and JSON-LD on every route. */
export function RouteSeoManager() {
  const location = useLocation()

  useEffect(() => {
    const config = getRouteSeoByPath(location.pathname)
    if (!config) return undefined

    const undoMeta = applyRouteSeo(config)
    const undoLd = injectRouteJsonLd(config)

    return () => {
      undoMeta()
      undoLd()
    }
  }, [location.pathname])

  return null
}
