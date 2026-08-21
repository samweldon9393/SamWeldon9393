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
    'Columbia University',
    'id="work"',
    'id="contact"',
    '/images/mymake2.mp4',
    'Resume.pdf',
    'Selected work',
  ],
  '/about': ['Winnie', '/images/Me2.JPG', 'Housatonic'],
  '/photos': ['/images/Seafood.jpg', '/images/Video.mov', 'Friends, family'],
  '/no-such-page': ['Page not found'],
};

/** Home's nav entries are all hash links, so no page link is marked current. */
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
  const found = (render(url).match(/nav-link-active/g) ?? []).length;
  if (found !== expected) fail(`${url} marks ${found} nav links current, expected ${expected}`);
}

const homeHtml = render('/');
if (homeHtml.includes('<title')) {
  fail('a <title> element rendered into the body - React 19 hoists these as page metadata');
} else {
  console.log('  ok    no stray <title> in the rendered body');
}

const rects = homeHtml.match(/<rect/g)?.length ?? 0;
if (rects !== 72) fail(`coach graph drew ${rects} bars, expected 72 (36 coaches x 2)`);
else console.log('  ok    coach graph drew 72 bars');

if (failures) {
  console.error(`\n${failures} smoke failure(s)`);
  process.exit(1);
}
console.log('\nsmoke: all routes render');
