import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as fs from 'node:fs';

vi.mock('node:fs');
vi.mock('./utils/get-package-root', () => ({
  getPackageRoot: vi.fn(() => '/fake/package/root'),
}));
vi.mock('./commands/init', () => ({
  runInitCommand: vi.fn(),
}));
vi.mock('./commands/install', () => ({
  runInstallCommand: vi.fn(),
}));
vi.mock('./commands/new', () => ({
  runNewCommand: vi.fn(),
}));
vi.mock('./commands/add', () => ({
  runAddCommand: vi.fn(),
}));

import { runCli } from './runner';
import { runAddCommand } from './commands/add';
import { runNewCommand } from './commands/new';
import { runInitCommand } from './commands/init';
import { runInstallCommand } from './commands/install';

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

  it('should route add ai-context with targets', async () => {
    const result = await runCli(['add', 'ai-context', 'cursor', 'github', '-p', 'my-app']);

    expect(result).toBe(0);
    expect(runAddCommand).toHaveBeenCalledWith({
      feature: 'ai-context',
      targets: ['cursor', 'github'],
      project: 'my-app',
      verbose: false,
    });
  });

  it('should pass --ai-context to new', async () => {
    const result = await runCli(['new', 'demo', '--ai-context', 'none']);

    expect(result).toBe(0);
    expect(runNewCommand).toHaveBeenCalledWith({
      name: 'demo',
      pm: undefined,
      verbose: false,
      aiContext: 'none',
      silent: false,
      type: undefined,
      ssr: undefined,
    });
  });

  it('should pass --silent to new', async () => {
    const result = await runCli(['new', 'demo', '--silent']);

    expect(result).toBe(0);
    expect(runNewCommand).toHaveBeenCalledWith({
      name: 'demo',
      pm: undefined,
      verbose: false,
      aiContext: undefined,
      silent: true,
      type: undefined,
      ssr: undefined,
    });
  });

  it('should pass --type and --ssr to new', async () => {
    const result = await runCli(['new', 'demo', '--type', 'app', '--ssr']);

    expect(result).toBe(0);
    expect(runNewCommand).toHaveBeenCalledWith({
      name: 'demo',
      pm: undefined,
      verbose: false,
      aiContext: undefined,
      silent: false,
      type: 'app',
      ssr: true,
    });
  });

  it('should pass --no-ssr to new', async () => {
    const result = await runCli(['new', 'demo', '--no-ssr']);

    expect(result).toBe(0);
    expect(runNewCommand).toHaveBeenCalledWith({
      name: 'demo',
      pm: undefined,
      verbose: false,
      aiContext: undefined,
      silent: false,
      type: undefined,
      ssr: false,
    });
  });

  it('should pass --ai-context to init', async () => {
    const result = await runCli(['init', '--ai-context', 'cursor']);

    expect(result).toBe(0);
    expect(runInitCommand).toHaveBeenCalledWith({
      project: undefined,
      verbose: false,
      aiContext: 'cursor',
      silent: false,
    });
  });

  it('should pass --silent to install', async () => {
    const result = await runCli(['install', 'button', '--silent']);

    expect(result).toBe(0);
    expect(runInstallCommand).toHaveBeenCalledWith({
      name: 'button',
      project: undefined,
      verbose: false,
      silent: true,
    });
  });
});
