import { promises as dns } from 'node:dns'

/**
 * Free, no-API email deliverability check: does the email's domain actually
 * accept mail? We look up MX records (and fall back to A/AAAA, since some hosts
 * receive mail on the domain's address record). This catches typo'd or fake
 * domains like `gmial.com` / `example.cmo` that pass a syntax regex but can
 * never receive a message.
 *
 * Fail-open on transient/unknown DNS errors (timeouts, rate limits) so we never
 * block a real customer because of a flaky lookup — we only reject when the
 * domain definitively does not exist or has no way to receive mail.
 */
export async function isDeliverableEmailDomain(email: string): Promise<boolean> {
  const at = email.lastIndexOf('@')
  if (at === -1) return false
  const domain = email.slice(at + 1).trim().toLowerCase()
  if (!domain || domain.indexOf('.') === -1) return false

  const withTimeout = <T>(p: Promise<T>): Promise<T> =>
    Promise.race([
      p,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('dns-timeout')), 3000),
      ),
    ])

  try {
    const mx = await withTimeout(dns.resolveMx(domain))
    if (Array.isArray(mx) && mx.some((r) => r.exchange && r.exchange.trim())) {
      return true
    }
    // MX resolved but empty — try address records before giving up.
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    // Domain doesn't exist / has no records of this type → check A/AAAA next.
    if (code !== 'ENOTFOUND' && code !== 'ENODATA') {
      // Timeout or unexpected DNS error → don't punish the user.
      return true
    }
  }

  // Fallback: a domain with an A/AAAA record can still accept mail.
  try {
    const addrs = await withTimeout(dns.resolve(domain))
    if (Array.isArray(addrs) && addrs.length > 0) return true
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code
    if (code !== 'ENOTFOUND' && code !== 'ENODATA') return true
  }

  return false
}
