import { describe, it, expect, vi, beforeEach } from 'vitest';
import prompts from 'prompts';
import { installLib } from './install-lib';

vi.mock('prompts', () => ({
  default: vi.fn(),
}));

vi.mock('./package-manager', () => ({
  detectPackageManager: vi.fn(() => 'bun'),
  getPmCommands: vi.fn(() => ({ add: 'bun add' })),
}));

vi.mock('./project-path', () => ({
  getProjectPath: vi.fn(() => '/tmp/project'),
}));

vi.mock('./run-command', () => ({
  runCommand: vi.fn(),
}));

import { runCommand } from './run-command';

describe('installLib', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should install lib when user confirms', async () => {
    vi.mocked(prompts).mockResolvedValue({ confirm: true });

    const result = await installLib('my-app', '@angular/aria');

    expect(result).toBe(true);
    expect(runCommand).toHaveBeenCalledWith('bun add @angular/aria', {
      cwd: '/tmp/project',
      loaderText: 'Installing @angular/aria',
      verbose: false,
    });
  });

  it('should not install lib when user declines', async () => {
    vi.mocked(prompts).mockResolvedValue({ confirm: false });

    const result = await installLib('my-app', '@angular/aria');

    expect(result).toBe(false);
    expect(runCommand).not.toHaveBeenCalled();
  });
});
