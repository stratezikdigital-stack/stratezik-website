import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import StrategyFlow from './components/StrategyFlow'
import PortfolioSection from './components/PortfolioSection'
import TeamSection from './components/TeamSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Navbar />
        <main className="pt-20">
          <HeroSection />
          <ServicesSection />
          <StrategyFlow />
          <PortfolioSection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
