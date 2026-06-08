import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  className?: string
}

/** Business inquiry CTA — routes to the homepage contact form, not a personal mailbox. */
export function BlogStratezikContactLink({
  children,
  className = 'text-oxblood underline underline-offset-2',
}: Props) {
  return (
    <Link to="/#contact-form" className={className}>
      {children}
    </Link>
  )
}
