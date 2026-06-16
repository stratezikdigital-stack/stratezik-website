import { Link } from 'react-router-dom'

/** Mid-article ChatGPT cheat sheet mention for the ChatGPT Ads blog post. */
export function BlogCheatSheetMidPromo() {
  return (
    <p className="mt-8 text-ink-700 leading-relaxed border-l-2 border-oxblood/40 pl-4">
      Want the optimization playbook, not just the platform overview?{' '}
      <Link
        to="/chatgpt-ads-cheat-sheet?utm_source=blog-chatgpt-ads&utm_medium=inline"
        className="text-oxblood underline underline-offset-2 font-medium"
      >
        Get our free ChatGPT Ads cheat sheet
      </Link>{' '}
      — context hints, bid-floor tests, industry readiness, and the measurement stack from practitioners
      running real budgets.
    </p>
  )
}
