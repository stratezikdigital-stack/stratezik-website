/** Visual preview of the 12-section paid operator plan — cards, not a text wall. */

const DELIVERABLES = [
  {
    n: '01',
    title: 'Where you stand',
    hook: '2-sentence situation + competitor read',
    visual: 'score',
    sample: 'Rank gap vs #1 · single biggest lever',
  },
  {
    n: '02',
    title: '90-day phases',
    hook: '3 phased sprints with actions',
    visual: 'timeline',
    sample: 'Wk 1–2 · Wk 3–6 · Wk 7–12',
  },
  {
    n: '03',
    title: 'Category reverse-engineering',
    hook: 'Leader primary + maxed additional set',
    visual: 'categories',
    sample: 'Primary + 9 backups from Place Details',
  },
  {
    n: '04',
    title: 'Review SEO',
    hook: 'Keywords, photo asks, velocity pacing',
    visual: 'reviews',
    sample: '12 justification terms · SMS + email scripts',
  },
  {
    n: '05',
    title: 'Services build-out',
    hook: 'Keyword-rich list for “Provides” justifications',
    visual: 'services',
    sample: '8–15 services with descriptions',
  },
  {
    n: '06',
    title: 'Reply SEO',
    hook: 'Owner templates by review type',
    visual: 'replies',
    sample: '5★ · mixed · negative — copy-ready',
  },
  {
    n: '07',
    title: 'Business description',
    hook: '600–750 char paste-ready copy',
    visual: 'description',
    sample: 'Keyword-aware · clear CTA',
  },
  {
    n: '08',
    title: 'Month-one posts',
    hook: '4 Google posts ready to publish',
    visual: 'posts',
    sample: 'Offer · Update · Event drafts',
  },
  {
    n: '09',
    title: 'Seed Q&A',
    hook: '8 pairs customers actually ask',
    visual: 'qa',
    sample: 'Question + answer to post yourself',
  },
  {
    n: '10',
    title: 'Competitive integrity',
    hook: 'Compliant audit + what NOT to do',
    visual: 'integrity',
    sample: 'Real rival names · redressal steps',
  },
  {
    n: '11',
    title: 'Geo-targeting',
    hook: 'Block logic + priority neighborhoods',
    visual: 'geo',
    sample: 'Service-area setup for your city',
  },
  {
    n: '12',
    title: 'Authority signals',
    hook: 'Attributes, photos, NAP, schema',
    visual: 'authority',
    sample: 'sameAs · local links · shot list',
  },
] as const

function DeliverableVisual({ kind }: { kind: (typeof DELIVERABLES)[number]['visual'] }) {
  if (kind === 'score') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 shrink-0">
          <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(122,31,31,0.15)" strokeWidth="5" />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#7a1f1f"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={52}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-sm text-ink">58</span>
        </div>
        <div className="min-w-0 space-y-1">
          <div className="h-1.5 w-full max-w-[88px] rounded-full bg-cream-200">
            <div className="h-full w-[42%] rounded-full bg-oxblood/70" />
          </div>
          <div className="h-1.5 w-full max-w-[72px] rounded-full bg-cream-200">
            <div className="h-full w-[68%] rounded-full bg-gold/70" />
          </div>
        </div>
      </div>
    )
  }
  if (kind === 'timeline') {
    return (
      <div className="flex gap-1">
        {['1–2', '3–6', '7–12'].map((w, i) => (
          <div
            key={w}
            className={`flex-1 rounded-sm border px-1 py-2 text-center ${i === 0 ? 'border-oxblood/40 bg-oxblood/10' : 'border-ink/10 bg-cream'}`}
          >
            <p className="font-mono text-[8px] uppercase text-ink-400">Wk</p>
            <p className="font-mono text-[10px] font-medium text-ink">{w}</p>
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'categories') {
    return (
      <div className="flex flex-wrap gap-1">
        {['Primary', 'Backup 1', 'Backup 2', '+6'].map((t, i) => (
          <span
            key={t}
            className={`rounded-sm px-1.5 py-0.5 font-mono text-[9px] ${i === 0 ? 'bg-oxblood text-cream' : 'border border-ink/15 text-ink-600'}`}
          >
            {t}
          </span>
        ))}
      </div>
    )
  }
  if (kind === 'reviews') {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {['licensed', 'same-day', 'Scarborough'].map((k) => (
            <span key={k} className="rounded-sm bg-gold/15 px-1.5 py-0.5 font-mono text-[9px] text-ink-700">
              {k}
            </span>
          ))}
        </div>
        <p className="font-mono text-[9px] text-oxblood">~3 reviews / week target</p>
      </div>
    )
  }
  if (kind === 'services') {
    return (
      <ul className="space-y-1">
        {['Emergency repair', 'Installation', '+6 more'].map((s) => (
          <li key={s} className="flex items-center gap-1.5 font-mono text-[9px] text-ink-600">
            <span className="text-oxblood">▸</span> {s}
          </li>
        ))}
      </ul>
    )
  }
  if (kind === 'replies') {
    return (
      <div className="grid grid-cols-3 gap-1">
        {['5★', '3★', '1★'].map((s) => (
          <div key={s} className="rounded-sm border border-ink/10 bg-cream px-1 py-2 text-center font-mono text-[9px] text-ink-600">
            {s}
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'description') {
    return (
      <div className="rounded-sm border border-dashed border-oxblood/25 bg-cream px-2 py-2">
        <p className="line-clamp-2 font-mono text-[9px] leading-relaxed text-ink-500">
          Licensed [trade] in [city]. Same-day service. Call for a free quote…
        </p>
      </div>
    )
  }
  if (kind === 'posts') {
    return (
      <div className="grid grid-cols-2 gap-1">
        {['Offer', 'Update', 'Event', 'Wk 4'].map((p) => (
          <div key={p} className="rounded-sm border border-ink/10 bg-cream-100 px-1 py-1.5 text-center font-mono text-[8px] text-ink-500">
            {p}
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'qa') {
    return (
      <div className="space-y-1">
        <p className="truncate rounded-sm bg-cream-100 px-2 py-1 font-mono text-[9px] text-ink-600">Q: Same-day service?</p>
        <p className="truncate rounded-sm border border-ink/8 px-2 py-1 font-mono text-[9px] text-ink-400">A: Yes — we dispatch daily…</p>
      </div>
    )
  }
  if (kind === 'integrity') {
    return (
      <div className="space-y-1">
        {['Audit notes', 'Redressal steps', 'What NOT to do'].map((r) => (
          <div key={r} className="flex items-center gap-1.5 font-mono text-[9px] text-ink-600">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" />
            {r}
          </div>
        ))}
      </div>
    )
  }
  if (kind === 'geo') {
    return (
      <div className="flex flex-wrap gap-1">
        {['North York', 'Scarborough', 'Etobicoke', '+4'].map((n) => (
          <span key={n} className="rounded-sm border border-gold/30 bg-gold/10 px-1.5 py-0.5 font-mono text-[9px] text-ink-700">
            {n}
          </span>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-1">
      {['NAP ✓', 'Photos', 'sameAs', 'Schema'].map((a) => (
        <span key={a} className="rounded-sm border border-ink/10 bg-cream px-1 py-1 text-center font-mono text-[8px] text-ink-500">
          {a}
        </span>
      ))}
    </div>
  )
}

export function GbpOperatorPlanPreview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DELIVERABLES.map((d) => (
          <article
            key={d.n}
            className="flex flex-col rounded-sm border border-oxblood/15 bg-cream/90 p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-oxblood">{d.n}</span>
              <span className="rounded-sm bg-oxblood/10 px-1.5 py-0.5 font-mono text-[8px] uppercase text-oxblood/80">
                Sample
              </span>
            </div>
            <h4 className="mt-2 font-display text-base leading-snug text-ink">{d.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-ink-500">{d.hook}</p>
            <div className="mt-4 min-h-[72px] flex-1 rounded-sm border border-ink/8 bg-cream-50/80 p-3">
              <DeliverableVisual kind={d.visual} />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-wide text-ink-400">{d.sample}</p>
          </article>
        ))}
      </div>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-oxblood/70">
        Illustrative layout — your paid plan replaces every sample with your audit data
      </p>
    </div>
  )
}
