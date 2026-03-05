import profile from '../assets/profile2.jpeg'
import Section from '../components/Section.jsx'

export default function Home() {
  // Smooth scroll helper (kept in case you want to reuse later)
  function scrollToId(id) {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* LEFT: headline + intro (theme-aware colors) */}
      <Section>
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Hi, I’m <span className="text-primary">Cem Sarp Takım</span>
          </h1>

          {/* Use CSS vars so the text flips correctly in dark/light */}
          <p
            className="text-lg max-w-prose"
            style={{ color: 'var(--text)' }}
          >
            I’m a senior Computer Engineering student passionate about building digital products that combine design and engineering.
            I love the process of bringing ideas to life, turning concepts into intuitive, functional experiences that people actually enjoy using.
          </p>
        </div>
      </Section>

      {/* RIGHT: portrait with soft gradient glow — no rectangle/card */}
      <Section delay={0.05}>
        <div className="relative flex items-center justify-center py-6">
          {/* subtle morphing glow behind the circle (no box) */}
          <div
            aria-hidden
            className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full -z-10 blur-2xl"
            style={{
              background:
                'radial-gradient(closest-side, rgba(var(--acc1),0.28), rgba(var(--acc2),0.18), transparent 70%)'
            }}
          />
          <img
            src={profile}
            alt="Cem Sarp Takım"
            className="w-44 h-44 md:w-64 md:h-64 rounded-full object-cover ring-4"
            style={{
              //transform: 'rotate(90deg)',
              ringColor: 'rgba(255,255,255,0.18)'
            }}
          />
        </div>
      </Section>
    </div>
  )
}
