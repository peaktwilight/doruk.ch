import { motion } from 'framer-motion'

type Page = 'about' | 'resume' | 'portfolio'

interface NavbarProps {
  activePage: Page
  setActivePage: (page: Page) => void
}

const pages: { key: Page; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'resume', label: 'Resume' },
  { key: 'portfolio', label: 'Portfolio' }
]

export function Navbar({ activePage, setActivePage }: NavbarProps) {
  return (
    <nav className="bg-noir-900 border border-noir-800 rounded-card p-1">
      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => setActivePage(page.key)}
            className={`
              flex-1 relative py-2.5 px-4 rounded-soft text-sm font-sans font-medium transition-colors
              ${activePage === page.key
                ? 'text-noir-950'
                : 'text-noir-400 hover:text-noir-200'
              }
            `}
          >
            {activePage === page.key && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-amber rounded-soft"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{page.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
