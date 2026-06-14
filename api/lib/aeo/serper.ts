// Serper.dev — real Google SERP results. Used for PAID features only, where its
// ground-truth ranking is the best-fit signal (competitor discovery, real-world
// search presence). The free readiness scan stays on Tavily.

export interface SerperOrganic {
  title: string
  link: string
  snippet: string
  position: number
}

export function serperConfigured(): boolean {
  return Boolean(process.env.SERPER_API_KEY)
}

export async function serperSearch(query: string, num = 10): Promise<SerperOrganic[]> {
  const key = process.env.SERPER_API_KEY
  if (!key) return []
  try {
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query, num }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return []
    const data = (await res.json()) as { organic?: SerperOrganic[] }
    return data.organic ?? []
  } catch {
    return []
  }
}
