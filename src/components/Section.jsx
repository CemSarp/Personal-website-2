import { motion } from 'framer-motion'

export default function Section({ children, delay = 0, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
