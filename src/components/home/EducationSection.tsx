import { useState } from "react";
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
                d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5'
              />
            </svg>
          }
        />

        <div className='grid gap-6'>
          {EDUCATIONS.map((education) => (
            <article
              key={`${education.institution}-${education.degree}`}
              className='rounded-2xl border border-line bg-card p-6 shadow-card transition-shadow hover:shadow-md dark:border-line-dark dark:bg-card-dark'
            >
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
                  <svg
                    className='size-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.8}
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                    />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                  </svg>
                  Certificate
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
      <PdfPreviewModal url={previewUrl} title='Certificate' onClose={() => setPreviewUrl(null)} />
    </Section>
  );
}
