export type SurveyChoice = { value: string; label: string }

export type SurveyStep =
  | {
      id: string
      kind: 'intro'
      title: string
      body: string
    }
  | {
      id: string
      kind: 'single'
      question: string
      field: keyof GtaSmbSurveyAnswers
      required?: boolean
      choices: SurveyChoice[]
      allowOther?: boolean
      otherField?: keyof GtaSmbSurveyAnswers
    }
  | {
      id: string
      kind: 'multi'
      question: string
      field: keyof GtaSmbSurveyAnswers
      max: number
      required?: boolean
      choices: SurveyChoice[]
    }
  | {
      id: string
      kind: 'text'
      question: string
      field: keyof GtaSmbSurveyAnswers
      required?: boolean
      placeholder?: string
      maxLength?: number
    }
  | {
      id: string
      kind: 'contact'
      question: string
    }

export type GtaSmbSurveyAnswers = {
  location: string
  locationOther: string
  employees: string
  marketingManager: string
  biggestChallenge: string
  biggestChallengeOther: string
  aiFamiliarity: string
  skills: string[]
  supportIntent: string
  monthlyBudget: string
  oneChange: string
  findingsSummary: string
  followUpConsent: string
  preferredContact: string
  phone: string
  email: string
}

export const EMPTY_SURVEY_ANSWERS: GtaSmbSurveyAnswers = {
  location: '',
  locationOther: '',
  employees: '',
  marketingManager: '',
  biggestChallenge: '',
  biggestChallengeOther: '',
  aiFamiliarity: '',
  skills: [],
  supportIntent: '',
  monthlyBudget: '',
  oneChange: '',
  findingsSummary: '',
  followUpConsent: '',
  preferredContact: '',
  phone: '',
  email: '',
}

export const GTA_SMB_SURVEY_STEPS: SurveyStep[] = [
  {
    id: 'intro',
    kind: 'intro',
    title: 'Digital Marketing & AI Readiness Survey',
    body:
      'Stratezik Digital Inc. is conducting independent market research on the digital marketing needs, AI awareness, and skills gaps of small and medium businesses across Scarborough, the Toronto GTA, and Ontario. About 3 minutes. Responses are anonymous unless you choose to share contact details at the end.',
  },
  {
    id: 'location',
    kind: 'single',
    question: 'Which best describes your business location?',
    field: 'location',
    required: true,
    allowOther: true,
    otherField: 'locationOther',
    choices: [
      { value: 'Scarborough', label: 'Scarborough' },
      { value: 'Toronto (other GTA)', label: 'Toronto (other GTA)' },
      { value: 'Other', label: 'Other (Ontario)' },
    ],
  },
  {
    id: 'team',
    kind: 'single',
    question: 'How many employees does your business have?',
    field: 'employees',
    required: true,
    choices: [
      { value: '1 - 9', label: '1 – 9' },
      { value: '10 - 49', label: '10 – 49' },
      { value: '50 - 199', label: '50 – 199' },
      { value: '200+', label: '200+' },
    ],
  },
  {
    id: 'marketing-manager',
    kind: 'single',
    question: 'Who currently manages your digital marketing?',
    field: 'marketingManager',
    required: true,
    choices: [
      { value: 'Owner / founder', label: 'Owner / founder' },
      { value: 'In-house staff (dedicated marketer)', label: 'In-house staff (dedicated marketer)' },
      { value: 'External agency or consultant', label: 'External agency or consultant' },
      { value: 'Freelancer / contractor', label: 'Freelancer / contractor' },
      { value: 'No one / ad hoc', label: 'No one / ad hoc' },
    ],
  },
  {
    id: 'challenge',
    kind: 'single',
    question: 'What is your single biggest digital marketing challenge right now?',
    field: 'biggestChallenge',
    required: true,
    allowOther: true,
    otherField: 'biggestChallengeOther',
    choices: [
      { value: 'Low lead volume or enquiries', label: 'Low lead volume or enquiries' },
      { value: 'High cost per lead / poor ROI on ads', label: 'High cost per lead / poor ROI on ads' },
      { value: 'Website traffic but low conversions', label: 'Website traffic but low conversions' },
      { value: 'Poor local search / low foot traffic', label: 'Poor local search / low foot traffic' },
      { value: 'Lack of time or internal expertise', label: 'Lack of time or internal expertise' },
      { value: 'Difficulty producing content (video, copy)', label: 'Difficulty producing content (video, copy)' },
      { value: 'Not using or unsure about AI tools', label: 'Not using or unsure about AI tools' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    id: 'ai',
    kind: 'single',
    question: 'Which statement best describes your familiarity with AI tools for marketing?',
    field: 'aiFamiliarity',
    required: true,
    choices: [
      { value: 'We are not familiar with AI tools.', label: 'We are not familiar with AI tools.' },
      {
        value: 'We are somewhat familiar but not using them.',
        label: 'We are somewhat familiar but not using them.',
      },
      {
        value: 'We use AI occasionally (content, ads, analytics).',
        label: 'We use AI occasionally (content, ads, analytics).',
      },
      {
        value: 'We actively use AI tools across marketing.',
        label: 'We actively use AI tools across marketing.',
      },
    ],
  },
  {
    id: 'skills',
    kind: 'multi',
    question: 'Which marketing skills would you most like help with?',
    field: 'skills',
    max: 3,
    required: true,
    choices: [
      { value: 'Paid media management (Google, Meta, etc.)', label: 'Paid media management (Google, Meta, etc.)' },
      { value: 'SEO and local search optimization', label: 'SEO and local search optimization' },
      {
        value: 'Conversion rate optimization (CRO) / landing pages',
        label: 'Conversion rate optimization (CRO) / landing pages',
      },
      { value: 'Content creation (video, blogs, social)', label: 'Content creation (video, blogs, social)' },
      { value: 'Analytics, tracking, and attribution', label: 'Analytics, tracking, and attribution' },
      { value: 'Marketing automation and email campaigns', label: 'Marketing automation and email campaigns' },
      { value: 'AI tool selection and governance', label: 'AI tool selection and governance' },
    ],
  },
  {
    id: 'intent-budget',
    kind: 'single',
    question: 'Are you likely to engage external support or training in the next 3 months?',
    field: 'supportIntent',
    required: true,
    choices: [
      { value: 'Yes — actively looking now', label: 'Yes — actively looking now' },
      { value: 'Maybe — within 1–3 months', label: 'Maybe — within 1–3 months' },
      { value: 'Not in the next 3 months', label: 'Not in the next 3 months' },
      { value: 'Unsure', label: 'Unsure' },
    ],
  },
  {
    id: 'budget',
    kind: 'single',
    question: 'Approximate monthly budget for marketing or training',
    field: 'monthlyBudget',
    required: true,
    choices: [
      { value: 'Under $1,000', label: 'Under $1,000' },
      { value: '$1,000–$3,000', label: '$1,000–$3,000' },
      { value: '$3,000–$10,000', label: '$3,000–$10,000' },
      { value: '$10,000+', label: '$10,000+' },
    ],
  },
  {
    id: 'one-change',
    kind: 'text',
    question: 'In one sentence, what single marketing change would most improve your business this year?',
    field: 'oneChange',
    required: true,
    placeholder: 'e.g. More qualified leads from Google Maps…',
    maxLength: 500,
  },
  {
    id: 'findings',
    kind: 'single',
    question: 'Would you like a copy of the aggregated findings (research summary)?',
    field: 'findingsSummary',
    required: true,
    choices: [
      {
        value: 'Yes — please send me the summary (no commercial messages)',
        label: 'Yes — send me the summary (no commercial messages)',
      },
      { value: 'No — thank you', label: 'No — thank you' },
    ],
  },
  {
    id: 'follow-up',
    kind: 'single',
    question: 'May we follow up about this research if we have clarifying questions?',
    field: 'followUpConsent',
    required: true,
    choices: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
  {
    id: 'contact',
    kind: 'contact',
    question: 'Optional contact details',
  },
]

export const SURVEY_STEP_COUNT = GTA_SMB_SURVEY_STEPS.length
