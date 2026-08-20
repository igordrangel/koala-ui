#!/usr/bin/env bun

import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distUiDir = path.join(rootDir, "dist/ui");

mkdirSync(distUiDir, { recursive: true });

cpSync(
  path.join(rootDir, "libs/ui/.vscode/settings.json"),
  path.join(distUiDir, ".vscode/settings.json"),
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/constants/security-storage-keys.ts"),
  path.join(distUiDir, "core/constants/security-storage-keys.ts"),
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/guards"),
  path.join(distUiDir, "core/guards"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/interceptors"),
  path.join(distUiDir, "core/interceptors"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/middlewares"),
  path.join(distUiDir, "core/middlewares"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/models"),
  path.join(distUiDir, "core/models"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/security"),
  path.join(distUiDir, "core/security"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/core/utils"),
  path.join(distUiDir, "core/utils"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/shared/components"),
  path.join(distUiDir, "components"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/shared/validators"),
  path.join(distUiDir, "validators"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/shared/directives"),
  path.join(distUiDir, "directives"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/shared/utils"),
  path.join(distUiDir, "utils"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/shared/base"),
  path.join(distUiDir, "base"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/theme"),
  path.join(distUiDir, "theme"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/public/assets/icons"),
  path.join(distUiDir, "assets/icons"),
  { recursive: true },
);
cpSync(
  path.join(rootDir, "libs/ui/src/app/app.ts"),
  path.join(distUiDir, "app.ts"),
);

cpSync(
  path.join(rootDir, "libs/ui/src/styles.css"),
  path.join(distUiDir, "styles.css"),
);
const styles = readFileSync(path.join(distUiDir, "styles.css"), "utf-8");
writeFileSync(
  path.join(distUiDir, "styles.css"),
  styles.replace(/\/\* --start-internal-- \*\/[\s\S]*?\/\* --end-internal-- \*\//g, ""),
);

cpSync(
  path.join(rootDir, "libs/ui/eslint.config.mts"),
  path.join(distUiDir, "eslint.config.mts"),
);
cpSync(
  path.join(rootDir, "libs/ui/generate-icons.js"),
  path.join(distUiDir, "generate-icons.js"),
);

console.log(`Build concluído: ${path.relative(rootDir, distUiDir)}/`);
