import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Link } from 'react-router-dom'
import type { Components } from 'react-markdown'
import { linkifyVerbatimChildren } from './verbatimLinkify'

/** Set on inline-styled HTML tables from approved copy — children pass through with styles intact. */
const RawHtmlTableContext = createContext(false)

function useRawHtmlTable() {
  return useContext(RawHtmlTableContext)
}

/** MoM widget block from approved copy — includes inline style + script; split out for script execution. */
const SAAI_WIDGET_BLOCK_RE = /<div class="saai">[\s\S]*?<\/script>\s*<\/div>/g

function passthrough(tag: keyof JSX.IntrinsicElements, props: Record<string, unknown>) {
  const { node: _node, ...rest } = props
  const Tag = tag as 'div'
  return <Tag {...(rest as Record<string, never>)} />
}

function VerbatimMarkdownTable({ children }: { children?: ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto border border-ink/10 bg-cream shadow-[0_16px_48px_-36px_rgba(13,12,10,0.5)]">
      <table className="w-full min-w-[320px] border-collapse text-sm text-left">{children}</table>
    </div>
  )
}

/** Raw HTML embed — dangerouslySetInnerHTML plus script re-injection so inline widgets build. */
function VerbatimHtmlEmbed({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.querySelectorAll('script').forEach((oldScript) => {
      const next = document.createElement('script')
      next.textContent = oldScript.textContent
      oldScript.replaceWith(next)
    })
  }, [html])

  return (
    <div
      ref={containerRef}
      className={className}
      // Approved Stratezik research widgets only — verbatim from content/approved.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

type ContentSegment = { type: 'md' | 'html'; value: string }

function splitVerbatimContent(content: string): ContentSegment[] {
  const segments: ContentSegment[] = []
  let lastIndex = 0
  const re = new RegExp(SAAI_WIDGET_BLOCK_RE.source, 'g')
  let match: RegExpExecArray | null

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'md', value: content.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'html', value: match[0] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    segments.push({ type: 'md', value: content.slice(lastIndex) })
  }

  return segments.length ? segments : [{ type: 'md', value: content }]
}

const verbatimComponents: Components = {
  h1: () => null,
  h2: (props) => {
    if (props.style) return passthrough('h2', props as Record<string, unknown>)
    return (
      <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.75rem)] text-ink leading-tight tracking-[-0.03em]">
        {props.children}
      </h2>
    )
  },
  h3: ({ children }) => <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-10 font-display text-xl text-ink tracking-tight">{children}</h4>,
  p: ({ children }) => <p className="mt-6 text-ink-700 leading-relaxed">{linkifyVerbatimChildren(children)}</p>,
  ul: ({ children }) => <ul className="mt-6 space-y-3 list-disc pl-5 text-ink-700 leading-relaxed">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mt-6 space-y-3 list-decimal pl-6 text-ink-700 leading-relaxed">{children}</ol>
  ),
  li: ({ children }) => <li>{linkifyVerbatimChildren(children)}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  b: (props) => {
    if (useRawHtmlTable() || props.style) return passthrough('b', props as Record<string, unknown>)
    return <b>{props.children}</b>
  },
  span: (props) => passthrough('span', props as Record<string, unknown>),
  button: (props) => passthrough('button', props as Record<string, unknown>),
  style: (props) => passthrough('style', props as Record<string, unknown>),
  div: (props) => {
    const className = typeof props.className === 'string' ? props.className : ''
    const isSaaiRoot = className.split(/\s+/).includes('saai')
    const isScrollWrap =
      className.includes('saai-scroll') ||
      props.style?.overflowX === 'auto' ||
      props.style?.overflow === 'auto'

    if (isSaaiRoot) {
      return passthrough('div', {
        ...(props as Record<string, unknown>),
        className: ['verbatim-saai-bleed', className].filter(Boolean).join(' '),
      })
    }

    if (isScrollWrap) {
      return passthrough('div', {
        ...(props as Record<string, unknown>),
        className: ['verbatim-inline-table-scroll', className].filter(Boolean).join(' ') || undefined,
      })
    }

    return passthrough('div', props as Record<string, unknown>)
  },
  table: (props) => {
    if (props.style) {
      return (
        <RawHtmlTableContext.Provider value={true}>
          {passthrough('table', props as Record<string, unknown>)}
        </RawHtmlTableContext.Provider>
      )
    }
    return <VerbatimMarkdownTable>{props.children}</VerbatimMarkdownTable>
  },
  thead: (props) => {
    if (useRawHtmlTable()) return passthrough('thead', props as Record<string, unknown>)
    return <thead className="bg-cream-50 border-b border-ink/10">{props.children}</thead>
  },
  tbody: (props) => {
    if (useRawHtmlTable()) return passthrough('tbody', props as Record<string, unknown>)
    return <tbody>{props.children}</tbody>
  },
  tfoot: (props) => passthrough('tfoot', props as Record<string, unknown>),
  tr: (props) => {
    if (useRawHtmlTable()) return passthrough('tr', props as Record<string, unknown>)
    return <tr>{props.children}</tr>
  },
  th: (props) => {
    if (useRawHtmlTable()) return passthrough('th', props as Record<string, unknown>)
    return (
      <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500 whitespace-nowrap">
        {props.children}
      </th>
    )
  },
  td: (props) => {
    if (useRawHtmlTable()) return passthrough('td', props as Record<string, unknown>)
    return <td className="px-4 py-3 text-ink-700 border-t border-ink/10 whitespace-nowrap">{props.children}</td>
  },
  caption: (props) => {
    if (useRawHtmlTable()) return passthrough('caption', props as Record<string, unknown>)
    return <caption className="caption-top text-left text-[13px] text-ink-500 pb-2">{props.children}</caption>
  },
  svg: ({ children, ...props }) => (
    <svg {...props} className="my-10 mx-auto block max-w-full h-auto">
      {children}
    </svg>
  ),
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
    return (
      <Link to={target} className="text-oxblood underline underline-offset-2 hover:text-ink transition-colors">
        {children}
      </Link>
    )
  },
}

function VerbatimMarkdownSegment({ content, className }: { content: string; className?: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className={className}
      components={verbatimComponents}
    >
      {content}
    </ReactMarkdown>
  )
}

type VerbatimResearchMarkdownProps = {
  content: string
  className?: string
}

/** Renders approved research copy verbatim, including raw HTML tables, widgets, and inline SVG (rehype-raw). */
export function VerbatimResearchMarkdown({ content, className }: VerbatimResearchMarkdownProps) {
  const segments = useMemo(() => splitVerbatimContent(content), [content])

  if (segments.length === 1 && segments[0].type === 'md') {
    return <VerbatimMarkdownSegment content={content} className={className} />
  }

  return (
    <div className={className}>
      {segments.map((segment, index) =>
        segment.type === 'html' ? (
          <VerbatimHtmlEmbed key={`html-${index}`} html={segment.value} className="verbatim-saai-bleed not-prose" />
        ) : (
          <VerbatimMarkdownSegment key={`md-${index}`} content={segment.value} />
        ),
      )}
    </div>
  )
}
