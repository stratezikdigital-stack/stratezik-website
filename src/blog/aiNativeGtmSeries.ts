export const AI_NATIVE_GTM_SERIES_TITLE = 'AI-Native GTM for Toronto Startups'

export type AiNativeGtmPart = {
  part: number
  slug: string | null
  shortTitle: string
  role: string
}

export const AI_NATIVE_GTM_PARTS: AiNativeGtmPart[] = [
  {
    part: 1,
    slug: 'ai-native-gtm-build-from-day-1',
    shortTitle: 'Build the function from day one',
    role: 'Foundation',
  },
  {
    part: 2,
    slug: null,
    shortTitle: 'Cited by ChatGPT before US rivals',
    role: 'Visibility',
  },
  {
    part: 3,
    slug: null,
    shortTitle: 'Agent stack that pays back at each stage',
    role: 'Systems',
  },
  {
    part: 4,
    slug: null,
    shortTitle: 'What your marketing hire looks like in 2026',
    role: 'Team design',
  },
]
