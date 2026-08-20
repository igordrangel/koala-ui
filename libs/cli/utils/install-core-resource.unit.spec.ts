import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import { installCoreResource } from './install-core-resource';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('./get-package-root', () => ({
  getOriginPath: () => '/fake/origin',
  getPackageRoot: () => '/fake/origin',
}));
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));

describe('installCoreResource', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodePath.join).mockImplementation((...args) => args.join('/'));
    vi.mocked(fs.readFileSync).mockReturnValue(
      `export const appConfig = { providers: [] };`,
    );
  });

  it('should copy feedback-request-interceptor and update app.config', () => {
    vi.mocked(fs.cpSync).mockImplementation(() => {});
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    installCoreResource('my-app', 'interceptors/feedback-request-interceptor');

    expect(fs.cpSync).toHaveBeenCalledWith(
      expect.stringContaining('ui/core/interceptors/feedback-request-interceptor.ts'),
      '/home/user/my-app/src/app/core/interceptors/feedback-request-interceptor.ts',
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/home/user/my-app/src/app/app.config.ts',
      expect.stringContaining('feedbackRequestInterceptor'),
      'utf-8',
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/home/user/my-app/src/app/app.config.ts',
      expect.stringContaining('withInterceptors'),
      'utf-8',
    );
  });
});
