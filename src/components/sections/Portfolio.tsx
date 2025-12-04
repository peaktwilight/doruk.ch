import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { projects, filters, type FilterKey, type Project } from '../../data/projects'

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredProjects = useMemo(() => {
    return activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-noir-900 border border-noir-800 rounded-card p-6 md:p-8 shadow-elevated"
    >
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-label text-amber">Selected Works</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-noir-50 mt-1">
              Portfolio
            </h2>
          </div>
          <div className="text-right">
            <span className="text-2xl font-serif font-semibold text-amber">{filteredProjects.length}</span>
            <span className="text-xs text-noir-500 block">projects</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3 py-1.5 rounded-soft text-sm font-sans transition-all ${
                activeFilter === filter.key
                  ? 'bg-amber text-noir-950 font-medium'
                  : 'bg-noir-800/50 text-noir-400 hover:text-noir-200 border border-noir-700/50 hover:border-noir-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      {/* Grid - NO layout animations to prevent stretching */}
      <div className="project-grid">
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </motion.article>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group bg-noir-800/50 border border-noir-700/50 hover:border-noir-600 rounded-card overflow-hidden transition-all hover:shadow-medium"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-noir-800">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-900/80 via-transparent to-transparent" />

        {/* Open Source Badge */}
        {project.openSource && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-noir-900/90 backdrop-blur-sm border border-amber/30 rounded text-[10px] font-mono text-amber">
            <ion-icon name="logo-github" class="text-xs"></ion-icon>
            Open Source
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-noir-100 mb-1 group-hover:text-amber transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-noir-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        {/* Badges */}
        {project.badges && project.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.badges.slice(0, 2).map((badge, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-noir-700/50 border border-noir-600/50 text-noir-400 rounded text-[10px] font-mono"
              >
                {badge}
              </span>
            ))}
            {project.badges.length > 2 && (
              <span className="px-2 py-0.5 text-noir-500 text-[10px] font-mono">
                +{project.badges.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Action */}
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-amber hover:text-amber-light font-medium transition-colors"
          >
            View Project
            <ion-icon name="arrow-forward-outline" class="text-sm"></ion-icon>
          </a>
        )}
      </div>
    </motion.div>
  )
}
