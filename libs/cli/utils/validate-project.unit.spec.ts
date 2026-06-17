import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateAngularProject } from './validate-project';
import * as fs from 'node:fs';

vi.mock('node:fs');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/test/projects/${name}`,
}));

describe('validateAngularProject', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return error if package.json does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(false);
    expect(result.hasPackageJson).toBe(false);
    expect(result.errors).toContain('package.json is not found');
  });

  it('should return error if package.json cannot be read', () => {
    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error('File read error');
    });

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(false);
    expect(result.hasPackageJson).toBe(true);
    expect(result.errors).toContain('Error reading package.json');
  });

  it('should return error if @angular/core is not found', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify({
        dependencies: { 'some-package': '1.0.0' },
        devDependencies: {},
      }),
    );

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(false);
    expect(result.isAngular).toBe(false);
    expect(result.errors).toContain('@angular/core not found in dependencies');
  });

  it('should return error if tsconfig.json does not exist', () => {
    const packageJson = {
      dependencies: { '@angular/core': '21.0.0' },
      devDependencies: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) return true;
      if (path.includes('tsconfig.json')) return false;
      if (path.includes('main.ts')) return true;
      return false;
    });

    vi.mocked(fs.readFileSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) {
        return JSON.stringify(packageJson);
      }
      if (path.includes('main.ts')) {
        return 'bootstrapApplication(App, config)';
      }
      throw new Error('File not found');
    });

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(false);
    expect(result.hasTsConfig).toBe(false);
    expect(result.errors).toContain('tsconfig.json not found');
  });

  it('should return error if src/main.ts does not exist', () => {
    const packageJson = {
      dependencies: { '@angular/core': '21.0.0' },
      devDependencies: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) return true;
      if (path.includes('tsconfig.json')) return true;
      if (path.includes('main.ts')) return false;
      return false;
    });

    vi.mocked(fs.readFileSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) {
        return JSON.stringify(packageJson);
      }
      throw new Error('File not found');
    });

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('src/main.ts not found');
  });

  it('should validate a correct standalone Angular project', () => {
    const packageJson = {
      dependencies: { '@angular/core': '21.0.0' },
      devDependencies: {},
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) {
        return JSON.stringify(packageJson);
      }
      if (path.includes('main.ts')) {
        return 'bootstrapApplication(App, config)';
      }
      throw new Error('Unexpected file');
    });

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(true);
    expect(result.isAngular).toBe(true);
    expect(result.isStandalone).toBe(true);
    expect(result.hasPackageJson).toBe(true);
    expect(result.hasTsConfig).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should detect non-standalone Angular project', () => {
    const packageJson = {
      dependencies: { '@angular/core': '21.0.0' },
      devDependencies: {},
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) {
        return JSON.stringify(packageJson);
      }
      if (path.includes('main.ts')) {
        return 'platformBrowserDynamic().bootstrapModule(AppModule)';
      }
      throw new Error('Unexpected file');
    });

    const result = validateAngularProject('test-project');

    expect(result.isValid).toBe(true);
    expect(result.isAngular).toBe(true);
    expect(result.isStandalone).toBe(false);
  });
});
