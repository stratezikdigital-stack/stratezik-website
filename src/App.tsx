import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import StrategyFlow from './components/StrategyFlow'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import CareerPage from './components/CareerPage'
import Footer from './components/Footer'
import { useCanonical } from './utils/canonical'
import { SmoothScroll } from './three/world/SmoothScroll'
import { WorldCanvas } from './three/world/WorldCanvas'

function CanonicalManager() {
  useCanonical()
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

function App() {
  return (
    <Router>
      <CanonicalManager />
      <SmoothScroll>
        <ScrollToHash />
        {/* Persistent 3D world living behind the entire page. */}
        <WorldCanvas />
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-36">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <ServicesSection />
                    <StrategyFlow />
                    <PortfolioSection />
                    <ContactSection />
                  </>
                }
              />
              <Route path="/careers" element={<CareerPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  )
}

export default App
