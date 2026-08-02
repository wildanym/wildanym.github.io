import { useEffect, useRef } from "react";
import type { ProjectShowcase } from "@/types";

interface ProjectModalProps {
  project: ProjectShowcase | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={project.title}
    >
      <div
        className='flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-xl dark:border-line-dark dark:bg-card-dark'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between gap-4 border-b border-line px-4 py-3 dark:border-line-dark'>
          <h2 className='truncate text-sm font-semibold text-ink dark:text-ink-dark'>
            {project.title}
          </h2>
          <button
            ref={closeButtonRef}
            type='button'
            onClick={onClose}
            aria-label='Tutup preview'
            className='inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-canvas-hover hover:text-heading dark:text-ink-dark-soft dark:hover:bg-card-dark dark:hover:text-heading'
          >
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
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='overflow-y-auto p-4 sm:p-6'>
          <img
            src={project.imageUrl}
            alt={project.title}
            className='mx-auto max-h-[55vh] w-auto rounded-xl object-contain'
          />
          <h3 className='mt-4 text-lg font-bold text-ink dark:text-ink-dark'>
            {project.title}
          </h3>
          <p className='mt-2 text-sm leading-relaxed text-ink dark:text-ink-dark-soft'>
            {project.description}
          </p>
          {project.url ? (
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-700'
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
                  d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                />
              </svg>
              Visit Website
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
