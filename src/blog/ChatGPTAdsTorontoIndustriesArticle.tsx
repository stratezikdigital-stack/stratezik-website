import { Link } from 'react-router-dom'
import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { BlogCheatSheetMidPromo } from './BlogCheatSheetMidPromo'
import { ChatGptAdsTorontoLiveSelector } from './ChatGptAdsTorontoLiveSelector'
import { chatgptAdsTorontoIndustriesFaq } from './postFaqs'

const SLUG = 'chatgpt-ads-toronto-industries'

const REF = {
  adsOpenAi: 'https://ads.openai.com',
  adsBasics: 'https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics',
  testingAds: 'https://openai.com/index/testing-ads-in-chatgpt/',
}

export default function ChatGPTAdsTorontoIndustriesArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        We asked ChatGPT 90 of the exact questions Toronto buyers ask before they spend money: &ldquo;best dentist in
        Scarborough,&rdquo; &ldquo;reliable plumber in downtown Toronto,&rdquo; &ldquo;best CRM for a Toronto
        startup.&rdquo; Ads already appeared on <strong className="text-ink">43 of the 90 (48%)</strong>. This is not a
        future channel. It is live in your market today.
      </p>

      <ul className="mt-8 space-y-3 text-ink-700 leading-relaxed border-l-2 border-oxblood/35 pl-5">
        <li>
          Across those ads we counted <strong className="text-ink">33 different advertisers</strong>, and exactly{' '}
          <strong className="text-ink">one was a local business</strong> advertising in the category the buyer was
          searching. The rest were national banks, global software, product manufacturers, and outright opportunists. We
          watched <strong className="text-ink">Lyft</strong> run ads against &ldquo;Botox near North York,&rdquo; &ldquo;eye
          exam in downtown Toronto,&rdquo; and &ldquo;movers in Scarborough.&rdquo;
        </li>
        <li>
          <strong className="text-ink">Three whole categories showed zero ads:</strong> fitness, pest control, and
          electricians. High intent, real local demand, and nobody is buying the slot.
        </li>
        <li>
          <strong className="text-ink">Three categories are already saturated</strong> (an ad on every single query): B2B
          SaaS, travel, and finance, all dominated by national and global brands.
        </li>
        <li>
          Toronto businesses can be cheaper here than on Google. Our own campaigns run a{' '}
          <strong className="text-ink">$35 CPM against a $250 Google Search comparison</strong>, with click-through 46%
          higher, which works out to roughly <strong className="text-ink">10x cheaper clicks</strong>. The auction is
          uncrowded because the local businesses that should own it have not shown up yet.
        </li>
      </ul>

      <aside
        className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50"
        aria-labelledby="chatgpt-ads-toronto-feat-heading"
      >
        <h2 id="chatgpt-ads-toronto-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {chatgptAdsTorontoIndustriesFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{chatgptAdsTorontoIndustriesFaq[0].answer}</p>
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
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">Why we ran this</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Every agency post about ChatGPT Ads says the same thing: &ldquo;it&apos;s early, it&apos;s cheap, get in.&rdquo;
        None of them show you what is actually happening inside the answers your customers see. So we checked.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We wrote 90 high-intent buying questions a real GTA customer would type, across 18 industries, from beauty and B2B
        SaaS to dentistry, HVAC, and pest control. Then we ran the identical set through two AI engines and recorded,
        for every answer: did it name a specific business, did it name a Toronto or GTA business, and crucially,{' '}
        <strong className="text-ink">did a sponsored ad appear, and who paid for it.</strong>
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This is the first thing you need to understand about ChatGPT Ads: an ad shows up as a sponsored card directly below
        the answer, at the exact moment someone has finished asking how to solve their problem. There is no higher-intent
        surface in advertising. The only question that matters is whether your business is in that slot or your competitor
        is. Right now, in Toronto, the answer is almost always neither.
      </p>

      <BlogCheatSheetMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Finding 1: Ads are already live on half of Toronto&apos;s buying questions
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Of 90 high-intent local queries, <strong className="text-ink">43 returned a live sponsored ad in ChatGPT (48%)</strong>.
        Not a test. Not &ldquo;coming soon.&rdquo; Nearly every second buying question a Toronto customer asks already has a
        paid placement under the answer.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">Here is how it breaks down by industry, from most saturated to wide open:</p>
      <div className="mt-6 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
              <th className="px-3 py-3">Industry</th>
              <th className="px-3 py-3">Queries with a live ad</th>
              <th className="px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-ink-700 divide-y divide-ink/10">
            {[
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
            ].map(([industry, count, status]) => (
              <tr key={industry}>
                <td className="px-3 py-3 align-top">{industry}</td>
                <td className="px-3 py-3 align-top font-medium text-ink">{count}</td>
                <td className="px-3 py-3 align-top">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The lesson in one line: the categories where money is already moving (SaaS, travel, finance) are commodity-bid
        contests dominated by big brands, and the categories where a local business could own the surface for pennies
        (fitness, pest control, electrical, dental, optometry, auto, movers) are nearly empty.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Finding 2: The advertisers are almost never the local business, and sometimes they are Lyft
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This is the finding that should make every Toronto business owner sit up. Across 90 queries and 43 ads, we counted
        33 distinct advertisers. We sorted each one by what it actually was relative to the question being asked:
      </p>
      <div className="mt-6 overflow-x-auto border border-ink/10">
        <table className="w-full text-sm text-left border-collapse min-w-[480px]">
          <thead>
            <tr className="bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.12em]">
              <th className="px-3 py-3">Who showed up in the ad slot</th>
              <th className="px-3 py-3">Share of ads</th>
            </tr>
          </thead>
          <tbody className="text-ink-700 divide-y divide-ink/10">
            <tr>
              <td className="px-3 py-3 align-top">
                National brands (RBC, TD Insurance, IHG, Choice Hotels, Air Transat, LG, Belairdirect, Intact)
              </td>
              <td className="px-3 py-3 align-top">16 of 43</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">
                Global software (Monday.com, Jotform, Canva, Wix, HiBob, ApprovalMax, ManageEngine, Fivetran)
              </td>
              <td className="px-3 py-3 align-top">11 of 43</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">
                Product manufacturers (Merrell, Polar Bed, Metro Dentifrice, eManuals, Diamond Pet)
              </td>
              <td className="px-3 py-3 align-top">6 of 43</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Adjacent local players (Skin Vitality, seoplus+, GWC Insulation)</td>
              <td className="px-3 py-3 align-top">6 of 43</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top">Opportunists, unrelated to the query (Lyft)</td>
              <td className="px-3 py-3 align-top">3 of 43</td>
            </tr>
            <tr>
              <td className="px-3 py-3 align-top font-medium text-ink">
                The actual local business in the category searched
              </td>
              <td className="px-3 py-3 align-top font-medium text-ink">1 of 43</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Read that last row again. In 90 high-intent local buying questions, we found{' '}
        <strong className="text-ink">exactly one</strong> business advertising in its own category: Turnbull Real Estate,
        on a query about selling a Scarborough condo. One.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Everywhere else, the slot above your future customer&apos;s decision is held by someone who is not you and often not
        even close. A few of the standouts we logged:
      </p>
      <ul className="mt-4 space-y-2 text-ink-700 leading-relaxed list-disc pl-5">
        <li>
          <strong className="text-ink">Lyft</strong> ran against &ldquo;affordable med spa near North York for Botox,&rdquo;
          &ldquo;eye exam in downtown Toronto,&rdquo; and &ldquo;affordable movers in Scarborough.&rdquo; A rideshare company
          is buying high-intent local service queries because the targeting is loose and the auction is empty enough that
          broad, cheap bids win.
        </li>
        <li>
          <strong className="text-ink">RBC and TD Insurance</strong> owned nearly the entire finance category, and RBC even
          appeared on &ldquo;real estate lawyer for a first home purchase.&rdquo; Banks understood early that AI answers are
          where financial decisions now get made.
        </li>
        <li>
          <strong className="text-ink">Jotform</strong>, a form-builder, advertised on &ldquo;best small business
          lawyer,&rdquo; &ldquo;basement renovation,&rdquo; and &ldquo;roofing contractor,&rdquo; turning every service
          query into a lead-capture funnel.
        </li>
        <li>
          <strong className="text-ink">Diamond Pet</strong> (pet food) showed up on vet searches.{' '}
          <strong className="text-ink">Metro Dentifrice</strong> (a toothpaste brand) showed up on &ldquo;teeth whitening in
          Toronto.&rdquo; <strong className="text-ink">LG</strong> showed up on HVAC. The manufacturers are advertising
          against the service businesses that install and use their products, while those service businesses sit out.
        </li>
      </ul>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The pattern is unmistakable. The ChatGPT ad auction in Toronto is being filled top-down by brands with national media
        teams and bottom-fed by opportunists with loose targeting. The local business, the one the customer is actually trying
        to find, is missing from its own moment.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Finding 3: Three categories are completely empty</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Fitness, pest control, and electricians returned <strong className="text-ink">zero ads across all 15 of their queries.</strong>{' '}
        Not a national brand, not an opportunist, nobody.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        These are not low-intent categories. &ldquo;Best gym in downtown Toronto for beginners,&rdquo; &ldquo;bed bug
        exterminator in downtown Toronto,&rdquo; &ldquo;electrician for EV charger installation&rdquo; are people ready to
        spend this week. ChatGPT answered every one of them with specific local businesses (it named real gyms, real
        exterminators, real electricians), which proves the commercial surface is there. There is simply no ad on it.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        If you run a gym, a pest control company, or an electrical contracting business in the GTA, this is the cleanest
        opportunity in the study. You can be the first and, for now, the only paid voice under the exact question your
        customers are asking, at a cost the saturated categories can only envy.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Finding 4: The &ldquo;saturated&rdquo; categories are saturated by outsiders, not locals
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        B2B SaaS, travel, and finance showed an ad on every single query. But look at who: Monday.com, IHG, RBC, TD, Air
        Transat, Choice Hotels. These are national and global advertisers. Even in the most competitive categories we
        tested, <strong className="text-ink">we did not see a single local Toronto SaaS company, boutique travel agency, or independent financial advisor in the ad slot.</strong>
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        That matters because it reframes &ldquo;saturated.&rdquo; A Toronto travel agency is not competing against fifty other
        local agencies for the ChatGPT slot. It is competing against Air Transat and IHG, who are bidding for national reach
        and broad keywords, not for &ldquo;best travel agency in Toronto for a Europe trip&rdquo; specifically. A tight,
        local, specific ad can still win that exact-intent moment at a discount, because the big advertisers are not optimizing
        for it. The auction looks crowded and is actually wide open at the local level.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">
        Finding 5: Being recommended is not the same as being in control
      </h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We ran the same 90 questions through a second engine, Claude with live web search, to compare. Both engines are good at
        local: across the 90 queries, the AI named at least one specific Toronto or GTA business about{' '}
        <strong className="text-ink">9 times out of 10.</strong> The two engines almost never named the{' '}
        <em>same</em> businesses, though, and the lists shifted between runs.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        That instability is the point. Organic AI recommendations are real, but you cannot control them, cannot guarantee
        them, and cannot predict whether today&apos;s answer names you or five competitors. ChatGPT also occasionally skips
        names entirely: on &ldquo;how do I incorporate a business in Ontario&rdquo; and &ldquo;basement renovation in the
        GTA,&rdquo; it gave a generic answer with no businesses at all. On the renovation query, an ad (Jotform) stepped into
        that vacuum; on the incorporation query, the slot sat empty, an open lane with no business in it. The ad slot is the
        one part of the AI answer you can actually buy, aim, and own. Everything above it is a recommendation you are hoping
        for.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">The Toronto opportunity map</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Pick your category below to see the current state of play, the rationale, and the first move. The data behind each tier
        is the study above. Share a deep link with <span className="font-mono text-sm">?industry=</span> to jump straight to
        your vertical.
      </p>

      <ChatGptAdsTorontoLiveSelector />

      <p className="mt-8 text-ink-700 leading-relaxed">
        Three plays come out of the data, and which one you run depends entirely on your category:
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">The greenfield play</strong> (fitness, pest control, electricians, and close behind:
        dental, optometry, auto, movers). No one is advertising. ChatGPT already names your competitors organically, so the
        buyers are there and the intent is proven. An ad makes you the single paid answer under the question. This is the
        lowest-cost, highest-return position in the entire study. Move now, before the first competitor notices.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">The jump-the-queue play</strong> (beauty, home services, HVAC, legal, real estate). Ads
        exist but thinly, and they are mostly adjacent brands and opportunists rather than your direct competitors. ChatGPT
        lists several local businesses organically; an ad lifts you above that list at the moment of decision, and you are
        bidding against a manufacturer or a form-builder, not the salon down the street.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">The challenger play</strong> (B2B SaaS, travel, finance, education). The category is
        saturated, but by national and global brands bidding broad. Your edge is specificity: a tight context hint matched to
        a local, exact-intent conversation (&ldquo;best travel agency in Toronto for a Europe trip&rdquo;) that the big
        advertisers are not optimizing for. You will not outbid RBC. You can out-specific them.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Why Toronto businesses have a real edge right now</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">Three reasons this window favours you specifically:</p>
      <ol className="mt-4 space-y-3 text-ink-700 leading-relaxed list-decimal pl-5">
        <li>
          <strong className="text-ink">Canada is live.</strong> ChatGPT Ads run in the US, Canada, Australia, and New Zealand.
          You are not waiting for a rollout; you are early inside one of only four launch markets.
        </li>
        <li>
          <strong className="text-ink">It is cheaper than the Toronto Google auction.</strong> Our own campaigns run a $35 CPM
          against a $250 Google Search comparison, with click-through 46% higher than our Google Search campaigns, which
          compounds to roughly 10x cheaper clicks. Toronto Google CPCs in categories like legal, HVAC, and finance are among
          the most expensive anywhere; ChatGPT is a fraction of that today.
        </li>
        <li>
          <strong className="text-ink">The local seats are empty.</strong> As this study shows, your direct local competitors
          are almost entirely absent from the ad slot. That is the definition of an early window, and it is the part that
          closes first.
        </li>
      </ol>

      <h2 className="mt-16 font-display text-display-3 text-ink">One honest caveat: health-adjacent categories</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Three of the highest-volume local categories we tested are health-adjacent: dental, optometry, and veterinary. ChatGPT
        restricts ads near sensitive health topics, and our data is consistent with that: dental and optometry showed almost no
        ads, and the few that appeared were a toothpaste brand and Lyft, not clinics. Before you build a campaign in these
        categories, <strong className="text-ink">verify ad eligibility in ChatGPT&apos;s Ads Manager for your specific service.</strong>{' '}
        The demand is real and the organic answers name local clinics, but the paid surface may be limited or closed depending
        on how your offering is classified. We would rather tell you that now than sell you a campaign that cannot run.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Methodology and limitations</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We tested 90 high-intent buying questions across 18 GTA industries (five questions each), written to mirror how a
        real Toronto, Scarborough, North York, or Mississauga customer phrases a purchase-stage query. The full prompt set and
        both engines&apos; results are available on request.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Two engines:</strong> the automated half ran through Claude with live web search, scored
        deterministically. The ChatGPT half was run manually in ChatGPT (free tier, web search enabled) on June 19, 2026,
        recording the answer and any sponsored ad with its advertiser. The advertiser observations are the founder-logged
        ChatGPT results.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <strong className="text-ink">Limitations, stated plainly.</strong> This is a snapshot, not a census. ChatGPT ad
        delivery rotates, varies by user and tier, and only a fraction of eligible sessions are served ads on any given day, so
        48% ad presence is a point-in-time reading, not a guarantee. The ChatGPT half is a single run on a single tier on a
        single day; a larger, repeated sample would tighten the numbers. Advertiser names are recorded as displayed in ChatGPT
        and reflect what we saw, not OpenAI&apos;s official ad reporting. We will re-run this study quarterly and report what
        changes.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Stop renting your customer&apos;s attention to Lyft</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The single highest-intent advertising surface in your market is live, it is cheap, and the businesses that should own
        it are not there. A rideshare company is advertising on Botox searches. A toothpaste brand is advertising on teeth
        whitening. Your competitors, mostly, are doing nothing. That combination does not last.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        We built a free, no-email cheat sheet that walks through exactly how to set up a ChatGPT Ads campaign: how to write
        context hints, how to test bids down to the floor, and how to track conversions. If you would rather we run it for you,
        that is what we do.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        <Link
          to={`/chatgpt-ads-cheat-sheet?utm_source=blog-${SLUG}&utm_medium=inline`}
          className="text-oxblood underline underline-offset-2 font-medium"
        >
          Get the ChatGPT Ads Cheat Sheet
        </Link>{' '}
        or talk to us about a campaign via our{' '}
        <Link to="/services/paid-search" className="text-oxblood underline underline-offset-2">
          paid search and media services
        </Link>{' '}
        or the <BlogStratezikContactLink>contact form</BlogStratezikContactLink>.
      </p>

      <BlogAuthorSignoff />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-ads-toronto-faq-heading">
        <h2 id="chatgpt-ads-toronto-faq-heading" className="font-display text-display-3 text-ink">
          Frequently asked questions
        </h2>
        <dl className="mt-8 space-y-8">
          {chatgptAdsTorontoIndustriesFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-lg text-ink">{item.question}</dt>
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
            Stratezik Toronto AI Discovery study, June 2026: 90 high-intent GTA buyer queries across 18 industries, run
            through Claude with web search (automated) and ChatGPT free tier (manual, June 19, 2026). Dataset available on
            request.
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
    </div>
  )
}
