import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const GENERATE_ICONS_PAGE = {
  pt: {
    title: 'Generate Icons',
    description:
      'O script nativo generate-icons.js gera classes Tailwind v4 a partir dos SVGs em public/assets/icons, para uso com a utility app-icon.',
    sections: {
      howItWorks: {
        title: 'Como funciona',
        description:
          'No scaffold (kl new / kl init) o arquivo generate-icons.js fica na raiz do projeto. Ele lê public/assets/icons/*.svg e escreve src/theme/icons.css.',
        items: [
          'Para cada SVG, gera @utility <nome-do-arquivo> com mask-image no ::after.',
          'A base @utility app-icon em styles.css define tamanho e máscara; o ícone combina app-icon + a utility gerada.',
          'styles.css importa ./theme/icons.css (o CLI garante o import).',
          'Não edite icons.css à mão — o arquivo é regenerado automaticamente.',
        ],
      },
      whenItRuns: {
        title: 'Quando roda',
        description: 'O script entra nos scripts do package.json e em installs de icon sets.',
        items: [
          'prestart / prebuild / build:dev / build:prod (node generate-icons.js).',
          'Após kl install de sets de ícones (ex.: text-editor-icons).',
          'Manual: node generate-icons.js na raiz do projeto.',
        ],
      },
      usage: {
        title: 'Uso',
        description: 'Use o nome do arquivo SVG (sem extensão) junto com app-icon.',
      },
      custom: {
        title: 'Ícones customizados',
        description:
          'Coloque um SVG em public/assets/icons/<nome>.svg, rode node generate-icons.js e use class="app-icon <nome>".',
      },
    },
  },
  en: {
    title: 'Generate Icons',
    description:
      'The native generate-icons.js script builds Tailwind v4 utilities from SVGs in public/assets/icons, for use with the app-icon utility.',
    sections: {
      howItWorks: {
        title: 'How it works',
        description:
          'On scaffold (kl new / kl init) generate-icons.js is placed at the project root. It reads public/assets/icons/*.svg and writes src/theme/icons.css.',
        items: [
          'For each SVG, it emits @utility <file-name> with mask-image on ::after.',
          'The base @utility app-icon in styles.css sets size and mask; icons combine app-icon + the generated utility.',
          'styles.css imports ./theme/icons.css (CLI ensures the import).',
          'Do not edit icons.css by hand — it is regenerated automatically.',
        ],
      },
      whenItRuns: {
        title: 'When it runs',
        description: 'Wired into package.json scripts and icon-set installs.',
        items: [
          'prestart / prebuild / build:dev / build:prod (node generate-icons.js).',
          'After kl install of icon sets (e.g. text-editor-icons).',
          'Manual: node generate-icons.js at the project root.',
        ],
      },
      usage: {
        title: 'Usage',
        description: 'Use the SVG file name (without extension) together with app-icon.',
      },
      custom: {
        title: 'Custom icons',
        description:
          'Drop an SVG into public/assets/icons/<name>.svg, run node generate-icons.js, then use class="app-icon <name>".',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type GenerateIconsPageCopy = (typeof GENERATE_ICONS_PAGE)[Locale];
