// Small decorative icons for the feature grid. 24×24, strokeWidth 1.2,
// `currentColor` so each is themed by its parent's color.

export function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

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
