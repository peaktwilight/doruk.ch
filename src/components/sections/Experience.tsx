import { useState } from 'react'
import { motion } from 'framer-motion'
import { education, experience } from '../../data/resume'
import { cn } from '../../lib/utils'

function TimelineCard({ item, index }: { item: typeof experience[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="relative pl-6 pb-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-1.5 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-neutral-800 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-500" />

      {/* Content */}
      <div className="group">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
          <h4 className="text-sm font-medium text-white group-hover:text-amber-300 transition-colors">
            {item.title}
          </h4>
          {item.type && (
            <span className="text-[9px] uppercase tracking-wider text-neutral-600 bg-neutral-800/50 px-1.5 py-0.5 rounded">
              {item.type}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-amber-500/80">{item.organization}</span>
          <span className="text-neutral-700">·</span>
          <span className="text-[10px] font-mono text-neutral-600">{item.period}</span>
        </div>

        {item.description && (
          <p className="text-xs text-neutral-500 leading-relaxed">{item.description}</p>
        )}

        {item.items && (
          <ul className="space-y-1 mt-2">
            {item.items.slice(0, 3).map((bullet, i) => (
              <li key={i} className="text-xs text-neutral-500 flex items-start gap-2 leading-relaxed">
                <span className="text-amber-500/50 mt-1 text-[6px]">●</span>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}

export function Experience() {
  const [showAllExp, setShowAllExp] = useState(false)
  const displayedExperience = showAllExp ? experience : experience.slice(0, 4)

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Background</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
            Where I've Been
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">Experience</span>
              <span className="flex-1 h-px bg-neutral-800" />
              <span className="text-[10px] text-neutral-600">{experience.length} roles</span>
            </motion.div>

            {displayedExperience.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}

            {experience.length > 4 && (
              <button
                onClick={() => setShowAllExp(!showAllExp)}
                className="mt-4 text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-2"
              >
                <span className="h-px w-8 bg-neutral-700" />
                {showAllExp ? 'Show less' : `Show ${experience.length - 4} more`}
                <motion.svg
                  animate={{ rotate: showAllExp ? 180 : 0 }}
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
            )}
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-500">Education</span>
              <span className="flex-1 h-px bg-neutral-800" />
            </motion.div>

            {education.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
