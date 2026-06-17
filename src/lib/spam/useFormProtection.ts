import { useCallback, useEffect, useState } from 'react'

const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : ({} as ImportMetaEnv)

const TURNSTILE_SITE_KEY = (env.VITE_TURNSTILE_SITE_KEY ?? '').trim()

export type SpamPayload = {
  formToken: string
  turnstileToken: string
}

/**
 * Fetches a timing token and tracks Turnstile state for protected form submissions.
 */
export function useFormProtection() {
  const [formToken, setFormToken] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [tokenError, setTokenError] = useState(false)

  const refreshFormToken = useCallback(async () => {
    try {
      const res = await fetch('/api/form-token')
      if (!res.ok) throw new Error('token fetch failed')
      const data = (await res.json()) as { token?: string }
      if (!data.token) throw new Error('missing token')
      setFormToken(data.token)
      setTokenError(false)
    } catch {
      setTokenError(true)
    }
  }, [])

  useEffect(() => {
    void refreshFormToken()
  }, [refreshFormToken])

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('')
  }, [])

  const spamPayload = (): SpamPayload => ({
    formToken,
    turnstileToken,
  })

  const canSubmit =
    Boolean(formToken) && !tokenError && (!TURNSTILE_SITE_KEY || Boolean(turnstileToken))

  return {
    turnstileSiteKey: TURNSTILE_SITE_KEY,
    formToken,
    turnstileToken,
    setTurnstileToken,
    honeypot,
    setHoneypot,
    tokenError,
    refreshFormToken,
    resetTurnstile,
    spamPayload,
    turnstileRequired: Boolean(TURNSTILE_SITE_KEY),
    canSubmit,
  }
}
