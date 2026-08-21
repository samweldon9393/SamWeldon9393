import { Fragment } from 'react';
import type { WritingProject } from '../../data/projects';
import { site } from '../../data/site';
import ExternalLink from './ExternalLink';

/* Parsed as UTC so the date never slips a day depending on the reader's zone. */
const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const CALL_TO_ACTION: Record<WritingProject['form'], string> = {
  post: 'Read the post',
  paper: 'Read the paper',
};

/** Full author list in published order, with Sam picked out of the line. */
function Byline({ authors }: { authors: string[] }) {
  return (
    <p className="mt-3 text-sm text-muted">
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 && ', '}
          <span className={author === site.name ? 'text-white' : undefined}>{author}</span>
        </Fragment>
      ))}
    </p>
  );
}

/**
 * Writing has no screenshot worth showing, so this card is typographic: the
 * publication and date as the eyebrow, then the headline at display size.
 */
export default function WritingCard({ project }: { project: WritingProject }) {
  return (
    <article id={project.id} className="card card-hover h-full p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="eyebrow">{project.publication}</p>
        <p className="font-mono text-xs text-muted">
          <time dateTime={project.date}>{dateFormat.format(new Date(project.date))}</time>
        </p>
      </div>

      <h3 className="heading-lg mt-4 max-w-3xl">
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          {project.title}
        </a>
      </h3>

      <Byline authors={project.authors} />

      <p className="body-muted mt-4 max-w-prose text-sm">{project.blurb}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ExternalLink href={project.url}>{CALL_TO_ACTION[project.form]}</ExternalLink>
        {project.identifier && (
          <span className="font-mono text-xs text-muted/70">{project.identifier}</span>
        )}
      </div>
    </article>
  );
}
