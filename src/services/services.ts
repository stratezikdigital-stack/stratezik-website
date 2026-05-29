import type { ServiceDefinition, ServicesHubDefinition } from './serviceTypes'

export const servicesHub: ServicesHubDefinition = {
  slug: 'services',
  title: 'Digital Marketing Services in Toronto | Stratezik',
  metaDescription:
    "Stratezik's digital marketing services in Toronto and Scarborough, built by operators: paid search, paid social, SEO and AEO, brand strategy, web design, and custom AI agents.",
  primaryKeyword: 'digital marketing services Toronto',
  secondaryKeywords: ['Toronto marketing agency', 'Scarborough digital agency', 'GTA marketing services'],
}

/** Parent service pages, in hub display + sitemap order. */
export const services: ServiceDefinition[] = [
  {
    slug: 'paid-search',
    title: 'Google Ads Management in Toronto | Stratezik',
    metaDescription:
      'Toronto Google Ads management from a founder who has run $10M+ in annual spend and holds a Google Search Honours Award. Disciplined paid search that compounds.',
    primaryKeyword: 'Google Ads management Toronto',
    secondaryKeywords: ['paid search Toronto', 'PPC agency Toronto', 'Microsoft Ads Toronto'],
    serviceType: 'Paid search advertising',
    faqEntities: [
      {
        question: 'Should I run Google Ads or Microsoft Ads?',
        answer:
          'Most businesses should start with Google, then add Microsoft when the Google account is mature. Microsoft often has cheaper clicks but lower volume in Canadian markets.',
      },
      {
        question: 'How long until I see results?',
        answer:
          'Search ads start producing data immediately. Real optimisation gains usually appear by the end of month two, with stronger compounding from month three on.',
      },
      {
        question: 'What is the minimum budget?',
        answer:
          'Email us and we will tell you, honestly, whether Google Ads makes sense at your spend level. If it does not, we will say so.',
      },
    ],
  },
  {
    slug: 'paid-social',
    title: 'Paid Social Ads Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto paid social management across Meta, LinkedIn, TikTok, and Pinterest, built around real intent. Strong creative, honest measurement, scalable structure.',
    primaryKeyword: 'paid social ads agency Toronto',
    secondaryKeywords: ['Meta Ads Toronto', 'LinkedIn Ads Toronto', 'Facebook Ads Toronto'],
    serviceType: 'Paid social advertising',
    faqEntities: [
      {
        question: 'Should I run Meta or LinkedIn?',
        answer:
          'Meta for broad consumer demand and most local services. LinkedIn for B2B and higher-deal-size services where the click cost is justified by the eventual contract.',
      },
      {
        question: 'How important is creative?',
        answer:
          'On paid social, creative is most of the campaign. We provide creative direction and briefs and refer to a creative partner for production when needed.',
      },
      {
        question: 'Can you handle TikTok and Pinterest?',
        answer:
          'Yes, where the audience is genuinely there. We do not push a channel that does not fit just to spend budget.',
      },
    ],
  },
  {
    slug: 'seo-aeo',
    title: 'SEO and AEO Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto SEO and AEO services that rank you in Google and get you cited inside ChatGPT, Perplexity, and Google AI Overviews. Position 50 to top 5 in four months.',
    primaryKeyword: 'SEO agency Toronto',
    secondaryKeywords: ['AEO Toronto', 'answer engine optimization Toronto', 'Toronto SEO services'],
    serviceType: 'Search engine and answer engine optimization',
    faqEntities: [
      {
        question: 'Is SEO still worth doing in 2026?',
        answer:
          'Yes, and arguably more than ever. The strongest signal that an AI tool cites a business is its traditional search authority, so SEO is the foundation AI visibility is built on, not a competitor to it.',
      },
      {
        question: 'What is AEO?',
        answer:
          'Answer engine optimisation: structuring your business and content so AI tools like ChatGPT recommend you in their answers. We treat it as the layer that sits on top of solid SEO.',
      },
      {
        question: 'How long until I see results?',
        answer:
          'Meaningful Maps and AI movement typically inside three to four months for local businesses, with compounding gains after that.',
      },
    ],
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile Management in Toronto | Stratezik',
    metaDescription:
      'Toronto Google Business Profile management that drives Maps rankings, calls, and direction requests. Real local result: position 50 to top 5 in four months.',
    primaryKeyword: 'Google Business Profile management Toronto',
    secondaryKeywords: ['GBP management Toronto', 'Google Maps SEO Toronto', 'local SEO Toronto'],
    serviceType: 'Google Business Profile and local SEO',
    faqEntities: [
      {
        question: 'How long until I see Maps movement?',
        answer:
          'Most clients see measurable rank improvement inside 60 to 90 days, with stronger gains by month four.',
      },
      {
        question: 'Do you handle Google review removal?',
        answer:
          'No, that is a legal and Google-policy process we refer out. We handle the response strategy and earning new reviews.',
      },
      {
        question: 'Is GBP separate from SEO?',
        answer:
          'Connected, but different. GBP is the Maps and local pack lever. Full SEO and AEO covers the rest of search. Many clients run both.',
      },
    ],
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing in Toronto | Stratezik',
    metaDescription:
      'Toronto organic social media strategy and execution: LinkedIn and Facebook content calendars, post copy, scheduling, and community management for SMBs.',
    primaryKeyword: 'social media marketing Toronto',
    secondaryKeywords: ['organic social media Toronto', 'LinkedIn marketing Toronto', 'Facebook marketing Toronto'],
    serviceType: 'Organic social media marketing',
    faqEntities: [
      {
        question: 'Should I be on LinkedIn or Facebook?',
        answer:
          'Most Toronto SMBs benefit from both, with different tones. We map the audience first so the platform mix matches your buyer.',
      },
      {
        question: 'Do you produce video?',
        answer:
          'Not in-house. We can write video briefs and short-form scripts, then refer to a creative partner for production.',
      },
      {
        question: 'Can you handle paid social too?',
        answer: 'Yes, through our Paid Social Ads service, and we coordinate when both are active.',
      },
    ],
  },
  {
    slug: 'brand-strategy',
    title: 'Brand Strategy Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto brand strategy services: positioning, messaging, and voice that beats the alternative. Led by a founder with 15+ years brand experience including GM time.',
    primaryKeyword: 'brand strategy agency Toronto',
    secondaryKeywords: ['brand positioning Toronto', 'brand messaging Toronto', 'Toronto brand consultant'],
    serviceType: 'Brand strategy and positioning',
    faqEntities: [
      {
        question: 'Do I need a brand strategy if I already have a logo?',
        answer:
          'Probably yes. A logo is visual identity. Brand strategy is the positioning, messaging, and voice your logo represents, and most small businesses have the logo without the strategy.',
      },
      {
        question: 'Do you design the logo too?',
        answer: 'No. We brief visual direction and refer to a brand design partner for full identity execution.',
      },
      {
        question: 'How long does it take?',
        answer:
          'Typically three to six weeks from kickoff to a complete brand pack you can hand to writers and designers.',
      },
    ],
  },
  {
    slug: 'web-design',
    title: 'Web Design in Toronto | Stratezik',
    metaDescription:
      'Toronto web design and landing page builds in Webflow, Framer, or custom. SEO-ready, AODA compliant, fast, and built to convert from day one.',
    primaryKeyword: 'web design Toronto',
    secondaryKeywords: ['landing page design Toronto', 'Webflow Toronto', 'Framer Toronto'],
    serviceType: 'Web design and development',
    faqEntities: [
      {
        question: 'Do I need a landing page or a full site?',
        answer:
          'Start with a landing page if you have a specific campaign or launch. Build the full site when you need a permanent home for the business, with multiple services and ongoing content.',
      },
      {
        question: 'Webflow, Framer, or custom?',
        answer:
          'Most Toronto SMBs are best served by Webflow or Framer for ease of ongoing edits. Custom is for teams with specific technical needs.',
      },
      {
        question: 'Is AODA compliance really required?',
        answer: 'For Ontario businesses, yes. We build to WCAG 2.0 AA as standard, not as an upsell.',
      },
    ],
  },
  {
    slug: 'ai-agents',
    title: 'AI Agent Development in Toronto | Stratezik',
    metaDescription:
      'Toronto AI agent development and strategy. Custom systems for your business, built by the agency that runs on its own. See the reference build before you commit.',
    primaryKeyword: 'AI agent development Toronto',
    secondaryKeywords: ['AI strategy Toronto', 'custom AI agents', 'AI automation Toronto'],
    serviceType: 'AI agent development and automation',
    faqEntities: [
      {
        question: 'Is this a chatbot?',
        answer:
          'No. Chatbots answer questions. Agents take actions: they research, draft, review, route, and hand off. The result looks more like a small team than a search box.',
      },
      {
        question: 'What can an agent actually do for my business?',
        answer:
          'That depends on your operations. Common targets: research, content production, outreach, QA, reporting. We start with what is repeatable and high-value.',
      },
      {
        question: 'Can I see your system before I commit?',
        answer:
          'Yes. The reference walkthrough is part of how we sell this service, because seeing it work is the strongest pitch we have.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string | undefined): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug)
}

/** All valid internal /services routes for markdown link resolution. */
export const serviceRoutePaths: string[] = ['/services', ...services.map((s) => `/services/${s.slug}`)]
