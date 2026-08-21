import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Anchor links like /#projects only scroll natively on a full page load. With
 * client-side routing we have to do it ourselves after the target has rendered.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}
