import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';
import { LocaleService } from '@/core/i18n/locale.service';
import { UI_COPY } from '@/core/i18n/ui-copy';
import { Button } from '@/shared/components/button';
import { Tabs } from '@/shared/components/tabs';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationShowcase } from './showcase/authentication-showcase';
import { DashboardShowcase } from './showcase/dashboard-showcase';
import { ExamplesShowcase } from './showcase/examples-showcase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  host: { class: 'block w-full min-w-0' },
  imports: [
    Button,
    RouterLink,
    Tabs,
    ExamplesShowcase,
    DashboardShowcase,
    AuthenticationShowcase,
    LocalePathPipe,
  ],
})
export class HomePage {
  private readonly localeService = inject(LocaleService);
  readonly copy = computed(() => UI_COPY[this.localeService.locale()].landing);
}
