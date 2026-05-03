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

/** Insectica Pest Control case study for the Stratezik blog (metrics from engagement exports). */
export default function InsecticaCaseStudyArticle() {
  return (
    <div className="max-w-[760px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        <a
          href="https://insecticapestcontrol.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          Insectica Pest Control Inc.
        </a>{' '}
        covers roughly a <strong className="text-ink font-medium">100&nbsp;km GTA radius</strong>. When we plugged in during early 2025 they already had a fresh consumer site,
        but distribution sat idle: no ads on record, organic graphs barely twitching. Eleven months later paid conversions crossed{' '}
        <strong className="text-ink font-medium">700</strong>, average CPL hovered near <strong className="text-ink font-medium">$43 CAD</strong> versus{' '}
        <strong className="text-ink font-medium">$80 to $120</strong> bracket chatter for pest search in Canada, and organic impressions jumped into five-digit months without us invoicing a standalone SEO retainer.
      </p>

      <section className="mt-12 p-6 md:p-8 bg-cream-50 border border-ink/10" aria-labelledby="tl-dr">
        <h2 id="tl-dr" className="font-display text-xl text-ink">
          Executive snapshot
        </h2>
        <ul className="mt-5 space-y-3 text-ink-700 leading-relaxed list-disc pl-5 marker:text-oxblood">
          <li>
            <strong className="text-ink">Feb&nbsp;2025 baseline:</strong> polished site, <strong>zero paid history</strong>, ~169 impressions that month, positions parked in the high fifties, handful of sessions.
          </li>
          <li>
            <strong className="text-ink">Launch posture:</strong> ten tightly themed Search ad groups (one per pest vertical) instead of a sloppy umbrella labeled pest control.
          </li>
          <li>
            <strong className="text-ink">Efficiency arc:</strong> CPL eased from ~<strong>$60</strong> in launch month to <strong>$33.38</strong> during August peak once Smart Bidding ate reliable phone plus form conversions.
          </li>
          <li>
            <strong className="text-ink">Organic lift:</strong> impressions climbed from triple digits to <strong>28,508</strong> in January&nbsp;2026 while average position drifted near <strong>15</strong> by April&nbsp;2026.
          </li>
          <li>
            <strong className="text-ink">Maps sprint:</strong> GBP slid from <strong>rank 60+</strong> territory into <strong>top five</strong> commercial intents within roughly four months. Numbers unpack inside our{' '}
            <Link to="/#portfolio" className="text-oxblood underline underline-offset-2">
              interactive case cards
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
          Figure 1. Three beats: quiet baseline, trained paid search, organic traction stacking on top. Pulled from Ads,
          Search Console, GA4 exports; layout sketched by Stratezik.
        </figcaption>
      </figure>

      <h2 className="mt-16 font-display text-display-3 text-ink">The client context</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Insectica runs full residential plus commercial coverage on bed bugs, rodents, wasps, ants, cockroaches, spiders, emergency visits included.
        Creative partners handed off a sharp storefront online; Stratezik inherited measurement gaps and blank paid tabs.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        GTA pest is bruising: entrenched reviews, messy directories, costly branded auctions. You survive by routing intent surgically, which matches how we think inside{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          paid plus organic programmes
        </Link>
        , not dumping everything inside one giant pest control Toronto keyword bucket.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 1 · Baseline (Feb to May&nbsp;2025)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Four months of showroom polish without foot traffic. Organic impressions averaged ~180 monthly, average positions floated ~57, sessions hovered ~75 to 80, paid conversions read zero because budgets stayed closed.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We burned that window on scaffolding: campaign skeletons, keyword maps per pest lane, radius fences aligned with trucks, conversion plumbing on{' '}
        <strong className="text-ink">calls and forms</strong>, starter negatives for DIY chemical hunts, hiring junk, out-of-ellipse geography.
      </p>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 2 · Paid launch &amp; learning (Jun to Sep&nbsp;2025)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        June flipped budgets on. Cold-start auctions behaved predictably: ~<strong>$60.46 CPL</strong> across <strong>17</strong> conversions off <strong>155</strong> clicks, basically tuition while bidding figured who books trucks versus browsers killing lunch on estimates.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        August cooled costs: <strong>96 conversions</strong>, <strong>$33.38 CPL</strong>, louder impressions, sessions ~<strong>1,346</strong>, Search Console finally flashing five-digit organic impressions as crawlers dug deeper into service URLs fueled by steady traffic.
      </p>

      <figure className="my-12 border border-ink/10 bg-white">
        <div className="p-4 md:p-8">
          <InsecticaPaidEfficiencyChart />
        </div>
        <figcaption className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 border-t border-ink/10">
          Figure 2. Paid spikes worth remembering: June tuition, August apex, April mature stretch.
        </figcaption>
      </figure>

      <h2 className="mt-14 font-display text-display-3 text-ink">Phase 3 · Scale &amp; authority (Oct&nbsp;2025 to Apr&nbsp;2026)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Once bids plateaued, compounding showed up in reach. CPA bands hugged mid-$40s during shoulder months while impression stacks jumped ~5.8k (October) toward ~18.8k (December), then punched{' '}
        <strong className="text-oxblood">28.5k</strong> organic impressions in January&nbsp;2026 while rankings marched teensward.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        April&nbsp;2026 logged the loudest paid impression month (<strong>24,345</strong>) alongside <strong>86 conversions</strong> near <strong>$41.89 CPL</strong>; organic averaged{' '}
        <strong>position&nbsp;15.3</strong>, roughly <strong>73%</strong> improvement versus Feb&nbsp;2025 baselines when measured against distance from position one.
      </p>

      <figure className="my-12 border border-ink/10 bg-white">
        <div className="p-4 md:p-8">
          <InsecticaOrganicImpressionsChart />
        </div>
        <figcaption className="px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 border-t border-ink/10">
          Figure 3. Organic impressions snapshot (subset of months). Full ledger sits below.
        </figcaption>
      </figure>

      <h3 className="mt-12 font-display text-2xl text-ink">Organic visibility · month-by-month</h3>
      <p className="mt-4 text-ink-700 leading-relaxed text-sm">
        Rows compress Search Console pulls across the engagement (rounded for readability). Pair impressions with positions instead of treating either metric like vanity jewellery.
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
              b: 'Ten tightly themed groups forced creatives plus landing paths to match explicit pest intent, which kept Quality Score components honest instead of blending mismatched queries under one label.',
            },
            {
              Icon: CircleSlash,
              t: 'Aggressive negatives',
              b: 'Weekly query sweeps culled DIY chemical hunts, hiring spam, competitor brands, and GTA outsiders so dollars chased dispatch-ready searches.',
            },
            {
              Icon: CircleDollarSign,
              t: 'CPA-first bidding',
              b: 'Target CPA hovered near $45 CAD from day one. Matching conversion values on qualified calls plus forms gave Smart Bidding honest signals toward revenue-ready leads.',
            },
            {
              Icon: MapPinned,
              t: 'Geo fidelity',
              b: 'Radii mirrored dispatch reality while bid tweaks leaned into dense cores (Toronto island, Mississauga strips, Brampton corridors) where trucks stayed profitable.',
            },
            {
              Icon: LayoutDashboard,
              t: 'Operations intelligence',
              b: 'Internal dashboards surfaced CPA drift, auction spikes, and Quality Score dips faster than waiting on monthly slide decks.',
            },
            {
              Icon: Sprout,
              t: 'Organic byproduct',
              b: 'Paid visits handed crawl justification plus behavioral logs; structured service copy finished the job so impressions multiplied (~168x peak versus trough) without billing a separate SEO sprint.',
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
                body: 'Audits, measurement rewires, keyword maps per pest lane, starter negatives, queued launches.',
              },
              {
                Icon: Rocket,
                title: 'June 2025',
                body: 'Campaigns live; noisy CPL while bidding studied who books trucks; sessions climbed versus winter slumps.',
              },
              {
                Icon: Flame,
                title: 'August 2025',
                body: 'Peak-season torque: CPL near $33 with roughly one hundred conversions logged.',
              },
              {
                Icon: CalendarRange,
                title: 'October through December 2025',
                body: 'Shoulder-season CPA steadiness while organic curves steepened toward nineteen thousand impressions in December.',
              },
              {
                Icon: Sparkles,
                title: 'January 2026',
                body: 'Organic crest at 28,508 impressions; proof stacked atop paid signals.',
              },
              {
                Icon: Trophy,
                title: 'April 2026',
                body: 'Paid impressions peaked again with eighty-six conversions; organic averages hovered mid-teens positionally.',
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
        Charts stay vector so PDF exports stay crisp. Raw dashboards stay offline under NDA. What lands publicly mirrors{' '}
        <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
          answer-engine friendly formatting
        </Link>{' '}
        plus{' '}
        <a
          href="https://developers.google.com/search/docs/appearance/ai-overviews-and-your-website"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          Google&apos;s AI Overview guidance
        </a>
        : blunt headings, discrete facts, cited methodologies.
      </p>

      <aside className="mt-12 p-6 border-l-4 border-oxblood bg-cream-50 text-sm text-ink-700 leading-relaxed">
        <strong className="text-ink font-display text-base">Transparency note:</strong> Figures mirror Ads, Search Console, and GA4 pulls tied to the engagement.
        We skip publishing account IDs in articles; serious prospects vet specifics during a{' '}
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
          Bring us an aggressive local-services mandate and we pair{' '}
          <Link to="/#portfolio" className="text-gold hover:text-cream underline">
            paid precision
          </Link>{' '}
          with listings hygiene plus honest creative so you rent fewer leads long term.
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
