import { EventEmitter } from 'node:events';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { spawn } from 'node:child_process';
import { runCommand } from './run-command';

vi.mock('node:child_process');

function createChildProcessMock(exitCode = 0) {
  const child = new EventEmitter() as EventEmitter & {
    stdout: EventEmitter;
    stderr: EventEmitter;
  };

  child.stdout = new EventEmitter();
  child.stderr = new EventEmitter();

  queueMicrotask(() => {
    child.emit('close', exitCode);
  });

  return child;
}

describe('runCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute command successfully', async () => {
    const child = createChildProcessMock(0);
    vi.mocked(spawn).mockReturnValue(child as any);

    const result = await runCommand('npm install');

    const calls = vi.mocked(spawn).mock.calls;
    expect(calls[0][0]).toBe('npm install');
    expect(calls[0][1]).toHaveProperty('shell', true);
    expect(result.status).toBe(0);
  });

  it('should throw error when command fails with non-zero exit code', async () => {
    const child = createChildProcessMock(1);
    vi.mocked(spawn).mockReturnValue(child as any);

    await expect(runCommand('npm install')).rejects.toThrow(
      'Command failed with exit code 1: npm install',
    );
  });

  it('should throw error when spawn produces an error', async () => {
    const child = new EventEmitter() as EventEmitter & {
      stdout: EventEmitter;
      stderr: EventEmitter;
    };
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();

    vi.mocked(spawn).mockReturnValue(child as any);

    const promise = runCommand('invalid-command');
    child.emit('error', new Error('ENOENT: command not found'));

    await expect(promise).rejects.toThrow('ENOENT: command not found');
  });

  it('should pass custom options to spawn', async () => {
    const child = createChildProcessMock(0);
    vi.mocked(spawn).mockReturnValue(child as any);

    const customOptions = { cwd: '/home/user' };
    await runCommand('npm install', customOptions);

    const calls = vi.mocked(spawn).mock.calls;
    expect(calls[0][1]).toHaveProperty('cwd', '/home/user');
    expect(calls[0][1]).toHaveProperty('shell', true);
  });
});
