import { Download } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { CheatSheetHeader } from './CheatSheetHeader'
import { IndustrySelector } from './IndustrySelector'
import type { GuideParts } from '../../cheatsheet/guideParser'

function Markdown({ children }: { children: string }) {
  return (
    <article className="cheatsheet-prose font-sans">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </article>
  )
}

export function GuideView({ parts, author }: { parts: GuideParts; author: string }) {
  const hasSelector = Boolean(parts.sectionIntro && parts.after)

  return (
    <main id="cheat-sheet-guide" className="cheatsheet-shell min-h-screen pb-24">
      <CheatSheetHeader
        maxWidth="max-w-3xl"
        homeHref="/chatgpt-ads-cheat-sheet"
        trailing={
          <button
            type="button"
            onClick={() => window.print()}
            className="cheatsheet-pdf-btn inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-600 transition-colors hover:text-oxblood"
          >
            <Download className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Save as PDF
          </button>
        }
      />

      <div className="container-custom mx-auto max-w-3xl px-6 md:px-10">
        <div className="no-print cheatsheet-guide-hero mt-8 md:mt-10 pl-5 md:pl-6">
          <p className="editorial-label">Stratezik · Lead magnet · 2026</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
            The early-window optimization playbook
          </p>
        </div>

        <div className="cheatsheet-reading-surface mt-6 md:mt-8">
          <Markdown>{parts.before}</Markdown>
          {hasSelector && (
            <>
              <Markdown>{parts.sectionIntro}</Markdown>
              <IndustrySelector />
              {parts.closing && <Markdown>{parts.closing}</Markdown>}
              <Markdown>{parts.after}</Markdown>
            </>
          )}
        </div>

        <footer className="no-print mt-16 border-t border-ink/10 pt-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="editorial-label">By {author}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Stratezik Digital · Toronto, ON ·{' '}
                <a href="mailto:dave@stratezik.com" className="text-oxblood hover:underline">
                  dave@stratezik.com
                </a>
              </p>
            </div>
            <div className="card-editorial border-ink/10 bg-cream-50/60 p-5">
              <p className="editorial-label">More free tools</p>
              <p className="mt-2 text-sm text-ink-700">
                Score your site for AI citations or explore other Stratezik lead magnets.
              </p>
              <Link
                to="/free-tools?utm_source=chatgpt-cheat-sheet-guide&utm_medium=footer"
                className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood hover:underline"
              >
                Browse free tools →
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
