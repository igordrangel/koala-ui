import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const paths = {
  tempDir: '',
  assetsDir: '',
};

vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => path.join(paths.tempDir, name),
}));

vi.mock('./get-agents-assets-path', () => ({
  getAgentsAssetsPath: () => paths.assetsDir,
}));

import { installAgents } from './install-agents';

function seedAssets(): void {
  const files = [
    'AGENTS.md',
    '.agents/instructions/structure.md',
    '.agents/instructions/components.md',
    '.agents/instructions/angular.md',
    '.agents/instructions/docs.md',
    '.agents/skills/code-review.md',
  ];

  for (const relative of files) {
    const full = path.join(paths.assetsDir, relative);
    mkdirSync(path.dirname(full), { recursive: true });
    writeFileSync(full, `# ${relative}\n`);
  }
}

describe('installAgents', () => {
  beforeEach(() => {
    paths.tempDir = mkdtempSync(path.join(os.tmpdir(), 'koala-ui-agents-'));
    paths.assetsDir = path.join(paths.tempDir, 'assets');
    seedAssets();
  });

  afterEach(() => {
    rmSync(paths.tempDir, { recursive: true, force: true });
  });

  it('escreve AGENTS.md e .agents/', () => {
    const projectDir = path.join(paths.tempDir, 'my-app');
    mkdirSync(projectDir, { recursive: true });

    const result = installAgents('my-app');

    expect(existsSync(path.join(projectDir, 'AGENTS.md'))).toBe(true);
    expect(existsSync(path.join(projectDir, '.agents/instructions/structure.md'))).toBe(true);
    expect(existsSync(path.join(projectDir, '.agents/skills/code-review.md'))).toBe(true);
    expect(result.written).toContain('AGENTS.md');
    expect(result.removedLegacy).toEqual([]);
  });

  it('remove scaffolding legado Cursor/Copilot', () => {
    const projectDir = path.join(paths.tempDir, 'my-app');
    const legacyFiles = [
      '.cursor/rules/koala-structure.mdc',
      '.cursor/rules/koala-components.mdc',
      '.cursor/rules/koala-angular.mdc',
      '.cursor/rules/koala-docs.mdc',
      '.github/copilot-instructions.md',
    ];

    for (const relative of legacyFiles) {
      const full = path.join(projectDir, relative);
      mkdirSync(path.dirname(full), { recursive: true });
      writeFileSync(full, 'legacy');
    }

    const result = installAgents('my-app');

    for (const relative of legacyFiles) {
      expect(existsSync(path.join(projectDir, relative))).toBe(false);
    }
    expect(result.removedLegacy).toHaveLength(legacyFiles.length);
    expect(existsSync(path.join(projectDir, 'AGENTS.md'))).toBe(true);
  });

  it('sobrescreve AGENTS.md existente', () => {
    const projectDir = path.join(paths.tempDir, 'my-app');
    mkdirSync(projectDir, { recursive: true });
    writeFileSync(path.join(projectDir, 'AGENTS.md'), '# custom\n');

    installAgents('my-app');

    expect(readFileSync(path.join(projectDir, 'AGENTS.md'), 'utf8')).toContain('AGENTS.md');
  });
});
