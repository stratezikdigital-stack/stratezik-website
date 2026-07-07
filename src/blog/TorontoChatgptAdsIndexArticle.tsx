import { Link } from 'react-router-dom'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { ResearchAnswerAside, ResearchArticleRoot, ResearchHeroStats, ResearchProse, ResearchWide } from './BlogResearchLayout'
import { ResearchJsonLdFaqSection } from './ResearchJsonLdFaqSection'
import { VerbatimResearchMarkdown } from './VerbatimResearchMarkdown'
import { torontoChatgptAdsIndexFaq } from './postFaqs'
import { TORONTO_CHATGPT_ADS_INDEX_VERBATIM_BODY } from './verbatim/torontoChatgptAdsIndexBody'

const SLUG = 'toronto-chatgpt-ads-index'

export default function TorontoChatgptAdsIndexArticle() {
  return (
    <ResearchArticleRoot>
      <ResearchWide className="mb-10 md:mb-14 speakable-ads-index-summary">
        <ResearchHeroStats
          stats={[
            { value: '48%', label: 'Questions with a ChatGPT ad', detail: '90 commercial buyer questions · June 19, 2026' },
            { value: '18', label: 'Industries mapped', detail: 'Logged-in Free tier · web search on' },
            { value: '59%', label: 'Relevant ads (commercial)', detail: 'vs 36% in local-service categories' },
            { value: '3', label: 'White-space industries', detail: 'Fitness, pest control, electrical at 0%' },
          ]}
        />
      </ResearchWide>

      <ResearchProse className="speakable-ads-index-map">
        <VerbatimResearchMarkdown content={TORONTO_CHATGPT_ADS_INDEX_VERBATIM_BODY} />

        <BlogGrowthCreditMidPromo />
        <BlogCheatSheetMidPromo />

        <ResearchAnswerAside id="ads-index-organic" question="Should you fix organic AI visibility before buying ChatGPT ads?">
          <p>
            For most Toronto local categories, being named organically still beats paying for placement. Measure that first
            in the{' '}
            <Link
              to="/blog/toronto-ai-citation-tracker-july-2026?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              July 2026 Toronto AI Citation Tracker
            </Link>{' '}
            or the{' '}
            <Link
              to="/blog/toronto-ai-citation-tracker?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              tracker series hub
            </Link>
            , then run the free{' '}
            <Link to="/aeo-checker?utm_source=ads-index&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              AEO Readiness Checker
            </Link>{' '}
            and{' '}
            <Link to="/gbp-audit?utm_source=ads-index&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              Google Business Profile audit
            </Link>{' '}
            before you spend on ads.
          </p>
        </ResearchAnswerAside>

        <ResearchAnswerAside id="ads-index-playbooks" question="Where do I go next after reading the map?">
          <p>
            For the practitioner playbook on earning recommendations, read{' '}
            <Link
              to="/blog/get-recommended-by-chatgpt-toronto?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              How to Get Your Toronto Business Recommended by ChatGPT
            </Link>{' '}
            and the broader{' '}
            <Link
              to="/blog/get-recommended-by-chatgpt-playbook?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              2026 recommendation playbook
            </Link>
            . For platform setup and when to skip paid, see{' '}
            <Link
              to="/blog/chatgpt-ads-2026-guide?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              ChatGPT Ads in 2026: Setup, Costs, and When to Skip It
            </Link>{' '}
            and our earlier{' '}
            <Link
              to="/blog/chatgpt-ads-toronto-industries?utm_source=ads-index&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              90-question Toronto industry study
            </Link>
            .
          </p>
        </ResearchAnswerAside>

        <ResearchJsonLdFaqSection idPrefix={SLUG} items={torontoChatgptAdsIndexFaq} />

        <BlogAuthorSignoff />
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
