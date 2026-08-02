import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-green-700 transition-[width] duration-150 ease-out dark:bg-green-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
