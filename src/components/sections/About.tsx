import { motion } from 'framer-motion'

const techStack = {
  row1: ['React', 'Python', 'PostgreSQL', 'Docker', 'SIEM', 'TypeScript', 'FastAPI', 'MongoDB', 'Kubernetes', 'EDR', 'Next.js', 'Node.js', 'MySQL', 'Prometheus', 'SOAR'],
  row2: ['AWS', 'Git', 'Tailwind', 'Java', 'Grafana', 'Swimlane', 'Vercel', 'Linux', 'CSS3', 'PHP', 'Nginx', 'Incident Response', 'Firebase', 'Bash', 'HTML5'],
  row3: ['Logic Pro', 'Ableton Live', 'Traefik', 'Loki', 'Redis', 'Spotify API', 'Audio Engineering', 'Mixing', 'Watchtower', 'Uptime Kuma', 'Firestore', 'REST APIs', 'Mastering'],
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">Origin Story</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
            How It Started
          </h2>
        </motion.div>

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-6 mb-20"
        >
          <p className="text-neutral-300 text-lg md:text-xl leading-relaxed text-center">
            When I was 7 years old, I tried downloading Minecraft beta on my dad's computer and
            accidentally installed malware instead. That epic fail sparked an obsession with
            figuring out how computers work <span className="text-neutral-500">(and how they break)</span>.
          </p>

          <p className="text-neutral-400 leading-relaxed text-center max-w-2xl mx-auto">
            Fast forward to today: I study CS at FHNW and work as a Cyber Defense Engineer at MGB,
            protecting Switzerland's largest retail company. That "learning experience" sent me down
            a rabbit hole through web development, digital marketing, and eventually cybersecurity.
          </p>

          <p className="text-neutral-400 leading-relaxed text-center max-w-2xl mx-auto">
            Along the way, I discovered my love for producing lofi beats and co-founded
            <span className="text-amber-400"> Soothe Records</span> — a music label that's now
            achieved over <span className="text-white font-medium">100M+ streams</span> on Spotify.
          </p>

          <p className="text-neutral-500 leading-relaxed text-center max-w-2xl mx-auto">
            In the evenings, I coach table tennis at Switzerland's largest academic club,
            build AI tools that actually solve real problems <span className="text-neutral-600">(okay, most of the time :P)</span>,
            and create chill music for millions of people worldwide.
          </p>
        </motion.div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-700 font-mono">
            "It Works on My Machine"
          </span>
        </motion.div>

        {/* Row 1 - Forward */}
        <div
          className="flex animate-marquee-forward mb-3"
          style={{ '--duration': '40s' } as React.CSSProperties}
        >
          {[...techStack.row1, ...techStack.row1].map((tech, i) => (
            <span
              key={i}
              className="mx-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap hover:text-neutral-300 hover:border-white/[0.12] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 2 - Reverse */}
        <div
          className="flex animate-marquee-reverse mb-3"
          style={{ '--duration': '45s' } as React.CSSProperties}
        >
          {[...techStack.row2, ...techStack.row2].map((tech, i) => (
            <span
              key={i}
              className="mx-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap hover:text-neutral-300 hover:border-white/[0.12] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 3 - Forward slower */}
        <div
          className="flex animate-marquee-forward"
          style={{ '--duration': '50s' } as React.CSSProperties}
        >
          {[...techStack.row3, ...techStack.row3].map((tech, i) => (
            <span
              key={i}
              className="mx-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.03] border border-white/[0.06] text-neutral-500 whitespace-nowrap hover:text-neutral-300 hover:border-white/[0.12] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
