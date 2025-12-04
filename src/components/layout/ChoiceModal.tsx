import { motion } from 'framer-motion'

interface ChoiceModalProps {
  onClose: () => void
  onShowCV: () => void
  lowPerformance: boolean
  setLowPerformance: (value: boolean) => void
}

export function ChoiceModal({
  onClose,
  onShowCV,
  lowPerformance,
  setLowPerformance
}: ChoiceModalProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-noir-950/95 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-noir-900 border border-noir-700 rounded-card p-6 z-50 shadow-dramatic"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-noir-500 hover:text-noir-300 transition-colors"
        >
          <ion-icon name="close-outline" style={{ fontSize: '20px' }}></ion-icon>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-semibold text-noir-50 mb-2">
            Welcome
          </h2>
          <p className="text-sm text-noir-400">
            Security engineer, developer & music producer
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          <motion.button
            onClick={onShowCV}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center gap-3 p-3 bg-amber text-noir-950 rounded-soft font-medium text-sm transition-colors hover:bg-amber-light"
          >
            <ion-icon name="briefcase-outline" class="text-lg"></ion-icon>
            <span>View Portfolio</span>
            <ion-icon name="arrow-forward-outline" class="ml-auto"></ion-icon>
          </motion.button>

          <div className="grid grid-cols-2 gap-2">
            <motion.button
              onClick={() => window.location.href = 'https://pc.doruk.ch'}
              whileHover={{ y: -1 }}
              className="flex flex-col items-center gap-1 p-3 bg-noir-800/50 border border-noir-700/50 hover:border-sage/30 rounded-soft text-noir-400 hover:text-sage-light transition-all"
            >
              <ion-icon name="terminal-outline" class="text-xl"></ion-icon>
              <span className="text-xs">Desktop Sim</span>
            </motion.button>

            <motion.button
              onClick={() => window.location.href = 'https://peaktwilight.com'}
              whileHover={{ y: -1 }}
              className="flex flex-col items-center gap-1 p-3 bg-noir-800/50 border border-noir-700/50 hover:border-rose/30 rounded-soft text-noir-400 hover:text-rose-light transition-all"
            >
              <ion-icon name="musical-notes-outline" class="text-xl"></ion-icon>
              <span className="text-xs">Music</span>
            </motion.button>
          </div>
        </div>

        {/* Performance Toggle */}
        <div className="mt-6 pt-4 border-t border-noir-800 flex items-center justify-between">
          <span className="text-xs text-noir-500">Low performance mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={lowPerformance}
              onChange={(e) => setLowPerformance(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-noir-800 border border-noir-700 rounded-full peer-checked:bg-amber/20 peer-checked:border-amber/50 transition-all relative">
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-200 ${lowPerformance ? 'translate-x-4 bg-amber' : 'bg-noir-500'}`} />
            </div>
          </label>
        </div>

        {/* Hint */}
        <p className="mt-4 text-center text-[10px] text-noir-600">
          Press <kbd className="px-1 py-0.5 bg-noir-800 rounded text-amber font-mono">?</kbd> to return
        </p>
      </motion.div>
    </>
  )
}
