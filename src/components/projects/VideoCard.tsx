import type { VideoProject } from '../../data/projects';
import CardShell from './CardShell';

export default function VideoCard({ project }: { project: VideoProject }) {
  return (
    <CardShell
      id={project.id}
      title={project.title}
      blurb={project.blurb}
      media={
        <video
          controls
          preload="metadata"
          src={project.src}
          className="absolute inset-0 h-full w-full bg-black object-contain"
        />
      }
    />
  );
}
