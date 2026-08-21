import type { Project } from '../../data/projects';
import CoachGraphCard from './CoachGraphCard';
import EmbedCard from './EmbedCard';
import VideoCard from './VideoCard';
import VideoSeriesCard from './VideoSeriesCard';
import WritingCard from './WritingCard';

/**
 * Dispatches on the project kind. Adding a new kind of card means adding a
 * variant to Project and a case here; the pages do not change.
 */
export default function ProjectCard({ project }: { project: Project }) {
  switch (project.kind) {
    case 'embed':
      return <EmbedCard project={project} />;
    case 'video':
      return <VideoCard project={project} />;
    case 'video-series':
      return <VideoSeriesCard project={project} />;
    case 'chart':
      return <CoachGraphCard project={project} />;
    case 'writing':
      return <WritingCard project={project} />;
  }
}
