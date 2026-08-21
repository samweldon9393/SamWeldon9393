import { useState } from 'react';
import { groupSort, max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { coaches, type Coach } from '../data/coaches';

const WIDTH = 560;
const HEIGHT = 340;
const MARGIN = { top: 16, right: 8, bottom: 36, left: 48 };

/* Negative in warm red, positive in blue, as the write-up describes. */
const NEGATIVE = '#F97559';
const POSITIVE = '#60A5FA';

/* Left to right, best positive/negative ratio to worst. */
const x = scaleBand<string>()
  .domain(groupSort(coaches, (group) => -(group[0] as Coach).ratio, (d) => d.coach))
  .range([MARGIN.left, WIDTH - MARGIN.right])
  .padding(0.25);

const y = scaleLinear()
  .domain([0, max(coaches, (d) => d.positive_count) ?? 0])
  .range([HEIGHT - MARGIN.bottom, MARGIN.top])
  .nice();

const compact = new Intl.NumberFormat('en-US', { notation: 'compact' });

/**
 * Positives are drawn over negatives, because almost every coach has far more
 * negatives - the overlap is the point.
 */
export default function CoachGraph() {
  const [active, setActive] = useState<Coach | null>(null);

  function bars(field: 'negative_count' | 'positive_count', fill: string) {
    return coaches.map((d) => {
      const dim = active !== null && active.coach !== d.coach;
      return (
        <rect
          key={`${field}-${d.coach}`}
          x={x(d.coach)}
          y={y(d[field])}
          width={x.bandwidth()}
          height={Math.max(0, y(0) - y(d[field]))}
          rx={2}
          fill={fill}
          className="transition-opacity duration-200"
          opacity={dim ? 0.25 : 1}
          onMouseEnter={() => setActive(d)}
          onFocus={() => setActive(d)}
          tabIndex={-1}
        />
      );
    });
  }

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full overflow-visible"
        role="img"
        /* aria-label, not an SVG <title> element: React 19 hoists <title> into
           the document head as page metadata, which would clobber the tab title. */
        aria-label={`Positive and negative Reddit comment counts for ${coaches.length} NBA head coaches`}
        onMouseLeave={() => setActive(null)}
      >
        {/* Horizontal gridlines instead of tick marks - lighter, easier to read. */}
        {y.ticks(4).map((tick) => (
          <g key={tick}>
            <line
              x1={MARGIN.left}
              x2={WIDTH - MARGIN.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="currentColor"
              className="text-white/10"
            />
            <text
              x={MARGIN.left - 10}
              y={y(tick)}
              dy="0.32em"
              textAnchor="end"
              fill="currentColor"
              className="fill-muted font-mono text-[10px]"
            >
              {compact.format(tick)}
            </text>
          </g>
        ))}

        <g>{bars('negative_count', NEGATIVE)}</g>
        <g>{bars('positive_count', POSITIVE)}</g>

        <text
          x={(WIDTH + MARGIN.left) / 2}
          y={HEIGHT - 6}
          textAnchor="middle"
          fill="currentColor"
          className="fill-muted font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          Coaches, best ratio to worst
        </text>
      </svg>

      {/* Reserved line so hovering does not shift the layout. */}
      <figcaption className="mt-4 flex min-h-[2.5rem] flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs">
        {active ? (
          <>
            <span className="text-white">{active.coach}</span>
            <span style={{ color: POSITIVE }}>+{active.positive_count.toLocaleString()}</span>
            <span style={{ color: NEGATIVE }}>-{active.negative_count.toLocaleString()}</span>
          </>
        ) : (
          <>
            <span className="flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: POSITIVE }} />
              Positive
            </span>
            <span className="flex items-center gap-2 text-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: NEGATIVE }} />
              Negative
            </span>
            <span className="text-muted/70">Hover a bar for a coach</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
