export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (!secret) {
    // Local dev without keys — rely on honeypot + rate limits.
    return process.env.VERCEL_ENV !== 'production'
  }

  if (!token) return false

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
  })

  if (!res.ok) return false
  const data = (await res.json()) as { success?: boolean }
  return data.success === true
}

export function turnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY?.trim())
}
