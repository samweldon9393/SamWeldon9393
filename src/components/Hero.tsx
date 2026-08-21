import { Link } from 'react-router-dom';
import { site } from '../data/site';

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center py-24">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="eyebrow animate-fade-up">{site.location}</p>

          <h1 className="heading-xl mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
            {site.tagline}
          </h1>

          <p
            className="body-muted mt-6 max-w-prose animate-fade-up text-lg"
            style={{ animationDelay: '160ms' }}
          >
            {site.intro}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link className="btn-primary" to="/#work">
              View work
            </Link>
            <a
              className="btn-ghost"
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint, hidden once the viewport is too short to be worth it. */}
      <div className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60">
          Scroll
        </span>
      </div>
    </section>
  );
}
