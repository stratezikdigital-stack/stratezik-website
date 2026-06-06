import type { ServiceChildDefinition, ServiceDefinition, ServicesHubDefinition } from './serviceTypes'

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
      'Stratezik runs on a five-agent organisation that researches, writes, reviews, and ships marketing work every day. Meet the team, see the handoffs, and look at what it produces.',
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

/** Phase 2 child focus-area pages, in parent + display order. */
export const serviceChildren: ServiceChildDefinition[] = [
  {
    parentSlug: 'paid-search',
    slug: 'google-ads',
    title: 'Google Ads Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto Google Ads management led by a founder who has run $10M+ in annual spend. Search, Performance Max, and Shopping campaigns with disciplined measurement.',
    primaryKeyword: 'Google Ads agency Toronto',
    secondaryKeywords: ['Google Ads Toronto', 'PPC Toronto', 'Performance Max Toronto'],
    serviceType: 'Google Ads management',
    faqEntities: [
      {
        question: 'Should I use Performance Max?',
        answer:
          'Sometimes. It works when you have strong conversion data and creative variety. For lean accounts with limited data, we usually keep budget in pure Search first.',
      },
      {
        question: 'How much should I spend?',
        answer:
          'It depends on your margins and lifetime value, not a universal number. We tell you, honestly, whether your budget is enough to compete in your category before you commit.',
      },
      {
        question: 'Will you manage my existing account or start fresh?',
        answer:
          'Whichever wins. Often a rebuild beats a rescue. Sometimes the inherited account has structural goodness worth preserving. The audit tells us which.',
      },
    ],
  },
  {
    parentSlug: 'paid-search',
    slug: 'microsoft-ads',
    title: 'Microsoft Ads in Toronto | Stratezik',
    metaDescription:
      'Toronto Microsoft Ads (Bing) management. Often the cheapest qualified clicks available, frequently underused by GTA businesses, run by a $10M+ ad operator.',
    primaryKeyword: 'Microsoft Ads Toronto',
    secondaryKeywords: ['Bing Ads Toronto', 'Microsoft Advertising Toronto'],
    serviceType: 'Microsoft Ads management',
    faqEntities: [
      {
        question: 'Is Microsoft Ads worth it in Canada?',
        answer:
          'Sometimes. Volume is smaller than Google, but cost per click is often lower and the audience skews older and more professional. We size it first; if the math does not work, we say so.',
      },
      {
        question: 'Can I just copy my Google account to Microsoft?',
        answer:
          'The import tool gets you started, but the platforms behave differently. Treating it as a copy-paste account underperforms; treating it as a related but distinct channel works.',
      },
      {
        question: 'Should I run Microsoft instead of Google?',
        answer: 'Almost never. For most Toronto businesses, Google is primary and Microsoft is complementary.',
      },
    ],
  },
  {
    parentSlug: 'paid-social',
    slug: 'meta-ads',
    title: 'Meta Ads Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto Meta Ads management (Facebook + Instagram). Pixel and CAPI set up right, A/B testing that means something, and retargeting that converts the warm audience.',
    primaryKeyword: 'Meta Ads agency Toronto',
    secondaryKeywords: ['Facebook Ads Toronto', 'Instagram Ads Toronto', 'Meta advertising Toronto'],
    serviceType: 'Meta (Facebook & Instagram) ads management',
    faqEntities: [
      {
        question: 'Will Meta work for my business?',
        answer:
          'It works best for visual offers, local consumer services, and anything you can show in a few seconds of creative. It works less well for narrow B2B audiences, where LinkedIn often beats it.',
      },
      {
        question: 'Why do my Meta ads underperform?',
        answer:
          'Usually the creative, then the offer, then the funnel. Targeting is rarely the actual problem. We diagnose it in that order.',
      },
      {
        question: 'Do you provide creative?',
        answer:
          'We provide creative direction and briefs. For production we work with creative partners we trust and can refer.',
      },
    ],
  },
  {
    parentSlug: 'paid-social',
    slug: 'linkedin-ads',
    title: 'LinkedIn Ads Agency in Toronto | Stratezik',
    metaDescription:
      'Toronto LinkedIn Ads management for B2B and high-deal-size services. Narrow targeting, strong creative, and ROI math that justifies the premium click costs.',
    primaryKeyword: 'LinkedIn Ads agency Toronto',
    secondaryKeywords: ['B2B LinkedIn Ads', 'LinkedIn advertising Toronto', 'sponsored content Toronto'],
    serviceType: 'LinkedIn ads management',
    faqEntities: [
      {
        question: 'When is LinkedIn worth it?',
        answer:
          'When your deal size is high enough that an $8 to $15 click is cheap relative to a single closed deal. Usually B2B services, enterprise sales, recruiting, and high-margin professional services.',
      },
      {
        question: 'LinkedIn or Meta for B2B?',
        answer:
          'Meta can reach business buyers cheaper, but LinkedIn reaches them more precisely. Many B2B clients run both, with LinkedIn carrying the targeting and Meta carrying the volume.',
      },
      {
        question: 'Do you handle creative?',
        answer:
          'Direction and briefs. Production through creative partners, because LinkedIn rewards a tone most generic agency creative does not nail.',
      },
    ],
  },
  {
    parentSlug: 'paid-social',
    slug: 'tiktok-ads',
    title: 'TikTok Ads in Toronto | Stratezik',
    metaDescription:
      'Toronto TikTok Ads management for businesses whose buyers actually live on the platform. Short-form creative direction, honest reach math, real test framework.',
    primaryKeyword: 'TikTok Ads Toronto',
    secondaryKeywords: ['TikTok advertising Toronto', 'short-form video ads'],
    serviceType: 'TikTok ads management',
    faqEntities: [
      {
        question: 'Is TikTok worth it for B2B?',
        answer:
          'Almost never. There are exceptions for founder-led personal brand and niche professional services, but for most B2B work the audience is not there and LinkedIn or Meta is better.',
      },
      {
        question: 'Do I need to be on camera myself?',
        answer:
          'It helps for founder-led brands, but TikTok ads can also use user-generated-content style edits, product demos, and creator partnerships.',
      },
      {
        question: 'How big does my budget need to be?',
        answer: 'Smaller than people assume, because creative matters more than spend. We size it before we start.',
      },
    ],
  },
  {
    parentSlug: 'seo-aeo',
    slug: 'technical-seo',
    title: 'Technical SEO in Toronto | Stratezik',
    metaDescription:
      'Toronto technical SEO audits and fixes: Core Web Vitals, schema markup, indexing, and the AI-crawler access most local sites are quietly blocking.',
    primaryKeyword: 'technical SEO Toronto',
    secondaryKeywords: ['Core Web Vitals Toronto', 'schema markup Toronto', 'site audit Toronto'],
    serviceType: 'Technical SEO',
    faqEntities: [
      {
        question: 'How is technical SEO different from regular SEO?',
        answer:
          'Technical SEO is the foundation: can search engines and AI crawlers actually access, read, and trust your site? Content SEO is what comes after. If the technical layer is broken, no amount of content fixes it.',
      },
      {
        question: 'Will fixing Core Web Vitals improve my rankings?',
        answer:
          'Often, and almost always your conversion rate, which matters more. Most paid traffic is mobile, and a slow site loses visitors before they read a word.',
      },
      {
        question: 'Do I really need schema markup?',
        answer:
          'Yes, especially for local business and FAQ markup. It is the difference between AI tools guessing what your site is about and lifting clean facts.',
      },
    ],
  },
  {
    parentSlug: 'seo-aeo',
    slug: 'local-seo',
    title: 'Local SEO in Toronto | Stratezik',
    metaDescription:
      'Toronto local SEO: Google Maps rankings, neighbourhood-level relevance, and the structural work behind a position 50 to top 5 move in four months.',
    primaryKeyword: 'local SEO Toronto',
    secondaryKeywords: ['Google Maps SEO Toronto', 'Toronto local search', 'neighbourhood SEO'],
    serviceType: 'Local SEO',
    faqEntities: [
      {
        question: 'How is local SEO different from regular SEO?',
        answer:
          'Local SEO targets searches with local intent ("pest control Scarborough," "dentist near me"), where Maps and proximity dominate. Regular SEO targets broader, non-geographic queries. Most local businesses need both.',
      },
      {
        question: 'Do I need GBP management and local SEO?',
        answer:
          'They are connected. GBP is the Maps lever. Local SEO is the on-site and citation work that backs it. Many clients run both together.',
      },
      {
        question: 'How long until I see Maps movement?',
        answer:
          'Most local clients see measurable rank improvement inside 60 to 90 days, with stronger gains by month four.',
      },
    ],
  },
  {
    parentSlug: 'seo-aeo',
    slug: 'answer-engine-optimization',
    title: 'Answer Engine Optimisation (AEO) in Toronto | Stratezik',
    metaDescription:
      "Toronto AEO that gets your business cited inside ChatGPT, Perplexity, and Google AI Overviews. AI search recommends 1.2% of local businesses, here's how to be one.",
    primaryKeyword: 'answer engine optimization Toronto',
    secondaryKeywords: ['AEO Toronto', 'ChatGPT SEO Toronto', 'Perplexity citations'],
    serviceType: 'Answer engine optimization',
    faqEntities: [
      {
        question: 'Is AEO different from SEO?',
        answer:
          'Same foundation, different output. SEO targets ranking in Google. AEO targets being cited inside AI-generated answers. The disciplines overlap; the measurement is different.',
      },
      {
        question: 'Can I pay to be recommended by ChatGPT?',
        answer:
          'Not for organic recommendations. ChatGPT has paid ads, but they are separate from being named in an answer. AEO earns the second one.',
      },
      {
        question: 'How long until I show up in AI answers?',
        answer:
          'Often faster than traditional SEO, because the field is less crowded. Plan in weeks to a few months, depending on your starting authority.',
      },
    ],
  },
  {
    parentSlug: 'web-design',
    slug: 'landing-pages',
    title: 'Landing Page Design in Toronto | Stratezik',
    metaDescription:
      'Toronto landing page design and build. Single conversion-focused pages for paid campaigns and launches, in Webflow or Framer, AODA compliant, live in 2-3 weeks.',
    primaryKeyword: 'landing page design Toronto',
    secondaryKeywords: ['Webflow landing page', 'Framer landing page', 'conversion landing page Toronto'],
    serviceType: 'Landing page design',
    faqEntities: [
      {
        question: 'How long does a landing page take?',
        answer: 'Typically two to three weeks from brief to launch.',
      },
      {
        question: 'Webflow or Framer?',
        answer:
          "Both work. We pick based on your team's ability to edit the page after we hand off and the specific design needs.",
      },
      {
        question: 'Will the page be on my domain?',
        answer:
          'Yes, on a subdomain or a clean URL path, set up so search and analytics see it as part of your site.',
      },
    ],
  },
  {
    parentSlug: 'web-design',
    slug: 'website-design',
    title: 'Small Business Website Design in Toronto | Stratezik',
    metaDescription:
      'Toronto small business website design and build. Webflow, Framer, or custom. SEO-ready, AODA compliant, conversion-focused, live in 6 to 10 weeks.',
    primaryKeyword: 'small business website design Toronto',
    secondaryKeywords: ['Webflow developer Toronto', 'Framer developer Toronto', 'Toronto website design'],
    serviceType: 'Website design and development',
    faqEntities: [
      {
        question: 'Webflow or Framer or custom?',
        answer:
          'Most Toronto small businesses are best served by Webflow or Framer for ease of editing after handoff. Custom is for teams with specific technical requirements.',
      },
      {
        question: 'Do you do e-commerce?',
        answer: 'Shopify setups as a project add-on. Full custom e-commerce platforms are outside our scope.',
      },
      {
        question: 'Is AODA compliance really required?',
        answer: 'For Ontario businesses, yes. We build to WCAG 2.0 AA as standard, not as an upsell.',
      },
    ],
  },
  {
    parentSlug: 'ai-agents',
    slug: 'ai-strategy',
    title: 'AI Strategy Consulting in Toronto | Stratezik',
    metaDescription:
      'Toronto AI strategy consulting for founders deciding what to automate first. Agent org design, context engineering, and a deployment roadmap from operators.',
    primaryKeyword: 'AI strategy consulting Toronto',
    secondaryKeywords: ['AI consulting Toronto', 'agent org design', 'AI roadmap'],
    serviceType: 'AI strategy consulting',
    faqEntities: [
      {
        question: 'Will I get a real plan or a slide deck?',
        answer:
          'A real plan. Org chart, context files, deployment phases, what each agent does and what it does not. Not a vision document.',
      },
      {
        question: 'Do I need this if I just want to build one agent?',
        answer:
          'Not always. For a single, scoped agent, skip to Agent Development. Strategy matters when you are committing to a system.',
      },
      {
        question: 'How long does the strategy engagement take?',
        answer: 'Typically two to four weeks from discovery to delivered roadmap.',
      },
    ],
  },
  {
    parentSlug: 'ai-agents',
    slug: 'agent-development',
    title: 'Custom AI Agent Development in Toronto | Stratezik',
    metaDescription:
      'Toronto custom AI agent build and deployment. End-to-end work from context engineering and tool integration to handoff, by an agency that runs on its own agents.',
    primaryKeyword: 'custom AI agent development Toronto',
    secondaryKeywords: ['AI agent build Toronto', 'MCP integration', 'agent deployment'],
    serviceType: 'Custom AI agent development',
    faqEntities: [
      {
        question: 'What can you actually build?',
        answer:
          'Research agents, content agents, outreach agents, QA agents, reporting agents, support agents, and the orchestration that handles handoffs between them. Anything repeatable and high-value in your operations is a candidate.',
      },
      {
        question: 'Will it work with my existing tools?',
        answer:
          'Almost always. We integrate with anything that has an API and most things via MCP. Tell us your stack and we will tell you what fits.',
      },
      {
        question: 'What happens after the build?',
        answer:
          'A real handoff: documentation, audit log setup, observability, and a session where your operator learns to manage it. Optional ongoing support if you want it.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string | undefined): ServiceDefinition | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceChild(
  parentSlug: string | undefined,
  childSlug: string | undefined,
): ServiceChildDefinition | undefined {
  return serviceChildren.find((c) => c.parentSlug === parentSlug && c.slug === childSlug)
}

export function childrenForParent(parentSlug: string): ServiceChildDefinition[] {
  return serviceChildren.filter((c) => c.parentSlug === parentSlug)
}

/** All valid internal /services routes for markdown link resolution. */
export const serviceRoutePaths: string[] = [
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  ...serviceChildren.map((c) => `/services/${c.parentSlug}/${c.slug}`),
]
