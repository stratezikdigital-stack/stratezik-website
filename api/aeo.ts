import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  handleCheck,
  handleCheckout,
  handleLead,
  handleScanQuota,
  handleSitemap,
  handleSitemapUnlock,
  handleUnlock,
} from '../server/aeo/handlers.js'
import { handleContact, handleFormToken, handleGrowthCredit, handleSurvey } from '../server/forms/handlers.js'
import { handleGuideAccess, handleGuideLead } from '../server/cheatsheet/handlers.js'
import { reconcilePaidOrders } from '../server/payments/orders.js'

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
    '/api/aeo-quota': 'quota',
    '/api/guide-lead': 'guide-lead',
    '/api/guide-access': 'guide-access',
    '/api/form-token': 'form-token',
    '/api/contact': 'contact',
    '/api/growth-credit': 'growth-credit',
    '/api/survey': 'survey',
  }
  return legacy[path] ?? null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = resolveAction(req)

  if (action === 'reconcile-orders' && req.method === 'GET') {
    const secret = process.env.CRON_SECRET?.trim()
    if (secret && req.headers.authorization !== `Bearer ${secret}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const alerted = await reconcilePaidOrders()
    return res.status(200).json({ ok: true, alerted })
  }
  if (action === 'form-token' && req.method === 'GET') {
    return handleFormToken(req, res)
  }
  if (action === 'quota' && req.method === 'GET') {
    return handleScanQuota(req, res)
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
  if (action === 'survey' && req.method === 'POST') {
    return handleSurvey(req, res)
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
