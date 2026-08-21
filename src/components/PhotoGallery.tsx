import { useCallback, useState } from 'react';
import { gallery } from '../data/photos';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

/* Only images open in the lightbox; video tiles play in place. */
const images = gallery.flatMap((item) => (item.kind === 'image' ? [item] : []));

export default function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = useCallback((offset: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + offset + images.length) % images.length,
    );
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const open = openIndex === null ? null : images[openIndex];

  return (
    <>
      {/*
        A CSS column layout keeps every photo at its own aspect ratio rather than
        cropping them all to one shape, which suits a personal gallery.
      */}
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {gallery.map((item, index) =>
          item.kind === 'image' ? (
            <Reveal key={item.src} delay={Math.min(index, 6) * 60} className="break-inside-avoid">
              <button
                type="button"
                className="block w-full"
                onClick={() => setOpenIndex(images.indexOf(item))}
                aria-label={`Open photo: ${item.alt}`}
              >
                <img className="tile" src={item.src} alt={item.alt} loading="lazy" />
              </button>
            </Reveal>
          ) : (
            <Reveal key={item.src} delay={Math.min(index, 6) * 60} className="break-inside-avoid">
              <video
                className="w-full rounded-xl border border-white/10 bg-white/5"
                controls
                preload="metadata"
                src={item.src}
                aria-label={item.label}
              />
            </Reveal>
          ),
        )}
      </div>

      {open && (
        <Lightbox
          src={open.src}
          alt={open.alt}
          index={openIndex ?? 0}
          total={images.length}
          onClose={close}
          onStep={step}
        />
      )}
    </>
  );
}
