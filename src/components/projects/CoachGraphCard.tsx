import { useState } from 'react';
import CoachGraph from '../CoachGraph';
import type { Coach } from '../../data/coaches';
import type { ChartProject } from '../../data/projects';
import { CARD_CLASS } from './cardClass';

/**
 * The card shows the chart, or a write-up about it. The info button swaps
 * between the two; hovering a bar renames the title to that coach's counts.
 */
export default function CoachGraphCard({ project }: { project: ChartProject }) {
  const [showInfo, setShowInfo] = useState(false);
  const [hovered, setHovered] = useState<Coach | null>(null);

  const title = hovered
    ? `${hovered.coach}: +${hovered.positive_count} / -${hovered.negative_count}`
    : project.title;

  if (showInfo) {
    return (
      <div id={project.id} className={CARD_CLASS}>
        <h3 className="mt-2 text-center">{project.title}</h3>
        <p className="mb-6 mt-12 text-center text-sm mx-4">{project.description}</p>
        <a className="ml-44" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <button
          type="button"
          className="mt-1 block w-full text-center hover:cursor-pointer"
          onClick={() => setShowInfo(false)}
        >
          See Graph Again
        </button>
      </div>
    );
  }

  return (
    <div id={project.id} className={CARD_CLASS}>
      <div className="flex flex-row justify-end">
        <button type="button" onClick={() => setShowInfo(true)} aria-label="About this project">
          <img className="absolute mb-8 max-h-20 max-w-20 hover:cursor-pointer" src="/images/Info.png" alt="" />
        </button>
      </div>
      <h4 className="mb-1 mt-1 text-center">{title}</h4>
      <CoachGraph onHover={setHovered} />
    </div>
  );
}
