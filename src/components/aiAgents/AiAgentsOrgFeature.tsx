import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ACCENT_STYLES,
  AGENT_CARDS,
  ARCH_ITEMS,
  BENEFITS,
  OUTPUT_STATS,
  WORK_EXAMPLES,
} from '../../services/aiAgentsOrgFeatureData'
import { AgentHandoffDiagram } from './AgentHandoffDiagram'
import { AgentOrgDiagram } from './AgentOrgDiagram'

const QUOTE_HREF = '/#contact-form'

function SectionEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={
        dark
          ? 'inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-4'
          : 'inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-oxblood mb-4'
      }
    >
      {children}
    </span>
  )
}

export function AiAgentsOrgFeature() {
  return (
    <div className="mt-12 md:mt-16">
      {/* Org diagram band */}
      <section className="bg-ink text-cream py-14 md:py-20">
        <div className="container-custom px-6 md:px-12">
          <SectionEyebrow dark>Reference build · live in production</SectionEyebrow>
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] text-cream leading-[1.08] tracking-[-0.03em] max-w-3xl">
            Five agents. Defined roles. Real handoffs.
          </h2>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            Founder briefs C1. Production fans out to R1, W1, and S1. Q1 gates everything external before publish. This is
            the system behind the content on this site.
          </p>
          <div className="mt-10 p-5 md:p-8 border border-cream/10 bg-cream/[0.03] rounded-sm overflow-x-auto">
            <AgentOrgDiagram />
          </div>
        </div>
      </section>

      {/* Thesis */}
      <section className="py-14 md:py-20 border-b border-ink/10 bg-cream">
        <div className="container-custom px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <SectionEyebrow>The bet</SectionEyebrow>
              <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
                We will not recommend an architecture for your business that we have not lived in ourselves.
              </h2>
            </div>
            <div>
              <blockquote className="border-l-4 border-oxblood pl-6 font-display text-xl md:text-2xl text-ink leading-snug tracking-tight">
                &ldquo;If we hired five marketers to do what our agents do, we would be a different and worse
                business.&rdquo;
              </blockquote>
              <p className="mt-6 text-ink-700 leading-relaxed">
                Most AI consultancies pitch you a vision. We can do something rarer: show you the working system, in
                production, that we use to run our own agency. Every decision we make about your build comes from operating
                ours.
              </p>
              <p className="mt-5 text-ink-700 leading-relaxed">
                The agent org you are about to meet wrote the{' '}
                <Link to="/blog/ai-native-gtm-build-from-day-1" className="text-oxblood underline underline-offset-2">
                  AI-native GTM series
                </Link>
                , replied to your last cold email if you got one, scored your company against our ICP if you have asked us
                anything, and reviewed itself before any of it left the building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent cards */}
      <section className="py-14 md:py-20 bg-cream-50">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <SectionEyebrow>Meet the team</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">Each agent has one job.</h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              A context pack it reads before acting, and a clear line about what it can and cannot decide on its own. The
              founder owns voice and judgement. The system owns throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {AGENT_CARDS.map((agent) => {
              const style = ACCENT_STYLES[agent.accent]
              return (
                <article
                  key={agent.id}
                  className={`bg-cream border border-ink/10 p-6 md:p-7 transition-colors ${style.border}`}
                >
                  <div
                    className={`w-14 h-14 rounded-sm flex items-center justify-center font-display text-xl text-cream ${style.avatar}`}
                  >
                    {agent.id}
                  </div>
                  <h3 className="mt-5 font-display text-xl text-ink tracking-tight">{agent.name}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{agent.role}</p>
                  <p className="mt-4 text-sm text-ink-700 leading-relaxed">{agent.description}</p>
                  <ul className="mt-5 space-y-2">
                    {agent.tasks.map((task) => (
                      <li key={task} className="text-sm text-ink-700 leading-relaxed pl-5 relative">
                        <span className={`absolute left-0 top-2.5 w-2 h-2 rounded-full ${style.dot}`} aria-hidden />
                        {task}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 pt-4 border-t border-ink/10 font-mono text-[11px] text-ink-500">{agent.model}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Handoffs */}
      <section className="py-14 md:py-20 bg-cream border-y border-ink/10">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mb-10">
            <SectionEyebrow>How work moves</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              Every handoff is a file. Q1 gates everything external.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              No freeform chat between agents. Work is written to a known folder; the next agent picks it up and writes to
              the next folder. The whole thing is auditable.
            </p>
          </div>

          <div className="overflow-x-auto border border-ink/10 bg-cream-50 p-4 md:p-6">
            <AgentHandoffDiagram />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: 'Step 1',
                title: 'Ticket in, brief written',
                body: 'A founder request becomes a structured ticket in the queue. Every required field is checked before any agent acts.',
              },
              {
                step: 'Step 2',
                title: 'Q1 reviews against the rubric',
                body: 'Voice, claims, compliance, SEO. The verdict is approve, revise, or reject. Revise comes with a numbered fix list.',
              },
              {
                step: 'Step 3',
                title: 'Founder sign-off, then publish',
                body: 'Approved files move to the approved folder. Founder signs off. Published via the CMS or sent via the relevant channel.',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="p-6 bg-cream-50 border-l-4 border-oxblood"
                style={{ borderLeftColor: i === 1 ? '#d97706' : i === 2 ? '#047857' : undefined }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">{item.step}</p>
                <h3 className="mt-2 font-display text-lg text-ink tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 md:py-20 bg-ink text-cream">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionEyebrow dark>What it produces</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-cream tracking-tight">
              Real output from a recent operating day.
            </h2>
            <p className="mt-4 text-cream/70 leading-relaxed">
              These numbers are from a single session of the agent org doing what it does. Quality reviewed by Q1 before
              anything was approved.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OUTPUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center p-8 border border-cream/10 bg-cream/[0.03]">
                <p className="font-display text-[clamp(2rem,5vw,3rem)] text-cream leading-none tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="py-14 md:py-20 bg-cream">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <SectionEyebrow>Recent work</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              A sample of what the system has produced.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Every piece was researched, drafted, reviewed, revised, and approved through the same handoff chain shown
              above.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WORK_EXAMPLES.map((ex) => {
              const inner = (
                <>
                  <span className="inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood px-2.5 py-1 bg-oxblood/5 mb-3">
                    {ex.tag}
                  </span>
                  <h3 className="font-display text-lg text-ink leading-snug tracking-tight">{ex.title}</h3>
                  <p className="mt-2 text-sm text-ink-500">{ex.meta}</p>
                </>
              )
              return ex.href ? (
                <Link
                  key={ex.title}
                  to={ex.href}
                  className="block p-6 border border-ink/10 bg-cream-50 hover:border-oxblood transition-colors"
                >
                  {inner}
                </Link>
              ) : (
                <div key={ex.title} className="p-6 border border-ink/10 bg-cream-50">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-14 md:py-20 bg-cream-50 border-t border-ink/10">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mb-12">
            <SectionEyebrow>Behind the scenes</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              The architecture that makes the agents work.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              Agents on their own are interesting. Agents inside a real operating system are useful.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ARCH_ITEMS.map((item) => (
              <div key={item.title} className="p-6 bg-cream border border-ink/10">
                <h3 className="font-display text-lg text-ink tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 md:py-20 bg-cream border-t border-ink/10">
        <div className="container-custom px-6 md:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionEyebrow>For your business</SectionEyebrow>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-tight">
              What an agent org gives you that a head count cannot.
            </h2>
            <p className="mt-4 text-ink-700 leading-relaxed">
              You are not buying replacement labour. You are buying a structural advantage that compounds while you sleep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="p-8 bg-cream-50 border border-ink/10 text-center">
                <p className="font-display text-5xl text-oxblood leading-none">{b.symbol}</p>
                <h3 className="mt-4 font-display text-xl text-ink tracking-tight">{b.title}</h3>
                <p className="mt-3 text-sm text-ink-700 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-14 md:py-20 bg-ink text-cream">
        <div className="container-custom px-6 md:px-12 text-center">
          <SectionEyebrow dark>See the build</SectionEyebrow>
          <h2 className="font-display text-2xl md:text-[2rem] text-cream tracking-tight max-w-2xl mx-auto">
            The reference build is open. We will walk you through it before you commit.
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-cream/75 leading-relaxed">
            Stratezik builds custom agent organisations for founders and operators who want to scale without scaling
            headcount. The system above is what powers our agency. We can build a version that powers yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:dave@stratezik.com?subject=AI%20Agents%20reference%20build%20walkthrough"
              data-cursor="cta"
              data-cursor-text="Email"
              className="inline-flex items-center gap-3 bg-cream text-ink px-7 py-3.5 font-medium hover:bg-oxblood hover:text-cream transition-colors"
            >
              Book a walkthrough
              <span aria-hidden className="font-mono">&rarr;</span>
            </a>
            <Link
              to="/services/ai-agents/ai-strategy"
              className="inline-flex items-center gap-3 border border-cream/30 text-cream px-7 py-3.5 font-medium hover:border-cream hover:bg-cream/5 transition-colors"
            >
              AI Strategy
              <span aria-hidden className="font-mono">&rarr;</span>
            </Link>
            <Link
              to={QUOTE_HREF}
              data-cursor="cta"
              data-cursor-text="Quote"
              className="inline-flex items-center gap-3 border border-cream/30 text-cream px-7 py-3.5 font-medium hover:border-cream hover:bg-cream/5 transition-colors"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
