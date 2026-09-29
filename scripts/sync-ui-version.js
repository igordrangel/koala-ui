import fs from 'node:fs';
import path from 'node:path';

const rootPackageJsonPath = path.resolve(import.meta.dirname, '../package.json');
const uiVersionFilePath = path.resolve(
  import.meta.dirname,
  '../libs/ui/src/app/core/constants/app-version.ts',
);

function syncUiVersion() {
  const packageJsonRaw = fs.readFileSync(rootPackageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonRaw);
  const version = typeof packageJson.version === 'string' ? packageJson.version : '0.0.0';

  const content = `export const APP_VERSION = '${version}';\n`;

  fs.mkdirSync(path.dirname(uiVersionFilePath), { recursive: true });
  fs.writeFileSync(uiVersionFilePath, content, 'utf8');

  console.log(`[sync-ui-version] UI version updated to v${version}`);
}

syncUiVersion();
