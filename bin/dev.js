#!/usr/bin/env node_modules/.bin/ts-node

(async () => {
  const { runCli } = await import('../libs/cli/runner');
  const code = await runCli(process.argv.slice(2));
  process.exit(code);
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
