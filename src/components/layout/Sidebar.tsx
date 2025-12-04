import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { stats } from '../../data/resume'

interface SidebarProps {
  onAvatarClick: () => void
}

const socials = [
  { icon: 'logo-linkedin', url: 'https://linkedin.com/in/doruk-ozturk', label: 'LinkedIn' },
  { icon: 'logo-github', url: 'https://github.com/peaktwilight', label: 'GitHub' },
  { icon: 'musical-notes-outline', url: 'https://open.spotify.com/artist/25qDYhjZHVzZS6sOVzAVAx', label: 'Spotify' }
]

export function Sidebar({ onAvatarClick }: SidebarProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className="w-full lg:w-[320px] lg:sticky lg:top-8 lg:self-start">
      <div className="bg-noir-900 border border-noir-800 rounded-card overflow-hidden shadow-elevated">
        {/* Hero Section */}
        <div className="p-6 pb-0">
          {/* Avatar */}
          <motion.figure
            className="w-20 h-20 rounded-full overflow-hidden bg-noir-800 cursor-pointer mb-4 ring-2 ring-amber/20 ring-offset-2 ring-offset-noir-900 mx-auto lg:mx-0"
            onClick={onAvatarClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/assets/images/doruk_color_portrait_square.png"
              alt="Doruk Tan Öztürk"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.figure>

          {/* Name & Title */}
          <div className="text-center lg:text-left mb-4">
            <h1
              className="font-serif text-xl font-semibold text-noir-50 cursor-pointer hover:text-amber transition-colors mb-1"
              onClick={onAvatarClick}
            >
              Doruk Tan Öztürk
            </h1>
            <p className="text-sm text-noir-400">
              Cyber Defense Engineer
            </p>
          </div>

          {/* Quick Stats - Always visible */}
          <div className="flex gap-2 mb-4 justify-center lg:justify-start">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex-1 max-w-[90px] bg-noir-800/50 border border-noir-700/50 rounded-soft px-3 py-2 text-center"
              >
                <div className="text-base font-serif font-semibold text-amber">{stat.value}</div>
                <div className="text-[9px] text-noir-500 uppercase tracking-wider font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Section - Mobile toggle */}
        <div className="lg:hidden border-t border-noir-800">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-6 py-3 text-sm text-noir-400 hover:text-noir-200 transition-colors"
          >
            <span>{expanded ? 'Less' : 'More info'}</span>
            <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
              <ion-icon name="chevron-down"></ion-icon>
            </motion.span>
          </button>
        </div>

        {/* Details Section */}
        <AnimatePresence>
          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            className="overflow-hidden lg:!h-auto lg:!opacity-100"
          >
            <div className="p-6 pt-0 lg:pt-4 border-t border-noir-800 lg:border-t-0">
              {/* Role */}
              <div className="mb-4 p-3 bg-noir-800/30 border border-noir-700/50 rounded-soft">
                <p className="text-[10px] text-noir-500 uppercase tracking-wider font-mono mb-1">Current</p>
                <p className="text-sm text-noir-200">Security @ Migros (MGB)</p>
                <p className="text-xs text-noir-500 mt-0.5">Switzerland's largest retailer</p>
              </div>

              {/* Soothe Badge */}
              <motion.a
                href="https://sootherecords.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4 p-3 bg-amber/5 border border-amber/20 rounded-soft hover:bg-amber/10 transition-colors group"
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber rounded-full animate-pulse-soft" />
                  <span className="text-sm text-amber font-medium">Co-founder @ Soothe Records</span>
                </div>
                <p className="text-xs text-noir-500 mt-1 pl-4">100M+ streams on Spotify</p>
              </motion.a>

              {/* Social Links */}
              <div className="flex gap-2">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex-1 aspect-square max-w-[44px] flex items-center justify-center bg-noir-800 border border-noir-700 hover:border-amber hover:bg-amber/10 rounded-soft text-noir-400 hover:text-amber transition-all text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ion-icon name={social.icon}></ion-icon>
                  </motion.a>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center gap-2 text-xs text-sage-light">
                <span className="w-2 h-2 bg-sage rounded-full animate-pulse-soft" />
                <span>Open to opportunities</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  )
}
