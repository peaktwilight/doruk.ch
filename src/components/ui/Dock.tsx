import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface DockProps {
  children: React.ReactNode
  className?: string
  activeIndex?: number
}

interface DockItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  active?: boolean
}

export function Dock({ children, className, activeIndex = 0 }: DockProps) {
  // Separate nav items from other children (divider, CTA)
  const childArray = React.Children.toArray(children)
  const navItems: React.ReactNode[] = []
  const otherItems: React.ReactNode[] = []

  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === DockItem) {
      navItems.push(child)
    } else {
      otherItems.push(child)
    }
  })

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      className={cn(
        'fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center rounded-2xl border border-white/10 bg-neutral-900/80 p-2 backdrop-blur-xl',
        className
      )}
    >
      {/* Navigation items container with sliding indicator */}
      <div className="relative flex items-center gap-1">
        {/* Sliding indicator */}
        <motion.div
          className="absolute h-12 w-12 rounded-xl bg-amber-500/20 border border-amber-500/30"
          initial={false}
          animate={{
            x: activeIndex * 52, // 48px width + 4px gap
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
        {navItems}
      </div>

      {/* Other items (divider, CTA) */}
      {otherItems}
    </motion.nav>
  )
}

export function DockItem({ children, className, onClick, active }: DockItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.15, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative z-10 flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
        active ? 'text-amber-400' : 'text-neutral-400 hover:text-white',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
