import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildPeek, parseFrontmatter } from '../src/cheatsheet/guideParser'
import type { PrerenderBodies } from '../src/prerender/PrerenderBodiesContext'

const contentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/services/content',
)
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function readMd(filename: string): string {
  return fs.readFileSync(path.join(contentDir, filename), 'utf8')
}

function loadCheatSheetPeek(): string {
  const raw = fs.readFileSync(
    path.join(repoRoot, 'content', 'chatgpt-ads-cheat-sheet-2026.md'),
    'utf8',
  )
  const { body } = parseFrontmatter(raw)
  return buildPeek(body)
}

/** Node-readable service markdown (mirrors serviceContent.ts keys). */
export function loadPrerenderServiceBodies(): PrerenderBodies {
  return {
    servicesHub: readMd('services-hub.md'),
    cheatSheetPeek: loadCheatSheetPeek(),
    serviceBodies: {
      'paid-search': readMd('paid-search.md'),
      'paid-social': readMd('paid-social.md'),
      'seo-aeo': readMd('seo-aeo.md'),
      'google-business-profile': readMd('google-business-profile.md'),
      'social-media-marketing': readMd('social-media-marketing.md'),
      'brand-strategy': readMd('brand-strategy.md'),
      'web-design': readMd('web-design.md'),
      'ai-agents': readMd('ai-agents.md'),
    },
    serviceChildBodies: {
      'paid-search/google-ads': readMd('paid-search-google-ads.md'),
      'paid-search/microsoft-ads': readMd('paid-search-microsoft-ads.md'),
      'paid-social/meta-ads': readMd('paid-social-meta-ads.md'),
      'paid-social/linkedin-ads': readMd('paid-social-linkedin-ads.md'),
      'paid-social/tiktok-ads': readMd('paid-social-tiktok-ads.md'),
      'seo-aeo/technical-seo': readMd('seo-aeo-technical-seo.md'),
      'seo-aeo/local-seo': readMd('seo-aeo-local-seo.md'),
      'seo-aeo/answer-engine-optimization': readMd('seo-aeo-answer-engine-optimization.md'),
      'web-design/landing-pages': readMd('web-design-landing-pages.md'),
      'web-design/website-design': readMd('web-design-website-design.md'),
      'ai-agents/ai-strategy': readMd('ai-agents-ai-strategy.md'),
      'ai-agents/agent-development': readMd('ai-agents-agent-development.md'),
    },
  }
}
