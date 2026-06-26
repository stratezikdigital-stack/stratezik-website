import type { AiRoadmap } from './aiRoadmap.types'

/** Labeled preview for the paid operator plan — structure matches the real deliverable. */
export const SAMPLE_AI_ROADMAP: AiRoadmap = {
  generatedAt: '',
  model: 'preview',
  summary:
    'You rank outside the top 3 with a reputation gap versus the pack leader. Category breadth and review velocity are the two levers that move the pin fastest in your market.',
  competitorInsight:
    'The #1 listing wins on category coverage and steady weekly reviews. Matching their primary category and closing the review gap is how you get into the top three.',
  weeklyPlan: [
    {
      weeks: 'Weeks 1–2',
      title: 'Open every search surface',
      why: 'Google only ranks what it can classify.',
      actions: ['Set primary + additional categories', 'Publish keyword-rich services list', 'Seed 8 Q&A pairs'],
    },
    {
      weeks: 'Weeks 3–6',
      title: 'Build review momentum',
      why: 'Fresh reviews with neighborhood keywords move the pack.',
      actions: ['Deploy SMS + email review asks', 'Reply to every review with SEO-aware templates', 'Upload 2 photos per week'],
    },
    {
      weeks: 'Weeks 7–12',
      title: 'Defend the pin',
      why: 'Consistency beats one-time bursts.',
      actions: ['Weekly Google posts', 'Monitor competitor spam compliantly', 'Expand service-area targeting'],
    },
  ],
  categoryStrategy: {
    yourCurrentPrimary: 'Your current primary',
    leaderPrimary: 'Map Pack leader primary',
    recommendedPrimary: 'Recommended primary for your trade',
    additionalCategories: ['Backup category 1', 'Backup category 2', 'Backup category 3', 'Backup category 4'],
    rationale: 'Your bespoke plan matches the leader’s real primary category and maxes additional categories for your trade.',
  },
  reviewSeo: {
    justificationKeywords: ['emergency', 'same-day', 'licensed', 'local', 'neighborhood name', 'service type'],
    neighborhoodSeedingAsk: 'Thanks for choosing us! If you have a moment, a Google review mentioning your neighborhood helps other locals find us.',
    photoAsks: ['Before/after of completed job', 'Team at work', 'Storefront/signage', 'Customer handshake (with permission)'],
    velocityPacing: { current: 42, ninetyDayTarget: 78, perWeek: 3, note: 'Paced to close meaningful ground without looking unnatural.' },
    reviewRequest: {
      sms: 'Hi [Name], thanks again for choosing us. Would you mind leaving a quick Google review? It helps neighbors find us: [link]',
      email: 'Subject: Quick favor — Google review\n\nHi [Name],\n\nThank you for trusting us. A short Google review mentioning your neighborhood helps us serve more locals like you.\n\n[Review link]',
    },
  },
  servicesBuildOut: {
    services: [
      { name: 'Emergency repair', description: 'Same-day emergency service for your trade in your city.' },
      { name: 'Installation', description: 'Professional install with warranty — keyword-rich for Maps search.' },
      { name: 'Maintenance plans', description: 'Recurring service that earns repeat reviews and post topics.' },
    ],
    providesJustificationNote: 'Each service becomes a searchable surface and can trigger “Provides” justifications in the local pack.',
  },
  replySeo: {
    fiveStar: 'Thank you, [Name]! We appreciate you mentioning [service/neighborhood]. Reviews like yours help neighbors find us.',
    mixed: 'Thank you for the honest feedback, [Name]. We’re glad [positive] and we’ve followed up on [concern] to make this right.',
    negative: 'Hi [Name], I’m sorry we missed the mark. Please call me directly at [phone] so we can resolve this. — [Owner name]',
  },
  competitiveIntegrity: {
    auditNotes: ['Competitor A: category mismatch worth reporting if confirmed', 'Competitor B: review velocity spike — monitor, don’t retaliate'],
    redressalSteps: ['Document the listing URL and issue', 'Use Google’s “Suggest an edit” or Business Redressal form', 'Never post fake reviews in response'],
    whatNotToDo: ['No fake reviews or review bots', 'No keyword-stuffed business names', 'No duplicate listings', 'No paid review schemes'],
  },
  geoTargeting: {
    blockLogic: 'Prioritize radius blocks where your jobs cluster; expand only after top-3 in core neighborhoods.',
    priorityNeighborhoods: ['Neighborhood 1', 'Neighborhood 2', 'Neighborhood 3', 'Neighborhood 4'],
    serviceAreaNote: 'Set service areas to match where you actually dispatch — avoid city-wide if you only serve pockets.',
  },
  attributesAndPhotos: {
    recommendedAttributes: ['Accepts new customers', 'Wheelchair-accessible entrance', 'Online estimates'],
    photoShotList: ['Cover photo', 'Team', 'Work in progress', 'Completed job', 'Storefront', 'Equipment'],
    uploadCadence: 'Two new photos per week for 90 days — mix jobs, team, and exterior.',
  },
  authoritySignals: {
    entityConsistency: ['Exact NAP match on website footer', 'Hours match GBP and website', 'Business name identical everywhere'],
    sameAs: ['Facebook Page URL', 'LinkedIn company URL', 'Industry directory profile'],
    localLinks: ['Chamber of commerce', 'Local BBB or trade association', 'City business directory'],
    schemaNote: 'Add LocalBusiness JSON-LD on your site with name, address, phone, sameAs, and areaServed matching GBP.',
  },
  optimizedDescription:
    'Licensed [trade] serving [city] and surrounding neighborhoods. Same-day service, transparent pricing, and hundreds of local reviews. Call for a free quote today.',
  googlePosts: [
    { week: 'Week 1', type: 'Update', copy: 'Spring special — mention your top service and neighborhood service area.' },
    { week: 'Week 2', type: 'Offer', copy: 'Limited-time offer with clear CTA and expiry date.' },
  ],
  qanda: [
    { question: 'Do you offer same-day service?', answer: 'Yes — we dispatch to [neighborhoods] daily. Call before noon for same-day availability.' },
    { question: 'Are you licensed and insured?', answer: 'Fully licensed and insured in [province]. Happy to provide credentials on request.' },
  ],
}
