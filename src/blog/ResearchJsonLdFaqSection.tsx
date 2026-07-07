import { ResearchAnswerAside } from './BlogResearchLayout'

type FaqItem = { question: string; answer: string }

/** On-page FAQ blocks mirrored in JSON-LD — wrapper only, not part of verbatim copy. */
export function ResearchJsonLdFaqSection({
  idPrefix,
  items,
  heading = 'Quick answers',
}: {
  idPrefix: string
  items: FaqItem[]
  heading?: string
}) {
  if (items.length === 0) return null

  return (
    <section className="mt-16 md:mt-20" aria-labelledby={`${idPrefix}-faq-heading`}>
      <h2 id={`${idPrefix}-faq-heading`} className="font-display text-2xl text-ink tracking-tight">
        {heading}
      </h2>
      <div className="mt-8 space-y-8">
        {items.map((item, index) => (
          <ResearchAnswerAside
            key={item.question}
            id={`${idPrefix}-faq-${index + 1}`}
            question={item.question}
          >
            <p>{item.answer}</p>
          </ResearchAnswerAside>
        ))}
      </div>
    </section>
  )
}
