import { runAeoScan, normaliseDomain, BENCHMARK, type AeoScanResult } from './lib/aeo/scan.js'
import { rateLimit, clientIp } from './lib/aeo/rate-limit.js'
import { createAdminClient } from './lib/aeo/supabase-admin.js'

export const config = {
  runtime: 'nodejs',
  maxDuration: 90,
}

const CACHE_HOURS = 24

function topline(scan: AeoScanResult, scanId: string) {
  return {
    scanId,
    domain: scan.domain,
    total: scan.total,
    scoredCount: scan.scoredCount,
    groupA: scan.groupA,
    groupB: scan.groupB,
    benchmark: BENCHMARK,
    checkedAt: scan.checkedAt,
  }
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  const ip = clientIp(req)
  if (!rateLimit(`scan:${ip}`, 5, 60 * 60 * 1000)) {
    return json({ error: 'Too many scans from this address. Try again in an hour.' }, 429)
  }

  let url: unknown
  try {
    ;({ url } = await req.json())
  } catch {
    return json({ error: 'Invalid request body' }, 400)
  }

  const domain = typeof url === 'string' ? normaliseDomain(url) : null
  if (!domain) {
    return json(
      { error: 'That doesn’t look like a valid website address. Try something like "example.com".' },
      400
    )
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch {
    return json({ error: 'Scanner is not configured yet. Please try again later.' }, 503)
  }

  const since = new Date(Date.now() - CACHE_HOURS * 60 * 60 * 1000).toISOString()
  const { data: cached } = await supabase
    .from('aeo_scans')
    .select('id, result, created_at')
    .eq('domain', domain)
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (cached) {
    return json(topline(cached.result as AeoScanResult, cached.id))
  }

  const scan = await runAeoScan(domain)

  const { data: inserted, error: insertError } = await supabase
    .from('aeo_scans')
    .insert({
      domain,
      total: scan.total === 'unverifiable' ? null : scan.total,
      unverifiable: scan.total === 'unverifiable',
      result: scan,
    })
    .select('id')
    .single()

  if (insertError || !inserted) {
    console.error('[aeo-check] failed to store scan:', insertError)
    return json({ error: 'Something went wrong storing your scan. Try again.' }, 500)
  }

  return json(topline(scan, inserted.id))
}
