import { spawnSync } from 'node:child_process';

const baseHref = process.env.DOCS_BASE_HREF || '/';

const build = spawnSync(
  'bunx',
  ['ng', 'build', '--configuration', 'production', `--base-href=${baseHref}`],
  { stdio: 'inherit', shell: true },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const post = spawnSync('node', ['scripts/post-build.mjs'], { stdio: 'inherit' });
process.exit(post.status ?? 1);
