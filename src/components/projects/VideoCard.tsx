import type { VideoProject } from '../../data/projects';
import { CARD_CLASS } from './cardClass';

export default function VideoCard({ project }: { project: VideoProject }) {
  return (
    <div id={project.id} className={`${CARD_CLASS} bg-black bg-opacity-50`}>
      <h4 className="mb-1 mt-1 text-center">{project.title}</h4>
      <video controls className="mx-2 mt-8 h-96 w-96" src={project.src} />
    </div>
  );
}
