import { Section } from '@/core/components/section';
import { useDocsCopy } from '@/core/i18n/docs';
import type { DocSectionCopy } from '@/core/i18n/docs/types';
import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.page.html',
  imports: [Section],
})
export class PatchNotesPage {
  private readonly docs = useDocsCopy('patch-notes');
  readonly copy = this.docs.copy;

  /** Version entries from i18n (everything except overview), newest first. */
  readonly versionSections = computed(() => {
    const sections = this.copy().sections;
    return Object.entries(sections)
      .filter(([key]) => key !== 'overview')
      .sort(([a], [b]) => b.localeCompare(a, undefined, { numeric: true }))
      .map(([key, section]) => ({
        key,
        section: section as DocSectionCopy & {
          items?: string[];
          upgrade?: string;
        },
      }));
  });
}
