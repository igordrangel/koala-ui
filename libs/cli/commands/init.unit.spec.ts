import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runInitCommand } from './init';

vi.mock('../utils/cli-ui');
vi.mock('../utils/setup-existing-project');

describe('Init Command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should use current directory name as project when not specified', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    const originalCwd = process.cwd;
    process.cwd = () => '/home/user/my-project';

    try {
      await runInitCommand({});

      expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('my-project', false);
    } finally {
      process.cwd = originalCwd;
    }
  });

  it('should use provided project name', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    await runInitCommand({ project: 'custom-project' });

    expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('custom-project', false);
  });

  it('should pass verbose flag to setupExistingProject', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    await runInitCommand({ project: 'test-project', verbose: true });

    expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('test-project', true);
  });

  it('should not set verbose flag to true by default', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    await runInitCommand({ project: 'test-project' });

    expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('test-project', false);
  });

  it('should call logHeader with correct parameters', async () => {
    const { logHeader } = await import('../utils/cli-ui');

    await runInitCommand({ project: 'test-project' });

    expect(vi.mocked(logHeader)).toHaveBeenCalledWith(
      console.log,
      'KOALA PROJECT INITIALIZER',
      'Project: test-project',
    );
  });

  it('should propagate errors from setupExistingProject', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    const testError = new Error('Test error');
    vi.mocked(setupExistingProject).mockRejectedValueOnce(testError);

    await expect(runInitCommand({ project: 'test-project' })).rejects.toThrow('Test error');
  });

  it('should handle missing project gracefully with current directory', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    const originalCwd = process.cwd;
    process.cwd = () => '/path/to/my-app';

    try {
      await runInitCommand({ verbose: false });

      // Should extract 'my-app' from the path
      expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('my-app', false);
    } finally {
      process.cwd = originalCwd;
    }
  });

  it('should accept InitArgs with all properties optional', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    const originalCwd = process.cwd;
    process.cwd = () => '/home/user/app';

    try {
      await runInitCommand({});

      expect(vi.mocked(setupExistingProject)).toHaveBeenCalled();
    } finally {
      process.cwd = originalCwd;
    }
  });

  it('should handle deeply nested project paths', async () => {
    const { setupExistingProject } = await import('../utils/setup-existing-project');

    const originalCwd = process.cwd;
    process.cwd = () => '/home/user/projects/monorepo/packages/my-ui-lib';

    try {
      await runInitCommand({ verbose: false });

      // Should extract the last directory name
      expect(vi.mocked(setupExistingProject)).toHaveBeenCalledWith('my-ui-lib', false);
    } finally {
      process.cwd = originalCwd;
    }
  });
});
