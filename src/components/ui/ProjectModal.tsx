import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { type Project } from '../../data/projects'
import { cn } from '../../lib/utils'

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
  if (!project) return null

  const categoryLabels = {
    webapp: 'Web Application',
    music: 'Music & Production',
    infrastructure: 'Infrastructure'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              layoutId={`project-card-${project.id}`}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-neutral-950 border border-white/[0.08]"
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <motion.img
                    layoutId={`project-image-${project.id}`}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

                  {/* Category + Live status overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <motion.span
                      layoutId={`project-category-${project.id}`}
                      className={cn(
                        'px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full',
                        'bg-black/60 backdrop-blur-sm border',
                        project.category === 'webapp' && 'text-blue-300 border-blue-500/40',
                        project.category === 'music' && 'text-purple-300 border-purple-500/40',
                        project.category === 'infrastructure' && 'text-emerald-300 border-emerald-500/40',
                      )}
                    >
                      {categoryLabels[project.category]}
                    </motion.span>

                    {project.href && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Live</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title */}
                  <motion.h2
                    layoutId={`project-title-${project.id}`}
                    className="text-2xl md:text-3xl font-serif text-white mb-4 tracking-tight"
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
                        <span
                          key={badge}
                          className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        >
                          {badge}
                        </span>
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        Play Store
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
