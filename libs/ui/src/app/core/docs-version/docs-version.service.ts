import { APP_BASE_HREF } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DOCS_VERSIONS, type DocsVersionEntry } from '../constants/docs-versions';

function normalizeBasePath(value: string): string {
  if (!value || value === '/') return '/';
  const withLeading = value.startsWith('/') ? value : `/${value}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

function joinBase(basePath: string, relativePath: string): string {
  const base = normalizeBasePath(basePath);
  const rel = relativePath.replace(/^\/+/, '');
  if (base === '/') return `/${rel}`;
  return `${base}${rel}`;
}

@Injectable({ providedIn: 'root' })
export class DocsVersionService {
  private readonly injectedBase = inject(APP_BASE_HREF, { optional: true });

  readonly versions = DOCS_VERSIONS;

  /** Normalized base href for this build (`/` or `/v22/`). */
  basePath(): string {
    return normalizeBasePath(this.injectedBase ?? '/');
  }

  current(): DocsVersionEntry {
    const base = this.basePath();
    return (
      this.versions.find((entry) => normalizeBasePath(entry.basePath) === base) ?? this.versions[0]
    );
  }

  isCurrent(entry: DocsVersionEntry): boolean {
    return normalizeBasePath(entry.basePath) === this.basePath();
  }

  /** Path under the current base, for static assets (docs, llms, search-index). */
  assetPath(relativePath: string): string {
    return joinBase(this.basePath(), relativePath);
  }

  /** Absolute URL for a static asset on the current docs line. */
  assetUrl(relativePath: string): string {
    return `${window.location.origin}${this.assetPath(relativePath)}`;
  }

  /**
   * Full URL to switch to another support line, keeping locale + rest of path.
   */
  switchVersionHref(target: DocsVersionEntry): string {
    if (this.isCurrent(target)) {
      return `${window.location.pathname}${window.location.search}${window.location.hash}`;
    }

    const currentBase = this.basePath().replace(/\/$/, '') || '';
    let pathname = window.location.pathname;

    if (currentBase && pathname.startsWith(currentBase)) {
      pathname = pathname.slice(currentBase.length) || '/';
    }
    if (!pathname.startsWith('/')) {
      pathname = `/${pathname}`;
    }

    const targetBase = normalizeBasePath(target.basePath).replace(/\/$/, '');
    const nextPath = targetBase ? `${targetBase}${pathname}` : pathname;

    return `${nextPath}${window.location.search}${window.location.hash}`;
  }
}
