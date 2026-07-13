import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type ListBasePageCopy } from '@/core/i18n/docs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-list-base-page',
  templateUrl: './list-base.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class ListBasePage {
  private readonly docs = useDocsCopy('list-base');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as ListBasePageCopy).sections.api.api),
  );
}
