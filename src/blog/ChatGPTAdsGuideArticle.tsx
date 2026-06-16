import { BlogAuthorSignoff } from './BlogAuthorSignoff'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { Link } from 'react-router-dom'
import { BlogDiscoveryHub } from './BlogDiscoveryHub'
import { chatgptAdsGuideFaq } from './postFaqs'

const SITE = 'https://www.stratezik.com'

/** Official Help Center + citations from the editorial draft */
const REF = {
  quickstart: 'https://help.openai.com/en/articles/20001224-quickstart-launch-your-first-campaign',
  adsManagerOverview: 'https://help.openai.com/en/articles/20001206-ads-manager-beta-overview',
  accountSetup: 'https://help.openai.com/en/articles/20001213-ads-manager-beta-account-setup',
  createCampaigns: 'https://help.openai.com/en/articles/20001210-create-campaigns-for-chatgpt',
  createAdGroups: 'https://help.openai.com/en/articles/20001211',
  createAds: 'https://help.openai.com/en/articles/20001212-create-ads-for-chatgpt',
  launchCampaigns: 'https://help.openai.com/en/articles/20001209-launch-campaigns',
  adsInChatgpt: 'https://help.openai.com/en/articles/20001047-ads-in-chatgpt',
  adsBasics: 'https://help.openai.com/en/articles/20001207-ads-in-chatgpt-the-basics',
  adPolicies: 'https://openai.com/policies/ad-policies/',
  testingAds: 'https://openai.com/index/testing-ads-in-chatgpt/',
  approachAdvertising: 'https://openai.com/index/our-approach-to-advertising-and-expanding-access/',
  newWaysToBuy: 'https://openai.com/index/new-ways-to-buy-chatgpt-ads/',
  adventurePpcTinted: 'https://www.adventureppc.com/blog/the-tinted-box-advantage-understanding-chatgpt-ads-placement-in-2026',
  almExplained: 'https://almcorp.com/blog/chatgpt-ads-explained/',
  adweek: 'https://www.adweek.com/media/openai-aggressively-expands-ads-pilot-to-more-countries/',
  digidayExpand: 'https://digiday.com/media-buying/expand-thoughtfully-openai-offers-chatgpt-ads-to-new-markets-including-the-u-k-brazil-and-japan/',
  almExpand: 'https://almcorp.com/blog/openai-chatgpt-ads-expands-uk-japan-south-korea-brazil-mexico/',
  adthena: 'https://www.adthena.com/resources/blog/chatgpt-ads-manager-beta-setup/',
  almCpm: 'https://almcorp.com/blog/chatgpt-ad-pricing-60-cpm-200000-minimum/',
  tnw: 'https://thenextweb.com/news/openai-chatgpt-cpc-ads-launch',
  sej: 'https://www.searchenginejournal.com/chatgpt-ads-now-offer-cpc-bidding-between-3-and-5-report/572652/',
  digidayCpc: 'https://digiday.com/marketing/openai-turns-on-cost-per-click-ads-inside-chatgpt/',
  marketingDive: 'https://www.marketingdive.com/news/openai-solidifies-ad-platform-ambitions-with-chatgpt-ads-manager/819801/',
  sel: 'https://searchengineland.com/openai-adds-cpc-ads-to-chatgpt-475148',
  allAdSpecs: 'https://alladspecs.com/specs/chatgpt/sponsored-recommendation-card',
  adventureMetrics: 'https://www.adventureppc.com/blog/10-chatgpt-ads-reporting-metrics-every-advertiser-must-track-in-2026',
}

export default function ChatGPTAdsGuideArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        For 25 years, paid advertising has worked the same way. You bid on a keyword. Someone types that keyword. Your
        ad shows up. The auction is mechanical, the intent is shallow, and the platforms got rich teaching you how to
        game it.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        ChatGPT Ads breaks that model. There is no keyword to bid on. There is no search results page. The matching
        happens inside a conversation between a person and a model, and a sponsored placement may appear when the system
        judges your offer relevant to that moment. Almost every advertiser we have spoken to is approaching it with
        Google or Meta muscle memory that does not transfer cleanly.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This guide covers what we see as of May 2026: how accounts work, how placements are structured, pricing
        narratives in trade press, geography, category gates, and why context hints replace keyword lists. Primary
        reference should stay{' '}
        <a
          href={REF.quickstart}
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood hover:text-ink underline decoration-oxblood/35 underline-offset-[0.2em]"
        >
          OpenAI&apos;s Help Center quickstart
        </a>{' '}
        and sibling articles, because beta UIs change.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="chatgpt-ads-feat-heading">
        <h2 id="chatgpt-ads-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {chatgptAdsGuideFaq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{chatgptAdsGuideFaq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Quick answers for skimmers: eligible categories are narrow; minimum spends in reporting are real; ads do not
          show to Plus, Pro, Business, Enterprise, or Education users. If you need citations inside assistants without
          buying placements, see our{' '}
          <Link to="/blog/answer-engine-optimisation-toronto" className="text-oxblood underline underline-offset-2">
            answer engine optimisation primer
          </Link>
          .
        </p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">What ChatGPT Ads actually is (and what it is not)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The surface product is Ads Manager Beta at{' '}
        <a
          href="https://ads.openai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-oxblood underline underline-offset-2"
        >
          ads.openai.com
        </a>
        : register an advertiser, build campaigns, upload creative, set budgets, and read performance. Underneath, it
        behaves more like a contextual recommendation layer than a classic search auction. Industry reporting from{' '}
        <a href={REF.adventurePpcTinted} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Adventure PPC
        </a>{' '}
        and{' '}
        <a href={REF.almExplained} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          ALM Corp
        </a>{' '}
        describes measured frequency on the order of one sponsored appearance per several conversations, with a compact
        card: favicon, headline, short copy, image, clearly labelled sponsored.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        It is not a SERP, not a display network across partner sites, and not a video or carousel unit. You do not buy
        the literal text the user typed. Native levers stay thin on purpose: country, device, sometimes region, tier
        (Free versus Go), plus your creative and context hints.
      </p>

      <figure className="mt-10">
        <img
          src="/illustrations/chatgpt-ads-sponsored-card.svg"
          width={640}
          height={280}
          alt="Diagram: assistant reply block above a tinted sponsored card with favicon, headline, description, and thumbnail"
          className="w-full border border-ink/10 bg-cream-50"
          loading="lazy"
        />
        <figcaption className="mt-3 text-sm text-ink-600 leading-relaxed">
          Stratezik schematic of the sponsored card pattern described in trade press (not a product screenshot).
        </figcaption>
      </figure>

      <h2 className="mt-16 font-display text-display-3 text-ink">Where ads run and who sees them</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        As of mid-May 2026, advertiser accounts were live for the United States, Canada, Australia, and New Zealand.
        Expansion to additional markets has been reported in{' '}
        <a href={REF.adweek} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Adweek
        </a>{' '}
        and{' '}
        <a href={REF.digidayExpand} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Digiday
        </a>
        ;{' '}
        <a href={REF.almExpand} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          ALM Corp
        </a>{' '}
        summarises United Kingdom, Japan, South Korea, Brazil, and Mexico as part of that wave, with European Union
        preparation noted in public commentary.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Country and currency choices at signup are effectively permanent for that advertiser record. A Toronto operator
        picking Canada commits to CAD billing for the life of that account, which matters for agencies managing
        cross-border brands.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        End users who see ads are on Free or Go (the lower-cost paid tier). Plus, Pro, Business, Enterprise, and
        Education do not receive these placements. The reachable audience is huge, but it skews away from buyers who
        already pay full freight for ChatGPT. If your offer assumes executive or enterprise readers, channel fit may be
        weaker than headline reach implies.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">How to set up an advertiser account</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        OpenAI structures the workflow as three beats in the{' '}
        <a href={REF.quickstart} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          quickstart
        </a>
        : create the account, build campaigns, monitor after launch. Expect 20 to 40 minutes of focused setup plus
        review time.
      </p>
      <ul className="mt-6 space-y-3 text-ink-700 leading-relaxed list-disc pl-6">
        <li>Sign in with a work-backed OpenAI account or create one.</li>
        <li>Complete verification and onboarding in Ads Manager Beta.</li>
        <li>
          Before anything serves: add advertiser name and favicon, configure billing and payment method, invite
          collaborators. OpenAI emphasises one business owner creating the advertiser, then inviting the team.
        </li>
      </ul>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Identity checks run through Persona-style flows with tax IDs and registration documents stricter than many ad
        platforms; have paperwork ready.{' '}
        <a href={REF.adthena} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Adthena
        </a>{' '}
        notes agencies cannot stand up client accounts outright: the client creates and owns the shell, then grants
        access. Operationally, prefer role-based owner emails so a departing CMO does not strand billing ownership.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Deeper UI detail lives in{' '}
        <a href={REF.accountSetup} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Ads Manager Beta account setup
        </a>{' '}
        and the{' '}
        <a href={REF.adsManagerOverview} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Ads Manager overview
        </a>
        .
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Building your first campaign</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        You can use guided creation in the UI or bulk upload via schema templates for scale. The hierarchy matches
        OpenAI&apos;s Help Center: campaign, then ad group, then ad (see{' '}
        <a href={REF.createCampaigns} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          create campaigns
        </a>
        ,{' '}
        <a href={REF.createAdGroups} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          create ad groups
        </a>
        ,{' '}
        <a href={REF.createAds} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          create ads
        </a>
        ).
      </p>

      <figure className="mt-10">
        <img
          src="/illustrations/chatgpt-ads-campaign-hierarchy.svg"
          width={560}
          height={320}
          alt="Diagram: campaign branches to two ad groups, each containing ads"
          className="w-full border border-ink/10 bg-cream-50"
          loading="lazy"
        />
        <figcaption className="mt-3 text-sm text-ink-600 leading-relaxed">
          Campaign, ad group, and ad relationship as described in OpenAI&apos;s quickstart (diagrammatic).
        </figcaption>
      </figure>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">Objectives</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Reporting typically centres Reach (CPM-weighted impressions) versus Clicks (CPC-weighted landing page visits).
        Conversion columns depend on your measurement setup. Performance buyers usually start on Clicks unless there is
        a deliberate awareness brief.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">Ad groups and context hints</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        This is the mental model shift. There is no keyword list, negative keyword list, interest taxonomy, or lookalike
        builder. Each ad group accepts <strong className="text-ink">context hints</strong>: short thematic descriptions
        of conversations where you belong. OpenAI describes hints as broad signals, not exact match tokens. The model
        weighs hints, creative, and the live dialogue together.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        If you sell dehumidifiers, hints might cover basement moisture, humidity control, or indoor air comfort; you are
        describing moments of usefulness, not buying tokens.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">Targeting controls</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Structural filters stay limited: country, region or city where supported, device type, subscription tier (Free
        versus Go). Conversation-level relevance does the heavy lifting.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">Creative</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Units combine title, body, square-ish image, landing URL, plus advertiser name and favicon. OpenAI publishes
        craft guidance in{' '}
        <a href={REF.createAds} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Create Ads for ChatGPT
        </a>
        . Third-party spec sheets such as{' '}
        <a href={REF.allAdSpecs} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          AllAdSpecs
        </a>{' '}
        cite tight character ranges and a 256 pixel minimum image; treat them as planning defaults until your build
        screen disagrees.
      </p>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Write headlines like a concise answer, not a tagline contest. Thumbnails are small; avoid illegible in-image
        text.
      </p>

      <h3 className="mt-12 font-display text-2xl text-ink tracking-tight">Review and launch</h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        Submit bundles for policy review. After go-live, use{' '}
        <a href={REF.launchCampaigns} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          launch and monitoring guidance
        </a>{' '}
        : dashboard status, hover reasons for &quot;Not serving,&quot; edit and resubmit where fixes are allowed.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">What it costs (and how the story moved in months)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Trade reporting tracked two eras. Early 2026 CPM-only buying landed around sixty US dollars CPM with a two
        hundred thousand dollar minimum according to{' '}
        <a href={REF.almCpm} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          ALM Corp
        </a>
        ;{' '}
        <a href={REF.tnw} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          The Next Web
        </a>{' '}
        noted CPMs drifting as inventory widened. From April 2026,{' '}
        <a href={REF.sej} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Search Engine Journal
        </a>{' '}
        and{' '}
        <a href={REF.digidayCpc} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Digiday
        </a>{' '}
        described CPC buying nearer three to five US dollars per click with a fifty thousand dollar minimum for
        entrants on that model.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Directionally, that CPC band sits above many generic search auctions and below LinkedIn-style B2B pricing in
        common anecdotes. Whether conversion efficiency clears your bar is an empirical test, not a press headline.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        If contractual minimums exceed your experiment budget, the honest move is to wait rather than force a
        micro-spend that cannot learn.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Launch, measurement, and support</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Native reporting emphasises impressions, clicks, spend, CTR, average CPC, average CPM, and conversions when
        tagged. Views include tables, charts, and CSV exports. There is no auction insights screen, impression share, or
        demographic breakdown comparable to mature search UI. Plan UTMs (for example{' '}
        <span className="font-mono text-sm">utm_source=chatgpt</span>) and bridge to GA4 or your warehouse yourself.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        OpenAI publishes product context in{' '}
        <a href={REF.adsInChatgpt} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Ads in ChatGPT
        </a>{' '}
        and{' '}
        <a href={REF.adsBasics} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          basics
        </a>
        ; policy lives in the{' '}
        <a href={REF.adPolicies} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          ad policies
        </a>
        . For metric hygiene,{' '}
        <a href={REF.adventureMetrics} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          Adventure PPC
        </a>{' '}
        lists practical dashboard fields worth tracking in beta.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Categories allowed (and excluded)</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        OpenAI&apos;s{' '}
        <a href={REF.adPolicies} target="_blank" rel="noopener noreferrer" className="text-oxblood underline underline-offset-2">
          published policies
        </a>{' '}
        emphasise conservative allow-lists: household goods, local services, travel, entertainment, digital products,
        education, with explicit exclusions such as healthcare, financial services, legal, alcohol and tobacco, gambling,
        dating and adult content, political and sensitive social issue messaging. If you are blocked by category, there
        is no public guaranteed reopening date.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">If you are not in an allowlisted country yet</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        You can wait for the rollout, stand up a compliant entity where you genuinely operate, or prepare creative and
        measurement now so you are not starting from zero when accounts open. The winners on new surfaces are usually
        ready before the checkbox appears.
      </p>

      <h2 className="mt-16 font-display text-display-3 text-ink">Straight talk for buyers</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        ChatGPT Ads is a credible beta with real inventory, CPC mechanics, and policy guardrails. It is also early:
        thinner reporting, lighter targeting, tight copy limits, awkward agency onboarding, and minimums that screen out
        small tests.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        For many Toronto service businesses optimising for next-month leads,{' '}
        <Link to="/#services" className="text-oxblood underline underline-offset-2">
          Search and Maps work
        </Link>{' '}
        still wins on efficiency. National brands with conversational use cases, eligible categories, and budget for a
        90-day learning curve are better candidates. Treat the first quarter as tuition, staff it with someone curious
        about assistive surfaces, not only a keyword auction traditionalist.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        If you want a blunt-fit review for your offer, use our <BlogStratezikContactLink className="text-oxblood underline underline-offset-2">contact form</BlogStratezikContactLink>{' '}
        or{' '}
        <Link to="/#contact" className="text-oxblood underline underline-offset-2">
          book time via our contact form
        </Link>
        .
      </p>

      <BlogDiscoveryHub heading="Related Stratezik guides" />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-ads-faq-heading">
        <h2 id="chatgpt-ads-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {chatgptAdsGuideFaq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="chatgpt-ads-sources-heading">
        <h2 id="chatgpt-ads-sources-heading" className="font-display text-xl text-ink">
          Sources
        </h2>

        <h3 className="mt-6 font-display text-lg text-ink">Official OpenAI</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            <a href={REF.quickstart} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Quickstart: Launch your first campaign
            </a>
          </li>
          <li>
            <a href={REF.adsManagerOverview} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Ads Manager Beta overview
            </a>
          </li>
          <li>
            <a href={REF.accountSetup} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Ads Manager Beta account setup
            </a>
          </li>
          <li>
            <a href={REF.createCampaigns} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Create campaigns for ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.createAdGroups} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Create ad groups for ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.createAds} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Create ads for ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.launchCampaigns} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Launch campaigns
            </a>
          </li>
          <li>
            <a href={REF.adsInChatgpt} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Ads in ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.adsBasics} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Ads in ChatGPT: The basics
            </a>
          </li>
          <li>
            <a href={REF.adPolicies} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Ad policies
            </a>
          </li>
          <li>
            <a href={REF.testingAds} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Testing ads in ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.approachAdvertising} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Our approach to advertising and expanding access
            </a>
          </li>
          <li>
            <a href={REF.newWaysToBuy} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              New ways to buy ChatGPT ads
            </a>
          </li>
        </ul>

        <h3 className="mt-8 font-display text-lg text-ink">Industry reporting</h3>
        <ul className="mt-3 space-y-2 text-sm text-ink-600 leading-relaxed">
          <li>
            <a href={REF.marketingDive} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Marketing Dive: ChatGPT Ads Manager
            </a>
          </li>
          <li>
            <a href={REF.adthena} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Adthena: Ads Manager beta setup
            </a>
          </li>
          <li>
            <a href={REF.sel} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Search Engine Land: CPC in ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.digidayCpc} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Digiday: CPC ads inside ChatGPT
            </a>
          </li>
          <li>
            <a href={REF.sej} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Search Engine Journal: CPC band reporting
            </a>
          </li>
          <li>
            <a href={REF.almCpm} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              ALM Corp: early CPM minimums
            </a>
          </li>
          <li>
            <a href={REF.tnw} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              The Next Web: shift to CPC
            </a>
          </li>
          <li>
            <a href={REF.adweek} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Adweek: pilot expansion
            </a>
          </li>
          <li>
            <a href={REF.digidayExpand} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Digiday: new markets
            </a>
          </li>
          <li>
            <a href={REF.almExpand} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              ALM Corp: geography expansion recap
            </a>
          </li>
          <li>
            <a href={REF.allAdSpecs} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              AllAdSpecs: sponsored card dimensions
            </a>
          </li>
          <li>
            <a href={REF.adventureMetrics} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Adventure PPC: reporting metrics
            </a>
          </li>
          <li>
            <a href={REF.adventurePpcTinted} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              Adventure PPC: placement mechanics
            </a>
          </li>
          <li>
            <a href={REF.almExplained} target="_blank" rel="noopener noreferrer" className="text-oxblood hover:text-ink underline">
              ALM Corp: ChatGPT Ads explained
            </a>
          </li>
        </ul>

        <p className="mt-6 text-sm text-ink-600">
          Stratezik sitemap:{' '}
          <a href={`${SITE}/sitemap.xml`} className="text-oxblood hover:text-ink underline">
            {SITE}/sitemap.xml
          </a>
          {' · '}
          <Link to="/services/paid-search" className="text-oxblood hover:text-ink underline">
            Paid search services
          </Link>
        </p>
      </section>

      <BlogAuthorSignoff />
    </div>
  )
}
