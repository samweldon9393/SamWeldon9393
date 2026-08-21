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
      className="flex-shrink-0 items-center text-2xl text-blue-200 opacity-90 transition-transform
                 duration-500 hover:rotate-180 hover:text-white"
      dangerouslySetInnerHTML={{ __html: LOGO_HTML }}
    />
  );
}
