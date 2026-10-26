import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import { getPrefix } from './get-prefix';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));

describe('getPrefix', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodePath.join).mockImplementation((...args) => args.join('/'));
  });

  it('should read prefix from angular.json', () => {
    const mockAngularJson = {
      projects: {
        'my-app': {
          prefix: 'kl',
        },
      },
    };

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockAngularJson) as any);

    const prefix = getPrefix('my-app');

    expect(prefix).toBe('kl');
    expect(fs.readFileSync).toHaveBeenCalledWith('/home/user/my-app/angular.json', 'utf-8');
  });

  it('should return null when prefix is app', () => {
    const mockAngularJson = {
      projects: {
        'my-app': {
          prefix: 'app',
        },
      },
    };

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockAngularJson) as any);

    const prefix = getPrefix('my-app');

    expect(prefix).toBeNull();
  });

  it('should resolve project when cwd basename does not match angular.json key', () => {
    const mockAngularJson = {
      projects: {
        'somarcredito-site': {
          projectType: 'application',
          prefix: 'app',
        },
      },
    };

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockAngularJson) as any);

    // Simulates Windows cwd basename mismatch / wrong candidate name
    expect(getPrefix('C:\\Projects\\somarcredito-site')).toBeNull();
  });

  it('should throw when angular.json has no projects', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify({ projects: {} }) as any);

    expect(() => getPrefix('my-app')).toThrow(/No projects found/);
  });

  it('should handle malformed JSON gracefully', () => {
    vi.mocked(fs.readFileSync).mockReturnValue('invalid json' as any);

    expect(() => getPrefix('my-app')).toThrow();
  });
});
