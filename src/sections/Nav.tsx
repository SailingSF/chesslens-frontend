import { BrandGlyph } from '../components/Brand'
import { scrollToId } from '../lib/scrollTo'

export function Nav() {
  return (
    <nav className="cl-nav">
      <a
        href="#top"
        className="cl-brand"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('top')
        }}
      >
        <BrandGlyph size={28} />
        <span className="cl-brand-word">ChessLens</span>
      </a>

      <div className="cl-nav-links">
        <a href="#how" onClick={(e) => { e.preventDefault(); scrollToId('how') }}>
          How it works
        </a>
        <a href="#features" onClick={(e) => { e.preventDefault(); scrollToId('features') }}>
          Features
        </a>
        <a href="#oss" onClick={(e) => { e.preventDefault(); scrollToId('oss') }}>
          Open source
        </a>
        <a
          href="#waitlist"
          className="cl-nav-cta"
          onClick={(e) => { e.preventDefault(); scrollToId('waitlist') }}
        >
          Join waitlist <span aria-hidden>→</span>
        </a>
      </div>
    </nav>
  )
}
