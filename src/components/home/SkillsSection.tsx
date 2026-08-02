import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { SKILL_CATEGORIES } from "@/constants/profile";

export function SkillsSection() {
  return (
    <Section id='skills' className='scroll-mt-16'>
      <Container>
        <SectionHeading
          title='Skills'
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
                d='M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
              />
            </svg>
          }
        />

        <div className='grid gap-6'>
          {SKILL_CATEGORIES.map((category) => (
            <article
              key={category.title}
              className='rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-md dark:border-line-dark dark:bg-card-dark'
            >
              <h3 className='text-lg font-semibold text-heading'>{category.title}</h3>
              <p className='mt-1 text-sm text-ink-soft dark:text-ink-dark-soft'>{category.description}</p>
              <ul className='mt-4 flex flex-wrap gap-2'>
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className='rounded-full border border-line bg-canvas px-3 py-1.5 sm:text-sm text-xs font-medium text-ink dark:border-line-dark dark:bg-canvas-dark dark:text-ink-dark'
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
