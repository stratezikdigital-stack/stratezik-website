import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import {
  EMPTY_SURVEY_ANSWERS,
  GTA_SMB_SURVEY_STEPS,
  SURVEY_STEP_COUNT,
  type GtaSmbSurveyAnswers,
  type SurveyStep,
} from '../research/gtaSmbSurveyQuestions'

function needsContactFields(answers: GtaSmbSurveyAnswers): boolean {
  return (
    answers.findingsSummary.startsWith('Yes') ||
    answers.followUpConsent === 'Yes'
  )
}

function validateStep(step: SurveyStep, answers: GtaSmbSurveyAnswers): string | null {
  if (step.kind === 'intro') return null

  if (step.kind === 'single') {
    const value = String(answers[step.field] ?? '').trim()
    if (step.required && !value) return 'Please select an option.'
    if (step.allowOther && value === 'Other') {
      const otherKey = step.otherField
      if (otherKey && !String(answers[otherKey] ?? '').trim()) {
        return 'Please specify your answer.'
      }
    }
    return null
  }

  if (step.kind === 'multi') {
    const selected = answers[step.field] as string[]
    if (step.required && selected.length === 0) return 'Select at least one option.'
    if (selected.length > step.max) return `Select up to ${step.max} options.`
    return null
  }

  if (step.kind === 'text') {
    const value = String(answers[step.field] ?? '').trim()
    if (step.required && !value) return 'Please enter a short answer.'
    return null
  }

  if (step.kind === 'contact') {
    if (!needsContactFields(answers)) return null
    const pref = answers.preferredContact
    if (!pref) return 'Choose how we should reach you.'
    if ((pref === 'Phone' || pref === 'Both Phone & Email') && !answers.phone.trim()) {
      return 'Enter a phone number.'
    }
    if ((pref === 'Email' || pref === 'Both Phone & Email') && !answers.email.trim()) {
      return 'Enter an email address.'
    }
    if (answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) {
      return 'Enter a valid email address.'
    }
    return null
  }

  return null
}

function ChoiceCard({
  selected,
  label,
  onSelect,
}: {
  selected: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-sm border px-4 py-3.5 transition-colors ${
        selected
          ? 'border-oxblood bg-oxblood/5 text-ink'
          : 'border-ink/15 bg-cream hover:border-ink/30 text-ink-700'
      }`}
    >
      <span className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
            selected ? 'border-oxblood bg-oxblood' : 'border-ink/25'
          }`}
          aria-hidden
        >
          {selected ? <span className="h-1.5 w-1.5 rounded-full bg-cream" /> : null}
        </span>
        <span className="leading-snug">{label}</span>
      </span>
    </button>
  )
}

export default function GtaSmbSurveyPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref')?.trim().slice(0, 80) ?? ''

  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<GtaSmbSurveyAnswers>({ ...EMPTY_SURVEY_ANSWERS })
  const [stepError, setStepError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [turnstileKey, setTurnstileKey] = useState(0)

  const {
    honeypot,
    setHoneypot,
    turnstileToken,
    setTurnstileToken,
    fetchReadyFormToken,
    turnstileSiteKey,
    tokenError,
    refreshFormToken,
  } = useFormProtection()

  const step = GTA_SMB_SURVEY_STEPS[stepIndex]
  const progressPct = Math.round(((stepIndex + 1) / SURVEY_STEP_COUNT) * 100)

  const showContactFields = useMemo(() => needsContactFields(answers), [answers])

  const setSingle = (field: keyof GtaSmbSurveyAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    setStepError('')
  }

  const toggleSkill = (value: string) => {
    setAnswers((prev) => {
      const current = prev.skills
      if (current.includes(value)) {
        return { ...prev, skills: current.filter((v) => v !== value) }
      }
      if (current.length >= 3) return prev
      return { ...prev, skills: [...current, value] }
    })
    setStepError('')
  }

  const goNext = () => {
    const err = validateStep(step, answers)
    if (err) {
      setStepError(err)
      return
    }
    if (stepIndex < SURVEY_STEP_COUNT - 1) {
      setStepIndex((i) => i + 1)
      setStepError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1)
      setStepError('')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validateStep(step, answers)
    if (err) {
      setStepError(err)
      return
    }
    if (!turnstileSiteKey) {
      setSubmitError('Verification is not configured. Email dave@stratezik.com to complete the survey.')
      return
    }
    if (!turnstileToken) {
      setSubmitError('Complete the verification check below.')
      return
    }

    setSubmitting(true)
    setSubmitError('')
    try {
      const formToken = await fetchReadyFormToken()
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...answers,
          skills: answers.skills.join(' | '),
          source: 'gta-smb-readiness-survey',
          ref: ref || undefined,
          formToken,
          turnstileToken,
          website: honeypot,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed. Please try again.')
      }
      setSubmitted(true)
    } catch (submitErr) {
      setSubmitError(submitErr instanceof Error ? submitErr.message : 'Submission failed.')
      setTurnstileKey((k) => k + 1)
      setTurnstileToken('')
      void refreshFormToken()
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-cream">
        <div className="container-custom mx-auto max-w-xl px-6 py-16 md:px-12 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Thank you</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">Response recorded.</h1>
          <p className="mt-6 lead text-ink-600">
            Your answers help us map digital marketing and AI readiness across Scarborough and the Toronto GTA.
            {answers.findingsSummary.startsWith('Yes')
              ? ' We will email the aggregated research summary when it is ready — no promotional messages.'
              : ' We appreciate your time.'}
          </p>
          <p className="mt-4 text-sm text-ink-500">
            Questions about privacy? See our{' '}
            <Link to="/privacy" className="text-oxblood underline underline-offset-2">
              Privacy Notice
            </Link>
            .
          </p>
        </div>
      </main>
    )
  }

  const isLastStep = stepIndex === SURVEY_STEP_COUNT - 1

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-cream/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="container-custom mx-auto flex items-center justify-between gap-4 px-6 py-4 md:px-12">
          <Link to="/" className="font-display text-lg tracking-tight text-ink">
            Stratezik
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
            Step {stepIndex + 1} of {SURVEY_STEP_COUNT}
          </div>
        </div>
        <div className="h-1 bg-ink/5" aria-hidden>
          <div className="h-full bg-oxblood transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      <div className="container-custom mx-auto max-w-xl px-6 py-10 md:px-12 md:py-14">
        <form onSubmit={isLastStep ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
          {step.kind === 'intro' ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Independent research</p>
              <h1 className="mt-3 font-display text-3xl md:text-4xl tracking-tight text-ink leading-[1.1]">
                {step.title}
              </h1>
              <p className="mt-6 lead text-ink-600">{step.body}</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-600 border-t border-ink/10 pt-8">
                <li className="flex gap-3">
                  <span className="font-mono text-oxblood">~3 min</span>
                  <span>Short, one-question screens</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-oxblood">Private</span>
                  <span>Anonymous unless you share contact details</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-oxblood">Summary</span>
                  <span>Optional copy of aggregate GTA findings</span>
                </li>
              </ul>
            </div>
          ) : null}

          {step.kind === 'single' ? (
            <div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink leading-snug">
                {step.question}
              </h2>
              <div className="mt-6 space-y-2.5">
                {step.choices.map((choice) => (
                  <ChoiceCard
                    key={choice.value}
                    label={choice.label}
                    selected={answers[step.field] === choice.value}
                    onSelect={() => setSingle(step.field, choice.value)}
                  />
                ))}
              </div>
              {step.allowOther && answers[step.field] === 'Other' && step.otherField ? (
                <input
                  type="text"
                  value={String(answers[step.otherField] ?? '')}
                  onChange={(e) => setSingle(step.otherField!, e.target.value)}
                  placeholder="Please specify"
                  className="mt-4 w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
                />
              ) : null}
            </div>
          ) : null}

          {step.kind === 'multi' ? (
            <div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink leading-snug">
                {step.question}
              </h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">
                Select up to {step.max} · {answers.skills.length}/{step.max} chosen
              </p>
              <div className="mt-6 space-y-2.5">
                {step.choices.map((choice) => {
                  const selected = answers.skills.includes(choice.value)
                  const disabled = !selected && answers.skills.length >= step.max
                  return (
                    <button
                      key={choice.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleSkill(choice.value)}
                      className={`w-full text-left rounded-sm border px-4 py-3.5 transition-colors ${
                        selected
                          ? 'border-oxblood bg-oxblood/5 text-ink'
                          : disabled
                            ? 'border-ink/10 bg-cream-50 text-ink-300 cursor-not-allowed'
                            : 'border-ink/15 bg-cream hover:border-ink/30 text-ink-700'
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                            selected ? 'border-oxblood bg-oxblood' : 'border-ink/25'
                          }`}
                          aria-hidden
                        >
                          {selected ? <span className="text-[10px] text-cream font-bold">✓</span> : null}
                        </span>
                        <span className="leading-snug">{choice.label}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          {step.kind === 'text' ? (
            <div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink leading-snug">
                {step.question}
              </h2>
              <textarea
                value={String(answers[step.field] ?? '')}
                onChange={(e) => setSingle(step.field, e.target.value)}
                placeholder={step.placeholder}
                maxLength={step.maxLength ?? 500}
                rows={4}
                className="mt-6 w-full border border-ink/20 bg-cream px-4 py-3 text-ink leading-relaxed focus:border-oxblood focus:outline-none resize-y min-h-[120px]"
              />
            </div>
          ) : null}

          {step.kind === 'contact' ? (
            <div>
              <h2 className="font-display text-2xl md:text-3xl tracking-tight text-ink leading-snug">
                {step.question}
              </h2>
              {!showContactFields ? (
                <p className="mt-4 text-ink-600 leading-relaxed">
                  You opted out of the findings summary and follow-up — no contact details needed. Tap submit to
                  finish.
                </p>
              ) : (
                <>
                  <p className="mt-4 text-ink-600 leading-relaxed">
                    Only if you asked for the research summary or agreed to follow-up. We will not add you to
                    marketing lists without separate consent.
                  </p>
                  <div className="mt-6 space-y-2.5">
                    {[
                      { value: 'Email', label: 'Email' },
                      { value: 'Phone', label: 'Phone' },
                      { value: 'Both Phone & Email', label: 'Both phone & email' },
                    ].map((choice) => (
                      <ChoiceCard
                        key={choice.value}
                        label={choice.label}
                        selected={answers.preferredContact === choice.value}
                        onSelect={() => setSingle('preferredContact', choice.value)}
                      />
                    ))}
                  </div>
                  {(answers.preferredContact === 'Phone' ||
                    answers.preferredContact === 'Both Phone & Email') && (
                    <label className="mt-6 block">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">Phone</span>
                      <input
                        type="tel"
                        value={answers.phone}
                        onChange={(e) => setSingle('phone', e.target.value)}
                        className="mt-2 w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
                        autoComplete="tel"
                      />
                    </label>
                  )}
                  {(answers.preferredContact === 'Email' ||
                    answers.preferredContact === 'Both Phone & Email') && (
                    <label className="mt-6 block">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500">Email</span>
                      <input
                        type="email"
                        value={answers.email}
                        onChange={(e) => setSingle('email', e.target.value)}
                        className="mt-2 w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
                        autoComplete="email"
                      />
                    </label>
                  )}
                </>
              )}
              {isLastStep ? (
                <div className="mt-8">
                  <FormProtectionFields
                    turnstileSiteKey={turnstileSiteKey}
                    onTurnstileSuccess={setTurnstileToken}
                    onTurnstileExpire={() => setTurnstileToken('')}
                    turnstileResetKey={turnstileKey}
                    honeypotValue={honeypot}
                    onHoneypotChange={setHoneypot}
                  />
                  {tokenError ? (
                    <p className="mt-3 text-sm text-oxblood">Security check failed to load. Refresh and try again.</p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {stepError ? <p className="text-sm text-oxblood">{stepError}</p> : null}
          {submitError ? <p className="text-sm text-oxblood">{submitError}</p> : null}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-ink/10">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0 || submitting}
              className="text-sm text-ink-500 hover:text-ink disabled:opacity-40"
            >
              Back
            </button>
            {isLastStep ? (
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? 'Submitting…' : 'Submit survey'}
              </button>
            ) : (
              <button type="button" onClick={goNext} className="btn-primary w-full sm:w-auto">
                Continue
              </button>
            )}
          </div>

          <p className="text-xs text-ink-400 leading-relaxed">
            Stratezik Digital Inc. · Research only ·{' '}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-ink-600">
              Privacy Notice
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}
