#!/usr/bin/env bun

import { runCli } from './runner';

runCli(process.argv.slice(2))
  .then((code) => process.exit(code ?? 0))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
