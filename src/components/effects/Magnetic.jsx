import { useRef } from 'react'

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null)

  function onMouseMove(e) {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`
  }

  function onMouseLeave() {
    ref.current.style.transform = `translate(0px, 0px)`
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block will-change-transform"
    >
      {children}
    </span>
  )
}
