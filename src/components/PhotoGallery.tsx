import { useCallback, useState } from 'react';
import { gallery } from '../data/photos';
import Lightbox from './Lightbox';

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
      <div className="mx-auto max-w-6xl select-none">
        <ul className="grid grid-cols-2 gap-5 lg:grid-cols-5">
          {gallery.map((item) =>
            item.kind === 'image' ? (
              <li key={item.src}>
                <img
                  className="gallery-item"
                  src={item.src}
                  alt={item.alt}
                  onClick={() => setOpenIndex(images.indexOf(item))}
                />
              </li>
            ) : (
              <li key={item.src}>
                <video className="gallery-item" controls src={item.src} aria-label={item.label} />
              </li>
            ),
          )}
        </ul>
      </div>

      {open && <Lightbox src={open.src} alt={open.alt} onClose={close} onStep={step} />}
    </>
  );
}
