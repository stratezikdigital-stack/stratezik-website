// Lightweight, dependency-free "did you mean?" email typo detector (mailcheck-style).
// Catches the common fat-finger domain/TLD mistakes (gmial.com, hotnail.com,
// example.cmo, .con, .comm) and suggests the corrected address. It NEVER blocks
// submission — it only offers a one-click fix — so a legitimate but unusual
// domain is never rejected.

const POPULAR_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.ca',
  'ymail.com',
  'hotmail.com',
  'hotmail.ca',
  'outlook.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'comcast.net',
  'verizon.net',
  'att.net',
  'rogers.com',
  'bell.net',
  'shaw.ca',
  'sympatico.ca',
]

const POPULAR_TLDS = [
  'com',
  'net',
  'org',
  'io',
  'co',
  'ca',
  'us',
  'edu',
  'gov',
  'info',
  'biz',
  'me',
  'dev',
  'app',
  'co.uk',
  'com.au',
]

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  let curr = new Array(n + 1).fill(0)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost)
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[n]
}

function closest(candidate: string, options: string[], maxDistance: number): string | null {
  let best: string | null = null
  let bestDist = maxDistance + 1
  for (const opt of options) {
    if (opt === candidate) return null // exact match — nothing to suggest
    const d = levenshtein(candidate, opt)
    if (d < bestDist) {
      bestDist = d
      best = opt
    }
  }
  return bestDist <= maxDistance ? best : null
}

/**
 * Returns a suggested corrected email (e.g. "you@gmail.com") when the domain
 * looks like a typo of a popular provider or TLD, otherwise null.
 */
export function suggestEmailCorrection(email: string): string | null {
  const value = email.trim().toLowerCase()
  const at = value.lastIndexOf('@')
  if (at <= 0 || at === value.length - 1) return null

  const local = value.slice(0, at)
  const domain = value.slice(at + 1)
  if (!domain.includes('.')) return null

  // 1) Whole-domain match against popular providers (gmial.com → gmail.com).
  const domainFix = closest(domain, POPULAR_DOMAINS, 2)
  if (domainFix) return `${local}@${domainFix}`

  // 2) TLD-only match (example.cmo → example.com, .con → .com).
  const dot = domain.indexOf('.')
  const sld = domain.slice(0, dot)
  const tld = domain.slice(dot + 1)
  if (!sld) return null
  const tldFix = closest(tld, POPULAR_TLDS, 2)
  if (tldFix && tldFix !== tld) return `${local}@${sld}.${tldFix}`

  return null
}
