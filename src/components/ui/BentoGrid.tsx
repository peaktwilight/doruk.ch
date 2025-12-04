import { cn } from '../../lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({ children, className, colSpan = 1, rowSpan = 1 }: BentoCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-900/70',
        colSpan === 2 && 'md:col-span-2',
        colSpan === 3 && 'lg:col-span-3',
        rowSpan === 2 && 'row-span-2',
        className
      )}
    >
      {children}
    </div>
  )
}
