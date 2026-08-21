import { useState } from 'react';
import { groupSort, max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { coaches, type Coach } from '../data/coaches';

const WIDTH = 400;
const HEIGHT = 450;
const MARGIN = { top: 30, right: 0, bottom: 20, left: 40 };

/* Coaches run left to right from the best positive/negative ratio to the worst. */
const x = scaleBand<string>()
  .domain(groupSort(coaches, (group) => -(group[0] as Coach).ratio, (d) => d.coach))
  .range([MARGIN.left, WIDTH - MARGIN.right])
  .padding(0.1);

const y = scaleLinear()
  .domain([0, max(coaches, (d) => d.positive_count) ?? 0])
  .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

const barWidth = x.bandwidth();

/** Height of a bar in pixels. y(1) rather than y(0) matches the original chart. */
function barHeight(count: number) {
  return y(1) - y(count);
}

type Props = {
  /** Told which coach is under the cursor, so the card title can name them. */
  onHover: (coach: Coach | null) => void;
};

/**
 * Negative comments are drawn first and positive ones over the top, because
 * almost every coach has more negatives than positives.
 */
export default function CoachGraph({ onHover }: Props) {
  const [active, setActive] = useState<string | null>(null);

  function bars(field: 'negative_count' | 'positive_count', fill: string) {
    return coaches.map((d) => (
      <rect
        key={`${field}-${d.coach}`}
        className={`graph-bar ${active === d.coach ? 'hovered' : ''}`}
        fill={fill}
        x={x(d.coach)}
        y={y(d[field])}
        width={barWidth}
        height={barHeight(d[field])}
        onMouseOver={() => {
          setActive(d.coach);
          onHover(d);
        }}
        onMouseOut={() => {
          setActive(null);
          onHover(null);
        }}
        onClick={() => {
          setActive(d.coach);
          onHover(d);
        }}
      />
    ));
  }

  return (
    <div id="graph" className="flex font-SCPro">
      <svg width="380" height="450" viewBox="0 0 400 450" className="relative ml-1">
        <g>{bars('negative_count', '#DE608F')}</g>
        <g>{bars('positive_count', '#5382B0')}</g>

        {/* No x ticks: the coach names are far too long to fit, so hovering a
            bar names the coach instead. */}
        <g transform={`translate(0,${HEIGHT - MARGIN.bottom})`}>
          <text x={200} y={18} fill="currentColor" textAnchor="middle" className="text-lg font-SCPro">
            Coach
          </text>
        </g>

        <g
          transform={`translate(${MARGIN.left},0)`}
          fill="none"
          fontSize={10}
          fontFamily="sans-serif"
          textAnchor="end"
        >
          {y.ticks().map((tick) => (
            <g key={tick} transform={`translate(0,${y(tick)})`}>
              <line x2={-6} stroke="currentColor" />
              <text x={-9} dy="0.32em" fill="currentColor">
                {tick.toFixed()}
              </text>
            </g>
          ))}
          <text
            x={5 - MARGIN.left}
            y={20}
            fill="currentColor"
            textAnchor="start"
            className="mt-4 text-lg font-SCPro"
          >
            Comments
          </text>
        </g>
      </svg>
    </div>
  );
}
