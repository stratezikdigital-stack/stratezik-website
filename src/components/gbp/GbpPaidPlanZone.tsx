import { Link } from 'react-router-dom'
import { GbpOperatorPlanPreview } from './GbpOperatorPlanPreview'

const BOOK_URL = '/#contact'

/** Paid-tier zone — visually distinct from free report; sample preview only. */
export function GbpPaidPlanZone({
  price,
  checkoutLoading,
  canCheckout,
  onCheckout,
}: {
  price: string
  checkoutLoading: boolean
  canCheckout: boolean
  onCheckout: () => void
}) {
  return (
    <section
      className="relative mt-14 overflow-hidden rounded-sm border-2 border-oxblood/55 bg-gradient-to-b from-oxblood/[0.14] via-oxblood/[0.06] to-cream shadow-[0_20px_50px_-16px_rgba(122,31,31,0.35)]"
      aria-labelledby="gbp-paid-plan-heading"
    >
      <div className="relative border-b border-oxblood/30 bg-ink px-6 py-6 md:px-8 md:py-7">
        <div
          className="pointer-events-none absolute -right-4 top-3 rotate-12 border border-gold/40 bg-gold/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold"
          aria-hidden
        >
          Sample preview
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">06 — Paid operator plan</p>
        <h3 id="gbp-paid-plan-heading" className="mt-2 max-w-2xl font-display text-2xl text-cream md:text-3xl">
          Top-1% operator deliverable
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/65">
          This is <strong className="text-gold">not</strong> your business yet — a labeled preview of the 12 assets you
          unbox after checkout. Built from your audit after payment.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-sm border border-gold/35 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-gold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" aria-hidden />
            Paid · {price} CAD
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-cream/40">Free report ends above this line</span>
        </div>
      </div>

      <div className="relative px-6 py-8 md:px-8 md:py-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_12px,rgba(122,31,31,0.03)_12px,rgba(122,31,31,0.03)_24px)]"
          aria-hidden
        />
        <div className="relative">
          <GbpOperatorPlanPreview />
        </div>
      </div>

      <div className="border-t border-oxblood/25 bg-oxblood/[0.12] px-6 py-6 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg text-ink">Ready for your bespoke plan?</p>
            <p className="mt-1 text-sm text-ink-600">12 sections · PDF by email · copy buttons on every asset</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            <button
              type="button"
              className="btn-primary min-w-[220px] disabled:opacity-60"
              disabled={checkoutLoading || !canCheckout}
              onClick={onCheckout}
            >
              {checkoutLoading ? 'Redirecting…' : `Unbox paid plan — ${price}`}
            </button>
            <Link to={BOOK_URL} className="btn-secondary">
              Free consult →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Unlocked paid plan — same visual family, clearly yours. */
export function GbpPaidPlanUnlocked({
  businessName,
  pdfLoading,
  onDownloadPdf,
  children,
}: {
  businessName: string
  pdfLoading: boolean
  onDownloadPdf: () => void
  children: ReactNode
}) {
  return (
    <section className="relative mt-14 overflow-hidden rounded-sm border-2 border-oxblood/60 bg-gradient-to-b from-oxblood/[0.08] to-cream shadow-[0_20px_50px_-16px_rgba(122,31,31,0.25)]">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-oxblood/25 bg-ink px-6 py-5 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">06 — Your operator plan · unlocked</p>
          <h3 className="mt-1 font-display text-xl text-cream md:text-2xl">Built for {businessName}</h3>
        </div>
        <div className="text-right">
          <button
            type="button"
            className="btn-secondary !border-gold/40 !text-cream hover:!bg-gold/10"
            disabled={pdfLoading}
            onClick={onDownloadPdf}
          >
            {pdfLoading ? 'Preparing PDF…' : '↓ Download PDF'}
          </button>
          <p className="mt-1.5 text-[11px] text-cream/45">Also emailed to you</p>
        </div>
      </div>
      <div className="space-y-8 p-6 md:p-8">{children}</div>
    </section>
  )
}
