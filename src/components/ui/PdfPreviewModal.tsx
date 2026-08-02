import { useEffect, useRef } from "react";

interface PdfPreviewModalProps {
  url: string | null;
  title?: string;
  onClose: () => void;
  download?: { url: string; fileName: string } | null;
}

export function PdfPreviewModal({ url, title, onClose, download }: PdfPreviewModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!url) return;

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
  }, [url, onClose]);

  if (!url) return null;

  return (
    <div
      className='fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={title ?? "Preview PDF"}
    >
      <div
        ref={dialogRef}
        className='flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-xl overscroll-contain dark:border-line-dark dark:bg-card-dark'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between gap-4 border-b border-line px-4 py-3 dark:border-line-dark'>
          <h2 className='truncate text-sm font-semibold text-ink dark:text-ink-dark'>
            {title ?? "Preview PDF"}
          </h2>
          <div className='flex items-center gap-2'>
            {download ? (
              <a
                href={download.url}
                download={download.fileName}
                className='inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-700'
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
                    d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
                  />
                </svg>
                Download
              </a>
            ) : null}
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
        </div>
        <iframe
          src={url}
          title={title ?? "Preview PDF"}
          className='min-h-[60vh] w-full flex-1 bg-white'
        />
      </div>
    </div>
  );
}
