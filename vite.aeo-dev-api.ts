import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { handleCheck, handleLead } from './server/aeo/handlers'
import { handleContact, handleFormToken, handleGrowthCredit } from './server/forms/handlers'
import { handleGuideLead, handleGuideAccess } from './server/cheatsheet/handlers'

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

function pseudoResponse(res: import('http').ServerResponse): import('@vercel/node').VercelResponse {
  return {
    status(code: number) {
      res.statusCode = code
      return this
    },
    json(payload: unknown) {
      sendJson(res, res.statusCode || 200, payload)
    },
  } as unknown as import('@vercel/node').VercelResponse
}

/** Dev-only: serve /api/* locally (Vite has no serverless runtime). */
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
        if (!url.startsWith('/api/')) return next()

        try {
          if (url.startsWith('/api/form-token') && req.method === 'GET') {
            await handleFormToken(
              { method: 'GET', headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/contact') && req.method === 'POST') {
            const body = await readJsonBody(req)
            await handleContact(
              { method: 'POST', body, headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/growth-credit') && req.method === 'POST') {
            const body = await readJsonBody(req)
            await handleGrowthCredit(
              { method: 'POST', body, headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/guide-lead') && req.method === 'POST') {
            const body = await readJsonBody(req)
            await handleGuideLead(
              { method: 'POST', body, headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/guide-access') && req.method === 'GET') {
            const k = new URL(url, 'http://localhost').searchParams.get('k') ?? ''
            await handleGuideAccess(
              { method: 'GET', query: { k }, headers: req.headers } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/aeo-check') && req.method === 'POST') {
            const body = await readJsonBody(req)
            await handleCheck(
              { method: 'POST', body, headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/aeo-lead') && req.method === 'POST') {
            const body = await readJsonBody(req)
            await handleLead(
              { method: 'POST', body, headers: req.headers, query: {} } as import('@vercel/node').VercelRequest,
              pseudoResponse(res),
            )
            return
          }

          if (url.startsWith('/api/aeo-checkout') && req.method === 'POST') {
            return sendJson(res, 503, {
              error: 'Stripe checkout runs on Vercel preview/production. Deploy or use stratezik-web locally for paid flow testing.',
            })
          }

          if (
            (url.startsWith('/api/aeo-unlock') ||
              url.startsWith('/api/aeo-sitemap-unlock') ||
              url.startsWith('/api/aeo-sitemap')) &&
            req.method === 'POST'
          ) {
            return sendJson(res, 503, {
              error: 'Paid unlock routes require Vercel deployment (long-running serverless).',
            })
          }

          return sendJson(res, 404, { error: 'Unknown API route' })
        } catch (err) {
          console.error('[aeo-dev-api]', err)
          return sendJson(res, 500, { error: 'Server error' })
        }
      })
    },
  }
}
