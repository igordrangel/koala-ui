import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { getPackageRoot } from './get-package-root';

describe('getPackageRoot', () => {
  let tempDir = '';

  afterEach(() => {
    if (tempDir) {
      rmSync(tempDir, { recursive: true, force: true });
      tempDir = '';
    }
  });

  function probeFrom(relativeDir: string) {
    const dir = path.join(tempDir, relativeDir);
    mkdirSync(dir, { recursive: true });
    return new URL(`file://${path.join(dir, 'probe.js')}`).href;
  }

  it('resolve pacote publicado com ui e cli na raiz', () => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'koala-ui-root-'));
    mkdirSync(path.join(tempDir, 'ui'), { recursive: true });
    mkdirSync(path.join(tempDir, 'cli'), { recursive: true });
    writeFileSync(
      path.join(tempDir, 'package.json'),
      `${JSON.stringify({ name: '@koalarx/ui', version: '1.0.0' }, null, 2)}\n`,
    );

    expect(getPackageRoot(probeFrom('cli/utils'))).toBe(tempDir);
  });

  it('resolve build local com ui e cli em dist', () => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'koala-ui-root-'));
    mkdirSync(path.join(tempDir, 'dist', 'ui'), { recursive: true });
    mkdirSync(path.join(tempDir, 'dist', 'cli'), { recursive: true });
    mkdirSync(path.join(tempDir, 'libs', 'ui'), { recursive: true });
    writeFileSync(
      path.join(tempDir, 'package.json'),
      `${JSON.stringify({ name: '@koalarx/ui', version: '1.0.0' }, null, 2)}\n`,
    );
    writeFileSync(
      path.join(tempDir, 'dist', 'package.json'),
      `${JSON.stringify({ name: '@koalarx/ui', version: '1.0.0' }, null, 2)}\n`,
    );

    expect(getPackageRoot(probeFrom('dist/cli/utils'))).toBe(path.join(tempDir, 'dist'));
  });

  it('resolve monorepo com libs/ui', () => {
    tempDir = mkdtempSync(path.join(os.tmpdir(), 'koala-ui-root-'));
    mkdirSync(path.join(tempDir, 'libs', 'ui'), { recursive: true });
    writeFileSync(
      path.join(tempDir, 'package.json'),
      `${JSON.stringify({ name: '@koalarx/ui', version: '1.0.0' }, null, 2)}\n`,
    );

    expect(getPackageRoot(probeFrom('libs/cli/utils'))).toBe(tempDir);
  });
});
