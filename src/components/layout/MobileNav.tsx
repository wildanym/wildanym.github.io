import { useEffect, useState, type ComponentType } from "react";
import { BriefcaseBusiness, GraduationCap, Star, User } from "lucide-react";
import { SITE_CONFIG } from "@/constants";
import { useScrollDirection } from "@/hooks/useScrollDirection";
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
              {(() => {
                const NavIcon = NAV_ICONS[item.to];
                return NavIcon ? <NavIcon className='size-5' aria-hidden='true' /> : null;
              })()}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
