import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { runAeoScan, normaliseDomain, BENCHMARK, type AeoScanResult } from './api/lib/aeo/scan'
import { rateLimit, clientIp } from './api/lib/aeo/rate-limit'
import { createAdminClient } from './api/lib/aeo/supabase-admin'
import { sendReportEmail } from './api/lib/aeo/email'
import { handleGuideLead, handleGuideAccess } from './server/cheatsheet/handlers'

const CACHE_HOURS = 24
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function readJsonBody(req: import('http').IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch {
        reject(new Error('invalid json'))
      }
    })
    req.on('error', reject)
  })
}

function sendJson(
  res: import('http').ServerResponse,
  status: number,
  body: unknown
): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

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

/** Dev-only: serve /api/aeo-* locally (Vite has no serverless runtime). */
export function aeoDevApiPlugin(): Plugin {
  return {
    name: 'aeo-dev-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir ?? process.cwd(), '')
      for (const [key, value] of Object.entries(env)) {
        if (value && !process.env[key]) process.env[key] = value
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? ''

        if (url.startsWith('/api/guide-lead') && req.method === 'POST') {
          try {
            const body = await readJsonBody(req)
            const pseudoReq = {
              method: 'POST',
              body,
              headers: req.headers,
              query: {},
            } as unknown as import('@vercel/node').VercelRequest
            const pseudoRes = {
              status(code: number) {
                res.statusCode = code
                return this
              },
              json(payload: unknown) {
                sendJson(res, res.statusCode || 200, payload)
              },
            } as unknown as import('@vercel/node').VercelResponse
            await handleGuideLead(pseudoReq, pseudoRes)
            return
          } catch (err) {
            console.error('[guide-lead:dev]', err)
            return sendJson(res, 500, { error: 'Server error' })
          }
        }

        if (url.startsWith('/api/guide-access') && req.method === 'GET') {
          try {
            const k = new URL(url, 'http://localhost').searchParams.get('k') ?? ''
            const pseudoReq = {
              method: 'GET',
              query: { k },
              headers: req.headers,
            } as unknown as import('@vercel/node').VercelRequest
            const pseudoRes = {
              status(code: number) {
                res.statusCode = code
                return this
              },
              json(payload: unknown) {
                sendJson(res, res.statusCode || 200, payload)
              },
            } as unknown as import('@vercel/node').VercelResponse
            await handleGuideAccess(pseudoReq, pseudoRes)
            return
          } catch (err) {
            console.error('[guide-access:dev]', err)
            return sendJson(res, 500, { error: 'Server error' })
          }
        }

        if (!url.startsWith('/api/aeo-')) {
          return next()
        }

        const pseudoReq = new Request(`http://localhost${url}`, {
          method: req.method,
          headers: Object.fromEntries(
            Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v ?? '')])
          ),
        })

        try {
          if (url.startsWith('/api/aeo-check') && req.method === 'POST') {
            const ip = clientIp(pseudoReq)
            if (!rateLimit(`scan:${ip}`, 5, 60 * 60 * 1000)) {
              return sendJson(res, 429, { error: 'Too many scans from this address. Try again in an hour.' })
            }

            const body = (await readJsonBody(req)) as { url?: unknown }
            const domain = typeof body.url === 'string' ? normaliseDomain(body.url) : null
            if (!domain) {
              return sendJson(res, 400, {
                error: 'That doesn’t look like a valid website address. Try something like "example.com".',
              })
            }

            let supabase
            try {
              supabase = createAdminClient()
            } catch {
              return sendJson(res, 503, { error: 'Scanner is not configured yet. Add .env.local with Supabase keys.' })
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
              return sendJson(res, 200, topline(cached.result as AeoScanResult, cached.id))
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
              console.error('[aeo-check:dev]', insertError)
              return sendJson(res, 500, { error: 'Something went wrong storing your scan. Try again.' })
            }

            return sendJson(res, 200, topline(scan, inserted.id))
          }

          if (url.startsWith('/api/aeo-lead') && req.method === 'POST') {
            const ip = clientIp(pseudoReq)
            if (!rateLimit(`lead:${ip}`, 10, 60 * 60 * 1000)) {
              return sendJson(res, 429, { error: 'Too many requests. Try again later.' })
            }

            const body = (await readJsonBody(req)) as {
              scanId?: unknown
              email?: unknown
              name?: unknown
              consent?: unknown
              source?: unknown
            }
            const scanId = typeof body.scanId === 'string' ? body.scanId : ''
            const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
            const name = typeof body.name === 'string' ? body.name.trim().slice(0, 100) : undefined
            const consent = body.consent === true
            const source = typeof body.source === 'string' ? body.source.trim().slice(0, 120) : null

            if (!scanId || !EMAIL_RE.test(email)) {
              return sendJson(res, 400, { error: 'A valid email is required.' })
            }
            if (!consent) {
              return sendJson(res, 400, {
                error:
                  'Please tick the consent box so we can email you the report (Canadian anti-spam law requires it).',
              })
            }
            if (!rateLimit(`lead-email:${email}`, 5, 24 * 60 * 60 * 1000)) {
              return sendJson(res, 429, { error: 'Too many reports requested for this email today.' })
            }

            let supabase
            try {
              supabase = createAdminClient()
            } catch {
              return sendJson(res, 503, { error: 'Lead capture is not configured yet. Add .env.local with Supabase keys.' })
            }

            const { data: scanRow } = await supabase
              .from('aeo_scans')
              .select('id, domain, total, result')
              .eq('id', scanId)
              .maybeSingle()

            if (!scanRow) {
              return sendJson(res, 404, { error: 'Scan not found — run the check again.' })
            }

            const scan = scanRow.result as AeoScanResult
            const { error: leadError } = await supabase.from('aeo_leads').insert({
              email,
              name: name || null,
              domain: scanRow.domain,
              scan_id: scanRow.id,
              score: scanRow.total,
              sub_scores: Object.fromEntries(scan.criteria.map((c) => [c.key, c.score])),
              consent,
              source: typeof body.source === 'string' ? body.source.trim().slice(0, 120) : null,
            })
            if (leadError) {
              console.error('[aeo-lead:dev]', leadError)
              return sendJson(res, 500, { error: 'Something went wrong. Try again.' })
            }

            void appendAeoLeadToSheet({
              email,
              name,
              domain: scanRow.domain,
              score: scanRow.total,
              source,
              consent,
              groupAPct: scan.groupA.pct,
              groupBPct: scan.groupB.pct,
            })

            const emailResult = await sendReportEmail(email, scan, name)
            return sendJson(res, 200, { criteria: scan.criteria, emailSent: emailResult.sent })
          }

          if (url.startsWith('/api/aeo-checkout') && req.method === 'POST') {
            return sendJson(res, 503, { error: 'Stripe checkout runs on Vercel preview/production. Deploy or use stratezik-web locally for paid flow testing.' })
          }
          if (
            (url.startsWith('/api/aeo-unlock') ||
              url.startsWith('/api/aeo-sitemap-unlock') ||
              url.startsWith('/api/aeo-sitemap')) &&
            req.method === 'POST'
          ) {
            return sendJson(res, 503, { error: 'Paid unlock routes require Vercel deployment (long-running serverless).' })
          }

          return sendJson(res, 405, { error: 'Method not allowed' })
        } catch (err) {
          console.error('[aeo-dev-api]', err)
          return sendJson(res, 500, { error: 'Server error' })
        }
      })
    },
  }
}
