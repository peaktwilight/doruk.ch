import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Hook for scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const newProgress = Math.min(Math.max(scrollTop / docHeight, 0), 1)
    setProgress(newProgress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return { progress, isComplete: progress >= 0.98 }
}

export function Dock({ children, className, activeIndex = 0 }: DockProps) {
  const { progress, isComplete } = useScrollProgress()
  const progressPercent = Math.round(progress * 100)
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null)

  // Separate nav items from other children
  const childArray = React.Children.toArray(children)
  const navItems: React.ReactNode[] = []

  childArray.forEach((child) => {
    if (React.isValidElement(child) && child.type === DockItem) {
      navItems.push(child)
    }
  })

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      {/* Main dock container */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        className={cn(
          'relative rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl',
          className
        )}
      >
        {/* Normal dock content - fades out when complete */}
        <motion.div
          className="flex items-center p-2"
          animate={{
            opacity: isComplete ? 0 : 1,
            scale: isComplete ? 0.95 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isComplete ? 'none' : 'auto' }}
        >
          {/* Navigation items container with sliding indicator */}
          <div className="relative flex items-center">
            {/* Sliding indicator */}
            <motion.div
              className="absolute h-12 w-12 rounded-xl bg-amber-500/20 border border-amber-500/30"
              initial={false}
              animate={{ x: activeIndex * 48 }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
            {navItems}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-white/10 mx-2" />

          {/* Scroll indicator - this is the origin point */}
          <motion.button
            ref={scrollIndicatorRef}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="relative h-12 w-12 sm:w-[72px] flex items-center justify-center gap-1.5 rounded-xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background */}
            <div className="absolute inset-0 rounded-xl bg-neutral-800/80" />

            {/* Progress ring border */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: `conic-gradient(from -90deg, #f59e0b ${progressPercent}%, transparent ${progressPercent}%)`,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '2px',
                opacity: 0.7,
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-1.5">
              <motion.svg
                className="w-4 h-4 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
              <span className="hidden sm:inline text-xs font-mono text-amber-500/90 tabular-nums w-[2ch]">
                {progressPercent}
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* CTA overlay - grows from the scroll indicator position */}
        <AnimatePresence>
          {isComplete && (
            <motion.a
              href="mailto:hello@doruk.ch"
              className="absolute inset-2 flex items-center justify-center gap-3 rounded-xl cursor-pointer overflow-hidden"
              initial={{
                clipPath: 'inset(0% 0% 0% calc(100% - 72px) round 12px)',
                opacity: 0
              }}
              animate={{
                clipPath: 'inset(0% 0% 0% 0% round 12px)',
                opacity: 1
              }}
              exit={{
                clipPath: 'inset(0% 0% 0% calc(100% - 72px) round 12px)',
                opacity: 0
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Amber background */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500" />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)' }}
              />

              {/* Content */}
              <motion.div
                className="relative z-10 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base font-semibold text-neutral-900 whitespace-nowrap">
                  Let's Connect!
                </span>
              </motion.div>
            </motion.a>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
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
