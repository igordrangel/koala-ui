# Componentes

- Instale o que faltar: `kl install button,modal,dropdown --silent` (vírgulas; `--silent` aceita libs externas sem prompt).
- Destino padrão: `src/app/shared/components/<name>/`.
- Importe em standalone `imports` a partir de `@/shared/components/...` (ou o caminho já usado no repo).
- Não invente inputs/outputs/diretivas — leia a doc do componente (`https://ui.koalarx.com/docs/<slug>.md`, ou `/v{major}/docs/<slug>.md` na linha previous) ou o MCP `koala-ui-docs`.
- Ao editar um componente instalado, trate-o como código do app (você possui a fonte).

## New UI recipe

1. Check whether the component/resource already exists under `src/app/shared/`.
2. If missing: `kl install button,modal --silent` (or the needed names).
3. Read the docs page for each piece before wiring templates.
4. Compose with documented patterns (fieldset + inputs, toast feedback, modal/side-window, etc.).
5. Keep styles aligned with the project theme (Tailwind / DaisyUI setup from scaffolding).
