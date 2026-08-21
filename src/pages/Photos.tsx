import Layout from '../components/Layout';
import PhotoGallery from '../components/PhotoGallery';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Photos() {
  usePageMeta('Photos | Sam Weldon', 'Photos from Sam Weldon.');

  return (
    <Layout backgroundClassName="py-16" spacer={false}>
      <h1 className="sr-only">Photos</h1>
      <PhotoGallery />
    </Layout>
  );
}
