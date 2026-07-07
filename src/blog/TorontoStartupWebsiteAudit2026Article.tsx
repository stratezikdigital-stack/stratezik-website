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
import { TorontoAiCitationTrackerSeriesNav } from './TorontoAiCitationTrackerSeriesNav'
import { TorontoStartupAuditChart } from './TorontoStartupAuditCharts'
import { TorontoStartupAuditFindingsDownload } from './TorontoStartupAuditFindingsDownload'
import { VerbatimResearchMarkdown } from './VerbatimResearchMarkdown'
import { TORONTO_STARTUP_WEBSITE_AUDIT_2026_SEGMENTS } from './verbatim/torontoStartupWebsiteAudit2026Body'

const SLUG = 'toronto-startup-website-audit-2026'

export default function TorontoStartupWebsiteAudit2026Article() {
  return (
    <ResearchArticleRoot>
      <TorontoAiCitationTrackerSeriesNav currentSlug={SLUG} variant="top" />

      <ResearchWide className="mb-10 md:mb-14 speakable-audit-summary">
        <ResearchHeroStats
          stats={[
            { value: '59', label: 'Median composite score', detail: '44 companies with verifiable composites · /100' },
            { value: '10.75', label: 'Median AEO score', detail: '20-point machine-verified test · /20' },
            { value: '95%', label: 'Default AEO points captured', detail: 'Crawler access, rendering, entity alignment' },
            { value: '29%', label: 'Deliberate AEO points captured', detail: 'Schema, answer-first copy, llms.txt, pricing' },
          ]}
        />
      </ResearchWide>

      <ResearchProse className="speakable-audit-finding-1">
        {TORONTO_STARTUP_WEBSITE_AUDIT_2026_SEGMENTS.map((segment, index) =>
          segment.type === 'chart' ? (
            <TorontoStartupAuditChart key={`chart-${segment.value}-${index}`} id={segment.value} />
          ) : (
            <VerbatimResearchMarkdown key={`md-${index}`} content={segment.value} />
          ),
        )}
      </ResearchProse>

      <ResearchProse>
        <BlogGrowthCreditMidPromo />
        <BlogCheatSheetMidPromo />

        <ResearchAnswerAside id="audit-aeo-checker" question="How do I score my own site on the same test?">
          <p>
            Run the identical 20-Point AEO Readiness Test on your domain with the free{' '}
            <Link to="/aeo-checker?utm_source=startup-audit-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              AEO Readiness Checker
            </Link>
            . Topline in ~20 seconds, full breakdown by email — benchmarked against the same 50-startup sample this report
            uses.
          </p>
        </ResearchAnswerAside>

        <ResearchAnswerAside id="audit-tracker" question="How does this connect to the AI Citation Tracker?">
          <p>
            This audit measures whether AI <em>can</em> read and parse your site. The{' '}
            <Link
              to="/blog/toronto-ai-citation-tracker?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              Toronto AI Citation Tracker
            </Link>{' '}
            measures whether AI assistants actually <em>name</em> local businesses when buyers ask. Read the{' '}
            <Link
              to="/blog/toronto-ai-citation-tracker-july-2026?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              July 2026 edition
            </Link>{' '}
            for the latest citation map, or the{' '}
            <Link
              to="/blog/toronto-chatgpt-ads-index?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              ChatGPT Ads Index
            </Link>{' '}
            for paid placement by industry.
          </p>
        </ResearchAnswerAside>

        <ResearchAnswerAside id="audit-playbooks" question="Where should founders go next?">
          <p>
            For earning recommendations in ChatGPT and other assistants, read{' '}
            <Link
              to="/blog/get-recommended-by-chatgpt-toronto?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              How to Get Your Toronto Business Recommended by ChatGPT
            </Link>{' '}
            and the broader{' '}
            <Link
              to="/blog/get-recommended-by-chatgpt-playbook?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              2026 recommendation playbook
            </Link>
            . Audit your{' '}
            <Link to="/gbp-audit?utm_source=startup-audit-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              Google Business Profile
            </Link>{' '}
            for Maps visibility, browse all{' '}
            <Link to="/free-tools?utm_source=startup-audit-2026&utm_medium=inline" className="text-oxblood underline underline-offset-2">
              free tools
            </Link>
            , or explore{' '}
            <Link
              to="/services/seo-aeo/answer-engine-optimization?utm_source=startup-audit-2026&utm_medium=inline"
              className="text-oxblood underline underline-offset-2"
            >
              AEO services
            </Link>
            .
          </p>
        </ResearchAnswerAside>

        <TorontoStartupAuditFindingsDownload />

        <BlogAuthorSignoff />
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
