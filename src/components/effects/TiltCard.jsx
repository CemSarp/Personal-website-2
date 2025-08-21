import { useRef, useEffect } from 'react'

/**
 *   className?: string
 *   children: ReactNode
 *   glow?: boolean (ignored; kept for backward compatibility)
 *   tiltStrength?: number (default 3)
 */
export default function TiltCard({ className = '', children, glow, tiltStrength = 3 }) {
  const ref = useRef(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isSmall = () => window.innerWidth < 768
    let active = !(prefersReduced || isSmall())

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
      const rotateX = ((y - midY) / midY) * -tiltStrength
      const rotateY = ((x - midX) / midX) * tiltStrength
      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.005)`
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
  }, [tiltStrength])

  return (
    <div
      ref={ref}
      className={`card relative ${className}`}
      style={{
        transition: 'transform .18s ease'
        // Note: NO backgroundImage here; per-card glow removed.
      }}
    >
      {children}
    </div>
  )
}
