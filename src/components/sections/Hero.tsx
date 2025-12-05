import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'

// Language flags
const languages = [
  { code: 'gb', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'tr', name: 'Turkish' },
  { code: 'de', name: 'German' },
  { code: 'ch', name: 'Swiss German' },
]

// Stats configuration
const START_DATE = new Date('2021-01-01T00:00:00')
const TARGET_DATE = new Date('2025-12-31T23:59:59')
const TARGET_USERS = 75000

function calculateCurrentValue(targetValue: number) {
  const now = new Date()
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime()
  const elapsed = now.getTime() - START_DATE.getTime()
  const progress = elapsed / totalDuration
  return targetValue * progress
}

// Inline user counter for bio text
function InlineUserCount() {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setDisplayValue(calculateCurrentValue(TARGET_USERS))
        setHasAnimated(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    const interval = setInterval(() => {
      setDisplayValue(calculateCurrentValue(TARGET_USERS))
    }, 1000)
    return () => clearInterval(interval)
  }, [hasAnimated])

  return (
    <span ref={ref} className="text-white font-medium tabular-nums">
      <NumberFlow
        value={Math.floor(displayValue)}
        format={{ notation: 'standard', useGrouping: true }}
        transformTiming={{ duration: 0 }}
        spinTiming={{ duration: 1500, easing: 'ease-out' }}
      />
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/[0.07] rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Profile Image with Language Flags below */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
            {/* Decorative ring */}
            <div className="absolute -inset-2 rounded-full border border-amber-500/20" />

            {/* Image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-white/10">
              <img
                src="/assets/images/Doruk_Black_picture.jpg"
                alt="Doruk Tan Öztürk"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Language flags - stacked horizontally */}
            <a
              href="#languages"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 group flex -space-x-2"
            >
              {languages.map((lang, i) => (
                <div
                  key={lang.code}
                  className="w-7 h-7 rounded-full border-2 border-neutral-900 overflow-hidden bg-neutral-800 transition-transform group-hover:scale-110"
                  style={{ zIndex: languages.length - i }}
                  title={lang.name}
                >
                  <img
                    src={`https://flagcdn.com/w40/${lang.code}.png`}
                    alt={lang.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </a>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white mb-4"
        >
          Doruk Tan Öztürk
        </motion.h1>

        {/* Duality tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 mb-6 max-w-xl mx-auto"
        >
          <span className="text-neutral-300">Cyber Defense Engineer</span>
          <span className="text-neutral-600 mx-2">/</span>
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
            Builder of Things
          </span>
        </motion.p>

        {/* Bio with inline counter */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-500 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Building apps, websites, and tools that{' '}
          <span className="inline-flex items-baseline">
            <InlineUserCount />
          </span>{' '}
          people use.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex h-11 items-center gap-2 rounded-xl bg-amber-500 px-5 text-sm font-medium text-neutral-900 transition-all hover:bg-amber-400"
          >
            View Projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a
            href="https://open.spotify.com/artist/25qDYhjZHVzZS6sOVzAVAx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-neutral-400 transition-all hover:border-white/20 hover:text-white"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
          <a
            href="https://github.com/peaktwilight"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-neutral-400 transition-all hover:border-white/20 hover:text-white"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
