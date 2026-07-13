import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type PageBasePageCopy } from '@/core/i18n/docs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-page-base-page',
  templateUrl: './page-base.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class PageBasePage {
  private readonly docs = useDocsCopy('page-base');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as PageBasePageCopy).sections.api.api),
  );
}
