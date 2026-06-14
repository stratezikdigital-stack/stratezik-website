import type { VercelRequest, VercelResponse } from '@vercel/node'
import { normaliseDomain } from './lib/aeo/scan.js'
import { runSitemapAudit } from './lib/aeo/sitemap.js'
import { rateLimit, clientIp } from './lib/aeo/rate-limit.js'

const MAX_PAGES = 25

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = clientIp(req)
  if (!rateLimit(`sitemap:${ip}`, 3, 60 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many full-site audits from this address. Try again in an hour.' })
  }

  const body = (req.body ?? {}) as { url?: unknown }
  const domain = typeof body.url === 'string' ? normaliseDomain(body.url) : null
  if (!domain) {
    return res.status(400).json({ error: 'That doesn’t look like a valid website address.' })
  }

  const audit = await runSitemapAudit(domain, { maxPages: MAX_PAGES })
  if (!audit.sitemapFound) {
    return res.status(404).json({
      error:
        'We couldn’t find a sitemap.xml for this domain. Add one (most frameworks generate it automatically) so AI crawlers can discover all your pages — that’s itself an AEO fix.',
    })
  }
  return res.status(200).json({ audit })
}
