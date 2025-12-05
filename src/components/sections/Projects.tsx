import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import NumberFlow from '@number-flow/react'
import { projects, type Project } from '../../data/projects'
import { cn } from '../../lib/utils'
import { ProjectModal } from '../ui/ProjectModal'

// Live counter config
const START_DATE = new Date('2021-01-01T00:00:00')
const TARGET_DATE = new Date('2025-12-31T23:59:59')
const TARGET_STREAMS = 110000000
const TARGET_BUNZLI = 9500
const TARGET_TTSTATS_USERS = 1200

// Tech stack for marquee
const techStack = {
  row1: ['React', 'Python', 'PostgreSQL', 'Docker', 'SIEM', 'TypeScript', 'FastAPI', 'MongoDB', 'Kubernetes', 'EDR', 'Next.js', 'Node.js', 'MySQL', 'Prometheus', 'SOAR'],
  row2: ['AWS', 'Git', 'Tailwind', 'Java', 'Grafana', 'Swimlane', 'Vercel', 'Linux', 'CSS3', 'PHP', 'Nginx', 'Incident Response', 'Firebase', 'Bash', 'HTML5'],
  row3: ['Logic Pro', 'Ableton Live', 'Traefik', 'Loki', 'Redis', 'Spotify API', 'Audio Engineering', 'Mixing', 'Watchtower', 'Uptime Kuma', 'Firestore', 'REST APIs', 'Mastering'],
}

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

  if (type === 'metric') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'media') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border border-rose-500/30">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
        {badge}
      </span>
    )
  }

  if (type === 'award') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30 shadow-sm shadow-yellow-500/10">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
        </svg>
        {badge}
      </span>
    )
  }

  return (
    <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-400">
      {badge}
    </span>
  )
}

function ProjectCard({
  project,
  size = 'single',
  index = 0,
  onClick
}: {
  project: Project
  size?: CellSize
  index?: number
  onClick: () => void
}) {
  const config = cellConfig[size]

  const categoryColors = {
    webapp: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
    music: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
    infrastructure: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
  }

  const categoryLabels = {
    webapp: 'Web',
    music: 'Music',
    infrastructure: 'Infra'
  }

  const isFeatured = size === 'featured-left' || size === 'featured-right'

  return (
    <motion.article
      layoutId={`project-card-${project.id}`}
      onClick={onClick}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-neutral-900/80 to-neutral-950/90',
        'border border-white/[0.06] hover:border-white/[0.12]',
        'transition-all duration-500 ease-out',
        'hover:shadow-2xl hover:shadow-amber-500/5',
        config.gridClass,
        'flex flex-col'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.21, 0.47, 0.32, 0.98],
        layout: { type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }
      }}
      whileHover={{ y: -4 }}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
        'bg-gradient-to-br',
        categoryColors[project.category]
      )} />

      {/* Image section - grows to fill available space */}
      <div className="relative overflow-hidden flex-1 min-h-[100px]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

        {/* Category pill */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            'px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full',
            'bg-black/60 backdrop-blur-sm border',
            project.category === 'webapp' && 'text-blue-300 border-blue-500/40',
            project.category === 'music' && 'text-purple-300 border-purple-500/40',
            project.category === 'infrastructure' && 'text-emerald-300 border-emerald-500/40',
          )}>
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Live indicator */}
        {project.href && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-medium text-emerald-300 uppercase tracking-wider">Live</span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className={cn(
        'relative',
        isFeatured ? 'p-4 lg:p-5' : 'p-2.5 lg:p-3'
      )}>
        {/* Title */}
        <h3
          className={cn(
            'font-semibold text-white leading-tight',
            'group-hover:text-amber-200 transition-colors duration-300',
            config.titleSize
          )}
        >
          {project.title}
        </h3>

        {/* Achievement badges - show prominently */}
        {project.badges && project.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.badges.slice(0, isFeatured ? 3 : 2).map((badge) => (
              <BadgeWithIcon key={badge} badge={badge} projectId={project.id} />
            ))}
          </div>
        )}

        {/* Tech stack - only on featured cards */}
        {isFeatured && project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  'px-2 py-0.5 text-[10px] font-medium rounded-md',
                  'bg-white/[0.04] border border-white/[0.08]',
                  'transition-colors duration-300 group-hover:border-white/[0.15]',
                  techColors[tech] || 'text-neutral-400'
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
  const [showAll, setShowAll] = useState(false)
  const showMoreRef = useRef<HTMLDivElement>(null)

  const handleShowMore = () => {
    // Get the current scroll position of the button relative to viewport
    const buttonRect = showMoreRef.current?.getBoundingClientRect()
    const scrollY = window.scrollY
    const buttonTop = buttonRect?.top ?? 0

    setShowAll(true)

    // After state update, scroll to keep roughly same view
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollY,
        behavior: 'instant'
      })
    })
  }

  // Get projects by ID helper
  const getProject = (id: string) => projects.find(p => p.id === id)

  // Bento grid layout - 3 columns
  // Featured items span 2x2 (takes space of 4 singles)
  // Layout: Featured (2x2) + 2 singles stacked, or 3 singles in a row
  // Order by importance: user count, awards, virality, impact
  const gridItems: Array<{ project: Project; size: CellSize }> = [
    // Block 1: TTStats (1K+ users, 2nd FHNW award) - Most prominent
    { project: getProject('ttstats')!, size: 'featured-left' },
    { project: getProject('fhnw-dashboard')!, size: 'single' },
    { project: getProject('linear-algebra')!, size: 'single' },

    // Block 2: Bunzlimeter (9K+ users, SRF viral)
    { project: getProject('bunzlimeter')!, size: 'featured-left' },
    { project: getProject('migros-ai-search')!, size: 'single' },
    { project: getProject('witelli20')!, size: 'single' },

    // Block 3: Peak Twilight (100M+ streams)
    { project: getProject('peak-twilight-web')!, size: 'featured-left' },
    { project: getProject('galaxus')!, size: 'single' },
    { project: getProject('thatsapp')!, size: 'single' },

    // Block 4: Infrastructure showcase
    { project: getProject('unidocs')!, size: 'single' },
    { project: getProject('password-cleaner')!, size: 'single' },
    { project: getProject('peakops')!, size: 'featured-right' },

    // Block 5: Music label (30M+ streams)
    { project: getProject('soothe-records')!, size: 'featured-left' },
    { project: getProject('dreamhop')!, size: 'single' },
    { project: getProject('soothe-studios')!, size: 'single' },

    // Rest as singles
    { project: getProject('uptime-kuma')!, size: 'single' },
    { project: getProject('glances')!, size: 'single' },
    { project: getProject('grafana')!, size: 'single' },
    { project: getProject('portainer')!, size: 'single' },
    { project: getProject('traefik')!, size: 'single' },
    { project: getProject('watchtower')!, size: 'single' },
    { project: getProject('nocodb')!, size: 'single' },
    { project: getProject('peak-plugins')!, size: 'single' },
    { project: getProject('soothe-bot')!, size: 'single' },
    { project: getProject('playlist-rotator')!, size: 'single' },
    { project: getProject('waha')!, size: 'single' },
    { project: getProject('studio-dreamhop')!, size: 'single' },
  ].filter(item => item.project)

  // Show first 6 items initially, all when expanded
  const visibleItems = showAll ? gridItems : gridItems.slice(0, 6)
  const hasMore = gridItems.length > 6

  return (
    <>
      <section id="projects" className="py-24 md:py-32 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
              What I Build
            </h2>
          </motion.div>

          {/* Tech Stack Marquee */}
          <div className="relative mb-12 overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            {/* Row 1 - Forward */}
            <div
              className="flex animate-marquee-forward mb-2"
              style={{ '--duration': '35s' } as React.CSSProperties}
            >
              {[...techStack.row1, ...techStack.row1].map((tech, i) => (
                <span
                  key={i}
                  className="mx-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Row 2 - Reverse */}
            <div
              className="flex animate-marquee-reverse mb-2"
              style={{ '--duration': '40s' } as React.CSSProperties}
            >
              {[...techStack.row2, ...techStack.row2].map((tech, i) => (
                <span
                  key={i}
                  className="mx-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Row 3 - Forward slower */}
            <div
              className="flex animate-marquee-forward"
              style={{ '--duration': '45s' } as React.CSSProperties}
            >
              {[...techStack.row3, ...techStack.row3].map((tech, i) => (
                <span
                  key={i}
                  className="mx-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bento Grid - 3 columns with auto rows */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-fr sm:[grid-auto-rows:minmax(160px,1fr)] sm:[grid-auto-flow:dense]">
              {visibleItems.map((item, index) => (
                <ProjectCard
                  key={item.project.id}
                  project={item.project}
                  size={item.size}
                  index={index}
                  onClick={() => setSelectedProject(item.project)}
                />
              ))}
            </div>

            {/* Fade overlay and Show More button */}
            {hasMore && !showAll && (
              <div ref={showMoreRef} className="relative mt-[-120px] pt-32 pb-4">
                {/* Gradient fade */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-t from-neutral-950 via-neutral-950/95 to-transparent pointer-events-none" />

                {/* Show More button */}
                <div className="relative flex justify-center">
                  <motion.button
                    onClick={handleShowMore}
                    className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                      Show {gridItems.length - 6} more projects
                    </span>
                    <svg
                      className="w-4 h-4 text-amber-500 transition-transform duration-300 group-hover:translate-y-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Show Less button when expanded */}
            {showAll && (
              <div className="flex justify-center mt-8">
                <motion.button
                  onClick={() => setShowAll(false)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-xl text-neutral-500 hover:text-neutral-300 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <span className="text-sm font-medium">Show less</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
