import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import NumberFlow from '@number-flow/react'

// Rotating identities - all use the main amber accent color
const identities = [
  'Cyber Defense Engineer',
  'CS & Business Student',
  'Music Producer',
  'Builder of Things',
  'Table Tennis Coach',
]

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
  const [currentIdentity, setCurrentIdentity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdentity((prev) => (prev + 1) % identities.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
                src="/assets/images/doruk_color_portrait_square.png"
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

        {/* Rotating identity tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-6 max-w-xl mx-auto h-8 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIdentity}
              className="absolute inset-0 flex items-center justify-center font-medium text-amber-400"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03 } },
                exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
              }}
            >
              {identities[currentIdentity].split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: {
                      opacity: 0,
                      y: -20,
                      filter: "blur(8px)",
                      transition: { duration: 0.2, ease: "easeIn" },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </motion.div>

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
            href="#about"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 px-5 text-sm text-neutral-400 transition-all hover:border-white/20 hover:text-white"
          >
            My Story
          </a>
        </motion.div>
      </div>
    </section>
  )
}
