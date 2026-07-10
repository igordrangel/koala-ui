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

  let doc = `# Koala UI – Get Started

Koala UI is an Angular component library inspired by shadcn/ui.
Components are installed directly into your project via the **Koala CLI**, giving you full control over the source code.

## 1. Install the CLI

${installCli}

## 2. Create a new project

${createProject}

## 3. Add components

${addComponents}

## 4. Add resources (optional)

${addResources}

## Available components

${COMPONENTS.filter((c) => !c.isPage)
  .map((c) => `- **${c.label}** – \`kl install -n ${c.name}\``)
  .join('\n')}
`;

  return doc.trim();
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
    content = buildGetStartedDoc();
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
${generated
  .filter((c) => c.name !== 'get-started')
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
