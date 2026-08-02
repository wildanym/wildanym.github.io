import type { MouseEvent } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/utils/cn'

const ICON_BASE =
  'absolute inset-0 size-5 transition-all duration-300 motion-reduce:transition-none'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    toggleTheme(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
      title={isDark ? 'Mode terang' : 'Mode gelap'}
      className="inline-flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-canvas-hover hover:text-heading dark:text-ink-dark dark:hover:bg-card-dark dark:hover:text-heading"
    >
      <span className="relative block size-5 overflow-hidden">
        <svg
          className={cn(
            ICON_BASE,
            isDark ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100',
          )}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M11 0v3h2V0h-2zM4.2226562 2.8085938L2.8085938 4.2226562L4.9296875 6.34375L6.34375 4.9296875L4.2226562 2.8085938zM19.777344 2.8085938L17.65625 4.9296875L19.070312 6.34375L21.191406 4.2226562L19.777344 2.8085938zM12 5C8.1458514 5 5 8.1458514 5 12C5 15.854149 8.1458514 19 12 19C15.854149 19 19 15.854149 19 12C19 8.1458514 15.854149 5 12 5zM12 7C14.773268 7 17 9.2267316 17 12C17 14.773268 14.773268 17 12 17C9.2267316 17 7 14.773268 7 12C7 9.2267316 9.2267316 7 12 7zM0 11v2h3v-2H0zM21 11v2h3v-2h-3zM4.9296875 17.65625L2.8085938 19.777344L4.2226562 21.191406L6.34375 19.070312L4.9296875 17.65625zM19.070312 17.65625L17.65625 19.070312L19.777344 21.191406L21.191406 19.777344L19.070312 17.65625zM11 21v3h2v-3h-2z" />
        </svg>
        <svg
          className={cn(
            ICON_BASE,
            isDark ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
          )}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  )
}
