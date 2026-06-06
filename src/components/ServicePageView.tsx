import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePrerenderBodies, type PrerenderBodies } from '../prerender/PrerenderBodiesContext'
import { getServiceBySlug, getServiceChild } from '../services/services'
import { SERVICE_HERO_AI_LABEL, getServiceHeroImage, serviceHeroImageAlt } from '../services/serviceImages'
import { AiAgentsOrgFeature } from './aiAgents/AiAgentsOrgFeature'
import { Markdown } from './Markdown'

/** Home contact form anchor — handled by ScrollToHash in App.tsx. */
const QUOTE_HREF = '/#contact-form'

/** Split a markdown body into its H1 title, intro prose, and the rest (from first ##). */
function splitBody(md: string): { title: string; intro: string; rest: string } {
  const m = md.match(/^#\s+(.+?)\n+/)
  if (!m) return { title: '', intro: '', rest: md }
  const title = m[1].trim()
  const after = md.slice(m[0].length)
  const idx = after.indexOf('\n## ')
  if (idx === -1) return { title, intro: after.trim(), rest: '' }
  return { title, intro: after.slice(0, idx).trim(), rest: after.slice(idx + 1).trim() }
}

function ServiceGlyph({ seed }: { seed: string }) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const cols = 6
  const rows = 6
  const tile = 40
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const on = ((h >> ((r * cols + c) % 31)) & 1) === 1
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={c * tile + tile / 2}
          cy={r * tile + tile / 2}
          r={on ? 4.5 : 2}
          fill={on ? '#7a1f1f' : '#0d0c0a'}
          opacity={on ? 0.9 : 0.18}
        />,
      )
    }
  }
  const p = (n: number) => (n % cols) * tile + tile / 2
  const q = (n: number) => (n % rows) * tile + tile / 2
  return (
    <svg
      viewBox={`0 0 ${cols * tile} ${rows * tile}`}
      className="w-full h-full"
      role="img"
      aria-label="Service motif"
    >
      {dots}
      <line
        x1={p(h)}
        y1={q(h >> 3)}
        x2={p(h >> 6)}
        y2={q(h >> 9)}
        stroke="#7a1f1f"
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.8}
      />
      <line
        x1={p(h >> 12)}
        y1={q(h >> 15)}
        x2={p(h >> 18)}
        y2={q(h >> 21)}
        stroke="#0d0c0a"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  )
}

type ServicePageViewProps = {
  /** Vite-bundled markdown (browser). Omit during Node SSR — use PrerenderBodiesContext only. */
  clientBodies?: PrerenderBodies
}

export function ServicePageView({ clientBodies }: ServicePageViewProps) {
  const { slug, child } = useParams<{ slug: string; child: string }>()
  const isHub = !slug
  const isChild = !!slug && !!child
  const parentService = slug ? getServiceBySlug(slug) : undefined
  const childDef = isChild ? getServiceChild(slug, child) : undefined

  if (isChild && !childDef) {
    return <Navigate to="/services" replace />
  }
  if (!isHub && !isChild && !parentService) {
    return <Navigate to="/services" replace />
  }

  const bodies = usePrerenderBodies() ?? clientBodies
  if (!bodies) {
    return null
  }

  const rawBody = isHub
    ? bodies.servicesHub
    : isChild
      ? bodies.serviceChildBodies[`${slug}/${child}`]
      : bodies.serviceBodies[parentService!.slug]
  const { title, intro, rest } = splitBody(rawBody)
  const kicker = isHub ? 'All services' : isChild ? childDef!.serviceType : parentService!.serviceType
  const glyphSeed = isChild ? `${slug}-${child}` : parentService?.slug ?? 'services'
  const heroImage = getServiceHeroImage(isHub ? undefined : slug, isChild ? child : undefined)
  const heroAltBase = isHub
    ? 'Stratezik digital marketing services in Toronto and the GTA'
    : isChild
      ? childDef!.primaryKeyword
      : parentService!.primaryKeyword
  const heroAlt = heroImage ? serviceHeroImageAlt(heroAltBase) : heroAltBase
  const introParas = intro.split(/\n{2,}/).filter(Boolean)

  return (
    <article className="min-h-screen bg-cream pb-24">
      <div className="container-custom px-6 md:px-12 pt-8 md:pt-12">
        <nav className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <span className="mx-2 text-ink-300">&middot;</span>
          {isHub ? (
            <span className="text-ink">Services</span>
          ) : isChild ? (
            <>
              <Link to="/services" className="hover:text-ink transition-colors">
                Services
              </Link>
              <span className="mx-2 text-ink-300">&middot;</span>
              <Link to={`/services/${slug}`} className="hover:text-ink transition-colors">
                {parentService?.primaryKeyword ?? slug}
              </Link>
              <span className="mx-2 text-ink-300">&middot;</span>
              <span className="text-ink">{childDef!.primaryKeyword}</span>
            </>
          ) : (
            <>
              <Link to="/services" className="hover:text-ink transition-colors">
                Services
              </Link>
              <span className="mx-2 text-ink-300">&middot;</span>
              <span className="text-ink">{parentService!.primaryKeyword}</span>
            </>
          )}
        </nav>
      </div>

      <header className="container-custom px-6 md:px-12 mt-8 md:mt-12">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="col-span-12 lg:col-span-7"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">{kicker}</div>
            <h1 className="mt-3 font-display text-[clamp(2.1rem,5vw,3.6rem)] text-ink leading-[1.04] tracking-[-0.03em]">
              {title}
            </h1>
            {introParas.map((para, i) => (
              <p key={i} className="lead mt-6 max-w-2xl text-ink-700">
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to={QUOTE_HREF}
                data-cursor="cta"
                data-cursor-text="Quote"
                className="inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">Start</span>
                Request a quote
                <span aria-hidden className="font-mono">&rarr;</span>
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                Toronto &middot; Scarborough &middot; GTA
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-12 lg:col-span-5"
          >
            <figure className="relative bg-cream-50 border border-ink/10 aspect-[5/4] overflow-hidden m-0">
              {heroImage ? (
                <>
                  <img
                    src={heroImage}
                    alt={heroAlt}
                    width={1400}
                    height={1120}
                    className="absolute inset-0 w-full h-full object-cover"
                    fetchPriority="high"
                  />
                  <figcaption className="absolute bottom-0 inset-x-0 px-4 py-2.5 bg-ink/55 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/90 text-right">
                    {SERVICE_HERO_AI_LABEL}
                  </figcaption>
                </>
              ) : (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage:
                        'linear-gradient(#0d0c0a 1px, transparent 1px), linear-gradient(90deg, #0d0c0a 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center p-8 md:p-10">
                    <div className="w-[80%] max-w-[280px]">
                      <ServiceGlyph seed={glyphSeed} />
                    </div>
                  </div>
                </>
              )}
            </figure>
          </motion.div>
        </div>
      </header>

      {!isHub && !isChild && parentService?.slug === 'ai-agents' ? <AiAgentsOrgFeature /> : null}

      <div className="container-custom px-6 md:px-12 mt-16 md:mt-20">
        <div className="border-t border-ink/10 pt-12">
          <Markdown content={rest} />
        </div>

        <footer className="max-w-[720px] mt-16 pt-10 border-t border-ink/10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to={QUOTE_HREF}
            data-cursor="cta"
            data-cursor-text="Quote"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood hover:text-ink transition-colors"
          >
            Request a quote
            <span aria-hidden>&rarr;</span>
          </Link>
          {isChild && (
            <Link
              to={`/services/${slug}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 hover:text-ink transition-colors"
            >
              &larr; {parentService?.primaryKeyword ?? 'Parent service'}
            </Link>
          )}
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
