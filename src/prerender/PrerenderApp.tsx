import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogPage from '../components/BlogPage'
import BlogPostPage from '../components/BlogPostPage'
import AuthorPage from '../components/AuthorPage'
import { ServicePageView } from '../components/ServicePageView'
import CareerPage from '../components/CareerPage'
import AeoCheckerPage from '../components/AeoCheckerPage'
import TorontoStartupAuditPage from '../components/TorontoStartupAuditPage'
import GrowthCreditPage from '../components/GrowthCreditPage'
import CheatSheetLandingPage from '../components/CheatSheetLandingPage'
import CheatSheetGuidePage from '../components/CheatSheetGuidePage'
import PrivacyPage from '../components/PrivacyPage'
import { PrerenderHomePage } from './PrerenderHomePage'
import { PrerenderBodiesContext, type PrerenderBodies } from './PrerenderBodiesContext'

type PrerenderAppProps = {
  pathname: string
  bodies: PrerenderBodies
}

/** Slim app shell for build-time HTML (no Three.js, Lenis, or loader). */
export function PrerenderApp({ pathname, bodies }: PrerenderAppProps) {
  return (
    <PrerenderBodiesContext.Provider value={bodies}>
      <StaticRouter location={pathname}>
        <div className="relative z-10 min-h-screen">
          <Navbar />
          <main className="pt-36">
            <Routes>
              <Route path="/" element={<PrerenderHomePage />} />
              <Route path="/careers" element={<CareerPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/aeo-checker" element={<AeoCheckerPage />} />
              <Route path="/toronto-startup-website-audit-2026" element={<TorontoStartupAuditPage />} />
              <Route path="/growth-credit" element={<GrowthCreditPage />} />
              <Route path="/chatgpt-ads-cheat-sheet" element={<CheatSheetLandingPage />} />
              <Route path="/chatgpt-ads-cheat-sheet/guide" element={<CheatSheetGuidePage />} />
              <Route path="/services" element={<ServicePageView />} />
              <Route path="/services/:slug/:child" element={<ServicePageView />} />
              <Route path="/services/:slug" element={<ServicePageView />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/authors/:slug" element={<AuthorPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </StaticRouter>
    </PrerenderBodiesContext.Provider>
  )
}
