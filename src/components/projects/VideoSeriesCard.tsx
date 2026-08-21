import { useState } from 'react';
import type { VideoSeriesProject } from '../../data/projects';
import { CARD_CLASS } from './cardClass';

export default function VideoSeriesCard({ project }: { project: VideoSeriesProject }) {
  const [index, setIndex] = useState(0);
  const count = project.sources.length;

  function step(offset: number) {
    setIndex((current) => (current + offset + count) % count);
  }

  return (
    <div id={project.id} className={`${CARD_CLASS} bg-black bg-opacity-50`}>
      <h4 className="mb-1 mt-1 text-center">{project.title}</h4>

      <div className="relative mt-4 flex items-center justify-center">
        <button
          type="button"
          aria-label="Previous video"
          onClick={() => step(-1)}
          className="absolute left-2 rounded-full bg-black/50 px-2 py-1 text-2xl hover:bg-white"
        >
          &lsaquo;
        </button>

        {/* Keying on the source makes React swap the element instead of
            mutating src, which is what actually reloads the clip. */}
        <video
          key={project.sources[index]}
          controls
          className="pt-20 opacity-90 transition"
          src={project.sources[index]}
        />

        <button
          type="button"
          aria-label="Next video"
          onClick={() => step(1)}
          className="absolute right-2 rounded-full bg-black/50 px-2 py-1 text-2xl hover:bg-black"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}
