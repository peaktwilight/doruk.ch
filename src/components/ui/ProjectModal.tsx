import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import NumberFlow from '@number-flow/react'
import { type Project } from '../../data/projects'
import { cn } from '../../lib/utils'

// Live counter config
const START_DATE = new Date('2021-01-01T00:00:00')
const TARGET_DATE = new Date('2025-12-31T23:59:59')
const TARGET_STREAMS = 110000000
const TARGET_BUNZLI = 9500
const TARGET_TTSTATS_USERS = 1200

function calculateCurrentValue(target: number) {
  const now = new Date()
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime()
  const elapsed = now.getTime() - START_DATE.getTime()
  const progress = elapsed / totalDuration
  return Math.floor(target * progress)
}

// Badge type detection
function getBadgeType(badge: string, projectId?: string): 'metric' | 'media' | 'award' | 'live-streams' | 'live-bunzli' | 'live-ttstats' | 'default' {
  // Live animated badges for specific projects
  if (projectId === 'peak-twilight-web' && /Streams/i.test(badge)) return 'live-streams'
  if (projectId === 'bunzlimeter' && /Quiz Takers/i.test(badge)) return 'live-bunzli'
  if (projectId === 'ttstats' && /Monthly Users/i.test(badge)) return 'live-ttstats'

  if (/Streams/i.test(badge) && /\d+M\+/.test(badge)) return 'metric'
  if (/\d+[KMB]?\+/.test(badge) || /Monthly|Users|Takers/i.test(badge)) return 'metric'
  if (/SRF|Radio|TV|Feature/i.test(badge)) return 'media'
  if (/Place|Award|Winner/i.test(badge)) return 'award'
  return 'default'
}

// Generic live counter badge for modal (larger size)
function LiveCounterBadge({
  target,
  label,
  colorScheme
}: {
  target: number
  label: string
  colorScheme: 'amber' | 'emerald' | 'blue'
}) {
  const [value, setValue] = useState(0)
  const [hasInitialized, setHasInitialized] = useState(false)

  const colors = {
    amber: {
      bg: 'from-amber-500/20 to-orange-500/20',
      text: 'text-amber-300',
      border: 'border-amber-400/30',
      dot: 'bg-amber-400',
      label: 'text-amber-300/70'
    },
    emerald: {
      bg: 'from-emerald-500/20 to-teal-500/20',
      text: 'text-emerald-300',
      border: 'border-emerald-400/30',
      dot: 'bg-emerald-400',
      label: 'text-emerald-300/70'
    },
    blue: {
      bg: 'from-blue-500/20 to-cyan-500/20',
      text: 'text-blue-300',
      border: 'border-blue-400/30',
      dot: 'bg-blue-400',
      label: 'text-blue-300/70'
    }
  }

  const scheme = colors[colorScheme]

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setValue(calculateCurrentValue(target))
      setHasInitialized(true)
    }, 300)
    return () => clearTimeout(initTimer)
  }, [target])

  useEffect(() => {
    if (!hasInitialized) return
    const interval = setInterval(() => {
      setValue(calculateCurrentValue(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [hasInitialized, target])

  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r border",
      scheme.bg, scheme.text, scheme.border
    )}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", scheme.dot)}></span>
        <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", scheme.dot)}></span>
      </span>
      <NumberFlow
        value={value}
        format={{ notation: 'standard', useGrouping: true }}
        className="tabular-nums"
        transformTiming={{ duration: 0 }}
        spinTiming={{ duration: 1500, easing: 'ease-out' }}
      />
      <span className={cn("font-medium", scheme.label)}>{label}</span>
    </span>
  )
}

// Specific live badges
function LiveStreamBadge() {
  return <LiveCounterBadge target={TARGET_STREAMS} label="streams" colorScheme="amber" />
}

function LiveBunzliBadge() {
  return <LiveCounterBadge target={TARGET_BUNZLI} label="quiz takers" colorScheme="emerald" />
}

function LiveTTStatsBadge() {
  return <LiveCounterBadge target={TARGET_TTSTATS_USERS} label="monthly users" colorScheme="blue" />
}

function ModalBadge({ badge, projectId }: { badge: string; projectId?: string }) {
  const type = getBadgeType(badge, projectId)

  if (type === 'live-streams') {
    return <LiveStreamBadge />
  }

  if (type === 'live-bunzli') {
    return <LiveBunzliBadge />
  }

  if (type === 'live-ttstats') {
    return <LiveTTStatsBadge />
  }

  if (type === 'metric') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'media') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border border-rose-500/30">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'award') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
        {badge}
      </span>
    )
  }

  return (
    <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
      {badge}
    </span>
  )
}

// Tech badge color mapping
const techColors: Record<string, string> = {
  'React': 'text-cyan-400',
  'Next.js': 'text-white',
  'TypeScript': 'text-blue-400',
  'Tailwind': 'text-teal-400',
  'Python': 'text-yellow-400',
  'FastAPI': 'text-emerald-400',
  'Node.js': 'text-green-400',
  'Kotlin': 'text-purple-400',
  'Docker': 'text-sky-400',
  'Grafana': 'text-orange-400',
  'Firebase': 'text-amber-400',
  'Framer': 'text-pink-400',
  'AI': 'text-violet-400',
  'NumPy': 'text-blue-300',
  'Streamlit': 'text-red-400',
  'Prometheus': 'text-orange-500',
  'WordPress': 'text-blue-400',
  'Traefik': 'text-cyan-300',
  'MQTT': 'text-lime-400',
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const categoryLabels: Record<string, string> = {
    webapp: 'Web Application',
    music: 'Music & Production',
    infrastructure: 'Infrastructure',
    fullstack: 'Full Stack'
  }

  return (
    <AnimatePresence mode="popLayout">
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60]"
            onClick={onClose}
          />

          {/* Modal positioning wrapper */}
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
          >
            <motion.div
              layoutId={`card-${project.id}`}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-neutral-950 border border-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="max-h-[90vh] overflow-y-auto">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.img
                    layoutId={`image-${project.id}`}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

                  {/* Category + Live status overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.15 }}
                    className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full',
                          project.category === 'webapp' && 'bg-amber-400',
                          project.category === 'music' && 'bg-violet-400',
                          project.category === 'infrastructure' && 'bg-emerald-400',
                          project.category === 'fullstack' && 'bg-cyan-400',
                        )}
                      />
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                        {categoryLabels[project.category]}
                      </span>
                    </div>

                    {project.href && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-medium text-emerald-400/80 uppercase tracking-widest">Live</span>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 md:p-8"
                >
                  {/* Title */}
                  <motion.h2
                    layoutId={`title-${project.id}`}
                    className="text-2xl md:text-3xl font-serif text-white mb-4 tracking-tight"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {project.title}
                  </motion.h2>

                  {/* Tech stack */}
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={cn(
                            'px-2.5 py-1 text-[11px] font-medium rounded-lg',
                            'bg-white/[0.04] border border-white/[0.08]',
                            techColors[tech] || 'text-neutral-400'
                          )}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Achievement Badges */}
                  {project.badges && project.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.badges.map((badge) => (
                        <ModalBadge key={badge} badge={badge} projectId={project.id} />
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-neutral-400 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3">
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 px-5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 px-5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 px-5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        App Store
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-2 px-5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        Play Store
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
