import { Link } from 'react-router-dom'
import { CheatSheetLogo } from './CheatSheetLogo'

type CheatSheetHeaderProps = {
  maxWidth?: 'max-w-3xl' | 'max-w-5xl'
  homeHref?: string
  trailing?: React.ReactNode
}

/**
 * Shared chrome for cheat sheet landing + guide.
 * Full-width rail + sticky bar; inner column matches page content width.
 */
export function CheatSheetHeader({
  maxWidth = 'max-w-5xl',
  homeHref = '/',
  trailing,
}: CheatSheetHeaderProps) {
  return (
    <>
      <div className="cheatsheet-top-rail no-print">Toronto digital marketing studio</div>
      <header className="cheatsheet-header no-print">
        <div className={`container-custom mx-auto flex ${maxWidth} items-center justify-between gap-4 px-6 py-4 md:px-10`}>
          <Link to={homeHref} className="inline-flex shrink-0 items-center text-ink">
            <CheatSheetLogo />
          </Link>
          {trailing}
        </div>
      </header>
    </>
  )
}
