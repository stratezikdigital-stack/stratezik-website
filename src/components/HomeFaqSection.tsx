import { homeFaqJsonLd } from '../utils/homeFaqJsonLd'

/** Visible homepage FAQ — mirrors FAQPage JSON-LD on `/`. */
export function HomeFaqSection() {
  const items = homeFaqJsonLd.mainEntity

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream border-t border-ink/10" aria-labelledby="home-faq-heading">
      <div className="container-custom px-6 md:px-12 max-w-3xl">
        <h2 id="home-faq-heading" className="font-display text-display-3 text-ink tracking-tight">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-10">
          {items.map((item) => (
            <div key={item.name}>
              <dt className="font-display text-xl md:text-2xl text-ink tracking-tight">{item.name}</dt>
              <dd className="mt-4 text-ink-700 leading-relaxed">{item.acceptedAnswer.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
