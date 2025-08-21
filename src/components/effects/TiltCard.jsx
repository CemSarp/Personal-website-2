import { useRef, useEffect } from 'react'

export default function TiltCard({ className = '', glow = true, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isSmall = () => window.innerWidth < 768
    let active = !(prefersReduced || isSmall()) // only enable on md+ or if user allows

    const onResize = () => {
      active = !(prefersReduced || isSmall())
      if (!active) reset()
    }

    function move(e) {
      if (!active) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const midX = rect.width / 2
      const midY = rect.height / 2
      const rotateX = ((y - midY) / midY) * -3
      const rotateY = ((x - midX) / midX) * 3
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.005)`
      if (glow) {
        card.style.setProperty('--x', `${x}px`)
        card.style.setProperty('--y', `${y}px`)
      }
    }

    function reset() {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    card.addEventListener('mousemove', move)
    card.addEventListener('mouseleave', reset)
    window.addEventListener('resize', onResize)
    return () => {
      card.removeEventListener('mousemove', move)
      card.removeEventListener('mouseleave', reset)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`card relative ${className}`}
      style={{
        transition: 'transform .18s ease',
        // Dynamic accent with softer alpha
        backgroundImage: glow
          ? 'radial-gradient(280px circle at var(--x) var(--y), rgba(var(--acc1),0.06), rgba(var(--acc2),0.05), transparent 60%)'
          : undefined
      }}
    >
      {children}
    </div>
  )
}
