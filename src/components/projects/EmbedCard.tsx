import type { EmbedProject } from '../../data/projects';
import CardShell from './CardShell';
import ExternalLink from './ExternalLink';

/**
 * Shows the real site running in an iframe, scaled down to thumbnail size.
 * The iframe is inert (pointer-events-none) so it reads as a preview and never
 * swallows a scroll; the card's link is what takes you there.
 */
export default function EmbedCard({ project }: { project: EmbedProject }) {
  return (
    <CardShell
      id={project.id}
      title={project.title}
      blurb={project.blurb}
      media={
        <div className="pointer-events-none absolute inset-0">
          <iframe
            src={project.url}
            title={`${project.title} preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            sandbox="allow-scripts allow-same-origin"
            className="h-[250%] w-[250%] origin-top-left scale-[0.4] border-0"
          />
        </div>
      }
      action={<ExternalLink href={project.url}>Visit site</ExternalLink>}
    />
  );
}
