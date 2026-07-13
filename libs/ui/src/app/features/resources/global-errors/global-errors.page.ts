import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-global-errors-page',
  templateUrl: './global-errors.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class GlobalErrorsPage {}
