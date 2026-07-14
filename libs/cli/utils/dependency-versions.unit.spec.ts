import { describe, expect, it } from 'vitest';
import { DEPENDENCY_VERSIONS, withVersion, withVersions } from './dependency-versions';

describe('dependency-versions', () => {
  it('should append pinned version for managed packages', () => {
    expect(withVersion('clsx')).toBe(`clsx@${DEPENDENCY_VERSIONS.clsx}`);
    expect(withVersion('@angular/aria')).toBe(`@angular/aria@${DEPENDENCY_VERSIONS['@angular/aria']}`);
  });

  it('should keep unmanaged packages unchanged', () => {
    expect(withVersion('some-unknown-pkg')).toBe('some-unknown-pkg');
  });

  it('should map multiple packages', () => {
    expect(withVersions(['clsx', 'unknown', 'vitest'])).toEqual([
      `clsx@${DEPENDENCY_VERSIONS.clsx}`,
      'unknown',
      `vitest@${DEPENDENCY_VERSIONS.vitest}`,
    ]);
  });
});
