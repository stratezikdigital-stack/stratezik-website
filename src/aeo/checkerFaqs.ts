/** Visible FAQ copy + FAQPage schema for /aeo-checker (must stay in sync). */
export type CheckerFaq = { question: string; answer: string }

export const AEO_CHECKER_FAQS: CheckerFaq[] = [
  {
    question: 'What is an AEO readiness test?',
    answer:
      'An AEO (answer engine optimisation) readiness test scores how well your website can be read, understood, and cited by AI assistants and answer engines. Stratezik’s free checker runs eight machine-verified criteria across crawler access, server-rendered HTML, entity presence, Organization and FAQ schema, answer-first copy, llms.txt, and pricing transparency, scaled to a score out of 20.',
  },
  {
    question: 'Is the Stratezik AEO checker free?',
    answer:
      'Yes. Enter your URL to get a topline score and defaults-vs-deliberate split in about 20 seconds with no signup. Enter your email (with consent) to unlock the full eight-criterion breakdown, evidence, and prioritized fix list on screen and by email. Paid options ($10 page report, $49 full-site audit) add AI-visibility queries, competitor benchmarks, and page-level GEO diagnostics.',
  },
  {
    question: 'What is a good AEO readiness score?',
    answer:
      'In Stratezik’s June 2026 audit of 50 funded Toronto startup websites, the median score was 10.75 out of 20 and no company scored above 17. Startups averaged 95% on “default” criteria (crawler access, rendering, presence) but only 29% on deliberate work (schema, copy structure, llms.txt, machine-readable pricing). Beating the median is a start; closing the deliberate gap is where most AI visibility wins live.',
  },
  {
    question: 'How is this different from AI visibility tracking tools?',
    answer:
      'Most AI visibility trackers report whether you were mentioned in an AI answer (a symptom). Stratezik’s checker tests whether your site is technically and structurally ready to be cited (the cause): raw HTML visibility, schema, chunk-friendly headings, trust markers, and information gain. You get specific fixes, not just a percentage.',
  },
  {
    question: 'What does the 20-point test check?',
    answer:
      'Eight criteria, each worth 2.5 points: AI crawler access (robots.txt), JavaScript-free rendering, off-page entity alignment (LinkedIn/Crunchbase), Organization schema, FAQPage schema, answer-first formatting, llms.txt, and pricing transparency. Group A covers what your stack gives you by default; Group B is what you must build deliberately.',
  },
  {
    question: 'Who built this AEO checker?',
    answer:
      'Stratezik Digital, a Toronto digital marketing agency specializing in SEO, AEO, paid media, and growth strategy for startups and SMBs across Canada. The test is the same machine-verified framework published in the Toronto Startup Website Audit 2026 research report.',
  },
]
