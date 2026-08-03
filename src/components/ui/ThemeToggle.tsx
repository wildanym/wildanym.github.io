import { useState, type MouseEvent } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

const ICON_BASE = 'absolute inset-0 size-5 transition-all duration-300 motion-reduce:transition-none'

interface GlowState {
  key: number
  kind: 'sun' | 'moon'
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [glow, setGlow] = useState<GlowState | null>(null)
  const isDark = theme === 'dark'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const targetIsDark = theme !== 'dark'
    toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2)
    setGlow((current) => ({ key: (current?.key ?? 0) + 1, kind: targetIsDark ? 'moon' : 'sun' }))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={isDark ? 'Mode terang' : 'Mode gelap'}
      className="relative inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-canvas-hover hover:text-heading dark:text-ink-dark dark:hover:bg-card-dark dark:hover:text-heading"
    >
      {glow ? (
        <span
          key={glow.key}
          aria-hidden="true"
          className={cn(
            'icon-glow pointer-events-none absolute inset-0 m-auto rounded-full',
            glow.kind === 'moon' ? 'moon-glow size-7' : 'sun-glow size-8',
          )}
        />
      ) : null}
      <span className="relative block size-5 overflow-hidden">
        <Sun
          aria-hidden="true"
          className={cn(
            ICON_BASE,
            isDark ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
            glow?.kind === 'sun' && 'sun-icon-burst',
          )}
        />
        <Moon
          aria-hidden="true"
          className={cn(
            ICON_BASE,
            isDark ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
          )}
        />
      </span>
    </button>
  )
}