import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoWeb } from "@/components/ui/LogoWeb";
import { SITE_CONFIG } from "@/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/utils/cn";

export function Header() {
  const sectionIds = useMemo(() => SITE_CONFIG.navItems.map((item) => item.to.slice(1)), []);
  const activeId = useScrollSpy(sectionIds);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const indicator = indicatorRef.current;
      const nav = navRef.current;
      if (!indicator || !nav) return;
      const target = nav.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
      if (!target) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.left = `${target.offsetLeft + 8}px`;
      indicator.style.width = `${target.offsetWidth - 16}px`;
      indicator.style.opacity = "1";
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [activeId]);

  return (
    <header className='glass sticky top-0 z-50 hidden border-b border-white/25 shadow-sm backdrop-blur-[24px] backdrop-saturate-[160%] md:block dark:border-white/10'>
      <Container className='relative flex h-16 items-center justify-between gap-4'>
        <Link
          to='/'
          aria-label={SITE_CONFIG.name}
          className='inline-flex items-center transition-opacity hover:opacity-90'
        >
          <LogoWeb className='w-16' />
          <span className='sr-only'>{SITE_CONFIG.name}</span>
        </Link>

        <nav
          ref={navRef}
          className='relative hidden items-center gap-1 md:flex'
          aria-label='Navigasi utama'
        >
          <span
            ref={indicatorRef}
            aria-hidden='true'
            className='pointer-events-none absolute bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-green-600 opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none dark:bg-green-500'
          />
          {SITE_CONFIG.navItems.map((item) => {
            const isActive = activeId === item.to.slice(1);
            return (
              <a
                key={item.to}
                href={item.to}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-heading"
                    : "text-ink hover:text-heading dark:text-ink-dark dark:hover:text-heading",
                )}
              >
                {item.label}
              </a>
            );
          })}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
