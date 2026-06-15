/**
 * Deployed Google Apps Script web app URL for Growth Credit leads
 * (google-apps-script-growth-credit.js → "Marketing Credit" sheet tab).
 *
 * Set VITE_GROWTH_CREDIT_WEBHOOK_URL in Vercel and .env.local after deploying the script.
 */
const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : ({} as ImportMetaEnv)

export const GROWTH_CREDIT_WEBHOOK_URL = (env.VITE_GROWTH_CREDIT_WEBHOOK_URL ?? '').trim()
