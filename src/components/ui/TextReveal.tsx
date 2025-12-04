import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface TextRevealProps {
  text: string
  className?: string
}

export function TextReveal({ text, className }: TextRevealProps) {
  const words = text.split(' ')

  return (
    <motion.p className={cn('flex flex-wrap', className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          viewport={{ once: true }}
          className="mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
