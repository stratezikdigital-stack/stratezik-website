export type FreeTool = {
  slug: string
  title: string
  tagline: string
  description: string
  href: string
  cta: string
  label: string
  badge?: string
}

/** Single source for /free-tools hub cards — add future lead magnets here. */
export const FREE_TOOLS: FreeTool[] = [
  {
    slug: 'gbp-audit',
    title: 'Local Visibility Scan',
    tagline: 'Google Business Profile audit',
    description:
      'See why competitors outrank you on Google Maps. Free score, Map Pack view, three copy-paste weekend fixes, and a 6-pillar breakdown — tuned to your industry.',
    href: '/gbp-audit?utm_source=free-tools&utm_medium=card',
    cta: 'Run my free scan',
    label: 'Local SEO',
    badge: 'New',
  },
  {
    slug: 'aeo-checker',
    title: 'AEO Readiness Checker',
    tagline: '20-point machine-verified test',
    description:
      'Score how well AI assistants can read, understand, and cite your site. Eight criteria across crawler access, schema, answer-first copy, and llms.txt — benchmarked against 50 funded Toronto startups (median 10.75/20).',
    href: '/aeo-checker?utm_source=free-tools&utm_medium=card',
    cta: 'Run the free test',
    label: 'Diagnostic',
    badge: 'Most popular',
  },
  {
    slug: 'chatgpt-ads-cheat-sheet',
    title: 'ChatGPT Ads Cheat Sheet',
    tagline: 'Early-window optimization playbook',
    description:
      'Practitioner-sourced tactics for ChatGPT Ads in 2026: context hints, bid-floor testing, CTR plays, conversational landing pages, and the tracking stack. Includes an interactive industry readiness matrix.',
    href: '/chatgpt-ads-cheat-sheet?utm_source=free-tools&utm_medium=card',
    cta: 'Get the cheat sheet',
    label: 'Playbook',
  },
  {
    slug: 'growth-credit',
    title: '$3,000 Growth Credit',
    tagline: 'For qualifying Toronto-area businesses',
    description:
      'Request a free 20-minute growth assessment. If we are a fit, apply a $3,000 credit toward onboarding across local search, paid media, and delivery app optimization.',
    href: '/growth-credit?utm_source=free-tools&utm_medium=card',
    cta: 'Claim your credit',
    label: 'Offer',
  },
]
