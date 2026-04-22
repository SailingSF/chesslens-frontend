import { BrandGlyph } from '../components/Brand'
import { GithubIcon } from '../components/icons'
import { GITHUB_URL } from '../constants'

export function Footer() {
  return (
    <footer className="cl-footer">
      <div className="cl-footer-inner">
        <div className="cl-footer-brand">
          <BrandGlyph size={20} />
          <span className="cl-footer-word">ChessLens</span>
          <span className="cl-footer-tag">chesslens.ai</span>
        </div>
        <div className="cl-footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="cl-footer-gh">
            <GithubIcon size={13} /> chesslens-core ↗
          </a>
          <a href="mailto:notarealemail@chesslens.ai">Contact ↗</a>
        </div>
        <div className="cl-footer-fine">
          © {new Date().getFullYear()} ChessLens · Made for players who want to understand.
        </div>
      </div>
    </footer>
  )
}
