import Layout from '../components/Layout';
import PhotoGallery from '../components/PhotoGallery';
import Reveal from '../components/Reveal';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Photos() {
  usePageMeta('Photos | Sam Weldon', 'Photos from Sam Weldon.');

  return (
    <Layout>
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Photos</p>
            <h1 className="heading-xl mt-4">Friends, family, and one cat</h1>
            <p className="body-muted mt-4 max-w-prose">
              A few pictures from the last couple of years. Click any of them to open it larger.
            </p>
          </Reveal>

          <div className="mt-14">
            <PhotoGallery />
          </div>
        </div>
      </section>
    </Layout>
  );
}
