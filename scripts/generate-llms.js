/**
 * generate-llms.js
 *
 * Generates AI-friendly documentation from the existing Markdown snippets.
 * Output:
 *   libs/ui/public/llms.txt         – index following the llms.txt spec
 *   libs/ui/public/llms-full.txt    – all docs concatenated (for context-window ingestion)
 *   libs/ui/public/docs/<name>.md   – one file per component / page
 *   libs/ui/public/search-index.json – full-text search index for the docs site
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename, extname } from 'node:path';

const UI_ROOT = join(import.meta.dirname, '..', 'libs', 'ui');
const MARKDOWN_DIR = join(UI_ROOT, 'public', 'markdown');
const DOCS_OUT_DIR = join(UI_ROOT, 'public', 'docs');
const INSTALL_DIR = join(MARKDOWN_DIR, 'install');
const USAGE_DIR = join(MARKDOWN_DIR, 'usage');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function read(filePath) {
  return readFileSync(filePath, 'utf8').trim();
}

/** "button-variants.html.md" → "Variants" | "button.ts.md" → "TypeScript" */
function sectionTitle(componentName, filename) {
  // Remove component prefix
  let name = filename;
  if (name.startsWith(componentName + '-')) {
    name = name.slice(componentName.length + 1);
  } else if (name.startsWith(componentName + '.')) {
    name = name.slice(componentName.length + 1);
  }

  // Remove extensions (.html.md | .ts.md | .md)
  name = name.replace(/\.(html|ts)\.md$/, '').replace(/\.md$/, '');

  if (!name || name === '') return 'Example';

  // Known mappings
  const map = {
    ts: 'TypeScript',
    html: 'HTML',
  };
  if (map[name]) return map[name];

  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function capitalize(str) {
  return str
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ---------------------------------------------------------------------------
// Component metadata – order matches the nav menu
// ---------------------------------------------------------------------------

const COMPONENTS = [
  // get-started pseudo-pages
  { name: 'get-started', label: 'Get Started', installFile: null, usageDir: null, isPage: true },
  { name: 'patch-notes', label: 'Patch notes', installFile: null, usageDir: null, isPage: true },

  // components
  { name: 'alert', label: 'Alert' },
  { name: 'bottom-sheet', label: 'Bottom Sheet' },
  { name: 'breadcrumb', label: 'Breadcrumb' },
  { name: 'button', label: 'Button' },
  { name: 'calendar', label: 'Calendar' },
  { name: 'checkbox', label: 'Checkbox' },
  { name: 'collapse', label: 'Collapse' },
  { name: 'combobox', label: 'Combobox' },
  { name: 'confirm', label: 'Confirm' },
  { name: 'datatable', label: 'DataTable' },
  { name: 'dropdown', label: 'Dropdown' },
  { name: 'fieldset', label: 'Fieldset' },
  { name: 'inline-filter', label: 'Inline Filter' },
  { name: 'input-cnpj', label: 'Input CNPJ' },
  { name: 'input-cpf', label: 'Input CPF' },
  { name: 'input-color', label: 'Input Color' },
  { name: 'input-currency', label: 'Input Currency' },
  { name: 'input-field', label: 'Input Field' },
  { name: 'loading', label: 'Loading' },
  { name: 'login', label: 'Login' },
  { name: 'modal', label: 'Modal' },
  { name: 'pagination', label: 'Pagination' },
  { name: 'radio', label: 'Radio' },
  { name: 'range', label: 'Range' },
  { name: 'select', label: 'Select' },
  { name: 'side-window', label: 'Side Window' },
  { name: 'skeleton', label: 'Skeleton' },
  { name: 'stepper', label: 'Stepper' },
  { name: 'table', label: 'Table' },
  { name: 'tabs', label: 'Tabs' },
  { name: 'textarea', label: 'Textarea' },
  { name: 'text-editor', label: 'Text Editor' },
  { name: 'toast', label: 'Toast' },
  { name: 'toggle', label: 'Toggle' },
  { name: 'tooltip', label: 'Tooltip' },
  { name: 'validator', label: 'Validator' },

  // resources
  { name: 'list-base', label: 'List Base' },
  { name: 'http-base', label: 'Http Base' },
  { name: 'page-base', label: 'Page Base' },
  { name: 'global-errors', label: 'Global Errors' },
  { name: 'rules', label: 'Rules' },
  { name: 'auth', label: 'Auth' },
];

// ---------------------------------------------------------------------------
// Get Started doc (static content)
// ---------------------------------------------------------------------------

function buildGetStartedDoc() {
  const installCli = existsSync(join(INSTALL_DIR, 'install-cli.md'))
    ? read(join(INSTALL_DIR, 'install-cli.md'))
    : '`bun add -g @koalarx/ui`';

  const createProject = existsSync(join(INSTALL_DIR, 'create-project.md'))
    ? read(join(INSTALL_DIR, 'create-project.md'))
    : '`kl new -n my-app`';

  const addComponents = existsSync(join(INSTALL_DIR, 'add-components.md'))
    ? read(join(INSTALL_DIR, 'add-components.md'))
    : '`kl install -n button,modal`';

  const addResources = existsSync(join(INSTALL_DIR, 'add-resources.md'))
    ? read(join(INSTALL_DIR, 'add-resources.md'))
    : '';

  const addAiContext = existsSync(join(INSTALL_DIR, 'add-ai-context.md'))
    ? read(join(INSTALL_DIR, 'add-ai-context.md'))
    : '`kl add ai-context cursor`';

  let doc = `# Koala UI – Get Started

Koala UI is an Angular component library inspired by shadcn/ui.
Components are installed directly into your project via the **Koala CLI**, giving you full control over the source code.

Base dependencies installed by \`kl new\` / \`kl init\`: **[@koalarx/utils](https://utils.koalarx.com/) ≥ 5** and \`clsx\`.
Full utils API for LLMs: [https://utils.koalarx.com/llms.txt](https://utils.koalarx.com/llms.txt).

## Version compatibility

Two support lines (like Angular current + previous):

| Line | Git branch | Docs | npm dist-tag |
|------|------------|------|--------------|
| Latest | \`main\` | https://ui.koalarx.com/ | \`latest\` |
| Previous | \`previous-release\` | https://ui.koalarx.com/v{major}/ | see release (e.g. \`angular-21\` for the 22.x line on Angular 21) |

Older majors are frozen on archive branches named by version (e.g. \`22.3.0\`) with no publish/deploy.

## 1. Install the CLI

${installCli}

## 2. Create a new project

${createProject}

During setup you can scaffold AI context (Cursor / GitHub Copilot). Use \`--ai-context none|cursor|github|both\` to skip the prompt.
For AI agents or CI, prefer \`--silent\` (non-interactive: bun + AI context none unless overridden).

## 3. Add components

${addComponents}

Use \`kl install … --silent\` to accept all external dependency installs without prompting (recommended for AI agents).

## 4. Add AI context (optional)

${addAiContext}

## 5. Add resources (optional)

${addResources}

## Available components

${COMPONENTS.filter((c) => !c.isPage)
  .map((c) => `- **${c.label}** – \`kl install -n ${c.name}\``)
  .join('\n')}
`;

  return doc.trim();
}

function buildPatchNotesDoc() {
  return `# Koala UI – Patch notes

Changelog for anyone using or upgrading projects scaffolded with the Koala UI CLI.
Site page: https://ui.koalarx.com/#/getting-started/patch-notes
Root CHANGELOG.md mirrors these notes.

## 23.0.0 — Angular 22 + Signal Forms

### What changed

- Docs app and CLI pins on Angular 22 / TypeScript 6.
- Form controls migrated from ControlValueAccessor to FormValueControl / FormCheckboxControl (Signal Forms; Reactive Forms and ngModel remain compatible on Angular 22).
- inline-filter migrated to Signal Forms; builder validators now use FieldValidator (({ value }) => …), not ValidatorFn.
- Removed control-changes, form-is-valid, and get-value-on-first-change utils (Reactive Forms bridges); CLI no longer scaffolds or installs them as component deps.
- Functional HTTP interceptors (withInterceptors); NgZone removed from mask/currency.
- Versioning policy: 22.x = Angular 21; 23.x = Angular 22.
- \`--silent\` flag on \`kl new\`, \`kl init\`, and \`kl install\`: non-interactive mode (accepts external libs and skips prompts; on new/init defaults to bun + AI context none).

### Upgrade

Upgrade consumer apps to Angular 22. Re-run \`kl install\` for form components (and inline-filter) to pick up FormValueControl/Signal Forms. If you pass validators to InlineFilterBuilder, replace ValidatorFn with Signal Forms FieldValidator. Delete control-changes.ts / form-is-valid.ts / get-value-on-first-change.ts if present and replace usages with field().value() / field().valid(). For Angular 21, stay on the 22.x line (angular-21 dist-tag after release). For AI agents, prefer \`kl install … --silent\` and \`kl new … --silent\`.

## 22.3.0 — AI context

### What changed

- AI context prompt in \`kl new\` and \`kl init\` (Cursor, GitHub Copilot, both, or none).
- \`--ai-context none|cursor|github|both\` flag to skip the interactive prompt.
- New command \`kl add ai-context cursor|github\` — scaffolds \`AGENTS.md\` plus Cursor rules / Copilot instructions. Does not overwrite existing files.
- Assets under \`libs/cli/assets/ai-context/\` focused on docs-first, \`kl install\`, and Angular (Signals/standalone).
- Patch notes documentation on the site and \`CHANGELOG.md\` at the repo root.

### Upgrade

On existing projects: \`kl add ai-context cursor\`, \`github\`, or both. On new projects, choose in the prompt or use \`--ai-context\`.
`.trim();
}

// ---------------------------------------------------------------------------
// Per-component doc builder
// ---------------------------------------------------------------------------

function buildComponentDoc(component) {
  const { name, label } = component;

  const sections = [];

  // --- Installation ---------------------------------------------------------
  const installFile = join(INSTALL_DIR, `${name}-install.md`);
  if (existsSync(installFile)) {
    sections.push(`## Installation\n\n${read(installFile)}`);
  } else {
    sections.push(`## Installation\n\n\`\`\`bash\nkl install -n ${name}\n\`\`\``);
  }

  // --- Usage ----------------------------------------------------------------
  const usagePath = join(USAGE_DIR, name);
  if (existsSync(usagePath)) {
    const files = readdirSync(usagePath)
      .filter((f) => f.endsWith('.md'))
      .sort();

    // Group: TS files after HTML files for each section prefix
    const tsFiles = files.filter((f) => f.endsWith('.ts.md'));
    const htmlFiles = files
      .filter((f) => f.endsWith('.html.md'))
      .sort((a, b) => {
        const defaultHtml = `${name}.html.md`;
        if (a === defaultHtml) return -1;
        if (b === defaultHtml) return 1;
        return a.localeCompare(b);
      });
    const otherFiles = files
      .filter((f) => !f.endsWith('.ts.md') && !f.endsWith('.html.md'))
      .sort((a, b) => {
        if (a === 'overview.md') return 1;
        if (b === 'overview.md') return -1;
        return a.localeCompare(b);
      });

    // Build sections by grouping .html.md + its matching .ts.md
    const usedTs = new Set();

    for (const htmlFile of htmlFiles) {
      const base = htmlFile.replace('.html.md', '');
      const title = sectionTitle(name, htmlFile);

      let block = `### ${title}\n\n${read(join(usagePath, htmlFile))}`;

      // Try to find a matching .ts.md (same prefix or the generic <name>.ts.md)
      const matchingTs =
        tsFiles.find((f) => f === `${base}.ts.md`) || tsFiles.find((f) => f === `${name}.ts.md`);

      if (matchingTs && !usedTs.has(matchingTs)) {
        block += `\n\n${read(join(usagePath, matchingTs))}`;
        usedTs.add(matchingTs);
      }

      sections.push(block);
    }

    // TS-only files not yet attached to an HTML section
    for (const tsFile of tsFiles) {
      if (!usedTs.has(tsFile)) {
        const title = sectionTitle(name, tsFile);
        sections.push(`### ${title}\n\n${read(join(usagePath, tsFile))}`);
      }
    }

    for (const f of otherFiles) {
      const title = sectionTitle(name, f);
      sections.push(`### ${title}\n\n${read(join(usagePath, f))}`);
    }
  }

  return `# ${label}\n\n${sections.join('\n\n')}`.trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!existsSync(DOCS_OUT_DIR)) {
  mkdirSync(DOCS_OUT_DIR, { recursive: true });
}

const generated = [];

for (const component of COMPONENTS) {
  let content;

  if (component.isPage) {
    content = component.name === 'patch-notes' ? buildPatchNotesDoc() : buildGetStartedDoc();
  } else {
    content = buildComponentDoc(component);
  }

  const outFile = join(DOCS_OUT_DIR, `${component.name}.md`);
  writeFileSync(outFile, content + '\n', 'utf8');
  generated.push({ name: component.name, label: component.label });
  console.log(`  ✓ docs/${component.name}.md`);
}

// ---------------------------------------------------------------------------
// llms.txt  (https://llmstxt.org/)
// ---------------------------------------------------------------------------

const BASE_URL = 'https://ui.koalarx.com';

const llmsTxt = `# Koala UI

> An Angular component library in the style of shadcn/ui.
> Components are copied directly into your project via the Koala CLI.

## Docs

- [Get Started](${BASE_URL}/docs/get-started.md): Installation and setup
- [Patch notes](${BASE_URL}/docs/patch-notes.md): CLI and scaffolding changelog
${generated
  .filter((c) => c.name !== 'get-started' && c.name !== 'patch-notes')
  .map((c) => `- [${c.label}](${BASE_URL}/docs/${c.name}.md): ${c.label} component`)
  .join('\n')}

## CLI

\`\`\`bash
# Install CLI
bun add -g @koalarx/ui

# Create project
kl new my-app

# Add components
kl install button,modal,dropdown

# Add AI context
kl add ai-context cursor
\`\`\`
`;

writeFileSync(join(UI_ROOT, 'public', 'llms.txt'), llmsTxt, 'utf8');
console.log('  ✓ llms.txt');

// ---------------------------------------------------------------------------
// llms-full.txt
// ---------------------------------------------------------------------------

const allDocs = generated.map(({ name }) =>
  readFileSync(join(DOCS_OUT_DIR, `${name}.md`), 'utf8').trim(),
);

const llmsFullTxt = `# Koala UI – Full Documentation\n\n` + allDocs.join('\n\n---\n\n') + '\n';

writeFileSync(join(UI_ROOT, 'public', 'llms-full.txt'), llmsFullTxt, 'utf8');
console.log('  ✓ llms-full.txt');

// ---------------------------------------------------------------------------
// search-index.json  (docs site full-text search)
// ---------------------------------------------------------------------------

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function stripMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCategoryForDoc(name) {
  const resources = ['list-base', 'http-base', 'page-base', 'global-errors', 'rules', 'auth'];
  const blocks = ['datatable', 'login'];
  if (resources.includes(name)) return 'Resources';
  if (blocks.includes(name)) return 'Blocks';
  return 'Components';
}

function getRouteForDoc(name) {
  const resources = ['list-base', 'http-base', 'page-base', 'global-errors', 'rules', 'auth'];
  const blocks = ['datatable', 'login'];
  if (resources.includes(name)) return `resources/${name}`;
  if (blocks.includes(name)) return `blocks/${name}`;
  return `components/${name}`;
}

function extractSections(markdown) {
  const sections = [];
  const lines = markdown.split('\n');
  let currentHeading = null;
  let currentContent = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      if (currentHeading) {
        sections.push({ title: currentHeading, content: currentContent.join('\n') });
      }
      currentHeading = headingMatch[1].trim();
      currentContent = [];
    } else if (currentHeading) {
      currentContent.push(line);
    }
  }

  if (currentHeading) {
    sections.push({ title: currentHeading, content: currentContent.join('\n') });
  }

  return sections;
}

function uniqueSectionId(route, title, usedIds) {
  const baseFragment = slugify(title);
  let fragment = baseFragment;
  let id = `${route}#${fragment}`;
  let counter = 2;

  while (usedIds.has(id)) {
    fragment = `${baseFragment}-${counter}`;
    id = `${route}#${fragment}`;
    counter++;
  }

  usedIds.add(id);
  return { id, fragment };
}

function buildSearchEntriesForDoc(component, markdown, usedIds) {
  const { name, label } = component;
  const route = getRouteForDoc(name);
  const category = getCategoryForDoc(name);
  const entries = [];

  entries.push({
    id: route,
    title: label,
    category,
    route,
    content: stripMarkdown(markdown),
  });
  usedIds.add(route);

  for (const section of extractSections(markdown)) {
    const { id, fragment } = uniqueSectionId(route, section.title, usedIds);
    entries.push({
      id,
      title: section.title,
      category,
      route,
      fragment,
      content: stripMarkdown(section.content),
    });
  }

  return entries;
}

const INTRODUCTION_CONTENT = `
Welcome to the Koala UI documentation. Component library for Angular projects.
Beautiful practical components, community first, full source code control via CLI.
shadcn style copy components into your project kl new kl install.
`.trim();

const searchEntries = [
  {
    id: 'getting-started/introduction',
    title: 'Introduction',
    category: 'Getting Started',
    route: 'getting-started/introduction',
    content: INTRODUCTION_CONTENT,
  },
];
const usedSearchIds = new Set(['getting-started/introduction']);

const getStartedMarkdown = readFileSync(join(DOCS_OUT_DIR, 'get-started.md'), 'utf8').trim();

searchEntries.push({
  id: 'getting-started/installation',
  title: 'Installation',
  category: 'Getting Started',
  route: 'getting-started/installation',
  content: stripMarkdown(getStartedMarkdown),
});
usedSearchIds.add('getting-started/installation');

for (const section of extractSections(getStartedMarkdown)) {
  const { id, fragment } = uniqueSectionId('getting-started/installation', section.title, usedSearchIds);
  searchEntries.push({
    id,
    title: section.title,
    category: 'Getting Started',
    route: 'getting-started/installation',
    fragment,
    content: stripMarkdown(section.content),
  });
}

const patchNotesMarkdown = readFileSync(join(DOCS_OUT_DIR, 'patch-notes.md'), 'utf8').trim();
searchEntries.push({
  id: 'getting-started/patch-notes',
  title: 'Patch notes',
  category: 'Getting Started',
  route: 'getting-started/patch-notes',
  content: stripMarkdown(patchNotesMarkdown),
});
usedSearchIds.add('getting-started/patch-notes');

for (const section of extractSections(patchNotesMarkdown)) {
  const { id, fragment } = uniqueSectionId('getting-started/patch-notes', section.title, usedSearchIds);
  searchEntries.push({
    id,
    title: section.title,
    category: 'Getting Started',
    route: 'getting-started/patch-notes',
    fragment,
    content: stripMarkdown(section.content),
  });
}

for (const component of COMPONENTS) {
  if (component.isPage) continue;

  const markdown = readFileSync(join(DOCS_OUT_DIR, `${component.name}.md`), 'utf8').trim();
  searchEntries.push(...buildSearchEntriesForDoc(component, markdown, usedSearchIds));
}

writeFileSync(
  join(UI_ROOT, 'public', 'search-index.json'),
  JSON.stringify(searchEntries, null, 2) + '\n',
  'utf8',
);
console.log(`  ✓ search-index.json (${searchEntries.length} entries)`);

console.log('\nDone! Generated', generated.length, 'component docs.');
