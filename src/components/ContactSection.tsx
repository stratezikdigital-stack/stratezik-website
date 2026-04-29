import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useSection } from '../three/world/useSection'
import { useWorldStore } from '../three/world/store'

/**
 * Plan D — "Your move."
 *
 * Editorial contact section styled as a chess clock + record card.
 * The form lives on the left in a thin-bordered editorial frame; the
 * right side is a contact ledger styled as algebraic notation. On
 * submit, the global world store is told the opposing king has
 * resigned (the persistent canvas behind the page handles the topple).
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  useSection('contact', sectionRef)
  const setResigned = useWorldStore((s) => s.setResigned)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setResigned(isSubmitted)
  }, [isSubmitted, setResigned])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        source: 'stratezik.com',
      })
      await fetch(
        `https://script.google.com/macros/s/AKfycbyRQyW4slnqjxI4yY75-Tj2RX-uTlJg5dUIZBbaRnsJ1yBB8tPdOZmI3sV0T3WX4wL_/exec?${params}`,
        { method: 'GET', mode: 'no-cors' },
      )
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      console.error('Form submission error:', err)
      alert('Sorry, there was an error submitting your form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden lg:min-h-[180vh] bg-cream"
    >
      <div className="lg:sticky lg:top-0 w-full lg:min-h-screen flex items-center py-24">
        <div className="container-custom px-6 md:px-12 relative z-10 w-full">
          {/* Editorial header */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-12 gap-4 mb-14"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                / 05 &mdash; Endgame
              </div>
              <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
                Move 47 &middot; the deciding move
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
                Your move.
              </h2>
              <p className="lead mt-6 max-w-2xl">
                Tell us where you stand. We&rsquo;ll prepare three lines of play and walk you through
                them in 30 minutes &mdash; no obligation. The opposing king is already wobbling.
              </p>
            </div>
          </motion.header>

          <div className="grid grid-cols-12 gap-px bg-ink/15">
            {/* Form panel */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-7 bg-cream-50 p-7 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                    Open the line
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink mt-1 tracking-[-0.025em]">
                    Start the consultation
                  </h3>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
                  / 30&nbsp;min
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="py-12"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-oxblood">
                    Position resigned
                  </div>
                  <h4 className="mt-2 font-display text-3xl md:text-4xl text-ink leading-[1.05]">
                    Checkmate.
                  </h4>
                  <p className="lead mt-4 max-w-md">
                    Your message landed. We&rsquo;ll respond within one business day with three
                    candidate lines of play tailored to your position.
                  </p>
                  <div className="hairline mt-8 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
                    {`47.\u2009\u2654g8#`} &middot; result 1\u20130
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      id="name"
                      name="name"
                      label="Full name"
                      moveNumber="01"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      label="Email address"
                      moveNumber="02"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Field
                    id="company"
                    name="company"
                    label="Company"
                    moveNumber="03"
                    value={formData.company}
                    onChange={handleInputChange}
                  />

                  <Field
                    id="message"
                    name="message"
                    label="Where do you stand on the board?"
                    moveNumber="04"
                    multiline
                    placeholder="What's the position? Where do you want to go? What's blocking the move?"
                    value={formData.message}
                    onChange={handleInputChange}
                  />

                  <button
                    type="submit"
                    data-cursor="cta"
                    data-cursor-text="Send"
                    disabled={isSubmitting}
                    className="w-full mt-2 inline-flex items-center justify-center gap-3 bg-ink text-cream py-5 font-medium tracking-wide hover:bg-oxblood transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          aria-hidden
                          className="inline-block w-3 h-3 border border-cream/30 border-t-cream rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Sending&hellip;</span>
                      </>
                    ) : (
                      <>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
                          Send
                        </span>
                        <span>Press the clock</span>
                        <span aria-hidden className="font-mono">&rarr;</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Ledger / contact panel */}
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              viewport={{ once: true }}
              className="col-span-12 lg:col-span-5 bg-ink text-cream p-7 md:p-10"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                  Game state
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      isSubmitted ? 'bg-gold' : 'bg-oxblood-400 animate-pulse'
                    }`}
                  />
                  {isSubmitted ? 'Resigned' : 'In progress'}
                </div>
              </div>

              <div className="font-display text-display-3 leading-[1.0] tracking-[-0.025em]">
                {isSubmitted ? (
                  <>
                    Welcome to the
                    <br />
                    <span className="italic font-light text-gold">winning side.</span>
                  </>
                ) : (
                  <>
                    Submit your details
                    <br />
                    <span className="italic font-light text-gold/90">to deliver checkmate.</span>
                  </>
                )}
              </div>

              <div className="hairline border-cream/15 mt-8 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                <Ledger label="Email" value="dave@stratezik.com" href="mailto:dave@stratezik.com" />
                <Ledger label="Phone" value="437.525.4772" href="tel:+14375254772" />
                <Ledger
                  label="Office"
                  value={'2466 Eglinton Ave E\nToronto, ON, Canada'}
                  href="https://maps.google.com/?q=2466+Eglinton+Ave+E,+Toronto"
                />
                <Ledger label="Hours" value={'Mon\u2013Fri \u00b7 09\u201318 ET'} />
              </div>

              <div className="hairline border-cream/15 mt-8 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55 leading-7">
                <div>1.&thinsp;e4 &mdash; Send the message</div>
                <div>2.&thinsp;Nf3 &mdash; We respond within 24h</div>
                <div>3.&thinsp;Bb5 &mdash; 30-min strategy session</div>
                <div className="text-gold mt-1">4.&thinsp;Win &mdash; Three candidate lines, one decision</div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  id: string
  name: string
  label: string
  moveNumber: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  required?: boolean
  multiline?: boolean
  placeholder?: string
}

function Field({
  id,
  name,
  label,
  moveNumber,
  type = 'text',
  value,
  onChange,
  required,
  multiline,
  placeholder,
}: FieldProps) {
  return (
    <label htmlFor={id} className="block group">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-300 tabular-nums">
          /{moveNumber}
        </span>
      </div>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 border-b border-ink/30 focus:border-ink focus:outline-none focus:ring-0 px-0 py-3 text-ink resize-none transition-colors placeholder:text-ink-300"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 border-b border-ink/30 focus:border-ink focus:outline-none focus:ring-0 px-0 py-3 text-ink transition-colors placeholder:text-ink-300"
        />
      )}
    </label>
  )
}

interface LedgerProps {
  label: string
  value: string
  href?: string
}

function Ledger({ label, value, href }: LedgerProps) {
  const lines = value.split('\n')
  const content = (
    <>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-1">
        {label}
      </div>
      <div className="font-display text-base text-cream">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </>
  )
  return href ? (
    <a
      href={href}
      data-cursor="cta"
      data-cursor-text="Open"
      className="block hover:text-gold transition-colors"
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
