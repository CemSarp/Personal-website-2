import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function AuroraDots() {
  const dots = useMemo(() => (
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.floor(Math.random() * 4) + 2,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 8
    }))
  ), [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {dots.map(d => (
        <motion.span
          key={d.id}
          initial={{ opacity: 0.12, y: 0 }}
          animate={{ opacity: [0.12, 0.5, 0.12], y: [-10, 10, -10] }}
          transition={{ delay: d.delay, duration: d.duration, repeat: Infinity }}
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            boxShadow: `0 0 ${d.size * 4}px rgba(100,255,218,0.7)`,
          }}
          className="absolute rounded-full bg-white/5"
        />
      ))}
      {/* Dim the grid to 0.2 so content pops more */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
    </div>
  )
}
