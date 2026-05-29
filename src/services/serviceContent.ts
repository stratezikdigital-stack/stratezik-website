// Browser-only: raw markdown bodies imported via Vite `?raw`.
// Kept separate from services.ts so the Node build script (postbuild-seo)
// can import service metadata without resolving Vite-specific imports.
import hubBody from './content/services-hub.md?raw'
import paidSearchBody from './content/paid-search.md?raw'
import paidSocialBody from './content/paid-social.md?raw'
import seoAeoBody from './content/seo-aeo.md?raw'
import gbpBody from './content/google-business-profile.md?raw'
import socialBody from './content/social-media-marketing.md?raw'
import brandBody from './content/brand-strategy.md?raw'
import webDesignBody from './content/web-design.md?raw'
import aiAgentsBody from './content/ai-agents.md?raw'

export const servicesHubBody = hubBody

export const serviceBodies: Record<string, string> = {
  'paid-search': paidSearchBody,
  'paid-social': paidSocialBody,
  'seo-aeo': seoAeoBody,
  'google-business-profile': gbpBody,
  'social-media-marketing': socialBody,
  'brand-strategy': brandBody,
  'web-design': webDesignBody,
  'ai-agents': aiAgentsBody,
}
