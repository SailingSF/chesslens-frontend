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

        <li className="cl-step cl-fade" ref={revealRef}>
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
