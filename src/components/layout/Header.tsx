import { Link } from "react-router";
import { Container } from "@/components/common/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogoWeb } from "@/components/ui/LogoWeb";
import { SITE_CONFIG } from "@/constants";

export function Header() {
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

        <nav className='hidden items-center gap-1 md:flex' aria-label='Navigasi utama'>
          {SITE_CONFIG.navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className='rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-heading dark:text-ink-dark dark:hover:text-heading'
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
