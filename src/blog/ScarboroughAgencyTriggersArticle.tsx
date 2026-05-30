import { Link } from 'react-router-dom'
import { scarboroughAgencyTriggersFaq } from './postFaqs'

const faq = scarboroughAgencyTriggersFaq

function TriggerBlock({
  n,
  title,
  scenario,
  why,
  action,
}: {
  n: number
  title: string
  scenario: string
  why: string
  action: string
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
        <strong className="text-ink">Why owners search:</strong> {why}
      </p>
      <p className="mt-3 text-ink-700 leading-relaxed">
        <strong className="text-ink">What Stratezik does first:</strong> {action}
      </p>
    </div>
  )
}

export default function ScarboroughAgencyTriggersArticle() {
  return (
    <div className="max-w-[720px] mx-auto">
      <p className="lead text-lg text-ink-700 leading-relaxed">
        Small and medium businesses in Scarborough, the broader Toronto GTA, and across Ontario often hit the same wall: the
        product or service is solid, but growth stalls, marketing feels opaque, and daily operations leave no bandwidth to test
        channels properly. That is when owners start looking for a partner who can turn digital activity into booked jobs, sales,
        and measurable pipeline instead of guesswork.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Below are ten common triggers that push SMBs toward agency support, each with a realistic scenario and the first moves we
        would make at Stratezik Digital. If you are weighing timing, our{' '}
        <Link to="/blog/get-found-2026-paid-performance" className="text-oxblood underline underline-offset-2">
          Get Found 2026 paid chapter
        </Link>{' '}
        explains why we treat paid as an accelerator only after positioning, SEO, and content foundations are in place. For ten
        industry-specific stories from across the GTA, read{' '}
        <Link to="/blog/signs-time-digital-marketing-agency-gta" className="text-oxblood underline underline-offset-2">
          Part 2: signs it is time to partner with an agency
        </Link>
        .
      </p>

      <aside className="mt-12 p-6 md:p-8 border border-ink/10 bg-cream-50" aria-labelledby="scarborough-agency-feat-heading">
        <h2 id="scarborough-agency-feat-heading" className="font-display text-xl md:text-2xl text-ink tracking-tight">
          {faq[0].question}
        </h2>
        <p className="mt-4 text-ink-700 leading-relaxed">{faq[0].answer}</p>
        <p className="mt-4 text-sm text-ink-600 leading-relaxed">
          Local operators comparing Maps performance should read{' '}
          <Link to="/blog/google-maps-ranking-service-business" className="text-oxblood underline underline-offset-2">
            why service businesses lose on Google Maps
          </Link>{' '}
          before blaming ads alone.
        </p>
      </aside>

      <h2 className="mt-16 font-display text-display-3 text-ink">Ten triggers that push SMBs to call an agency</h2>

      <div className="mt-10 space-y-2">
        <TriggerBlock
          n={1}
          title="Steady traffic, weak lead volume"
          scenario="A Scarborough HVAC company sees winter website visits hold steady but service requests barely move."
          why="Owners need booked jobs, not session counts."
          action="Run a conversion audit, tighten call-to-action placement, add appointment booking where it fits, and launch targeted Google Ads on emergency-intent keywords with call and form tracking."
        />
        <TriggerBlock
          n={2}
          title="Rising ad spend, falling return"
          scenario="A Toronto boutique increases Facebook and Google budgets each month while sales soften."
          why="Wasted spend erodes margin and confidence in marketing altogether."
          action="Audit ad accounts, cut junk spend, restructure campaigns around profitable SKUs, fix conversion tracking, and test fresh creative and audience segments with disciplined caps."
        />
        <TriggerBlock
          n={3}
          title="Traffic spikes without sales lift"
          scenario="A Mississauga e-commerce shop rides a viral post but checkout revenue stays flat."
          why="Traffic without conversions usually means messaging, UX, or checkout friction."
          action="Review heatmaps and session recordings, simplify checkout, A/B test product pages, and test urgency mechanics only where they match inventory truth."
        />
        <TriggerBlock
          n={4}
          title="Poor local search visibility"
          scenario="A family-run Scarborough restaurant is thin on Google Maps and loses weekend diners to rivals with stronger listings."
          why="Local discovery is existential for brick-and-mortar SMBs."
          action="Optimise Google Business Profile, reconcile citations, add local schema, and run geo-targeted campaigns that drive reservations with tracked phone and booking events."
        />
        <TriggerBlock
          n={5}
          title="Launching a new product or service"
          scenario="A Toronto tech startup ships a subscription offer and needs a measurable go-to-market in weeks, not quarters."
          why="Launches need coordinated messaging, creative, landing pages, and paid amplification."
          action="Build a launch funnel, ship focused landing pages, capture pre-launch leads, and execute a phased paid plan with daily performance checks."
        />
        <TriggerBlock
          n={6}
          title="Expanding into new markets or locations"
          scenario="A Scarborough home-cleaning company opens North York and needs marketing that speaks to that neighbourhood, not a generic GTA blurb."
          why="Expansion demands localized SEO, tailored creative, and fresh audience targeting."
          action="Run lightweight market research, publish location-specific landing pages, and launch geo-bounded ad sets with separate reporting."
        />
        <TriggerBlock
          n={7}
          title="Reputation or review pressure"
          scenario="A GTA dental clinic sees a cluster of negative reviews affecting new patient inquiries."
          why="Trust signals sit upstream of both search and conversion."
          action="Implement response protocols, systematically invite satisfied patients to review, and align onsite proof with the reputation story you want assistants and searchers to repeat."
        />
        <TriggerBlock
          n={8}
          title="No bandwidth or specialist depth in-house"
          scenario="A growing Scarborough retailer relies on one part-time marketer drowning in platform updates and ad tweaks."
          why="Owners need reliable execution without building a full internal department overnight."
          action="Act as an outsourced marketing team with a named account lead, weekly dashboards, and monthly strategy reviews tied to revenue levers."
        />
        <TriggerBlock
          n={9}
          title="Social presence that does not convert"
          scenario="A Toronto fitness studio posts sporadically, sees low engagement, and books few classes from social."
          why="Social should build community and drive measurable sign-ups, not only likes."
          action="Publish a sustainable content calendar, produce short-form video from real sessions, run conversion-focused social ads, and manage community replies with clear offers."
        />
        <TriggerBlock
          n={10}
          title="Time-sensitive revenue targets"
          scenario="A seasonal landscaping operator in the GTA must hit spring revenue targets with a narrow window."
          why="Compressed timelines need high-intent paid search, retargeting, and landing pages tuned for immediate action."
          action="Prioritise paid search and retargeting, optimise landing pages for phone and form conversions, and monitor performance daily through peak season."
        />
      </div>

      <h2 className="mt-16 font-display text-display-3 text-ink">How Stratezik turns triggers into momentum</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        When a business reaches out, we follow a structured, transparent path designed for fast impact and compounding growth.
      </p>
      <ul className="mt-6 space-y-4 text-ink-700 leading-relaxed list-disc pl-6">
        <li>
          <strong className="text-ink">Audit and diagnosis.</strong> Website conversion paths, analytics, ad accounts, and local
          listings reviewed together so we fix the highest-impact constraint first.
        </li>
        <li>
          <strong className="text-ink">Quick wins plus roadmap.</strong> Tracking repairs, landing page fixes, and low-cost ad tests
          ship early while a 90-day plan covers{' '}
          <Link to="/blog/get-found-2026-seo-organic-search" className="text-oxblood underline underline-offset-2">
            SEO
          </Link>
          , content, and sustainable paid.
        </li>
        <li>
          <strong className="text-ink">Execution and reporting.</strong> Strategist, paid specialist, content support, and analyst
          coverage without full-time hire overhead. Weekly dashboards and monthly strategy calls keep owners informed.
        </li>
        <li>
          <strong className="text-ink">Local-first for Scarborough and the GTA.</strong> GBP depth, neighbourhood-aware creative,
          and geo campaigns that respect how locals actually search. See our{' '}
          <Link to="/blog/insectica-gta-pest-control-scaling-case-study" className="text-oxblood underline underline-offset-2">
            Insectica case study
          </Link>{' '}
          for a GTA example of combined paid and organic lift.
        </li>
      </ul>

      <h2 className="mt-16 font-display text-display-3 text-ink">RFP checklist for Ontario SMBs</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        When you invite agencies to pitch, this short list protects time and budget.
      </p>
      <ol className="mt-6 space-y-3 text-ink-700 leading-relaxed list-decimal pl-6">
        <li>Define the single most urgent business goal in one sentence.</li>
        <li>Ask for a 30 to 90 day audit and prioritised roadmap with estimated impact and costs.</li>
        <li>Request case studies or examples from similar local businesses in Scarborough, Toronto, or the wider GTA.</li>
        <li>Clarify reporting cadence and the KPIs you will receive monthly.</li>
        <li>Confirm team structure and the named point of contact on your account.</li>
        <li>Agree on a trial period or 90-day performance clause with explicit deliverables.</li>
        <li>Ask which tools and tracking will be implemented and who owns the data.</li>
        <li>Request transparent pricing: setup fees, monthly retainer, and recommended ad spend ranges.</li>
      </ol>

      <h2 className="mt-16 font-display text-display-3 text-ink">Next steps</h2>
      <p className="mt-6 text-ink-700 leading-relaxed">
        For many SMBs in Scarborough and across the GTA, the decision boils down to one question: do you want predictable,
        measurable growth without adding full-time hires or burning budget on untested tactics? If any trigger above sounds familiar,
        a focused audit and 90-day plan usually reveals quickly whether partnership pays for itself.
      </p>
      <p className="mt-6 text-ink-700 leading-relaxed">
        Stratezik Digital specialises in helping Ontario SMBs move from uncertainty to momentum. Request a practical audit tailored
        to Scarborough and GTA competition and we will prioritise the revenue levers that matter this quarter.
      </p>
      <Link
        to="/#contact"
        data-cursor="cta"
        data-cursor-text="Open"
        className="mt-8 inline-flex items-center gap-3 bg-ink text-cream px-7 py-3.5 font-medium hover:bg-oxblood transition-colors"
      >
        Request a 30 to 90 day audit
        <span aria-hidden className="font-mono">
          &rarr;
        </span>
      </Link>
      <p className="mt-6 text-sm text-ink-600">
        Or email{' '}
        <a href="mailto:dave@stratezik.com?subject=GTA%20marketing%20audit" className="text-oxblood underline underline-offset-2">
          dave@stratezik.com
        </a>
        .
      </p>

      <section className="mt-16 pt-10 border-t border-ink/10" aria-labelledby="scarborough-agency-faq-heading">
        <h2 id="scarborough-agency-faq-heading" className="font-display text-display-3 text-ink">
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
