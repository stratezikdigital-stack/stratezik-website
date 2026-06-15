import type { ReactNode } from 'react'
import { BlogStratezikContactLink } from './BlogStratezikContactLink'
import { BlogGrowthCreditMidPromo } from './BlogGrowthCreditMidPromo'
import { Link } from 'react-router-dom'
import { BlogDiscoveryHub } from './BlogDiscoveryHub'
import { gtaAgencyTriggersScenariosFaq } from './postFaqs'

const faq = gtaAgencyTriggersScenariosFaq

function ScenarioBlock({
  n,
  title,
  scenario,
  response,
}: {
  n: number
  title: string
  scenario: string
  response: ReactNode
}) {
  return (
    <div className="mt-12 first:mt-0">
      <h3 className="font-display text-2xl text-ink tracking-tight">
        {n}. {title}
      </h3>
      <p className="mt-4 text-ink-700 leading-relaxed">
        <strong className="text-ink">Scenario:</strong> {scenario}
      </p>
      <p className="mt-3 text-ink-700 leading-relaxed">
        <strong className="text-ink">What we would focus on:</strong> {response}
      </p>
    </div>
  )
}

export default function GtaAgencyTriggersScenariosArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        Almost no owner in Scarborough or the wider GTA wakes up and decides to hire a marketing agency. They hit a specific
        wall first: a launch with no plan behind it, ad spend that never turns into calls, a website that quietly loses the
        people who find it. The decision follows the wall.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        This is the companion to{' '}
        <Link to="/blog/when-hire-digital-marketing-agency-scarborough-gta" className="text-oxblood underline underline-offset-2">
          Part 1, where we lay out the decision framework and an RFP checklist
        </Link>
        . Here we make it concrete: ten triggers that push GTA small businesses toward a partner, each drawn as a representative
        scenario from a real Ontario neighbourhood, with the first moves we would make at Stratezik Digital. The scenarios are
        composites, not named clients. For a documented engagement with verified numbers, the{' '}
        <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
          Insectica case study
        </Link>{' '}
        shows the full month-by-month breakdown.
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="gta-triggers-feat-heading">
        <h2 id="gta-triggers-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {faq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{faq[0].answer}</p>
      </aside>

      <BlogGrowthCreditMidPromo />

      <h2 className="mt-16 font-display text-display-3 text-ink">Ten triggers, ten GTA scenarios</h2>

      <div className="mt-10 space-y-2">
        <ScenarioBlock
          n={1}
          title="No time, and the owner is the marketing department"
          scenario="Sarah runs a busy bakery in Agincourt and posts to Instagram at 10pm after a full day on her feet. The posting is sporadic, engagement slides, and the online orders she hoped social would bring never really show up."
          response={
            <>
              Take the calendar off her plate so the business stops marketing on fumes. We own content planning and a steady
              posting cadence, tidy the Google Business Profile, and wire tracking so the effort ties back to orders instead of
              vanishing into the feed. Most owners in this spot are losing customers to consistency, not to product.
            </>
          }
        />
        <ScenarioBlock
          n={2}
          title="Money going out, nothing measurable coming back"
          scenario="A North York plumbing company has spent months on Facebook ads run on gut feel. Clicks arrive, the phone does not ring with qualified work, and nobody can say which dollar did anything."
          response={
            <>
              Audit the account, cut the junk spend, and rebuild around high-intent local searches through disciplined{' '}
              <Link to="/services/paid-search/google-ads" className="text-oxblood underline underline-offset-2">
                Google Ads
              </Link>
              , then wire real call and form tracking so every lead has a source. When you can see what converts, the budget
              stops leaking.
            </>
          }
        />
        <ScenarioBlock
          n={3}
          title="A skills gap the team cannot close"
          scenario="A family auto-repair shop in Pickering has the basics but keeps losing first-page visibility to chains. The Google Business Profile is half-filled, and nobody on staff has time to learn schema, reviews, and local ranking factors."
          response={
            <>
              Run a proper{' '}
              <Link to="/services/seo-aeo/local-seo" className="text-oxblood underline underline-offset-2">
                local SEO
              </Link>{' '}
              programme: primary category and services fixed, a review system in place, schema added, and service-page depth
              built so the shop competes on the searches that bring booked jobs. If you are unsure why a strong shop still loses
              the map, start with{' '}
              <Link to="/blog/google-maps-ranking-service-business" className="text-oxblood underline underline-offset-2">
                why service businesses lose on Google Maps
              </Link>
              .
            </>
          }
        />
        <ScenarioBlock
          n={4}
          title="Growth by referral has hit its ceiling"
          scenario="A fitness studio in Toronto's east end grew on word of mouth, then flatlined right when the owner wanted to open a second location in Scarborough. Referrals alone will not fill two timetables."
          response={
            <>
              Build a full-funnel plan across{' '}
              <Link to="/services" className="text-oxblood underline underline-offset-2">
                multiple channels
              </Link>
              : short-form video for awareness, paid search and social for lead flow, and email nurture to turn trials into
              memberships, with separate reporting per location so the new Scarborough site is not flying blind.
            </>
          }
        />
        <ScenarioBlock
          n={5}
          title="Ad budget spent everywhere except in front of buyers"
          scenario="A renovation contractor in Durham Region is burning budget on broad Google Ads. Half the clicks come from outside the service area, and the cost per real enquiry keeps climbing."
          response={
            <>
              Tighten geo-targeting to the actual service map, build{' '}
              <Link to="/services/web-design/landing-pages" className="text-oxblood underline underline-offset-2">
                landing pages
              </Link>{' '}
              that match each ad's promise, and add remarketing so the people who almost called see you again. In a market this
              dense, precise beats broad every time.
            </>
          }
        />
        <ScenarioBlock
          n={6}
          title="The in-house hire does not pencil out"
          scenario="An independent bookstore in Highland Creek priced out a part-time marketer and choked on the math: salary plus tools plus training for one person expected to cover everything, badly."
          response={
            <>
              A retainer gives that shop a strategist, a paid specialist, content help, and premium tools for less than a single
              senior salary, dialled up for back-to-school and the holidays and down in the quiet months. You pay for output,
              not headcount.
            </>
          }
        />
        <ScenarioBlock
          n={7}
          title="Spending on marketing, blind to what works"
          scenario="A salon in Mississauga advertises on three platforms and cannot say which one fills the chairs. Each dashboard tells a different story and none of them ties to bookings."
          response={
            <>
              Put one measurement layer over everything: GA4, Meta Business Suite, and a simple dashboard that maps spend to
              booked appointments. Once the owner can see which campaign drives revenue, the monthly decision takes ten minutes
              instead of a guess.
            </>
          }
        />
        <ScenarioBlock
          n={8}
          title="A website that turns visitors away"
          scenario="A dental clinic in Scarborough runs an old, slow site with no online booking. People find it, bounce, and call a competitor whose site lets them book at 11pm."
          response={
            <>
              Rebuild on a fast, mobile-first{' '}
              <Link to="/services/web-design/website-design" className="text-oxblood underline underline-offset-2">
                website
              </Link>{' '}
              with booking wired in and local search handled, so the site earns new patients instead of quietly handing them to
              the practice down the road.
            </>
          }
        />
        <ScenarioBlock
          n={9}
          title="One platform change wipes out the reach"
          scenario="A Toronto e-commerce brand selling Canadian-made goods watched organic reach slide after platform and privacy changes it had no warning about. One channel was carrying far too much weight."
          response={
            <>
              Diversify before the next shift: Pinterest and YouTube for visual and how-to demand, server-side tracking to
              survive privacy changes, and{' '}
              <Link to="/services/seo-aeo/answer-engine-optimization" className="text-oxblood underline underline-offset-2">
                answer engine optimisation
              </Link>{' '}
              so the brand shows up when shoppers ask AI tools what to buy.
            </>
          }
        />
        <ScenarioBlock
          n={10}
          title="A pivot the marketing has not caught up to"
          scenario="After a rough stretch, a family restaurant in Markham leaned into takeout and catering, but its marketing still spoke to dine-in. The new revenue line had no story and no campaigns behind it."
          response={
            <>
              Refresh the positioning around catering through{' '}
              <Link to="/services/brand-strategy" className="text-oxblood underline underline-offset-2">
                brand strategy
              </Link>
              , run targeted local and delivery-platform ads, and publish community-minded content so the pivot reads as a
              confident new chapter, not a patch over a hard year.
            </>
          }
        />
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">Why these triggers rarely show up alone</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        The triggers interlock. A time-strapped owner in Scarborough usually has the expertise gap and the weak results at the
        same time, because there was never bandwidth to fix any of them. That is the real argument for a partner: not one heroic
        campaign, but a team that takes the whole tangle off your desk and works the highest-impact constraint first.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Stratezik Digital is built for Ontario SMBs that need momentum without adding full-time hires. Our approach is plain:
      </p>
      <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-6">
        <li>
          <strong className="text-ink">Local SEO mastery.</strong> Dominating the searches and{' '}
          <Link to="/services/seo-aeo/local-seo" className="text-oxblood underline underline-offset-2">
            Maps results
          </Link>{' '}
          in your actual neighbourhood, not a generic GTA blur.
        </li>
        <li>
          <strong className="text-ink">Data-driven campaigns.</strong> Disciplined{' '}
          <Link to="/services/paid-search" className="text-oxblood underline underline-offset-2">
            paid search
          </Link>{' '}
          and{' '}
          <Link to="/services/paid-social" className="text-oxblood underline underline-offset-2">
            paid social
          </Link>{' '}
          with conversion tracking that matches reality.
        </li>
        <li>
          <strong className="text-ink">Content that resonates.</strong> Written for GTA audiences and the way they search, by
          operators rather than a content mill.
        </li>
        <li>
          <strong className="text-ink">Transparent reporting.</strong> Monthly dashboards tied to revenue levers, so you always
          know the impact of every dollar.
        </li>
        <li>
          <strong className="text-ink">Scalable solutions.</strong> A{' '}
          <Link to="/services" className="text-oxblood underline underline-offset-2">
            full service set
          </Link>{' '}
          you can grow into as the business does, season by season.
        </li>
      </ul>

      <h2 className="mt-16 font-display text-display-3 text-ink">If a few of these sound familiar</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        You are not alone, and you do not have to keep solving it in isolation at 10pm. The businesses thriving across
        Scarborough, Toronto, and Ontario are usually the ones that recognised the wall early and brought in help before the cost
        of waiting compounded.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Book a complimentary audit and strategy session, and we will tell you, honestly, which triggers apply to your business
        and which revenue levers are worth pulling this quarter.
      </p>
      <Link
        to="/#contact"
        data-cursor="cta"
        data-cursor-text="Open"
        className="mt-8 inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
      >
        Request a complimentary audit
        <span aria-hidden className="font-mono">
          &rarr;
        </span>
      </Link>
      <p className="mt-6 text-sm text-ink-600">
        Or use our <BlogStratezikContactLink className="text-oxblood underline underline-offset-2">contact form</BlogStratezikContactLink>
        .
      </p>

      <BlogDiscoveryHub />

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="gta-triggers-faq-heading">
        <h2 id="gta-triggers-faq-heading" className="font-display text-display-3 text-ink">
          FAQ
        </h2>
        <dl className="mt-8 space-y-10">
          {faq.slice(1).map((item) => (
            <div key={item.question}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.question}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
