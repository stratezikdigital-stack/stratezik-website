import { Link } from 'react-router-dom'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import {
  ResearchAnswerAside,
  ResearchArticleRoot,
  ResearchDataTable,
  ResearchExecutiveSummary,
  ResearchFindingHeading,
  ResearchHeroStats,
  ResearchProse,
  ResearchPullQuote,
  ResearchSummaryItem,
  ResearchWide,
} from './BlogResearchLayout'
import { ChatGptAdsTorontoLiveSelector } from './ChatGptAdsTorontoLiveSelector'
import { chatgptAdsTorontoIndustriesFaq } from './postFaqs'

const SLUG = 'chatgpt-ads-toronto-industries'

const REF = {
  adsOpenAi: 'https://ads.openai.com',
  adsBasics: 'https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics',
  testingAds: 'https://openai.com/index/testing-ads-in-chatgpt/',
}

const INDUSTRY_AD_ROWS: [string, string, string][] = [
  ['B2B SaaS', '5 / 5', 'Saturated'],
  ['Travel', '5 / 5', 'Saturated'],
  ['Finance', '5 / 5', 'Saturated'],
  ['Education', '4 / 5', 'Competitive'],
  ['Real estate', '4 / 5', 'Competitive'],
  ['E-commerce', '3 / 5', 'Filling'],
  ['Legal & professional', '3 / 5', 'Filling'],
  ['Home services', '3 / 5', 'Filling'],
  ['HVAC', '3 / 5', 'Filling'],
  ['Beauty', '2 / 5', 'Open'],
  ['Veterinary', '2 / 5', 'Open'],
  ['Dental', '1 / 5', 'Wide open'],
  ['Optometry', '1 / 5', 'Wide open'],
  ['Auto repair', '1 / 5', 'Wide open'],
  ['Movers', '1 / 5', 'Wide open'],
  ['Fitness', '0 / 5', 'Greenfield'],
  ['Pest control', '0 / 5', 'Greenfield'],
  ['Electricians', '0 / 5', 'Greenfield'],
]

const prose = 'mt-6 text-ink-700 leading-relaxed'

export default function ChatGPTAdsTorontoIndustriesArticle() {
  return (
    <ResearchArticleRoot>
      <ResearchWide className="mb-10 md:mb-14">
        <ResearchHeroStats
          stats={[
            { value: '48%', label: 'Queries with a live ad', detail: '43 of 90 GTA buying questions' },
            { value: '1', label: 'Local business in-category', detail: 'Out of 43 observed ad placements' },
            { value: '3', label: 'Greenfield categories', detail: 'Zero ads across all 15 queries' },
            { value: '10×', label: 'Cheaper clicks vs Google', detail: 'Our campaigns, June 2026 benchmarks' },
          ]}
        />
      </ResearchWide>

      <ResearchProse>
        <p className="lead text-lg text-ink-700 leading-relaxed">
          We asked ChatGPT 90 of the exact questions Toronto buyers ask before they spend money: &ldquo;best dentist in
          Scarborough,&rdquo; &ldquo;reliable plumber in downtown Toronto,&rdquo; &ldquo;best CRM for a Toronto
          startup.&rdquo; Ads already appeared on <strong className="text-ink">43 of the 90 (48%)</strong>. This is not a
          future channel. It is live in your market today.
        </p>
      </ResearchProse>

      <ResearchWide className="mt-8">
        <ResearchExecutiveSummary>
          <ResearchSummaryItem>
            Across those ads we counted <strong className="text-ink">33 different advertisers</strong>, and exactly{' '}
            <strong className="text-ink">one was a local business</strong> advertising in the category the buyer was
            searching. We watched <strong className="text-ink">Lyft</strong> run ads against Botox, eye exams, and movers
            in Scarborough.
          </ResearchSummaryItem>
          <ResearchSummaryItem>
            <strong className="text-ink">Three categories showed zero ads:</strong> fitness, pest control, and electricians.
            High intent, real local demand, nobody buying the slot.
          </ResearchSummaryItem>
          <ResearchSummaryItem>
            <strong className="text-ink">Three categories are saturated</strong> (an ad on every query): B2B SaaS, travel,
            and finance, dominated by national and global brands, not local competitors.
          </ResearchSummaryItem>
          <ResearchSummaryItem>
            Our campaigns run a <strong className="text-ink">$35 CPM against a $250 Google Search comparison</strong>, with
            click-through 46% higher, roughly <strong className="text-ink">10x cheaper clicks</strong>. The auction is
            uncrowded because local businesses have not shown up yet.
          </ResearchSummaryItem>
        </ResearchExecutiveSummary>
      </ResearchWide>

      <ResearchProse className="mt-10">
        <ResearchAnswerAside id="chatgpt-ads-toronto-feat" question={chatgptAdsTorontoIndustriesFaq[0].question}>
          <p>{chatgptAdsTorontoIndustriesFaq[0].answer}</p>
          <p className="mt-4 text-sm text-ink-600 leading-relaxed">
            For platform mechanics (context hints, account setup, category gates), see our{' '}
            <Link to="/blog/chatgpt-ads-2026-guide" className="text-oxblood underline underline-offset-2">
              ChatGPT Ads 2026 guide
            </Link>
            . For organic citations without buying placements, see the{' '}
            <Link to="/blog/get-recommended-by-chatgpt-playbook" className="text-oxblood underline underline-offset-2">
              ChatGPT recommendation playbook
            </Link>
            .
          </p>
        </ResearchAnswerAside>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
          Why we ran this
        </h2>
        <p className={prose}>
          Every agency post about ChatGPT Ads says the same thing: &ldquo;it&apos;s early, it&apos;s cheap, get in.&rdquo;
          None of them show you what is actually happening inside the answers your customers see. So we checked.
        </p>
        <p className={prose}>
          We wrote 90 high-intent buying questions a real GTA customer would type, across 18 industries. Then we ran the
          identical set through two AI engines and recorded, for every answer: did it name a specific business, did it name a
          Toronto or GTA business, and crucially,{' '}
          <strong className="text-ink">did a sponsored ad appear, and who paid for it.</strong>
        </p>
        <p className={prose}>
          An ad shows up as a sponsored card directly below the answer, at the exact moment someone has finished asking how to
          solve their problem. Right now, in Toronto, the answer is almost always neither you nor your direct competitor.
        </p>

        <BlogCheatSheetMidPromo />
      </ResearchProse>

      <ResearchProse>
        <ResearchFindingHeading
          number={1}
          title="Ads are already live on half of Toronto's buying questions"
        />
        <p className={prose}>
          Of 90 high-intent local queries, <strong className="text-ink">43 returned a live sponsored ad in ChatGPT (48%)</strong>.
          Not a test. Not &ldquo;coming soon.&rdquo; Nearly every second buying question a Toronto customer asks already has a
          paid placement under the answer.
        </p>
      </ResearchProse>

      <ResearchWide>
        <ResearchDataTable caption="Table 1. Live ad presence by industry, sorted saturated to greenfield. Five purchase-stage queries per industry.">
          <table className="w-full min-w-[520px] border-collapse text-sm text-left">
            <thead>
              <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
                <th className="px-4 py-3.5">Industry</th>
                <th className="px-4 py-3.5">Queries with a live ad</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 text-ink-700">
              {INDUSTRY_AD_ROWS.map(([industry, count, status]) => (
                <tr key={industry} className="bg-cream hover:bg-cream-50/80 transition-colors">
                  <td className="px-4 py-3 align-top">{industry}</td>
                  <td className="px-4 py-3 align-top font-medium text-ink tabular-nums">{count}</td>
                  <td className="px-4 py-3 align-top font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
                    {status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResearchDataTable>
      </ResearchWide>

      <ResearchProse>
        <p className={prose}>
          The lesson in one line: categories where money is already moving (SaaS, travel, finance) are commodity-bid contests
          dominated by big brands. Categories where a local business could own the surface for pennies (fitness, pest control,
          electrical, dental, optometry, auto, movers) are nearly empty.
        </p>

        <ResearchFindingHeading
          number={2}
          title="The advertisers are almost never the local business, and sometimes they are Lyft"
        />
        <p className={prose}>
          Across 90 queries and 43 ads, we counted 33 distinct advertisers, sorted by what they actually were relative to the
          question being asked:
        </p>
      </ResearchProse>

      <ResearchWide>
        <ResearchDataTable caption="Table 2. Who held the ad slot when a sponsored placement appeared. Only one row is a local business in its own category.">
          <table className="w-full min-w-[480px] border-collapse text-sm text-left">
            <thead>
              <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
                <th className="px-4 py-3.5">Who showed up in the ad slot</th>
                <th className="px-4 py-3.5">Share of ads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 text-ink-700">
              {[
                ['National brands (RBC, TD Insurance, IHG, Choice Hotels, Air Transat, LG, Belairdirect, Intact)', '16 of 43'],
                ['Global software (Monday.com, Jotform, Canva, Wix, HiBob, ApprovalMax, ManageEngine, Fivetran)', '11 of 43'],
                ['Product manufacturers (Merrell, Polar Bed, Metro Dentifrice, eManuals, Diamond Pet)', '6 of 43'],
                ['Adjacent local players (Skin Vitality, seoplus+, GWC Insulation)', '6 of 43'],
                ['Opportunists, unrelated to the query (Lyft)', '3 of 43'],
                ['The actual local business in the category searched', '1 of 43'],
              ].map(([who, share]) => (
                <tr
                  key={who}
                  className={`bg-cream ${who.includes('actual local') ? 'bg-oxblood-50/40' : 'hover:bg-cream-50/80'} transition-colors`}
                >
                  <td className={`px-4 py-3 align-top ${who.includes('actual local') ? 'font-medium text-ink' : ''}`}>
                    {who}
                  </td>
                  <td className={`px-4 py-3 align-top tabular-nums ${who.includes('actual local') ? 'font-medium text-ink' : ''}`}>
                    {share}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ResearchDataTable>
      </ResearchWide>

      <ResearchProse>
        <p className={prose}>
          Read that last row again. In 90 high-intent local buying questions, we found{' '}
          <strong className="text-ink">exactly one</strong> business advertising in its own category: Turnbull Real Estate,
          on a query about selling a Scarborough condo.
        </p>
        <ul className="mt-4 space-y-3 text-ink-700 leading-relaxed list-disc pl-5 marker:text-oxblood/70">
          <li>
            <strong className="text-ink">Lyft</strong> ran against Botox near North York, eye exams downtown, and movers in
            Scarborough.
          </li>
          <li>
            <strong className="text-ink">RBC and TD Insurance</strong> owned nearly the entire finance category; RBC even
            appeared on first-time home purchase lawyer queries.
          </li>
          <li>
            <strong className="text-ink">Jotform</strong> advertised on small business lawyer, basement renovation, and
            roofing contractor queries.
          </li>
          <li>
            <strong className="text-ink">Diamond Pet</strong>, <strong className="text-ink">Metro Dentifrice</strong>, and{' '}
            <strong className="text-ink">LG</strong> showed up on vet, teeth whitening, and HVAC searches while service
            businesses sat out.
          </li>
        </ul>

        <ResearchPullQuote attribution="Finding 02 · Advertiser mix">
          The local business your customer is actually trying to find is missing from its own moment.
        </ResearchPullQuote>

        <ResearchFindingHeading number={3} title="Three categories are completely empty" />
        <p className={prose}>
          Fitness, pest control, and electricians returned{' '}
          <strong className="text-ink">zero ads across all 15 of their queries.</strong> ChatGPT still named real local
          businesses in every answer, which proves the commercial surface is there. There is simply no ad on it.
        </p>

        <ResearchFindingHeading
          number={4}
          title={'The "saturated" categories are saturated by outsiders, not locals'}
        />
        <p className={prose}>
          B2B SaaS, travel, and finance showed an ad on every single query, but from Monday.com, IHG, RBC, TD, Air Transat,
          and Choice Hotels.{' '}
          <strong className="text-ink">
            We did not see a single local Toronto SaaS company, boutique travel agency, or independent financial advisor in
            the ad slot.
          </strong>{' '}
          A tight, local, exact-intent ad can still win at a discount because big advertisers are not optimizing for it.
        </p>

        <ResearchFindingHeading number={5} title="Being recommended is not the same as being in control" />
        <p className={prose}>
          We ran the same 90 questions through Claude with live web search. Both engines named a Toronto or GTA business
          about <strong className="text-ink">9 times out of 10</strong>, but almost never the same businesses, and lists
          shifted between runs. The ad slot is the one part of the AI answer you can buy, aim, and own. Everything above it is
          a recommendation you are hoping for.
        </p>
      </ResearchProse>

      <ResearchWide className="my-12 md:my-16">
        <ResearchProse className="mb-6">
          <h2 className="font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
            The Toronto opportunity map
          </h2>
          <p className="mt-4 text-ink-700 leading-relaxed">
            Pick your category to see who is buying the slot today, why the window is open, and your first move. Deep-link
            with <span className="font-mono text-sm text-ink-600">?industry=pestcontrol</span> to share a vertical.
          </p>
        </ResearchProse>
        <ChatGptAdsTorontoLiveSelector />
      </ResearchWide>

      <ResearchProse>
        <p className={prose}>
          <strong className="text-ink">Greenfield play</strong> (fitness, pest control, electricians, dental, optometry,
          auto, movers): be the only paid voice under the question before a competitor notices.
        </p>
        <p className={prose}>
          <strong className="text-ink">Jump-the-queue play</strong> (beauty, home services, HVAC, legal, real estate): ads
          exist but thinly, mostly from adjacent brands and opportunists, not your direct rivals.
        </p>
        <p className={prose}>
          <strong className="text-ink">Challenger play</strong> (B2B SaaS, travel, finance, education): out-specific national
          brands with tight, locally exact context hints. You will not outbid RBC. You can out-specific them.
        </p>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
          Why Toronto businesses have a real edge right now
        </h2>
        <ol className="mt-6 space-y-4 text-ink-700 leading-relaxed list-decimal pl-5 marker:font-mono marker:text-oxblood">
          <li>
            <strong className="text-ink">Canada is live.</strong> ChatGPT Ads run in the US, Canada, Australia, and New
            Zealand. You are early inside one of only four launch markets.
          </li>
          <li>
            <strong className="text-ink">It is cheaper than the Toronto Google auction.</strong> Roughly 10x cheaper clicks
            once higher CTR is factored in.
          </li>
          <li>
            <strong className="text-ink">The local seats are empty.</strong> Your direct competitors are almost entirely
            absent from the ad slot. That window closes first.
          </li>
        </ol>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
          One honest caveat: health-adjacent categories
        </h2>
        <p className={prose}>
          Dental, optometry, and veterinary are health-adjacent. ChatGPT restricts ads near sensitive health topics. Verify ad
          eligibility in Ads Manager for your specific service before you build a campaign.
        </p>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
          Methodology and limitations
        </h2>
        <p className={prose}>
          We tested 90 high-intent buying questions across 18 GTA industries (five each), mirroring how Toronto, Scarborough,
          North York, or Mississauga customers phrase purchase-stage queries.
        </p>
        <p className={prose}>
          <strong className="text-ink">Two engines:</strong> Claude with live web search (automated) and ChatGPT free tier
          (manual, June 19, 2026). Advertiser observations are founder-logged ChatGPT results.
        </p>
        <p className={prose}>
          <strong className="text-ink">Limitations:</strong> snapshot, not a census. Ad delivery rotates by user and tier. We
          will re-run quarterly and report what changes.
        </p>

        <h2 className="mt-16 font-display text-[clamp(1.65rem,4vw,2.5rem)] text-ink leading-tight tracking-[-0.03em]">
          Stop renting your customer&apos;s attention to Lyft
        </h2>
        <p className={prose}>
          The highest-intent advertising surface in your market is live, it is cheap, and the businesses that should own it
          are not there. That combination does not last.
        </p>
        <p className={prose}>
          <Link
            to={`/chatgpt-ads-cheat-sheet?utm_source=blog-${SLUG}&utm_medium=inline`}
            className="text-oxblood underline underline-offset-2 font-medium"
          >
            Get the ChatGPT Ads Cheat Sheet
          </Link>{' '}
          or talk to us via{' '}
          <Link to="/services/paid-search" className="text-oxblood underline underline-offset-2">
            paid search and media services
          </Link>{' '}
          or the <BlogStratezikContactLink>contact form</BlogStratezikContactLink>.
        </p>

        <BlogAuthorSignoff />

        <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-ads-toronto-faq-heading">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">FAQ</p>
          <h2 id="chatgpt-ads-toronto-faq-heading" className="mt-2 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-8">
            {chatgptAdsTorontoIndustriesFaq.slice(1).map((item) => (
              <div key={item.question} className="border-l-2 border-ink/10 pl-5">
                <dt className="font-display text-lg text-ink leading-snug">{item.question}</dt>
                <dd className="mt-2 text-ink-700 leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-ads-toronto-sources-heading">
          <h2 id="chatgpt-ads-toronto-sources-heading" className="font-display text-xl text-ink">
            Sources
          </h2>
          <ol className="mt-4 space-y-2 text-sm text-ink-700 leading-relaxed list-decimal pl-5">
            <li>
              Stratezik Toronto AI Discovery study, June 2026: 90 high-intent GTA buyer queries across 18 industries.
              Dataset available on request.
            </li>
            <li>Stratezik internal ChatGPT Ads campaign data (CPM, CTR benchmarks), 2026.</li>
            <li>
              <a href={REF.adsOpenAi} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
                OpenAI ChatGPT Ads documentation
              </a>
              ;{' '}
              <a href={REF.adsBasics} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
                Ads in ChatGPT: the basics
              </a>
              ;{' '}
              <a href={REF.testingAds} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
                Testing ads in ChatGPT
              </a>
              .
            </li>
          </ol>
        </section>
      </ResearchProse>
    </ResearchArticleRoot>
  )
}
