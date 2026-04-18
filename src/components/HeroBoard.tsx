// Hero visual — stylized 8×8 mid-game position with eval bar and floating
// annotations. All positioning is in landing.css (.cl-board-* classes).

import { FILES, HERO_POSITION } from '../data/heroPosition'

const BLACK_GLYPHS = '♟♜♞♝♛♚'
const KEY_SQUARE = 'c4'    // "just played" bishop — amber ring
const TARGET_SQUARE = 'e5' // threatened/captured square — amber dot

export function HeroBoard() {
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
        {/* Rank coordinates (left edge) */}
        <div className="cl-coords cl-coords-ranks">
          {[8, 7, 6, 5, 4, 3, 2, 1].map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>

        {/* 8×8 grid with floating annotations positioned against it */}
        <div className="cl-board-grid">
          {HERO_POSITION.map((rank, ri) =>
            rank.map((piece, fi) => {
              const isLight = (ri + fi) % 2 === 0
              const square = `${FILES[fi]}${8 - ri}`
              const isKey = square === KEY_SQUARE
              const isTarget = square === TARGET_SQUARE
              const isBlack = piece && BLACK_GLYPHS.includes(piece)
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

          {/* Best-move pill */}
          <div className="cl-annot cl-annot-best">
            <span className="cl-annot-dot" />
            <span className="cl-annot-move">Bxf7+</span>
            <span className="cl-annot-tag">Best</span>
          </div>

          {/* Narration snippet */}
          <div className="cl-annot cl-annot-narr">
            <span className="cl-annot-lead">Why it wins →</span>
            <span className="cl-annot-body">
              King is dragged to f7. Knight-fork on e5 is forced next.
            </span>
          </div>
        </div>

        {/* File coordinates (bottom edge) */}
        <div className="cl-coords cl-coords-files">
          {FILES.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
