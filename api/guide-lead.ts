import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleGuideLead } from './lib/cheatsheet/handlers.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  return handleGuideLead(req, res)
}
