import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BlogPage from '../components/BlogPage'
import BlogPostPage from '../components/BlogPostPage'
import AuthorPage from '../components/AuthorPage'
import { ServicePageView } from '../components/ServicePageView'
import CareerPage from '../components/CareerPage'
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
              <Route path="/careers" element={<CareerPage />} />
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
