import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const handler = (e) => {
      const x = e.clientX
      const y = e.clientY
      // Fixed accent color so the cursor lume doesn't color-cycle over time
      el.style.background = `
        radial-gradient(120px circle at ${x}px ${y}px, rgba(255,255,255,0.10), transparent 40%),
        radial-gradient(260px circle at ${x}px ${y}px, rgba(24,188,156,0.10), transparent 60%)
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
