import { motion } from 'framer-motion'
import { techStack, languages, achievements } from '../../data/resume'
import { CSSMarquee } from '../ui/Marquee'

export function About() {
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
        <span className="text-label text-amber">Introduction</span>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-noir-50 mt-1">
          About Me
        </h2>
      </header>

      {/* Bio */}
      <div className="space-y-4 text-noir-400 leading-relaxed mb-10 font-sans text-sm">
        <p>
          At 7, I accidentally installed malware trying to download Minecraft. That "learning experience"
          sparked an obsession with understanding how computers work—and how they break.
        </p>
        <p>
          Today I work as a <strong className="text-amber font-medium">Cyber Defense Engineer at Migros</strong>,
          protecting Switzerland's largest retailer. Alongside, I study CS at FHNW and co-founded{' '}
          <strong className="text-rose-light font-medium">Soothe Records</strong>—a lofi label with{' '}
          <strong className="text-amber font-medium">100M+ streams</strong> on Spotify.
        </p>
        <p>
          I also coach table tennis, build AI tools, and create chill music for millions worldwide.
        </p>
      </div>

      {/* Tech Stack Marquee */}
      <section className="mb-8 -mx-6 md:-mx-8">
        <div className="px-6 md:px-8 mb-3 flex items-center justify-between">
          <h3 className="text-sm font-mono text-noir-500 uppercase tracking-wider">Tech Stack</h3>
        </div>
        <div className="border-y border-noir-800 py-3 bg-noir-800/20">
          <CSSMarquee speed={35}>
            <div className="flex gap-3">
              {techStack.map((tag, i) => (
                <TechBadge key={i} name={tag.name} category={tag.category} />
              ))}
            </div>
          </CSSMarquee>
        </div>
      </section>

      {/* Languages */}
      <section className="mb-8">
        <h3 className="text-sm font-mono text-noir-500 uppercase tracking-wider mb-4">Languages</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {languages.map((lang, i) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-noir-800/30 border border-noir-700/50 rounded-soft p-3 text-center"
            >
              <span className="block font-sans font-medium text-noir-200 text-sm">{lang.name}</span>
              <span className="block text-[10px] text-noir-500 mt-0.5">{lang.level}</span>
              <div className="flex gap-1 justify-center mt-2">
                {[1, 2, 3].map(n => (
                  <div
                    key={n}
                    className={`w-4 h-1 rounded-full ${n <= lang.proficiency ? 'bg-amber' : 'bg-noir-700'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h3 className="text-sm font-mono text-noir-500 uppercase tracking-wider mb-4">Achievements</h3>
        <div className="flex flex-wrap gap-2">
          {achievements.map((achievement, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-noir-800/30 border border-noir-700/50 rounded-soft text-sm text-noir-300"
            >
              <ion-icon name={achievement.icon} class="text-amber text-sm"></ion-icon>
              {achievement.text}
            </motion.span>
          ))}
        </div>
      </section>
    </motion.article>
  )
}

const categoryColors: Record<string, string> = {
  frontend: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
  backend: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  database: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
  devops: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  security: 'bg-red-500/10 border-red-500/20 text-red-400',
  cloud: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
  tools: 'bg-noir-700/50 border-noir-600/50 text-noir-400',
  music: 'bg-rose-500/10 border-rose-500/20 text-rose-400'
}

function TechBadge({ name, category }: { name: string; category: string }) {
  const colors = categoryColors[category] || categoryColors.tools
  return (
    <span className={`px-3 py-1.5 border rounded-soft text-xs font-mono whitespace-nowrap ${colors}`}>
      {name}
    </span>
  )
}
