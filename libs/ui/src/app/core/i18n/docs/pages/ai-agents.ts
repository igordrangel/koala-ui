import type { Locale } from '../../locale.types';
import type { DocPageCopy } from '../types';

export const AI_AGENTS_PAGE = {
  pt: {
    title: 'Agentes de IA',
    description:
      'Configure contexto IDE-agnóstico para agentes de IA com AGENTS.md e a pasta .agents/. Funciona em Cursor, GitHub Copilot e outras IDEs que leem AGENTS.md.',
    sections: {
      whatIs: {
        title: 'O que é',
        description:
          'O pacote de agentes gera um índice AGENTS.md na raiz do projeto e instruções/skills em .agents/. O agente começa pelo AGENTS.md e abre os arquivos apontados conforme a tarefa — sem regras exclusivas de um editor.',
      },
      install: {
        title: 'Como instalar',
        description:
          'Em projetos existentes use kl add agents. Em kl new / kl init, confirme no prompt ou passe --agents / --no-agents. Com --silent, agents ficam desligados salvo se você passar --agents.',
        otherProse: [
          'kl add agents remove a estrutura antiga (.cursor/rules/koala-*.mdc e .github/copilot-instructions.md), se existir, e recria o pacote novo.',
        ],
      },
      structure: {
        title: 'O que é gerado',
        description: 'Árvore instalada na raiz do projeto:',
        otherProse: [
          'AGENTS.md é só o índice (When → Read). Detalhes ficam nos .md de instructions e skills.',
        ],
      },
      howAgentsUse: {
        title: 'Como o agente usa',
        description:
          'Peça ao agente para ler AGENTS.md primeiro. A tabela When → Read indica qual instruction abrir (estrutura, componentes, Angular, docs).',
      },
      codeReview: {
        title: 'Skill de revisão',
        description: 'Para ativar a revisão completa com padrões Koala, diga ao agente:',
        otherProse: [
          'A skill cobre boas práticas, padrões Angular (via MCP Angular quando disponível), Clean Code, abstração/componentização e uso padronizado da biblioteca (docs / MCP koala-ui-docs / kl install).',
        ],
      },
      mcps: {
        title: 'MCPs recomendados',
        otherProse: [
          'koala-ui-docs — read_koala_ui_doc, search_koala_ui_docs, list_koala_ui_docs.',
          'Angular (angular-cli via @angular/cli mcp) — convenções oficiais do framework; ver https://angular.dev/ai/mcp.',
        ],
      },
      upgrade: {
        title: 'Upgrade do contexto antigo',
        description:
          'Projetos com kl add ai-context (Cursor/Copilot) devem rodar kl add agents uma vez. A CLI remove os arquivos legados Koala e escreve AGENTS.md + .agents/.',
      },
    },
  },
  en: {
    title: 'AI Agents',
    description:
      'Scaffold IDE-agnostic AI agent context with AGENTS.md and the .agents/ folder. Works in Cursor, GitHub Copilot, and other IDEs that read AGENTS.md.',
    sections: {
      whatIs: {
        title: 'What it is',
        description:
          'The agents pack writes an AGENTS.md index at the project root plus instructions/skills under .agents/. Agents start from AGENTS.md and open the linked files for the task — no editor-only rules.',
      },
      install: {
        title: 'How to install',
        description:
          'On existing projects run kl add agents. During kl new / kl init, confirm the prompt or pass --agents / --no-agents. With --silent, agents stay off unless you pass --agents.',
        otherProse: [
          'kl add agents removes the legacy structure (.cursor/rules/koala-*.mdc and .github/copilot-instructions.md) if present, then recreates the new pack.',
        ],
      },
      structure: {
        title: 'What gets generated',
        description: 'Tree installed at the project root:',
        otherProse: [
          'AGENTS.md is only the index (When → Read). Details live in the instruction and skill markdown files.',
        ],
      },
      howAgentsUse: {
        title: 'How the agent uses it',
        description:
          'Ask the agent to read AGENTS.md first. The When → Read table points to the right instruction (structure, components, Angular, docs).',
      },
      codeReview: {
        title: 'Code review skill',
        description: 'To run a full review with Koala standards, tell the agent:',
        otherProse: [
          'The skill covers best practices, Angular team patterns (via Angular MCP when available), Clean Code, abstraction/componentization, and library-standard usage (docs / koala-ui-docs MCP / kl install).',
        ],
      },
      mcps: {
        title: 'Recommended MCPs',
        otherProse: [
          'koala-ui-docs — read_koala_ui_doc, search_koala_ui_docs, list_koala_ui_docs.',
          'Angular (angular-cli via @angular/cli mcp) — official framework conventions; see https://angular.dev/ai/mcp.',
        ],
      },
      upgrade: {
        title: 'Upgrading from the old context',
        description:
          'Projects that used kl add ai-context (Cursor/Copilot) should run kl add agents once. The CLI removes Koala legacy files and writes AGENTS.md + .agents/.',
      },
    },
  },
} as const satisfies Record<Locale, DocPageCopy>;

export type AiAgentsPageCopy = (typeof AI_AGENTS_PAGE)[Locale];
