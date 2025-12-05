import React, { useEffect, useState, useCallback } from 'react'
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

// Contact options for the popover
const contactOptions = [
  {
    name: 'Email',
    href: 'mailto:hello@doruk.ch',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/peaktwilight',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/doruk-ozturk',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/25qDYhjZHVzZS6sOVzAVAx',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
]

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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const progressPercent = Math.round(progress * 100)

  // Close popover when scrolling away from bottom
  useEffect(() => {
    if (!isComplete) {
      setIsPopoverOpen(false)
    }
  }, [isComplete])

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

        {/* CTA overlay - "Say Hi" button that opens popover */}
        <AnimatePresence>
          {isComplete && (
            <motion.button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className="absolute inset-2 flex items-center justify-center gap-2 rounded-xl cursor-pointer overflow-hidden"
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
              <div className="absolute inset-0 bg-amber-500" />

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
                className="relative z-10 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-semibold text-neutral-900 whitespace-nowrap">
                  Say Hi
                </span>
                <motion.svg
                  className="w-4 h-4 text-neutral-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isPopoverOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Contact popover - grows from the button */}
        <AnimatePresence>
          {isPopoverOpen && isComplete && (
            <motion.div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 origin-bottom"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative rounded-2xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl p-2 shadow-2xl">
                {/* Arrow pointing down */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-neutral-900/95 border-r border-b border-white/10" />

                {/* Contact options */}
                <div className="relative flex items-center gap-1">
                  {contactOptions.map((option, index) => (
                    <motion.a
                      key={option.name}
                      href={option.href}
                      target={option.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={option.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-neutral-400 hover:text-white transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Hover background */}
                      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors" />

                      {/* Icon */}
                      <span className="relative z-10">{option.icon}</span>

                      {/* Tooltip */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-white text-neutral-900 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        {option.name}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Click outside to close popover */}
      {isPopoverOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsPopoverOpen(false)}
        />
      )}
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
