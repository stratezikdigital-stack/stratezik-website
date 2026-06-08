import { Link } from 'react-router-dom'
import { AuthorHeadshot } from './AuthorHeadshot'
import { getAuthorBySlug } from '../seo/authors'

/** Closing byline for long-form blog articles — uses the default author registry entry. */
export function BlogAuthorSignoff() {
  const author = getAuthorBySlug()
  if (!author) return null

  const linkedIn = author.sameAs.find((url) => url.includes('linkedin.com'))

  return (
    <div className="mt-10 flex items-start gap-4">
      <AuthorHeadshot author={author} sizeClassName="w-14 h-14 md:w-16 md:h-16" />
      <p className="text-ink-700 leading-relaxed min-w-0">
        <Link to={`/authors/${author.slug}`} className="hover:text-oxblood transition-colors">
          <strong className="text-ink">{author.name}</strong>
        </Link>
        <br />
        <span className="text-ink-600">
          {author.jobTitle} · Stratezik · Toronto, ON
          {linkedIn ? (
            <>
              {' · '}
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-oxblood underline underline-offset-2"
              >
                LinkedIn
              </a>
            </>
          ) : null}
        </span>
      </p>
    </div>
  )
}
