import fs from "node:fs";
import { execSync } from "node:child_process";

const config = JSON.parse(fs.readFileSync("package.json").toString());
const currentVersion = config.version;

if (fs.existsSync("dist")) {
  fs.rmSync("dist", { recursive: true });
}

execSync(`npm run build:lib`, { stdio: "inherit" });

const packageJson = JSON.parse(
  fs.readFileSync("dist/package.json", { encoding: "utf8" }).toString()
);

fs.writeFileSync(
  "dist/package.json",
  JSON.stringify(
    {
      ...packageJson,
      version: currentVersion,
      license: config.license,
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
