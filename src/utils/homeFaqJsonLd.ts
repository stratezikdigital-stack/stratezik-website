/** Homepage FAQ structured data — injected only on `/` so blog URLs are not polluted. */

export const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Stratezik Digital Marketing do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Stratezik is a Toronto-based digital marketing agency that builds growth programs across paid search and paid social, SEO and organic growth, social strategy and content, brand strategy and identity, conversion and growth, analytics and measurement, plus AI agents and bespoke workflow tools tied to acquisition and operations. Engagements follow one documented roadmap with leadership-approved KPIs and weekly operating rhythm.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Stratezik build AI agents and custom tools for businesses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Stratezik designs conversational and task-focused AI agents grounded in brand and funnel constraints, ships customer-facing micro-apps and calculators, and integrates workflow automation spanning Google Ads, analytics, CRM, and Google Business Profile so teams delegate repetitive analysis while keeping approvals, audit trails, and performance signals intact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Stratezik located and what areas do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Stratezik is based at 2466 Eglinton Ave E, Toronto, ON, Canada. We work with clients across the Greater Toronto Area (Toronto, Mississauga, Brampton, Markham, Vaughan) and remotely with brands across Canada and North America.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer a free consultation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. We offer a free 30-minute strategy consultation where we read your current position (audience, competitors, technical baseline, brand pressure points) and prepare three lines of play with explicit trade-offs. No obligation. Email dave@stratezik.com or call 437-525-4772 to book.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you charge: retainer, project, or performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Most engagements are monthly retainers anchored to a documented scope and quarterly objectives. We also run fixed-scope projects (audits, brand strategy sprints, campaign launches) and hybrid retainer-plus-bonus structures tied to agreed performance KPIs. The right model depends on your stage and tolerance for variability. We walk through the trade-offs in the consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long before I see results from SEO or paid media?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Paid media typically shows learning-phase data inside 30 days and stabilizes 60-90 days in. SEO compounds: meaningful organic ranking lift usually shows in 3-6 months, with the bigger gains in months 6-12. In our latest engagement, paid CPL hit $33.38 in month seven and organic impressions grew 168x over eleven months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you share examples of past work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. The match record on stratezik.com/#portfolio walks through four real engagements, including a Toronto local-services brand we took from invisible to 700 paid leads at $42.99 CPL, with organic impressions growing 168x and Google Business Profile climbing from rank 60+ to top 5 in the map pack within four months.',
      },
    },
  ],
} as const

export const HOME_FAQ_JSON_LD_SCRIPT_ID = 'stratezik-home-faq-jsonld'
