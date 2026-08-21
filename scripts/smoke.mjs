/*
 * Renders every route in Node and asserts the page actually contains its
 * content. Catches the class of breakage a typecheck cannot: a component that
 * throws on render, a route that stops matching, data that goes missing.
 *
 * Run with: npm run smoke   (builds the SSR bundle first)
 */
const { render } = await import('../.smoke/ssr-entry.js');

/* Text React will HTML-escape (apostrophes) is avoided in these needles. */
const ROUTES = {
  '/': [
    'App Projects',
    'Data Projects',
    'School Projects',
    'Sing Sing Prison Museum Maps App',
    'SafeWorks',
    'Reddit Hates Coaches',
    'MyMake',
    'Webserver',
    'senior at Columbia',
    'id="projects"',
    'id="contact"',
    'graph-bar',
    'project-frame',
    '/images/mymake2.mp4',
    'Resume.pdf',
  ],
  '/about': ['Hi, I', 'Winnie', '/images/Me2.JPG', 'Housatonic'],
  '/photos': ['gallery-item', '/images/Seafood.jpg', '/images/Video.mov'],
  '/no-such-page': ['Page not found'],
};

/** Home has no nav entry of its own; sub-pages mark exactly one link current. */
const EXPECTED_CURRENT = { '/': 0, '/about': 1, '/photos': 1 };

let failures = 0;

function fail(message) {
  console.error(`  FAIL  ${message}`);
  failures++;
}

for (const [url, needles] of Object.entries(ROUTES)) {
  let html;
  try {
    html = render(url);
  } catch (error) {
    fail(`${url} threw: ${error.message}`);
    continue;
  }

  const missing = needles.filter((needle) => !html.includes(needle));
  if (missing.length) fail(`${url} is missing: ${missing.join(', ')}`);
  else console.log(`  ok    ${url.padEnd(14)} ${html.length} bytes`);
}

for (const [url, expected] of Object.entries(EXPECTED_CURRENT)) {
  const found = (render(url).match(/clickedLink/g) ?? []).length;
  if (found !== expected) fail(`${url} marks ${found} nav links current, expected ${expected}`);
}

const rects = (render('/').match(/<rect/g) ?? []).length;
if (rects !== 72) fail(`coach graph drew ${rects} bars, expected 72 (36 coaches x 2)`);
else console.log('  ok    coach graph drew 72 bars');

if (failures) {
  console.error(`\n${failures} smoke failure(s)`);
  process.exit(1);
}
console.log('\nsmoke: all routes render');
