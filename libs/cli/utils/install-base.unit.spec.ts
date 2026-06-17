import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import { installBase } from './install-base';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));

describe('installBase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodePath.join).mockImplementation((...args) => args.join('/'));
  });

  it('should copy base file to project', () => {
    vi.mocked(fs.cpSync).mockImplementation(() => {});

    installBase('my-app', 'list');

    expect(fs.cpSync).toHaveBeenCalledWith(
      expect.stringContaining('ui/base/list.base.ts'),
      '/home/user/my-app/src/app/shared/base/list.base.ts',
    );
  });

  it('should create shared/base directory path', () => {
    vi.mocked(fs.cpSync).mockImplementation(() => {});

    installBase('my-app', 'list');

    const call = vi.mocked(fs.cpSync).mock.calls[0];
    expect(call[1]).toBe('/home/user/my-app/src/app/shared/base/list.base.ts');
  });
});
