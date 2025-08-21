import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import linkedin from '../assets/linkedin.png'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const LinkBtn = ({ to, label, active }) => (
  <button
    onClick={() => scrollToId(to)}
    aria-current={active ? 'page' : undefined}
    className="navlink"
  >
    {label}
  </button>
)

const BrandBtn = ({ active }) => (
  <button
    onClick={scrollToTop}
    aria-current={active ? 'page' : undefined}
    className="navlink flex items-center gap-3"
  >
    <img src={logo} alt="Cem Sarp Takım logo" className="w-8 h-8 rounded-xl" />
    <span className="hidden sm:block">Cem Sarp Takım</span>
  </button>
)

export default function Navbar() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = ['home', 'about', 'projects', 'contact']
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }, { threshold: 0.6 })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <BrandBtn active={active === 'home'} />
        <nav className="flex items-center gap-1 sm:gap-2">
          <LinkBtn to="about" label="About" active={active === 'about'} />
          <LinkBtn to="projects" label="Projects" active={active === 'projects'} />
          <LinkBtn to="contact" label="Contact" active={active === 'contact'} />
          <a
            href="https://www.linkedin.com/in/cem-sarp-takım-645803218/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="ml-1 transition-transform hover:scale-105"
          >
            <img src={linkedin} alt="LinkedIn" className="h-7 w-auto object-contain" />
          </a>
        </nav>
      </div>
    </header>
  )
}
