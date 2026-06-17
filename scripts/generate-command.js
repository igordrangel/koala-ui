import { existsSync, readFileSync, writeFileSync } from 'node:fs';

function toCamelCase(value) {
  return value
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}

function toPascalCase(value) {
  const camel = toCamelCase(value);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

function printUsage() {
  console.log('Usage: bun run generate:command -- <command-name>');
  console.log('Example: bun run generate:command -- doctor');
}

function insertOnce(content, anchor, insertion) {
  if (content.includes(insertion.trim())) {
    return content;
  }

  if (!content.includes(anchor)) {
    throw new Error(`Anchor not found while updating runner: ${anchor}`);
  }

  return content.replace(anchor, `${insertion}${anchor}`);
}

function ensureCommandName(name) {
  if (!name) {
    throw new Error('Command name is required.');
  }

  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error('Command name must match: ^[a-z][a-z0-9-]*$');
  }
}

const rawName = process.argv[2];

if (!rawName || rawName === '--help' || rawName === '-h') {
  printUsage();
  process.exit(rawName ? 0 : 1);
}

ensureCommandName(rawName);

const commandName = rawName.trim();
const camelName = toCamelCase(commandName);
const pascalName = toPascalCase(commandName);
const functionName = `run${pascalName}Command`;

const commandFilePath = `libs/cli/commands/${commandName}.ts`;
const runnerPath = 'libs/cli/runner.ts';

if (existsSync(commandFilePath)) {
  throw new Error(`Command file already exists: ${commandFilePath}`);
}

const commandTemplate = `export async function ${functionName}(args: string[]): Promise<void> {
  if (args.includes('--help') || args.includes('-h')) {
    console.log('Usage: kl ${commandName}');
    return;
  }

  console.log('${commandName} command is ready. Implement your logic in libs/cli/commands/${commandName}.ts');
}
`;

writeFileSync(commandFilePath, commandTemplate);

let runnerContent = readFileSync(runnerPath, 'utf-8');

runnerContent = insertOnce(
  runnerContent,
  "import { PackageManager } from './utils/package-manager';",
  `import { ${functionName} } from './commands/${commandName}';\n`,
);

runnerContent = insertOnce(
  runnerContent,
  "  console.log('  kl install <component[,component]> [--project <name>]');",
  `  console.log('  kl ${commandName}');\n`,
);

runnerContent = insertOnce(
  runnerContent,
  "  console.log('  install  Add one or more components to the project');",
  `  console.log('  ${commandName.padEnd(8)} Add ${commandName} command');\n`,
);

const commandBlock = `
    if (command === '${commandName}') {
      await ${functionName}(args);
      return 0;
    }
`;

if (!runnerContent.includes(`if (command === '${commandName}')`)) {
  runnerContent = runnerContent.replace(
    '    console.error(`Error: command ${command} not found`);',
    `${commandBlock}\n    console.error(\`Error: command \${command} not found\`);`,
  );
}

writeFileSync(runnerPath, runnerContent);

console.log(`Created command: ${commandFilePath}`);
console.log(`Registered in runner: ${runnerPath}`);
console.log(`Run with: node ./bin/run.js ${commandName}`);
