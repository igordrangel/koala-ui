import chalk from 'chalk';
import prompts from 'prompts';
import {
  AI_CONTEXT_PROMPT_LABELS,
  AiContextPromptChoice,
  resolveAiContextTargetsFromPrompt,
  type AiContextTarget,
} from '../constants/ai-context';

export async function promptAiContext(): Promise<AiContextTarget[]> {
  const response = await prompts(
    {
      type: 'select',
      name: 'choice',
      message: `${chalk.cyan('KoalaUI')} Contexto AI (Cursor / GitHub Copilot)`,
      hint: '- Use arrow keys and Enter',
      choices: [
        {
          title: AI_CONTEXT_PROMPT_LABELS[AiContextPromptChoice.NONE],
          value: AiContextPromptChoice.NONE,
        },
        {
          title: AI_CONTEXT_PROMPT_LABELS[AiContextPromptChoice.CURSOR],
          value: AiContextPromptChoice.CURSOR,
          description: '.cursor/rules + AGENTS.md',
        },
        {
          title: AI_CONTEXT_PROMPT_LABELS[AiContextPromptChoice.GITHUB],
          value: AiContextPromptChoice.GITHUB,
          description: '.github/copilot-instructions.md + AGENTS.md',
        },
        {
          title: AI_CONTEXT_PROMPT_LABELS[AiContextPromptChoice.BOTH],
          value: AiContextPromptChoice.BOTH,
        },
      ],
      initial: 0,
    },
    {
      onCancel: () => {
        throw new Error('KoalaUI: AI context selection was cancelled.');
      },
    },
  );

  return resolveAiContextTargetsFromPrompt(response.choice as AiContextPromptChoice);
}
