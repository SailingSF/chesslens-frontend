// Terminal card for the Open Source section. Owns its own clipboard state
// so the parent section component stays purely presentational.

import { useState } from 'react'

const INSTALL_SNIPPET = [
  'git clone https://github.com/SailingSF/chesslens-core',
  'cp .env.example .env',
  'docker compose up',
  '# Open localhost:8000',
].join('\n')

export function Terminal() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_SNIPPET)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  }

  return (
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
            <span className="cl-term-url">https://github.com/SailingSF/chesslens-core</span>
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
  )
}
