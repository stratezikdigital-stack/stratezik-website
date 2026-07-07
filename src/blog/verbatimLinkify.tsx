import { Children, cloneElement, isValidElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

const SITE_HOST = 'stratezik.com'

/** Matches bare domains/paths and https URLs in approved verbatim copy — render-only, source string unchanged. */
const URL_PATTERN =
  /\b(?:https?:\/\/)?(?:[\w-]+\.)+(?:com|org|net|io|ai|ca|co|dev)(?:\/[\w\-./?#=&%+@]*)?|\b(?:https?:\/\/)?stratezik\.com(?:\/[\w\-./?#=&%+@]*)?/gi

function toInternalPath(raw: string): string | null {
  const normalized = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
  if (!normalized.startsWith(SITE_HOST)) return null
  const path = normalized.slice(SITE_HOST.length)
  return path.startsWith('/') ? path : `/${path}`
}

const linkClass = 'text-oxblood underline underline-offset-2 hover:text-ink transition-colors'

function linkForUrl(url: string, key: string) {
  const internal = toInternalPath(url)
  if (internal) {
    return (
      <Link key={key} to={internal} className={linkClass}>
        {url}
      </Link>
    )
  }
  const href = url.startsWith('http') ? url : `https://${url}`
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {url}
    </a>
  )
}

/** Turn URL substrings in plain text into links without mutating the verbatim source. */
export function linkifyVerbatimText(text: string): ReactNode {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(URL_PATTERN.source, 'gi')

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(linkForUrl(match[0], `${match.index}-${match[0]}`))
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : parts
}

/** Recursively linkify string children in markdown output. */
export function linkifyVerbatimChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') return linkifyVerbatimText(child)
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children != null) {
      return cloneElement(child, {
        children: linkifyVerbatimChildren(child.props.children),
      })
    }
    return child
  })
}
