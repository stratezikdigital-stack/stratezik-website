export type AgentAccent = 'oxblood' | 'violet' | 'emerald' | 'amber' | 'ink'

export type AgentCard = {
  id: string
  name: string
  role: string
  description: string
  tasks: string[]
  model: string
  accent: AgentAccent
}

export const AGENT_CARDS: AgentCard[] = [
  {
    id: 'R1',
    name: 'Research Analyst',
    role: 'Prospect intelligence',
    description:
      'Researches companies, scores them against the Stratezik ICP model, identifies signals and best contact, recommends an outreach angle.',
    tasks: [
      'Builds full company briefs with ICP fit score 0 to 100',
      'Surfaces digital gaps: weak GBP, no ads, stale site',
      'Flags Quebec-HQ companies and disqualifications automatically',
    ],
    model: 'claude-sonnet-4-6',
    accent: 'oxblood',
  },
  {
    id: 'S1',
    name: 'Outbound SDR',
    role: 'Cold email sequences',
    description:
      'Writes three-touch email sequences from a research brief, on voice, CASL-compliant, with the kind of specific opener that earns a reply.',
    tasks: [
      'T1 / T3 / T5 cadence with personal friction at T3',
      'Subject lines under 8 words, no agency clichés',
      'CASL footer baked in; consent basis documented',
    ],
    model: 'claude-sonnet-4-6',
    accent: 'violet',
  },
  {
    id: 'W1',
    name: 'Content Writer',
    role: 'Blogs, landing copy, ad copy',
    description:
      'Long-form posts, landing pages, ad creative, all written in the Stratezik voice with answer-first structure and AEO build rules from day one.',
    tasks: [
      '1,500 to 4,500 word blog posts with FAQ schema candidates',
      'Landing pages with hero, features, proof, CTA inside skill rules',
      'Sidecar JSON metadata for every output, ready for the CMS',
    ],
    model: 'claude-sonnet-4-6',
    accent: 'emerald',
  },
  {
    id: 'Q1',
    name: 'QA Reviewer',
    role: 'Gates everything external',
    description:
      'Reviews every artifact against voice rules, claims fence, and SEO format gates before it can be published, sent, or shared.',
    tasks: [
      'Claims check: every stat sourced, no fabricated metrics',
      'Voice compliance: banned phrases, em-dash budget, AI tells',
      'SEO format gates: title ≤60, meta ≤155, Canadian English',
    ],
    model: 'claude-sonnet-4-6',
    accent: 'amber',
  },
  {
    id: 'C1',
    name: 'Strategy Lead',
    role: 'POVs and positioning',
    description:
      'Strategic briefs, market POVs, and positioning recommendations. Takes a stance and defends it instead of producing a list of options.',
    tasks: [
      'Structured strategy briefs: TL;DR, evidence, POV, plays',
      "Anchored in the founder's expertise, not a textbook",
      'Built on top of R1 research and W1 content where relevant',
    ],
    model: 'claude-opus-4-5',
    accent: 'ink',
  },
]

export const OUTPUT_STATS = [
  { value: '50,000+', label: 'words of approved long-form content' },
  { value: '21', label: 'service landing pages in a parent-child SEO cluster' },
  { value: '18', label: 'cold email sequences across six prospect briefs' },
  { value: '0', label: 'fabricated statistics, banned phrases, or claims violations' },
] as const

export type WorkExample = {
  tag: string
  title: string
  meta: string
  href?: string
}

export const WORK_EXAMPLES: WorkExample[] = [
  {
    tag: 'Blog series',
    title: 'How Businesses Get Found and Grow in 2026',
    meta: '5 parts · 12,898 words · W1 drafted → Q1 reviewed',
    href: '/blog/get-found-2026-brand-positioning',
  },
  {
    tag: 'Blog series',
    title: 'AI-Native GTM for Toronto Startups',
    meta: '4 parts · 10,490 words · approved by Q1 in two passes',
    href: '/blog/ai-native-gtm-build-from-day-1',
  },
  {
    tag: 'Landing pages',
    title: '/services hub + 8 parents + 12 children',
    meta: '21 pages · ~9,700 words · full parent-child SEO cluster',
    href: '/services',
  },
  {
    tag: 'Outbound',
    title: '6 prospect briefs + 18 email sequences',
    meta: 'R1 scored ICP fit · S1 wrote T1/T3/T5 touches',
  },
  {
    tag: 'Deep guide',
    title: 'Get Recommended by ChatGPT: The 2026 Playbook',
    meta: '4,428 words · sourced from SOCi + OppAlerts + Google I/O',
    href: '/blog/get-recommended-by-chatgpt-playbook',
  },
  {
    tag: 'QA',
    title: 'Q1 reviews catching 7 SEO + voice issues',
    meta: 'Caught: titles over 60 chars, meta over 155, 12 banned-phrase instances',
  },
]

export const ARCH_ITEMS = [
  {
    title: 'Context packs',
    description:
      'Voice rules, ICP, services, case studies, claims fence, SEO guidelines. Read in a defined order before any agent acts.',
  },
  {
    title: 'Audit log',
    description:
      'Every action (drafted, revised, reviewed, approved, sent) appended to a daily JSONL file. The full chain is replayable.',
  },
  {
    title: 'Claims fence',
    description:
      'What we can say, what we cannot, and which case studies have consent on file. Hard-coded into every external piece.',
  },
  {
    title: 'MCP integrations',
    description:
      'Tools agents can call: web search and fetch, Supabase, Google Search Console, Docs, Sheets, CRM connectors, GitHub.',
  },
  {
    title: 'Evals + golden sets',
    description:
      'Every agent has a rubric and a golden set of approved outputs. Quality is measured against the rubric, not just vibes.',
  },
  {
    title: 'Per-client workspaces',
    description:
      'Each client has an isolated folder with its own voice pack and context. Stratezik agents never leak data across workspaces.',
  },
] as const

export const BENEFITS = [
  {
    symbol: '10×',
    title: 'Throughput',
    description:
      'The agent org produces in one operating day what a small marketing team produces in two to three weeks. The throughput is real, not a slide.',
  },
  {
    symbol: '∞',
    title: 'Consistency',
    description:
      'Voice rules, claims fence, and SEO gates apply to every piece automatically. Q1 catches what tired humans miss at 4pm on a Friday.',
  },
  {
    symbol: '↓',
    title: 'Runway',
    description:
      'One senior orchestrator plus the agent layer replaces three to five marketing hires. For a startup that translates directly into months of runway.',
  },
] as const

export const ACCENT_STYLES: Record<
  AgentAccent,
  { avatar: string; border: string; dot: string }
> = {
  oxblood: { avatar: 'bg-oxblood', border: 'hover:border-oxblood', dot: 'bg-oxblood' },
  violet: { avatar: 'bg-violet-700', border: 'hover:border-violet-700', dot: 'bg-violet-700' },
  emerald: { avatar: 'bg-emerald-700', border: 'hover:border-emerald-700', dot: 'bg-emerald-700' },
  amber: { avatar: 'bg-amber-600', border: 'hover:border-amber-600', dot: 'bg-amber-600' },
  ink: { avatar: 'bg-ink', border: 'hover:border-ink', dot: 'bg-ink' },
}
