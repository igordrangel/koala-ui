import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INSTALLATION_PAGE = {
  pt: {
    title: 'Instalação',
    description: 'Coloque o Koala UI para rodar em minutos. O processo de instalação é direto para você começar a construir aplicações Angular bonitas sem complicação.',
    sections: {
      installCli: {
        title: 'Instalar o CLI',
      },
      creatingNewProject: {
        title: 'Criar um novo projeto',
        otherProse: [
          'kl new e kl init instalam @koalarx/utils ≥ 5 e clsx como dependências base. Veja a documentação do utils e o llms.txt para a API completa.',
        ],
      },
      addingComponents: {
        title: 'Adicionar componentes',
      },
      addingInitialStructure: {
        title: 'Adicionar estrutura inicial',
        description: 'O Koala UI aplica uma estrutura inicial a um projeto existente, com pastas e arquivos predefinidos, para organizar o projeto com eficiência.',
        otherProse: [
          'Para este comando você precisa ter um projeto Angular existente.',
        ],
      },
    },
  },
  en: {
    title: 'Installation',
    description: 'Get up and running with Koala UI in minutes. Our streamlined installation process ensures you can start building beautiful Angular applications without any hassle.',
    sections: {
      installCli: {
        title: 'Install CLI',
      },
      creatingNewProject: {
        title: 'Creating new project',
        otherProse: [
          'kl new and kl init install @koalarx/utils ≥ 5 and clsx as base dependencies. See the utils docs and llms.txt for the full API.',
        ],
      },
      addingComponents: {
        title: 'Adding components',
      },
      addingInitialStructure: {
        title: 'Adding initial structure',
        description: 'Koala UI applies an initial structure to an existing project, with predefined folders and files, to help organize the project efficiently.',
        otherProse: [
          'For this command you need to have an existing angular project.',
        ],
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type InstallationPageCopy = (typeof INSTALLATION_PAGE)[Locale];
