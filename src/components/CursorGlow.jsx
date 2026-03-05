import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on devices without a fine pointer (e.g., touchscreens)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return

    function onMove(e) {
      const { clientX: x, clientY: y } = e

      // Theme-aware accent
      const isLight = document.documentElement.classList.contains('theme-light')
      const accent = isLight
        ? 'rgba(0,123,255,0.12)'   // light: blue
        : 'rgba(186,85,211,0.14)'  // dark: purple

      // Larger glow — tweak these two radii if you want it bigger/smaller:
      const inner = 60   // px
      const outer = 110   // px

      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        el.style.background = `
          radial-gradient(${inner}px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 40%),
          radial-gradient(${outer}px circle at ${x}px ${y}px, ${accent}, transparent 60%)
        `
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      // key change: raise z-index ABOVE cards, but keep pointer-events none
      className="pointer-events-none fixed inset-0 z-[30]"
      style={{
        transition: 'background .05s linear',
        willChange: 'background'
      }}
    />
  )
}
