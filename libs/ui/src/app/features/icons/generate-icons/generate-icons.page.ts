import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type GenerateIconsPageCopy } from '@/core/i18n/docs';

@Component({
  selector: 'app-generate-icons-page',
  templateUrl: './generate-icons.page.html',
  imports: [Section],
})
export class GenerateIconsPage {
  private readonly docs = useDocsCopy('generate-icons');
  readonly copy = this.docs.copy;
  readonly howItems = computed(
    () => (this.copy() as GenerateIconsPageCopy).sections.howItWorks.items,
  );
  readonly addItems = computed(
    () => (this.copy() as GenerateIconsPageCopy).sections.addIcons.items,
  );
  readonly addSources = computed(
    () => (this.copy() as GenerateIconsPageCopy).sections.addIcons.sources,
  );
  readonly whenItems = computed(
    () => (this.copy() as GenerateIconsPageCopy).sections.whenItRuns.items,
  );
}
