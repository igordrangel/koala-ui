```bash
kl new example

# with custom package manager
kl new example --pm pnpm

# application with SSR
kl new example --ssr

# Angular library workspace
kl new example --type library

# skip AI context prompt
kl new example --ai-context none

# scaffold Cursor + Copilot context without prompting
kl new example --ai-context both

# non-interactive (AI agents / CI): bun + app + no SSR + AI context none
kl new example --silent

# non-interactive with overrides
kl new example --silent --pm pnpm --type app --ssr --ai-context both
```

Prompts (interactive, before scaffold): package manager → app/library → SSR (app only) → AI context.
