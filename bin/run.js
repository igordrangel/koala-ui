#!/usr/bin/env node

(async () => {
  try {
    const { runCli } = await import('../cli/runner.js');
    const code = await runCli(process.argv.slice(2));
    process.exit(code);
  } catch {
    const { runCli } = await import('../dist/cli/runner.js');
    const code = await runCli(process.argv.slice(2));
    process.exit(code);
  }
})().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
