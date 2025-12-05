import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useInView } from 'framer-motion'
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

function LiveStreamCount() {
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
    <span ref={ref} className="text-amber-400 font-bold tabular-nums">
      <NumberFlow
        value={displayValue}
        format={{ notation: 'standard', useGrouping: true }}
        transformTiming={{ duration: 0 }}
        spinTiming={{ duration: 1500, easing: 'ease-out' }}
      />
    </span>
  )
}

// Story milestones data (born 2002)
const milestones = [
  {
    year: '2009',
    age: '7',
    title: 'Bonjour la Suisse',
    description: 'Family moved to Saint-Prex, a tiny village near Lausanne.',
    highlight: 'Became fluent in French before I could do math. Priorities.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.97.633-3.794 1.708-5.276" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#ef4444' // red
  },
  {
    year: '2009',
    age: '7',
    title: 'I Got Hacked',
    description: 'Tried downloading Minecraft Beta. Got malware instead.',
    highlight: 'That L got me hooked on how computers break.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#f97316' // orange
  },
  {
    year: '2010',
    age: '8',
    title: 'First Computer',
    description: 'Samsung NC10. 1.6GHz Atom, 1GB RAM, 10.2" screen.',
    highlight: 'My first own machine. It was fighting for its life running Kali.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#eab308' // yellow
  },
  {
    year: '2011',
    age: '9',
    title: 'My First Website',
    description: 'Built Code In Green, a tech blog about technology.',
    highlight: 'Hit my first 1000 visitors. 9 year old me lost his mind.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A8.966 8.966 0 0 1 3 12c0-1.97.633-3.794 1.708-5.276" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#84cc16' // lime
  },
  {
    year: '2014',
    age: '12',
    title: 'Nerd Arc Unlocked',
    description: 'Got into the EPFL Euler Mathematics Programme.',
    highlight: 'Because regular school wasn\'t stressful enough apparently.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#22c55e' // green
  },
  {
    year: '2017',
    age: '15',
    title: 'Zürich Arc Begins',
    description: 'MNG Rämibühl, high school with Applied Math and Physics focus.',
    highlight: 'Back to the German part. Had to relearn how to say "bread".',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#14b8a6' // teal
  },
  {
    year: '2019',
    age: '17',
    title: 'Music Arc Unlocked',
    description: 'Launched Peak Twilight, my artist alias for lofi beats.',
    highlight: 'Started making beats in my bedroom. No expectations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#06b6d4' // cyan
  },
  {
    year: '2019',
    age: '17',
    title: 'Ping Pong Coach',
    description: 'Started coaching at Young Stars Zürich (YSZ).',
    highlight: 'One of the biggest and oldest clubs in Switzerland. Still there.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#3b82f6' // blue
  },
  {
    year: '2020',
    age: '18',
    title: 'Label Founder Era',
    description: 'Co-founded Soothe Records with artists from around the world.',
    highlight: '18 year old me thought running a label would be easy. It was not.',
    hasLiveCounter: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#8b5cf6' // violet
  },
  {
    year: '2021',
    age: '19',
    title: 'Ok This Blew Up',
    description: 'Peak Twilight hit 1 million monthly listeners on Spotify.',
    highlight: 'Bedroom producer arc actually worked. What.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" stroke="currentColor" strokeWidth="0" fill="currentColor"/>
      </svg>
    ),
    color: '#a855f7' // purple
  },
  {
    year: '2021',
    age: '19',
    title: 'ETH and Self-Discovery',
    description: 'Started BSc Computer Science at ETH Zürich.',
    highlight: 'Realized I learn more building businesses than sitting in lectures.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#ec4899' // pink
  },
  {
    year: '2022',
    age: '20',
    title: 'Studio Founder',
    description: 'Co-founded Soothe Studios, the first in-house lofi label studio.',
    highlight: 'Mixed 150+ tracks. My ears have filed a complaint.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#f43f5e' // rose
  },
  {
    year: '2023',
    age: '21',
    title: 'University Coach',
    description: 'Became table tennis trainer at ASVZ for UZH and ETH students.',
    highlight: 'Teaching students how to spin. The paddle, not their heads.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    color: '#ef4444' // red
  },
  {
    year: '2024',
    age: '22',
    title: 'Wait, This Is a Job?',
    description: 'Switched from ETH to FHNW. Joined Migros as Cyber Defense Engineer.',
    highlight: 'Less theory, more building. Defending Switzerland\'s largest retailer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#f97316' // orange
  },
  {
    year: 'Now',
    age: '',
    title: 'Still Building',
    description: 'Security by day. Apps, AI tools, and beats by night.',
    highlight: 'I\'ll rest when I\'m dead. Or maybe next week. Probably not.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#eab308' // yellow/gold
  }
]

function MilestoneCard({
  milestone,
  index,
  isLast,
  scrollProgress
}: {
  milestone: typeof milestones[0]
  index: number
  isLast: boolean
  scrollProgress: number
}) {
  // Calculate line fill progress to next milestone
  const segmentStart = index / milestones.length
  const segmentEnd = (index + 1) / milestones.length
  const lineProgress = Math.max(0, Math.min(1, (scrollProgress - segmentStart) / (segmentEnd - segmentStart)))

  // Icon activates when the PREVIOUS line segment is complete (line has reached this node)
  // First icon activates immediately, others activate when previous segment hits 100%
  const prevSegmentEnd = index / milestones.length
  const prevSegmentStart = (index - 1) / milestones.length
  const prevLineProgress = index === 0 ? 1 : Math.max(0, Math.min(1, (scrollProgress - prevSegmentStart) / (prevSegmentEnd - prevSegmentStart)))
  const isActive = prevLineProgress >= 0.95 // Activate when line is 95% there

  const currentColor = milestone.color

  // Calculate content opacity - fade in when active, fade out when scrolling back
  const contentOpacity = isActive ? 1 : 0
  const contentX = isActive ? 0 : -20
  const nodeScale = isActive ? 1 : 0.5

  return (
    <div className="relative flex gap-6 md:gap-8">
      {/* Timeline node + line */}
      <div className="relative flex flex-col items-center">
        {/* Node */}
        <motion.div
          className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2"
          style={{
            backgroundColor: isActive ? `${currentColor}20` : 'transparent',
            borderColor: isActive ? `${currentColor}90` : '#333',
            boxShadow: isActive ? `0 0 20px ${currentColor}40, 0 0 40px ${currentColor}20` : 'none',
            color: isActive ? currentColor : '#555'
          }}
          animate={{
            scale: nodeScale,
            opacity: isActive ? 1 : 0.4
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {milestone.icon}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="flex-1 w-1 relative">
            {/* Background line */}
            <div className="absolute inset-0 bg-neutral-800" />
            {/* Animated fill */}
            <div
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                backgroundColor: currentColor,
                boxShadow: lineProgress > 0 ? `0 0 8px ${currentColor}` : 'none',
                height: `${lineProgress * 100}%`
              }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-16 md:pb-20'}`}>
        {/* Year badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-3"
          animate={{ opacity: contentOpacity, x: contentX }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-sm font-mono font-semibold"
            style={{ color: currentColor }}
          >
            {milestone.year}
          </span>
          {milestone.age && (
            <span className="text-xs font-mono text-neutral-600">age {milestone.age}</span>
          )}
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl md:text-2xl font-serif text-white mb-2"
          animate={{ opacity: contentOpacity, x: contentX }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        >
          {milestone.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-neutral-300 text-sm md:text-base mb-2 leading-relaxed"
          animate={{ opacity: contentOpacity, x: contentX }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {milestone.description}
        </motion.p>

        {/* Highlight */}
        <motion.p
          className="text-neutral-500 text-sm leading-relaxed"
          animate={{ opacity: contentOpacity, x: contentX }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          {milestone.highlight}
        </motion.p>

        {/* Live counter for Soothe Records */}
        {milestone.hasLiveCounter && (
          <motion.div
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: `${currentColor}15`,
              border: `1px solid ${currentColor}30`
            }}
            animate={{ opacity: contentOpacity, y: isActive ? 0 : 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: currentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: currentColor }}
              />
            </span>
            <span className="text-xs text-neutral-400">
              <LiveStreamCount /> streams on Spotify
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Scroll progress for the entire timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.2"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Track progress value for milestone lines
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    return smoothProgress.on('change', (v) => setProgress(v))
  }, [smoothProgress])

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.015] to-transparent" />

      <div ref={containerRef} className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">About Me</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
            How It All Started
          </h2>
          <p className="text-neutral-500 mt-4 max-w-md mx-auto text-sm md:text-base">
            A journey from accidental malware to cyber defense, with music along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-2xl mx-auto">
          {milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.year}
              milestone={milestone}
              index={index}
              isLast={index === milestones.length - 1}
              scrollProgress={progress}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
