import type { ReactNode } from 'react';
import Backdrop from './Backdrop';
import Footer from './Footer';
import Header from './Header';

/** The shell every page shares: ambient backdrop, fixed header, footer. */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Backdrop />
      <Header />
      <main id="main-content" className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
