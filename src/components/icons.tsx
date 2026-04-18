// Small decorative icons for the feature grid. 24×24, strokeWidth 1.2,
// `currentColor` so each is themed by its parent's color.

export function IconQuote() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M4 5h16v11H8l-4 4z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="8" y1="9.5" x2="16" y2="9.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="8" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function IconClassify() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="3" y="4" width="4" height="16" fill="currentColor" opacity="0.9" />
      <rect x="9" y="8" width="4" height="12" fill="currentColor" opacity="0.6" />
      <rect x="15" y="12" width="4" height="8" fill="currentColor" opacity="0.35" />
      <line x1="2" y1="21" x2="22" y2="21" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function IconBoard() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3" y="3" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="15" y="3" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="3" y="15" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="15" y="15" width="6" height="6" fill="currentColor" opacity="0.85" />
      <circle cx="12" cy="12" r="2" fill="#D4A14A" />
    </svg>
  )
}

export function IconDial() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path d="M4 16 A 8 8 0 0 1 20 16" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="16" x2="17" y2="9" stroke="#D4A14A" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      <line x1="4" y1="16" x2="5" y2="16" stroke="currentColor" strokeWidth="1" />
      <line x1="19" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
