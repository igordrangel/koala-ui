import { spawnSync } from 'node:child_process';
import { cpSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
spawnSync('tsc', ['-p', 'libs/cli/tsconfig.json'], { stdio: 'inherit' });
cpSync('libs/ui/.vscode/settings.json', 'dist/ui/.vscode/settings.json');
cpSync(
  'libs/ui/src/app/core/constants/security-storage-keys.ts',
  'dist/ui/core/constants/security-storage-keys.ts',
);
cpSync('libs/ui/src/app/core/guards', 'dist/ui/core/guards', { recursive: true });
cpSync('libs/ui/src/app/core/interceptors', 'dist/ui/core/interceptors', { recursive: true });
cpSync('libs/ui/src/app/core/middlewares', 'dist/ui/core/middlewares', { recursive: true });
cpSync('libs/ui/src/app/core/models', 'dist/ui/core/models', { recursive: true });
cpSync('libs/ui/src/app/core/security', 'dist/ui/core/security', { recursive: true });
cpSync('libs/ui/src/app/core/utils', 'dist/ui/core/utils', { recursive: true });
cpSync('libs/ui/src/app/shared/components', 'dist/ui/components', { recursive: true });
cpSync('libs/ui/src/app/shared/validators', 'dist/ui/validators', { recursive: true });
cpSync('libs/ui/src/app/shared/directives', 'dist/ui/directives', { recursive: true });
cpSync('libs/ui/src/app/shared/utils', 'dist/ui/utils', { recursive: true });
cpSync('libs/ui/src/app/shared/base', 'dist/ui/base', { recursive: true });
cpSync('libs/ui/src/theme', 'dist/ui/theme', { recursive: true });
cpSync('libs/ui/public/assets/icons', 'dist/ui/assets/icons', { recursive: true });
cpSync('libs/ui/src/app/app.ts', 'dist/ui/app.ts');
cpSync('libs/ui/src/index.html', 'dist/ui/index.html');

cpSync('libs/ui/src/styles.css', 'dist/ui/styles.css');
const styles = readFileSync('dist/ui/styles.css', 'utf-8');
writeFileSync(
  'dist/ui/styles.css',
  styles.replace(/\/\* --start-internal-- \*\/[\s\S]*?\/\* --end-internal-- \*\//g, ''),
);

cpSync('libs/ui/eslint.config.mts', 'dist/ui/eslint.config.mts');
cpSync('libs/ui/generate-icons.js', 'dist/ui/generate-icons.js');
cpSync('README.md', 'dist/README.md');
cpSync('LICENSE', 'dist/LICENSE');
cpSync('package.json', 'dist/package.json');

cpSync('bin', 'dist/bin', { recursive: true });

const packageJson = JSON.parse(readFileSync('dist/package.json', 'utf-8'));

delete packageJson.devDependencies;
delete packageJson.scripts;
delete packageJson.prettier;

writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));
