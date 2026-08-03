import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/utils/cn";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTop() {
  const progress = useScrollProgress();
  const isVisible = progress > 8;

  const handleClick = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label='Kembali ke atas'
      className={cn(
        "glass fixed z-50 hidden size-11 rounded-full p-0.5 shadow-lg backdrop-blur-[24px] backdrop-saturate-[160%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all duration-300 motion-reduce:transition-none md:block md:bottom-8 md:right-8",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span className='relative flex size-full items-center justify-center rounded-full bg-card dark:bg-card-dark'>
        <svg className='absolute inset-0 size-full -rotate-90' viewBox='0 0 44 44' aria-hidden='true'>
          <circle
            cx='22'
            cy='22'
            r={RADIUS}
            fill='none'
            strokeWidth='2'
            className='stroke-line dark:stroke-line-dark'
          />
          <circle
            cx='22'
            cy='22'
            r={RADIUS}
            fill='none'
            strokeWidth='2'
            strokeLinecap='round'
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            className='stroke-green-700 transition-[stroke-dashoffset] duration-150 motion-reduce:transition-none dark:stroke-green-500'
          />
        </svg>
        <ArrowUp className='size-5 dark:text-ink-dark-soft text-gray-400' aria-hidden='true' />
      </span>
    </button>
  );
}
