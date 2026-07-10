import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import { installIconSet } from './install-icon';
import { ensureStylesImport } from './ensure-styles-import';
import { runCommand } from './run-command';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));
vi.mock('./run-command', () => ({
  runCommand: vi.fn(),
}));
vi.mock('./ensure-styles-import', () => ({
  ensureStylesImport: vi.fn(),
}));

describe('installIconSet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodePath.join).mockImplementation((...args) => args.join('/'));
    vi.mocked(fs.mkdirSync).mockImplementation(() => undefined as never);
    vi.mocked(fs.cpSync).mockImplementation(() => {});
    vi.mocked(runCommand).mockResolvedValue(undefined as never);
  });

  it('should copy icons, regenerate css, and ensure styles.css imports icons.css', async () => {
    vi.mocked(fs.existsSync).mockImplementation((path: fs.PathLike) => {
      const p = String(path);
      return (
        p.includes('/ui/assets/icons/') ||
        p.endsWith('generate-icons.js') ||
        p.endsWith('src/theme/icons.css')
      );
    });

    const installed = await installIconSet('my-app', 'text-editor-icons');

    expect(installed).toContain('heading-h1');
    expect(installed).toContain('add-image');
    expect(runCommand).toHaveBeenCalledWith('node generate-icons.js', {
      cwd: '/home/user/my-app',
      verbose: false,
      loaderText: 'Generating icon classes',
    });
    expect(ensureStylesImport).toHaveBeenCalledWith('/home/user/my-app', 'icons');
  });

  it('should not wire styles import when icons.css was not generated', async () => {
    vi.mocked(fs.existsSync).mockImplementation((path: fs.PathLike) => {
      const p = String(path);
      return p.includes('/ui/assets/icons/');
    });

    await installIconSet('my-app', 'text-editor-icons');

    expect(runCommand).not.toHaveBeenCalled();
    expect(ensureStylesImport).not.toHaveBeenCalled();
  });
});
