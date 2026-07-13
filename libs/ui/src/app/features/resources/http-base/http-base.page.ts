import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type HttpBasePageCopy } from '@/core/i18n/docs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-http-base-page',
  templateUrl: './http-base.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class HttpBasePage {
  private readonly docs = useDocsCopy('http-base');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as HttpBasePageCopy).sections.api.api),
  );
}
