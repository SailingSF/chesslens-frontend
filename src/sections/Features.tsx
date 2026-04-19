import { IconBoard, IconClassify, IconDial, IconQuote } from '../components/icons'
import { revealRef } from '../lib/reveal'

type Feature = {
  icon: React.ReactNode
  title: string
  body: string
}

const FEATURES: Feature[] = [
  {
    icon: <IconQuote />,
    title: 'AI-narrated explanations',
    body: 'Every key moment is explained in plain language by an AI that understands the position. Not a number. Not engine gibberish. A real explanation of why your move changed the game.',
  },
  {
    icon: <IconClassify />,
    title: 'Stockfish + move classification',
    body: 'A local Stockfish engine runs at full depth alongside a trained classifier — every move gets a grade (Best, Great, Inaccuracy, Mistake, Blunder) and the positional reasoning that explains why. No cloud engine. No opaque scores.',
  },
  {
    icon: <IconBoard />,
    title: 'Understands the full position',
    body: 'Detects threats, tactical patterns, pawn structure, and piece activity — and weaves them into coaching that actually makes sense.',
  },
  {
    icon: <IconDial />,
    title: 'Calibrated to your level',
    body: 'Whether you’re 600 or 1800, explanations match your understanding. No jargon for beginners. No hand-holding for experienced players.',
  },
]

export function Features() {
  return (
    <section id="features" className="cl-section cl-features">
      <div className="cl-section-head">
        <span className="cl-eyebrow">§ 02 · What makes it different</span>
        <h2 className="cl-h2">
          Built like a coach, not a <em>leaderboard</em>.
        </h2>
      </div>

      <div className="cl-feature-grid">
        {FEATURES.map((f) => (
          <article key={f.title} className="cl-feature cl-fade" ref={revealRef}>
            <div className="cl-feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
