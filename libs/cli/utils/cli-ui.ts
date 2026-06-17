import chalk from 'chalk';
import type { InstallResult } from '../models/install-result';

type Logger = (message?: string) => void;

export function logHeader(log: Logger, title: string, subtitle?: string) {
  log(chalk.cyan('========================================'));
  log(chalk.cyan(title));
  if (subtitle) {
    log(chalk.dim(subtitle));
  }
  log(chalk.cyan('========================================'));
}

export function logStep(log: Logger, message: string) {
  log(chalk.cyan(`ℹ  ${message}`));
}

export function logSuccess(log: Logger, message: string) {
  log(chalk.green(`✔  ${message}`));
}

export function logWarning(log: Logger, message: string) {
  log(chalk.yellow(`⚠  ${message}`));
}

export function logError(log: Logger, message: string) {
  log(chalk.red(`✖  ${message}`));
}

export function logList(log: Logger, label: string, values: string[]) {
  if (values.length === 0) {
    return;
  }

  log(`${label} (${values.length}):`);
  for (const value of values) {
    log(`  - ${value}`);
  }
}

const SECTION_ICONS: Record<string, string> = {
  libs: '📦',
  directives: '🔧',
  validators: '✅',
  utils: '🛠️ ',
  base: '🧱',
  components: '🧩',
  css: '🎨',
  coreResources: '🔑',
};

export function logInstallSummary(log: Logger, component: string, result: InstallResult) {
  const sections: Array<{ key: keyof Omit<InstallResult, 'missingLibs'>; label: string }> = [
    { key: 'libs', label: 'libs' },
    { key: 'directives', label: 'directives' },
    { key: 'validators', label: 'validators' },
    { key: 'utils', label: 'utils' },
    { key: 'base', label: 'base' },
    { key: 'components', label: 'components' },
    { key: 'css', label: 'css' },
    { key: 'coreResources', label: 'core resources' },
  ];

  const filled = sections.filter((s) => result[s.key].length > 0);

  if (filled.length === 0) {
    return;
  }

  const width = 44;
  const line = '─'.repeat(width);

  log('');
  log(chalk.dim(`  ┌${line}┐`));
  log(
    chalk.dim(`  │`) +
      chalk.bold(`  ${component}`) +
      chalk.dim(' installed the following:').padEnd(width - component.length - 2) +
      chalk.dim('│'),
  );
  log(chalk.dim(`  ├${line}┤`));

  for (const section of filled) {
    const items = result[section.key] as string[];
    const icon = SECTION_ICONS[section.key] ?? '  ';
    const header = `${icon}  ${section.label} (${items.length})`;
    log(chalk.dim('  │ ') + chalk.cyan(header));
    for (const item of items) {
      log(chalk.dim('  │     · ') + item);
    }
    log(chalk.dim('  │'));
  }

  log(chalk.dim(`  └${line}┘`));
  log('');
}
