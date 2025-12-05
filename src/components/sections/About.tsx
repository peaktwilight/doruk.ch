import { motion } from 'framer-motion'

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
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
    </section>
  )
}
