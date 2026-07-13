import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-http-base-page',
  templateUrl: './http-base.page.html',
  imports: [Section, RouterLink, LocalePathPipe],
})
export class HttpBasePage {}
