import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const GENERATE_ICONS_PAGE = {
  pt: {
    title: 'Ícones',
    description:
      'O script nativo generate-icons.js gera classes Tailwind v4 a partir dos SVGs em public/assets/icons, para uso com a utility app-icon. Já vem no projeto com kl new / kl init — não há kl install.',
    sections: {
      howItWorks: {
        title: 'Como funciona',
        description:
          'O arquivo generate-icons.js fica na raiz do projeto. Ele lê public/assets/icons/*.svg e escreve src/theme/icons.css.',
        items: [
          'Para cada SVG, gera @utility <nome-do-arquivo> com mask-image no ::after.',
          'A base @utility app-icon em styles.css define tamanho e máscara; o ícone combina app-icon + a utility gerada.',
          'styles.css importa ./theme/icons.css (o CLI garante o import).',
          'Não edite icons.css à mão — o arquivo é regenerado automaticamente.',
        ],
      },
      addIcons: {
        title: 'Como adicionar ícones',
        description:
          'Salve o arquivo SVG em public/assets/icons/<nome>.svg (o nome do arquivo vira a classe CSS). Depois rode node generate-icons.js na raiz (ou qualquer script que já chame o gerador: prestart, prebuild, build:dev, build:prod).',
        items: [
          'Caminho obrigatório: public/assets/icons/<nome>.svg',
          'Exemplo: public/assets/icons/my-icon.svg → class="app-icon my-icon"',
          'Após salvar o SVG, rode node generate-icons.js (ou bun start / bun run build:dev) para regenerar src/theme/icons.css.',
        ],
        sourcesTitle: 'Onde baixar SVGs gratuitos',
        sourcesDescription:
          'Sugestões de bibliotecas gratuitas para uso comercial (verifique a licença de cada ícone):',
        sources: [
          { label: 'SVG Repo', url: 'https://www.svgrepo.com/' },
          { label: 'UXWing', url: 'https://uxwing.com/' },
        ],
      },
      whenItRuns: {
        title: 'Quando o script roda',
        description: 'O gerador entra nos scripts do package.json e em installs de icon sets.',
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
    },
  },
  en: {
    title: 'Icons',
    description:
      'The native generate-icons.js script builds Tailwind v4 utilities from SVGs in public/assets/icons, for use with the app-icon utility. It ships with kl new / kl init — there is no kl install.',
    sections: {
      howItWorks: {
        title: 'How it works',
        description:
          'generate-icons.js lives at the project root. It reads public/assets/icons/*.svg and writes src/theme/icons.css.',
        items: [
          'For each SVG, it emits @utility <file-name> with mask-image on ::after.',
          'The base @utility app-icon in styles.css sets size and mask; icons combine app-icon + the generated utility.',
          'styles.css imports ./theme/icons.css (CLI ensures the import).',
          'Do not edit icons.css by hand — it is regenerated automatically.',
        ],
      },
      addIcons: {
        title: 'How to add icons',
        description:
          'Save the SVG at public/assets/icons/<name>.svg (the file name becomes the CSS class). Then run node generate-icons.js at the project root (or any script that already calls the generator: prestart, prebuild, build:dev, build:prod).',
        items: [
          'Required path: public/assets/icons/<name>.svg',
          'Example: public/assets/icons/my-icon.svg → class="app-icon my-icon"',
          'After saving the SVG, run node generate-icons.js (or bun start / bun run build:dev) to regenerate src/theme/icons.css.',
        ],
        sourcesTitle: 'Where to download free SVGs',
        sourcesDescription:
          'Suggested free libraries for commercial use (check each icon’s license):',
        sources: [
          { label: 'SVG Repo', url: 'https://www.svgrepo.com/' },
          { label: 'UXWing', url: 'https://uxwing.com/' },
        ],
      },
      whenItRuns: {
        title: 'When the script runs',
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
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type GenerateIconsPageCopy = (typeof GENERATE_ICONS_PAGE)[Locale];
