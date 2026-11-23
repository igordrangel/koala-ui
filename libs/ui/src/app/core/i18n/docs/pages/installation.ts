import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INSTALLATION_PAGE = {
  pt: {
    title: 'Instalação',
    description:
      'Coloque o Koala UI para rodar em minutos. O processo de instalação é direto para você começar a construir aplicações Angular bonitas sem complicação.',
    sections: {
      installCli: {
        title: 'Instalar o CLI',
      },
      creatingNewProject: {
        title: 'Criar um novo projeto',
        otherProse: [
          'kl new e kl init instalam @koalarx/utils ≥ 5 e clsx como dependências base. Veja a documentação do utils e o llms.txt para a API completa.',
          'Durante o setup, a CLI pergunta se deve configurar agentes de IA. Use --agents ou --no-agents para pular o prompt, ou kl add agents depois. Guia: Getting Started → Agentes de IA.',
          'Em agentes de IA ou CI, use --silent: no new/init pula prompts (bun + agents off por padrão); no install aceita todas as libs externas sem perguntar.',
        ],
      },
      addingComponents: {
        title: 'Adicionar componentes',
        otherProse: [
          'Use kl install <componentes> --silent para instalar dependências externas sem prompts interativos.',
        ],
      },
      addingAiContext: {
        title: 'Adicionar agentes de IA',
        description:
          'Em projetos existentes, gere AGENTS.md e .agents/ (instructions + skills) para agentes de IA. Remove o scaffolding legado Cursor/Copilot da Koala, se existir. Detalhes na página Agentes de IA.',
      },
      addingInitialStructure: {
        title: 'Adicionar estrutura inicial',
        description:
          'O Koala UI aplica uma estrutura inicial a um projeto existente, com pastas e arquivos predefinidos, para organizar o projeto com eficiência.',
        otherProse: ['Para este comando você precisa ter um projeto Angular existente.'],
      },
    },
  },
  en: {
    title: 'Installation',
    description:
      'Get up and running with Koala UI in minutes. Our streamlined installation process ensures you can start building beautiful Angular applications without any hassle.',
    sections: {
      installCli: {
        title: 'Install CLI',
      },
      creatingNewProject: {
        title: 'Creating new project',
        otherProse: [
          'kl new and kl init install @koalarx/utils ≥ 5 and clsx as base dependencies. See the utils docs and llms.txt for the full API.',
          'During setup, the CLI asks whether to configure AI agents. Use --agents or --no-agents to skip the prompt, or kl add agents later. Guide: Getting Started → AI Agents.',
          'For AI agents or CI, use --silent: on new/init it skips prompts (bun + agents off by default); on install it accepts all external libs without asking.',
        ],
      },
      addingComponents: {
        title: 'Adding components',
        otherProse: [
          'Use kl install <components> --silent to install external dependencies without interactive prompts.',
        ],
      },
      addingAiContext: {
        title: 'Add AI agents',
        description:
          'On existing projects, scaffold AGENTS.md and .agents/ (instructions + skills) for AI agents. Removes legacy Koala Cursor/Copilot scaffolding if present. See the AI Agents guide.',
      },
      addingInitialStructure: {
        title: 'Adding initial structure',
        description:
          'Koala UI applies an initial structure to an existing project, with predefined folders and files, to help organize the project efficiently.',
        otherProse: ['For this command you need to have an existing angular project.'],
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InstallationPageCopy = (typeof INSTALLATION_PAGE)[Locale];
