import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import AuroraDots from './components/AuroraDots.jsx'
import ThemeSwitch from './components/ThemeSwitch.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/react"


export default function App() {
  useLocation()

  // (kept) dynamic accent cycle for TiltCard only; CursorGlow is static teal now
  useEffect(() => {
    const palette = [
      ['24,188,156', '51,177,255'],
      ['51,177,255', '155,89,182'],
      ['155,89,182', '24,188,156'],
    ]
    let i = 0
    const tick = () => {
      const [a, b] = palette[i % palette.length]
      document.documentElement.style.setProperty('--acc1', a)
      document.documentElement.style.setProperty('--acc2', b)
      i++
    }
    // If you want zero accent cycling everywhere, comment these two lines:
    tick()
    const id = setInterval(tick, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col">
      <CursorGlow />
      <AuroraDots />

      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      <Footer />

      {/* Floating theme switch */}
      <Analytics />
      <SpeedInsights />
      <ThemeSwitch />
    </div>
  )
}
