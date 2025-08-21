import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current

    const handler = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Detect current theme on <html>
      const isLight = document.documentElement.classList.contains('theme-light')

      // Choose glow color based on theme
      const accent = isLight
        ? 'rgba(0,123,255,0.10)'   // blue glow for light mode
        : 'rgba(186,85,211,0.12)'  // purple glow for dark mode

      el.style.background = `
        radial-gradient(80px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 40%),
        radial-gradient(160px circle at ${x}px ${y}px, ${accent}, transparent 60%)
      `
    }

    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ transition: 'background .05s linear' }}
    />
  )
}
