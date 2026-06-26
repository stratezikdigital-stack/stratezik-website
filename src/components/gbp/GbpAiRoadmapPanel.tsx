import type { AiRoadmap } from '../../gbp/aiRoadmap.types'

type CopyFn = (key: string, text: string) => void

function SectionBlock({
  n,
  title,
  children,
  className = '',
}: {
  n: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-sm border border-ink/12 bg-cream-50/90 p-5 md:p-6 ${className}`}>
      <div className="flex items-center gap-3 border-b border-ink/8 pb-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-oxblood font-mono text-[11px] text-cream">
          {n}
        </span>
        <h4 className="font-display text-lg text-ink">{title}</h4>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function CopyAsset({
  copyKey,
  label,
  text,
  copiedKey,
  onCopy,
  className = '',
}: {
  copyKey: string
  label: string
  text: string
  copiedKey: string | null
  onCopy: CopyFn
  className?: string
}) {
  return (
    <div className={`border border-ink/10 bg-cream-100/60 p-4 ${className}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">{label}</span>
        <button
          type="button"
          className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-400 hover:text-oxblood"
          onClick={() => void onCopy(copyKey, text)}
        >
          {copiedKey === copyKey ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <p className="whitespace-pre-line text-sm leading-relaxed text-ink-700">{text}</p>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-ink-700">
          <span className="text-oxblood">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

type GbpAiRoadmapPanelProps = {
  roadmap: AiRoadmap
  copiedKey: string | null
  onCopy: CopyFn
}

export function GbpAiRoadmapPanel({ roadmap, copiedKey, onCopy }: GbpAiRoadmapPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionBlock n="01" title="Where you stand" className="lg:col-span-2">
        <p className="text-sm leading-relaxed text-ink-700">{roadmap.summary}</p>
        <p className="mt-3 border-l-2 border-oxblood/30 pl-4 text-sm leading-relaxed text-ink-600">
          {roadmap.competitorInsight}
        </p>
      </SectionBlock>

      <SectionBlock n="02" title="Your 90 days" className="lg:col-span-2">
        <div className="grid gap-4 md:grid-cols-3">
          {roadmap.weeklyPlan.map((phase) => (
            <div key={phase.weeks} className="rounded-sm border border-ink/10 bg-cream p-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">{phase.weeks}</span>
              <p className="mt-2 font-medium text-ink">{phase.title}</p>
              <p className="mt-1 text-xs text-ink-500">{phase.why}</p>
              <BulletList items={phase.actions} />
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock n="03" title="Category reverse-engineering">
        <div className="space-y-2 text-sm text-ink-700">
          {roadmap.categoryStrategy.yourCurrentPrimary ? (
            <p>
              <span className="font-medium text-ink">Your primary today:</span>{' '}
              {roadmap.categoryStrategy.yourCurrentPrimary}
            </p>
          ) : null}
          <p>
            <span className="font-medium text-ink">Leader primary:</span> {roadmap.categoryStrategy.leaderPrimary}
          </p>
          <p>
            <span className="font-medium text-ink">Switch to:</span> {roadmap.categoryStrategy.recommendedPrimary}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {roadmap.categoryStrategy.additionalCategories.map((c) => (
              <span key={c} className="rounded-sm border border-ink/15 px-2 py-0.5 font-mono text-[10px] text-ink-600">
                {c}
              </span>
            ))}
          </div>
        </div>
        <CopyAsset
          copyKey="ai-cat-rationale"
          label="Why this category set"
          text={roadmap.categoryStrategy.rationale}
          copiedKey={copiedKey}
          onCopy={onCopy}
          className="mt-4"
        />
      </SectionBlock>

      <SectionBlock n="04" title="Review SEO">
        <div className="flex flex-wrap gap-1">
          {roadmap.reviewSeo.justificationKeywords.map((k) => (
            <span key={k} className="rounded-sm bg-gold/15 px-2 py-0.5 font-mono text-[10px] text-ink-700">
              {k}
            </span>
          ))}
        </div>
        <CopyAsset
          copyKey="ai-neighborhood-ask"
          label="Neighborhood seeding ask"
          text={roadmap.reviewSeo.neighborhoodSeedingAsk}
          copiedKey={copiedKey}
          onCopy={onCopy}
          className="mt-4"
        />
        <BulletList items={roadmap.reviewSeo.photoAsks} />
        <p className="mt-4 text-sm text-ink-700">
          {roadmap.reviewSeo.velocityPacing.current} → {roadmap.reviewSeo.velocityPacing.ninetyDayTarget} reviews (
          {roadmap.reviewSeo.velocityPacing.perWeek}/wk). {roadmap.reviewSeo.velocityPacing.note}
        </p>
        <div className="mt-4 grid gap-3">
          <CopyAsset copyKey="ai-sms" label="Text after every job" text={roadmap.reviewSeo.reviewRequest.sms} copiedKey={copiedKey} onCopy={onCopy} />
          <CopyAsset copyKey="ai-email" label="Email script" text={roadmap.reviewSeo.reviewRequest.email} copiedKey={copiedKey} onCopy={onCopy} />
        </div>
      </SectionBlock>

      <SectionBlock n="05" title="Services build-out" className="lg:col-span-2">
        <p className="text-sm text-ink-600">{roadmap.servicesBuildOut.providesJustificationNote}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {roadmap.servicesBuildOut.services.map((svc, i) => (
            <CopyAsset key={i} copyKey={`ai-svc-${i}`} label={svc.name} text={svc.description} copiedKey={copiedKey} onCopy={onCopy} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock n="06" title="Reply SEO">
        <div className="space-y-3">
          <CopyAsset copyKey="ai-reply-5" label="5-star reply" text={roadmap.replySeo.fiveStar} copiedKey={copiedKey} onCopy={onCopy} />
          <CopyAsset copyKey="ai-reply-mixed" label="Mixed review" text={roadmap.replySeo.mixed} copiedKey={copiedKey} onCopy={onCopy} />
          <CopyAsset copyKey="ai-reply-neg" label="Negative review" text={roadmap.replySeo.negative} copiedKey={copiedKey} onCopy={onCopy} />
        </div>
      </SectionBlock>

      <SectionBlock n="07" title="Business description">
        <CopyAsset copyKey="ai-desc" label="Paste into GBP" text={roadmap.optimizedDescription} copiedKey={copiedKey} onCopy={onCopy} />
      </SectionBlock>

      <SectionBlock n="08" title="Month-one posts">
        <div className="grid gap-3">
          {roadmap.googlePosts.map((post, i) => (
            <CopyAsset key={i} copyKey={`ai-post-${i}`} label={`${post.week} · ${post.type}`} text={post.copy} copiedKey={copiedKey} onCopy={onCopy} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock n="09" title="Seed Q&A" className="lg:col-span-2">
        <div className="grid gap-3 md:grid-cols-2">
          {roadmap.qanda.map((qa, i) => (
            <div key={i} className="border border-ink/10 bg-cream p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-ink">Q. {qa.question}</p>
                <button
                  type="button"
                  className="shrink-0 font-mono text-[10px] uppercase text-ink-400 hover:text-oxblood"
                  onClick={() => void onCopy(`ai-qa-${i}`, `Q: ${qa.question}\n\nA: ${qa.answer}`)}
                >
                  {copiedKey === `ai-qa-${i}` ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-ink-600">A. {qa.answer}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock n="10" title="Competitive integrity">
        <BulletList items={roadmap.competitiveIntegrity.auditNotes} />
        <p className="mt-3 font-mono text-[10px] uppercase text-oxblood">What not to do</p>
        <BulletList items={roadmap.competitiveIntegrity.whatNotToDo} />
      </SectionBlock>

      <SectionBlock n="11" title="Geo-targeting">
        <CopyAsset copyKey="ai-geo-logic" label="Block logic" text={roadmap.geoTargeting.blockLogic} copiedKey={copiedKey} onCopy={onCopy} />
        <div className="mt-3 flex flex-wrap gap-1">
          {roadmap.geoTargeting.priorityNeighborhoods.map((n) => (
            <span key={n} className="rounded-sm border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[10px]">
              {n}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock n="12" title="Authority signals">
        <BulletList items={roadmap.attributesAndPhotos.recommendedAttributes} />
        <CopyAsset copyKey="ai-schema" label="Schema guidance" text={roadmap.authoritySignals.schemaNote} copiedKey={copiedKey} onCopy={onCopy} className="mt-4" />
      </SectionBlock>
    </div>
  )
}
