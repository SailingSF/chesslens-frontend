import { useState, type FormEvent } from 'react'
import { revealRef } from '../lib/reveal'

const BULLETS = [
  { n: 'i.',   text: 'AI-narrated game review that explains every mistake in plain language.' },
  { n: 'ii.',  text: 'Advanced move classification models trained on millions of games.' },
  { n: 'iii.', text: 'Live coaching during bot matches — questions that make you think, not moves that do the thinking for you.' },
]

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return
    // TODO: wire to a real service (Resend, ConvertKit, Mailchimp, Loops).
    console.log('[ChessLens waitlist]', email)
    setSubmitted(true)
  }

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
          <form className="cl-form" onSubmit={handleSubmit}>
            <div className="cl-form-field">
              <label htmlFor="cl-email" className="cl-visually-hidden">Email address</label>
              <input
                id="cl-email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="cl-btn cl-btn-primary cl-form-btn">
                Join the waitlist <span className="cl-btn-arrow" aria-hidden>→</span>
              </button>
            </div>
            <p className="cl-form-fine">No spam. We&rsquo;ll email when we launch.</p>
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
