import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  blurb: string;
  /** The visual on top of the card: a preview, a video, a chart. */
  media: ReactNode;
  /** Rendered at the bottom right, e.g. a link out to the live project. */
  action?: ReactNode;
  className?: string;
};

/**
 * Every project card is the same shape: a 16:10 media well, then title, blurb
 * and an optional action. Keeping the frame here is what makes a grid of very
 * different projects read as one set.
 */
export default function CardShell({ id, title, blurb, media, action, className = '' }: Props) {
  return (
    <article id={id} className={`card card-hover flex h-full flex-col ${className}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-black/40">
        {media}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="heading-md">{title}</h3>
        <p className="body-muted mt-2 text-sm">{blurb}</p>
        {action && <div className="mt-5 pt-1">{action}</div>}
      </div>
    </article>
  );
}
