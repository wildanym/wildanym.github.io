import { Eye, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PdfPreviewModal } from "@/components/ui/PdfPreviewModal";
import { EDUCATIONS } from "@/constants/profile";

export function EducationSection() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  return (
    <Section id='education' className='scroll-mt-16'>
      <Container>
        <SectionHeading
          title='Education'
          subtitle=''
          accent='green'
          icon={<GraduationCap className='size-5' aria-hidden='true' />}
        />

        <div className='grid gap-6'>
          {EDUCATIONS.map((education, index) => (
            <Reveal key={`${education.institution}-${education.degree}`} delay={index * 80}>
              <article className='rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-md dark:border-line-dark dark:bg-card-dark'>
              {education.period ? (
                <span className='text-sm font-medium text-green-700 dark:text-green-500'>{education.period}</span>
              ) : null}
              <h3 className='mt-1 sm:text-lg text-base font-semibold text-heading'>{education.institution}</h3>
              <p className='mt-1 text-sm font-medium text-ink dark:text-ink-dark'>{education.degree}</p>
              {education.description ? (
                <p className='mt-3 text-sm leading-relaxed text-ink dark:text-ink-dark-soft'>{education.description}</p>
              ) : null}
              {education.certificateUrl ? (
                <a
                  href={education.certificateUrl}
                  onClick={(event) => {
                    event.preventDefault();
                    setPreviewUrl(education.certificateUrl!);
                  }}
                  className='mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400'
                >
                  <Eye className='size-4' aria-hidden='true' />
                  Certificate
                </a>
              ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
      <PdfPreviewModal url={previewUrl} title='Certificate' onClose={() => setPreviewUrl(null)} />
    </Section>
  );
}
