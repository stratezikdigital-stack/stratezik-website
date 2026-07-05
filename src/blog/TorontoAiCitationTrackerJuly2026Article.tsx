import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import {
  ResearchAnswerAside,
  ResearchArticleRoot,
  ResearchDataTable,
  ResearchHeroStats,
  ResearchProse,
  ResearchWide,
} from './BlogResearchLayout'
import { TorontoAiCitationTrackerSeriesNav } from './TorontoAiCitationTrackerSeriesNav'
import {
  CHATGPT_AD_PRESENCE_BY_CATEGORY,
  CHATGPT_HISTORICAL_AD_SIGHTING,
  CHATGPT_LIVE_AD_ROWS,
} from './torontoChatgptAdPresenceJuly2026Data'
import {
  TRACKER_JULY_ABOUT_MARKDOWN,
  TRACKER_JULY_MAIN_MARKDOWN,
  TRACKER_JULY_SVG_CATEGORY,
  TRACKER_JULY_SVG_ENGINE,
} from './torontoAiCitationTrackerJuly2026Content'

const SLUG = 'toronto-ai-citation-tracker-july-2026'
const CONTACT_EMAIL = ['dave', '@', 'stratezik.com'].join('')

function VerbatimSvg({ markup }: { markup: string }) {
  return (
    <div
      className="my-10 w-full overflow-x-auto [&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto"
      // SVG is verbatim from approved research export — not user-supplied HTML.
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

function TrackerMarkdown({ content }: { content: string }) {
  const normalized = content.replace(/\[\[CONTACT_EMAIL\]\]/g, CONTACT_EMAIL)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: () => null,
        h2: ({ children }) => (
          <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.75rem)] text-ink leading-tight tracking-[-0.03em]">
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
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto border border-ink/10 bg-cream shadow-[0_16px_48px_-36px_rgba(13,12,10,0.5)]">
            <table className="w-full min-w-[320px] border-collapse text-sm text-left">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-cream-50 border-b border-ink/10">{children}</thead>,
        th: ({ children }) => (
          <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">{children}</th>
        ),
        td: ({ children }) => <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{children}</td>,
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
      {normalized}
    </ReactMarkdown>
  )
}

export default function TorontoAiCitationTrackerJuly2026Article() {
  const finding1Idx = TRACKER_JULY_MAIN_MARKDOWN.indexOf('## Finding 1:')
  const whatIdx = TRACKER_JULY_MAIN_MARKDOWN.indexOf('## What this means')
  const methodIdx = TRACKER_JULY_MAIN_MARKDOWN.indexOf('## Methodology and limitations')

  const intro = TRACKER_JULY_MAIN_MARKDOWN.slice(0, finding1Idx)
  const findings = TRACKER_JULY_MAIN_MARKDOWN.slice(finding1Idx, whatIdx)
  const implications = TRACKER_JULY_MAIN_MARKDOWN.slice(whatIdx, methodIdx)
  const methodology = TRACKER_JULY_MAIN_MARKDOWN.slice(methodIdx)

  return (
    <ResearchArticleRoot>
      <TorontoAiCitationTrackerSeriesNav currentSlug={SLUG} />

      <ResearchWide className="mb-10 md:mb-14">
        <ResearchHeroStats
          stats={[
            { value: '89%', label: 'Answers naming a local business', detail: 'Across 200 data points (50 queries × 4 engines)' },
            { value: '98%', label: 'Google AI Mode local naming', detail: '49 of 50 frozen buying questions' },
            { value: '74%', label: 'Perplexity local naming', detail: 'Lowest of the four engines tested' },
            { value: '50', label: 'Frozen queries', detail: '10 GTA categories · collected July 3, 2026' },
          ]}
        />
      </ResearchWide>

      <ResearchProse className="speakable-tracker-summary">
        <TrackerMarkdown content={intro} />
      </ResearchProse>

      <ResearchProse>
        <BlogGrowthCreditMidPromo />
        <BlogCheatSheetMidPromo />
      </ResearchProse>

      <ResearchProse className="speakable-tracker-finding-1">
        <TrackerMarkdown content={findings} />

        <ResearchDataTable caption="Table 3. ChatGPT labelled ad presence by category, July 5, 2026 DOM scan (50 frozen queries, 5 per category).">
          <table className="w-full min-w-[320px] border-collapse text-sm text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">Category</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                  Live ads (July 5)
                </th>
              </tr>
            </thead>
            <tbody>
              {CHATGPT_AD_PRESENCE_BY_CATEGORY.map((row) => (
                <tr key={row.category}>
                  <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{row.category}</td>
                  <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{row.liveAds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResearchDataTable>

        <ResearchDataTable caption="Table 4. Live ChatGPT ads found on July 5, 2026, plus one historical sighting from July 3 that did not reproduce.">
          <table className="w-full min-w-[480px] border-collapse text-sm text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">Query</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">Advertiser</th>
                <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">Note</th>
              </tr>
            </thead>
            <tbody>
              {CHATGPT_LIVE_AD_ROWS.map((row) => (
                <tr key={row.query}>
                  <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{row.query}</td>
                  <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{row.advertiser}</td>
                  <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{row.mismatch}</td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{CHATGPT_HISTORICAL_AD_SIGHTING.query}</td>
                <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{CHATGPT_HISTORICAL_AD_SIGHTING.advertiser}</td>
                <td className="px-4 py-3 text-ink-700 border-t border-ink/10">{CHATGPT_HISTORICAL_AD_SIGHTING.note}</td>
              </tr>
            </tbody>
          </table>
        </ResearchDataTable>
      </ResearchProse>

      <ResearchProse>
        <TrackerMarkdown content={implications} />

        <ResearchAnswerAside id="tracker-playbook" question="What should you do about these findings?">
          <p>
            For the playbook on earning AI recommendations — reviews, roundups, plain-language location, and crawler-readable
            sites — read our guide:{' '}
            <Link
              to="/blog/get-recommended-by-chatgpt-toronto?utm_source=tracker-july-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              How to Get Your Toronto Business Recommended by ChatGPT
            </Link>
            . Run the free{' '}
            <Link to="/aeo-checker?utm_source=tracker-july-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              AEO Readiness Checker
            </Link>{' '}
            to see whether AI crawlers can parse your site, or scan your{' '}
            <Link to="/gbp-audit?utm_source=tracker-july-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              Google Business Profile
            </Link>{' '}
            for Maps gaps. See also{' '}
            <Link
              to="/blog/get-found-2026-ai-search-visibility?utm_source=tracker-july-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              AI search visibility (Get Found Part 3)
            </Link>
            , the{' '}
            <Link
              to="/blog/answer-engine-optimisation-toronto?utm_source=tracker-july-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              AEO Toronto primer
            </Link>
            , and our{' '}
            <Link to="/free-tools?utm_source=tracker-july-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              free tools hub
            </Link>
            .
          </p>
        </ResearchAnswerAside>

        <TrackerMarkdown content={methodology} />
      </ResearchProse>

      <ResearchWide>
        <VerbatimSvg markup={TRACKER_JULY_SVG_ENGINE} />
        <VerbatimSvg markup={TRACKER_JULY_SVG_CATEGORY} />
      </ResearchWide>

      <ResearchProse>
        <TrackerMarkdown content={TRACKER_JULY_ABOUT_MARKDOWN} />
        <BlogAuthorSignoff />
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
