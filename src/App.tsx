import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'

// NOTE: Update this to the real GitHub repo URL when published.
const GITHUB_URL = 'https://github.com/SailingSF/chesslens-core'

// Stylized middle-game position used for the hero visual.
// Each array is a rank from 8 → 1. Unicode chess glyphs.
const HERO_POSITION: string[][] = [
  ['♜', '',  '♝', '♛', '♚', '',  '',  '♜'],
  ['♟', '',  '♟', '',  '',  '♟', '♟', '♟'],
  ['',  '♟', '♞', '♟', '',  '♞', '',  ''],
  ['',  '',  '',  '',  '♟', '',  '',  ''],
  ['',  '',  '♗', '♙', '♙', '',  '',  ''],
  ['',  '',  '♘', '',  '',  '♘', '',  ''],
  ['♙', '♙', '♙', '',  '',  '♙', '♙', '♙'],
  ['♖', '',  '♗', '♕', '♔', '',  '',  '♖'],
]

// Square coordinates: files a–h, ranks 8–1 top-down.
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

// Chess notation ticker — decorative, evokes the product surface.
const NOTATION_TICKER =
  '1. e4 e5  2. Nf3 Nc6  3. Bb5 a6  4. Ba4 Nf6  5. O-O Be7  6. Re1 b5  7. Bb3 d6  8. c3 O-O  9. h3 Nb8  10. d4 Nbd7  11. Nbd2 Bb7  12. Bc2 Re8  13. Nf1 Bf8  14. Ng3 g6  15. a4 c5  16. d5 c4  17. Bg5 h6'

export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const revealRefs = useRef<Set<HTMLElement>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    observerRef.current = io
    revealRefs.current.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      observerRef.current = null
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return
    // TODO: wire to a real service (Resend, ConvertKit, Mailchimp, Loops).
    console.log('[ChessLens waitlist]', email)
    setSubmitted(true)
  }

  const handleCopy = async () => {
    const snippet = [
      'git clone https://github.com/yourusername/chesslens-core',
      'cp .env.example .env',
      'docker compose up',
      '# Open localhost:8000',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const setRef = useCallback((el: HTMLElement | null) => {
    if (!el) return
    revealRefs.current.add(el)
    observerRef.current?.observe(el)
  }, [])

  return (
    <div className="cl-root">
      <style>{STYLES}</style>

      {/* Ambient background: chess grid texture + radial warm glow */}
      <div className="cl-bg" aria-hidden="true">
        <div className="cl-bg-grid" />
        <div className="cl-bg-glow" />
        <div className="cl-bg-noise" />
      </div>

      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav className="cl-nav">
        <a href="#top" className="cl-brand" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
          <span className="cl-brand-glyph" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.9" />
              <rect x="18" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="2" y="18" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="18" y="18" width="12" height="12" fill="currentColor" opacity="0.9" />
              <circle cx="16" cy="16" r="2.5" fill="#D4A14A" />
            </svg>
          </span>
          <span className="cl-brand-word">ChessLens</span>
        </a>

        <div className="cl-nav-links">
          <a href="#how" onClick={(e) => { e.preventDefault(); scrollTo('how') }}>How it works</a>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollTo('features') }}>Features</a>
          <a href="#github" onClick={(e) => { e.preventDefault(); scrollTo('oss') }}>Open source</a>
          <a href="#waitlist" onClick={(e) => { e.preventDefault(); scrollTo('waitlist') }} className="cl-nav-cta">
            Join waitlist <span aria-hidden>→</span>
          </a>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────── */}
      <section id="top" className="cl-hero">
        <div className="cl-hero-inner">
          <div className="cl-hero-left">
            <div className="cl-meta">
              <span className="cl-meta-dot" />
              <span className="cl-meta-text">v0.9 · In development · calibrated for ELO 600–1800</span>
            </div>

            <h1 className="cl-hero-headline">
              <span className="cl-reveal" style={{ animationDelay: '0.05s' }}>Understand</span>{' '}
              <span className="cl-reveal cl-accent-italic" style={{ animationDelay: '0.18s' }}>why</span>{' '}
              <span className="cl-reveal" style={{ animationDelay: '0.28s' }}>moves</span>{' '}
              <span className="cl-reveal cl-accent-italic" style={{ animationDelay: '0.38s' }}>win.</span>
              <br />
              <span className="cl-reveal cl-dim" style={{ animationDelay: '0.55s' }}>Or</span>{' '}
              <span className="cl-reveal cl-dim" style={{ animationDelay: '0.65s' }}>lose.</span>
              <br />
              <span className="cl-reveal" style={{ animationDelay: '0.85s' }}>And</span>{' '}
              <span className="cl-reveal cl-accent-italic" style={{ animationDelay: '0.95s' }}>raise</span>{' '}
              <span className="cl-reveal" style={{ animationDelay: '1.05s' }}>your</span>{' '}
              <span className="cl-reveal" style={{ animationDelay: '1.15s' }}>ELO.</span>
            </h1>

            <p className="cl-hero-sub">
              The feedback a good coach gives — specific, honest, sized to your level — powered
              by advanced move classification and AI narration. No engine gibberish.
              No setup.
            </p>

            <div className="cl-hero-ctas">
              <button
                type="button"
                className="cl-btn cl-btn-primary"
                onClick={() => scrollTo('waitlist')}
              >
                Join the waitlist
                <span className="cl-btn-arrow" aria-hidden>→</span>
              </button>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="cl-btn cl-btn-ghost"
              >
                View on GitHub
                <span className="cl-btn-arrow" aria-hidden>↗</span>
              </a>
            </div>

            <div className="cl-hero-kicker">
              <span className="cl-kicker-label">A thinking tool for players, not a marketing page.</span>
            </div>
          </div>

          <div className="cl-hero-right" aria-hidden="true">
            <HeroBoard />
          </div>
        </div>

        {/* Notation ticker at the foot of the hero */}
        <div className="cl-ticker" aria-hidden="true">
          <div className="cl-ticker-track">
            <span>{NOTATION_TICKER}</span>
            <span>{NOTATION_TICKER}</span>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────── */}
      <section id="how" className="cl-section cl-how">
        <div className="cl-section-head">
          <span className="cl-eyebrow">§ 01 · Pipeline</span>
          <h2 className="cl-h2">
            Three steps. Then the <em>real</em> work starts — yours.
          </h2>
        </div>

        <ol className="cl-steps">
          <li className="cl-step cl-fade" ref={setRef}>
            <div className="cl-step-num">01</div>
            <div className="cl-step-body">
              <h3>Paste your game</h3>
              <p>
                Upload any completed game from chess.com, Lichess, or a PGN file on disk.
                No plugins. No logins to a dozen services.
              </p>
              <div className="cl-step-art" aria-hidden>
                <div className="cl-pgn-card">
                  <div className="cl-pgn-head">
                    <span>game.pgn</span>
                    <span className="cl-pgn-dot" />
                  </div>
                  <div className="cl-pgn-body">
                    <div>[Event "Rated Rapid"]</div>
                    <div>[White "you"]</div>
                    <div>[Black "opponent"]</div>
                    <div className="cl-pgn-moves">1. e4 e5 2. Nf3 Nc6 3. Bb5 …</div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li className="cl-step cl-fade" ref={setRef}>
            <div className="cl-step-num">02</div>
            <div className="cl-step-body">
              <h3>Advanced analysis runs</h3>
              <p>
                Move classification models and modern chess engines evaluate every
                decision — not just the obvious blunders. Tactical motifs, positional
                drift, missed resources.
              </p>
              <div className="cl-step-art" aria-hidden>
                <EvalGraph />
              </div>
            </div>
          </li>

          <li className="cl-step cl-fade" ref={setRef}>
            <div className="cl-step-num">03</div>
            <div className="cl-step-body">
              <h3>Understand why, not just what</h3>
              <p>
                AI narrates each key moment in plain language, calibrated to your
                level. A sentence you&rsquo;ll remember the next time you see the pattern.
              </p>
              <div className="cl-step-art" aria-hidden>
                <div className="cl-quote-card">
                  <div className="cl-quote-label">
                    <span className="cl-tag cl-tag-blunder">Blunder</span>
                    <span className="cl-quote-move">17…h6?</span>
                  </div>
                  <p className="cl-quote-text">
                    &ldquo;This looks like a useful luft, but you&rsquo;ve just created a hook.
                    White&rsquo;s next move, g4, is now crushing — your own pawn gave
                    the attack its target.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────── */}
      <section id="features" className="cl-section cl-features">
        <div className="cl-section-head">
          <span className="cl-eyebrow">§ 02 · What makes it different</span>
          <h2 className="cl-h2">
            Built like a coach, not a <em>leaderboard</em>.
          </h2>
        </div>

        <div className="cl-feature-grid">
          <article className="cl-feature cl-fade" ref={setRef}>
            <div className="cl-feature-icon"><IconQuote /></div>
            <h3>AI-narrated explanations</h3>
            <p>
              Every key moment is explained in plain language by an AI that understands
              the position. Not a number. Not engine gibberish. A real explanation of
              why your move changed the game.
            </p>
          </article>

          <article className="cl-feature cl-fade" ref={setRef}>
            <div className="cl-feature-icon"><IconClassify /></div>
            <h3>Advanced move classification</h3>
            <p>
              Powered by models trained to classify moves the same way top platforms
              do — Best, Inaccuracy, Mistake, Blunder — with the reasoning to
              back it up.
            </p>
          </article>

          <article className="cl-feature cl-fade" ref={setRef}>
            <div className="cl-feature-icon"><IconBoard /></div>
            <h3>Understands the full position</h3>
            <p>
              Detects threats, tactical patterns, pawn structure, and piece activity —
              and weaves them into coaching that actually makes sense.
            </p>
          </article>

          <article className="cl-feature cl-fade" ref={setRef}>
            <div className="cl-feature-icon"><IconDial /></div>
            <h3>Calibrated to your level</h3>
            <p>
              Whether you&rsquo;re 600 or 1800, explanations match your understanding.
              No jargon for beginners. No hand-holding for experienced players.
            </p>
          </article>
        </div>
      </section>

      {/* ─── OPEN SOURCE ─────────────────────────────────────── */}
      <section id="oss" className="cl-section cl-oss">
        <div className="cl-oss-inner">
          <div className="cl-oss-copy">
            <span className="cl-eyebrow cl-eyebrow-amber">§ 03 · For the technical</span>
            <h2 className="cl-h2">
              Self-host it. <em>Hack it.</em> Make it yours.
            </h2>
            <p className="cl-oss-p">
              The core repo contains the full analysis pipeline — move classification
              models, engine orchestration, narration prompts, the whole chain. Clone
              it, add your own API keys, and run a fully functional chess explainer
              locally. No cloud required.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="cl-btn cl-btn-ghost cl-btn-amber"
            >
              View on GitHub <span className="cl-btn-arrow" aria-hidden>↗</span>
            </a>
          </div>

          <div className="cl-terminal">
            <div className="cl-terminal-chrome">
              <span className="cl-term-dot" data-c="r" />
              <span className="cl-term-dot" data-c="y" />
              <span className="cl-term-dot" data-c="g" />
              <span className="cl-term-title">~/chesslens-core · zsh</span>
              <button
                type="button"
                className="cl-term-copy"
                onClick={handleCopy}
                aria-label="Copy install commands"
              >
                {copied ? 'copied' : 'copy'}
              </button>
            </div>
            <pre className="cl-terminal-body">
              <code>
                <span className="cl-term-line">
                  <span className="cl-term-prompt">$</span> git clone{' '}
                  <span className="cl-term-url">https://github.com/yourusername/chesslens-core</span>
                </span>
                <span className="cl-term-line cl-term-muted">
                  Cloning into &apos;chesslens-core&apos;…{'\n'}
                  remote: Enumerating objects: 1,284, done.
                </span>
                <span className="cl-term-line">
                  <span className="cl-term-prompt">$</span> cp .env.example .env
                </span>
                <span className="cl-term-line">
                  <span className="cl-term-prompt">$</span> docker compose up
                </span>
                <span className="cl-term-line cl-term-muted">
                  chesslens-api     | ⚙  Loading classifier (Elo 600–1800)…{'\n'}
                  chesslens-api     | ✓  Stockfish bound at depth 22{'\n'}
                  chesslens-api     | ✓  Narrator ready · gpt-4o-mini{'\n'}
                  chesslens-api     | ▶  Listening on :8000
                </span>
                <span className="cl-term-line cl-term-comment"># Open localhost:8000</span>
                <span className="cl-term-line cl-term-cursor">
                  <span className="cl-term-prompt">$</span>
                  <span className="cl-caret" />
                </span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST ────────────────────────────────────────── */}
      <section id="waitlist" className="cl-section cl-waitlist">
        <div className="cl-waitlist-inner cl-fade" ref={setRef}>
          <span className="cl-eyebrow">§ 04 · The cloud</span>
          <h2 className="cl-h2 cl-waitlist-h">
            No setup. <em>Just</em> improvement.
          </h2>
          <p className="cl-waitlist-sub">
            ChessLens cloud is coming — plug in, paste your game, and get the kind of
            feedback that actually raises your ELO.
          </p>

          <ul className="cl-waitlist-list">
            <li>
              <span className="cl-wl-num">i.</span>
              <span>AI-narrated game review that explains every mistake in plain language.</span>
            </li>
            <li>
              <span className="cl-wl-num">ii.</span>
              <span>Advanced move classification models trained on millions of games.</span>
            </li>
            <li>
              <span className="cl-wl-num">iii.</span>
              <span>
                Live coaching during bot matches — questions that make you think,
                not moves that do the thinking for you.
              </span>
            </li>
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
                  <path d="M4 12.5l5 5 11-11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="cl-footer">
        <div className="cl-footer-inner">
          <div className="cl-footer-brand">
            <span className="cl-brand-glyph" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.9" />
                <rect x="18" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <rect x="2" y="18" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <rect x="18" y="18" width="12" height="12" fill="currentColor" opacity="0.9" />
                <circle cx="16" cy="16" r="2.5" fill="#D4A14A" />
              </svg>
            </span>
            <span className="cl-footer-word">ChessLens</span>
            <span className="cl-footer-tag">chesslens.ai</span>
          </div>
          <div className="cl-footer-links">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="mailto:hello@chesslens.ai">Contact ↗</a>
          </div>
          <div className="cl-footer-fine">
            © {new Date().getFullYear()} ChessLens · Made for players who want to understand.
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HERO BOARD — stylized mid-game position w/ annotations
   ═══════════════════════════════════════════════════════════════ */
function HeroBoard() {
  return (
    <div className="cl-board-wrap">
      {/* Eval bar */}
      <div className="cl-evalbar" aria-hidden>
        <div className="cl-evalbar-white" />
        <div className="cl-evalbar-mark">
          <span>+1.4</span>
        </div>
      </div>

      <div className="cl-board" role="img" aria-label="Stylized chess position">
        {/* Rank coordinates (left) */}
        <div className="cl-coords cl-coords-ranks">
          {[8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>

        {/* The 8×8 grid */}
        <div className="cl-board-grid">
          {HERO_POSITION.map((rank, ri) =>
            rank.map((piece, fi) => {
              const isLight = (ri + fi) % 2 === 0
              const file = FILES[fi]
              const rankNum = 8 - ri
              const square = `${file}${rankNum}`
              const isKey = square === 'c4' // highlighted "just played" piece
              const isTarget = square === 'e5' // captured/threatened square
              const isBlack = piece && '♟♜♞♝♛♚'.includes(piece)
              return (
                <div
                  key={square}
                  className={[
                    'cl-sq',
                    isLight ? 'cl-sq-l' : 'cl-sq-d',
                    isKey ? 'cl-sq-key' : '',
                    isTarget ? 'cl-sq-target' : '',
                  ].join(' ')}
                >
                  {piece && (
                    <span className={`cl-piece ${isBlack ? 'cl-piece-b' : 'cl-piece-w'}`}>
                      {piece}
                    </span>
                  )}
                </div>
              )
            }),
          )}

          {/* Floating annotation: a best-move pill */}
          <div className="cl-annot cl-annot-best">
            <span className="cl-annot-dot" />
            <span className="cl-annot-move">Bxf7+</span>
            <span className="cl-annot-tag">Best</span>
          </div>

          {/* Floating annotation: narration snippet */}
          <div className="cl-annot cl-annot-narr">
            <span className="cl-annot-lead">Why it wins →</span>
            <span className="cl-annot-body">
              King is dragged to f7. Knight-fork on e5 is forced next.
            </span>
          </div>
        </div>

        {/* File coordinates (bottom) */}
        <div className="cl-coords cl-coords-files">
          {FILES.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Minor decorative pieces
   ═══════════════════════════════════════════════════════════════ */
function EvalGraph() {
  // Stylized eval curve — static, decorative. 40 points.
  const pts = [
    0.1, 0.2, 0.15, 0.3, 0.4, 0.35, 0.5, 0.45, 0.6, 0.55, 0.65, 0.7, 0.6, 0.7,
    0.85, 0.8, 0.7, 0.6, 0.4, 0.2, -0.1, -0.3, -0.2, -0.4, -0.3, -0.5, -0.7,
    -0.9, -0.7, -0.8, -1.0, -0.9, -1.2, -1.4, -1.1, -0.9, -1.0, -0.8, -0.6, -0.7,
  ]
  const w = 320
  const h = 96
  const max = 1.5
  const dx = w / (pts.length - 1)
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * dx} ${h / 2 - (v / max) * (h / 2 - 6)}`).join(' ')
  const area = `${line} L ${w} ${h / 2} L 0 ${h / 2} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="cl-evalgraph">
      <line x1="0" y1={h / 2} x2={w} y2={h / 2} stroke="rgba(232,225,204,0.12)" strokeDasharray="2 3" />
      <path d={area} fill="rgba(212,161,74,0.08)" />
      <path d={line} fill="none" stroke="#D4A14A" strokeWidth="1.4" />
      {/* blunder marker */}
      <circle cx={20 * dx} cy={h / 2 - (pts[20] / max) * (h / 2 - 6)} r="3" fill="#E8E1CC" />
      <circle cx={20 * dx} cy={h / 2 - (pts[20] / max) * (h / 2 - 6)} r="6" fill="none" stroke="#D4A14A" strokeOpacity="0.6" />
      <text x={20 * dx + 10} y={h / 2 - (pts[20] / max) * (h / 2 - 6) - 6} fontFamily="JetBrains Mono" fontSize="9" fill="#E8E1CC">17…h6?</text>
    </svg>
  )
}

function IconQuote() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M4 5h16v11H8l-4 4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="8" y1="9.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function IconClassify() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="3" y="4" width="4" height="16" fill="currentColor" opacity="0.9" />
      <rect x="9" y="8" width="4" height="12" fill="currentColor" opacity="0.6" />
      <rect x="15" y="12" width="4" height="8" fill="currentColor" opacity="0.35" />
      <line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function IconBoard() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3" y="3" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="15" y="3" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="3" y="15" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="15" y="15" width="6" height="6" fill="currentColor" opacity="0.85" />
      <circle cx="12" cy="12" r="2" fill="#D4A14A" />
    </svg>
  )
}

function IconDial() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M4 16 A 8 8 0 0 1 20 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="16" x2="17" y2="9" stroke="#D4A14A" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      <line x1="4" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="19" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STYLES — single <style> tag, scoped by cl- prefix
   ═══════════════════════════════════════════════════════════════ */
const STYLES = `
.cl-root {
  --ink: #0B0A08;
  --ink-2: #11100D;
  --ink-3: #15130F;
  --paper: #E8E1CC;
  --paper-dim: #8C8573;
  --paper-faint: #5A5446;
  --amber: #D4A14A;
  --amber-hot: #F0B860;
  --amber-deep: #9A7430;
  --rule: rgba(232, 225, 204, 0.09);
  --rule-2: rgba(232, 225, 204, 0.16);
  --blunder: #C85A3E;
  --font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
  --font-sans: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  position: relative;
  color: var(--paper);
  font-family: var(--font-sans);
  font-weight: 400;
  line-height: 1.55;
  font-size: 16px;
  background: var(--ink);
  min-height: 100vh;
  overflow: hidden;
}

/* ── Background: grid + warm glow + noise ─────────────────── */
.cl-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.cl-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(232,225,204,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(232,225,204,0.03) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 40%, black 0%, black 50%, transparent 100%);
}
.cl-bg-glow {
  position: absolute;
  top: -30%;
  right: -20%;
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, rgba(212,161,74,0.14), transparent 60%);
  filter: blur(40px);
}
.cl-bg-noise {
  position: absolute;
  inset: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' /></filter><rect width='100%' height='100%' filter='url(%23n)' /></svg>");
  mix-blend-mode: overlay;
}

/* ── Nav ──────────────────────────────────────────────────── */
.cl-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 48px;
  max-width: 1440px;
  margin: 0 auto;
}
.cl-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--paper);
  text-decoration: none;
  font-weight: 500;
}
.cl-brand-glyph {
  display: inline-flex;
  color: var(--paper);
  line-height: 0;
}
.cl-brand-word {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.cl-nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}
.cl-nav-links a {
  color: var(--paper-dim);
  text-decoration: none;
  font-size: 13.5px;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}
.cl-nav-links a:hover { color: var(--paper); }
.cl-nav-cta {
  color: var(--amber) !important;
  border: 1px solid rgba(212,161,74,0.35);
  padding: 8px 14px;
  border-radius: 2px;
  transition: all 0.2s;
}
.cl-nav-cta:hover {
  background: rgba(212,161,74,0.08);
  border-color: var(--amber);
}

/* ── Hero ─────────────────────────────────────────────────── */
.cl-hero {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px 48px 40px;
}
.cl-hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 80px;
  align-items: center;
  min-height: 70vh;
}
.cl-hero-left { position: relative; }

.cl-meta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  border: 1px solid var(--rule-2);
  border-radius: 2px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--paper-dim);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 36px;
}
.cl-meta-dot {
  width: 6px;
  height: 6px;
  background: var(--amber);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--amber);
  animation: cl-pulse 2.4s ease-in-out infinite;
}
@keyframes cl-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.cl-hero-headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(44px, 6.4vw, 88px);
  line-height: 0.98;
  letter-spacing: -0.025em;
  margin: 0 0 32px;
  color: var(--paper);
  font-variation-settings: 'opsz' 144, 'SOFT' 30;
}
.cl-hero-headline .cl-dim { color: var(--paper-faint); }
.cl-accent-italic {
  font-style: italic;
  color: var(--amber);
  font-variation-settings: 'opsz' 144, 'SOFT' 80;
}

.cl-reveal {
  display: inline-block;
  opacity: 0;
  transform: translateY(18px);
  animation: cl-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes cl-rise {
  to { opacity: 1; transform: translateY(0); }
}

.cl-hero-sub {
  font-size: 18px;
  line-height: 1.55;
  color: var(--paper-dim);
  max-width: 520px;
  margin: 0 0 40px;
  opacity: 0;
  animation: cl-rise 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards;
  animation-delay: 1.25s;
}

.cl-hero-ctas {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 48px;
  opacity: 0;
  animation: cl-rise 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards;
  animation-delay: 1.4s;
}

.cl-hero-kicker {
  opacity: 0;
  animation: cl-rise 0.9s cubic-bezier(0.2,0.8,0.2,1) forwards;
  animation-delay: 1.55s;
}
.cl-kicker-label {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper-faint);
  padding-left: 16px;
  border-left: 1px solid var(--rule-2);
}

/* ── Buttons ─────────────────────────────────────────────── */
.cl-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  background: transparent;
  color: inherit;
}
.cl-btn-primary {
  background: var(--amber);
  color: var(--ink);
  border-color: var(--amber);
}
.cl-btn-primary:hover {
  background: var(--amber-hot);
  border-color: var(--amber-hot);
  transform: translateY(-1px);
  box-shadow: 0 10px 30px -10px rgba(212,161,74,0.5);
}
.cl-btn-ghost {
  color: var(--paper);
  border-color: var(--rule-2);
}
.cl-btn-ghost:hover {
  border-color: var(--paper);
}
.cl-btn-amber {
  color: var(--amber);
  border-color: rgba(212,161,74,0.4);
}
.cl-btn-amber:hover {
  border-color: var(--amber);
  background: rgba(212,161,74,0.08);
}
.cl-btn-arrow {
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.2,0.8,0.2,1);
}
.cl-btn:hover .cl-btn-arrow { transform: translateX(3px); }

/* ── Hero board ──────────────────────────────────────────── */
.cl-hero-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: cl-board-in 1.2s cubic-bezier(0.2,0.8,0.2,1) forwards;
  animation-delay: 0.4s;
}
@keyframes cl-board-in {
  to { opacity: 1; }
}
.cl-board-wrap {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: center;
}
.cl-evalbar {
  position: relative;
  width: 10px;
  height: 440px;
  background: var(--ink-3);
  border: 1px solid var(--rule-2);
  overflow: hidden;
}
.cl-evalbar-white {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 62%;
  background: linear-gradient(180deg, #E8E1CC, #C8C2A8);
  animation: cl-eval 4s ease-in-out infinite alternate;
}
@keyframes cl-eval {
  0% { height: 58%; }
  100% { height: 64%; }
}
.cl-evalbar-mark {
  position: absolute;
  left: 16px;
  bottom: 62%;
  transform: translateY(50%);
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--amber);
  letter-spacing: 0.05em;
}
.cl-evalbar-mark::before {
  content: '';
  position: absolute;
  left: -8px;
  top: 50%;
  width: 6px;
  height: 1px;
  background: var(--amber);
}

.cl-board {
  position: relative;
  padding: 24px 0 24px 24px;
}
.cl-coords {
  position: absolute;
  display: flex;
  font-family: var(--font-mono);
  font-size: 9.5px;
  color: var(--paper-faint);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.cl-coords-ranks {
  flex-direction: column;
  justify-content: space-around;
  top: 24px;
  bottom: 24px;
  left: 0;
  width: 16px;
  align-items: center;
}
.cl-coords-files {
  flex-direction: row;
  justify-content: space-around;
  bottom: 0;
  left: 24px;
  right: 0;
  height: 16px;
  align-items: center;
}

.cl-board-grid {
  position: relative;
  width: 440px;
  height: 440px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  border: 1px solid var(--rule-2);
  background: var(--ink-2);
  box-shadow:
    0 40px 80px -30px rgba(0,0,0,0.8),
    0 0 0 1px rgba(212,161,74,0.06),
    inset 0 0 60px rgba(212,161,74,0.02);
}
.cl-sq {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background 0.3s;
}
.cl-sq-l { background: rgba(232,225,204,0.035); }
.cl-sq-d { background: transparent; }
.cl-sq-key::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 1.5px solid var(--amber);
  border-radius: 1px;
  animation: cl-key-pulse 2.4s ease-in-out infinite;
}
@keyframes cl-key-pulse {
  0%, 100% { opacity: 0.5; box-shadow: 0 0 0 0 rgba(212,161,74,0); }
  50% { opacity: 1; box-shadow: 0 0 18px -2px rgba(212,161,74,0.6); }
}
.cl-sq-target::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(212,161,74,0.32);
  box-shadow: 0 0 0 1px rgba(212,161,74,0.5);
}
.cl-piece {
  position: relative;
  z-index: 1;
  font-size: 36px;
  line-height: 1;
  font-family: 'Arial Unicode MS', 'Segoe UI Symbol', sans-serif;
  user-select: none;
  transition: transform 0.2s;
}
.cl-piece-w {
  color: #F2ECDD;
  text-shadow: 0 1px 0 rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
}
.cl-piece-b {
  color: #1A1712;
  text-shadow: 0 1px 0 rgba(232,225,204,0.2);
  -webkit-text-stroke: 0.5px rgba(232,225,204,0.15);
}

.cl-annot {
  position: absolute;
  z-index: 5;
  pointer-events: none;
  font-family: var(--font-mono);
  animation: cl-float-in 0.8s cubic-bezier(0.2,0.8,0.2,1) forwards;
  opacity: 0;
  animation-delay: 1.6s;
}
@keyframes cl-float-in {
  to { opacity: 1; }
}
.cl-annot-best {
  top: -18px;
  right: -38px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: var(--ink);
  border: 1px solid var(--amber);
  border-radius: 2px;
  font-size: 11px;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 20px -4px rgba(212,161,74,0.5);
}
.cl-annot-dot {
  width: 5px;
  height: 5px;
  background: var(--amber);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--amber);
}
.cl-annot-move { color: var(--paper); font-weight: 500; }
.cl-annot-tag {
  color: var(--amber);
  text-transform: uppercase;
  font-size: 9.5px;
  letter-spacing: 0.12em;
  padding-left: 8px;
  border-left: 1px solid rgba(212,161,74,0.4);
}

.cl-annot-narr {
  bottom: -12px;
  left: -60px;
  max-width: 240px;
  padding: 14px 16px;
  background: var(--ink);
  border: 1px solid var(--rule-2);
  border-left: 2px solid var(--amber);
  font-family: var(--font-sans);
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--paper);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6);
  animation-delay: 2s;
}
.cl-annot-lead {
  display: block;
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 6px;
}
.cl-annot-body { color: var(--paper-dim); }

/* ── Ticker ──────────────────────────────────────────────── */
.cl-ticker {
  position: relative;
  margin-top: 60px;
  padding: 14px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  overflow: hidden;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--paper-faint);
  letter-spacing: 0.08em;
  mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
}
.cl-ticker-track {
  display: inline-flex;
  gap: 80px;
  animation: cl-ticker 60s linear infinite;
}
.cl-ticker-track span { flex-shrink: 0; }
@keyframes cl-ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── Sections ────────────────────────────────────────────── */
.cl-section {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 120px 48px;
}
.cl-section-head {
  max-width: 720px;
  margin: 0 0 80px;
}
.cl-eyebrow {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--paper-dim);
  margin-bottom: 20px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--rule-2);
}
.cl-eyebrow-amber {
  color: var(--amber);
  border-bottom-color: rgba(212,161,74,0.3);
}
.cl-h2 {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 54px);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.05;
  margin: 0;
  color: var(--paper);
  font-variation-settings: 'opsz' 144, 'SOFT' 40;
}
.cl-h2 em {
  font-style: italic;
  color: var(--amber);
  font-variation-settings: 'opsz' 144, 'SOFT' 100;
}

/* ── Fade-in util (scroll-triggered) ─────────────────────── */
.cl-fade {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.2,0.8,0.2,1), transform 0.8s cubic-bezier(0.2,0.8,0.2,1);
}
.cl-fade.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── How it works ────────────────────────────────────────── */
.cl-how { padding-top: 100px; }
.cl-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--rule-2);
  border-bottom: 1px solid var(--rule-2);
}
.cl-step {
  position: relative;
  padding: 48px 40px 48px 0;
  border-right: 1px solid var(--rule-2);
}
.cl-step:last-child { border-right: none; }
.cl-step:nth-child(n+2) { padding-left: 40px; }
.cl-step-num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--amber);
  margin-bottom: 20px;
}
.cl-step-body h3 {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin: 0 0 14px;
  color: var(--paper);
}
.cl-step-body p {
  color: var(--paper-dim);
  font-size: 15px;
  margin: 0 0 28px;
}
.cl-step-art { margin-top: 16px; min-height: 120px; }

.cl-pgn-card {
  background: var(--ink-2);
  border: 1px solid var(--rule-2);
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--paper-dim);
}
.cl-pgn-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--rule-2);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--paper-faint);
}
.cl-pgn-dot {
  width: 5px;
  height: 5px;
  background: var(--amber);
  border-radius: 50%;
}
.cl-pgn-body { padding: 12px; line-height: 1.6; }
.cl-pgn-moves {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--rule-2);
  color: var(--paper);
}

.cl-evalgraph {
  width: 100%;
  height: auto;
  max-width: 320px;
}

.cl-quote-card {
  background: var(--ink-2);
  border: 1px solid var(--rule-2);
  border-left: 2px solid var(--amber);
  padding: 14px 16px;
}
.cl-quote-label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.cl-tag {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 1px;
}
.cl-tag-blunder {
  background: rgba(200,90,62,0.15);
  color: var(--blunder);
  border: 1px solid rgba(200,90,62,0.4);
}
.cl-quote-move {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--paper);
}
.cl-quote-text {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 14px;
  line-height: 1.5;
  color: var(--paper);
  margin: 0;
}

/* ── Features ────────────────────────────────────────────── */
.cl-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--rule-2);
  border-left: 1px solid var(--rule-2);
}
.cl-feature {
  padding: 48px 48px 56px;
  border-right: 1px solid var(--rule-2);
  border-bottom: 1px solid var(--rule-2);
  transition: background 0.3s;
}
.cl-feature:hover {
  background: linear-gradient(180deg, transparent, rgba(212,161,74,0.02));
}
.cl-feature-icon {
  color: var(--amber);
  margin-bottom: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(212,161,74,0.3);
  border-radius: 2px;
}
.cl-feature h3 {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
  color: var(--paper);
}
.cl-feature p {
  font-size: 15px;
  line-height: 1.6;
  color: var(--paper-dim);
  margin: 0;
  max-width: 48ch;
}

/* ── Open source ─────────────────────────────────────────── */
.cl-oss {
  background:
    linear-gradient(180deg, transparent, rgba(212,161,74,0.02) 50%, transparent),
    radial-gradient(ellipse at 80% 50%, rgba(212,161,74,0.05), transparent 60%);
  border-top: 1px solid var(--rule-2);
  border-bottom: 1px solid var(--rule-2);
}
.cl-oss-inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 72px;
  align-items: center;
}
.cl-oss-p {
  color: var(--paper-dim);
  font-size: 17px;
  line-height: 1.6;
  margin: 24px 0 40px;
  max-width: 52ch;
}

/* ── Terminal card ───────────────────────────────────────── */
.cl-terminal {
  background: #06050A;
  border: 1px solid var(--rule-2);
  border-radius: 4px;
  overflow: hidden;
  box-shadow:
    0 30px 60px -20px rgba(0,0,0,0.7),
    0 0 0 1px rgba(212,161,74,0.05);
}
.cl-terminal-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  background: var(--ink-2);
  border-bottom: 1px solid var(--rule-2);
}
.cl-term-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #333;
}
.cl-term-dot[data-c="r"] { background: #C85A3E; }
.cl-term-dot[data-c="y"] { background: #D4A14A; }
.cl-term-dot[data-c="g"] { background: #6B8E5A; }
.cl-term-title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--paper-faint);
  margin-left: 8px;
  letter-spacing: 0.04em;
}
.cl-term-copy {
  margin-left: auto;
  background: transparent;
  border: 1px solid var(--rule-2);
  border-radius: 2px;
  color: var(--paper-dim);
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 4px 8px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all 0.2s;
}
.cl-term-copy:hover {
  border-color: var(--amber);
  color: var(--amber);
}

.cl-terminal-body {
  margin: 0;
  padding: 22px 24px 24px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--paper);
  background: #06050A;
  overflow-x: auto;
  white-space: pre;
}
.cl-terminal-body code { display: block; }
.cl-term-line {
  display: block;
  white-space: pre-wrap;
}
.cl-term-prompt {
  color: var(--amber);
  margin-right: 10px;
  user-select: none;
}
.cl-term-url { color: #9BC29B; }
.cl-term-muted { color: var(--paper-faint); }
.cl-term-comment { color: var(--paper-faint); font-style: italic; }
.cl-term-cursor { display: flex; align-items: center; }
.cl-caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--amber);
  margin-left: 4px;
  animation: cl-blink 1s steps(2) infinite;
}
@keyframes cl-blink { 50% { opacity: 0; } }

/* ── Waitlist ────────────────────────────────────────────── */
.cl-waitlist {
  display: flex;
  justify-content: center;
  padding: 140px 48px;
}
.cl-waitlist-inner {
  max-width: 720px;
  width: 100%;
  text-align: left;
}
.cl-waitlist-h { margin-bottom: 24px; }
.cl-waitlist-sub {
  color: var(--paper-dim);
  font-size: 18px;
  line-height: 1.55;
  margin: 0 0 40px;
  max-width: 52ch;
}
.cl-waitlist-list {
  list-style: none;
  margin: 0 0 48px;
  padding: 0;
  border-top: 1px solid var(--rule-2);
}
.cl-waitlist-list li {
  display: flex;
  gap: 24px;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule-2);
  font-size: 15.5px;
  color: var(--paper);
}
.cl-wl-num {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--amber);
  letter-spacing: 0.1em;
  flex-shrink: 0;
  width: 24px;
  padding-top: 3px;
}

.cl-form-field {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.cl-form-field input {
  flex: 1;
  min-width: 260px;
  background: var(--ink-2);
  border: 1px solid var(--rule-2);
  color: var(--paper);
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 14px 18px;
  border-radius: 2px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.cl-form-field input::placeholder {
  color: var(--paper-faint);
}
.cl-form-field input:focus {
  border-color: var(--amber);
  background: var(--ink-3);
}
.cl-form-btn { flex-shrink: 0; }
.cl-form-fine {
  margin: 16px 0 0;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--paper-faint);
  letter-spacing: 0.04em;
}

.cl-confirm {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: var(--ink-2);
  border: 1px solid rgba(212,161,74,0.3);
  border-left: 2px solid var(--amber);
  border-radius: 2px;
  animation: cl-rise 0.5s cubic-bezier(0.2,0.8,0.2,1) forwards;
}
.cl-confirm-mark {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(212,161,74,0.15);
  color: var(--amber);
  flex-shrink: 0;
}
.cl-confirm-title {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--paper);
  margin: 0 0 2px;
}
.cl-confirm-sub {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--paper-dim);
  margin: 0;
  letter-spacing: 0.04em;
}

/* ── Footer ──────────────────────────────────────────────── */
.cl-footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid var(--rule-2);
  padding: 56px 48px;
}
.cl-footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
}
.cl-footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--paper);
}
.cl-footer-word {
  font-family: var(--font-display);
  font-size: 18px;
}
.cl-footer-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--paper-faint);
  padding-left: 12px;
  margin-left: 4px;
  border-left: 1px solid var(--rule-2);
  letter-spacing: 0.04em;
}
.cl-footer-links {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.cl-footer-links a {
  color: var(--paper-dim);
  text-decoration: none;
  font-size: 13.5px;
  transition: color 0.2s;
}
.cl-footer-links a:hover { color: var(--amber); }
.cl-footer-fine {
  text-align: right;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--paper-faint);
  letter-spacing: 0.04em;
}

.cl-visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}

/* ─── Responsive ───────────────────────────────────────── */
@media (max-width: 1100px) {
  .cl-hero-inner { grid-template-columns: 1fr; gap: 60px; }
  .cl-hero-right { order: -1; }
  .cl-board-grid { width: 360px; height: 360px; }
  .cl-evalbar { height: 360px; }
  .cl-coords-ranks { bottom: 24px; }
  .cl-piece { font-size: 30px; }
  .cl-oss-inner { grid-template-columns: 1fr; gap: 48px; }
  .cl-steps { grid-template-columns: 1fr; }
  .cl-step { border-right: none; border-bottom: 1px solid var(--rule-2); padding: 40px 0; }
  .cl-step:nth-child(n+2) { padding-left: 0; }
  .cl-step:last-child { border-bottom: none; }
}
@media (max-width: 720px) {
  .cl-nav { padding: 20px 24px; }
  .cl-nav-links { gap: 14px; }
  .cl-nav-links a:not(.cl-nav-cta) { display: none; }
  .cl-hero { padding: 32px 24px 24px; }
  .cl-hero-headline { font-size: clamp(40px, 11vw, 64px); }
  .cl-section { padding: 72px 24px; }
  .cl-waitlist { padding: 80px 24px; }
  .cl-feature-grid { grid-template-columns: 1fr; }
  .cl-feature { padding: 36px 24px 40px; }
  .cl-board-grid { width: min(84vw, 340px); height: min(84vw, 340px); }
  .cl-evalbar { height: min(84vw, 340px); }
  .cl-piece { font-size: clamp(22px, 4.5vw, 30px); }
  .cl-annot-best { right: 0; top: -38px; }
  .cl-annot-narr { left: 0; bottom: -110px; max-width: 100%; }
  .cl-footer { padding: 40px 24px; }
  .cl-footer-inner { grid-template-columns: 1fr; text-align: center; }
  .cl-footer-links { justify-content: center; }
  .cl-footer-fine { text-align: center; }
  .cl-form-field input { min-width: 0; width: 100%; }
  .cl-form-btn { width: 100%; justify-content: center; }
}
`
