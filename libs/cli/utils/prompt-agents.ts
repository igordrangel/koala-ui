import chalk from 'chalk';
import prompts from 'prompts';

/** Pergunta se deve configurar o pacote de agentes de IA. */
export async function promptAgents(): Promise<boolean> {
  const response = await prompts(
    {
      type: 'confirm',
      name: 'agents',
      message: `${chalk.cyan('KoalaUI')} Configurar agentes de IA? (AGENTS.md + .agents/)`,
      initial: false,
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: AI agents selection was cancelled.');
      },
    },
  );

  return Boolean(response.agents);
}
