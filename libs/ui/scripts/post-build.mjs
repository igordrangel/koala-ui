import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://ui.koalarx.com';
const LOCALES = ['pt', 'en'];
const DEFAULT_LOCALE = 'pt';

const DOC_PATHS = [
  'getting-started/introduction',
  'getting-started/installation',
  'components/bottom-sheet',
  'components/button',
  'components/confirm',
  'components/dropdown',
  'components/modal',
  'components/side-window',
  'components/collapse',
  'components/table',
  'components/calendar',
  'components/checkbox',
  'components/combobox',
  'components/fieldset',
  'components/inline-filter',
  'components/input-cnpj',
  'components/input-color',
  'components/input-cpf',
  'components/input-currency',
  'components/input-field',
  'components/radio',
  'components/range',
  'components/select',
  'components/text-editor',
  'components/textarea',
  'components/toggle',
  'components/validator',
  'components/alert',
  'components/loading',
  'components/skeleton',
  'components/toast',
  'components/tooltip',
  'components/breadcrumb',
  'components/pagination',
  'components/stepper',
  'components/tabs',
  'blocks/datatable',
  'blocks/login',
  'resources/auth',
  'resources/global-errors',
  'resources/http-base',
  'resources/list-base',
  'resources/page-base',
  'resources/rules',
];

const outputDir = path.resolve('../../dist/browser');
const indexFile = path.join(outputDir, 'index.html');
const notFoundFile = path.join(outputDir, '404.html');
const sitemapFile = path.join(outputDir, 'sitemap.xml');

function absoluteUrl(route) {
  return `${SITE_URL}${route}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function xhtmlAlternates(alternates) {
  return alternates
    .map(
      ([hreflang, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
    )
    .join('\n');
}

function buildSitemapEntries() {
  const entries = [];

  for (const locale of LOCALES) {
    const homeLoc = absoluteUrl(`/${locale}`);
    entries.push({
      loc: homeLoc,
      alternates: [
        ['pt-BR', absoluteUrl('/pt')],
        ['en', absoluteUrl('/en')],
        ['x-default', absoluteUrl(`/${DEFAULT_LOCALE}`)],
      ],
    });

    for (const docPath of DOC_PATHS) {
      const loc = absoluteUrl(`/${locale}/${docPath}`);
      entries.push({
        loc,
        alternates: [
          ['pt-BR', absoluteUrl(`/pt/${docPath}`)],
          ['en', absoluteUrl(`/en/${docPath}`)],
          ['x-default', absoluteUrl(`/${DEFAULT_LOCALE}/${docPath}`)],
        ],
      });
    }
  }

  return entries;
}

function buildSitemapXml(entries) {
  const urls = entries
    .map((entry) => {
      const links = xhtmlAlternates(entry.alternates);
      return `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n${links}\n  </url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

if (!fs.existsSync(indexFile)) {
  console.error('index.html não encontrado em', outputDir);
  process.exit(1);
}

fs.copyFileSync(indexFile, notFoundFile);

for (const file of fs.readdirSync(outputDir)) {
  if (file.endsWith('.map')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

const xml = buildSitemapXml(buildSitemapEntries());
fs.writeFileSync(sitemapFile, xml);

console.log(`Sitemap gerado → ${sitemapFile}`);
console.log('404.html gerado para GitHub Pages (SPA fallback)');
console.log('Source maps removidos do artefato de deploy');
