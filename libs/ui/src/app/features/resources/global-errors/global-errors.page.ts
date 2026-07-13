import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type GlobalErrorsPageCopy } from '@/core/i18n/docs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-global-errors-page',
  templateUrl: './global-errors.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class GlobalErrorsPage {
  private readonly docs = useDocsCopy('global-errors');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as GlobalErrorsPageCopy).sections.api.api),
  );
}
