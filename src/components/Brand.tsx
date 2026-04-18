// Brand mark — the small chess-board + amber-dot glyph used in the nav,
// footer, and anywhere else we need the logo. Size-prop keeps it flexible.

type Props = { size?: number }

export function BrandGlyph({ size = 28 }: Props) {
  return (
    <span className="cl-brand-glyph" aria-hidden="true">
      <svg viewBox="0 0 32 32" width={size} height={size}>
        <rect x="2" y="2" width="12" height="12" fill="currentColor" opacity="0.9" />
        <rect x="18" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2" y="18" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="18" y="18" width="12" height="12" fill="currentColor" opacity="0.9" />
        <circle cx="16" cy="16" r="2.5" fill="#D4A14A" />
      </svg>
    </span>
  )
}
