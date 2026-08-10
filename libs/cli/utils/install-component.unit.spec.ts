import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import * as nodePath from 'node:path';
import { installComponent } from './install-component';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('./get-prefix', () => ({
  getPrefix: () => 'app',
}));
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));

describe('installComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodePath.join).mockImplementation((...args) => args.join('/'));
    vi.mocked(fs.existsSync).mockReturnValue(false);
  });

  it('should resolve http-base dependencies', () => {
    const deps = installComponent('my-app', 'http-base');

    expect(deps.baseDeps).toEqual(['http']);
    expect(deps.utilDeps).toEqual(['download-buffer-file', 'mime-type-by-extension']);
    expect(deps.componentDeps).toEqual([]);
    expect(deps.coreResourceDeps).toEqual([]);
  });

  it('should resolve list-base dependencies', () => {
    const deps = installComponent('my-app', 'list-base');

    expect(deps.baseDeps).toEqual(['list', 'http']);
    expect(deps.utilDeps).toEqual(['is-mobile', 'from-observable-with-signal']);
    expect(deps.componentDeps).toEqual(['table']);
    expect(deps.coreResourceDeps).toEqual([]);
  });

  it('should resolve page-base dependencies', () => {
    const deps = installComponent('my-app', 'page-base');

    expect(deps.baseDeps).toEqual(['page']);
    expect(deps.utilDeps).toEqual(['make-breadcrumb']);
    expect(deps.componentDeps).toEqual([]);
    expect(deps.coreResourceDeps).toEqual([]);
  });

  it('should resolve global-errors dependencies', () => {
    const deps = installComponent('my-app', 'global-errors');

    expect(deps.baseDeps).toEqual([]);
    expect(deps.utilDeps).toEqual([]);
    expect(deps.componentDeps).toEqual(['toast']);
    expect(deps.coreResourceDeps).toEqual([
      'interceptors/feedback-request-interceptor',
      'middlewares/http-errors.midleware',
      'utils/http-error-feedback-alert',
      'utils/sanitize-error-message',
    ]);
  });

  it('should resolve text-editor dependencies', () => {
    const deps = installComponent('my-app', 'text-editor');

    expect(deps.libDeps).toEqual([
      '@tiptap/starter-kit',
      '@tiptap/extension-table',
      '@tiptap/extension-highlight',
      '@tiptap/extension-image',
      '@tiptap/extension-text-align',
      '@tiptap/extension-file-handler',
      'ngx-tiptap',
    ]);
    expect(deps.componentDeps).toEqual(['dropdown', 'tooltip', 'input-color']);
    expect(deps.utilDeps).toEqual(['control-changes']);
    expect(deps.cssDeps).toEqual(['editor']);
    expect(deps.iconSetDeps).toEqual(['text-editor-icons']);
  });

  it('should resolve input-color dependencies', () => {
    const deps = installComponent('my-app', 'input-color');

    expect(deps.componentDeps).toEqual(['dropdown']);
    expect(deps.libDeps).toEqual([]);
  });
});
