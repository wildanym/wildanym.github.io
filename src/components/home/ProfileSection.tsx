import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PROFILE, SOCIAL_LINKS } from "@/constants/profile";
import { useTheme } from "@/hooks/useTheme";

const SOCIAL_ICONS: Record<string, ReactNode> = {
  GitHub: (
    <path d='M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z' />
  ),
  LinkedIn: (
    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
  ),
  Email: (
    <path d='M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67ZM22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z' />
  ),
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
    <Section id='profile' className='scroll-mt-16 pt-14 sm:pt-12 sm:px-0 px-4'>
      <Container className='grid items-center gap-10 md:grid-cols-[auto_230px]'>
        <div>
          <div className='flex items-center gap-4 md:hidden'>
            <Photo src={photoSrc} className='size-20 rounded-[1.2rem] object-cover' />
            <div>
              <h2 className='text-2xl font-bold tracking-tight text-heading'>{PROFILE.name}</h2>
              <p className='mt-1 text-sm font-medium text-brand-600 dark:text-brand-400'>{PROFILE.role}</p>
              {PROFILE.isOpenToWork ? (
                <span className='mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-500'>
                  <span className='size-1.5 rounded-full bg-green-500' aria-hidden='true' />
                  {PROFILE.availability}
                </span>
              ) : null}
            </div>
          </div>

          <div className='hidden md:block'>
            {PROFILE.isOpenToWork ? (
              <span className='inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-500'>
                <span className='size-2 rounded-full bg-green-500' aria-hidden='true' />
                {PROFILE.availability}
              </span>
            ) : null}

            <h1 className='mt-4 text-4xl font-bold tracking-tight text-heading sm:text-5xl'>{PROFILE.name}</h1>
            <p className='mt-2 text-lg font-medium text-brand-600 dark:text-brand-400'>{PROFILE.role}</p>
          </div>

          <p className='mt-4 max-w-xl text-xs leading-relaxed text-ink sm:text-lg dark:text-ink-dark-soft'>
            {PROFILE.bio}
          </p>
          <p className='mt-3 text-sm font-bold text-green-700 sm:text-xl dark:text-green-500'>{PROFILE.tagline}</p>
          <div className='mt-8 flex items-center gap-2'>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                aria-label={link.label}
                className='inline-flex size-10 items-center justify-center rounded-lg border border-line bg-card text-ink transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-line-dark dark:bg-card-dark dark:text-ink-dark dark:hover:border-brand-700 dark:hover:text-brand-400'
              >
                <svg className='size-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  {SOCIAL_ICONS[link.label] ?? SOCIAL_ICONS.GitHub}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className='hidden justify-end md:flex'>
          <Photo src={photoSrc} className='size-48 rounded-[1.4rem] object-cover sm:size-56' />
        </div>
      </Container>
    </Section>
  );
}
