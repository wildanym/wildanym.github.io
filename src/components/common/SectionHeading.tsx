import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accent?: "blue" | "green";
  className?: string;
}

const accentClasses: Record<NonNullable<SectionHeadingProps["accent"]>, string> = {
  blue: "bg-brand-50 text-brand-600 dark:bg-brand-900/50 dark:text-brand-400",
  green: "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-500",
};

export function SectionHeading({ id, title, subtitle, icon, accent = "blue", className }: SectionHeadingProps) {
  return (
    <header id={id} className={cn("mb-8 sm:mb-12", className)}>
      <div className='flex items-center gap-3'>
        {icon ? (
          <span
            className={cn(
              "inline-flex sm:size-10 size-8 items-center justify-center rounded-xl",
              accentClasses[accent],
            )}
          >
            {icon}
          </span>
        ) : null}
        <h2 className='text-balance text-xl font-bold tracking-tight text-heading sm:text-3xl'>{title}</h2>
      </div>
      {subtitle ? <p className='mt-3 max-w-2xl text-base text-ink dark:text-ink-dark-soft'>{subtitle}</p> : null}
    </header>
  );
}
