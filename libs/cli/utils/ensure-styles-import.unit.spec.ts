import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'node:fs';
import { ensureStylesImport } from './ensure-styles-import';

vi.mock('node:fs');

describe('ensureStylesImport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add theme css import when missing', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      "@import 'tailwindcss';\n\n@plugin \"daisyui\";\n" as never,
    );
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    ensureStylesImport('/tmp/project', 'icons');

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/tmp/project/src/styles.css',
      "@import './theme/icons.css';\n@import 'tailwindcss';\n\n@plugin \"daisyui\";\n",
    );
  });

  it('should insert before the last existing import', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      "@import 'tailwindcss';\n@import './theme/grid.css';\n\nbody {}\n" as never,
    );
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    ensureStylesImport('/tmp/project', 'editor');

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/tmp/project/src/styles.css',
      "@import 'tailwindcss';\n@import './theme/editor.css';\n@import './theme/grid.css';\n\nbody {}\n",
    );
  });

  it('should prepend import when styles.css has no existing imports', () => {
    vi.mocked(fs.readFileSync).mockReturnValue('@plugin "daisyui";\n' as never);
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    ensureStylesImport('/tmp/project', 'icons');

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/tmp/project/src/styles.css',
      "@import './theme/icons.css';\n@plugin \"daisyui\";\n",
    );
  });

  it('should be idempotent when import already exists', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      "@import 'tailwindcss';\n@import './theme/icons.css';\n" as never,
    );

    ensureStylesImport('/tmp/project', 'icons');

    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
