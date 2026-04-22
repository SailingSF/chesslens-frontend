import { useState, type FormEvent } from 'react'
import { revealRef } from '../lib/reveal'

const BULLETS = [
  { n: 'i.',   text: 'AI-narrated game review that explains every mistake in plain language.' },
  { n: 'ii.',  text: 'Advanced move classification models trained on millions of games.' },
  { n: 'iii.', text: 'Live coaching during bot matches — questions that make you think, not moves that do the thinking for you.' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WAITLIST_URL = import.meta.env.VITE_WAITLIST_URL as string | undefined

type Status = 'idle' | 'submitting' | 'success' | 'error'

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      if (!WAITLIST_URL) throw new Error('Waitlist endpoint not configured.')

      const res = await fetch(WAITLIST_URL, {
        method: 'POST',
        // text/plain keeps this a CORS "simple request" — no preflight.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email: value,
          source: 'chesslens.ai',
          referrer: document.referrer || '',
          ts: new Date().toISOString(),
        }),
      })

      // Apps Script always returns 200, so trust the JSON body over res.ok.
      if (!res.ok) throw new Error(`Request failed (${res.status}).`)
      const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!body?.ok) throw new Error(body?.error || 'Unknown server error.')

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'waitlist_signup',
        waitlist_source: 'landing_hero',
        email_domain: value.split('@')[1]?.toLowerCase() ?? '',
      })

      setStatus('success')
    } catch (err) {
      console.error('[ChessLens waitlist]', err)
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again in a moment.')
    }
  }

  const submitted = status === 'success'

  return (
    <section id="waitlist" className="cl-section cl-waitlist">
      <div className="cl-waitlist-inner cl-fade" ref={revealRef}>
        <span className="cl-eyebrow">§ 04 · The cloud</span>
        <h2 className="cl-h2 cl-waitlist-h">
          No setup. <em>Just</em> improvement.
        </h2>
        <p className="cl-waitlist-sub">
          ChessLens cloud is coming — plug in, paste your game, and get the kind of
          feedback that actually raises your ELO.
        </p>

        <ul className="cl-waitlist-list">
          {BULLETS.map((b) => (
            <li key={b.n}>
              <span className="cl-wl-num">{b.n}</span>
              <span>{b.text}</span>
            </li>
          ))}
        </ul>

        {!submitted ? (
          <form className="cl-form" onSubmit={handleSubmit} noValidate>
            <div className="cl-form-field">
              <label htmlFor="cl-email" className="cl-visually-hidden">Email address</label>
              <input
                id="cl-email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                disabled={status === 'submitting'}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'cl-email-err' : undefined}
              />
              <button
                type="submit"
                className="cl-btn cl-btn-primary cl-form-btn"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Joining…' : 'Join the waitlist'}
                <span className="cl-btn-arrow" aria-hidden>→</span>
              </button>
            </div>
            {status === 'error' ? (
              <p id="cl-email-err" className="cl-form-fine cl-form-err" role="alert">
                {errorMsg}
              </p>
            ) : (
              <p className="cl-form-fine">No spam. We&rsquo;ll email when we launch.</p>
            )}
          </form>
        ) : (
          <div className="cl-confirm" role="status" aria-live="polite">
            <div className="cl-confirm-mark" aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  d="M4 12.5l5 5 11-11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="cl-confirm-title">You&rsquo;re on the list.</p>
              <p className="cl-confirm-sub">We&rsquo;ll be in touch.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
