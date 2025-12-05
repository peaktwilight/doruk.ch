import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import { cn } from '../../lib/utils'
import { ProjectModal } from '../ui/ProjectModal'

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

// Bento grid cell sizes - 3 column grid
// Featured items span 2x2 (4 cells), singles are 1x1
type CellSize = 'single' | 'featured-left' | 'featured-right'

const cellConfig: Record<CellSize, {
  gridClass: string
  imgHeight: string
  showDescription: boolean
  showAllTech: boolean
  titleSize: string
}> = {
  single: {
    gridClass: 'col-span-1',
    imgHeight: 'h-28 sm:h-32',
    showDescription: false,
    showAllTech: false,
    titleSize: 'text-sm'
  },
  'featured-left': {
    gridClass: 'col-span-1 sm:col-span-2 sm:row-span-2',
    imgHeight: 'h-40 sm:h-[calc(100%-5rem)]',
    showDescription: true,
    showAllTech: true,
    titleSize: 'text-lg sm:text-xl'
  },
  'featured-right': {
    gridClass: 'col-span-1 sm:col-span-2 sm:row-span-2 sm:col-start-2',
    imgHeight: 'h-40 sm:h-[calc(100%-5rem)]',
    showDescription: true,
    showAllTech: true,
    titleSize: 'text-lg sm:text-xl'
  },
}

function ProjectCard({
  project,
  size = 'single',
  index = 0,
  onClick,
  isRevealed = false
}: {
  project: Project
  size?: CellSize
  index?: number
  onClick: () => void
  isRevealed?: boolean
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
      initial={isRevealed ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
      animate={isRevealed ? { opacity: 1 } : undefined}
      whileInView={isRevealed ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={isRevealed ? undefined : { once: true, margin: '-80px' }}
      transition={{
        duration: isRevealed ? 0.4 : 0.5,
        delay: isRevealed ? Math.min((index - 12) * 0.05, 0.4) : Math.min(index * 0.03, 0.3),
        ease: [0.21, 0.47, 0.32, 0.98]
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
        <motion.img
          layoutId={`project-image-${project.id}`}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

        {/* Category pill */}
        <motion.div
          layoutId={`project-category-${project.id}`}
          className="absolute top-3 left-3"
        >
          <span className={cn(
            'px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full',
            'bg-black/60 backdrop-blur-sm border',
            project.category === 'webapp' && 'text-blue-300 border-blue-500/40',
            project.category === 'music' && 'text-purple-300 border-purple-500/40',
            project.category === 'infrastructure' && 'text-emerald-300 border-emerald-500/40',
          )}>
            {categoryLabels[project.category]}
          </span>
        </motion.div>

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
        <motion.h3
          layoutId={`project-title-${project.id}`}
          className={cn(
            'font-semibold text-white leading-tight',
            'group-hover:text-amber-200 transition-colors duration-300',
            config.titleSize
          )}
        >
          {project.title}
        </motion.h3>

        {/* Tech stack */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tech.slice(0, config.showAllTech ? 6 : 2).map((tech) => (
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

        {/* Description for larger cards */}
        {config.showDescription && project.description && (
          <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-2 group-hover:text-neutral-400 transition-colors">
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
  const gridItems: Array<{ project: Project; size: CellSize }> = [
    // Block 1: Featured left + 2 singles right
    { project: getProject('peak-twilight-web')!, size: 'featured-left' },
    { project: getProject('bunzlimeter')!, size: 'single' },
    { project: getProject('fhnw-dashboard')!, size: 'single' },

    // Block 2: 2 singles left + Featured right
    { project: getProject('ttstats')!, size: 'single' },
    { project: getProject('linear-algebra')!, size: 'single' },
    { project: getProject('migros-ai-search')!, size: 'featured-right' },

    // Row of 3 singles
    { project: getProject('witelli20')!, size: 'single' },
    { project: getProject('galaxus')!, size: 'single' },
    { project: getProject('thatsapp')!, size: 'single' },

    // Block 3: Featured left + 2 singles right
    { project: getProject('peakops')!, size: 'featured-left' },
    { project: getProject('unidocs')!, size: 'single' },
    { project: getProject('peak-twilight-spotify')!, size: 'single' },

    // Block 4: 2 singles left + Featured right
    { project: getProject('dreamhop')!, size: 'single' },
    { project: getProject('password-cleaner')!, size: 'single' },
    { project: getProject('soothe-records')!, size: 'featured-right' },

    // Rest as singles
    { project: getProject('soothe-studios')!, size: 'single' },
    { project: getProject('uptime-kuma')!, size: 'single' },
    { project: getProject('glances')!, size: 'single' },
    { project: getProject('grafana')!, size: 'single' },
    { project: getProject('portainer')!, size: 'single' },
    { project: getProject('traefik')!, size: 'single' },
    { project: getProject('watchtower')!, size: 'single' },
    { project: getProject('nocodb')!, size: 'single' },
    { project: getProject('soothe-bot')!, size: 'single' },
    { project: getProject('playlist-rotator')!, size: 'single' },
    { project: getProject('waha')!, size: 'single' },
    { project: getProject('studio-dreamhop')!, size: 'single' },
  ].filter(item => item.project)

  // Show first 12 items initially, all when expanded
  const visibleItems = showAll ? gridItems : gridItems.slice(0, 12)
  const hasMore = gridItems.length > 12

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
            className="text-center mb-16"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
              Selected Work
            </h2>
          </motion.div>

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
                  isRevealed={showAll && index >= 12}
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
                      Show {gridItems.length - 12} more projects
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
