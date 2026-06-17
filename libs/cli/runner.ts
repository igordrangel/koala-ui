import * as fs from 'node:fs';
import * as path from 'node:path';
import { runInstallCommand } from './commands/install';
import { runInitCommand } from './commands/init';
import { runNewCommand } from './commands/new';
import { PackageManager } from './utils/package-manager';

function getCliVersion(): string {
  try {
    // runner.js lives in `<packageRoot>/cli/` (published) or `<packageRoot>/dist/cli/` (local build)
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent) as { version?: string };

    return typeof packageJson.version === 'string' ? packageJson.version : 'unknown';
  } catch {
    return 'unknown';
  }
}

function getFlagValue(args: string[], longName: string, shortName: string): string | undefined {
  const longIndex = args.indexOf(`--${longName}`);
  if (longIndex >= 0 && args[longIndex + 1]) {
    return args[longIndex + 1];
  }

  const shortIndex = args.indexOf(`-${shortName}`);
  if (shortIndex >= 0 && args[shortIndex + 1]) {
    return args[shortIndex + 1];
  }

  return undefined;
}

function hasFlag(args: string[], longName: string, shortName?: string): boolean {
  return args.includes(`--${longName}`) || (shortName ? args.includes(`-${shortName}`) : false);
}

function getFirstPositionalArg(args: string[]): string | undefined {
  for (let i = 0; i < args.length; i++) {
    const current = args[i];
    if (!current.startsWith('-')) {
      return current;
    }

    // Skip flag value when format is "--flag value" or "-f value"
    if (
      (current.startsWith('--') || current.startsWith('-')) &&
      args[i + 1] &&
      !args[i + 1].startsWith('-')
    ) {
      i += 1;
    }
  }

  return undefined;
}

function printBanner() {
  console.log(' _  __             _       _   _ ___ ');
  console.log('| |/ /___   __ _  | | __ _| | | |_ _|');
  console.log("| ' // _ \\ / _` | | |/ _` | | | || | ");
  console.log('| . \\ (_) | (_| | | | (_| | |_| || | ');
  console.log('|_|\\_\\___/ \\__,_| |_|\\__,_|\\___/|___|');
  console.log('');
}

function printHelp() {
  printBanner();
  console.log('Usage:');
  console.log('  kl new <project> [--pm bun|npm|yarn|pnpm] [--verbose]');
  console.log('  kl init [--project <name>] [--verbose]');
  console.log('  kl install <component[,component]> [--project <name>] [--verbose]');
  console.log('  kl version');
  console.log('');
  console.log('Commands:');
  console.log('  new      Create a new UI project');
  console.log('  init     Initialize an existing Angular project with Koala');
  console.log('  install  Add one or more components to the project');
  console.log('  version  Show the CLI version');
}

function printInstallHelp() {
  console.log('add a component to the project');
  console.log('');
  console.log('USAGE');
  console.log('  $ kl install <value> [-p <value>] [--verbose]');
  console.log('  $ kl install -n <value> [-p <value>] [--verbose]');
  console.log('');
  console.log('FLAGS');
  console.log(
    '  -n, --name=<value>     list of components to install. Separate multiple components with a comma',
  );
  console.log('  -p, --project=<value>  name of the project');
  console.log('  -v, --verbose          show detailed install logs');
}

function printInitHelp() {
  console.log('initialize an existing Angular project with Koala');
  console.log('');
  console.log('USAGE');
  console.log('  $ kl init');
  console.log('  $ kl init [-p <value>] [--verbose]');
  console.log('');
  console.log('FLAGS');
  console.log('  -p, --project=<value>  name of the project (defaults to current directory)');
  console.log('  -v, --verbose          show detailed logs');
  console.log('');
  console.log('This command will:');
  console.log('  • Validate the Angular project structure');
  console.log('  • Create the standard folder structure if needed');
  console.log('  • Detect and adapt to existing test frameworks');
  console.log('  • Configure Vitest and Playwright if no tests are found');
  console.log('  • Install required dependencies');
  console.log('  • Set up ESLint and VS Code configuration');
}

export async function runCli(argv: string[]): Promise<number> {
  const [command, ...args] = argv;

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return 0;
  }

  if (command === 'version' || command === '--version' || command === '-V') {
    console.log(getCliVersion());
    return 0;
  }

  try {
    if (command === 'new') {
      if (hasFlag(args, 'help', 'h')) {
        console.log('Usage: kl new <project> [--pm bun|npm|yarn|pnpm] [--verbose]');
        console.log('       kl new --name <project> [--pm bun|npm|yarn|pnpm] [--verbose]');
        return 0;
      }

      const name = getFirstPositionalArg(args) ?? getFlagValue(args, 'name', 'n');
      const pm = getFlagValue(args, 'pm', 'm') as PackageManager | undefined;
      const verbose = hasFlag(args, 'verbose', 'v');
      await runNewCommand({ name: name ?? '', pm, verbose });
      return 0;
    }

    if (command === 'init') {
      if (hasFlag(args, 'help', 'h')) {
        printInitHelp();
        return 0;
      }

      const project = getFlagValue(args, 'project', 'p');
      const verbose = hasFlag(args, 'verbose', 'v');
      await runInitCommand({ project, verbose });
      return 0;
    }

    if (command === 'install') {
      if (hasFlag(args, 'help', 'h')) {
        printInstallHelp();
        return 0;
      }

      const name = getFirstPositionalArg(args) ?? getFlagValue(args, 'name', 'n');
      const project = getFlagValue(args, 'project', 'p');
      const verbose = hasFlag(args, 'verbose', 'v');
      await runInstallCommand({ name: name ?? '', project, verbose });
      return 0;
    }

    console.error(`Error: command ${command} not found`);
    printHelp();
    return 1;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return 1;
  }
}
