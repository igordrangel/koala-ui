import { SpawnOptions, spawn } from 'node:child_process';
import chalk from 'chalk';

export interface RunCommandOptions extends SpawnOptions {
  loaderText?: string;
  verbose?: boolean;
}

function startSpinner(text: string): () => void {
  if (!process.stdout.isTTY) {
    return () => undefined;
  }

  const frames = ['   ', '.  ', '.. ', '...'];
  let index = 0;

  process.stdout.write(`\r${chalk.cyan('ℹ')}  ${chalk.blue(text)}${frames[index]}`);

  const timer = setInterval(() => {
    index = (index + 1) % frames.length;
    process.stdout.write(`\r${chalk.cyan('ℹ')}  ${chalk.blue(text)}${frames[index]}`);
  }, 120);

  return () => {
    clearInterval(timer);
    process.stdout.write('\r\x1b[2K');
  };
}

export async function runCommand(command: string, options: RunCommandOptions = {}) {
  const { verbose = true, loaderText = 'Working', ...spawnOptions } = options;

  return await new Promise<{ status: number; stdout: string; stderr: string }>(
    (resolve, reject) => {
      const child = spawn(command, {
        ...spawnOptions,
        shell: true,
        stdio: verbose ? 'inherit' : 'pipe',
      });

      let stdout = '';
      let stderr = '';
      const stopSpinner = verbose ? () => undefined : startSpinner(loaderText);

      child.stdout?.on('data', (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr?.on('data', (chunk) => {
        stderr += chunk.toString();
      });

      child.on('error', (error) => {
        stopSpinner();
        reject(error);
      });

      child.on('close', (status) => {
        stopSpinner();

        if (status !== 0) {
          if (!verbose) {
            const output = [stdout, stderr].filter(Boolean).join('\n').trim();
            if (output) {
              reject(new Error(`Command failed with exit code ${status}: ${command}\n${output}`));
              return;
            }
          }

          reject(new Error(`Command failed with exit code ${status}: ${command}`));
          return;
        }

        resolve({ status: status ?? 0, stdout, stderr });
      });
    },
  );
}
