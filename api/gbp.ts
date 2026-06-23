import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  handleGbpCheck,
  handleGbpCheckout,
  handleGbpFull,
  handleGbpLead,
  handleGbpUnlock,
} from '../server/gbp/handlers.js'

function resolveAction(req: VercelRequest): string | null {
  const q = req.query.action
  if (typeof q === 'string' && q) return q

  const path = (req.url ?? '').split('?')[0]
  const legacy: Record<string, string> = {
    '/api/gbp-check': 'check',
    '/api/gbp-lead': 'lead',
    '/api/gbp-checkout': 'checkout',
    '/api/gbp-unlock': 'unlock',
    '/api/gbp-full': 'full',
  }
  return legacy[path] ?? null
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = resolveAction(req)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  switch (action) {
    case 'check':
      return handleGbpCheck(req, res)
    case 'lead':
      return handleGbpLead(req, res)
    case 'checkout':
      return handleGbpCheckout(req, res)
    case 'unlock':
      return handleGbpUnlock(req, res)
    case 'full':
      return handleGbpFull(req, res)
    default:
      return res.status(404).json({ error: 'Unknown GBP action.' })
  }
}
