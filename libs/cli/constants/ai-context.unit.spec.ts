import { describe, expect, it } from 'vitest';
import {
  AiContextPromptChoice,
  AiContextTarget,
  formatAiContextTargets,
  parseAiContextFlag,
  parseAiContextTarget,
  resolveAiContextTargetsFromPrompt,
} from '../constants/ai-context';

describe('ai-context constants', () => {
  it('parseia alvos e aliases', () => {
    expect(parseAiContextTarget('cursor')).toBe(AiContextTarget.CURSOR);
    expect(parseAiContextTarget('github')).toBe(AiContextTarget.GITHUB);
    expect(parseAiContextTarget('copilot')).toBe(AiContextTarget.GITHUB);
    expect(() => parseAiContextTarget('vscode')).toThrow(/desconhecido/);
  });

  it('parseia flag --ai-context', () => {
    expect(parseAiContextFlag('none')).toEqual([]);
    expect(parseAiContextFlag('cursor')).toEqual([AiContextTarget.CURSOR]);
    expect(parseAiContextFlag('both')).toEqual([
      AiContextTarget.CURSOR,
      AiContextTarget.GITHUB,
    ]);
  });

  it('resolve escolha do prompt', () => {
    expect(resolveAiContextTargetsFromPrompt(AiContextPromptChoice.NONE)).toEqual([]);
    expect(resolveAiContextTargetsFromPrompt(AiContextPromptChoice.BOTH)).toEqual([
      AiContextTarget.CURSOR,
      AiContextTarget.GITHUB,
    ]);
  });

  it('formata labels', () => {
    expect(formatAiContextTargets([])).toBe('none');
    expect(formatAiContextTargets([AiContextTarget.CURSOR])).toContain('Cursor');
  });
});
