import { createContext } from 'react'
import type { Theme } from '@/types'

export interface ThemeContextValue {
  theme: Theme
  toggleTheme: (originX?: number, originY?: number) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
)
