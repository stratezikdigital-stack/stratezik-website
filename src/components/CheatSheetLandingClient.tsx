import guideRaw from '../../content/chatgpt-ads-cheat-sheet-2026.md?raw'
import { parseGuideFromRaw } from '../cheatsheet/guideParser'
import { CheatSheetLanding } from './cheatsheet/CheatSheetLanding'

const peek = parseGuideFromRaw(guideRaw).peek

export default function CheatSheetLandingClient() {
  return <CheatSheetLanding peek={peek} />
}
