import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type RulesPageCopy } from '@/core/i18n/docs';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules.page.html',
  imports: [Section],
})
export class RulesPage {
  private readonly docs = useDocsCopy('rules');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as RulesPageCopy).sections.api.api),
  );
}
