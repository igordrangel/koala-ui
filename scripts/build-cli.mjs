#!/usr/bin/env bun

import { Glob } from "bun";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(rootDir, "libs/cli");
const outputDir = path.join(rootDir, "dist/cli");

const transpiler = new Bun.Transpiler({
  loader: "ts",
  target: "node",
});

function shouldSkipFile(file) {
  if (file.startsWith("test/")) {
    return true;
  }

  if (file.endsWith(".unit.spec.ts") || file.endsWith(".spec.ts")) {
    return true;
  }

  if (file.startsWith("vitest.config")) {
    return true;
  }

  return false;
}

function rewriteRelativeImports(code, sourceFile) {
  function normalizeImportPath(importPath) {
    if (importPath.endsWith(".json")) {
      return importPath;
    }

    if (importPath.endsWith(".ts")) {
      return `${importPath.slice(0, -3)}.js`;
    }

    if (importPath.endsWith(".js")) {
      return importPath;
    }

    return `${importPath}.js`;
  }

  function resolveImportPath(importPath) {
    if (!importPath.startsWith("@cli/")) {
      return importPath;
    }

    const targetPath = path.join(sourceDir, importPath.slice("@cli/".length));
    const fromDir = path.dirname(path.join(sourceDir, sourceFile));
    let relative = path.relative(fromDir, targetPath).replace(/\\/g, "/");

    if (!relative.startsWith(".")) {
      relative = `./${relative}`;
    }

    return relative;
  }

  function rewriteStatement(match, quote, importPath) {
    const resolved = resolveImportPath(importPath);
    const normalized = normalizeImportPath(resolved);

    return match.replace(
      `${quote}${importPath}${quote}`,
      `${quote}${normalized}${quote}`,
    );
  }

  let output = code.replace(
    /^import\s+(?:type\s+)?(?:[\s\S]*?\s+)from\s+(['"])((?:@cli\/|\.\.?\/)[^'"]+)\1;?\s*$/gm,
    rewriteStatement,
  );

  output = output.replace(
    /^export\s+(?:type\s+)?(?:[\s\S]*?\s+)from\s+(['"])((?:@cli\/|\.\.?\/)[^'"]+)\1;?\s*$/gm,
    rewriteStatement,
  );

  if (/with\s+\{\s*type:\s*["']json["']\s*\}/.test(sourceFile)) {
    output = output.replace(
      /import\s+(\w+)\s+from\s+["']([^"']+\.json)["']/g,
      'import $1 from "$2" with { type: "json" }',
    );
  }

  return output;
}

function buildCli() {
  rmSync(outputDir, { recursive: true, force: true });

  for (const file of new Glob("**/*.ts").scanSync(sourceDir)) {
    if (shouldSkipFile(file)) {
      continue;
    }

    const sourcePath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.ts$/, ".js"));

    mkdirSync(path.dirname(outputPath), { recursive: true });

    const source = readFileSync(sourcePath, "utf8");
    let output = transpiler.transformSync(source);
    output = rewriteRelativeImports(output, file);

    if (file === "index.ts") {
      output = `#!/usr/bin/env bun\n\n${output}`;
    }

    writeFileSync(outputPath, output, "utf8");
  }

  const assetsSource = path.join(sourceDir, "assets");
  const assetsOutput = path.join(outputDir, "assets");

  if (existsSync(assetsSource)) {
    cpSync(assetsSource, assetsOutput, { recursive: true });
  }

  console.log(`Build concluído: ${path.relative(rootDir, outputDir)}/`);
}

buildCli();
