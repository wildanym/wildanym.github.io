import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { EXPERIENCES } from "@/constants/profile";
import type { ProjectShowcase } from "@/types";

export function ExperienceSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const timeline = timelineRef.current;
      const line = lineRef.current;
      if (!timeline || !line) return;

      const rect = timeline.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.min(Math.max((viewport * 0.9 - rect.top) / (rect.height + viewport * 0.5), 0), 1);
      line.style.transform = `scaleY(${progress})`;

      const lineBottom = progress * rect.height;
      const dots = timeline.querySelectorAll<HTMLElement>(".timeline-dot");
      dots.forEach((dot) => {
        const passed = lineBottom >= dot.getBoundingClientRect().top - rect.top;
        if (passed !== (dot.dataset.filled === "true")) {
          dot.dataset.filled = String(passed);
          dot.style.borderColor = passed ? "var(--color-green-500)" : "";
        }
      });
    };
    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);
  return (
    <Section id='experience' className='scroll-mt-16'>
      <Container>
        <SectionHeading
          title='Experience'
          subtitle=''
          accent='green'
          icon={<BriefcaseBusiness className='size-5' aria-hidden='true' />}
        />

        <ol ref={timelineRef} className='relative border-l-2 border-line pl-6 dark:border-line-dark'>
          <span
            ref={lineRef}
            aria-hidden='true'
            className='absolute -left-0.5 top-0 bottom-0 w-0.5 origin-top bg-green-500/70 will-change-transform'
            style={reducedMotion ? undefined : { transform: "scaleY(0)" }}
          />
          {EXPERIENCES.map((experience, index) => (
            <li key={`${experience.company}-${experience.period}`} className='relative pb-10 last:pb-0'>
              <span
                className='timeline-dot absolute left-[-1.95rem] size-3 rounded-full border-2 border-line bg-card transition-colors duration-300 ease-out dark:border-line-dark dark:bg-card-dark'
                aria-hidden='true'
              />
              <Reveal delay={Math.min(index * 80, 240)}>
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
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
