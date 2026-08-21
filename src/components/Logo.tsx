import { LOGO_HTML } from './logoMarkup';

/**
 * The site mark: a KaTeX-rendered \vec{s}W. The markup is generated at build
 * time (see scripts/render-logo.mjs) so the browser gets a few hundred bytes of
 * static HTML instead of the whole KaTeX library. Only the stylesheet ships.
 */
export default function Logo() {
  return (
    <span
      role="img"
      aria-label="Sam Weldon"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15
                 bg-white/5 text-sm leading-none text-white transition duration-300 ease-soft
                 hover:border-accent/60 hover:text-accent"
      dangerouslySetInnerHTML={{ __html: LOGO_HTML }}
    />
  );
}
