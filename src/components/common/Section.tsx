import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-8 sm:py-12', className)}>
      {children}
    </section>
  )
}
