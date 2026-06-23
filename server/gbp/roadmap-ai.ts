/**
 * AI-generated, data-grounded GBP growth plan.
 *
 * Turns a finished scan (real Places data + competitor pack) into a bespoke
 * 90-day plan plus ready-to-paste assets, using Claude. This is what makes the
 * paid roadmap worth the price: every line is tied to the business's own
 * numbers and named competitors, not a vertical template.
 */
import Anthropic from '@anthropic-ai/sdk'
import type { GbpScanResult } from './scan.js'

export type AiWeeklyPhase = { weeks: string; title: string; why: string; actions: string[] }
export type AiGooglePost = { week: string; type: string; copy: string }
export type AiQandA = { question: string; answer: string }

export type AiRoadmap = {
  generatedAt: string
  model: string
  summary: string
  optimizedDescription: string
  recommendedCategories: { primary: string; secondary: string[] }
  reviewPlan: { current: number; ninetyDayTarget: number; perWeek: number; note: string }
  weeklyPlan: AiWeeklyPhase[]
  googlePosts: AiGooglePost[]
  qanda: AiQandA[]
  reviewRequest: { sms: string; email: string }
  competitorInsight: string
}

function anthropicKey(): string | null {
  return process.env.ANTHROPIC_API_KEY?.trim() || null
}

export function aiRoadmapConfigured(): boolean {
  return Boolean(anthropicKey())
}

/** JSON Schema the model must fill. Kept flat: no min/max/length constraints. */
const ROADMAP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    optimizedDescription: { type: 'string' },
    recommendedCategories: {
      type: 'object',
      additionalProperties: false,
      properties: {
        primary: { type: 'string' },
        secondary: { type: 'array', items: { type: 'string' } },
      },
      required: ['primary', 'secondary'],
    },
    reviewPlan: {
      type: 'object',
      additionalProperties: false,
      properties: {
        current: { type: 'integer' },
        ninetyDayTarget: { type: 'integer' },
        perWeek: { type: 'integer' },
        note: { type: 'string' },
      },
      required: ['current', 'ninetyDayTarget', 'perWeek', 'note'],
    },
    weeklyPlan: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          weeks: { type: 'string' },
          title: { type: 'string' },
          why: { type: 'string' },
          actions: { type: 'array', items: { type: 'string' } },
        },
        required: ['weeks', 'title', 'why', 'actions'],
      },
    },
    googlePosts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          week: { type: 'string' },
          type: { type: 'string' },
          copy: { type: 'string' },
        },
        required: ['week', 'type', 'copy'],
      },
    },
    qanda: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          question: { type: 'string' },
          answer: { type: 'string' },
        },
        required: ['question', 'answer'],
      },
    },
    reviewRequest: {
      type: 'object',
      additionalProperties: false,
      properties: {
        sms: { type: 'string' },
        email: { type: 'string' },
      },
      required: ['sms', 'email'],
    },
    competitorInsight: { type: 'string' },
  },
  required: [
    'summary',
    'optimizedDescription',
    'recommendedCategories',
    'reviewPlan',
    'weeklyPlan',
    'googlePosts',
    'qanda',
    'reviewRequest',
    'competitorInsight',
  ],
} as const

const SYSTEM_PROMPT = `You are a senior local SEO strategist at Stratezik, a digital agency. You write a bespoke Google Business Profile (GBP) growth plan for one specific local business, grounded entirely in the audit data you are given.

Rules for everything you write:
- Use the business's real numbers, real city, and the real competitor names from the data. Never invent competitors, review counts, or statistics that are not derivable from the data.
- The data includes real review snippets (profileSignals) for the business and its top competitors. Use them: echo the strengths customers praise, address the complaints, and mirror the language real customers use in the description, posts, and Q&A. If a competitor's reviews show what wins in this market, name that edge and how to match it.
- Be specific and prescriptive. The owner should be able to act on each line today without hiring anyone.
- Plain, direct English. Never use em dashes. Do not use emojis or special symbols (the plan is also rendered as a PDF with standard fonts). Avoid AI-slop phrasing (no "unlock", "elevate", "in today's fast-paced", "leverage", "game-changer", "supercharge", "delve", "tapestry", "moreover", "furthermore"). Write the way a sharp consultant talks.
- Ready-to-paste assets (the description, Google posts, Q&A answers, review request scripts) must be final copy the owner pastes verbatim. Do not include placeholders like [your name] unless the owner genuinely must fill it in, and keep those to an absolute minimum.

Deliver:
- summary: 2 to 3 sentences on exactly where this profile stands versus the top 3 and the single biggest lever.
- optimizedDescription: a 600 to 750 character GBP business description written for THIS business, keyword-aware for its category and city, with a clear call to action.
- recommendedCategories: the best primary GBP category plus 2 to 4 backup categories for this trade.
- reviewPlan: current review count, a realistic 90-day target that closes meaningful ground on the leader, the per-week ask rate to hit it, and a one-line note on why.
- weeklyPlan: exactly 3 phases (Weeks 1-2, Weeks 3-6, Weeks 7-12). Each has a title, a one-line "why", and 3 to 5 concrete actions tied to this profile's gaps.
- googlePosts: exactly 4 ready-to-publish Google Post drafts (one per week of month one), each with a type (Offer/Update/Event) and final copy.
- qanda: exactly 8 seeded Q&A pairs (question + a written answer) covering what this trade's customers actually ask in this city.
- reviewRequest: one SMS and one email script the owner sends after a job, written for this business.
- competitorInsight: 2 to 3 sentences on what the #1 competitor is doing that this business is not, and how to neutralize it.`

function buildScanFacts(scan: GbpScanResult): string {
  const competitors = scan.winners.map((w) => ({
    rank: w.rank,
    name: w.name,
    rating: w.rating,
    reviews: w.reviews,
  }))
  return JSON.stringify(
    {
      business: scan.businessName,
      city: scan.city,
      industry: scan.industryDisplay,
      searchQuery: scan.query,
      yourRanking: `${scan.rankWord} (not in the top 3)`,
      yourScore: scan.score,
      yourGrade: scan.grade,
      yourReviews: scan.youReviews,
      yourRating: scan.youRating,
      topCompetitor: scan.topCompetitor,
      competitors,
      pillarScores: scan.pillars.map((p) => ({ pillar: p.name, score: p.score, note: p.note })),
      competitorGaps: scan.competitorGaps,
      knownIssues: scan.quickWins.map((q) => q.title),
      dataSource: scan.dataSource,
      // Real Place Details signals (Lever 2). Use the review snippets to ground
      // the description, posts, and Q&A in what customers actually say.
      profileSignals: scan.profileSignals ?? null,
    },
    null,
    2,
  )
}

/**
 * Generate the bespoke roadmap. Returns null on any failure so the paid flow
 * can fall back to the templated roadmap rather than blocking the buyer.
 */
export async function generateAiRoadmap(scan: GbpScanResult): Promise<AiRoadmap | null> {
  const key = anthropicKey()
  if (!key) {
    console.warn('[gbp/roadmap-ai] ANTHROPIC_API_KEY not set — skipping AI roadmap')
    return null
  }

  const client = new Anthropic({ apiKey: key })
  const userPrompt = `Here is the completed GBP audit for one business. Write the full growth plan as specified.\n\nAUDIT DATA:\n${buildScanFacts(scan)}`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 8000,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: ROADMAP_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    if (message.stop_reason === 'refusal') {
      console.warn('[gbp/roadmap-ai] request refused:', message.stop_details)
      return null
    }

    const textBlock = message.content.find((b): b is Anthropic.TextBlock => b.type === 'text')
    const text = textBlock?.text
    if (!text) return null

    const parsed = JSON.parse(text) as Omit<AiRoadmap, 'generatedAt' | 'model'>
    return { ...parsed, generatedAt: new Date().toISOString(), model: message.model }
  } catch (err) {
    console.error('[gbp/roadmap-ai] generation failed:', err)
    return null
  }
}
