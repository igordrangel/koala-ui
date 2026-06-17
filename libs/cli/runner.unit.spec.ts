import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';

vi.mock('node:fs');
vi.mock('./commands/init', () => ({
  runInitCommand: vi.fn(),
}));
vi.mock('./commands/install', () => ({
  runInstallCommand: vi.fn(),
}));
vi.mock('./commands/new', () => ({
  runNewCommand: vi.fn(),
}));

import { runCli } from './runner';

describe('CLI Runner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should print the CLI version when using the version command', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue('{"version":"0.18.0"}' as never);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const result = await runCli(['version']);

    expect(result).toBe(0);
    expect(logSpy).toHaveBeenCalledWith('0.18.0');
  });

  it('should print the CLI version when using the version flag', async () => {
    vi.mocked(fs.readFileSync).mockReturnValue('{"version":"0.18.0"}' as never);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const result = await runCli(['--version']);

    expect(result).toBe(0);
    expect(logSpy).toHaveBeenCalledWith('0.18.0');
  });
});
