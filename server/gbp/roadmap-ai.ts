/**
 * AI-generated, data-grounded GBP growth plan.
 *
 * Top-1%-operator deliverable: category reverse-engineering, review-SEO,
 * services build-out, reply-SEO, competitive integrity, geo-targeting,
 * attributes/photos, and authority signals — plus the core 90-day plan.
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
  competitorInsight: string
  weeklyPlan: AiWeeklyPhase[]
  categoryStrategy: {
    yourCurrentPrimary: string | null
    leaderPrimary: string
    recommendedPrimary: string
    additionalCategories: string[]
    rationale: string
  }
  reviewSeo: {
    justificationKeywords: string[]
    neighborhoodSeedingAsk: string
    photoAsks: string[]
    velocityPacing: { current: number; ninetyDayTarget: number; perWeek: number; note: string }
    reviewRequest: { sms: string; email: string }
  }
  servicesBuildOut: {
    services: Array<{ name: string; description: string }>
    providesJustificationNote: string
  }
  replySeo: { fiveStar: string; mixed: string; negative: string }
  competitiveIntegrity: {
    auditNotes: string[]
    redressalSteps: string[]
    whatNotToDo: string[]
  }
  geoTargeting: {
    blockLogic: string
    priorityNeighborhoods: string[]
    serviceAreaNote: string
  }
  attributesAndPhotos: {
    recommendedAttributes: string[]
    photoShotList: string[]
    uploadCadence: string
  }
  authoritySignals: {
    entityConsistency: string[]
    sameAs: string[]
    localLinks: string[]
    schemaNote: string
  }
  optimizedDescription: string
  googlePosts: AiGooglePost[]
  qanda: AiQandA[]
}

function anthropicKey(): string | null {
  return process.env.ANTHROPIC_API_KEY?.trim() || null
}

export function aiRoadmapConfigured(): boolean {
  return Boolean(anthropicKey())
}

const ROADMAP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    summary: { type: 'string' },
    competitorInsight: { type: 'string' },
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
    categoryStrategy: {
      type: 'object',
      additionalProperties: false,
      properties: {
        yourCurrentPrimary: { type: ['string', 'null'] },
        leaderPrimary: { type: 'string' },
        recommendedPrimary: { type: 'string' },
        additionalCategories: { type: 'array', items: { type: 'string' } },
        rationale: { type: 'string' },
      },
      required: ['yourCurrentPrimary', 'leaderPrimary', 'recommendedPrimary', 'additionalCategories', 'rationale'],
    },
    reviewSeo: {
      type: 'object',
      additionalProperties: false,
      properties: {
        justificationKeywords: { type: 'array', items: { type: 'string' } },
        neighborhoodSeedingAsk: { type: 'string' },
        photoAsks: { type: 'array', items: { type: 'string' } },
        velocityPacing: {
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
        reviewRequest: {
          type: 'object',
          additionalProperties: false,
          properties: {
            sms: { type: 'string' },
            email: { type: 'string' },
          },
          required: ['sms', 'email'],
        },
      },
      required: ['justificationKeywords', 'neighborhoodSeedingAsk', 'photoAsks', 'velocityPacing', 'reviewRequest'],
    },
    servicesBuildOut: {
      type: 'object',
      additionalProperties: false,
      properties: {
        services: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
            },
            required: ['name', 'description'],
          },
        },
        providesJustificationNote: { type: 'string' },
      },
      required: ['services', 'providesJustificationNote'],
    },
    replySeo: {
      type: 'object',
      additionalProperties: false,
      properties: {
        fiveStar: { type: 'string' },
        mixed: { type: 'string' },
        negative: { type: 'string' },
      },
      required: ['fiveStar', 'mixed', 'negative'],
    },
    competitiveIntegrity: {
      type: 'object',
      additionalProperties: false,
      properties: {
        auditNotes: { type: 'array', items: { type: 'string' } },
        redressalSteps: { type: 'array', items: { type: 'string' } },
        whatNotToDo: { type: 'array', items: { type: 'string' } },
      },
      required: ['auditNotes', 'redressalSteps', 'whatNotToDo'],
    },
    geoTargeting: {
      type: 'object',
      additionalProperties: false,
      properties: {
        blockLogic: { type: 'string' },
        priorityNeighborhoods: { type: 'array', items: { type: 'string' } },
        serviceAreaNote: { type: 'string' },
      },
      required: ['blockLogic', 'priorityNeighborhoods', 'serviceAreaNote'],
    },
    attributesAndPhotos: {
      type: 'object',
      additionalProperties: false,
      properties: {
        recommendedAttributes: { type: 'array', items: { type: 'string' } },
        photoShotList: { type: 'array', items: { type: 'string' } },
        uploadCadence: { type: 'string' },
      },
      required: ['recommendedAttributes', 'photoShotList', 'uploadCadence'],
    },
    authoritySignals: {
      type: 'object',
      additionalProperties: false,
      properties: {
        entityConsistency: { type: 'array', items: { type: 'string' } },
        sameAs: { type: 'array', items: { type: 'string' } },
        localLinks: { type: 'array', items: { type: 'string' } },
        schemaNote: { type: 'string' },
      },
      required: ['entityConsistency', 'sameAs', 'localLinks', 'schemaNote'],
    },
    optimizedDescription: { type: 'string' },
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
  },
  required: [
    'summary',
    'competitorInsight',
    'weeklyPlan',
    'categoryStrategy',
    'reviewSeo',
    'servicesBuildOut',
    'replySeo',
    'competitiveIntegrity',
    'geoTargeting',
    'attributesAndPhotos',
    'authoritySignals',
    'optimizedDescription',
    'googlePosts',
    'qanda',
  ],
} as const

const SYSTEM_PROMPT = `You are a senior local SEO strategist at Stratezik, a digital agency. You write a bespoke Google Business Profile (GBP) growth plan for one specific local business. This is a top-1%-operator deliverable: every section must be actionable, compliant, and grounded in the audit data.

COMPLIANCE (non-negotiable):
- Never recommend name-stuffing, fake reviews, review gating, incentivized reviews, bot activity, or any Google policy violation.
- competitiveIntegrity must flag rivals by their real names from verifiedFacts only. Audit for spam signals you can infer from public data (review velocity anomalies, category mismatch, duplicate listings) without accusing without evidence. Include a clear "what not to do" list of compliant alternatives.
- competitiveIntegrity.whatNotToDo must explicitly forbid: fake reviews, review bots, keyword-stuffed business names, duplicate listings, and paid review schemes.

DATA RULES:
- "verifiedFacts" is real data from Google and our audit: state it freely (rating, review count, rank, competitor names, profileSignals including primaryCategory per business, review snippets).
- "heuristicFocusAreas" and "heuristicPillarScores" are industry-template guesses: never state as fact about THIS business. Frame conditionally ("If you are not posting weekly, start...").
- Do not invent competitors, review counts, or statistics not derivable from the data.
- Use real review snippets: echo strengths, address complaints, mirror customer language in copy assets.
- Plain, direct English. Never use em dashes. No emojis or special symbols (PDF uses standard fonts). No AI-slop ("unlock", "elevate", "leverage", "game-changer", etc.).
- Ready-to-paste assets must be final copy. Minimize placeholders.

DELIVER ALL SECTIONS:

1. summary + competitorInsight: where they stand vs top 3 and the single biggest lever.

2. weeklyPlan: exactly 3 phases (Weeks 1-2, Weeks 3-6, Weeks 7-12). Title, one-line why, 3-5 concrete actions each.

3. categoryStrategy (category reverse-engineering): Match the Map Pack leader's real primary category from profileSignals.primaryCategories. Recommend switching primary if needed. List a maxed-out set of additional categories (up to Google's limit, typically 9 additional) relevant to this trade. Include yourCurrentPrimary from data (null if unknown), leaderPrimary, recommendedPrimary, additionalCategories array, and rationale.

4. reviewSeo: justificationKeywords (8-12 terms customers use in reviews for this trade in this city), neighborhoodSeedingAsk (script asking happy customers to mention their neighborhood), photoAsks (4-6 specific photo types to collect from customers), velocityPacing (current count, 90-day target, per-week rate, note), reviewRequest (SMS + email scripts after a job).

5. servicesBuildOut: 8-15 keyword-rich GBP services with name + 1-2 sentence description each. providesJustificationNote explains how these trigger "Provides" justifications in the local pack.

6. replySeo: owner-reply templates for 5-star, mixed (3-4 star), and negative (1-2 star) reviews. Keyword-aware but natural. Professional tone.

7. competitiveIntegrity: auditNotes (2-4 observations naming real competitors), redressalSteps (how to report spam compliantly if warranted), whatNotToDo (5-7 forbidden tactics + compliant alternatives).

8. geoTargeting: blockLogic (paragraph on block-by-block / radius strategy for this city), priorityNeighborhoods (6-10 specific neighborhoods to prioritize), serviceAreaNote (how to set service areas in GBP).

9. attributesAndPhotos: recommendedAttributes (GBP attributes to enable), photoShotList (10-12 specific shots), uploadCadence (weekly photo rhythm).

10. authoritySignals: entityConsistency checklist (NAP, hours, name format), sameAs (social/profile URLs to add), localLinks (3-5 local citation targets for this city/trade), schemaNote (LocalBusiness JSON-LD guidance in plain English).

11. optimizedDescription: 600-750 character GBP description, keyword-aware, clear CTA.

12. googlePosts: exactly 4 ready-to-publish posts (week + type + copy).

13. qanda: exactly 8 seeded Q&A pairs.`

function buildScanFacts(scan: GbpScanResult): string {
  const competitors = scan.winners.map((w) => ({
    rank: w.rank,
    name: w.name,
    rating: w.rating,
    reviews: w.reviews,
  }))

  const primaryCategories = {
    you: scan.profileSignals?.you?.primaryCategory ?? null,
    competitors: (scan.profileSignals?.competitors ?? []).map((c) => ({
      name: c.name,
      primary: c.primaryCategory,
      categoryCount: c.categoryCount,
    })),
  }

  return JSON.stringify(
    {
      verifiedFacts: {
        business: scan.businessName,
        city: scan.city,
        industry: scan.industryDisplay,
        searchQuery: scan.query,
        yourRanking: `${scan.rankWord} (not in the top 3)`,
        ourAuditScore: `${scan.score}/100 (${scan.grade})`,
        yourReviews: scan.youReviews,
        yourRating: scan.youRating,
        topCompetitor: scan.topCompetitor,
        competitors,
        competitorComparison: scan.competitorGaps,
        profileSignals: scan.profileSignals ?? null,
        primaryCategories,
        liveDataAvailable: scan.dataSource === 'places',
      },
      heuristicFocusAreas: scan.quickWins.map((q) => q.title),
      heuristicPillarScores: scan.pillars.map((p) => ({ pillar: p.name, score: p.score })),
    },
    null,
    2,
  )
}

export async function generateAiRoadmap(scan: GbpScanResult): Promise<AiRoadmap | null> {
  const key = anthropicKey()
  if (!key) {
    console.warn('[gbp/roadmap-ai] ANTHROPIC_API_KEY not set — skipping AI roadmap')
    return null
  }

  const client = new Anthropic({ apiKey: key })
  const userPrompt = `Here is the completed GBP audit for one business. Write the full top-1% operator growth plan as specified.\n\nAUDIT DATA:\n${buildScanFacts(scan)}`

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 12000,
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
