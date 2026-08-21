import CoachGraph from '../CoachGraph';
import type { ChartProject } from '../../data/projects';
import ExternalLink from './ExternalLink';

/**
 * The featured card: the chart gets real width, and the write-up that used to
 * be hidden behind an info button now sits beside it.
 */
export default function CoachGraphCard({ project }: { project: ChartProject }) {
  return (
    <article id={project.id} className="card h-full p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="order-2 lg:order-1">
          <CoachGraph />
        </div>

        <div className="order-1 flex flex-col lg:order-2">
          <p className="eyebrow">Featured</p>
          <h3 className="heading-md mt-3">{project.title}</h3>
          <p className="body-muted mt-3 text-sm">{project.blurb}</p>
          <p className="body-muted mt-4 text-sm">{project.description}</p>
          <div className="mt-6">
            <ExternalLink href={project.repoUrl}>Code and write-up on GitHub</ExternalLink>
          </div>
        </div>
      </div>
    </article>
  );
}
