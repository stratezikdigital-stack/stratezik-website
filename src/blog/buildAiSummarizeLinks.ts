import { canonicalUrl, SITE_ORIGIN } from '../seo/siteConfig'

export type AiAssistantId = 'chatgpt' | 'copilot' | 'claude' | 'gemini' | 'perplexity' | 'grok'

export type AiAssistantLink = {
  id: AiAssistantId
  label: string
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

const BLOG_HUB = `${SITE_ORIGIN}/blog`

/** Link-out prompt (single block) — kept under ~1.8k chars for URL limits. */
export function buildAiSummarizePrompt(title: string, articleUrl: string): string {
  return [
    `Summarize the article at ${articleUrl} ("${title}").`,
    'Highlight 4–5 key takeaways for a business reader.',
    `Where possible, reference other articles from ${BLOG_HUB} and suggest what to read next.`,
    `Cite ${articleUrl} as the source.`,
  ].join(' ')
}

function trimPromptForUrl(title: string, articleUrl: string): string {
  let prompt = buildAiSummarizePrompt(title, articleUrl)
  if (prompt.length <= 1800) return prompt
  const shortTitle = title.length > 72 ? `${title.slice(0, 69)}…` : title
  prompt = buildAiSummarizePrompt(shortTitle, articleUrl)
  if (prompt.length <= 1800) return prompt
  return [
    `Summarize ${articleUrl}. Highlight 4–5 business takeaways.`,
    `Suggest related reads from ${BLOG_HUB}. Cite the URL.`,
  ].join(' ')
}

/** Platform deep-link builders — native <a href> navigation (no JS window.open). */
function buildAssistantHref(id: AiAssistantId, encodedPrompt: string): string {
  switch (id) {
    case 'chatgpt':
      // hints=search helps ChatGPT fetch/summarize URLs when Search is available.
      return `https://chatgpt.com/?q=${encodedPrompt}&hints=search&temporary-chat=true`
    case 'copilot':
      return `https://copilot.microsoft.com/?q=${encodedPrompt}`
    case 'claude':
      return `https://claude.ai/new?q=${encodedPrompt}`
    case 'gemini':
      return `https://gemini.google.com/app?prompt=${encodedPrompt}`
    case 'perplexity':
      // Perplexity handles URL-style queries well in search mode.
      return `https://www.perplexity.ai/search?q=${encodedPrompt}`
    case 'grok':
      return `https://grok.com/?q=${encodedPrompt}`
    default: {
      const _exhaustive: never = id
      return _exhaustive
    }
  }
}

export function buildAiSummarizeLinks(title: string, articlePath: string): AiAssistantLink[] {
  const articleUrl = canonicalUrl(articlePath)
  const prompt = trimPromptForUrl(title, articleUrl)
  const encoded = encodeURIComponent(prompt)

  return ASSISTANT_ORDER.map((id) => ({
    id,
    label: ASSISTANT_LABELS[id],
    href: buildAssistantHref(id, encoded),
  }))
}

export function getAiSummarizePromptForPost(title: string, articlePath: string): string {
  return trimPromptForUrl(title, canonicalUrl(articlePath))
}
