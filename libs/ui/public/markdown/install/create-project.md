```bash
kl new example

# with custom package manager
kl new example --pm pnpm

# skip AI context prompt
kl new example --ai-context none

# scaffold Cursor + Copilot context without prompting
kl new example --ai-context both

# non-interactive (AI agents / CI): bun + AI context none
kl new example --silent

# non-interactive with overrides
kl new example --silent --pm pnpm --ai-context both
```
