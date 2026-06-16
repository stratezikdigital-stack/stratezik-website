import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { CheatSheetLogo } from './CheatSheetLogo'
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
    <main id="cheat-sheet-guide" className="min-h-screen bg-cream pb-24">
      <div className="container-custom mx-auto max-w-3xl px-6 md:px-10 pt-8 md:pt-12">
        <div className="no-print">
          <header className="flex items-center justify-between gap-4 border-b border-ink/15 pb-5">
            <Link to="/chatgpt-ads-cheat-sheet" className="text-ink">
              <CheatSheetLogo />
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 underline-offset-4 hover:text-oxblood hover:underline"
            >
              Save as PDF
            </button>
          </header>
          <div className="editorial-label mt-6">Stratezik · Lead magnet · 2026</div>
        </div>

        <div className="mt-6">
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

        <footer className="no-print mt-16 hairline pt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          By {author} · Stratezik Digital · Toronto, ON ·{' '}
          <a href="mailto:dave@stratezik.com" className="text-oxblood">
            dave@stratezik.com
          </a>
        </footer>
      </div>
    </main>
  )
}
