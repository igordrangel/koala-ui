import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

interface KoalaConfig {
  sharedRoot?: string;
}

export function getSharedRoot(projectFolder: string): string {
  const koalaJsonPath = path.join(projectFolder, 'koala.json');

  if (existsSync(koalaJsonPath)) {
    try {
      const config = JSON.parse(readFileSync(koalaJsonPath, 'utf-8')) as KoalaConfig;
      if (config.sharedRoot) {
        return path.join(projectFolder, config.sharedRoot);
      }
    } catch {
      // fall through to default
    }
  }

  return path.join(projectFolder, 'src/app/shared');
}
