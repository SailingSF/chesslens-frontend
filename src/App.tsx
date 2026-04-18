import './landing.css'

import { Features } from './sections/Features'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Nav } from './sections/Nav'
import { OpenSource } from './sections/OpenSource'
import { Waitlist } from './sections/Waitlist'

export default function App() {
  return (
    <div className="cl-root">
      {/* Ambient background: chess grid texture + warm glow + noise */}
      <div className="cl-bg" aria-hidden="true">
        <div className="cl-bg-grid" />
        <div className="cl-bg-glow" />
        <div className="cl-bg-noise" />
      </div>

      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
      <OpenSource />
      <Waitlist />
      <Footer />
    </div>
  )
}
