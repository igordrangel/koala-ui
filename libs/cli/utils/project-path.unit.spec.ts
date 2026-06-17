import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getProjectPath } from './project-path';

describe('getProjectPath', () => {
  const originalCwd = process.cwd();

  beforeEach(() => {
    Object.defineProperty(process, 'cwd', {
      value: () => '/home/user',
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(process, 'cwd', {
      value: () => originalCwd,
      configurable: true,
    });
  });

  it('should return project path when not in project directory', () => {
    const path = getProjectPath('my-app');

    expect(path).toBe('/home/user/my-app');
  });

  it('should return current directory when already in project', () => {
    Object.defineProperty(process, 'cwd', {
      value: () => '/home/user/my-app',
      configurable: true,
    });

    const path = getProjectPath('my-app');

    expect(path).toBe('/home/user/my-app');
  });

  it('should append project name to current directory', () => {
    Object.defineProperty(process, 'cwd', {
      value: () => '/workspace',
      configurable: true,
    });

    expect(getProjectPath('angular-app')).toBe('/workspace/angular-app');
    expect(getProjectPath('koala-ui')).toBe('/workspace/koala-ui');
  });
});
