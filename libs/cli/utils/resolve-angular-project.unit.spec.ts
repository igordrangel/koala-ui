import { describe, it, expect } from 'vitest';
import { resolveAngularProjectName } from './resolve-angular-project';

describe('resolveAngularProjectName', () => {
  it('should return the candidate when it exists in projects', () => {
    const angularJson = {
      projects: {
        'somarcredito-site': { projectType: 'application', prefix: 'app' },
      },
    };

    expect(resolveAngularProjectName(angularJson, 'somarcredito-site')).toBe('somarcredito-site');
  });

  it('should fall back to defaultProject when candidate is missing', () => {
    const angularJson = {
      defaultProject: 'my-app',
      projects: {
        'my-app': { projectType: 'application', prefix: 'app' },
        'my-lib': { projectType: 'library', prefix: 'lib' },
      },
    };

    expect(resolveAngularProjectName(angularJson, 'wrong-name')).toBe('my-app');
  });

  it('should fall back to the first application project', () => {
    const angularJson = {
      projects: {
        'my-lib': { projectType: 'library', prefix: 'lib' },
        'my-app': { projectType: 'application', prefix: 'app' },
      },
    };

    expect(resolveAngularProjectName(angularJson, 'C:\\Projects\\my-app')).toBe('my-app');
  });

  it('should fall back to the first project key when no application exists', () => {
    const angularJson = {
      projects: {
        'only-lib': { projectType: 'library', prefix: 'lib' },
      },
    };

    expect(resolveAngularProjectName(angularJson, 'missing')).toBe('only-lib');
  });

  it('should return null when projects is empty', () => {
    expect(resolveAngularProjectName({ projects: {} }, 'any')).toBeNull();
    expect(resolveAngularProjectName({}, 'any')).toBeNull();
  });
});
