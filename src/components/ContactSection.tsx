import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { EmailTypoHint } from './spam/EmailTypoHint'
import { useFormProtection } from '../lib/spam/useFormProtection'
import { useSection } from '../three/world/useSection'
import { useWorldStore } from '../three/world/store'
import { SocialProfileLinks } from './SocialProfileLinks'

/**
 * Plan D - Contact / consultation section.
 *
 * Split layout: form + dark ledger with studio coordinates.
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
  const [submitError, setSubmitError] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)
  const protection = useFormProtection()

  useEffect(() => {
    setResigned(isSubmitted)
  }, [isSubmitted, setResigned])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!protection.canSubmit) {
      setSubmitError('Please complete the security check and try again.')
      return
    }
    setSubmitError('')
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...protection.spamPayload(),
          fax: protection.honeypot,
        }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }
      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
      void protection.refreshFormToken()
    } catch (err) {
      console.error('Form submission error:', err)
      setSubmitError(
        err instanceof Error ? err.message : 'Sorry, there was an error. Try again or email dave@stratezik.com.',
      )
      protection.resetTurnstile()
      setTurnstileKey((k) => k + 1)
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
              Contact
            </div>
            <div className="hairline mt-3 pt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500">
              Reply within one business day &middot; book a 30-minute call
              </div>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display text-display-2 text-ink leading-[0.96] tracking-[-0.035em]">
                Start the conversation.
              </h2>
              <p className="lead mt-6 max-w-2xl">
                Share goals, timelines, and constraints. We&rsquo;ll reply within one business day and,
                if there&rsquo;s a fit, book a focused 30-minute call, no obligation.
              </p>
              <p className="mt-5 text-ink-600 leading-relaxed max-w-2xl">
                Not ready to talk?{' '}
                <Link
                  to="/aeo-checker?utm_source=home-contact&utm_medium=cta"
                  className="text-oxblood underline underline-offset-2 hover:text-ink transition-colors"
                >
                  Check your free AEO readiness score
                </Link>{' '}
                first — ~20 seconds, no signup for your topline result.
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
                    Next step
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink mt-1 tracking-[-0.025em]">
                    Start the consultation
                  </h3>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
                  30&nbsp;min
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
                    Message received
                  </div>
                  <h4 className="mt-2 font-display text-3xl md:text-4xl text-ink leading-[1.05]">
                    Thanks. We&rsquo;ll be in touch.
                  </h4>
                  <p className="lead mt-4 max-w-md">
                    Expect a reply within one business day with next steps. If there&rsquo;s a fit,
                    we&rsquo;ll propose three scoped directions you can compare quickly.
                  </p>
                  <div className="hairline mt-8 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-500 tabular-nums">
                    Reference &middot; consultation queue
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field
                      id="name"
                      name="name"
                      label="Full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        label="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <EmailTypoHint
                        email={formData.email}
                        onAccept={(fixed) => setFormData((d) => ({ ...d, email: fixed }))}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Field
                    id="company"
                    name="company"
                    label="Company / business name"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />

                  <Field
                    id="message"
                    name="message"
                    label="What should we know?"
                    multiline
                    placeholder="Goals, budget band, channels you’ve tried, timelines, blockers; anything that helps us prepare."
                    value={formData.message}
                    onChange={handleInputChange}
                  />

                  <FormProtectionFields
                    turnstileSiteKey={protection.turnstileSiteKey}
                    onTurnstileSuccess={protection.setTurnstileToken}
                    onTurnstileExpire={protection.resetTurnstile}
                    turnstileResetKey={turnstileKey}
                    honeypotName="fax"
                    honeypotValue={protection.honeypot}
                    onHoneypotChange={protection.setHoneypot}
                  />

                  {submitError && (
                    <p className="font-mono text-sm text-oxblood">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    data-cursor="cta"
                    data-cursor-text="Send"
                    disabled={isSubmitting || !protection.canSubmit}
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
                        <span>Send message</span>
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
                  Status
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      isSubmitted ? 'bg-gold' : 'bg-oxblood-400 animate-pulse'
                    }`}
                  />
                  {isSubmitted ? 'Queued' : 'Accepting briefs'}
                </div>
              </div>

              <div className="font-display text-display-3 leading-[1.0] tracking-[-0.025em]">
                {isSubmitted ? (
                  <>
                    Welcome aboard.
                    <br />
                    <span className="italic font-light text-gold">We&rsquo;ll follow up shortly.</span>
                  </>
                ) : (
                  <>
                    Tell us what you&rsquo;re building.
                    <br />
                    <span className="italic font-light text-gold/90">We read every brief.</span>
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
                <Ledger label="Hours" value={'Mon-Fri · 09:00-18:00 ET'} />
              </div>

              <div className="hairline border-cream/15 mt-8 pt-6">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55 mb-4">
                  Follow Stratezik
                </div>
                <SocialProfileLinks />
              </div>

              <div className="hairline border-cream/15 mt-8 pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55 leading-7">
                <div>Step 1: Send your brief</div>
                <div>Step 2: We respond within 24h</div>
                <div>Step 3: Schedule the strategy call</div>
                <div className="text-gold mt-1">Step 4: Three proposals, one decision</div>
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
      target={/^https?:\/\//.test(href) ? '_blank' : undefined}
      rel={/^https?:\/\//.test(href) ? 'noopener noreferrer' : undefined}
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
