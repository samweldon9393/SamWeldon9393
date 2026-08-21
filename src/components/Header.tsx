import { Link, useLocation } from 'react-router-dom';
import { navItems, site } from '../data/site';
import Logo from './Logo';

/**
 * A nav item is "current" when its target is the page you are on. Hash links
 * (/#projects) point within the home page, so they are never marked current.
 */
function isCurrent(to: string, pathname: string) {
  return !to.includes('#') && to === pathname;
}

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header
      role="banner"
      className="relative flex flex-col items-center justify-between bg-opacity-50 px-4 pt-8
                 shadow-inner sm:flex-row sm:py-2 md:px-8 lg:px-10 2xl:py-0"
    >
      <Link to="/">
        <Logo />
      </Link>

      <nav className="pb-10 text-blue-200 sm:ml-auto sm:pt-0">
        <ul className="flex space-x-6 sm:space-x-12 lg:space-x-16 xl:space-x-16 2xl:space-x-20">
          {navItems.map((item) => (
            <li key={item.to} className="Card">
              <Link
                to={item.to}
                className={isCurrent(item.to, pathname) ? 'clickedLink' : 'Link'}
                aria-current={isCurrent(item.to, pathname) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="Card">
            <a className="Link" href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
