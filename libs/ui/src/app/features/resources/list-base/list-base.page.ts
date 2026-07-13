import { Component } from '@angular/core';
import { Section } from '@/core/components/section';
import { Tabs } from '@/shared/components/tabs';
import { RouterLink } from '@angular/router';
import { LocalePathPipe } from '@/core/i18n/locale-path.pipe';

@Component({
  selector: 'app-list-base-page',
  templateUrl: './list-base.page.html',
  imports: [Section, Tabs, RouterLink, LocalePathPipe],
})
export class ListBasePage {}
