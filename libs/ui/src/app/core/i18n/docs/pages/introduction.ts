import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const INTRODUCTION_PAGE = {
  pt: {
    title: 'Introdução',
    description:
      'Bem-vindo à documentação do Koala UI! Este guia ajuda você a começar com a biblioteca de componentes e a integrá-la aos seus projetos.',
    sections: {
      whatIs: {
        title: 'O que é o Koala UI?',
        description:
          'Finalmente, uma biblioteca de componentes que não te obriga a escolher entre beleza e funcionalidade.',
        cards: [
          {
            title: 'Bonito e prático',
            description:
              'Componentes cuidadosamente feitos que já nascem bonitos, sem abrir mão de funcionalidade e acessibilidade.',
          },
          {
            title: 'Comunidade em primeiro lugar',
            description:
              'Feito por desenvolvedores Angular que entendem suas necessidades. Soluções reais para problemas reais.',
          },
          {
            title: 'Angular moderno',
            description:
              'Aproveitando os recursos mais recentes do Angular, incluindo standalone components, signals e boas práticas.',
          },
          {
            title: 'Infinitamente customizável',
            description:
              'Feito com TailwindCSS para customização sem atrito. Deixe cada componente com a sua cara.',
          },
        ],
      },
      powerfulCli: {
        title: 'CLI poderoso',
        description:
          'Nossa interface de linha de comando torna trivial adicionar componentes e resources ao projeto. Sem copiar e colar código ou caçar documentação.',
        cards: [
          {
            title: 'Instalação inteligente',
            description:
              'Cuida automaticamente de dependências, imports e configuração. Basta dizer o que precisa — o resto a gente resolve.',
          },
          {
            title: 'Integração com o projeto',
            description:
              'Integra-se à estrutura do seu projeto Angular existente. Respeita suas convenções e estilo de código.',
          },
          {
            title: 'Amigável para desenvolvedores',
            description:
              'Feedback claro, mensagens de erro úteis e comandos intuitivos. Feito para melhorar o fluxo de desenvolvimento, não complicá-lo.',
          },
        ],
      },
      aiReady: {
        title: 'Pronto para IA',
        description:
          'O Koala UI está pronto para desenvolvimento assistido por IA. Você pode copiar a URL do índice completo (llms.txt) no header, a URL Markdown da página atual com Copy for AI, ou gerar contexto no projeto com a CLI.',
        cards: [
          {
            title: 'Links diretos para LLMs',
            description:
              'Use Copy AI docs index no header para compartilhar o llms.txt com seu assistente e ele descobrir o mapa completo da documentação.',
          },
          {
            title: 'Contexto por página',
            description:
              'Use Copy for AI em cada página para enviar uma URL focada (docs/slug.md), dando ao LLM contexto preciso do componente em que você está trabalhando.',
          },
          {
            title: 'Contexto no projeto (CLI)',
            description:
              'No kl new / kl init escolha Cursor e/ou GitHub Copilot, ou rode kl add ai-context cursor|github em projetos existentes. Gera AGENTS.md e regras do editor sem sobrescrever customizações.',
          },
        ],
      },
    },
  },
  en: {
    title: 'Introduction',
    description:
      'Welcome to the Koala UI documentation! This guide will help you get started with our component library and show you how to integrate it into your projects.',
    sections: {
      whatIs: {
        title: 'What is Koala UI?',
        description:
          "Finally, a component library that doesn't force you to choose between beauty and functionality.",
        cards: [
          {
            title: 'Beautiful & Practical',
            description:
              'Meticulously crafted components that look stunning out of the box while remaining highly functional and accessible.',
          },
          {
            title: 'Community First',
            description:
              'Built by Angular developers who understand your needs. Real-world solutions to real problems.',
          },
          {
            title: 'Modern Angular',
            description:
              'Leveraging the latest Angular features including standalone components, signals, and best practices.',
          },
          {
            title: 'Infinitely Customizable',
            description:
              'Built with TailwindCSS for seamless customization. Make every component truly yours.',
          },
        ],
      },
      powerfulCli: {
        title: 'Powerful CLI',
        description:
          'Our command-line interface makes adding components and resources to your project effortless. No more copy-pasting code or hunting through documentation.',
        cards: [
          {
            title: 'Smart Installation',
            description:
              "Automatically handles dependencies, imports, and configuration. Just specify what you need, and we'll handle the rest.",
          },
          {
            title: 'Project Integration',
            description:
              'Seamlessly integrates with your existing Angular project structure. Respects your conventions and coding style.',
          },
          {
            title: 'Developer Friendly',
            description:
              'Clear feedback, helpful error messages, and intuitive commands. Designed to enhance your development workflow, not complicate it.',
          },
        ],
      },
      aiReady: {
        title: 'AI Ready',
        description:
          'Koala UI is ready for AI-assisted development. You can copy the full docs index URL (llms.txt) from the header, copy the current page Markdown URL with Copy for AI, or scaffold project context via the CLI.',
        cards: [
          {
            title: 'Direct Links for LLMs',
            description:
              'Use Copy AI docs index in the header to share llms.txt with your assistant so it can discover the full documentation map.',
          },
          {
            title: 'Page-Level Context',
            description:
              'Use Copy for AI on each page to send a focused docs URL (docs/slug.md), giving your LLM precise context for the component you are working on.',
          },
          {
            title: 'Project context (CLI)',
            description:
              'In kl new / kl init pick Cursor and/or GitHub Copilot, or run kl add ai-context cursor|github on existing projects. Scaffolds AGENTS.md and editor rules without overwriting customizations.',
          },
        ],
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type IntroductionPageCopy = (typeof INTRODUCTION_PAGE)[Locale];
