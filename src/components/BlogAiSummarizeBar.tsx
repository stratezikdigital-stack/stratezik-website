import { useCallback, useState } from 'react'
import {
  buildAiSummarizeLinks,
  getAiSummarizePromptForPost,
  type AiAssistantLink,
} from '../blog/buildAiSummarizeLinks'

type BlogAiSummarizeBarProps = {
  title: string
  slug: string
  className?: string
}

async function copyPrompt(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

/** Copies summarize prompt, then opens the assistant (URL prefill is best-effort only). */
export function BlogAiSummarizeBar({ title, slug, className = '' }: BlogAiSummarizeBarProps) {
  const articlePath = `/blog/${slug}`
  const links = buildAiSummarizeLinks(title, articlePath)
  const fullPrompt = getAiSummarizePromptForPost(title, articlePath)
  const [notice, setNotice] = useState<string | null>(null)

  const openAssistant = useCallback(
    async (link: AiAssistantLink) => {
      const copied = await copyPrompt(fullPrompt)
      window.open(link.href, '_blank', 'noopener,noreferrer')
      setNotice(
        copied
          ? `Prompt copied — paste in ${link.label} (⌘V / Ctrl+V) if the field is empty.`
          : `Opened ${link.label} — copy the prompt below if needed.`,
      )
      window.setTimeout(() => setNotice(null), 8000)
    },
    [fullPrompt],
  )

  const copyOnly = useCallback(async () => {
    const copied = await copyPrompt(fullPrompt)
    setNotice(copied ? 'Prompt copied to clipboard.' : 'Could not copy — select and copy the text below.')
    window.setTimeout(() => setNotice(null), 5000)
  }, [fullPrompt])

  return (
    <aside
      aria-label="Summarize this article with AI"
      className={`mt-10 border border-ink/10 bg-cream-50/60 px-5 py-4 md:px-6 md:py-5 ${className}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">Summarize with AI</p>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        We copy a ready-made prompt to your clipboard, then open your assistant. Paste with{' '}
        <span className="font-mono text-xs">⌘V</span> / <span className="font-mono text-xs">Ctrl+V</span> if the
        field is empty — most tools block auto-fill from external links.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => openAssistant(link)}
              className="inline-flex items-center rounded-sm border border-ink/15 bg-cream px-3 py-2 text-sm font-medium text-ink hover:border-oxblood hover:text-oxblood transition-colors"
            >
              {link.label}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyOnly}
            className="inline-flex items-center rounded-sm border border-dashed border-ink/25 bg-transparent px-3 py-2 text-sm font-medium text-ink-600 hover:border-oxblood hover:text-oxblood transition-colors"
          >
            Copy prompt
          </button>
        </li>
      </ul>
      {notice ? (
        <p className="mt-3 text-sm text-oxblood" role="status" aria-live="polite">
          {notice}
        </p>
      ) : null}
      <details className="mt-4 text-sm text-ink-600">
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 hover:text-ink">
          View prompt text
        </summary>
        <pre className="mt-3 whitespace-pre-wrap rounded-sm border border-ink/10 bg-cream p-3 text-xs leading-relaxed text-ink-700 font-sans">
          {fullPrompt}
        </pre>
      </details>
    </aside>
  )
}
