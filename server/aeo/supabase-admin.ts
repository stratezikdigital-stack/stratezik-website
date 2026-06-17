import { createClient } from '@supabase/supabase-js'

// Service-role client for public API routes — aeo_scans and aeo_leads have RLS
// enabled with no policies, so only this client can read/write them.
export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase admin credentials are not configured')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
