import { Star } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
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
          icon={<Star className='size-5' aria-hidden='true' />}
        />

        <div className='grid gap-6'>
          {SKILL_CATEGORIES.map((category, index) => (
            <Reveal key={category.title} delay={index * 80}>
              <article className='rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-md dark:border-line-dark dark:bg-card-dark'>
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
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
