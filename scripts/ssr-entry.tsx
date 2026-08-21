import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../src/App';

/** Renders a route to HTML without a browser, for scripts/smoke.mjs. */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
