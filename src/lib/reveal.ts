// Shared IntersectionObserver for scroll-triggered reveals.
// Usage: <div className="cl-fade" ref={revealRef}>…</div>
// Adds `is-visible` to the element the first time it enters view.

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (observer) return observer
  if (typeof window === 'undefined') {
    // SSR / non-DOM environments — return a no-op stub typed as the real thing.
    return { observe() {}, unobserve() {}, disconnect() {} } as unknown as IntersectionObserver
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )
  return observer
}

export function revealRef(el: HTMLElement | null): void {
  if (!el) return
  getObserver().observe(el)
}
