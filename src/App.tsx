import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { RouteSeoManager } from './seo/RouteSeoManager'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import StrategyFlow from './components/StrategyFlow'
import PortfolioSection from './components/PortfolioSection'
import TestimonialSection from './components/TestimonialSection'
import LatestInsightsSection from './components/LatestInsightsSection'
import { HomeFaqSection } from './components/HomeFaqSection'
import ContactSection from './components/ContactSection'
import CareerPage from './components/CareerPage'
import BlogPage from './components/BlogPage'
import BlogPostPage from './components/BlogPostPage'
import AuthorPage from './components/AuthorPage'
import AeoCheckerPage from './components/AeoCheckerPage'
import TorontoStartupAuditPage from './components/TorontoStartupAuditPage'
import ServicePage from './components/ServicePage'
import Footer from './components/Footer'
import { SmoothScroll } from './three/world/SmoothScroll'
import { getLenis } from './three/world/lenisRef'
import { WorldCanvas } from './three/world/WorldCanvas'
import { Loader } from './components/Loader'
import { CustomCursor } from './components/CustomCursor'
import { MoveCounterHUD } from './components/MoveCounterHUD'
import { NotationMarquee } from './components/NotationMarquee'

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

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <RouteSeoManager />
      <Loader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <SmoothScroll>
        <ScrollToTop />
        <ScrollToHash />
        {isHome ? <WorldCanvas /> : null}
        {isHome && loaded ? <MoveCounterHUD /> : null}
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-36">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <NotationMarquee
                      variant="dark"
                      lines={[
                        'Toronto digital marketing & growth',
                        'SEO · PPC · social · conversion · analytics',
                        'Integrated plans · fewer silos · clearer KPIs',
                        'SMB & startup budgets · enterprise discipline',
                        'Stratezik · measurable demand',
                      ]}
                    />
                    <ServicesSection />
                    <NotationMarquee
                      variant="light"
                      lines={[
                        'Audience insight before media spend',
                        'Creative & landing pages built to convert',
                        'Attribution you can defend in the boardroom',
                        'Weekly rhythm · monthly reviews · quarterly bets',
                        'Stratezik',
                      ]}
                    />
                    <StrategyFlow />
                    <PortfolioSection />
                    <TestimonialSection />
                    <LatestInsightsSection />
                    <HomeFaqSection />
                    <ContactSection />
                  </>
                }
              />
              <Route path="/careers" element={<CareerPage />} />
              <Route path="/aeo-checker" element={<AeoCheckerPage />} />
              <Route path="/toronto-startup-website-audit-2026" element={<TorontoStartupAuditPage />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/services/:slug/:child" element={<ServicePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/authors/:slug" element={<AuthorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
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
