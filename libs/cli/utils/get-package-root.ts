import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function isPublishRoot(dir: string): boolean {
  return (
    existsSync(path.join(dir, 'package.json')) &&
    existsSync(path.join(dir, 'ui')) &&
    existsSync(path.join(dir, 'cli'))
  );
}

function isPackageRoot(dir: string): boolean {
  if (!existsSync(path.join(dir, 'package.json'))) {
    return false;
  }

  return (
    existsSync(path.join(dir, 'ui')) ||
    existsSync(path.join(dir, 'libs', 'ui'))
  );
}

export function getPackageRoot(fromUrl: string = import.meta.url): string {
  let dir = path.dirname(fileURLToPath(fromUrl));
  let packageRoot: string | undefined;

  while (dir !== path.dirname(dir)) {
    if (isPublishRoot(dir)) {
      return dir;
    }

    if (isPackageRoot(dir)) {
      packageRoot = dir;
    }

    dir = path.dirname(dir);
  }

  if (packageRoot) {
    return packageRoot;
  }

  throw new Error('Não foi possível resolver a raiz do pacote koala-ui.');
}

/** Directory containing `ui/` and `cli/` (published root or local `dist/`). */
export function getOriginPath(fromUrl: string = import.meta.url): string {
  return getPackageRoot(fromUrl);
}
