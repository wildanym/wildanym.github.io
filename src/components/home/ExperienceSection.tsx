import { useState } from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { EXPERIENCES } from "@/constants/profile";
import type { ProjectShowcase } from "@/types";

export function ExperienceSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);
  return (
    <Section id='experience' className='scroll-mt-16'>
      <Container>
        <SectionHeading
          title='Experience'
          subtitle=''
          accent='green'
          icon={
            <svg
              className='size-5'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.8}
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
              />
            </svg>
          }
        />

        <ol className='relative border-l-2 border-line pl-6 dark:border-line-dark'>
          {EXPERIENCES.map((experience) => (
            <li key={`${experience.company}-${experience.period}`} className='relative pb-10 last:pb-0'>
              <span
                className='absolute left-[-1.95rem] size-3 rounded-full border-2 border-green-500 bg-card dark:bg-card-dark'
                aria-hidden='true'
              />
              <article className='rounded-2xl border border-line bg-card p-5 shadow-card transition-shadow hover:shadow-md sm:p-6 dark:border-line-dark dark:bg-card-dark'>
                <div className='flex flex-wrap sm:flex-row flex-col items-baseline justify-between gap-2'>
                  <h3 className='text-lg font-semibold text-heading'>{experience.role}</h3>
                  <span className='sm:text-sm text-xs font-medium text-ink-soft dark:text-ink-dark-soft'>
                    {experience.period}
                  </span>
                </div>
                <p className='mt-1 text-sm font-medium text-green-700 dark:text-green-500'>{experience.company}</p>
                {experience.description ? (
                  <p className='mt-3 text-sm leading-relaxed text-ink dark:text-ink-dark'>{experience.description}</p>
                ) : null}
                <ul className='mt-3 space-y-1.5'>
                  {experience.achievements.map((achievement) =>
                    typeof achievement === "object" ? (
                      <li
                        key={achievement.subtitle}
                        className='pt-1 text-sm font-semibold text-ink dark:text-ink-dark'
                      >
                        {achievement.subtitle}
                      </li>
                    ) : (
                      <li key={achievement} className='flex gap-2 text-sm text-ink dark:text-ink-dark-soft'>
                        <span className='mt-2 size-1.5 shrink-0 rounded-full bg-green-500' aria-hidden='true' />
                        {achievement}
                      </li>
                    ),
                  )}
                </ul>
                {experience.projects?.length ? (
                  <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3'>
                    {experience.projects.map((project) => (
                      <button
                        key={project.title}
                        type='button'
                        onClick={() => setSelectedProject(project)}
                        className='group text-left'
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading='lazy'
                          decoding='async'
                          className='aspect-video w-full rounded-lg border border-line object-cover transition-transform duration-200 group-hover:scale-[1.02] group-hover:border-brand-300 dark:border-line-dark dark:group-hover:border-brand-400'
                        />
                        <span className='mt-1.5 line-clamp-1 block text-xs font-medium text-ink-soft group-hover:text-heading dark:text-ink-dark-soft dark:group-hover:text-heading'>
                          {project.title}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </Container>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
