import { cn } from '@/utils/cn'

interface PageTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function PageTitle({ title, subtitle, className }: PageTitleProps) {
  return (
    <header className={cn('mb-8 sm:mb-12', className)}>
      <h1 className="text-balance text-3xl font-bold tracking-tight text-heading sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base text-ink sm:text-lg dark:text-ink-dark-soft">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
