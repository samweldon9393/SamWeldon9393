import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found | Sam Weldon', 'That page does not exist.');

  return (
    <Layout>
      <section className="flex min-h-[60vh] items-center py-20">
        <div className="container-page text-center">
          <p className="eyebrow">404</p>
          <h1 className="heading-lg mt-4">Page not found</h1>
          <p className="body-muted mx-auto mt-4 max-w-prose">
            That page doesn&rsquo;t exist. It may have moved when the site was rebuilt.
          </p>
          <Link className="btn-primary mt-8" to="/">
            Back home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
