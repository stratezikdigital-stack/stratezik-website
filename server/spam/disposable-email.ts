/** High-volume disposable / throwaway domains — not exhaustive, blocks obvious bot signups. */
const BLOCKED_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'sharklasers.com',
  'grr.la',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'tempmail.com',
  'temp-mail.org',
  'throwaway.email',
  'yopmail.com',
  'yopmail.fr',
  'trashmail.com',
  'getnada.com',
  'maildrop.cc',
  'dispostable.com',
  '10minutemail.com',
  'fakeinbox.com',
  'mailnesia.com',
  'tempail.com',
  'emailondeck.com',
])

export function isDisposableEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false
  return BLOCKED_DOMAINS.has(domain)
}
