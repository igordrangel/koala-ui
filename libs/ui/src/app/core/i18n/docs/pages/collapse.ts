import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const COLLAPSE_PAGE = {
  pt: {
    title: 'Collapse',
    description: 'Componentes collapse mostram e escondem conteúdo em formato expansível.',
    sections: {
      installation: {
        title: 'Instalação',
        description: 'Use o Koala CLI para gerar um novo componente collapse.',
      },
      expansivePanel: {
        title: 'Painel expansível',
        description: 'O painel expansível mostra e esconde conteúdo. É uma forma simples de gerenciar espaço na página sem perder acesso a informações extras.',
      },
      accordion: {
        title: 'Accordion',
        description: 'O accordion mostra e esconde conteúdo. É parecido com o painel expansível, mas permite vários painéis abertos ao mesmo tempo.',
      },
    },
  },
  en: {
    title: 'Collapse',
    description: 'Collapse components can be used to show and hide content in a collapsible format.',
    sections: {
      installation: {
        title: 'Installation',
        description: 'Use the Koala CLI to generate a new collapse component.',
      },
      expansivePanel: {
        title: 'Expansive panel',
        description: 'The expansive panel is a collapsible component that can be used to show and hide content. It is a simple and effective way to manage space on a page while still providing access to additional information when needed.',
      },
      accordion: {
        title: 'Accordion',
        description: 'The accordion is a collapsible component that can be used to show and hide content. It is similar to the expansive panel, but it allows for multiple panels to be open at the same time.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type CollapsePageCopy = (typeof COLLAPSE_PAGE)[Locale];
