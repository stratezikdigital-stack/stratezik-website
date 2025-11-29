import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook to dynamically set canonical URL based on current route
 */
export const useCanonical = () => {
  const location = useLocation()
  
  useEffect(() => {
    // Remove existing canonical tag if any
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }
    
    // Determine canonical URL based on route
    let canonicalUrl = 'https://www.stratezik.com'
    
    if (location.pathname === '/') {
      canonicalUrl = 'https://www.stratezik.com/'
    } else if (location.pathname === '/careers') {
      canonicalUrl = 'https://www.stratezik.com/careers'
    } else {
      // For any other routes, use the full path
      canonicalUrl = `https://www.stratezik.com${location.pathname}`
    }
    
    // Create and add new canonical tag
    const link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    link.setAttribute('href', canonicalUrl)
    document.head.appendChild(link)
    
    // Cleanup function
    return () => {
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical && canonical.getAttribute('href') === canonicalUrl) {
        canonical.remove()
      }
    }
  }, [location.pathname])
}

