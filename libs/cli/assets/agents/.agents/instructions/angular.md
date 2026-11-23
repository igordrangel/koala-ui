# Angular

- Prefira Signals (`signal`, `computed`, `input`/`output` modernos) em vez de padrões legados quando o projeto já os usa.
- Componentes standalone; declare dependências no array `imports`.
- Use o alias `@/*` para imports sob `src/app/`.
- Formulários: prefira **Signal Forms** (`form()`, `[formField]` de `@angular/forms/signals`). Controles Koala usam `FormValueControl` / `FormCheckboxControl` — também funcionam com Reactive Forms (`[formControl]`) no Angular 22.
- Prefira `@Service()` para serviços root (Angular 22).
- Base deps: `@koalarx/utils` ≥ 5 e `clsx`. Prefira protótipos documentados do Utils (ex. `.orderBy()`).
- Mantenha consistência com o scaffolding de `kl new` / `kl init` (tema, ESLint, testes).
- Versão: major de `@koalarx/ui` acompanha o major do Angular (`21.x` → Angular 21, `22.4+` → Angular 22).
- Para scaffolding não interativo: `kl new <name> --silent` (ou `--pm` / `--type` / `--ssr` / `--agents` / `--no-agents`).
