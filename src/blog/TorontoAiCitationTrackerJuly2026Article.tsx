import { Link } from 'react-router-dom'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import {
  ResearchAnswerAside,
  ResearchArticleRoot,
  ResearchHeroStats,
  ResearchProse,
  ResearchWide,
} from './BlogResearchLayout'
import { ResearchJsonLdFaqSection } from './ResearchJsonLdFaqSection'
import { TorontoAiCitationTrackerSeriesNav } from './TorontoAiCitationTrackerSeriesNav'
import { VerbatimResearchMarkdown } from './VerbatimResearchMarkdown'
import { torontoAiCitationTrackerJulyFaq } from './postFaqs'
import { TORONTO_AI_CITATION_TRACKER_JULY_2026_VERBATIM_BODY } from './verbatim/torontoAiCitationTrackerJuly2026Body'

const SLUG = 'toronto-ai-citation-tracker-july-2026'

export default function TorontoAiCitationTrackerJuly2026Article() {
  return (
    <ResearchArticleRoot>
      <TorontoAiCitationTrackerSeriesNav currentSlug={SLUG} />

      <ResearchWide className="mb-10 md:mb-14 speakable-tracker-finding-1">
        <ResearchHeroStats
          stats={[
            { value: '89%', label: 'Answers naming a local business', detail: 'Across 200 data points (50 queries × 4 engines)' },
            { value: '48%', label: 'ChatGPT ad rate (logged in)', detail: '90 buyer questions · 18 industries · June 19, 2026' },
            { value: '74%', label: 'Perplexity local naming', detail: 'Lowest of the four engines tested' },
            { value: '50', label: 'Frozen queries', detail: '10 GTA categories · collected July 3, 2026' },
          ]}
        />
      </ResearchWide>

      <ResearchProse className="speakable-tracker-summary">
        <VerbatimResearchMarkdown content={TORONTO_AI_CITATION_TRACKER_JULY_2026_VERBATIM_BODY} />
      </ResearchProse>

      <ResearchProse>
        <BlogGrowthCreditMidPromo />
        <BlogCheatSheetMidPromo />

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
            for Maps gaps. For ChatGPT ad placement by industry, see the{' '}
            <Link
              to="/blog/toronto-chatgpt-ads-index?utm_source=tracker-july-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              Toronto ChatGPT Ads Index
            </Link>{' '}
            and the{' '}
            <Link
              to="/blog/chatgpt-ads-2026-guide?utm_source=tracker-july-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              ChatGPT Ads setup guide
            </Link>
            .
          </p>
        </ResearchAnswerAside>

        <ResearchJsonLdFaqSection idPrefix={SLUG} items={torontoAiCitationTrackerJulyFaq} />

        <BlogAuthorSignoff />
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
