/**
 * Sync approved markdown from stratezik-agents into verbatim TS body exports.
 * Usage: node scripts/sync-verbatim-blog-from-approved.mjs [file...]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const APPROVED_ROOT =
  process.env.STRATEZIK_APPROVED_CONTENT ??
  '/Users/siddiquesfamily/Desktop/Ideas/Stratezik AI Agent/stratezik-agents/content/approved'

const TARGETS = [
  {
    source: 'toronto-ai-citation-tracker-2026-07.md',
    exportName: 'TORONTO_AI_CITATION_TRACKER_JULY_2026_VERBATIM_BODY',
    outFile: 'src/blog/verbatim/torontoAiCitationTrackerJuly2026Body.ts',
  },
  {
    source: 'toronto-chatgpt-ads-index-2026.md',
    exportName: 'TORONTO_CHATGPT_ADS_INDEX_VERBATIM_BODY',
    outFile: 'src/blog/verbatim/torontoChatgptAdsIndexBody.ts',
  },
]

function extractBody(md) {
  const lines = md.split('\n')
  let i = 0
  if (lines[0]?.trim() === '---') {
    i = 1
    while (i < lines.length && lines[i].trim() !== '---') i++
    i++
  }
  while (i < lines.length && !/^#\s/.test(lines[i])) i++
  i++
  while (i < lines.length && lines[i].trim() === '') i++
  return lines.slice(i).join('\n').trimEnd()
}

function escapeForTemplateLiteral(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

function syncTarget({ source, exportName, outFile }) {
  const sourcePath = path.join(APPROVED_ROOT, source)
  const md = fs.readFileSync(sourcePath, 'utf8')
  const body = extractBody(md)
  const outPath = path.join(rootDir, outFile)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  const ts = `/** Verbatim body from approved ${source} — do not edit by hand. Regenerate: npm run sync:verbatim-blog */\nexport const ${exportName} = \`${escapeForTemplateLiteral(body)}\`\n`
  fs.writeFileSync(outPath, ts, 'utf8')
  console.log(`[sync] ${source} → ${outFile} (${body.length} chars)`)
}

const requested = process.argv.slice(2)
const targets = requested.length
  ? TARGETS.filter((t) => requested.some((arg) => t.source.includes(arg) || t.outFile.includes(arg)))
  : TARGETS

if (targets.length === 0) {
  console.error('[sync] No matching targets for:', requested.join(', '))
  process.exit(1)
}

for (const target of targets) {
  syncTarget(target)
}
