import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (offset: number) => void;
};

function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: 'left' | 'right';
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center
                  rounded-full border border-white/15 bg-ink/60 text-white backdrop-blur
                  transition duration-200 ease-soft hover:border-white/40 hover:bg-ink
                  ${side === 'left' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'}`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={side === 'left' ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'} />
      </svg>
    </button>
  );
}

/**
 * Rendered into document.body so the overlay is never trapped by an ancestor's
 * stacking or overflow context. Page scrolling is locked while it is open.
 */
export default function Lightbox({ src, alt, index, total, onClose, onStep }: Props) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onStep(1);
      if (event.key === 'ArrowLeft') onStep(-1);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onStep]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex animate-fade-up cursor-zoom-out items-center
                 justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full
                   border border-white/15 text-white transition hover:border-white/40 sm:right-8 sm:top-8"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <ArrowButton side="left" label="Previous photo" onClick={() => onStep(-1)} />

      <figure className="m-0 flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          className="max-h-[75vh] w-auto rounded-xl border border-white/10 object-contain"
          src={src}
          alt={alt}
        />
        <figcaption className="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
          <span>{alt}</span>
          <span className="text-muted/60">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>

      <ArrowButton side="right" label="Next photo" onClick={() => onStep(1)} />
    </div>,
    document.body,
  );
}
