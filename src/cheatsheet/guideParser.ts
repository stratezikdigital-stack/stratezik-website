// Shared markdown parse/split for the ChatGPT Ads Cheat Sheet funnel.
// Used by the landing peek (client), guide view (client), and API handlers (server).

export interface GuideMeta {
  title: string
  metaDescription: string
  author: string
  authorLinkedin: string
  date: string
}

export interface LoadedGuide {
  meta: GuideMeta
  body: string
  peek: string
}

export interface GuideParts {
  before: string
  sectionIntro: string
  closing: string
  after: string
}

export function parseFrontmatter(raw: string): { meta: GuideMeta; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  const fm: Record<string, string> = {}
  if (match) {
    for (const line of match[1].split('\n')) {
      const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/)
      if (m) fm[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
  const body = match ? raw.slice(match[0].length) : raw
  return {
    meta: {
      title: fm.title || 'The ChatGPT Ads Cheat Sheet',
      metaDescription: fm.meta_description || '',
      author: fm.author || 'Shah Md. Rifat',
      authorLinkedin: fm.author_linkedin || '',
      date: fm.date || '',
    },
    body: body.trim(),
  }
}

function sliceSection(body: string, fromNum: number, toNum: number | null): string {
  const startRe = new RegExp(`(^|\\n)## ${fromNum}\\. `)
  const start = body.search(startRe)
  if (start === -1) return ''
  const fromIdx = body[start] === '\n' ? start + 1 : start
  const rest = body.slice(fromIdx)
  if (toNum === null) {
    const next = rest.slice(3).search(/\n## /)
    return next === -1 ? rest : rest.slice(0, next + 3)
  }
  const endRe = new RegExp(`\\n## ${toNum}\\. `)
  const end = rest.search(endRe)
  return end === -1 ? rest : rest.slice(0, end)
}

export function buildPeek(body: string): string {
  const firstSection = body.search(/\n## 1\. /)
  const lead = firstSection === -1 ? body : body.slice(0, firstSection).trim()
  const section1 = sliceSection(body, 1, 2).trim()
  const section3 = sliceSection(body, 3, 4).trim()
  return [lead, section1, section3].filter(Boolean).join('\n\n')
}

export function splitAtIndustries(body: string): GuideParts {
  const s10 = body.search(/\n## 10\. /)
  const s11 = body.search(/\n## 11\. /)
  if (s10 === -1 || s11 === -1) return { before: body, sectionIntro: '', closing: '', after: '' }

  const before = body.slice(0, s10).trim()
  const block = body.slice(s10, s11)
  const after = body.slice(s11).trim()

  const firstSub = block.search(/\n### /)
  const sectionIntro = (firstSub === -1 ? block : block.slice(0, firstSub))
    .replace(/\n?> \*\*Interactive on the live page:\*\*[^\n]*\n/, '\n')
    .trim()

  const closingMatch = block.match(/\*\*Small business generally[\s\S]*$/)
  const closing = closingMatch ? closingMatch[0].trim() : ''

  return { before, sectionIntro, closing, after }
}

export function parseGuideFromRaw(raw: string): LoadedGuide {
  const { meta, body } = parseFrontmatter(raw)
  return { meta, body, peek: buildPeek(body) }
}
