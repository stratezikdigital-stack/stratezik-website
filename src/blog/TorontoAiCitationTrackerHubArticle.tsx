import { Link } from 'react-router-dom'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import {
  ResearchArticleRoot,
  ResearchHeroStats,
  ResearchProse,
  ResearchWide,
} from './BlogResearchLayout'
import { TorontoAiCitationTrackerSeriesNav } from './TorontoAiCitationTrackerSeriesNav'
import {
  TORONTO_AI_CITATION_TRACKER_HUB_SLUG,
  TORONTO_AI_CITATION_TRACKER_TITLE,
  getCurrentTorontoAiCitationTrackerEdition,
} from './torontoAiCitationTrackerSeries'

const SLUG = TORONTO_AI_CITATION_TRACKER_HUB_SLUG

export default function TorontoAiCitationTrackerHubArticle() {
  const current = getCurrentTorontoAiCitationTrackerEdition()

  return (
    <ResearchArticleRoot>
      <TorontoAiCitationTrackerSeriesNav currentSlug={SLUG} />

      <ResearchWide className="mb-10 md:mb-14 speakable-tracker-summary">
        <ResearchHeroStats
          stats={[
            { value: '89%', label: 'Latest: local business named', detail: `${current.monthLabel} baseline across 4 engines` },
            { value: '4', label: 'AI engines tracked', detail: 'ChatGPT · Perplexity · Google AI Mode · Claude' },
            { value: '50', label: 'Frozen queries monthly', detail: '10 GTA service categories' },
            { value: '12', label: 'Editions per year', detail: 'Monthly readings + quarterly rollups' },
          ]}
        />
      </ResearchWide>

      <ResearchProse>
        <p className="lead text-lg text-ink-700 leading-relaxed speakable-tracker-finding-1">
          {TORONTO_AI_CITATION_TRACKER_TITLE} is Stratezik&apos;s recurring measure of which AI assistants actually recommend
          Toronto and GTA businesses — category by category, month after month. This is the canonical home for the series:
          start with the latest edition below, then browse the archive as we publish new readings.
        </p>

        <section className="mt-12 border border-ink/12 bg-cream-50 p-6 md:p-8" aria-labelledby="current-edition-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">Current edition</p>
          <h2 id="current-edition-heading" className="mt-3 font-display text-2xl text-ink tracking-tight">
            {current.monthLabel}: {current.headline}
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            Edition one (baseline): 200 data points from 50 frozen high-intent buyer questions across dental, injury law,
            accounting, pest control, plumbing, general contracting, restaurants, wellness, medical clinics, and home services.
            Google AI Mode led at 98% local naming; Perplexity trailed at 74% and mishandled Scarborough on several queries.
          </p>
          <Link
            to={`/blog/${current.slug}?utm_source=tracker-hub&utm_medium=cta`}
            className="mt-6 inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 font-medium hover:bg-oxblood transition-colors"
          >
            Read the full {current.monthLabel} report &rarr;
          </Link>
        </section>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.25rem)] text-ink tracking-tight">Archive</h2>
        <ul className="mt-6 space-y-4 border-t border-ink/10">
          <li className="py-5 border-b border-ink/10">
            <Link
              to={`/blog/${current.slug}?utm_source=tracker-hub&utm_medium=archive`}
              className="font-display text-lg text-oxblood hover:text-ink underline underline-offset-2"
            >
              Toronto AI Citation Tracker: {current.monthLabel}
            </Link>
            <p className="mt-2 text-sm text-ink-600 leading-relaxed">{current.headline}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              Published {current.datePublished} · Edition 1 baseline
            </p>
          </li>
        </ul>

        <BlogGrowthCreditMidPromo />
        <BlogCheatSheetMidPromo />

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.25rem)] text-ink tracking-tight">What to do with this data</h2>
        <p className="mt-6 text-ink-700 leading-relaxed">
          The tracker shows who AI names today. Our{' '}
          <Link
            to="/blog/get-recommended-by-chatgpt-toronto?utm_source=tracker-hub&utm_medium=inline"
            className="text-oxblood underline underline-offset-2"
          >
            Toronto ChatGPT recommendation guide
          </Link>{' '}
          explains how to earn those citations — reviews, roundups, location clarity, and crawler-readable sites. Measure your
          site with the free{' '}
          <Link to="/aeo-checker?utm_source=tracker-hub&utm_medium=inline" className="text-oxblood underline underline-offset-2">
            AEO Readiness Checker
          </Link>
          , audit your{' '}
          <Link to="/gbp-audit?utm_source=tracker-hub&utm_medium=inline" className="text-oxblood underline underline-offset-2">
            Google Business Profile
          </Link>
          , or browse the{' '}
          <Link to="/free-tools?utm_source=tracker-hub&utm_medium=inline" className="text-oxblood underline underline-offset-2">
            free tools hub
          </Link>
          . For paid placement inside ChatGPT answers, see{' '}
          <Link
            to="/blog/chatgpt-ads-toronto-industries?utm_source=tracker-hub&utm_medium=inline"
            className="text-oxblood underline underline-offset-2"
          >
            who is buying ChatGPT ads in Toronto
          </Link>{' '}
          and the{' '}
          <Link
            to="/blog/chatgpt-ads-2026-guide?utm_source=tracker-hub&utm_medium=inline"
            className="text-oxblood underline underline-offset-2"
          >
            ChatGPT Ads setup guide
          </Link>
          .
        </p>
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
