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

import googleAdsBody from './content/paid-search-google-ads.md?raw'
import microsoftAdsBody from './content/paid-search-microsoft-ads.md?raw'
import metaAdsBody from './content/paid-social-meta-ads.md?raw'
import linkedinAdsBody from './content/paid-social-linkedin-ads.md?raw'
import tiktokAdsBody from './content/paid-social-tiktok-ads.md?raw'
import technicalSeoBody from './content/seo-aeo-technical-seo.md?raw'
import localSeoBody from './content/seo-aeo-local-seo.md?raw'
import aeoBody from './content/seo-aeo-answer-engine-optimization.md?raw'
import landingPagesBody from './content/web-design-landing-pages.md?raw'
import websiteDesignBody from './content/web-design-website-design.md?raw'
import aiStrategyBody from './content/ai-agents-ai-strategy.md?raw'
import agentDevelopmentBody from './content/ai-agents-agent-development.md?raw'

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

// Keyed by `${parentSlug}/${childSlug}`.
export const serviceChildBodies: Record<string, string> = {
  'paid-search/google-ads': googleAdsBody,
  'paid-search/microsoft-ads': microsoftAdsBody,
  'paid-social/meta-ads': metaAdsBody,
  'paid-social/linkedin-ads': linkedinAdsBody,
  'paid-social/tiktok-ads': tiktokAdsBody,
  'seo-aeo/technical-seo': technicalSeoBody,
  'seo-aeo/local-seo': localSeoBody,
  'seo-aeo/answer-engine-optimization': aeoBody,
  'web-design/landing-pages': landingPagesBody,
  'web-design/website-design': websiteDesignBody,
  'ai-agents/ai-strategy': aiStrategyBody,
  'ai-agents/agent-development': agentDevelopmentBody,
}
