import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { AeoCheckerCta } from '../components/AeoCheckerCta'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { HOW_TO_APPEAR_IN_CHATGPT_ANSWERS_BODY } from './verbatim/howToAppearInChatgptAnswersBody'

const CONTACT_EMAIL = ['dave', '@', 'stratezik.com'].join('')

export default function HowToAppearInChatgptAnswersArticle() {
  const content = HOW_TO_APPEAR_IN_CHATGPT_ANSWERS_BODY.replace('[[CONTACT_EMAIL]]', CONTACT_EMAIL)
    // Keep supplied text, normalize FAQ spacing for readable blocks.
    .replace(/\*\*(.+?\?)\*\*\n(?!\n)/g, '**$1**\n\n')

  return (
    <div className="max-w-[760px] mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => (
            <h2 className="mt-16 font-display text-display-3 text-ink leading-tight tracking-[-0.02em]">
              {children}
            </h2>
          ),
          h3: ({ children }) => <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">{children}</h3>,
          p: ({ children }) => <p className="mt-6 text-ink-700 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mt-6 space-y-3 list-disc pl-5 text-ink-700 leading-relaxed">{children}</ul>,
          ol: ({ children }) => (
            <ol className="mt-6 space-y-3 list-decimal pl-6 text-ink-700 leading-relaxed">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
          hr: () => <hr className="my-12 border-ink/10" />,
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
        }}
      >
        {content}
      </ReactMarkdown>

      <AeoCheckerCta
        variant="banner"
        source="blog"
        campaign="how-to-appear-in-chatgpt-answers"
        className="mt-12"
      />
      <BlogGrowthCreditMidPromo />
      <BlogCheatSheetMidPromo />

      <aside className="mt-12 rounded-lg border border-ink/10 bg-paper-alt/40 p-6 text-ink-700 leading-relaxed">
        <p className="font-semibold text-ink">Related reading</p>
        <ul className="mt-4 space-y-2 list-disc pl-5">
          <li>
            <Link
              to="/blog/get-recommended-by-chatgpt-toronto?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              How to get your Toronto business recommended by ChatGPT
            </Link>{' '}
            — our 90-question naming study
          </li>
          <li>
            <Link
              to="/blog/get-recommended-by-chatgpt-playbook?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              2026 ChatGPT recommendation playbook
            </Link>{' '}
            — schema, crawlers, and answer-first tactics
          </li>
          <li>
            <Link
              to="/blog/answer-engine-optimisation-toronto?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              Answer engine optimisation for Toronto businesses
            </Link>
          </li>
          <li>
            <Link
              to="/blog/toronto-ai-citation-tracker?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              Toronto AI Citation Tracker
            </Link>{' '}
            — monthly series hub
          </li>
          <li>
            <Link
              to="/gbp-audit?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              Free Google Business Profile audit
            </Link>
          </li>
          <li>
            <Link
              to="/services/seo-aeo/answer-engine-optimization?utm_source=how-to-appear-chatgpt&utm_medium=related"
              className="text-oxblood underline underline-offset-2"
            >
              AEO services
            </Link>{' '}
            — if you want help shipping the checklist
          </li>
        </ul>
        <p className="mt-4">
          Prefer to talk it through? Use our{' '}
          <BlogStratezikContactLink className="text-oxblood underline underline-offset-2">
            contact form
          </BlogStratezikContactLink>
          .
        </p>
      </aside>

      <BlogAuthorSignoff />
    </div>
  )
}
