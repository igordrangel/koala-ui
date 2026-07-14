import { Component, computed, inject, input } from '@angular/core';
import { DocsVersionService } from '../../docs-version/docs-version.service';
import { LocaleService } from '../../i18n/locale.service';
import { UI_COPY } from '../../i18n/ui-copy';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  private readonly localeService = inject(LocaleService);
  private readonly docsVersion = inject(DocsVersionService);

  readonly isHomePage = input(false);
  readonly copy = computed(() => UI_COPY[this.localeService.locale()].footer);

  readonly llmsUrl = computed(() => this.docsVersion.assetPath('llms.txt'));
  readonly llmsFullUrl = computed(() => this.docsVersion.assetPath('llms-full.txt'));
  readonly docsGetStartedUrl = computed(() => this.docsVersion.assetPath('docs/get-started.md'));
}
