/** Client-side mirror of server/gbp/roadmap-ai.ts AiRoadmap — keep in sync. */

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
