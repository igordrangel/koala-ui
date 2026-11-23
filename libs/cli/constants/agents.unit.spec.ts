import { describe, expect, it } from 'vitest';
import { resolveAgentsFlag } from './agents';

describe('agents constants', () => {
  it('resolveAgentsFlag: --agents wins', () => {
    expect(resolveAgentsFlag({ agents: true, noAgents: true })).toBe(true);
    expect(resolveAgentsFlag({ agents: true })).toBe(true);
  });

  it('resolveAgentsFlag: --no-agents', () => {
    expect(resolveAgentsFlag({ noAgents: true })).toBe(false);
  });

  it('resolveAgentsFlag: neither flag returns undefined', () => {
    expect(resolveAgentsFlag({})).toBeUndefined();
  });
});
