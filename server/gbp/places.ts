/** Google Places API (New) — Text Search for GBP audit data. */

export type PlaceReview = { rating: number | null; text: string; relativeTime: string }

export type PlaceSummary = {
  placeId: string
  name: string
  formattedAddress: string
  rating: number | null
  reviewCount: number
  photoCount: number
  types: string[]
  website: string | null
  hasHours: boolean
  businessStatus: string | null
  mapsUri: string | null
  // Enriched via Place Details (New). Undefined until/unless details are fetched.
  primaryTypeName?: string | null
  categoryCount?: number
  hasDescription?: boolean
  hasPhone?: boolean
  attributeCount?: number
  reviews?: PlaceReview[]
}

const FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.types',
  'places.photos',
  'places.websiteUri',
  'places.regularOpeningHours',
  'places.businessStatus',
  'places.googleMapsUri',
].join(',')

// Place Details (New): single-place field mask is NOT prefixed with `places.`.
const DETAILS_FIELD_MASK = [
  'id',
  'rating',
  'userRatingCount',
  'types',
  'primaryTypeDisplayName',
  'editorialSummary',
  'nationalPhoneNumber',
  'accessibilityOptions',
  'paymentOptions',
  'reviews',
].join(',')

function apiKey(): string | null {
  return (
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    null
  )
}

function countTrue(obj: unknown): number {
  if (!obj || typeof obj !== 'object') return 0
  return Object.values(obj as Record<string, unknown>).filter((v) => v === true).length
}

function mapPlace(raw: Record<string, unknown>): PlaceSummary {
  const displayName = raw.displayName as { text?: string } | undefined
  const photos = raw.photos as unknown[] | undefined
  const hours = raw.regularOpeningHours as { periods?: unknown[] } | undefined
  return {
    placeId: String(raw.id ?? ''),
    name: displayName?.text ?? 'Unknown',
    formattedAddress: String(raw.formattedAddress ?? ''),
    rating: typeof raw.rating === 'number' ? raw.rating : null,
    reviewCount: typeof raw.userRatingCount === 'number' ? raw.userRatingCount : 0,
    photoCount: Array.isArray(photos) ? photos.length : 0,
    types: Array.isArray(raw.types) ? raw.types.map(String) : [],
    website: typeof raw.websiteUri === 'string' ? raw.websiteUri : null,
    hasHours: Boolean(hours?.periods?.length),
    businessStatus: typeof raw.businessStatus === 'string' ? raw.businessStatus : null,
    mapsUri: typeof raw.googleMapsUri === 'string' ? raw.googleMapsUri : null,
  }
}

export async function searchPlaces(
  textQuery: string,
  maxResultCount = 10,
): Promise<PlaceSummary[] | null> {
  const key = apiKey()
  if (!key) return null

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': FIELD_MASK,
      },
      body: JSON.stringify({ textQuery, maxResultCount }),
      signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) {
      console.error('[gbp/places] searchText failed', res.status, await res.text())
      return null
    }
    const data = (await res.json()) as { places?: Record<string, unknown>[] }
    return (data.places ?? []).map(mapPlace)
  } catch (err) {
    console.error('[gbp/places] searchText error:', err)
    return null
  }
}

/**
 * Place Details (New) for one place. Returns the real, differentiating signals
 * Text Search omits: full category list, whether a description/phone is set,
 * attribute count, and up to 5 review snippets. Best-effort: returns null on
 * any failure so the scan falls back to Text Search data.
 */
export async function fetchPlaceDetails(placeId: string): Promise<Partial<PlaceSummary> | null> {
  const key = apiKey()
  if (!key || !placeId) return null

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': DETAILS_FIELD_MASK,
      },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
      console.error('[gbp/places] details failed', placeId, res.status, await res.text())
      return null
    }
    const raw = (await res.json()) as Record<string, unknown>

    const types = Array.isArray(raw.types) ? raw.types.map(String) : []
    const editorial = raw.editorialSummary as { text?: string } | undefined
    const primaryType = raw.primaryTypeDisplayName as { text?: string } | undefined
    const rawReviews = Array.isArray(raw.reviews) ? (raw.reviews as Record<string, unknown>[]) : []

    const reviews: PlaceReview[] = rawReviews.slice(0, 5).map((r) => {
      const t = r.text as { text?: string } | undefined
      return {
        rating: typeof r.rating === 'number' ? r.rating : null,
        text: (t?.text ?? '').slice(0, 600),
        relativeTime: typeof r.relativePublishTimeDescription === 'string' ? r.relativePublishTimeDescription : '',
      }
    })

    return {
      rating: typeof raw.rating === 'number' ? raw.rating : null,
      reviewCount: typeof raw.userRatingCount === 'number' ? raw.userRatingCount : 0,
      types,
      categoryCount: types.length,
      primaryTypeName: primaryType?.text ?? null,
      hasDescription: Boolean(editorial?.text),
      hasPhone: typeof raw.nationalPhoneNumber === 'string' && raw.nationalPhoneNumber.length > 0,
      attributeCount: countTrue(raw.accessibilityOptions) + countTrue(raw.paymentOptions),
      reviews,
    }
  } catch (err) {
    console.error('[gbp/places] details error:', placeId, err)
    return null
  }
}

export function placesConfigured(): boolean {
  return Boolean(apiKey())
}
