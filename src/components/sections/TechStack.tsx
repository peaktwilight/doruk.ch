import { motion } from 'framer-motion'
import { Marquee } from '../ui/Marquee'

const categories = [
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    name: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js', 'Java', 'Kotlin']
  },
  {
    name: 'Infrastructure',
    items: ['Docker', 'Kubernetes', 'Traefik', 'Grafana', 'Prometheus']
  },
  {
    name: 'Security',
    items: ['SIEM', 'SOAR', 'EDR', 'Threat Intel', 'OSINT']
  },
  {
    name: 'Cloud & Data',
    items: ['AWS', 'Firebase', 'PostgreSQL', 'MongoDB', 'Redis']
  }
]

// Flatten for marquee
const allTech = categories.flatMap(c => c.items)

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02] text-sm text-neutral-400 whitespace-nowrap transition-colors hover:border-amber-500/30 hover:text-neutral-200">
      {name}
    </span>
  )
}

export function TechStack() {
  return (
    <section className="py-16 overflow-hidden border-y border-white/[0.03]">
      <div className="container mx-auto px-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">Tech Stack</span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>
      </div>

      {/* Marquee container with fading edges */}
      <div className="relative">
        <div className="space-y-3">
          <Marquee pauseOnHover className="[--duration:50s]">
            {allTech.slice(0, 13).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </Marquee>

          <Marquee pauseOnHover reverse className="[--duration:45s]">
            {allTech.slice(13).concat(allTech.slice(0, 8)).map((tech, i) => (
              <TechBadge key={`${tech}-${i}`} name={tech} />
            ))}
          </Marquee>
        </div>

        {/* Fade out gradients on left and right */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10"
          style={{
            background: 'linear-gradient(to right, rgb(10, 10, 10), transparent)'
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10"
          style={{
            background: 'linear-gradient(to left, rgb(10, 10, 10), transparent)'
          }}
        />
      </div>
    </section>
  )
}
