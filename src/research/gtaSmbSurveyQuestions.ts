/** Verbatim survey copy from the Google Form — do not paraphrase question text. */

export type SurveyChoice = { value: string; label: string }

export type SurveyQuestion =
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
      field: 'skills'
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
      maxLength?: number
    }
  | {
      id: string
      kind: 'contact-preference'
      question: string
      field: 'preferredContact'
    }
  | {
      id: string
      kind: 'phone'
      question: string
      field: 'phone'
    }
  | {
      id: string
      kind: 'email'
      question: string
      field: 'email'
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

/** Verbatim intro from Google Form. */
export const SURVEY_INTRO = {
  title:
    'We Stratezik Digital Inc. — Digital Marketing & AI Readiness Survey (Scarborough, Toronto GTA, Ontario)',
  purpose:
    'Stratezik Digital Inc. is conducting independent market research to understand the digital marketing needs, AI awareness, and skills gaps of small and medium businesses across Scarborough, the Toronto GTA, and Ontario.',
  time: 'This survey takes about 3 minutes.',
  privacy:
    'Responses are anonymous unless you choose to identify your business. Results will be reported in aggregate. This is research-only and contains no promotional content. If you choose to opt in to follow-up, you will give explicit consent for future communications. You may request deletion of your responses at any time by replying to the contact details below.',
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
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
      { value: 'Other', label: 'Other:' },
    ],
  },
  {
    id: 'employees',
    kind: 'single',
    question: 'How many employees does your business have?',
    field: 'employees',
    required: true,
    choices: [
      { value: '1 - 9', label: '1 - 9' },
      { value: '10 - 49', label: '10 - 49' },
      { value: '50 - 199', label: '50 - 199' },
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
    question: 'Which of the following is your single biggest digital marketing challenge right now?',
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
      { value: 'Other', label: 'Other:' },
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
    question: 'Which marketing skills would you most like help with? (Select up to 3)',
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
    id: 'support-intent',
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
        label: 'Yes — please send me the summary (no commercial messages)',
      },
      { value: 'No — thank you', label: 'No — thank you' },
    ],
  },
  {
    id: 'follow-up',
    kind: 'single',
    question: 'Follow-up consent',
    field: 'followUpConsent',
    required: true,
    choices: [
      { value: 'Yes', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
  {
    id: 'preferred-contact',
    kind: 'contact-preference',
    question: 'Prefered communication method',
    field: 'preferredContact',
  },
  {
    id: 'phone',
    kind: 'phone',
    question: 'Phone Number',
    field: 'phone',
  },
  {
    id: 'email',
    kind: 'email',
    question: 'Email',
    field: 'email',
  },
]

/** ~5 questions per screen after intro. */
export const SURVEY_PAGE_QUESTION_IDS: string[][] = [
  ['location', 'employees', 'marketing-manager', 'challenge', 'ai'],
  ['skills', 'support-intent', 'budget', 'one-change', 'findings'],
  ['follow-up', 'preferred-contact', 'phone', 'email'],
]

export function questionById(id: string): SurveyQuestion | undefined {
  return SURVEY_QUESTIONS.find((q) => q.id === id)
}

export function needsContactFields(answers: GtaSmbSurveyAnswers): boolean {
  return (
    answers.findingsSummary.startsWith('Yes') ||
    answers.followUpConsent === 'Yes'
  )
}

/** Progress units: each core question + conditional contact fields when visible. */
export function surveyProgress(answers: GtaSmbSurveyAnswers): { answered: number; total: number; pct: number } {
  const coreIds = [...SURVEY_PAGE_QUESTION_IDS[0], ...SURVEY_PAGE_QUESTION_IDS[1], 'follow-up']
  let answered = 0
  let total = coreIds.length

  for (const id of coreIds) {
    const q = questionById(id)
    if (q && isQuestionAnswered(q, answers)) answered++
  }

  if (needsContactFields(answers)) {
    total += 1
    if (answers.preferredContact) answered++

    const pref = answers.preferredContact
    if (pref === 'Phone' || pref === 'Both Phone & Email') {
      total += 1
      if (answers.phone.trim()) answered++
    }
    if (pref === 'Email' || pref === 'Both Phone & Email') {
      total += 1
      if (answers.email.trim()) answered++
    }
  }

  const pct = total > 0 ? Math.min(100, Math.round((answered / total) * 100)) : 0
  return { answered, total, pct }
}

export function isQuestionAnswered(q: SurveyQuestion, answers: GtaSmbSurveyAnswers): boolean {
  if (q.kind === 'single') {
    const v = String(answers[q.field] ?? '').trim()
    if (!v) return false
    if (q.allowOther && v === 'Other') {
      return Boolean(q.otherField && String(answers[q.otherField] ?? '').trim())
    }
    return true
  }
  if (q.kind === 'multi') return answers.skills.length > 0
  if (q.kind === 'text') return Boolean(String(answers[q.field] ?? '').trim())
  if (q.kind === 'contact-preference') return Boolean(answers.preferredContact)
  if (q.kind === 'phone') return Boolean(answers.phone.trim())
  if (q.kind === 'email') return Boolean(answers.email.trim())
  return false
}

export function validatePage(pageIndex: number, answers: GtaSmbSurveyAnswers): string | null {
  const ids = SURVEY_PAGE_QUESTION_IDS[pageIndex] ?? []
  for (const id of ids) {
    const q = questionById(id)
    if (!q) continue
    if (q.kind === 'contact-preference' || q.kind === 'phone' || q.kind === 'email') {
      if (!needsContactFields(answers)) continue
      if (q.kind === 'contact-preference' && !answers.preferredContact) {
        return 'Please select a preferred communication method.'
      }
      if (q.kind === 'phone') {
        const pref = answers.preferredContact
        if ((pref === 'Phone' || pref === 'Both Phone & Email') && !answers.phone.trim()) {
          return 'Please enter your phone number.'
        }
      }
      if (q.kind === 'email') {
        const pref = answers.preferredContact
        if ((pref === 'Email' || pref === 'Both Phone & Email') && !answers.email.trim()) {
          return 'Please enter your email.'
        }
        if (
          answers.email &&
          (pref === 'Email' || pref === 'Both Phone & Email') &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())
        ) {
          return 'Please enter a valid email address.'
        }
      }
      continue
    }
    if (q.required && !isQuestionAnswered(q, answers)) {
      return 'Please answer all required questions on this page.'
    }
  }
  return null
}
