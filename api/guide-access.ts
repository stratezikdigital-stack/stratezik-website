import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleGuideAccess } from './lib/cheatsheet/handlers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  return handleGuideAccess(req, res)
}
