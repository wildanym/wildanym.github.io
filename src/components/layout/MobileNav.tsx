import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { BriefcaseBusiness, GraduationCap, Star, User } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "#profile": User,
  "#experience": BriefcaseBusiness,
  "#skills": Star,
  "#education": GraduationCap,
};

export function MobileNav() {
  const direction = useScrollDirection();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(false);
  const [suppressAfterClick, setSuppressAfterClick] = useState(false);
  const suppressTimer = useRef(0);
  const clickHoldIdle = useRef(false);
  const sectionIds = useMemo(() => SITE_CONFIG.navItems.map((item) => item.to.slice(1)), []);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 8);
      setIsAtTop(scrollTop <= 8);
      if (suppressAfterClick) {
        if (clickHoldIdle.current) {
          clickHoldIdle.current = false;
          setSuppressAfterClick(false);
          return;
        }
        window.clearTimeout(suppressTimer.current);
        suppressTimer.current = window.setTimeout(() => {
          clickHoldIdle.current = true;
        }, 300);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(suppressTimer.current);
    };
  }, [suppressAfterClick]);

  const handleNavClick = () => {
    clickHoldIdle.current = false;
    window.clearTimeout(suppressTimer.current);
    setSuppressAfterClick(true);
  };

  const isVisible = isAtTop || isAtBottom || direction === "up" || suppressAfterClick;

  return (
    <nav
      aria-label='Navigasi utama'
      className='pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 flex justify-center md:hidden'
    >
      <div
        className={cn(
          "w-fit origin-bottom rounded-full border border-line bg-[rgb(255_255_255/0.75)] shadow-[0_2px_8px_rgb(0_0_0/0.08),0_16px_44px_rgb(0_0_0/0.16)] backdrop-blur-[24px] backdrop-saturate-150 transition-[transform,opacity] duration-300 ease-out dark:border-white/10 dark:bg-[rgb(27_31_38/0.6)] motion-reduce:transition-none",
          isVisible ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0",
        )}
      >
        <ul className='relative flex items-center justify-center gap-5 px-2.5 py-2.5'>
          {SITE_CONFIG.navItems.map((item) => {
            const isActive = activeId === item.to.slice(1);
            return (
              <li key={item.to}>
                <a
                  href={item.to}
                  aria-current={isActive ? "location" : undefined}
                  onClick={handleNavClick}
                  className='inline-flex h-11 items-center justify-center rounded-full transition-colors'
                >
                  <span
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-2.5 transition-all duration-300 ease-out motion-reduce:transition-none",
                      isActive
                        ? "w-[116px] bg-brand-500/10 text-heading dark:bg-brand-400/10"
                        : "w-11 text-ink-soft hover:text-heading dark:text-ink-dark-soft dark:hover:text-heading",
                    )}
                  >
                    {(() => {
                      const NavIcon = NAV_ICONS[item.to];
                      return NavIcon ? <NavIcon className='size-[22px] shrink-0' aria-hidden='true' /> : null;
                    })()}
                    <span
                      className={cn(
                        "grid overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none",
                        isActive ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0",
                      )}
                    >
                      <span className='overflow-hidden whitespace-nowrap text-xs font-semibold'>{item.label}</span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
