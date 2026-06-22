import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import MiniSearch from 'minisearch';
import { firstValueFrom } from 'rxjs';
import { DocSearchEntry, DocSearchResult } from './doc-search.types';

@Injectable({ providedIn: 'root' })
export class DocSearchService {
  private readonly http = inject(HttpClient);
  private miniSearch: MiniSearch<DocSearchEntry> | null = null;

  readonly ready = signal(false);
  readonly loading = signal(false);

  async loadIndex(): Promise<void> {
    if (this.ready() || this.loading()) return;

    this.loading.set(true);

    try {
      const entries = await firstValueFrom(this.http.get<DocSearchEntry[]>('/search-index.json'));

      this.miniSearch = new MiniSearch<DocSearchEntry>({
        fields: ['title', 'content', 'category'],
        storeFields: ['title', 'category', 'route', 'fragment'],
        searchOptions: {
          boost: { title: 4, category: 2 },
          fuzzy: 0.2,
          prefix: true,
        },
      });

      this.miniSearch.addAll(entries);
      this.ready.set(true);
    } finally {
      this.loading.set(false);
    }
  }

  search(query: string, limit = 12): DocSearchResult[] {
    if (!this.miniSearch || !query.trim()) return [];

    const results = this.miniSearch.search(query, { combineWith: 'AND' });

    return results.slice(0, limit).map((result) => ({
      id: String(result.id),
      title: result['title'] as string,
      category: result['category'] as string,
      route: result['route'] as string,
      fragment: result['fragment'] as string | undefined,
      snippet: this.buildSnippet(result.match?.['content'], query),
      score: result.score,
    }));
  }

  private buildSnippet(match: unknown, query: string): string {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);

    const content = Array.isArray(match) ? match.join(' ') : typeof match === 'string' ? match : '';

    if (!content) return '';

    const lowerContent = content.toLowerCase();
    let index = -1;

    for (const term of terms) {
      index = lowerContent.indexOf(term);
      if (index !== -1) break;
    }

    if (index === -1) {
      return content.slice(0, 120) + (content.length > 120 ? '…' : '');
    }

    const start = Math.max(0, index - 40);
    const end = Math.min(content.length, index + 80);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < content.length ? '…' : '';

    return prefix + content.slice(start, end).trim() + suffix;
  }
}
