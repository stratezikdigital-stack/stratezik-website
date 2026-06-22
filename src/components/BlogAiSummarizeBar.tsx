import { useCallback, useState } from 'react'
import {
  buildAiSummarizeLinks,
  getAiSummarizePromptForPost,
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
      document.execCommand('copy')
      document.body.removeChild(ta)
      return true
    } catch {
      return false
    }
  }
}

/**
 * Copy prompt on click, then open assistant — with clear paste instructions because
 * most tools block auto-fill from external deep links.
 */
export function BlogAiSummarizeBar({ title, slug, className = '' }: BlogAiSummarizeBarProps) {
  const articlePath = `/blog/${slug}`
  const links = buildAiSummarizeLinks(title, articlePath)
  const fullPrompt = getAiSummarizePromptForPost(title, articlePath)
  const [copied, setCopied] = useState(false)

  const openAssistant = useCallback(
    async (href: string) => {
      const ok = await copyPrompt(fullPrompt)
      setCopied(ok)
      if (ok) {
        window.setTimeout(() => setCopied(false), 4000)
      }
      window.open(href, '_blank', 'noopener,noreferrer')
    },
    [fullPrompt],
  )

  const handleCopyOnly = useCallback(async () => {
    const ok = await copyPrompt(fullPrompt)
    setCopied(ok)
    if (ok) {
      window.setTimeout(() => setCopied(false), 4000)
    }
  }, [fullPrompt])

  return (
    <aside
      aria-label="Summarize this article with AI"
      className={`mt-10 border border-ink/10 bg-cream-50/60 px-5 py-4 md:px-6 md:py-5 ${className}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">Summarize with AI</p>

      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        Pick an assistant below — we copy a ready-made prompt to your clipboard and open it in a new tab.
      </p>

      <div
        className="mt-3 rounded-sm border border-oxblood/30 bg-oxblood-50/70 px-4 py-3"
        role="note"
      >
        <p className="text-sm leading-relaxed text-ink-800">
          <span className="font-semibold text-oxblood">When the chat opens empty:</span>{' '}
          click the message box, then paste with{' '}
          <kbd className="inline-flex min-w-[2.25rem] items-center justify-center rounded border border-ink/20 bg-cream px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink shadow-sm">
            ⌘V
          </kbd>{' '}
          <span className="text-ink-500">or</span>{' '}
          <kbd className="inline-flex min-w-[3.25rem] items-center justify-center rounded border border-ink/20 bg-cream px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink shadow-sm">
            Ctrl+V
          </kbd>
          . Most AI tools block auto-fill from external links — pasting is the one step you need.
        </p>
      </div>

      {copied ? (
        <p className="mt-3 text-sm font-medium text-oxblood" role="status" aria-live="polite">
          Prompt copied — paste it in the new tab.
        </p>
      ) : null}

      <ol className="mt-4 space-y-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
        <li>1. Click an assistant</li>
        <li>2. Paste in the chat box</li>
      </ol>

      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              onClick={() => openAssistant(link.href)}
              className="inline-flex items-center rounded-sm border border-ink/15 bg-cream px-3 py-2 text-sm font-medium text-ink hover:border-oxblood hover:text-oxblood transition-colors"
            >
              {link.label}
              <span className="sr-only"> — copy prompt and open {link.label}</span>
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={handleCopyOnly}
            className="inline-flex items-center rounded-sm border border-dashed border-ink/25 bg-transparent px-3 py-2 text-sm font-medium text-ink-600 hover:border-oxblood hover:text-oxblood transition-colors"
          >
            Copy prompt only
          </button>
        </li>
      </ul>

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
