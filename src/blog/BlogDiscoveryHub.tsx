import { Link } from 'react-router-dom'

/** Pillar posts in GSC "Discovered – currently not indexed" queue (Jun 2026). */
const DISCOVERY_HUB_LINKS = [
  {
    to: '/blog/get-found-2026-brand-positioning',
    label: 'How Businesses Get Found in 2026, Part 1: Brand and positioning',
  },
  {
    to: '/blog/get-found-2026-seo-organic-search',
    label: 'Part 2: SEO and organic search',
  },
  {
    to: '/blog/get-found-2026-ai-search-visibility',
    label: 'Part 3: AI search visibility (AEO and GEO)',
  },
  {
    to: '/blog/get-found-2026-content-strategy',
    label: 'Part 4: Content strategy and repurposing',
  },
  {
    to: '/blog/get-found-2026-paid-performance',
    label: 'Part 5: Paid and performance marketing',
  },
  {
    to: '/blog/get-recommended-by-chatgpt-playbook',
    label: 'How to get your business recommended by ChatGPT (2026 playbook)',
  },
  {
    to: '/blog/google-maps-ranking-service-business',
    label: 'Why service businesses lose on Google Maps',
  },
  {
    to: '/blog/insectica-gta-pest-control-scaling-case-study',
    label: 'Insectica case study: 700+ GTA pest-control leads',
  },
] as const

type BlogDiscoveryHubProps = {
  heading?: string
}

export function BlogDiscoveryHub({ heading = 'Stratezik growth guides' }: BlogDiscoveryHubProps) {
  return (
    <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="blog-discovery-hub-heading">
      <h2 id="blog-discovery-hub-heading" className="font-display text-display-3 text-ink">
        {heading}
      </h2>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Five-part Get Found series, AI visibility playbooks, Maps ranking factors, and GTA case studies — written for
        Ontario service operators who want measurable lift without guesswork.
      </p>
      <ul className="mt-6 space-y-3 text-ink-700 leading-relaxed list-disc pl-6">
        {DISCOVERY_HUB_LINKS.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="text-oxblood underline underline-offset-2">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
