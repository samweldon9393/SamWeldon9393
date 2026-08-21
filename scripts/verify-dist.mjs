/*
 * Asserts the things the deployed site needs that nothing else checks. Each of
 * these fails silently in a way you would only notice on the live site:
 * a missing 404.html breaks every deep link, a missing CNAME drops the custom
 * domain, and the redirect stubs are what keeps the pre-React URLs working.
 *
 * Run with: npm run verify:dist   (after npm run build)
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve('dist');
let failures = 0;

function fail(message) {
  console.error(`  FAIL  ${message}`);
  failures++;
}

function requireFile(relative) {
  const path = resolve(dist, relative);
  if (!existsSync(path)) {
    fail(`dist/${relative} is missing`);
    return null;
  }
  console.log(`  ok    dist/${relative}`);
  return path;
}

const index = requireFile('index.html');
const fallback = requireFile('404.html');

if (index && fallback && !readFileSync(index).equals(readFileSync(fallback))) {
  fail('dist/404.html does not match dist/index.html - the SPA fallback is stale');
}

const cname = requireFile('CNAME');
if (cname && readFileSync(cname, 'utf8').trim() !== 'sam-weldon.com') {
  fail('dist/CNAME is not sam-weldon.com');
}

/* Redirect stubs for the URLs the site used before the React rewrite. */
for (const stub of ['about.html', 'photos.html']) {
  const path = requireFile(stub);
  if (path && !readFileSync(path, 'utf8').includes('location.replace')) {
    fail(`dist/${stub} is not a redirect stub`);
  }
}

if (failures) {
  console.error(`\n${failures} dist verification failure(s)`);
  process.exit(1);
}
console.log('\nverify:dist: deploy artifacts look right');
