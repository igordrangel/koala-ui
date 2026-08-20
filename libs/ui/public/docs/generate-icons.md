# Generate Icons

## Installation

```bash
# Already included by kl new / kl init
node generate-icons.js
```

Regenerates `src/theme/icons.css` from `public/assets/icons/*.svg`.

### Usage

```html
<i class="app-icon add-image"></i>
```

### Overview

# Generate Icons

The native `generate-icons.js` script (copied to the project root by `kl new` / `kl init`) turns SVG files into Tailwind v4 utilities.

## How it works

1. Reads every `*.svg` under `public/assets/icons/`.
2. Writes `src/theme/icons.css` with one `@utility <file-name>` per icon. Each utility sets `mask-image` / `-webkit-mask-image` on `::after` pointing at `/assets/icons/<file>.svg`.
3. The base `@utility app-icon` in `styles.css` provides size, alignment, and mask sizing. Icons are composed as `app-icon` + the generated utility name.
4. `styles.css` must import `./theme/icons.css` (ensured by the CLI).

The generated file starts with `/* Generated Automatically - Do not edit manually */`.

## When it runs

- `prestart`, `prebuild`, `build:dev`, and `build:prod` (`node generate-icons.js`)
- After `kl install` of icon sets such as `text-editor-icons`
- Manually: `node generate-icons.js` at the project root

## Usage

```html
<i class="app-icon add-image"></i>
```

## Custom icons

1. Add `public/assets/icons/my-icon.svg`
2. Run `node generate-icons.js`
3. Use `<i class="app-icon my-icon"></i>`
