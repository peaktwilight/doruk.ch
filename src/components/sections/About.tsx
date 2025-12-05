import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import NumberFlow from '@number-flow/react'

// Live stream counter config
const START_DATE = new Date('2021-01-01T00:00:00')
const TARGET_DATE = new Date('2025-12-31T23:59:59')
const TARGET_STREAMS = 110000000

function calculateCurrentStreams() {
  const now = new Date()
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime()
  const elapsed = now.getTime() - START_DATE.getTime()
  const progress = elapsed / totalDuration
  return Math.floor(TARGET_STREAMS * progress)
}

function InlineStreamCount() {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setDisplayValue(calculateCurrentStreams())
        setHasAnimated(true)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isInView, hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    const interval = setInterval(() => {
      setDisplayValue(calculateCurrentStreams())
    }, 1000)
    return () => clearInterval(interval)
  }, [hasAnimated])

  return (
    <span ref={ref} className="text-white font-medium tabular-nums">
      <NumberFlow
        value={displayValue}
        format={{ notation: 'standard', useGrouping: true }}
        transformTiming={{ duration: 0 }}
        spinTiming={{ duration: 1500, easing: 'ease-out' }}
      />
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">About Me</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
            How It All Started
          </h2>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-20"
        >
          <p className="text-neutral-300 text-lg md:text-xl leading-relaxed text-center">
            When I was 7 years old, I tried downloading Minecraft beta on my dad's computer and
            accidentally installed malware instead. That epic fail sparked an obsession with
            figuring out how computers work <span className="text-neutral-500">(and how they break)</span>.
            Fast forward to today: I study CS at FHNW and work as a Cyber Defense Engineer at MGB,
            protecting Switzerland's largest retail company.
          </p>

          <p className="text-neutral-400 leading-relaxed text-center max-w-2xl mx-auto">
            That "learning experience" sent me down a rabbit hole through web development, digital marketing,
            and eventually cybersecurity. Along the way, I discovered my love for producing lofi beats and
            co-founded <span className="text-amber-400">Soothe Records</span> — a music label that's now
            achieved over <InlineStreamCount /> streams on Spotify.
          </p>

          <p className="text-neutral-500 leading-relaxed text-center max-w-2xl mx-auto">
            In the evenings, I coach table tennis at Switzerland's largest academic club,
            build AI tools that actually solve real problems <span className="text-neutral-600">(okay, most of the time :P)</span>,
            and create chill music for millions of people worldwide.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
