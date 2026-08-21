import { useState } from 'react';
import type { VideoSeriesProject } from '../../data/projects';
import CardShell from './CardShell';

export default function VideoSeriesCard({ project }: { project: VideoSeriesProject }) {
  const [index, setIndex] = useState(0);
  const count = project.sources.length;

  function step(offset: number) {
    setIndex((current) => (current + offset + count) % count);
  }

  return (
    <CardShell
      id={project.id}
      title={project.title}
      blurb={project.blurb}
      media={
        <>
          {/* Keying on the source swaps the element rather than mutating src,
              which is what actually reloads the clip. */}
          <video
            key={project.sources[index]}
            controls
            preload="metadata"
            src={project.sources[index]}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
            <button
              type="button"
              aria-label="Previous clip"
              onClick={() => step(-1)}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full
                         border border-white/20 bg-ink/70 text-sm backdrop-blur transition
                         hover:border-white/40 hover:bg-ink"
            >
              &lsaquo;
            </button>

            <span className="pointer-events-none rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] text-muted backdrop-blur">
              {index + 1} / {count}
            </span>

            <button
              type="button"
              aria-label="Next clip"
              onClick={() => step(1)}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full
                         border border-white/20 bg-ink/70 text-sm backdrop-blur transition
                         hover:border-white/40 hover:bg-ink"
            >
              &rsaquo;
            </button>
          </div>
        </>
      }
    />
  );
}
