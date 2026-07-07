import { useState } from 'react'
import { generateTorontoStartupAuditFindingsPdf } from './generateTorontoStartupAuditFindingsPdf'

export function TorontoStartupAuditFindingsDownload() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    setLoading(true)
    setError(null)
    try {
      const pdf = await generateTorontoStartupAuditFindingsPdf()
      const bytes = new Uint8Array(pdf)
      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Stratezik-Toronto-Startup-Audit-2026-Raw-Findings.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      setError('Could not generate the PDF. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="raw-findings-download"
      className="mt-16 border border-ink/12 bg-cream-50 p-6 md:p-8"
      aria-labelledby="raw-findings-heading"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-oxblood">Appendix</p>
      <h2 id="raw-findings-heading" className="mt-3 font-display text-2xl text-ink tracking-tight">
        Download the raw pattern-analysis findings
      </h2>
      <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
        The full report above is the published audit. This PDF is the verbatim working-document appendix — the intermediate
        pattern analysis that fed the final report — exported for researchers who want the raw finding blocks in one file.
        Every page carries a Stratezik watermark.
      </p>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 font-medium hover:bg-oxblood transition-colors disabled:opacity-60"
      >
        {loading ? 'Preparing PDF…' : '↓ Download raw findings (PDF)'}
      </button>
      {error ? <p className="mt-3 text-sm text-oxblood">{error}</p> : null}
    </section>
  )
}
