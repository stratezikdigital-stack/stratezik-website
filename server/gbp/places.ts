/** Google Places API (New) — Text Search for GBP audit data. */

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

function apiKey(): string | null {
  return (
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    null
  )
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

export function placesConfigured(): boolean {
  return Boolean(apiKey())
}
