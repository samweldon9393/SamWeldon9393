import type { ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: ReactNode;
  /** About and Photos add their own vertical padding around the starfield. */
  backgroundClassName?: string;
  /** Pages with their own top padding do not need the margin-collapse spacer. */
  spacer?: boolean;
};

/**
 * Every page is the same shell: header, then content on the starfield.
 *
 * The lone `_` paragraph is a spacer. Without it the first child's top margin
 * collapses through the background container and the starfield starts too low.
 */
export default function Layout({ children, backgroundClassName = '', spacer = true }: Props) {
  return (
    <>
      <Header />
      <main id="main-content" className="relative mx-auto">
        <div
          className={`bg-[length:800px_600px] bg-fixed bg-no-repeat opacity-75 md:bg-auto ${backgroundClassName}`}
          style={{ backgroundImage: 'url(/images/sky1.png)' }}
        >
          {spacer && (
            <p className="text-end text-deepBlue" aria-hidden="true">
              _
            </p>
          )}
          {children}
        </div>
      </main>
    </>
  );
}
