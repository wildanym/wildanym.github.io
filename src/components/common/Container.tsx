import type { ElementType, ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full max-w-5xl px-4 sm:px-6', className)}>
      {children}
    </Component>
  )
}
