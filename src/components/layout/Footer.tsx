import { Container } from "@/components/common/Container";
import { SITE_CONFIG } from "@/constants";

export function Footer() {
  return (
    <footer className='py-6'>
      <Container className='flex flex-col items-center justify-between gap-2 text-sm text-ink-soft sm:flex-row dark:text-ink-dark-soft'>
        <p>
          © {new Date().getFullYear()} {SITE_CONFIG.name}
        </p>
        <p>{SITE_CONFIG.tagline}</p>
      </Container>
    </footer>
  );
}
