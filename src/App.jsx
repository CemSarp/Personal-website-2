import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Experience from './pages/Experience.jsx'
import GridBackground from './components/GridBackground.jsx'

import ChatWidget from './chatbot/ChatWidget.jsx'

import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  // Dynamic accent cycle for TiltCard glow effects
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
    tick()
    const id = setInterval(tick, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col bg-[#020617]">
      <GridBackground />

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      <Analytics />
      <SpeedInsights />
      <ChatWidget />
    </div>
  )
}