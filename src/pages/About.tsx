import { useState } from 'react';
import Contact from '../components/Contact';
import Layout from '../components/Layout';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta('About | Sam Weldon', 'A little about Sam Weldon.');

  const [showWinnie, setShowWinnie] = useState(false);

  return (
    <Layout>
      <div className="mb-8 flex flex-wrap justify-center px-4 pt-20 sm:px-6 lg:px-0">
        <div className="mb-4 max-h-96 max-w-96 px-4">
          <img
            className="min-w-80 rounded shadow"
            src="/images/Me2.JPG"
            alt="Sam, standing between two friends"
          />
        </div>

        <div className="min-w-72">
          <h1 className="text-center text-2xl">Hi, I'm Sam</h1>
          <p className="relative max-w-80 text-justify font-sans text-sm">
            I'm the one in the middle. I spent most of my twenties working in sales and automotive
            service. I realized I needed to see what else life had to offer, so I went back to school
            in January of 2020. I started cooking at a BBQ restaurant in the mornings and tutoring
            English in the afternoons. In May of 2023 I graduated from Housatonic Community College
            in Bridgeport, CT before continuing my studies (now full time) at Columbia University. In
            September, my cat{' '}
            {/* Hover works on desktop, tap covers mobile. The photo is absolutely
                positioned so revealing it does not reflow the paragraph. */}
            <span
              className="relative inline-block"
              onMouseEnter={() => setShowWinnie(true)}
              onMouseLeave={() => setShowWinnie(false)}
            >
              <button
                type="button"
                className="cursor-pointer text-blue-500 underline"
                onClick={() => setShowWinnie((shown) => !shown)}
                aria-expanded={showWinnie}
              >
                Winnie
              </button>

              {showWinnie && (
                <span className="absolute left-0 top-full z-10 flex items-center justify-center shadow-2xl">
                  <img src="/images/Winnie.png" alt="Winnie the cat" className="max-w-xs rounded-md" />
                </span>
              )}
            </span>{' '}
            and I moved to NYC, where I am now working toward completing my BA. I like coding and
            being creative, but when I'm not doing that I like following the Mets and the Nets (never
            the Jets though).
          </p>
        </div>
      </div>

      <Contact align="center" />
    </Layout>
  );
}
