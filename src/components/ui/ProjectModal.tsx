import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ProjectShowcase } from "@/types";

interface ProjectModalProps {
  project: ProjectShowcase | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const FOCUSABLE =
      'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div
      className='animate-modal-backdrop fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={project.title}
    >
      <div
        ref={dialogRef}
        className='animate-modal-panel flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-xl overscroll-contain dark:border-line-dark dark:bg-card-dark'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between gap-4 border-b border-line px-4 py-3 dark:border-line-dark'>
          <h2 className='truncate text-sm font-semibold text-ink dark:text-ink-dark'>{project.title}</h2>
          <button
            ref={closeButtonRef}
            type='button'
            onClick={onClose}
            aria-label='Tutup preview'
            className='inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-soft transition-colors hover:bg-canvas-hover hover:text-heading dark:text-ink-dark-soft dark:hover:bg-card-dark dark:hover:text-heading'
          >
            <X className='size-5' aria-hidden='true' />
          </button>
        </div>
        <div className='overflow-y-auto p-4 sm:p-6'>
          <img
            src={project.imageUrl}
            alt={project.title}
            className='mx-auto max-h-[55vh] w-auto rounded-xl object-contain'
          />
          <p className='mt-2 text-sm leading-relaxed text-ink dark:text-ink-dark-soft'>{project.description}</p>
          {project.url ? (
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-700'
            >
              <ExternalLink className='size-4' aria-hidden='true' />
              Visit Website
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
