import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  CalendarRange,
  CircleDollarSign,
  CircleSlash,
  ClipboardList,
  Flame,
  LayoutDashboard,
  LayoutGrid,
  MapPinned,
  Rocket,
  Sparkles,
  Sprout,
  Trophy,
} from 'lucide-react'
import { InsecticaJourneyInfographic, InsecticaOrganicImpressionsChart, InsecticaPaidEfficiencyChart } from './insectica/InsecticaBlogFigures'

/**
 * Long-form case study: Insectica Pest Control (Toronto / GTA).
 * Narrative and metrics trace the supplied PDF / internal engagement record; account identifiers are omitted here.
 */
export default function InsecticaCaseStudyArticle() {
  return (
    <div className="max-w-[760px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        This is the full story of how{' '}
        <a
          href="https://insecticapestcontrol.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Insectica Pest Control Inc.
        </a>
        , a Toronto-area operator serving roughly a{' '}
        <strong className="text-ink font-medium">100&nbsp;km GTA radius</strong>, went from a polished but invisible
        website to a predictable acquisition engine:{' '}
        <strong className="text-ink font-medium">700+ measured paid conversions across eleven months</strong>, an{' '}
        <strong className="text-ink font-medium">average cost per lead near $43 CAD</strong> against an{' '}
        <strong className="text-ink font-medium">$80–120 industry bracket</strong>, and{' '}
        <strong className="text-ink font-medium">organic impressions that climbed into the tens of thousands per month</strong>{' '}
        without commissioning a separate SEO retainer.
      </p>

      <section className="mt-12 p-6 md:p-8 bg-cream-50 border border-ink/10" aria-labelledby="tl-dr">
        <h2 id="tl-dr" className="font-display text-xl text-ink">
          Executive snapshot
        </h2>
        <ul className="mt-5 space-y-3 text-ink-700 leading-relaxed list-disc pl-5 marker:text-oxblood">
          <li>
            <strong className="text-ink">Starting point (Feb&nbsp;2025):</strong> site live,{' '}
            <strong>no paid history</strong>, organic footprint essentially dormant (~169 impressions that month, average
            position in the high 50s, handful of sessions).
          </li>
          <li>
            <strong className="text-ink">Launch move:</strong> Google Ads structured as{' '}
            <strong>ten hyper-targeted Search ad groups</strong> — one per pest category — instead of a vague
            catch-all.
          </li>
          <li>
            <strong className="text-ink">Efficiency:</strong> CPL fell from roughly <strong>$60</strong> in the first
            paid month to <strong>$33.38</strong> in August (peak season) as Smart Bidding received clean conversion
            signal from calls + forms.
          </li>
          <li>
            <strong className="text-ink">Organic compounding:</strong> impressions rose from triple digits into{' '}
            <strong>28,508</strong> in January&nbsp;2026; average position improved toward <strong>15</strong> by
            April&nbsp;2026.
          </li>
          <li>
            <strong className="text-ink">Parallel local win:</strong> Google Business Profile moved from{' '}
            <strong>rank 60+</strong> territory into the <strong>top five</strong> for priority commercial intents in
            about <strong>four months</strong> — detailed in our{' '}
            <Link to="/#portfolio" className="text-oxblood underline underline-offset-2">
              interactive case study
            </Link>
            .
          </li>
        </ul>
      </section>

      <figure className="my-14 border border-ink/10 bg-cream-50 shadow-sm overflow-hidden">
        <div className="p-3 md:p-5 bg-cream">
          <InsecticaJourneyInfographic />
        </div>
        <figcaption className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 leading-relaxed border-t border-ink/10">
          Figure 1 — Infographic: three phases from baseline → trained paid search → organic compounding. Figures derive
          from engagement reporting (Google Ads, Search Console, GA4); illustrative layout by Stratezik.
        </figcaption>
      </figure>

      <h2 className="mt-16 font-display text-display-3 text-ink">The client context</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Insectica is not a hobby blog — it is a full-service pest operator covering residential and commercial demand
        across bed bugs, rodents, wasps, ants, cockroaches, spiders, and adjacent urgent calls. When Stratezik engaged in{' '}
        <strong className="text-ink">early&nbsp;2025</strong>, creative and dev partners had already shipped a fresh
        consumer-facing site. What was missing was{' '}
        <strong className="text-ink">distribution</strong>: zero historical ads, almost no organic equity, and no
        instrumentation rhythm tying leadership decisions to measurable pipeline.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        GTA pest control is a bloodsport — incumbents hoard reviews, directories syndicate duplicates, and branded
        searches are expensive. Winning requires{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          surgical intent routing
        </Link>
        , not a giant keyword dump labeled &ldquo;pest control Toronto.&rdquo;
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 1 · Baseline (Feb–May&nbsp;2025)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        For four months the property behaved like many launches: beautiful pages, almost no qualified discovery. Average
        organic impressions hovered near <strong>180/month</strong>, average rank sat around{' '}
        <strong>position&nbsp;57</strong>, sessions tracked in the <strong>~75–80</strong> band, and{' '}
        <strong>paid conversions read zero</strong> because nothing was live.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Stratezik used that window for forensic groundwork — campaign scaffolding, keyword modelling per pest vertical,
        geo fencing to the true dispatch radius, conversion plumbing for{' '}
        <strong className="text-ink">calls and forms</strong>, and negative-keyword seeds aimed at DIY chemical buyers,
        job seekers, and neighbours outside the service ellipse.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 2 · Paid launch &amp; learning (Jun–Sep&nbsp;2025)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        June flipped the switch. Initial auction prices were predictable for a cold account: roughly{' '}
        <strong>$60.46 CPL</strong> on <strong>17</strong> conversions from <strong>155</strong> clicks — acceptable tuition
        while Smart Bidding learned who actually books a truck roll versus who is price-checking on lunch break.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        By August the structure matured: <strong>96 conversions</strong>,{' '}
        <strong>$33.38 CPL</strong>, strong impression volume, sessions near <strong>1,346</strong>, and Search Console
        beginning to show{' '}
        <strong className="text-ink">five-digit organic impressions</strong> as Google crawled deeper into service pages
        fed by consistent paid engagement.
      </p>

      <figure className="my-12 border border-ink/10 bg-white">
        <div className="p-4 md:p-8">
          <InsecticaPaidEfficiencyChart />
        </div>
        <figcaption className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 border-t border-ink/10">
          Figure 2 — Illustrative paid peaks: launch learning (Jun), seasonal apex (Aug), mature efficiency (Apr&nbsp;2026).
        </figcaption>
      </figure>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 3 · Scale &amp; authority (Oct&nbsp;2025–Apr&nbsp;2026)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        After bidding stabilised, the story becomes compounding reach:{' '}
        <strong className="text-ink">steady CPA bands</strong> in the mid-$40s during shoulder months,{' '}
        <strong className="text-ink">organic impression stacks</strong> jumping from ~5.8k (October) to nearly{' '}
        <strong>18.8k</strong> by December, then breaking through to{' '}
        <strong className="text-oxblood">28.5k impressions in January&nbsp;2026</strong> while average rank marched into
        the mid-teens.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        April&nbsp;2026 delivered the strongest paid impression month on record (<strong>24,345</strong>) with{' '}
        <strong>86 conversions</strong> at roughly <strong>$41.89 CPL</strong>, while organic averaged{' '}
        <strong>position&nbsp;15.3</strong> — up roughly <strong>73%</strong> versus the February&nbsp;2025 baseline when
        interpreted as distance from position&nbsp;1.
      </p>

      <figure className="my-12 border border-ink/10 bg-white">
        <div className="p-4 md:p-8">
          <InsecticaOrganicImpressionsChart />
        </div>
        <figcaption className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 border-t border-ink/10">
          Figure 3 — Organic impressions snapshot (selected months). Full month-by-month table below.
        </figcaption>
      </figure>

      <h3 className="mt-12 font-display text-2xl text-ink">Organic visibility · month-by-month</h3>
      <p className="mt-4 text-ink-700 leading-relaxed text-sm">
        The table condenses Search Console exports across the engagement window (rounded for readability). It shows how
        impressions and rank moved <em>together</em> — not as vanity KPIs but as proof that improved structure plus
        sustained demand capture reshaped how Google interpreted the domain.
      </p>
      <div className="mt-6 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
              <th className="px-3 py-3">Month</th>
              <th className="px-3 py-3">Organic impr.</th>
              <th className="px-3 py-3">Clicks</th>
              <th className="px-3 py-3">CTR</th>
              <th className="px-3 py-3">Avg pos.</th>
            </tr>
          </thead>
          <tbody className="text-ink-700">
            {[
              ["Feb '25 (start)", '169', '8', '4.73%', '57.4'],
              ['Mar', '204', '12', '5.88%', '64.2'],
              ['Apr', '207', '13', '6.28%', '47.0'],
              ['May', '145', '11', '7.59%', '30.0'],
              ['Jun (ads live)', '320', '7', '2.19%', '18.1'],
              ['Jul', '1,940', '33', '1.70%', '35.6'],
              ['Aug', '9,995', '28', '0.28%', '58.8'],
              ['Sep', '7,256', '38', '0.52%', '52.0'],
              ['Oct', '5,756', '29', '0.50%', '45.2'],
              ['Nov', '8,159', '70', '0.86%', '34.0'],
              ['Dec', '18,755', '93', '0.50%', '24.3'],
              ["Jan '26 (peak)", '28,508', '155', '0.54%', '19.3'],
              ['Feb', '17,007', '77', '0.45%', '20.7'],
              ['Mar', '17,777', '79', '0.44%', '18.4'],
              ["Apr '26", '18,575', '140', '0.75%', '15.3'],
            ].map(([a, b, c, d, e]) => (
              <tr key={String(a)} className="border-t border-ink/10 odd:bg-cream-50/80">
                <td className="px-3 py-2 font-mono text-[11px]">{a}</td>
                <td className="px-3 py-2 tabular-nums">{b}</td>
                <td className="px-3 py-2 tabular-nums">{c}</td>
                <td className="px-3 py-2">{d}</td>
                <td className="px-3 py-2 tabular-nums">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">What we executed differently</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {(
          [
            {
              Icon: LayoutGrid,
              t: 'Granular ad groups',
              b: 'Ten themed groups matched creative and landing experience to explicit pest intent — lifting Quality Score components instead of blending mismatched queries.',
            },
            {
              Icon: CircleSlash,
              t: 'Aggressive negatives',
              b: 'Weekly query mining culled DIY supplies, hiring keywords, competitors’ brands, and out-of-geo noise so budget flowed to dispatch-ready searches.',
            },
            {
              Icon: CircleDollarSign,
              t: 'CPA-first bidding',
              b: 'Target CPA anchored near $45 CAD — below launch pain — with identical conversion values on qualified calls and forms so the algorithm optimised toward revenue-ready leads.',
            },
            {
              Icon: MapPinned,
              t: 'Geo fidelity',
              b: 'Campaign geography mirrored the real truck routes; bids tilted toward dense boroughs (Toronto core, Mississauga, Brampton) where response times stay profitable.',
            },
            {
              Icon: LayoutDashboard,
              t: 'Operations intelligence',
              b: 'Stratezik’s live Ads intelligence surface flagged CPA drift, auction pressure, and Quality Score erosion faster than monthly slide decks ever could.',
            },
            {
              Icon: Sprout,
              t: 'Organic byproduct',
              b: 'Paid traffic supplied engagement logs that justified crawl priority; structured service copy did the rest — lifting impressions ~168× peak-to-trough without a standalone SEO invoice.',
            },
          ] satisfies { Icon: LucideIcon; t: string; b: string }[]
        ).map(({ Icon, t, b }) => (
          <div
            key={t}
            className="border border-ink/10 bg-white p-5 md:p-6 flex gap-4 md:gap-5 shadow-sm hover:border-ink/20 transition-colors"
          >
            <div
              className="shrink-0 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-lg border border-ink/10 bg-cream-50 text-oxblood"
              aria-hidden
            >
              <Icon size={22} strokeWidth={1.65} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg text-ink leading-snug">{t}</h3>
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">{b}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">Scorecard · before vs after</h2>
      <div className="mt-6 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm min-w-[520px]">
          <thead className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
            <tr>
              <th className="text-left px-3 py-3">Metric</th>
              <th className="text-left px-3 py-3">Before</th>
              <th className="text-left px-3 py-3">After (Apr&nbsp;2026)</th>
              <th className="text-left px-3 py-3">Note</th>
            </tr>
          </thead>
          <tbody className="text-ink-700">
            {[
              ['Monthly ad conversions', '0', '86', 'Paid programme mature'],
              ['Cost per lead', 'N/A', '~$41.89', 'Under $45 target'],
              ['Paid impressions / mo', '0', '24,345', 'Record month'],
              ['Organic impressions / mo', '~181 avg', '18,575', 'Summarised April snapshot'],
              ['Avg organic position', '57.4', '15.3', 'Search Console'],
              ['Monthly sessions', '~80', '1,456', 'GA4'],
              ['GA4 conversions / mo', '0', '142', 'Calls + forms'],
              ['Organic clicks / mo', '~11', '140', 'Search Console'],
            ].map(([m, b, a, n]) => (
              <tr key={String(m)} className="border-t border-ink/10">
                <td className="px-3 py-2 font-medium text-ink">{m}</td>
                <td className="px-3 py-2">{b}</td>
                <td className="px-3 py-2">{a}</td>
                <td className="px-3 py-2 text-ink-600">{n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">Timeline beats</h2>
      <div className="relative mt-10">
        <div
          className="pointer-events-none absolute left-[21px] top-4 bottom-10 w-px bg-gradient-to-b from-oxblood/45 via-ink/12 to-gold/35 md:left-[25px]"
          aria-hidden
        />
        <ul className="list-none pl-0">
        {(
          [
            {
              Icon: ClipboardList,
              title: 'February 2025',
              body: 'Audit, measurement wiring, keyword maps for each pest vertical, negatives drafted, launch queue built.',
            },
            {
              Icon: Rocket,
              title: 'June 2025',
              body: 'Ads live; learning-phase CPL with early conversion volume; sessions stepped up materially versus winter baseline.',
            },
            {
              Icon: Flame,
              title: 'August 2025',
              body: 'Seasonal apex proves efficiency — CPL near $33 with almost 100 conversions.',
            },
            {
              Icon: CalendarRange,
              title: 'October – December 2025',
              body: 'Shoulder-season stability while organic curves steepen; December impressions approach 19k.',
            },
            {
              Icon: Sparkles,
              title: 'January 2026',
              body: 'Organic spike (28,508 impressions) validates authority layering on top of paid proof points.',
            },
            {
              Icon: Trophy,
              title: 'April 2026',
              body: 'Paid + organic jointly reinforce dominance — strong impression month, 86 conversions, rank consolidation near mid-page-one averages.',
            },
          ] satisfies { Icon: LucideIcon; title: string; body: string }[]
        ).map(({ Icon, title, body }) => (
          <li key={title} className="relative flex gap-4 pb-10 md:gap-5 md:pb-12 last:pb-2">
            <div className="relative z-10 shrink-0 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-cream bg-ink text-cream shadow-md ring-4 ring-cream">
              <Icon size={20} strokeWidth={1.65} aria-hidden />
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="font-display text-lg md:text-xl text-ink tracking-tight">{title}</p>
              <p className="mt-2 text-ink-700 leading-relaxed">{body}</p>
            </div>
          </li>
        ))}
        </ul>
      </div>

      <h2 className="mt-14 font-display text-display-3 text-ink">Picture the operating cadence</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Figures in this article are vector diagrams so they stay sharp on retina displays and in print-friendly PDF
        exports. For photography-style evidence (dashboard screenshots, Search Console graphs, Ads UI captures),
        leadership receives raw workbook exports under NDA — what you see here is the{' '}
        <strong className="text-ink">public-facing narrative layer</strong> suitable for{' '}
        <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
          AEO-oriented discovery
        </Link>{' '}
        and{' '}
        <a
          href="https://developers.google.com/search/docs/appearance/ai-overviews"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          AI-summary-friendly formatting
        </a>{' '}
        (clear headings, discrete facts, cited methodologies).
      </p>

      <aside className="mt-12 p-6 border-l-4 border-oxblood bg-cream-50 text-sm text-ink-700 leading-relaxed">
        <strong className="text-ink font-display text-base">Transparency note:</strong> Numbers cited match Google Ads,
        Google Search Console, and GA4 exports prepared for the engagement. For confidentiality we do{' '}
        <strong>not</strong> publish account IDs in blog form; verification is available to qualified prospects during a{' '}
        <Link to="/#contact" className="text-oxblood underline">
          live consult
        </Link>
        .
      </aside>

      <div className="mt-16 p-8 md:p-10 bg-ink text-cream border border-ink/10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold/90">Next engagement</p>
        <h2 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-snug">
          Want the same discipline on your P&amp;L?
        </h2>
        <p className="mt-5 text-cream/85 leading-relaxed">
          Bring Stratezik an aggressive local-services mandate — we will pair{' '}
          <Link to="/#portfolio" className="text-gold hover:text-cream underline">
            paid precision
          </Link>{' '}
          with listing hygiene and creative clarity so you are not renting leads forever.
        </p>
        <Link
          to="/#contact"
          className="mt-8 inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-gold transition-colors"
        >
          Book a consultation
          <span aria-hidden className="font-mono">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  )
}
