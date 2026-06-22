import { buildAiSummarizeLinks } from '../blog/buildAiSummarizeLinks'

type BlogAiSummarizeBarProps = {
  title: string
  slug: string
  className?: string
}

/** Opens major AI assistants with a transparent, URL-only summarize prompt. */
export function BlogAiSummarizeBar({ title, slug, className = '' }: BlogAiSummarizeBarProps) {
  const links = buildAiSummarizeLinks(title, `/blog/${slug}`)

  return (
    <aside
      aria-label="Summarize this article with AI"
      className={`mt-10 border border-ink/10 bg-cream-50/60 px-5 py-4 md:px-6 md:py-5 ${className}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">Summarize with AI</p>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">
        Open in your assistant with this article&apos;s URL and a ready-made summarize prompt.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm border border-ink/15 bg-cream px-3 py-2 text-sm font-medium text-ink hover:border-oxblood hover:text-oxblood transition-colors"
            >
              {link.label}
              <span className="sr-only"> — summarize this article</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
