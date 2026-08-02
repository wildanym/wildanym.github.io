import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function Typewriter({ text, className, speed = 45, startDelay = 400 }: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setCount(text.length);
      return;
    }

    setCount(0);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={cn("block font-mono", className)}>
      <span aria-hidden='true' className='select-none text-green-700 dark:text-green-500'>
        &gt;&nbsp;
      </span>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>{text.slice(0, count)}</span>
      <span aria-hidden='true' className='terminal-cursor' />
    </span>
  );
}
