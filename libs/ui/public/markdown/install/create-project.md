```bash
kl new example

# with custom package manager
kl new example --pm pnpm

# application with SSR
kl new example --ssr

# Angular library workspace
kl new example --type library

# scaffold AI agents context without prompting
kl new example --agents

# skip AI agents prompt
kl new example --no-agents

# non-interactive (AI agents / CI): bun + app + no SSR + agents off
kl new example --silent

# non-interactive with overrides
kl new example --silent --pm pnpm --type app --ssr --agents
```

Prompts (interactive, before scaffold): package manager → app/library → SSR (app only) → AI agents.
