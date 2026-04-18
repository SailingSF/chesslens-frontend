import { Terminal } from '../components/Terminal'
import { GITHUB_URL } from '../constants'

export function OpenSource() {
  return (
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

        <Terminal />
      </div>
    </section>
  )
}
