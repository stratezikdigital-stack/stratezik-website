import { Link } from 'react-router-dom'
import type { Author } from '../seo/authors'

type Props = {
  author: Author
  /** Tailwind size classes for the figure box, e.g. w-8 h-8 or w-14 h-14 */
  sizeClassName?: string
  linkToAuthorPage?: boolean
}

/** Author portrait from `authors.ts` — used on blog bylines and sign-offs. */
export function AuthorHeadshot({
  author,
  sizeClassName = 'w-10 h-10',
  linkToAuthorPage = true,
}: Props) {
  if (!author.imagePath) return null

  const figure = (
    <figure className={`${sizeClassName} border border-ink/10 overflow-hidden m-0 shrink-0`}>
      <img
        src={author.imagePath}
        alt={author.name}
        width={128}
        height={128}
        decoding="async"
        className="w-full h-full object-cover object-top"
      />
    </figure>
  )

  if (!linkToAuthorPage) return figure

  return (
    <Link to={`/authors/${author.slug}`} className="hover:opacity-90 transition-opacity" aria-label={author.name}>
      {figure}
    </Link>
  )
}
