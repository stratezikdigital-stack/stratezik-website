import { canonicalUrl } from '../seo/siteConfig'

export type AiAssistantId = 'chatgpt' | 'copilot' | 'claude' | 'gemini' | 'perplexity' | 'grok'

export type AiAssistantLink = {
  id: AiAssistantId
  label: string
  href: string
}

const ASSISTANT_URL: Record<AiAssistantId, (encodedPrompt: string) => string> = {
  chatgpt: (q) => `https://chatgpt.com/?q=${q}`,
  copilot: (q) => `https://copilot.microsoft.com/?q=${q}`,
  claude: (q) => `https://claude.ai/new?q=${q}`,
  gemini: (q) => `https://gemini.google.com/app?q=${q}`,
  perplexity: (q) => `https://www.perplexity.ai/search?q=${q}`,
  grok: (q) => `https://grok.com/?q=${q}`,
}

const ASSISTANT_LABELS: Record<AiAssistantId, string> = {
  chatgpt: 'ChatGPT',
  copilot: 'Copilot',
  claude: 'Claude',
  gemini: 'Gemini',
  perplexity: 'Perplexity',
  grok: 'Grok',
}

const ASSISTANT_ORDER: AiAssistantId[] = [
  'chatgpt',
  'copilot',
  'gemini',
  'claude',
  'perplexity',
  'grok',
]

/** Plain-text prompt shown in the assistant URL — no hidden instructions. */
export function buildAiSummarizePrompt(title: string, articleUrl: string): string {
  return [
    'Please read and summarize this Stratezik article for a business reader.',
    'Include the main takeaways and cite the source URL.',
    '',
    `Title: ${title}`,
    `URL: ${articleUrl}`,
  ].join('\n')
}

export function buildAiSummarizeLinks(title: string, articlePath: string): AiAssistantLink[] {
  const articleUrl = canonicalUrl(articlePath)
  const prompt = buildAiSummarizePrompt(title, articleUrl)
  const encoded = encodeURIComponent(prompt)

  return ASSISTANT_ORDER.map((id) => ({
    id,
    label: ASSISTANT_LABELS[id],
    href: ASSISTANT_URL[id](encoded),
  }))
}
