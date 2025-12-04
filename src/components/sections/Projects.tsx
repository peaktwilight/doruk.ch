import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects, type Project } from '../../data/projects'
import { cn } from '../../lib/utils'

// Split projects into 4 rows
const row1 = projects.filter((_, i) => i % 4 === 0)
const row2 = projects.filter((_, i) => i % 4 === 1)
const row3 = projects.filter((_, i) => i % 4 === 2)
const row4 = projects.filter((_, i) => i % 4 === 3)

function ProjectCard({ project }: { project: Project }) {
  const categoryColors = {
    webapp: 'from-blue-500/20 to-blue-600/5',
    music: 'from-purple-500/20 to-purple-600/5',
    infrastructure: 'from-emerald-500/20 to-emerald-600/5'
  }

  const categoryLabels = {
    webapp: 'Web',
    music: 'Music',
    infrastructure: 'Infra'
  }

  return (
    <a
      href={project.href || project.sourceUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[240px] md:w-[300px] rounded-xl overflow-hidden border border-white/[0.06] bg-neutral-900/50 transition-all duration-300 hover:border-white/20 hover:scale-[1.02]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={cn('absolute inset-0 bg-gradient-to-t', categoryColors[project.category])} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Category */}
        <div className="absolute top-2 left-2">
          <span className={cn(
            'px-2 py-0.5 text-[8px] font-medium uppercase tracking-wider rounded-full backdrop-blur-sm border',
            project.category === 'webapp' && 'bg-blue-500/20 text-blue-300 border-blue-500/20',
            project.category === 'music' && 'bg-purple-500/20 text-purple-300 border-purple-500/20',
            project.category === 'infrastructure' && 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20'
          )}>
            {categoryLabels[project.category]}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>
    </a>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Rows move in alternating directions
  const row1X = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const row2X = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const row3X = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const row4X = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-32 overflow-hidden relative"
    >
      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Portfolio</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3 mb-4">
            {projects.length} Projects
          </h2>
          <div className="flex justify-center gap-6 text-xs text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Web
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Music
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Infra
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll-driven horizontal rows */}
      <div className="relative">
        <div className="space-y-4">
          {/* Row 1 */}
          <motion.div style={{ x: row1X }} className="flex gap-4">
            {[...row1, ...row1, ...row1].map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} />
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div style={{ x: row2X }} className="flex gap-4">
            {[...row2, ...row2, ...row2].map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} />
            ))}
          </motion.div>

          {/* Row 3 */}
          <motion.div style={{ x: row3X }} className="flex gap-4">
            {[...row3, ...row3, ...row3].map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} />
            ))}
          </motion.div>

          {/* Row 4 */}
          <motion.div style={{ x: row4X }} className="flex gap-4">
            {[...row4, ...row4, ...row4].map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} />
            ))}
          </motion.div>
        </div>

        {/* Fade to black edges - like tech stack */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10"
          style={{ background: 'linear-gradient(to right, rgb(10, 10, 10), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10"
          style={{ background: 'linear-gradient(to left, rgb(10, 10, 10), transparent)' }}
        />
      </div>
    </section>
  )
}
