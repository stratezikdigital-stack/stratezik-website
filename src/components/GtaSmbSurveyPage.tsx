import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FormProtectionFields } from './spam/FormProtectionFields'
import { useFormProtection } from '../lib/spam/useFormProtection'
import {
  EMPTY_SURVEY_ANSWERS,
  SURVEY_INTRO,
  SURVEY_PAGE_QUESTION_IDS,
  needsContactFields,
  questionById,
  surveyProgress,
  validatePage,
  type GtaSmbSurveyAnswers,
  type SurveyQuestion,
} from '../research/gtaSmbSurveyQuestions'

const PAGE_COUNT = SURVEY_PAGE_QUESTION_IDS.length

function ChoiceCard({
  selected,
  label,
  onSelect,
  compact,
}: {
  selected: boolean
  label: string
  onSelect: () => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-sm border transition-colors ${
        compact ? 'px-3 py-2.5 text-sm' : 'px-4 py-3.5'
      } ${
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

function SurveyQuestionBlock({
  q,
  answers,
  setSingle,
  toggleSkill,
}: {
  q: SurveyQuestion
  answers: GtaSmbSurveyAnswers
  setSingle: (field: keyof GtaSmbSurveyAnswers, value: string) => void
  toggleSkill: (value: string) => void
}) {
  if (q.kind === 'contact-preference' || q.kind === 'phone' || q.kind === 'email') {
    if (!needsContactFields(answers)) return null
  }

  if (q.kind === 'phone') {
    const pref = answers.preferredContact
    if (pref !== 'Phone' && pref !== 'Both Phone & Email') return null
  }
  if (q.kind === 'email') {
    const pref = answers.preferredContact
    if (pref !== 'Email' && pref !== 'Both Phone & Email') return null
  }

  return (
    <fieldset className="border-t border-ink/10 pt-8 first:border-t-0 first:pt-0">
      <legend className="font-display text-xl md:text-2xl tracking-tight text-ink leading-snug mb-4">
        {q.question}
        {q.kind !== 'contact-preference' && q.kind !== 'phone' && q.kind !== 'email' && (
          <span className="text-oxblood ml-1" aria-hidden>
            *
          </span>
        )}
      </legend>

      {q.kind === 'single' ? (
        <>
          <div className="space-y-2">
            {q.choices.map((choice) => (
              <ChoiceCard
                key={choice.value}
                label={choice.label}
                compact
                selected={answers[q.field] === choice.value}
                onSelect={() => setSingle(q.field, choice.value)}
              />
            ))}
          </div>
          {q.allowOther && answers[q.field] === 'Other' && q.otherField ? (
            <input
              type="text"
              value={String(answers[q.otherField] ?? '')}
              onChange={(e) => setSingle(q.otherField!, e.target.value)}
              placeholder="Other"
              className="mt-3 w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
            />
          ) : null}
        </>
      ) : null}

      {q.kind === 'multi' ? (
        <>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
            {answers.skills.length}/3 selected
          </p>
          <div className="space-y-2">
            {q.choices.map((choice) => {
              const selected = answers.skills.includes(choice.value)
              const disabled = !selected && answers.skills.length >= q.max
              return (
                <button
                  key={choice.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleSkill(choice.value)}
                  className={`w-full text-left rounded-sm border px-3 py-2.5 text-sm transition-colors ${
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
        </>
      ) : null}

      {q.kind === 'text' ? (
        <textarea
          value={String(answers[q.field] ?? '')}
          onChange={(e) => setSingle(q.field, e.target.value)}
          maxLength={q.maxLength ?? 500}
          rows={3}
          className="w-full border border-ink/20 bg-cream px-4 py-3 text-ink leading-relaxed focus:border-oxblood focus:outline-none resize-y min-h-[96px]"
        />
      ) : null}

      {q.kind === 'contact-preference' ? (
        <div className="space-y-2">
          {[
            { value: 'Phone', label: 'Phone' },
            { value: 'Email', label: 'Email' },
            { value: 'Both Phone & Email', label: 'Both Phone & Email' },
          ].map((choice) => (
            <ChoiceCard
              key={choice.value}
              label={choice.label}
              compact
              selected={answers.preferredContact === choice.value}
              onSelect={() => setSingle('preferredContact', choice.value)}
            />
          ))}
        </div>
      ) : null}

      {q.kind === 'phone' ? (
        <input
          type="tel"
          value={answers.phone}
          onChange={(e) => setSingle('phone', e.target.value)}
          className="w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
          autoComplete="tel"
        />
      ) : null}

      {q.kind === 'email' ? (
        <input
          type="email"
          value={answers.email}
          onChange={(e) => setSingle('email', e.target.value)}
          className="w-full border border-ink/20 bg-cream px-4 py-3 text-ink focus:border-oxblood focus:outline-none"
          autoComplete="email"
        />
      ) : null}
    </fieldset>
  )
}

export default function GtaSmbSurveyPage() {
  const [params] = useSearchParams()
  const ref = params.get('ref')?.trim().slice(0, 80) ?? ''

  const [pageIndex, setPageIndex] = useState(-1)
  const [answers, setAnswers] = useState<GtaSmbSurveyAnswers>({ ...EMPTY_SURVEY_ANSWERS })
  const [pageError, setPageError] = useState('')
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

  const progress = useMemo(() => surveyProgress(answers), [answers])
  const showContact = useMemo(() => needsContactFields(answers), [answers])
  const isIntro = pageIndex < 0
  const isLastPage = pageIndex === PAGE_COUNT - 1
  const pageQuestionIds = pageIndex >= 0 ? SURVEY_PAGE_QUESTION_IDS[pageIndex] : []

  const setSingle = (field: keyof GtaSmbSurveyAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
    setPageError('')
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
    setPageError('')
  }

  const goNext = () => {
    if (isIntro) {
      setPageIndex(0)
      setPageError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const err = validatePage(pageIndex, answers)
    if (err) {
      setPageError(err)
      return
    }
    if (pageIndex < PAGE_COUNT - 1) {
      setPageIndex((i) => i + 1)
      setPageError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goBack = () => {
    if (pageIndex === 0) {
      setPageIndex(-1)
    } else if (pageIndex > 0) {
      setPageIndex((i) => i - 1)
    }
    setPageError('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validatePage(pageIndex, answers)
    if (err) {
      setPageError(err)
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
        <div className="container-custom mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Thank you</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">Response recorded.</h1>
          <p className="mt-6 lead text-ink-600">
            {answers.findingsSummary.startsWith('Yes')
              ? 'We will send the aggregated research summary when it is ready — no commercial messages.'
              : 'Thank you for contributing to this research.'}
          </p>
          <p className="mt-4 text-sm text-ink-500">
            <Link to="/privacy" className="text-oxblood underline underline-offset-2">
              Privacy Notice
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-cream/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="container-custom mx-auto flex items-center justify-between gap-4 px-6 py-4 md:px-12">
          <Link to="/" className="font-display text-lg tracking-tight text-ink">
            Stratezik
          </Link>
          {!isIntro ? (
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">
              {progress.answered} of {progress.total} answered
            </div>
          ) : null}
        </div>
        {!isIntro ? (
          <div className="h-1 bg-ink/5" aria-hidden>
            <div
              className="h-full bg-oxblood transition-all duration-300"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        ) : null}
      </header>

      <div className="container-custom mx-auto max-w-2xl px-6 py-10 md:px-12 md:py-14">
        <form onSubmit={isLastPage ? handleSubmit : (e) => e.preventDefault()} className="space-y-8">
          {isIntro ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-oxblood">Research survey</p>
              <h1 className="mt-3 font-display text-2xl md:text-3xl tracking-tight text-ink leading-[1.15]">
                {SURVEY_INTRO.title}
              </h1>
              <div className="mt-6 space-y-4 text-ink-600 leading-relaxed">
                <p>
                  <span className="font-medium text-ink">Purpose:</span> {SURVEY_INTRO.purpose}
                </p>
                <p>
                  <span className="font-medium text-ink">Time:</span> {SURVEY_INTRO.time}
                </p>
                <p>
                  <span className="font-medium text-ink">Privacy:</span> {SURVEY_INTRO.privacy}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {pageQuestionIds.map((id) => {
                const q = questionById(id)
                if (!q) return null
                return (
                  <SurveyQuestionBlock
                    key={id}
                    q={q}
                    answers={answers}
                    setSingle={setSingle}
                    toggleSkill={toggleSkill}
                  />
                )
              })}

              {isLastPage && !showContact ? (
                <p className="text-sm text-ink-500 border-t border-ink/10 pt-6">
                  No contact details required based on your answers above.
                </p>
              ) : null}

              {isLastPage ? (
                <div className="border-t border-ink/10 pt-8">
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
          )}

          {pageError ? <p className="text-sm text-oxblood">{pageError}</p> : null}
          {submitError ? <p className="text-sm text-oxblood">{submitError}</p> : null}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-ink/10">
            <button
              type="button"
              onClick={goBack}
              disabled={isIntro || submitting}
              className="text-sm text-ink-500 hover:text-ink disabled:opacity-40"
            >
              Back
            </button>
            {isLastPage ? (
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            ) : (
              <button type="button" onClick={goNext} className="btn-primary w-full sm:w-auto">
                {isIntro ? 'Start survey' : 'Continue'}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
