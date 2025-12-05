import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, categoryLabels, type Project } from '../../data/projects'
import { cn } from '../../lib/utils'
import { ProjectModal } from '../ui/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

// Live counter config
const START_DATE = new Date('2021-01-01T00:00:00')
const TARGET_DATE = new Date('2025-12-31T23:59:59')
const TARGET_STREAMS = 110000000
const TARGET_BUNZLI = 9500
const TARGET_TTSTATS_USERS = 1200
const TARGET_MIGROS_PRODUCTS = 31478

function calculateCurrentValue(target: number) {
  const now = new Date()
  const totalDuration = TARGET_DATE.getTime() - START_DATE.getTime()
  const elapsed = now.getTime() - START_DATE.getTime()
  const progress = elapsed / totalDuration
  return Math.floor(target * progress)
}

function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

// Video component that plays on parent hover
function HoverVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const parent = video.closest('.group')
    if (!parent) return

    const handleEnter = () => {
      setIsHovered(true)
      video.play().catch(() => {})
    }
    const handleLeave = () => {
      setIsHovered(false)
      video.pause()
      video.currentTime = 0
    }

    parent.addEventListener('mouseenter', handleEnter)
    parent.addEventListener('mouseleave', handleLeave)

    return () => {
      parent.removeEventListener('mouseenter', handleEnter)
      parent.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      className={cn(
        "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 pointer-events-none",
        isHovered ? "opacity-100" : "opacity-0",
        className
      )}
    />
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
  'C++': 'text-blue-500',
}

// Bento grid cell sizes - 3 column grid
// Featured items span 2x2 (4 cells), singles are 1x1
type CellSize = 'single' | 'featured-left' | 'featured-right'

const cellConfig: Record<CellSize, {
  gridClass: string
  imgHeight: string
  showDescription: boolean
  descriptionLines: number
  showAllTech: boolean
  titleSize: string
}> = {
  single: {
    gridClass: 'col-span-1',
    imgHeight: 'h-28 sm:h-32',
    showDescription: true,
    descriptionLines: 1,
    showAllTech: false,
    titleSize: 'text-sm'
  },
  'featured-left': {
    gridClass: 'col-span-1 sm:col-span-2 sm:row-span-2',
    imgHeight: 'h-40 sm:h-[calc(100%-5rem)]',
    showDescription: true,
    descriptionLines: 2,
    showAllTech: true,
    titleSize: 'text-lg sm:text-xl'
  },
  'featured-right': {
    gridClass: 'col-span-1 sm:col-span-2 sm:row-span-2 sm:col-start-2',
    imgHeight: 'h-40 sm:h-[calc(100%-5rem)]',
    showDescription: true,
    descriptionLines: 2,
    showAllTech: true,
    titleSize: 'text-lg sm:text-xl'
  },
}

// Badge type detection for special styling
function getBadgeType(badge: string, projectId?: string): 'metric' | 'media' | 'award' | 'live-streams' | 'live-bunzli' | 'live-ttstats' | 'live-migros' | 'default' {
  // Live animated badges for specific projects
  if (projectId === 'peak-twilight-web' && /Streams/i.test(badge)) return 'live-streams'
  if (projectId === 'bunzlimeter' && /Quiz Takers/i.test(badge)) return 'live-bunzli'
  if (projectId === 'ttstats' && /Monthly Users/i.test(badge)) return 'live-ttstats'
  if (projectId === 'migros-ai-search' && /Products Indexed/i.test(badge)) return 'live-migros'

  if (/Streams/i.test(badge) && /\d+M\+/.test(badge)) return 'metric'
  if (/\d+[KMB]?\+/.test(badge) || /Monthly|Users|Takers/i.test(badge)) return 'metric'
  if (/SRF|Radio|TV|Feature/i.test(badge)) return 'media'
  if (/Place|Award|Winner/i.test(badge)) return 'award'
  return 'default'
}

// Generic live counter badge component
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
      bg: 'from-amber-500/30 to-orange-500/30',
      text: 'text-amber-200',
      border: 'border-amber-400/40',
      shadow: 'shadow-amber-500/20',
      dot: 'bg-amber-400',
      label: 'text-amber-300/70'
    },
    emerald: {
      bg: 'from-emerald-500/30 to-teal-500/30',
      text: 'text-emerald-200',
      border: 'border-emerald-400/40',
      shadow: 'shadow-emerald-500/20',
      dot: 'bg-emerald-400',
      label: 'text-emerald-300/70'
    },
    blue: {
      bg: 'from-blue-500/30 to-cyan-500/30',
      text: 'text-blue-200',
      border: 'border-blue-400/40',
      shadow: 'shadow-blue-500/20',
      dot: 'bg-blue-400',
      label: 'text-blue-300/70'
    }
  }

  const scheme = colors[colorScheme]

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setValue(calculateCurrentValue(target))
      setHasInitialized(true)
    }, 500)
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
      "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold rounded-md bg-gradient-to-r border shadow-sm",
      scheme.bg, scheme.text, scheme.border, scheme.shadow
    )}>
      <span className="relative flex h-2 w-2">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", scheme.dot)}></span>
        <span className={cn("relative inline-flex rounded-full h-2 w-2", scheme.dot)}></span>
      </span>
      <NumberFlow
        value={value}
        format={{ notation: 'standard', useGrouping: true }}
        className="tabular-nums"
        transformTiming={{ duration: 0 }}
        spinTiming={{ duration: 1500, easing: 'ease-out' }}
      />
      <span className={scheme.label}>{label}</span>
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

function LiveMigrosBadge() {
  return <LiveCounterBadge target={TARGET_MIGROS_PRODUCTS} label="products indexed" colorScheme="amber" />
}

function BadgeWithIcon({ badge, projectId }: { badge: string; projectId?: string }) {
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

  if (type === 'live-migros') {
    return <LiveMigrosBadge />
  }

  if (type === 'metric') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'media') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-400">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'award') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-yellow-400">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
        {badge}
      </span>
    )
  }

  return (
    <span className="text-[10px] font-medium text-neutral-500">
      {badge}
    </span>
  )
}

// Horizontal scroll card - larger format for featured projects
function HorizontalCard({
  project,
  index,
  onClick,
  isSelected = false
}: {
  project: Project
  index: number
  onClick: () => void
  isSelected?: boolean
}) {
  return (
    <motion.article
      layoutId={`card-${project.id}`}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer flex-shrink-0',
        'w-[80vw] md:w-[55vw] lg:w-[45vw] h-[55vh] min-h-[400px] max-h-[480px]',
        'rounded-3xl overflow-hidden',
        'bg-gradient-to-br from-neutral-900/90 to-neutral-950',
        'border border-white/[0.08] hover:border-white/[0.15]',
        'transition-all duration-500'
      )}
      style={{ opacity: isSelected ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Background image/video */}
      <div className="absolute inset-0">
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover object-top transition-all duration-700",
            project.video ? "group-hover:opacity-0" : "group-hover:scale-105"
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        {project.video && <HoverVideo src={project.video} />}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        {/* Category - with background for visibility */}
        <div className="self-start flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
          <span className={cn(
            'w-2 h-2 rounded-full',
            project.category === 'webapp' && 'bg-amber-400',
            project.category === 'music' && 'bg-violet-400',
            project.category === 'infrastructure' && 'bg-emerald-400',
            project.category === 'fullstack' && 'bg-cyan-400',
          )} />
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-neutral-300">
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Title */}
        <motion.h3
          layoutId={`title-${project.id}`}
          className="text-3xl md:text-4xl font-serif text-white mb-4 group-hover:text-amber-200 transition-colors"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        {/* Badges */}
        {project.badges && project.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.badges.map((badge) => (
              <BadgeWithIcon key={badge} badge={badge} projectId={project.id} />
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
          {project.description}
        </p>

        {/* Tech stack - clean monospace style */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={cn(
                  'text-xs font-mono',
                  techColors[tech] || 'text-neutral-500'
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

      </div>
    </motion.article>
  )
}

function ProjectCard({
  project,
  size = 'single',
  index = 0,
  onClick,
  isSelected = false
}: {
  project: Project
  size?: CellSize
  index?: number
  onClick: () => void
  isSelected?: boolean
}) {
  const config = cellConfig[size]
  const isFeatured = size === 'featured-left' || size === 'featured-right'

  return (
    <motion.article
      layoutId={`card-${project.id}`}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-neutral-900/80 to-neutral-950/90',
        'border border-white/[0.06] hover:border-white/[0.12]',
        'transition-all duration-300 ease-out',
        'hover:shadow-2xl hover:shadow-amber-500/5',
        config.gridClass,
        'flex flex-col h-full'
      )}
      style={{ opacity: isSelected ? 0 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Image/Video section */}
      <div className={cn(
        'relative overflow-hidden',
        isFeatured ? 'flex-1' : 'h-32 sm:h-36'
      )}>
        {/* Static image (always visible, fades on hover if video exists) */}
        <motion.img
          layoutId={`image-${project.id}`}
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover object-top transition-all duration-700 ease-out",
            project.video ? "group-hover:opacity-0" : "group-hover:scale-105"
          )}
          loading="lazy"
          decoding="async"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Video (plays on hover) */}
        {project.video && <HoverVideo src={project.video} />}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none" />
      </div>

      {/* Content section */}
      <div className={cn(
        'relative',
        isFeatured ? 'p-4 lg:p-5' : 'p-2.5 lg:p-3'
      )}>
        {/* Category indicator */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={cn(
            'w-1.5 h-1.5 rounded-full',
            project.category === 'webapp' && 'bg-amber-400',
            project.category === 'music' && 'bg-violet-400',
            project.category === 'infrastructure' && 'bg-emerald-400',
            project.category === 'fullstack' && 'bg-cyan-400',
          )} />
          <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-neutral-500">
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Title */}
        <motion.h3
          layoutId={`title-${project.id}`}
          className={cn(
            'font-semibold text-white leading-tight',
            'group-hover:text-amber-200 transition-colors duration-300',
            config.titleSize
          )}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        {/* Achievement badges - show prominently */}
        {project.badges && project.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.badges.slice(0, isFeatured ? 3 : 2).map((badge) => (
              <BadgeWithIcon key={badge} badge={badge} projectId={project.id} />
            ))}
          </div>
        )}

        {/* Tech stack - clean monospace, only on featured cards */}
        {isFeatured && project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  'text-[10px] font-mono',
                  techColors[tech] || 'text-neutral-500'
                )}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {config.showDescription && project.description && (
          <p className={cn(
            'mt-1.5 text-[11px] text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors',
            config.descriptionLines === 1 ? 'line-clamp-1' : 'line-clamp-2'
          )}>
            {project.description}
          </p>
        )}

      </div>

      {/* Hover arrow indicator */}
      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.article>
  )
}


export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showMore, setShowMore] = useState(false)

  // Track if mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (showMore) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showMore])

  // Refs for horizontal scroll
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const keywordsRef = useRef<HTMLDivElement>(null)

  // GSAP horizontal scroll effect (desktop only)
  useLayoutEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    const trigger = triggerRef.current
    const scroller = scrollerRef.current
    const keywords = keywordsRef.current

    if (!section || !trigger || !scroller) return

    // Calculate how far to scroll - add extra padding for last item visibility
    const scrollWidth = scroller.scrollWidth - window.innerWidth + 200

    const ctx = gsap.context(() => {
      // Create shared ScrollTrigger config
      const scrollTriggerConfig = {
        trigger: trigger,
        start: 'top 10%',
        end: () => `+=${scrollWidth + 300}`,
        pin: true,
        scrub: 1.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }

      // Horizontal scroll for cards
      gsap.fromTo(scroller,
        { x: 0 },
        {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: scrollTriggerConfig,
        }
      )

      // Vertical scroll for background keywords (scrolls up as you scroll sideways)
      if (keywords) {
        gsap.fromTo(keywords,
          { yPercent: 0 },
          {
            yPercent: -75, // Scroll up through the 400% tall container
            ease: 'none',
            scrollTrigger: {
              trigger: trigger,
              start: 'top 10%',
              end: () => `+=${scrollWidth + 300}`,
              scrub: 0.5,
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  // Get projects by ID helper
  const getProject = (id: string) => projects.find(p => p.id === id)

  // Featured projects for horizontal scroll
  const featuredIds = [
    'ttstats', 'bunzlimeter', 'migros-ai-search', 'peakops',
    'linear-algebra', 'password-cleaner', 'peak-plugins', 'peak-twilight-web'
  ]

  // Bento grid layout for "More Projects" section
  // Featured items span 2x2, singles are 1x1
  const bentoGridItems: Array<{ id: string; size: CellSize }> = [
    // Block 1: Featured left + 2 singles right
    { id: 'witelli20', size: 'featured-left' },
    { id: 'fhnw-dashboard', size: 'single' },
    { id: 'galaxus', size: 'single' },

    // Block 2: 2 singles left + Featured right
    { id: 'thatsapp', size: 'single' },
    { id: 'unidocs', size: 'single' },
    { id: 'soothe-records', size: 'featured-right' },

    // Block 3: Featured left + 2 singles right
    { id: 'dreamhop', size: 'featured-left' },
    { id: 'peak-twilight-spotify', size: 'single' },
    { id: 'soothe-studios', size: 'single' },

    // Block 4: 2 singles left + Featured right (infrastructure)
    { id: 'studio-dreamhop', size: 'single' },
    { id: 'grafana', size: 'single' },
    { id: 'uptime-kuma', size: 'featured-right' },

    // Rest as singles
    { id: 'glances', size: 'single' },
    { id: 'portainer', size: 'single' },
    { id: 'traefik', size: 'single' },
    { id: 'watchtower', size: 'single' },
    { id: 'nocodb', size: 'single' },
    { id: 'soothe-bot', size: 'single' },
    { id: 'playlist-rotator', size: 'single' },
    { id: 'waha', size: 'single' },
  ]

  const featuredProjects = featuredIds
    .map(id => getProject(id))
    .filter((p): p is Project => !!p)

  // Build bento grid with projects
  const bentoProjects = bentoGridItems
    .map(item => ({ project: getProject(item.id), size: item.size }))
    .filter((item): item is { project: Project; size: CellSize } => !!item.project)

  return (
    <LayoutGroup>
      <section ref={sectionRef} id="projects" className="relative">
        {/* Mobile: Simple vertical scroll */}
        {isMobile ? (
          <div className="py-16 px-4">
            <div className="text-center mb-8">
              <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Featured</span>
              <h2 className="text-2xl font-serif text-white mt-2">Currently Building</h2>
            </div>
            <div className="space-y-4">
              {featuredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                  className="relative cursor-pointer rounded-2xl overflow-hidden bg-neutral-900/80 border border-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      layoutId={`image-${project.id}`}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        project.category === 'webapp' && 'bg-amber-400',
                        project.category === 'music' && 'bg-violet-400',
                        project.category === 'infrastructure' && 'bg-emerald-400',
                        project.category === 'fullstack' && 'bg-cyan-400',
                      )} />
                      <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                    <motion.h3
                      layoutId={`title-${project.id}`}
                      className="text-lg font-semibold text-white mb-2"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">{project.description}</p>
                  </div>
                </motion.article>
              ))}
              {/* Show More Button */}
              <button
                onClick={() => setShowMore(true)}
                className="w-full py-4 rounded-2xl border border-dashed border-white/20 text-neutral-400 hover:border-amber-500/40 hover:text-amber-400 transition-colors"
              >
                View {bentoProjects.length} More Projects
              </button>
            </div>
          </div>
        ) : (
        /* Desktop: Horizontal scroll section */
        <div ref={triggerRef} className="h-screen overflow-hidden relative flex flex-col">
          {/* Gradient masks for smooth fade in/out */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-neutral-950 via-neutral-950/50 to-transparent z-[5] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent z-[5] pointer-events-none" />

          {/* Floating background keywords - scrolls up as you scroll sideways */}
          <div
            ref={keywordsRef}
            className="absolute inset-x-0 pointer-events-none select-none"
            style={{ height: '400%', top: '0' }}
          >
            {/* Large scattered keywords with rotation and color variations - MORE VISIBLE */}
            {[
              // Layer 1 - starts at ~25% of 400% = 100% = at bottom of viewport initially
              { text: 'SIEM', x: '8%', y: '26%', size: 'text-7xl md:text-8xl', rotate: -3, color: 'text-amber-500/[0.08]' },
              { text: 'EDR', x: '70%', y: '27%', size: 'text-6xl md:text-7xl', rotate: 4, color: 'text-red-500/[0.07]' },
              { text: 'SOAR', x: '35%', y: '28%', size: 'text-5xl md:text-6xl', rotate: -2, color: 'text-purple-500/[0.07]' },
              { text: 'React', x: '5%', y: '29%', size: 'text-7xl md:text-8xl', rotate: -5, color: 'text-cyan-500/[0.08]' },
              { text: 'TypeScript', x: '55%', y: '30%', size: 'text-6xl md:text-7xl', rotate: 3, color: 'text-blue-500/[0.07]' },

              // Layer 2
              { text: 'Python', x: '60%', y: '32%', size: 'text-7xl md:text-8xl', rotate: -2, color: 'text-yellow-500/[0.07]' },
              { text: 'Docker', x: '5%', y: '34%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-sky-500/[0.08]' },
              { text: 'Next.js', x: '35%', y: '36%', size: 'text-6xl md:text-7xl', rotate: -3, color: 'text-white/[0.07]' },
              { text: 'FastAPI', x: '78%', y: '37%', size: 'text-5xl md:text-6xl', rotate: 2, color: 'text-emerald-500/[0.07]' },

              // Layer 3
              { text: 'Tailwind', x: '8%', y: '38%', size: 'text-5xl md:text-6xl', rotate: -4, color: 'text-teal-500/[0.08]' },
              { text: 'Node.js', x: '60%', y: '39%', size: 'text-6xl md:text-7xl', rotate: 3, color: 'text-green-500/[0.07]' },
              { text: 'PostgreSQL', x: '35%', y: '40%', size: 'text-5xl md:text-6xl', rotate: -2, color: 'text-blue-400/[0.07]' },
              { text: 'MySQL', x: '80%', y: '41%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-sky-500/[0.07]' },

              // Layer 4
              { text: 'Kubernetes', x: '5%', y: '44%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-blue-500/[0.08]' },
              { text: 'Logic Pro', x: '48%', y: '45%', size: 'text-6xl md:text-7xl', rotate: -3, color: 'text-neutral-400/[0.07]' },
              { text: 'Grafana', x: '75%', y: '46%', size: 'text-5xl md:text-6xl', rotate: 2, color: 'text-orange-500/[0.07]' },

              // Layer 5
              { text: 'AWS', x: '20%', y: '49%', size: 'text-6xl md:text-7xl', rotate: -4, color: 'text-amber-500/[0.07]' },
              { text: 'Firebase', x: '55%', y: '50%', size: 'text-5xl md:text-6xl', rotate: 3, color: 'text-yellow-500/[0.07]' },
              { text: 'MongoDB', x: '85%', y: '51%', size: 'text-6xl md:text-7xl', rotate: -2, color: 'text-green-500/[0.08]' },
              { text: 'Ableton', x: '10%', y: '52%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-neutral-400/[0.07]' },

              // Layer 6
              { text: 'Redis', x: '40%', y: '55%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-red-500/[0.07]' },
              { text: 'Vercel', x: '70%', y: '56%', size: 'text-6xl md:text-7xl', rotate: -3, color: 'text-white/[0.07]' },
              { text: 'Linux', x: '5%', y: '57%', size: 'text-5xl md:text-6xl', rotate: 2, color: 'text-yellow-500/[0.08]' },
              { text: 'Bash', x: '25%', y: '58%', size: 'text-5xl md:text-6xl', rotate: -4, color: 'text-green-500/[0.07]' },

              // Layer 7
              { text: 'Git', x: '60%', y: '61%', size: 'text-7xl md:text-8xl', rotate: -4, color: 'text-orange-500/[0.07]' },
              { text: 'Nginx', x: '15%', y: '62%', size: 'text-5xl md:text-6xl', rotate: 3, color: 'text-green-500/[0.07]' },
              { text: 'Traefik', x: '80%', y: '63%', size: 'text-5xl md:text-6xl', rotate: -2, color: 'text-cyan-500/[0.07]' },

              // Layer 8
              { text: 'GraphQL', x: '35%', y: '66%', size: 'text-6xl md:text-7xl', rotate: -2, color: 'text-pink-500/[0.08]' },
              { text: 'REST APIs', x: '70%', y: '67%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-blue-500/[0.07]' },
              { text: 'Prometheus', x: '5%', y: '68%', size: 'text-5xl md:text-6xl', rotate: -3, color: 'text-orange-500/[0.07]' },

              // Layer 9
              { text: 'Loki', x: '50%', y: '71%', size: 'text-5xl md:text-6xl', rotate: 2, color: 'text-amber-500/[0.07]' },
              { text: 'Spotify API', x: '20%', y: '72%', size: 'text-5xl md:text-6xl', rotate: -4, color: 'text-green-500/[0.08]' },
              { text: 'Firestore', x: '75%', y: '73%', size: 'text-5xl md:text-6xl', rotate: 3, color: 'text-yellow-500/[0.07]' },

              // Layer 10
              { text: 'Mixing', x: '8%', y: '76%', size: 'text-6xl md:text-7xl', rotate: -3, color: 'text-violet-500/[0.07]' },
              { text: 'Mastering', x: '45%', y: '77%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-fuchsia-500/[0.07]' },
              { text: 'Terraform', x: '80%', y: '78%', size: 'text-5xl md:text-6xl', rotate: -2, color: 'text-purple-500/[0.07]' },

              // Layer 11
              { text: 'Rust', x: '30%', y: '81%', size: 'text-7xl md:text-8xl', rotate: 3, color: 'text-orange-500/[0.07]' },
              { text: 'Go', x: '65%', y: '82%', size: 'text-6xl md:text-7xl', rotate: -4, color: 'text-cyan-500/[0.07]' },
              { text: 'Kafka', x: '10%', y: '83%', size: 'text-6xl md:text-7xl', rotate: 2, color: 'text-white/[0.08]' },

              // Layer 12
              { text: 'Swift', x: '55%', y: '86%', size: 'text-5xl md:text-6xl', rotate: -3, color: 'text-orange-500/[0.07]' },
              { text: 'Vue.js', x: '25%', y: '87%', size: 'text-5xl md:text-6xl', rotate: 4, color: 'text-emerald-500/[0.07]' },
              { text: 'Django', x: '80%', y: '88%', size: 'text-6xl md:text-7xl', rotate: -2, color: 'text-green-500/[0.07]' },

              // Final layer
              { text: 'TensorFlow', x: '40%', y: '91%', size: 'text-5xl md:text-6xl', rotate: 3, color: 'text-orange-500/[0.07]' },
              { text: 'Splunk', x: '70%', y: '92%', size: 'text-6xl md:text-7xl', rotate: -4, color: 'text-green-500/[0.07]' },
              { text: 'Ansible', x: '15%', y: '93%', size: 'text-5xl md:text-6xl', rotate: 2, color: 'text-red-500/[0.07]' },
            ].map((item, i) => (
              <span
                key={i}
                className={cn(
                  'absolute font-mono font-black whitespace-nowrap tracking-tight',
                  item.size,
                  item.color
                )}
                style={{
                  left: item.x,
                  top: item.y,
                  transform: `rotate(${item.rotate}deg)`,
                }}
              >
                {item.text}
              </span>
            ))}
          </div>

          {/* Scrolling cards */}
          <div
            ref={scrollerRef}
            className="flex items-start gap-8 flex-1 pl-[10vw] pr-[50vw] relative z-10"
          >
            {featuredProjects.map((project, index) => (
              <HorizontalCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                isSelected={selectedProject?.id === project.id}
              />
            ))}

            {/* Show More Card - at the end of horizontal scroll */}
            {bentoProjects.length > 0 && (
              <button
                onClick={() => setShowMore(true)}
                className={cn(
                  'group relative cursor-pointer flex-shrink-0',
                  'w-[60vw] md:w-[40vw] lg:w-[30vw] h-[55vh] min-h-[400px] max-h-[480px]',
                  'rounded-3xl overflow-hidden',
                  'bg-gradient-to-br from-neutral-900/50 to-neutral-950/80',
                  'border border-dashed border-white/[0.15] hover:border-amber-500/40',
                  'transition-all duration-500',
                  'flex flex-col items-center justify-center gap-4'
                )}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-serif text-white mb-2">
                    {bentoProjects.length} More
                  </p>
                  <p className="text-sm text-neutral-500">
                    Explore all projects
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
        )}
      </section>

      {/* Full-screen Projects Overlay */}
      <AnimatePresence>
        {showMore && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-neutral-950/95 backdrop-blur-sm z-[100]"
              onClick={() => setShowMore(false)}
            />

            {/* Overlay Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] overflow-y-auto"
            >
              <div className="min-h-screen py-16 px-4 md:px-8">
                {/* Header */}
                <div className="max-w-7xl mx-auto mb-12">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Archive</span>
                      <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">
                        All Projects
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowMore(false)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-neutral-400 hover:text-white hover:border-white/[0.2] transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bento Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:[grid-auto-rows:200px] sm:[grid-auto-flow:dense]">
                  {bentoProjects.map((item, index) => (
                    <motion.div
                      key={item.project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.15) }}
                      className={cellConfig[item.size].gridClass}
                    >
                      <ProjectCard
                        project={item.project}
                        size={item.size}
                        index={index}
                        onClick={() => setSelectedProject(item.project)}
                        isSelected={selectedProject?.id === item.project.id}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </LayoutGroup>
  )
}
