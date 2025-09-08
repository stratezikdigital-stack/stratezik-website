import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import StrategyFlow from './components/StrategyFlow'
import PortfolioSection from './components/PortfolioSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import CareerPage from './components/CareerPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <ServicesSection />
                <StrategyFlow />
                <PortfolioSection />
                <TeamSection />
                <ContactSection />
              </>
            } />
            <Route path="/careers" element={<CareerPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
