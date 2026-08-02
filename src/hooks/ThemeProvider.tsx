import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { STORAGE_KEYS } from '@/constants'
import { ThemeContext } from '@/hooks/theme-context'
import type { Theme } from '@/types'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEYS.theme)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEYS.theme, theme)
  }, [theme])

  const applyTheme = useCallback((next: Theme) => {
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(
    (originX?: number, originY?: number) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const startViewTransition = document.startViewTransition?.bind(document)
      const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

      if (!startViewTransition || prefersReducedMotion || originX === undefined || originY === undefined) {
        applyTheme(next)
        return
      }

      const radius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY),
      )

      const root = document.documentElement
      root.style.setProperty('--theme-origin-x', `${originX}px`)
      root.style.setProperty('--theme-origin-y', `${originY}px`)
      root.style.setProperty('--theme-origin-r', `${radius}px`)

      startViewTransition(() => applyTheme(next))
    },
    [theme, applyTheme],
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
