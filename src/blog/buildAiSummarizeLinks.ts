import { canonicalUrl } from '../seo/siteConfig'

export type AiAssistantId = 'chatgpt' | 'copilot' | 'claude' | 'gemini' | 'perplexity' | 'grok'

export type AiAssistantLink = {
  id: AiAssistantId
  label: string
  /** Best-effort deep link; may not prefill when opened from an external site. */
  href: string
}

const ASSISTANT_ORDER: AiAssistantId[] = [
  'chatgpt',
  'copilot',
  'gemini',
  'claude',
  'perplexity',
  'grok',
]

const ASSISTANT_LABELS: Record<AiAssistantId, string> = {
  chatgpt: 'ChatGPT',
  copilot: 'Copilot',
  claude: 'Claude',
  gemini: 'Gemini',
  perplexity: 'Perplexity',
  grok: 'Grok',
}

/** Per-platform param names (Gemini/ChatGPT use `prompt`; others often use `q`). */
const ASSISTANT_URL: Record<AiAssistantId, (encodedPrompt: string) => string> = {
  chatgpt: (p) => `https://chatgpt.com/?prompt=${p}`,
  copilot: (p) => `https://copilot.microsoft.com/?q=${p}`,
  claude: (p) => `https://claude.ai/new?q=${p}`,
  gemini: (p) => `https://gemini.google.com/app?prompt=${p}`,
  perplexity: (p) => `https://www.perplexity.ai/search?q=${p}`,
  grok: (p) => `https://grok.com/?q=${p}`,
}

/** Full prompt copied to clipboard — reliable across all assistants. */
export function buildAiSummarizePrompt(title: string, articleUrl: string): string {
  return [
    'Please read and summarize this Stratezik article for a business reader.',
    'Include the main takeaways and cite the source URL.',
    '',
    `Title: ${title}`,
    `URL: ${articleUrl}`,
  ].join('\n')
}

/** Short prompt for URL deep links (length limits; may not prefill cross-site). */
export function buildAiSummarizeShortPrompt(title: string, articleUrl: string): string {
  return `Read and summarize this Stratezik article for a business reader — "${title}": ${articleUrl}`
}

export function buildAiSummarizeLinks(title: string, articlePath: string): AiAssistantLink[] {
  const articleUrl = canonicalUrl(articlePath)
  const shortEncoded = encodeURIComponent(buildAiSummarizeShortPrompt(title, articleUrl))

  return ASSISTANT_ORDER.map((id) => ({
    id,
    label: ASSISTANT_LABELS[id],
    href: ASSISTANT_URL[id](shortEncoded),
  }))
}

export function getAiSummarizePromptForPost(title: string, articlePath: string): string {
  return buildAiSummarizePrompt(title, canonicalUrl(articlePath))
}
