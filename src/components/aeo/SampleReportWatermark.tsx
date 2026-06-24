import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Single watermark word — header already explains "sample report" */
  label?: string
}

/** One centered diagonal mark — header carries the sample messaging. */
export function SampleReportWatermark({ children, label = 'Sample' }: Props) {
  return (
    <div className="relative isolate min-h-[12rem]">
      <div className="relative z-0">{children}</div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
      >
        <p className="select-none whitespace-nowrap font-mono text-[clamp(3.5rem,12vw,6.5rem)] uppercase tracking-[0.4em] text-oxblood/[0.09] rotate-[-24deg]">
          {label}
        </p>
      </div>
    </div>
  )
}

type ShellProps = {
  children: ReactNode
  domain?: string
  reportName?: string
}

/** Dark sample banner + single watermark — for paid-report previews. */
export function SampleReportShell({
  children,
  domain,
  reportName = 'AI Visibility Report',
}: ShellProps) {
  const domainLabel = domain ?? 'your site'

  return (
    <div className="overflow-hidden rounded-sm border border-oxblood/35 shadow-[0_8px_32px_-12px_rgba(122,31,31,0.2)]">
      <div className="flex flex-col gap-3 border-b border-oxblood/25 bg-ink px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-oxblood px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cream">
              Sample only
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream/50">Demo brand · not your data</span>
          </div>
          <p className="mt-2 font-display text-xl text-cream sm:text-2xl">{reportName} preview</p>
          <p className="mt-1 text-sm leading-relaxed text-cream/70">
            Worked example so you know the format. Numbers below are fictional.
          </p>
        </div>
        <div className="shrink-0 rounded-sm border border-gold/35 bg-gold/10 px-4 py-3 sm:max-w-[15rem] sm:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">Your real report</p>
          <p className="mt-1 text-sm font-medium leading-snug text-cream">
            Pick a plan below — we run this on <span className="text-gold">{domainLabel}</span> with your competitors.
          </p>
        </div>
      </div>
      <div className="bg-cream-50 px-2 pb-2 pt-1 sm:px-4">
        <SampleReportWatermark>{children}</SampleReportWatermark>
      </div>
    </div>
  )
}
