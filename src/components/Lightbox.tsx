import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
  onStep: (offset: number) => void;
};

/**
 * Rendered into document.body so the overlay is never trapped by an ancestor's
 * stacking or overflow context.
 */
export default function Lightbox({ src, alt, onClose, onStep }: Props) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onStep(1);
      if (event.key === 'ArrowLeft') onStep(-1);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose, onStep]);

  return createPortal(
    <div
      className="fixed inset-0 z-[99] flex cursor-zoom-out select-none items-center justify-center
                 bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="relative flex w-11/12 items-center justify-center xl:w-4/5">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={(event) => {
            event.stopPropagation();
            onStep(-1);
          }}
          className="absolute left-0 flex h-14 w-14 translate-x-10 cursor-pointer items-center
                     justify-center rounded-full bg-white/10 text-white hover:bg-white/20
                     xl:-translate-x-24 2xl:-translate-x-32"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <img
          className="max-w-xl cursor-zoom-out select-none object-scale-down object-center"
          src={src}
          alt={alt}
        />

        <button
          type="button"
          aria-label="Next photo"
          onClick={(event) => {
            event.stopPropagation();
            onStep(1);
          }}
          className="absolute right-0 flex h-14 w-14 -translate-x-10 cursor-pointer items-center
                     justify-center rounded-full bg-white/10 text-white hover:bg-white/20
                     xl:translate-x-24 2xl:translate-x-32"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}
