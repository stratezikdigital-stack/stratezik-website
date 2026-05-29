import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getServiceBySlug } from '../services/services'
import { serviceBodies, servicesHubBody } from '../services/serviceContent'
import { scrollToContactSection } from '../utils/navigation'
import { Markdown } from './Markdown'

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const isHub = !slug
  const service = isHub ? undefined : getServiceBySlug(slug)

  if (!isHub && !service) {
    return <Navigate to="/services" replace />
  }

  const body = isHub ? servicesHubBody : serviceBodies[service!.slug]

  return (
    <article className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12">
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 mb-10">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          {isHub ? (
            <span className="text-ink">Services</span>
          ) : (
            <>
              <Link to="/services" className="hover:text-ink transition-colors">
                Services
              </Link>
              <span className="mx-2 text-ink-300">&middot;</span>
              <span className="text-ink">Service</span>
            </>
          )}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-2 md:mt-4"
        >
          <Markdown content={body} />
        </motion.div>

        <footer className="max-w-[720px] mt-16 pt-10 border-t border-ink/10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button
            type="button"
            onClick={scrollToContactSection}
            data-cursor="cta"
            data-cursor-text="Talk"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink transition-colors"
          >
            Request a quote
            <span aria-hidden>&rarr;</span>
          </button>
          {!isHub && (
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 hover:text-ink transition-colors"
            >
              &larr; All services
            </Link>
          )}
        </footer>
      </div>
    </article>
  )
}

export default ServicePage
