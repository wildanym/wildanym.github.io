import { useEffect, useState, type ReactNode } from "react";
import { SITE_CONFIG } from "@/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/utils/cn";

const NAV_ICONS: Record<string, ReactNode> = {
  "#profile": (
    <svg className='size-5' fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
      />
    </svg>
  ),
  "#experience": (
    <svg className='size-5' fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
      />
    </svg>
  ),
  "#skills": (
    <svg className='size-5' fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z'
      />
    </svg>
  ),
  "#education": (
    <svg className='size-5' fill='none' viewBox='0 0 24 24' strokeWidth={1.8} stroke='currentColor' aria-hidden='true'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
      />
    </svg>
  ),
};

export function MobileNav() {
  const direction = useScrollDirection();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 8);
      setIsAtTop(scrollTop <= 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = isAtTop || isAtBottom || direction === "up";

  return (
    <nav
      aria-label='Navigasi utama'
      className={cn(
        "glass fixed inset-x-0 bottom-0 z-50 border-t border-white/25 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgb(0_0_0/0.06)] transition-transform duration-300 md:hidden dark:border-white/10 pt-1",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <ul className='relative flex items-stretch'>
        {SITE_CONFIG.navItems.map((item) => (
          <li key={item.to} className='flex-1'>
            <a
              href={item.to}
              className='flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-ink-soft transition-colors hover:text-heading dark:text-ink-dark-soft dark:hover:text-heading'
            >
              {NAV_ICONS[item.to]}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
