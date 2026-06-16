import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parseGuideFromRaw, type LoadedGuide } from '../../../src/cheatsheet/guideParser.js'

export { splitAtIndustries } from '../../../src/cheatsheet/guideParser.js'

let cache: LoadedGuide | null = null

export async function loadGuide(): Promise<LoadedGuide> {
  if (cache) return cache
  const raw = await readFile(join(process.cwd(), 'content', 'chatgpt-ads-cheat-sheet-2026.md'), 'utf8')
  cache = parseGuideFromRaw(raw)
  return cache
}
