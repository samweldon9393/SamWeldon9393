import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
};

/** A titled page section: mono eyebrow, display heading, then content. */
export default function Section({ id, eyebrow, title, description, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="heading-lg mt-3">
            {title}
          </h2>
          {description && <p className="body-muted mt-4 max-w-prose">{description}</p>}
        </Reveal>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
