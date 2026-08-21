import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';
import Logo from './Logo';

/** Hash links point inside the home page, so they never mark a page current. */
function isCurrent(to: string, pathname: string) {
  return !to.includes('#') && to === pathname;
}

export default function Header() {
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* The header only grows a border once you have scrolled off the top. */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname, hash]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ease-soft ${
        scrolled ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} - home`}>
          <Logo />
          <span className="hidden font-display text-sm tracking-wide text-white sm:block">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${isCurrent(item.to, pathname) ? 'nav-link-active' : ''}`}
              aria-current={isCurrent(item.to, pathname) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a className="btn-ghost" href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-white transition duration-300 ease-soft ${
                menuOpen ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-4 bg-white transition duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-white transition duration-300 ease-soft ${
                menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-[max-height] duration-300 ease-soft md:hidden ${
          menuOpen ? 'max-h-80' : 'max-h-0 border-t-transparent'
        }`}
      >
        <nav className="container-page flex flex-col gap-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-2 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            className="rounded-lg px-2 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-white"
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
