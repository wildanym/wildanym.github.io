import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PROFILE, SOCIAL_LINKS } from "@/constants/profile";
import { useTheme } from "@/hooks/useTheme";
import { Typewriter } from "@/components/home/Typewriter";
import { LogoWeb } from "../ui/LogoWeb";

const SOCIAL_ICONS: Record<string, ReactNode> = {
  GitHub: (
    <svg className='size-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z' />
    </svg>
  ),
  LinkedIn: (
    <svg className='size-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
    </svg>
  ),
  Instagram: (
    <svg className='size-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
    </svg>
  ),
  Email: <Mail className='size-5' aria-hidden='true' />,
};

function Photo({ src, className }: { src: string; className: string }) {
  return (
    <img
      src={src}
      alt={`Foto profil ${PROFILE.name}`}
      width={200}
      height={200}
      className={`${className} shadow-card`}
    />
  );
}

export function ProfileSection() {
  const { theme } = useTheme();
  const photoSrc = theme === "dark" ? PROFILE.photoDarkUrl : PROFILE.photoUrl;
  return (
    <Section id='profile' className='scroll-mt-16 pt-8 sm:pt-12'>
      <Container className='grid items-center gap-10 md:grid-cols-[auto_230px]'>
        <div id='logo' className='sm:hidden flex justify-end px-4'>
          <LogoWeb className='w-16' />
        </div>
        <div>
          <div className='flex items-center gap-4'>
            <div className='relative shrink-0 md:hidden'>
              <Photo src={photoSrc} className='relative size-20 rounded-[1.2rem] object-cover' />
            </div>
            <div className='min-w-0'>
              {PROFILE.isOpenToWork ? (
                <span className='hidden md:inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-500'>
                  <span className='size-2 rounded-full bg-green-500' aria-hidden='true' />
                  {PROFILE.availability}
                </span>
              ) : null}
              <h1 className='text-2xl font-bold tracking-tight text-heading text-balance sm:text-5xl'>
                {PROFILE.name}
              </h1>
              <p className='mt-1 text-sm font-medium text-brand-600 sm:text-lg dark:text-brand-400'>{PROFILE.role}</p>
              {PROFILE.isOpenToWork ? (
                <span className='mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 md:hidden dark:border-green-800 dark:bg-green-950/50 dark:text-green-500'>
                  <span className='size-1.5 rounded-full bg-green-500' aria-hidden='true' />
                  {PROFILE.availability}
                </span>
              ) : null}
            </div>
          </div>

          <p className='mt-4 max-w-xl text-base leading-relaxed text-ink sm:text-lg dark:text-ink-dark-soft'>
            {PROFILE.bio}
          </p>
          <Typewriter text={PROFILE.tagline} className='text-sm mt-4 text-green-700 sm:text-base dark:text-green-500' />

          <div className='mt-8 flex items-center gap-2'>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                aria-label={link.label}
                className='inline-flex size-10 items-center justify-center rounded-lg border border-line bg-card text-ink transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-line-dark dark:bg-card-dark dark:text-ink-dark dark:hover:border-brand-400 dark:hover:text-brand-400'
              >
                {SOCIAL_ICONS[link.label] ?? SOCIAL_ICONS.GitHub}
              </a>
            ))}
          </div>
        </div>

        <div className='hidden justify-end md:flex'>
          <div className='relative'>
            <span
              aria-hidden='true'
              className='absolute inset-0 translate-x-3 translate-y-3 rounded-[1.4rem] border-2 border-brand-300/40 dark:border-brand-400/20'
            />
            <Photo src={photoSrc} className='relative size-48 rounded-[1.4rem] object-cover sm:size-56' />
          </div>
        </div>
      </Container>
    </Section>
  );
}
