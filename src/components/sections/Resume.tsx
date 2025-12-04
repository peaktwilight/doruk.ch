import { motion } from 'framer-motion'
import { education, experience, type TimelineItem } from '../../data/resume'

export function Resume() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-noir-900 border border-noir-800 rounded-card p-6 md:p-8 shadow-elevated"
    >
      {/* Header */}
      <header className="mb-8">
        <span className="text-label text-amber">Career Path</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-noir-50 mt-1">
          Resume
        </h2>
      </header>

      {/* Experience */}
      <section className="mb-10">
        <h3 className="text-sm font-mono text-noir-500 uppercase tracking-wider mb-4">
          Experience
        </h3>
        <div className="space-y-4">
          {experience.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} accent="amber" />
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-sm font-mono text-noir-500 uppercase tracking-wider mb-4">
          Education
        </h3>
        <div className="space-y-4">
          {education.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} accent="sage" />
          ))}
        </div>
      </section>
    </motion.article>
  )
}

function TimelineCard({
  item,
  index,
  accent
}: {
  item: TimelineItem
  index: number
  accent: 'amber' | 'sage'
}) {
  const accentColor = accent === 'amber' ? 'border-amber' : 'border-sage'
  const accentBg = accent === 'amber' ? 'bg-amber/10 text-amber' : 'bg-sage/10 text-sage-light'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative pl-4 border-l-2 ${accentColor} group`}
    >
      <div className="bg-noir-800/30 hover:bg-noir-800/50 border border-noir-800/50 hover:border-noir-700/50 rounded-soft p-4 transition-all">
        {/* Period Badge */}
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono mb-2 ${accentBg}`}>
          {item.period}
        </span>

        {/* Title & Organization */}
        <h4 className="font-sans font-semibold text-noir-100 text-sm mb-0.5">
          {item.title}
        </h4>
        <p className="text-xs text-noir-500 mb-2">{item.organization}</p>

        {/* Description or Items */}
        {item.description && (
          <p className="text-sm text-noir-400 leading-relaxed">
            {item.description}
          </p>
        )}

        {item.items && (
          <ul className="space-y-1 mt-2">
            {item.items.map((point, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-noir-400">
                <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${accent === 'amber' ? 'bg-amber' : 'bg-sage'}`} />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  )
}
