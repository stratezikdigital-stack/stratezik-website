export type AeoCriterion = { label: string; score: number; max: number; group: 'A' | 'B' }

export const AEO_SAMPLE = {
  domain: 'yourcompany.com',
  total: 12.5,
  max: 20,
  benchmark: 10.75,
  groupA: { earned: 7.1, possible: 7.5, pct: 95 },
  groupB: { earned: 5.4, possible: 12.5, pct: 43 },
  crawlers: { allowed: 6, blocked: 2, total: 8 },
  trend: [8.2, 9.1, 10.0, 11.2, 12.5],
  criteria: [
    { label: 'AI crawler access', score: 2, max: 2, group: 'A' },
    { label: 'Raw HTML readability', score: 1.5, max: 2, group: 'A' },
    { label: 'Organization schema', score: 1, max: 2, group: 'A' },
    { label: 'FAQPage schema', score: 0, max: 2, group: 'B' },
    { label: 'Answer-first copy', score: 1.5, max: 2, group: 'B' },
    { label: 'llms.txt present', score: 0, max: 1, group: 'B' },
  ] as AeoCriterion[],
  bots: [
    { name: 'GPTBot', allowed: true },
    { name: 'ClaudeBot', allowed: true },
    { name: 'Google-Extended', allowed: true },
    { name: 'PerplexityBot', allowed: false },
    { name: 'Bytespider', allowed: true },
    { name: 'CCBot', allowed: true },
    { name: 'Amazonbot', allowed: false },
    { name: 'meta-external', allowed: true },
  ],
  competitors: [
    { domain: 'competitor-a.com', score: 15.0 },
    { domain: 'competitor-b.com', score: 11.25 },
    { domain: 'yourcompany.com', score: 12.5, you: true },
  ],
  fixPreview: {
    page: '/pricing',
    issue: 'FAQPage schema missing',
    fix: 'Add FAQPage JSON-LD; move tier comparison into a table AI can quote.',
  },
}
