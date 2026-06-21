import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RouteSeoManager } from './seo/RouteSeoManager'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import { CookieConsentBanner } from './components/CookieConsentBanner'
import { MobileScrollShell } from './components/MobileScrollShell'
import { getLenis } from './three/world/lenisRef'
import { getIsMobile } from './utils/device'
import { useIsMobile } from './three/hooks/useIsMobile'

const DesktopExperience = lazy(() => import('./components/DesktopExperience'))
const CareerPage = lazy(() => import('./components/CareerPage'))
const PrivacyPage = lazy(() => import('./components/PrivacyPage'))
const AeoCheckerPage = lazy(() => import('./components/AeoCheckerPage'))
const TorontoStartupAuditPage = lazy(() => import('./components/TorontoStartupAuditPage'))
const GrowthCreditPage = lazy(() => import('./components/GrowthCreditPage'))
const FreeToolsPage = lazy(() => import('./components/FreeToolsPage'))
const CheatSheetLandingPage = lazy(() => import('./components/CheatSheetLandingPage'))
const CheatSheetGuidePage = lazy(() => import('./components/CheatSheetGuidePage'))
const ServicePage = lazy(() => import('./components/ServicePage'))
const BlogPage = lazy(() => import('./components/BlogPage'))
const BlogPostPage = lazy(() => import('./components/BlogPostPage'))
const AuthorPage = lazy(() => import('./components/AuthorPage'))

function RouteFallback() {
  return <div className="min-h-[40vh]" aria-hidden="true" />
}

/** On route change without a target hash, reset scroll to the top of the page. */
function ScrollToTop() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  return null
}

/** After SPA navigation or full load with #contact / #contact-form, scroll into view. */
function ScrollToHash() {
  const location = useLocation()
  useEffect(() => {
    const raw = location.hash.replace(/^#/, '')
    if (raw !== 'contact' && raw !== 'contact-form') return
    const t = window.setTimeout(() => {
      document.getElementById(raw)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (raw === 'contact-form') {
        window.setTimeout(() => document.getElementById('name')?.focus(), 350)
      }
    }, 100)
    return () => window.clearTimeout(t)
  }, [location.pathname, location.hash])
  return null
}

function AppContent() {
  const location = useLocation()
  const isCheatSheet = location.pathname.startsWith('/chatgpt-ads-cheat-sheet')

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />
      <div className="relative z-10 min-h-screen">
        {!isCheatSheet && <Navbar />}
        <main className={isCheatSheet ? '' : 'pt-36'}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/careers" element={<CareerPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/aeo-checker" element={<AeoCheckerPage />} />
              <Route path="/toronto-startup-website-audit-2026" element={<TorontoStartupAuditPage />} />
              <Route path="/growth-credit" element={<GrowthCreditPage />} />
              <Route path="/free-tools" element={<FreeToolsPage />} />
              <Route path="/chatgpt-ads-cheat-sheet" element={<CheatSheetLandingPage />} />
              <Route path="/chatgpt-ads-cheat-sheet/guide" element={<CheatSheetGuidePage />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/services/:slug/:child" element={<ServicePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/authors/:slug" element={<AuthorPage />} />
            </Routes>
          </Suspense>
        </main>
        {!isCheatSheet && <Footer />}
        {!isCheatSheet && <CookieConsentBanner />}
      </div>
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isCheatSheet = location.pathname.startsWith('/chatgpt-ads-cheat-sheet')
  const mobile = useIsMobile()
  const [loaded, setLoaded] = useState(() => isCheatSheet || getIsMobile())

  useEffect(() => {
    if (isCheatSheet || mobile) setLoaded(true)
  }, [isCheatSheet, mobile])

  const showDesktopChrome = !isCheatSheet && !mobile

  return (
    <>
      <RouteSeoManager />
      {showDesktopChrome ? (
        <Suspense fallback={<AppContent />}>
          <DesktopExperience
            isHome={isHome}
            loaded={loaded}
            onLoaded={() => setLoaded(true)}
          >
            <AppContent />
          </DesktopExperience>
        </Suspense>
      ) : (
        <MobileScrollShell>
          <AppContent />
        </MobileScrollShell>
      )}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  )
}

export default App
