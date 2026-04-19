import { EvalGraph } from '../components/EvalGraph'
import { revealRef } from '../lib/reveal'

export function HowItWorks() {
  return (
    <section id="how" className="cl-section cl-how">
      <div className="cl-section-head">
        <span className="cl-eyebrow">§ 01 · Pipeline</span>
        <h2 className="cl-h2">
          Three steps. Then the <em>real</em> work starts — yours.
        </h2>
      </div>

      <ol className="cl-steps">
        <li className="cl-step cl-fade" ref={revealRef}>
          <div className="cl-step-num">01</div>
          <div className="cl-step-body">
            <h3>Import your game</h3>
            <p style={{ color: 'var(--paper-faint)', fontSize: '14px' }}>
              Paste a PGN from chess.com, Lichess, or any file. No plugins, no extra logins.
            </p>
          </div>
        </li>

        <li className="cl-step cl-fade" ref={revealRef}>
          <div className="cl-step-num">02</div>
          <div className="cl-step-body">
            <h3>Engine + classifier, together</h3>
            <p>
              A local Stockfish instance evaluates every position at depth. On top of that,
              a trained classification model assigns each move a grade —{' '}
              <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                Best · Great · Inaccuracy · Mistake · Blunder
              </span>{' '}
              — the same vocabulary chess.com uses, but with the reasoning to back it up.
              Tactical motifs, positional drift, missed resources: all surfaced.
            </p>
            <div className="cl-step-art" aria-hidden>
              <EvalGraph />
            </div>
          </div>
        </li>

        <li className="cl-step cl-fade" ref={revealRef}>
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
  )
}
