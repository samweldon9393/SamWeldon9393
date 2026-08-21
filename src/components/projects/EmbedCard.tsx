import type { EmbedProject } from '../../data/projects';
import { CARD_CLASS } from './cardClass';

/** Shows a live thumbnail of another site, linking through to the real thing. */
export default function EmbedCard({ project }: { project: EmbedProject }) {
  return (
    <a href={project.url} target="_blank" rel="noopener noreferrer">
      <div id={project.id} className={`${CARD_CLASS} project-frame`}>
        <h4>{project.title}</h4>
        <iframe
          src={project.url}
          title={project.title}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </a>
  );
}
