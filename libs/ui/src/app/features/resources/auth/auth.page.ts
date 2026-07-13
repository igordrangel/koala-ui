import { Component, computed } from '@angular/core';
import { Section } from '@/core/components/section';
import { useDocsCopy, type AuthPageCopy } from '@/core/i18n/docs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class AuthPage {
  private readonly docs = useDocsCopy('auth');
  readonly copy = this.docs.copy;
  readonly common = this.docs.common;
  readonly apiGroups = computed(() =>
    Object.values((this.copy() as AuthPageCopy).sections.api.api),
  );
}
