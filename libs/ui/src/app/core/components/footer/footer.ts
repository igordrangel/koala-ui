import { Component, computed, inject, input } from '@angular/core';
import { LocaleService } from '../../i18n/locale.service';
import { UI_COPY } from '../../i18n/ui-copy';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  private readonly localeService = inject(LocaleService);

  readonly isHomePage = input(false);
  readonly copy = computed(() => UI_COPY[this.localeService.locale()].footer);
}
