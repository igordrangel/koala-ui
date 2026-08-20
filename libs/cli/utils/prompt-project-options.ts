import chalk from 'chalk';
import prompts from 'prompts';

export type ProjectType = 'app' | 'library';

export async function askProjectType(): Promise<ProjectType> {
  const response = await prompts(
    {
      type: 'select',
      name: 'type',
      message: `${chalk.cyan('KoalaUI')} Select project type`,
      hint: '- Use arrow keys and Enter',
      choices: [
        { title: 'Application', value: 'app' as const, description: 'Full Angular app with UI shell' },
        {
          title: 'Library',
          value: 'library' as const,
          description: 'Angular workspace + publishable library',
        },
      ],
      initial: 0,
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: project type selection was cancelled.');
      },
    },
  );

  return response.type as ProjectType;
}

export async function askSsr(): Promise<boolean> {
  const response = await prompts(
    {
      type: 'confirm',
      name: 'ssr',
      message: `${chalk.cyan('KoalaUI')} Enable SSR (Server-Side Rendering)?`,
      initial: false,
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: SSR selection was cancelled.');
      },
    },
  );

  return response.ssr as boolean;
}
