import { HeroBoard } from '../components/HeroBoard'
import { GithubIcon } from '../components/icons'
import { GITHUB_URL } from '../constants'
import { NOTATION_TICKER } from '../data/heroPosition'
import { scrollToId } from '../lib/scrollTo'

export function Hero() {
  return (
    <section id="top" className="cl-hero">
      <div className="cl-hero-inner">
        <div className="cl-hero-left">
          <div className="cl-meta">
            <span className="cl-meta-dot" />
            <span className="cl-meta-text">
              v0.9
            </span>
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
              onClick={() => scrollToId('waitlist')}
            >
              Join the waitlist
              <span className="cl-btn-arrow" aria-hidden>→</span>
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="cl-btn cl-btn-github"
            >
              <GithubIcon size={15} />
              View on GitHub
              <span className="cl-btn-arrow" aria-hidden>↗</span>
            </a>
          </div>

          <div className="cl-hero-kicker">
            <span className="cl-kicker-label">
              Open source · MIT licensed · self-hostable
            </span>
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
  )
}
