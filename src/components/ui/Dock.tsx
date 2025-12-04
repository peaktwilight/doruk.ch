import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface DockProps {
  children: React.ReactNode
  className?: string
}

interface DockItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Dock({ children, className }: DockProps) {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      className={cn(
        'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900/80 p-2 backdrop-blur-xl',
        className
      )}
    >
      {children}
    </motion.nav>
  )
}

export function DockItem({ children, className, onClick, active }: DockItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.2, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
        active ? 'bg-amber-500/20 text-amber-400' : 'text-neutral-400 hover:bg-white/5 hover:text-white',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
