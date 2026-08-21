import { useState } from 'react';
import ContactSection from '../components/ContactSection';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { site } from '../data/site';
import { usePageMeta } from '../hooks/usePageMeta';

export default function About() {
  usePageMeta('About | Sam Weldon', 'A little about Sam Weldon.');

  const [showWinnie, setShowWinnie] = useState(false);

  return (
    <Layout>
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="heading-xl mt-4 max-w-2xl">Hi, I&rsquo;m Sam</h1>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="relative">
                <img
                  className="w-full rounded-2xl border border-white/10 object-cover"
                  src="/images/Me2.JPG"
                  alt="Sam, standing between two friends"
                />
                <p className="mt-3 font-mono text-xs text-muted">
                  {site.location}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="max-w-prose space-y-5 text-[15px] leading-relaxed text-muted">
                <p>
                  I&rsquo;m the one in the middle. I spent most of my twenties working in sales and
                  automotive service. I realized I needed to see what else life had to offer, so I
                  went back to school in January of 2020. I started cooking at a BBQ restaurant in
                  the mornings and tutoring English in the afternoons.
                </p>

                <p>
                  In May of 2023 I graduated from Housatonic Community College in Bridgeport, CT
                  before continuing my studies (now full time) at Columbia University. In 2024,
                  my cat{' '}
                  <span
                    className="relative inline-block"
                    onMouseEnter={() => setShowWinnie(true)}
                    onMouseLeave={() => setShowWinnie(false)}
                  >
                    <button
                      type="button"
                      className="font-medium text-accent underline decoration-accent/40
                                 underline-offset-4 transition hover:decoration-accent"
                      onClick={() => setShowWinnie((shown) => !shown)}
                      aria-expanded={showWinnie}
                    >
                      Winnie
                    </button>

                    {/* Absolutely positioned so revealing her never reflows the text. */}
                    <span
                      className={`absolute left-1/2 top-full z-20 mt-3 block w-56 -translate-x-1/2
                                  overflow-hidden rounded-xl border border-white/15 bg-surface
                                  p-1.5 shadow-2xl transition duration-300 ease-soft ${
                                    showWinnie
                                      ? 'pointer-events-auto translate-y-0 opacity-100'
                                      : 'pointer-events-none -translate-y-1 opacity-0'
                                  }`}
                      aria-hidden={!showWinnie}
                    >
                      <img src="/images/Winnie.png" alt="Winnie the cat" className="rounded-lg" />
                    </span>
                  </span>{' '}
                  and I moved to NYC, where I am now working toward completing my BA.
                </p>

                <p>
                  I like coding and being creative, but when I&rsquo;m not doing that I like
                  following the Mets and the Nets (never the Jets though).
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactSection />
    </Layout>
  );
}
