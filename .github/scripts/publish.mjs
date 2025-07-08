import fs from "node:fs";
import { execSync } from "node:child_process";

const config = JSON.parse(fs.readFileSync("package.json").toString());
const currentVersion = config.version;

if (fs.existsSync("dist")) {
  fs.rmSync("dist", { recursive: true });
}

execSync(`npm run build:lib`, { stdio: "inherit" });

const packageJson = JSON.parse(
  fs
    .readFileSync("projects/koala-ui/package.json", { encoding: "utf8" })
    .toString()
);

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      ...packageJson,
      version: currentVersion,
      description: config.description,
      repository: {
        type: "git",
        url: "git+https://github.com/igordrangel/koala-ui.git",
      },
      keywords: config.keywords,
      author: "Igor D. Rangel",
      license: config.license,
      bugs: {
        url: "https://github.com/igordrangel/koala-ui/issues",
      },
      homepage: "https://github.com/igordrangel/koala-ui#readme",
      types: "./koala-ui.d.ts",
      dependencies: config.dependencies,
    },
    null,
    2
  ),
  "utf8"
);
fs.writeFileSync(
  "dist/README.md",
  fs.readFileSync("README.md").toString(),
  "utf8"
);
fs.writeFileSync("dist/LICENSE", fs.readFileSync("LICENSE").toString(), "utf8");

console.log("Build completed");
