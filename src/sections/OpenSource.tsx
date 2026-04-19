import { Terminal } from '../components/Terminal'
import { GithubIcon, StarIcon } from '../components/icons'
import { GITHUB_URL } from '../constants'
import { revealRef } from '../lib/reveal'

export function OpenSource() {
  return (
    <section id="oss" className="cl-section cl-oss">
      <div className="cl-oss-inner">
        <div className="cl-oss-copy cl-fade" ref={revealRef}>
          <span className="cl-eyebrow cl-eyebrow-amber">§ 03 · Open source</span>
          <h2 className="cl-h2">
            Run locally. <em>For free.</em>
          </h2>
          <p className="cl-oss-p">
            The core repo contains the full analysis pipeline — move classification
            models, engine orchestration, narration prompts, the whole chain. Clone
            it, add your own API keys, and run a fully functional chess explainer
            locally. MIT licensed. No cloud required.
          </p>
          <div className="cl-oss-ctas">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="cl-btn cl-btn-ghost cl-btn-amber"
            >
              <GithubIcon size={15} /> View on GitHub{' '}
              <span className="cl-btn-arrow" aria-hidden>↗</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="cl-gh-badge"
            >
              <span className="cl-gh-badge-label">
                <StarIcon size={12} />
                <span>SailingSF / chesslens-core</span>
              </span>
              <span className="cl-gh-badge-count">MIT</span>
            </a>
          </div>
        </div>

        <div className="cl-fade" ref={revealRef}>
          <Terminal />
        </div>
      </div>
    </section>
  )
}
