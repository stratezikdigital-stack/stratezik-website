import {
  Sparkles,
  ShoppingBag,
  Cloud,
  Plane,
  GraduationCap,
  Dumbbell,
  Scale,
  Home,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'

export type Tier = 'prime' | 'strong' | 'test'

export interface Industry {
  id: string
  name: string
  icon: LucideIcon
  tier: Tier
  intent: string
  cost: string
  competition?: string
  why: string
  hints: string[]
  watch: string
}

export const TIERS: Record<Tier, { label: string; blurb: string; dot: string; text: string }> = {
  prime: {
    label: 'Prime — go now',
    blurb: 'High intent, cheap, empty auction.',
    dot: '#2f7d52',
    text: '#2f7d52',
  },
  strong: {
    label: 'Strong — worth real budget now',
    blurb: 'Clearly worth real budget today.',
    dot: '#3a5bb5',
    text: '#3a5bb5',
  },
  test: {
    label: 'Test — controlled experiment',
    blurb: 'Real opportunity, but a platform limit means test, don’t migrate.',
    dot: '#b08f4a',
    text: '#b08f4a',
  },
}

export const INDUSTRIES: Industry[] = [
  {
    id: 'beauty',
    name: 'Beauty & personal care',
    icon: Sparkles,
    tier: 'prime',
    intent: 'Very high',
    cost: 'Far below Google',
    competition: 'Near-empty',
    why: 'People describe their exact situation before they buy (“what foundation suits mature skin”, “first time doing gel nails at home”), so a context hint matches the conversation almost word-for-word and you enter at a deep relevance discount — on a surface where beauty keywords on Google are among the priciest anywhere.',
    hints: ['first time doing nails at home', 'skincare routine for sensitive skin', 'gift for someone who loves makeup'],
    watch: 'Keep claims cosmetic, not medical; “treatment” language drifts toward excluded health topics.',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & DTC',
    icon: ShoppingBag,
    tier: 'prime',
    intent: 'High at discovery',
    cost: 'Low CPM, catalog ads',
    competition: 'Filling slowly',
    why: 'Gift and discovery prompts (“a gift for a runner”, “best carry-on under $200”) are exactly where sponsored cards serve, and the ad is built from your product feed. Zalando is piloting in the UK.',
    hints: ['replacing worn-out trail gear', 'gift for a coffee lover', 'best carry-on under $200'],
    watch: 'A raw catalog makes raw ads — rewrite top SKUs in buyer language first, and measure assisted conversions over 90 days.',
  },
  {
    id: 'b2b-saas',
    name: 'B2B SaaS',
    icon: Cloud,
    tier: 'prime',
    intent: 'Very high',
    cost: '4–10× cheaper CPC',
    competition: 'Quiet arbitrage',
    why: '“Best CRM for a 20-person sales team struggling with pipeline visibility” carries more intent than any keyword. CPC runs $3–8 vs ~$30 on Google (TripleDart).',
    hints: ['best CRM for a 20-person sales team', 'project management tool for agencies', 'alternative to a tool that just raised prices'],
    watch: 'Free-tier audience favours self-serve motions — target the problem conversation, not the category term.',
  },
  {
    id: 'travel',
    name: 'Travel & hospitality',
    icon: Plane,
    tier: 'strong',
    intent: 'High',
    cost: 'Below brutal travel CPCs',
    why: 'Trip planning is a flagship ChatGPT use and the conversations are long and detailed (“five days in Portugal with two kids”) — rich context to match.',
    hints: ['weekend getaway from Toronto', 'family-friendly resort in Mexico', 'best time to visit Japan on a budget'],
    watch: 'Long booking windows — judge on assisted conversions, not last-click.',
  },
  {
    id: 'education',
    name: 'Online education & coaching',
    icon: GraduationCap,
    tier: 'strong',
    intent: 'High',
    cost: 'Below competitive edu keywords',
    why: 'People already use ChatGPT as a learning advisor (“how do I learn data analysis from scratch”) — the natural bridge to a structured program.',
    hints: ['learning data analysis from scratch', 'best way to prep for the PMP', 'switching careers into UX design'],
    watch: 'Top of funnel — pair with a real lead magnet and nurture.',
  },
  {
    id: 'fitness',
    name: 'Fitness & wellness',
    icon: Dumbbell,
    tier: 'strong',
    intent: 'High',
    cost: 'Below Google',
    why: 'Advice-shaped prompts (“building a home gym on a budget”, “beginner marathon plan”) map cleanly to gear, apps, and coaching.',
    hints: ['building a home gym on a budget', 'beginner marathon training plan', 'best protein for lactose intolerance'],
    watch: 'Avoid medical, supplement, and weight-loss claims near the excluded sensitive topics.',
  },
  {
    id: 'legal',
    name: 'Professional & legal services',
    icon: Scale,
    tier: 'strong',
    intent: 'High',
    cost: 'Below expensive legal CPCs',
    why: 'Self-serve questions are constant (“how do I incorporate a startup in Ontario”, “reviewing a freelance contract”), and legal-tech advertisers are already live.',
    hints: ['incorporating a startup in Ontario', 'reviewing a freelance contract', 'do I need a trademark for my brand'],
    watch: 'Free-tier audience plus high-ticket services means nurture matters — route to a useful resource, not a consult wall.',
  },
  {
    id: 'local-services',
    name: 'Local & home services',
    icon: Home,
    tier: 'test',
    intent: 'Medium for now',
    cost: 'Cheaper, but state/DMA targeting only',
    why: 'Emergency “near me” demand hasn’t migrated at volume. Run a small test from experimental budget, install the pixel now for first-mover data, and pair with CallRail since calls are your conversion.',
    hints: ['renovating a basement on a budget', 'choosing an HVAC system', 'what to ask a roofing contractor'],
    watch: 'Keep your Google LSA and Search budgets where they are.',
  },
  {
    id: 'finance',
    name: 'Finance & insurance',
    icon: CreditCard,
    tier: 'test',
    intent: 'High where allowed',
    cost: 'Below the priciest CPCs in existence',
    why: 'Comparison prompts are everywhere (“business banking for a startup”, “how to choose life insurance”), and Canadian fintechs already surface here.',
    hints: ['business banking for a startup', 'comparing small business loans', 'how to choose life insurance'],
    watch: 'Some finance- and health-adjacent topics sit near the excluded sensitive set — verify your ads actually serve before scaling budget.',
  },
]
