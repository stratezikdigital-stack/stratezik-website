import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { serviceRoutePaths } from '../services/services'

function isResolvableInternal(href: string): boolean {
  if (serviceRoutePaths.includes(href)) return true
  if (href === '/' || href === '/blog' || href === '/careers') return true
  if (href.startsWith('/blog/') || href.startsWith('/authors/')) return true
  return false
}

/**
 * Editorial markdown renderer for service pages. Resolves internal links to
 * SPA <Link>s, opens external links safely, and strips links whose targets do
 * not exist yet (Phase 2 child routes) so we never ship broken internal links.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="max-w-[720px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-display text-display-3 md:text-[clamp(2rem,4.5vw,3rem)] text-ink leading-[1.08] tracking-[-0.03em]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight mt-14 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-display text-xl text-ink tracking-tight mt-10 mb-3">{children}</h3>
          ),
          p: ({ children }) => <p className="text-ink-700 leading-relaxed mt-5">{children}</p>,
          ul: ({ children }) => <ul className="mt-5 space-y-2 list-disc pl-5 text-ink-700">{children}</ul>,
          ol: ({ children }) => <ol className="mt-5 space-y-2 list-decimal pl-5 text-ink-700">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          a: ({ href, children }) => {
            const target = href ?? ''
            if (target.startsWith('http')) {
              return (
                <a
                  href={target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-oxblood underline underline-offset-2 hover:text-ink transition-colors"
                >
                  {children}
                </a>
              )
            }
            if (isResolvableInternal(target)) {
              return (
                <Link
                  to={target}
                  className="text-oxblood underline underline-offset-2 hover:text-ink transition-colors"
                >
                  {children}
                </Link>
              )
            }
            // Unresolved internal target (Phase 2): render as plain text.
            return <span>{children}</span>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
