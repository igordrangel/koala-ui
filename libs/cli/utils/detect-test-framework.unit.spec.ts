import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectTestFramework, hasTestsConfigured } from './detect-test-framework';
import * as fs from 'node:fs';

vi.mock('node:fs');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/test/projects/${name}`,
}));

describe('detectTestFramework', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return none if package.json does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('none');
    expect(result.e2e).toBe('none');
    expect(result.hasTestScripts).toBe(false);
  });

  it('should detect vitest from dependencies', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { vitest: '1.0.0' },
      scripts: { test: 'vitest' },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('vitest');
    expect(result.e2e).toBe('none');
    expect(result.hasTestScripts).toBe(true);
  });

  it('should detect jest from dependencies', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { jest: '29.0.0' },
      scripts: { test: 'jest' },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('jest');
    expect(result.hasTestScripts).toBe(true);
  });

  it('should detect karma from dependencies', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { karma: '6.0.0' },
      scripts: { test: 'karma start' },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('karma');
    expect(result.hasTestScripts).toBe(true);
  });

  it('should detect playwright from dependencies', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { '@playwright/test': '1.40.0' },
      scripts: { e2e: 'playwright test' },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.e2e).toBe('playwright');
    expect(result.hasTestScripts).toBe(true);
  });

  it('should detect multiple frameworks simultaneously', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: {
        vitest: '1.0.0',
        '@playwright/test': '1.40.0',
      },
      scripts: {
        test: 'vitest && playwright test',
        'test:unit': 'vitest',
        e2e: 'playwright test',
      },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('vitest');
    expect(result.e2e).toBe('playwright');
    expect(result.hasTestScripts).toBe(true);
  });

  it('should prioritize vitest over jest', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: {
        vitest: '1.0.0',
        jest: '29.0.0',
      },
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('vitest');
  });

  it('should detect vitest from config file even without dependency', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) return true;
      if (path.includes('vitest.config')) return true;
      return false;
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('vitest');
  });

  it('should detect playwright from config file even without dependency', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: {},
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      if (path.includes('package.json')) return true;
      if (path.includes('playwright.config')) return true;
      return false;
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.e2e).toBe('playwright');
  });

  it('should return none when no tests configured', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { typescript: '5.0.0' },
      scripts: { build: 'ng build' },
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    const result = detectTestFramework('test-project');

    expect(result.unit).toBe('none');
    expect(result.e2e).toBe('none');
    expect(result.hasTestScripts).toBe(false);
  });
});

describe('hasTestsConfigured', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true if unit tests configured', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { vitest: '1.0.0' },
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    expect(hasTestsConfigured('test-project')).toBe(true);
  });

  it('should return true if e2e tests configured', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { '@playwright/test': '1.40.0' },
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    expect(hasTestsConfigured('test-project')).toBe(true);
  });

  it('should return false if no tests configured', () => {
    const packageJson = {
      dependencies: {},
      devDependencies: { typescript: '5.0.0' },
      scripts: {},
    };

    vi.mocked(fs.existsSync).mockImplementation((path: string) => {
      return path.includes('package.json');
    });

    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(packageJson));

    expect(hasTestsConfigured('test-project')).toBe(false);
  });
});
