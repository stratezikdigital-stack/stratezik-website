export type BusinessCandidate = {
  placeId: string
  name: string
  address: string
  rating: string | null
  reviewCount: number
  mapsUri: string | null
  matchScore: number
  matchLabel: 'exact' | 'close' | 'possible'
}

const MATCH_LABELS: Record<BusinessCandidate['matchLabel'], string> = {
  exact: 'Exact name match',
  close: 'Close match',
  possible: 'Possible match',
}

export function GbpBusinessPicker({
  queryName,
  city,
  candidates,
  loading,
  selectedPlaceId,
  placesConfigured = true,
  lookupReason,
  onSelect,
  onConfirm,
  onBack,
  onSkip,
}: {
  queryName: string
  city: string
  candidates: BusinessCandidate[]
  loading?: boolean
  selectedPlaceId: string | null
  placesConfigured?: boolean
  lookupReason?: 'missing_api_key' | 'no_results'
  onSelect: (placeId: string) => void
  onConfirm: () => void
  onBack: () => void
  onSkip: () => void
}) {
  return (
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.35s_ease-out]">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Confirm your listing</p>
      <h2 className="mt-2 font-display text-3xl text-ink tracking-tight">Which business is yours?</h2>
      <p className="mt-3 text-ink-600 leading-relaxed">
        We searched Google Maps near <strong className="text-ink">{city.split(',')[0]}</strong> for &quot;
        {queryName}&quot;. Pick the listing with the <strong className="text-ink">address you recognize</strong>{' '}
        — then we run the full audit on that profile.
      </p>

      {loading ? (
        <div className="mt-8 flex items-center gap-3 rounded-sm border border-ink/10 bg-cream-50 px-5 py-6">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-oxblood" />
          <p className="text-sm text-ink-600">Searching Google Maps…</p>
        </div>
      ) : !placesConfigured || lookupReason === 'missing_api_key' ? (
        <div className="mt-8 rounded-sm border border-oxblood/25 bg-oxblood/5 px-5 py-6">
          <p className="font-display text-lg text-ink">Google Maps lookup unavailable</p>
          <p className="mt-2 text-sm text-ink-600 leading-relaxed">
            This environment is missing <code className="text-xs">GOOGLE_PLACES_API_KEY</code>. Add it to{' '}
            <code className="text-xs">.env.local</code> (see <code className="text-xs">.env.gbp.example</code>), enable
            Places API (New) + Geocoding in Google Cloud, then restart <code className="text-xs">npm run dev</code>.
          </p>
          <button type="button" className="btn-secondary mt-5" onClick={onBack}>
            ← Edit search
          </button>
        </div>
      ) : candidates.length === 0 ? (
        <div className="mt-8 rounded-sm border border-oxblood/25 bg-oxblood/5 px-5 py-6">
          <p className="font-display text-lg text-ink">No listings found</p>
          <p className="mt-2 text-sm text-ink-600 leading-relaxed">
            We searched Google for &quot;{queryName}&quot; + your industry near{' '}
            <strong className="text-ink">{city.split(',')[0]}</strong>. Try the full name as it appears on Google
            (e.g. <strong className="text-ink">Insectica Pest Control Inc</strong>) or a more specific neighbourhood.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={onBack}>
              ← Edit search
            </button>
            <button type="button" className="btn-primary" onClick={onSkip}>
              Run scan without a matched listing
            </button>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-8 flex flex-col gap-3" role="listbox" aria-label="Google Maps listings">
            {candidates.map((c) => {
              const selected = selectedPlaceId === c.placeId
              return (
                <li key={c.placeId}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelect(c.placeId)}
                    className={`w-full rounded-sm border px-4 py-4 text-left transition-colors ${
                      selected
                        ? 'border-oxblood bg-oxblood/8 ring-1 ring-oxblood/30'
                        : 'border-ink/12 bg-cream-50 hover:border-oxblood/40'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink">{c.name}</p>
                        <p className="mt-1 text-sm text-ink-600 leading-snug">{c.address || 'Address not listed'}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {c.rating ? (
                          <p className="text-sm font-semibold text-gold">★ {c.rating}</p>
                        ) : (
                          <p className="text-sm text-ink-400">No rating</p>
                        )}
                        <p className="font-mono text-[10px] text-ink-400">{c.reviewCount} reviews</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-sm border border-ink/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink-500">
                        {MATCH_LABELS[c.matchLabel]}
                      </span>
                      {c.mapsUri ? (
                        <a
                          href={c.mapsUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] uppercase tracking-wider text-oxblood underline underline-offset-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on Maps ↗
                        </a>
                      ) : null}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="btn-secondary" onClick={onBack}>
              ← Edit search
            </button>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-secondary text-sm" onClick={onSkip}>
                None of these
              </button>
              <button
                type="button"
                className="btn-primary min-w-[200px] disabled:opacity-50"
                disabled={!selectedPlaceId}
                onClick={onConfirm}
              >
                Run scan on this listing →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
