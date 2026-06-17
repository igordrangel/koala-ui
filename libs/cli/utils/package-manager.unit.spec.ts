import * as fs from 'node:fs';
import prompts from 'prompts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  askPackageManager,
  detectPackageManager,
  getAngularCreateCommand,
  getPmCommands,
  getProjectExecCommand,
} from './package-manager';

vi.mock('node:fs');
vi.mock('prompts', () => ({
  default: vi.fn(),
}));
vi.mock('./project-path', () => ({
  getProjectPath: (name: string) => `/path/to/${name}`,
}));

describe('Package Manager Utils', () => {
  describe('getPmCommands', () => {
    it('should return npm commands', () => {
      const commands = getPmCommands('npm');

      expect(commands).toEqual({
        dlx: 'npx --yes',
        exec: 'npx',
        install: 'npm install',
        installDev: 'npm install -D',
        add: 'npm install',
        run: 'npm run',
      });
    });

    it('should return yarn commands', () => {
      const commands = getPmCommands('yarn');

      expect(commands).toEqual({
        dlx: 'yarn dlx',
        exec: 'yarn',
        install: 'yarn add',
        installDev: 'yarn add -D',
        add: 'yarn add',
        run: 'yarn run',
      });
    });

    it('should return pnpm commands', () => {
      const commands = getPmCommands('pnpm');

      expect(commands).toEqual({
        dlx: 'pnpm dlx',
        exec: 'pnpm exec',
        install: 'pnpm add',
        installDev: 'pnpm add -D',
        add: 'pnpm add',
        run: 'pnpm run',
      });
    });

    it('should return bun commands', () => {
      const commands = getPmCommands('bun');

      expect(commands).toEqual({
        dlx: 'bunx',
        exec: 'bunx',
        install: 'bun add',
        installDev: 'bun add -D',
        add: 'bun add',
        run: 'bun run',
      });
    });
  });

  describe('getAngularCreateCommand', () => {
    it('should build npm angular create command', () => {
      const cmd = getAngularCreateCommand('my-app', 'npm');

      expect(cmd).toBe(
        'npx --yes @angular/cli new my-app --defaults --style=tailwind --package-manager npm',
      );
    });

    it('should build yarn angular create command', () => {
      const cmd = getAngularCreateCommand('my-app', 'yarn');

      expect(cmd).toBe(
        'yarn dlx @angular/cli new my-app --defaults --style=tailwind --package-manager yarn',
      );
    });

    it('should build bun angular create command', () => {
      const cmd = getAngularCreateCommand('my-app', 'bun');

      expect(cmd).toBe(
        'bunx @angular/cli new my-app --defaults --style=tailwind --package-manager bun',
      );
    });
  });

  describe('getProjectExecCommand', () => {
    it('should use yarn format for yarn', () => {
      const cmd = getProjectExecCommand('yarn', 'build');

      expect(cmd).toBe('yarn build');
    });

    it('should use npx for npm', () => {
      const cmd = getProjectExecCommand('npm', 'build');

      expect(cmd).toBe('npx build');
    });

    it('should use pnpm exec for pnpm', () => {
      const cmd = getProjectExecCommand('pnpm', 'build');

      expect(cmd).toBe('pnpm exec build');
    });

    it('should use bunx for bun', () => {
      const cmd = getProjectExecCommand('bun', 'build');

      expect(cmd).toBe('bunx build');
    });
  });

  describe('askPackageManager', () => {
    it('should return selected package manager', async () => {
      vi.mocked(prompts).mockResolvedValue({ pm: 'bun' });

      const pm = await askPackageManager();

      expect(pm).toBe('bun');
      expect(prompts).toHaveBeenCalled();
    });

    it('should handle different selections', async () => {
      vi.mocked(prompts).mockResolvedValue({ pm: 'yarn' });

      const pm = await askPackageManager();

      expect(pm).toBe('yarn');
    });
  });

  describe('detectPackageManager', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('should detect bun when bun.lockb exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(
        (path: string) => typeof path === 'string' && path.includes('bun.lockb'),
      );

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('bun');
    });

    it('should detect bun when bun.lock exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(
        (path: string) => typeof path === 'string' && path.includes('bun.lock'),
      );

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('bun');
    });

    it('should detect yarn when yarn.lock exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(
        (path: string) => typeof path === 'string' && path.includes('yarn.lock'),
      );

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('yarn');
    });

    it('should detect pnpm when pnpm-lock.yaml exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(
        (path: string) => typeof path === 'string' && path.includes('pnpm-lock.yaml'),
      );

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('pnpm');
    });

    it('should detect npm when package-lock.json exists', () => {
      vi.mocked(fs.existsSync).mockImplementation(
        (path: string) => typeof path === 'string' && path.includes('package-lock.json'),
      );

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('npm');
    });

    it('should default to npm when no lockfile detected', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const pm = detectPackageManager('my-app');

      expect(pm).toBe('npm');
    });
  });
});
