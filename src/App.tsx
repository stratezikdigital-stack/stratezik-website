import { useEffect, useState } from 'react'
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
import { Loader } from './components/Loader'
import { CustomCursor } from './components/CustomCursor'
import { MoveCounterHUD } from './components/MoveCounterHUD'
import { NotationMarquee } from './components/NotationMarquee'

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
  const [loaded, setLoaded] = useState(false)

  return (
    <Router>
      <CanonicalManager />
      {/* Plan D — cinematic intro loader */}
      <Loader onDone={() => setLoaded(true)} />
      {/* Custom cursor lives outside SmoothScroll so it tracks viewport pixels */}
      <CustomCursor />
      <SmoothScroll>
        <ScrollToHash />
        {/* Persistent 3D world living behind the entire page. */}
        <WorldCanvas />
        {/* Now-playing HUD — appears after loader exits */}
        {loaded ? <MoveCounterHUD /> : null}
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-36">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <NotationMarquee variant="dark" lines={['1.\u00a0e4 e5', '2.\u00a0Nf3 Nc6', '3.\u00a0Bb5 a6', '\u2014 The Spanish Game', '\u2014 We open with strategy', '\u2014 Stratezik']} />
                    <ServicesSection />
                    <NotationMarquee variant="light" lines={['Pattern recognition', 'Tempo over force', 'Position over pieces', 'The endgame begins on move one', 'Stratezik']} />
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
