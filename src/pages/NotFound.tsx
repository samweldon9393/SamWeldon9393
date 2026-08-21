import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found | Sam Weldon', 'That page does not exist.');

  return (
    <Layout>
      <div className="mx-auto max-w-xl px-4 py-40 text-center">
        <h1 className="mb-4 text-3xl">Page not found</h1>
        <p className="mb-8 text-sm">
          That page doesn't exist. It may have moved when the site was rebuilt.
        </p>
        <Link className="Link underline" to="/">
          Back home
        </Link>
      </div>
    </Layout>
  );
}
