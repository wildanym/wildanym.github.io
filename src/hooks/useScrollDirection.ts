import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 8

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY

      if (Math.abs(delta) > SCROLL_THRESHOLD) {
        setDirection(delta > 0 ? 'down' : 'up')
        lastY = currentY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
