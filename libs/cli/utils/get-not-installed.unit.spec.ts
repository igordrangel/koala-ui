import * as fs from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { getNotInstalled } from './get-not-installed';

vi.mock('node:fs');
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/home/user/${name}`,
}));

describe('getNotInstalled', () => {
  describe('components', () => {
    it('should return empty array when all components are installed', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);

      const notInstalled = getNotInstalled('my-app', 'component', ['button', 'input']);

      expect(notInstalled).toEqual([]);
    });

    it('should return not installed components', () => {
      vi.mocked(fs.existsSync).mockImplementation((path: string) => !path.includes('button'));

      const notInstalled = getNotInstalled('my-app', 'component', ['button', 'input']);

      expect(notInstalled).toEqual(['button']);
    });

    it('should check correct component paths', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      getNotInstalled('my-app', 'component', ['combobox', 'select']);

      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/components/combobox',
      );
      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/components/select',
      );
    });
  });

  describe('validators', () => {
    it('should check correct validator paths', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      getNotInstalled('my-app', 'validator', ['cpf', 'cnpj']);

      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/validators/cpf.validator.ts',
      );
      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/validators/cnpj.validator.ts',
      );
    });

    it('should return not installed validators', () => {
      vi.mocked(fs.existsSync).mockImplementation((path: string) => !path.includes('cpf'));

      const notInstalled = getNotInstalled('my-app', 'validator', ['cpf', 'cnpj']);

      expect(notInstalled).toEqual(['cpf']);
    });
  });

  describe('directives', () => {
    it('should check correct directive paths', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      getNotInstalled('my-app', 'directives', ['focus', 'highlight']);

      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/directives/focus.directive.ts',
      );
      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/directives/highlight.directive.ts',
      );
    });
  });

  describe('utils', () => {
    it('should check correct util paths', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      getNotInstalled('my-app', 'utils', ['date-helper', 'string-helper']);

      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/utils/date-helper.ts',
      );
      expect(fs.existsSync).toHaveBeenCalledWith(
        '/home/user/my-app/src/app/shared/utils/string-helper.ts',
      );
    });
  });

  describe('lib', () => {
    it('should detect installed npm packages', () => {
      const mockPackageJson = {
        dependencies: {
          '@angular/core': '^21.0.0',
          tailwindcss: '^3.4.0',
        },
        devDependencies: {
          typescript: '^5.9.0',
        },
      };

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));
      vi.mocked(fs.existsSync).mockReturnValue(true);

      const notInstalled = getNotInstalled('my-app', 'lib', [
        '@angular/core',
        'typescript',
        'missing-package',
      ]);

      expect(notInstalled).toEqual(['missing-package']);
    });

    it('should check both dependencies and devDependencies', () => {
      const mockPackageJson = {
        dependencies: { '@angular/core': '^21.0.0' },
        devDependencies: { typescript: '^5.9.0' },
      };

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));
      vi.mocked(fs.existsSync).mockReturnValue(true);

      const notInstalled = getNotInstalled('my-app', 'lib', [
        '@angular/core',
        'typescript',
        'unknown',
      ]);

      expect(notInstalled).toEqual(['unknown']);
    });

    it('should handle missing dependencies object', () => {
      const mockPackageJson = {
        devDependencies: { typescript: '^5.9.0' },
      };

      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));
      vi.mocked(fs.existsSync).mockReturnValue(true);

      const notInstalled = getNotInstalled('my-app', 'lib', ['@angular/core']);

      expect(notInstalled).toEqual(['@angular/core']);
    });
  });
});
