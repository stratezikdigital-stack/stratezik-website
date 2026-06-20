import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Bug,
  Car,
  Cloud,
  CreditCard,
  Dumbbell,
  GraduationCap,
  Home,
  PawPrint,
  Plane,
  Scale,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
  Glasses,
  Thermometer,
} from 'lucide-react'

export type LiveAdTier = 'greenfield' | 'open' | 'filling' | 'saturated'

export type LiveAdIndustry = {
  id: string
  name: string
  icon: LucideIcon
  ads: number
  advs: [string, string][]
  why: string
  move: string
  health?: boolean
}

export const LIVE_AD_TIERS: Record<
  LiveAdTier,
  { label: string; fill: string; text: string; dot: string }
> = {
  greenfield: { label: 'Greenfield · 0 ads', fill: '#E1F5EE', text: '#085041', dot: '#0F6E56' },
  open: { label: 'Open · barely contested', fill: '#E6F1FB', text: '#0C447C', dot: '#185FA5' },
  filling: { label: 'Filling · rivals arriving', fill: '#FAEEDA', text: '#633806', dot: '#854F0B' },
  saturated: { label: 'Saturated · by outsiders', fill: '#FAECE7', text: '#993C1D', dot: '#D85A30' },
}

export function liveAdTierOf(ads: number): LiveAdTier {
  if (ads === 0) return 'greenfield'
  if (ads <= 2) return 'open'
  if (ads <= 4) return 'filling'
  return 'saturated'
}

/** Founder ChatGPT snapshot (free tier, 5 queries/industry, 2026-06-19). Sorted emptiest-first. */
export const LIVE_AD_INDUSTRIES: LiveAdIndustry[] = [
  {
    id: 'fitness',
    name: 'Fitness & wellness',
    icon: Dumbbell,
    ads: 0,
    advs: [],
    why: 'Every fitness query returned a specific local gym or studio in the answer, and not one ad above it. The buyers are there; nobody is paying to reach them.',
    move: 'Be the first and only ad under "best gym in downtown Toronto for beginners." Write one hint per goal: beginners, weight loss, hot yoga.',
  },
  {
    id: 'pestcontrol',
    name: 'Pest control',
    icon: Bug,
    ads: 0,
    advs: [],
    why: 'Urgent searches (bed bugs, mice, cockroaches) with named local exterminators in the answer and zero ads above them.',
    move: 'Run problem-specific hints like "bed bug exterminator downtown Toronto." Emergency intent converts fast.',
  },
  {
    id: 'electrician',
    name: 'Electricians',
    icon: Zap,
    ads: 0,
    advs: [],
    why: 'Panel upgrades, EV chargers, inspections: high-ticket work, answered with local electricians, none advertising.',
    move: 'Target the high-value jobs (EV charger install, panel upgrade) where a single lead pays for months of budget.',
  },
  {
    id: 'dental',
    name: 'Dental & orthodontics',
    icon: Sparkles,
    ads: 1,
    advs: [['Metro Dentifrice', 'toothpaste brand']],
    health: true,
    why: 'The only ad across five dental queries was a toothpaste brand on "teeth whitening." No clinic is advertising.',
    move: 'Verify ad eligibility first (health-adjacent), then own cosmetic and new-patient queries by neighbourhood.',
  },
  {
    id: 'optometry',
    name: 'Eye care & optometry',
    icon: Glasses,
    ads: 1,
    advs: [['Lyft', 'rideshare']],
    health: true,
    why: 'The single ad across five optometry queries was Lyft, on "eye exam downtown." A rideshare company, not an eye clinic.',
    move: 'Verify eligibility, then claim "eye exam" and "glasses" queries before any local clinic does.',
  },
  {
    id: 'auto',
    name: 'Auto repair & service',
    icon: Car,
    ads: 1,
    advs: [['eManuals', 'repair manuals']],
    why: 'One ad across five auto queries, and it was a repair-manual site, not a shop. Brakes, oil, transmission all sit open.',
    move: 'Run location plus service hints ("brakes downtown Toronto"). You would be the only shop in the slot.',
  },
  {
    id: 'movers',
    name: 'Moving services',
    icon: Truck,
    ads: 1,
    advs: [['Lyft', 'rideshare']],
    why: 'One ad, and again it was Lyft. Moving is peak-intent and almost entirely unclaimed.',
    move: 'Target move-type hints (condo move, long distance). High urgency, high value.',
  },
  {
    id: 'beauty',
    name: 'Beauty & personal care',
    icon: Sparkles,
    ads: 2,
    advs: [
      ['Skin Vitality', 'cosmetic clinic'],
      ['Lyft', 'rideshare'],
    ],
    why: 'Two ads across five beauty queries: a cosmetic clinic on adjacent searches and Lyft on "Botox." Salons and barbers are absent.',
    move: 'Chase very-high-intent queries ("first time doing nails at home"). Match the hint to the exact service.',
  },
  {
    id: 'veterinary',
    name: 'Veterinary & pet care',
    icon: PawPrint,
    ads: 2,
    advs: [['Diamond Pet', 'pet food']],
    health: true,
    why: 'The two ads were a pet-food brand, not a clinic. Vet searches are urgent and local; no practice is bidding.',
    move: 'Verify eligibility, then own emergency and checkup queries by neighbourhood.',
  },
  {
    id: 'ecom',
    name: 'E-commerce & DTC',
    icon: ShoppingBag,
    ads: 3,
    advs: [
      ['Merrell', 'manufacturer'],
      ['Polar Bed', 'manufacturer'],
      ['Skin Vitality', 'clinic'],
    ],
    why: 'Product and manufacturer brands are moving in (Merrell on running gear, Polar Bed on mattresses). The feed is the creative.',
    move: 'Rewrite top SKUs in buyer language before you connect the catalog. Target discovery and gift queries.',
  },
  {
    id: 'legal',
    name: 'Legal & professional',
    icon: Scale,
    ads: 3,
    advs: [
      ['Jotform', 'form tool'],
      ['HiBob', 'HR software'],
      ['RBC Home Loan', 'bank'],
    ],
    why: 'Form-builders and banks advertise on legal queries (Jotform on "small business lawyer"), but no law firm does.',
    move: 'Own your practice area with exact-intent hints; you would be the only actual lawyer in the slot.',
  },
  {
    id: 'local',
    name: 'Home services',
    icon: Home,
    ads: 3,
    advs: [
      ['LG Appliance', 'manufacturer'],
      ['Jotform', 'form tool'],
    ],
    why: 'A manufacturer (LG) and a form tool (Jotform) advertise on plumbing, reno, and roofing. The contractors do not.',
    move: 'Run service plus neighbourhood hints. You compete against a form-builder, not the contractor next door.',
  },
  {
    id: 'hvac',
    name: 'Heating & cooling (HVAC)',
    icon: Thermometer,
    ads: 3,
    advs: [['GWC Insulation', 'insulation, not HVAC']],
    why: 'An insulation company advertises on furnace and AC queries, but no HVAC contractor does. Seasonal, high-ticket, wide open.',
    move: 'Hit furnace repair and AC install by city. Time your budget to the season.',
  },
  {
    id: 'education',
    name: 'Education & coaching',
    icon: GraduationCap,
    ads: 4,
    advs: [
      ['Canva', 'software'],
      ['Wix', 'software'],
      ['Fivetran', 'software'],
      ['seoplus+', 'agency'],
    ],
    why: 'Software brands dominate (Canva on UX, Wix on digital marketing). A local school or coach can still win exact-intent.',
    move: 'Target program-specific hints ("PMP exam prep Canada") the broad advertisers ignore.',
  },
  {
    id: 'realestate',
    name: 'Real estate agents',
    icon: Building2,
    ads: 4,
    advs: [
      ['Turnbull Real Estate', 'local realtor'],
      ['Belairdirect', 'insurance'],
      ['Intact', 'insurance'],
    ],
    why: 'The one local business in our entire study advertising in its own category was a realtor (Turnbull). Mostly insurers bid here.',
    move: 'Follow Turnbull: agent-level hints by neighbourhood and buyer type.',
  },
  {
    id: 'saas',
    name: 'B2B SaaS',
    icon: Cloud,
    ads: 5,
    advs: [
      ['Monday.com', 'global'],
      ['ApprovalMax', 'global'],
      ['Wealthsimple', 'national'],
      ['ManageEngine', 'global'],
    ],
    why: 'An ad on every query, all global software, no local SaaS in the slot. Beat them on specificity, not budget.',
    move: 'Use tight, exact-intent hints ("CRM for a 20-person Toronto startup") the global brands bid too broad for.',
  },
  {
    id: 'travel',
    name: 'Travel & hospitality',
    icon: Plane,
    ads: 5,
    advs: [
      ['IHG', 'hotel chain'],
      ['Choice Hotels', 'hotel chain'],
      ['Air Transat', 'airline'],
    ],
    why: 'National chains on every query. A boutique agency competes on exact-intent ("Toronto travel agency for a Europe trip"), not reach.',
    move: 'Own narrow, specific trip-planning conversations the big chains do not optimize for.',
  },
  {
    id: 'finance',
    name: 'Finance & insurance',
    icon: CreditCard,
    ads: 5,
    advs: [
      ['RBC', 'bank'],
      ['TD Insurance', 'national'],
    ],
    why: 'RBC and TD own the category. A local advisor or fintech wins on niche intent, not by outbidding a bank.',
    move: 'Target specific personas ("financial advisor in the GTA for a young professional").',
  },
]
