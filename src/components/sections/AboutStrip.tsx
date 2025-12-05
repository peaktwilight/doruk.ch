import { motion } from 'framer-motion'

const greetings = [
  { word: 'Hello', lang: 'English', level: 'Native', native: true },
  { word: 'Bonjour', lang: 'French', level: 'Native', native: true },
  { word: 'Merhaba', lang: 'Turkish', level: 'Native', native: true },
  { word: 'Hallo', lang: 'German', level: 'C1', native: false },
  { word: 'Grüezi', lang: 'Swiss German', level: 'B2', native: false },
]

const achievements = {
  featured: {
    title: '2nd Place',
    subtitle: 'FHNW Swiss Startup Awards',
    description: 'TTStats - Swiss Table Tennis App'
  },
  credentials: [
    'Swimlane SOAR Certified',
    'Open Source Contributor',
    'Math Olympiad Semi-Finalist',
    'Piano Mention Excellence'
  ]
}

export function AboutStrip() {
  return (
    <section id="languages" className="py-24 md:py-32 overflow-hidden">
      {/* Section header - matching other sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-600">5 Languages</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mt-3">
          How I Say Hello
        </h2>
      </motion.div>

      {/* Languages - Infinite Marquee */}
      <div className="relative mb-16">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div
          className="flex animate-marquee-forward"
          style={{ '--duration': '35s' } as React.CSSProperties}
        >
          {/* Double the items for seamless loop */}
          {[...greetings, ...greetings].map((item, i) => (
            <div
              key={i}
              className="flex items-baseline gap-3 mx-8 md:mx-12 shrink-0"
            >
              <span className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white/90">
                {item.word}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest">
                  {item.lang}
                </span>
                <span className={`text-[8px] md:text-[9px] uppercase tracking-wider ${item.native ? 'text-amber-500/70' : 'text-neutral-600'}`}>
                  {item.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements - Featured + Credentials */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          {/* Featured Achievement */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <ion-icon name="trophy" class="text-amber-500 text-xs" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-amber-500/70">Featured</span>
            </div>
            <div className="font-serif text-4xl md:text-5xl text-white mb-1">
              {achievements.featured.title}
            </div>
            <div className="text-sm text-neutral-400 mb-0.5">
              {achievements.featured.subtitle}
            </div>
            <div className="text-xs text-neutral-600">
              {achievements.featured.description}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-24 bg-neutral-800" />
          <div className="md:hidden w-16 h-px bg-neutral-800" />

          {/* Other Credentials */}
          <div className="flex flex-col gap-2">
            {achievements.credentials.map((cred, i) => (
              <motion.div
                key={cred}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                {cred}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
