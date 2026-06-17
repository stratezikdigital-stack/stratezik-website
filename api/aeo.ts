import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  handleCheck,
  handleCheckout,
  handleLead,
  handleSitemap,
  handleSitemapUnlock,
  handleUnlock,
} from '../server/aeo/handlers.js'
import { handleContact, handleFormToken, handleGrowthCredit } from '../server/forms/handlers.js'
import { handleGuideAccess, handleGuideLead } from '../server/cheatsheet/handlers.js'

/** Map legacy /api/aeo-* paths and ?action= query to a single handler key. */
function resolveAction(req: VercelRequest): string | null {
  const q = req.query.action
  if (typeof q === 'string' && q) return q

  const path = (req.url ?? '').split('?')[0]
  const legacy: Record<string, string> = {
    '/api/aeo-check': 'check',
    '/api/aeo-lead': 'lead',
    '/api/aeo-checkout': 'checkout',
    '/api/aeo-unlock': 'unlock',
    '/api/aeo-sitemap': 'sitemap',
    '/api/aeo-sitemap-unlock': 'sitemap-unlock',
    '/api/guide-lead': 'guide-lead',
    '/api/guide-access': 'guide-access',
    '/api/form-token': 'form-token',
    '/api/contact': 'contact',
    '/api/growth-credit': 'growth-credit',
  }
  return legacy[path] ?? null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = resolveAction(req)

  if (action === 'form-token' && req.method === 'GET') {
    return handleFormToken(req, res)
  }
  if (action === 'guide-access' && req.method === 'GET') {
    return handleGuideAccess(req, res)
  }
  if (action === 'guide-lead' && req.method === 'POST') {
    return handleGuideLead(req, res)
  }
  if (action === 'contact' && req.method === 'POST') {
    return handleContact(req, res)
  }
  if (action === 'growth-credit' && req.method === 'POST') {
    return handleGrowthCredit(req, res)
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  switch (action) {
    case 'check':
      return handleCheck(req, res)
    case 'lead':
      return handleLead(req, res)
    case 'checkout':
      return handleCheckout(req, res)
    case 'unlock':
      return handleUnlock(req, res)
    case 'sitemap':
      return handleSitemap(req, res)
    case 'sitemap-unlock':
      return handleSitemapUnlock(req, res)
    default:
      return res.status(404).json({ error: 'Unknown AEO action.' })
  }
}
